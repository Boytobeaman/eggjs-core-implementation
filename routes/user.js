module.exports = app => ({
  // /user/
  'get /': async ctx => {
    app.ctx.body = "user shouye"
  },
  'get /detail': async ctx => {
    app.ctx.body = "user xiangqingye"
  },
})