import React, { Component } from 'react'
import { div, Row, Col } from 'reactstrap';
import Records from './Records'
import Timer from './Timer'

class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      records: [],
      average: '--:--:---'
    }
  }

  getAverage = () =>  {
    let mina = 0
    let seca = 0
    let mseca = 0
    let minb = 0
    let secb = 0
    let msecb = 0
    let min = 0
    let sec = 0
    let msec = 0
    const rec = this.state.records.slice()
    const sum = rec.reduce((a,b) => {
      mina = +a.time.substring(0,2)
      seca = +a.time.substring(3,5)
      mseca = +a.time.substring(6,9)
      minb = +b.time.substring(0,2)
      secb = +b.time.substring(3,5)
      msecb = +b.time.substring(6,9)
      min = mina + minb
      sec = seca + secb
      msec = mseca + msecb
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
      return { time: min + ":" + sec + ":" + msec }
    })
    min  = +min/rec.length * 60000
    sec  = +sec/rec.length * 1000
    msec = +msec/rec.length
    let tot = Math.round(min+sec+msec)
    tot = bop(tot)
    this.setState({
      average: tot
    })
  }

  addRecord = rec => {
    if (rec === '00:00:000') return
    const newRec = {
      time: rec,
      date: new Date()
    }
    this.setState(prevState => ({
      records: [newRec, ...prevState.records]
    }), () => {
      this.getAverage()
    })
  }

  deleteRecord = index => {
    this.setState(prevState => ({
      records: [...prevState.records.slice(0,index), ...prevState.records.slice(index+1)]
    }), () => {
      if (this.state.records.length > 0) this.getAverage()
    })
  }

  render() {
    return (
      <div className="Main">
        <div className="Chrono">
          <Timer value={this.state.timer}  resetChrono={() => this.resetChrono()} addRecord={this.addRecord}/>
          <div className="Details">
            <Row>
              <Col className="stats">
                <li>Avg.: {this.state.average}</li>
                <li>Best: {this.state.best}</li>
              </Col>
              <Col>
              </Col>
            </Row>
          </div>
        </div>
        <Records avg={this.state.average} records={this.state.records} deleteRecord={(i) => this.deleteRecord(i)}/>
      </div>
    )
  }
}

function bop(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = Math.floor(((millis % 60000) / 1000))
  let msec = millis - (minutes*60000) - seconds*1000
  if(msec < 10){
    msec = "00" + msec
  }
  else if(msec < 100){
      msec = "0" + msec
  }
  return (minutes < 10 ? '0' : '') + minutes + ":" 
    + (seconds < 10 ? '0' : '') + seconds + ':' 
    + msec;
}

export default Main