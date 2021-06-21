const Koa = require('koa');


const { initRouter, initController, initService, loadConfig } = require('./kkb-loader');


class kkb {
  constructor(conf){
    this.$app = new Koa(conf)
    loadConfig(this)
    this.$service = initService(this)
    this.$controller = initController(this)

    this.$router = initRouter(this)
    this.$app.use(this.$router.routes())

    // console.log( this.$db)

    // this.$app.use(this.$controller)
  }

  start(port){
    this.$app.listen(port, () => {
      console.log(`app running at ${port}`)
    })
  }
}

module.exports = kkb