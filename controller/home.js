module.exports = app => ({
  index: async (ctx) => {
    // const { ctx } = app.$app;
    // ctx.body = 'controller shouye'
    const user  = await app.$service.user.getName()
    app.ctx.body = user
  },
  detail: async ctx => {
    app.ctx.body = 'controller detail'
  }
})