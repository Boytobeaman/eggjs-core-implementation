module.exports = {
    interval: '*/3 * * * * *',
    handler(){
      console.log(`定时任务，每3秒执行一次 ${new Date()}`)
    }
}