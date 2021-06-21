const fs = require("fs");
const path = require("path");

const Router = require("koa-router");


function load(dir, cb) {
  //获取绝对路径
  const url = path.resolve( __dirname, dir);
  const files = fs.readdirSync(url);

  files.forEach( (filename) => {
    filename = filename.replace(".js", "");
    const file = require(`${url}/${filename}`)
    cb(filename, file)
  })

}


function initRouter(app) {
  const router = new Router();
  load("routes", (filename, routes) => {
    const prefix = filename === "index" ? "" : `/${filename}`

    if(typeof routes === "function") routes = routes(app)
    Object.keys(routes).forEach( key => {
      const [method, path] = key.split(" ")
      console.log(`正在注册路由: ${method.toLowerCase()} ${path}`)
      router[method](prefix + path, async (ctx) => {
        app.ctx = ctx;
        await routes[key](app)
      })
    })
  })

  return router
}


function initController(app) {
  const controllers = {};
  load("controller", (filename, controller) => {

    if(typeof controller === "function") controller = controller(app)
    controllers[`${filename}`] = controller
  })

  return controllers
}

function initService(app) {
  const services = {};
  load("service", (filename, service) => {

    if(typeof service === "function") service = service(app)
    services[`${filename}`] = service
  })

  return services
}


const Sequelize = require('sequelize')
function loadConfig(app) {
  load( 'config', (filename, conf) => {
    if(conf.db) {
      app.$db = new Sequelize(conf.db)

      //加载数据模型
      app.$model = {}
      load('model', (filename, {schema, options}) => {
        app.$model[filename] = app.$db.define(filename, schema, options)
      })

      app.$db.sync()
    }

    if( conf.middleware) {
      conf.middleware.forEach( mid => {
        const midPath = path.resolve( __dirname, "middleware", mid);
        app.$app.use(require(midPath))
      })
    }
  })
}



const schedule = require("node-schedule");

function initSchedule(){
  load('schedule', (filename, scheduleConfig) => {
    schedule.scheduleJob(scheduleConfig.interval, scheduleConfig.handler)
  })
}

module.exports = {
  initRouter,
  initController,
  initService,
  loadConfig,
  initSchedule
}