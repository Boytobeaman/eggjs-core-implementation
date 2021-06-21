module.exports = app => ({
  'get /': async ctx => {
    // ctx.body = "shouye"
    return app.$controller.home.index(ctx)
  },
  // 'get /': app.$controller.home.index,
  'get /detail': async ctx => {
    app.ctx.body = "xiangqingye"
  },
})