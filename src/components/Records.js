import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Button } from 'reactstrap'
import FA from '@fortawesome/react-fontawesome'

class Records extends Component {

  render() {
    const red = {
      backgroundColor: 'red'
    }
    const green = {
      backgroundColor: 'green'
    }

    const record_item = this.props.records.map((record, i) => (
      <ListGroupItem key={i} style={record.time > this.props.avg ? red : green}>
        <strong>{this.props.records.length - i}.</strong> {record.time}
        <div
          className="span"
          onClick={this.props.deleteRecord.bind(this, i)}
        >
        <FA icon="trash-alt"/>
        </div>
      </ListGroupItem>
    ))

    return (
      <div className="Records">
        <div className="list">
          <ListGroup>
            {record_item}
          </ListGroup>
        </div>
      </div>
    )
  }
}

export default Records