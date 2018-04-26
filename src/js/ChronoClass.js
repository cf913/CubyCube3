class Chrono {
  constructor() {
    this.startTime = 0
    this.start = 0
    this.end = 0
    this.diff = 0
    this.timerID = 0
    this.msec = 0
    this.sec = 0
    this.min = 0
    this.state = 0
    this.state_options = {
        IDLE: 0,
        HOLD: 1,
        RUNNING: 2
    }
    this.value = ''
  }

  chrono = function() {
    this.end = new Date()
    this.diff = this.end - this.start
    this.diff = new Date(this.diff)
    this.msec = this.diff.getMilliseconds()
    sec = this.diff.getSeconds()
    min = this.diff.getMinutes()
    
    if (min < 10){
        min = "0" + min
    }
    if (sec < 10){
        sec = "0" + sec
    }
    if (this.msec < 10){
        this.msec = "00" + this.msec
    }
    else if (this.msec < 100){
        this.msec = "0" + this.msec
    }
    this.value = min + ":" + sec + ":" + this.msec
    timerID = setTimeout(() => {this.chrono()}, 20)
  }

  chronoStart = function(){
      this.start = new Date()
      this.chrono()
  }

  chronoContinue = function(){
      this.start = new Date() - this.diff
      this.start = new Date(this.start)
      this.chrono()
  }

  // this.chronoReset = function(){
  //     $("#chronotime").text("00:00:000")
  //     this.start = new Date()
  // }

  chronoStop = function(){
      clearTimeout(timerID)
  }

  keyDown = function(){
      // if(state === state_options.HOLD) return
      if (state === state_options.IDLE) {
          console.log('reset')
          this.chronoReset()
          state = state_options.HOLD
      } else if (state === state_options.RUNNING) {
          console.log('stop')
          this.chronoStop()
          //saveTime()
          state = state_options.IDLE
      }
  }

  keyUp = function() {
      if (state === state_options.HOLD) {
          state = state_options.RUNNING
          console.log( 'start')
          this.chronoStart()
      }
  }
}


export default Chrono