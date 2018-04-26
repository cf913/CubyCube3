
let startTime = 0
let start = 0
let end = 0
let diff = 0
let timerID = 0
let msec = 0
let sec = 0
let min = 0
let state = 0
let state_options = {
    IDLE: 0,
    HOLD: 1,
    RUNNING: 2
}

export default function Chrono() {

    this.value = ''

    this.chrono = function() {
        end = new Date()
        diff = end - start
        diff = new Date(diff)
        msec = diff.getMilliseconds()
        sec = diff.getSeconds()
        min = diff.getMinutes()
        
        if (min < 10){
            min = "0" + min
        }
        if (sec < 10){
            sec = "0" + sec
        }
        if(msec < 10){
            msec = "00" + msec
        }
        else if(msec < 100){
            msec = "0" + msec
        }
        this.value = min + ":" + sec + ":" + msec

        timerID = setTimeout(() => {this.chrono()}, 20)
    }

    this.chronoStart = function(){
        start = new Date()
        this.chrono()
    }

    this.chronoContinue = function(){
        start = new Date()-diff
        start = new Date(start)
        this.chrono()
    }

    // this.chronoReset = function(){
    //     $("#chronotime").text("00:00:000")
    //     start = new Date()
    // }

    this.chronoStop = function(){
        clearTimeout(timerID)
    }

    this.keyDown = function(){
        // if(state === state_options.HOLD) return
        if (state === state_options.IDLE) {
            console.log('reset')
            state = state_options.HOLD
        } else if (state === state_options.RUNNING) {
            console.log('stop')
            this.chronoStop()
            state = state_options.IDLE
        }
    }

    this.keyUp = function() {
        if (state === state_options.HOLD) {
            state = state_options.RUNNING
            console.log('start')
            this.chronoStart()
        }
    }

}





