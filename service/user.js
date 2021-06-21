const delay = (data, tick) => new Promise( (resolve, reject) => {
  setTimeout( () => {
    resolve(data)
  }, tick)
})


module.exports = app => ({
  getName(){
    // return delay("jerry", 1000)
    return app.$model.user.findAll({
      where: {
        id: 1
      }
    })
  },
  getAge(){
    return 20
  }
})