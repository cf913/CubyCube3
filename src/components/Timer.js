import React, { Component } from 'react'
import Chrono from '../js/chrono'

class Timer extends Component {

  state = {
    value: '00:00:000',
    running: false,
    status: 'IDLE',
    fired: false
  }

  componentDidMount() {
    this.chrono = new Chrono()

    document.addEventListener("keyup", event => {
      if (event.keyCode === 32) {
        if (this.state.status === 'HOLD') {
          this.startChrono()
          this.changeStatus('RUNNING')
        }
        this.setState({fired: false})
      }
    })
    
    document.addEventListener("keydown", event => {
      if (event.keyCode === 32 && !this.state.fired) {
        if (this.state.status === 'IDLE') {
          this.changeStatus('HOLD')
          this.setState({fired: true})
        } else if (this.state.status === 'RUNNING') {
          this.stopChrono()
          this.changeStatus('IDLE')
          this.setState({fired: true})
        }
      }
    })
  }

  updateTimer(val) {
    this.setState({
      value: val
    })
  }

  // clickHandler = e => {
  //   if (!this.state.running) return
  //   this.stopChrono()
  // }
  
  stopChrono = () => {
    this.chrono.chronoStop()
    // this.toggleRun()
    clearTimeout(this.timerGo)
    return this.props.addRecord(this.state.value)
  }

  startChrono = () => {
    // if (this.state.running) return
    // this.toggleRun()
    this.chrono.chronoStart()
    this.timerGo = setInterval(() => {this.updateTimer(this.chrono.value)}, 50)
  }

  // resetChrono = () => {
  //   if (this.state.running) { 
  //     this.stopChrono() 
  //     this.toggleRun()
  //   }
  //   this.setState({
  //     value: '00:00:000'
  //   })
  // }

  // toggleRun = () => {
  //   this.setState({
  //     running: !this.state.running
  //   })
  // }

  changeStatus = status => {
    this.setState({
      status
    })
  }

  render() {
    return (
      <div className="Timer">
        <h1 className="display-1">{this.state.value}</h1>
      </div>
    )
  }
}

export default Timer