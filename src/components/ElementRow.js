
import React, { Component } from 'react';

export default class ElementRow extends Component {

    constructor(props) {
        super(props);
        this.index = this.props.rowIndex;
        this.row = this.props.row;
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.row[name] = value;
        this.props.updateRow(this.index, this.row);
    }

    render() {
      return (
        <div className="gui-element-row">
            <input type="text" name="label" value={this.props.row.label} onChange={this.handleChange.bind(this)} />
            <input type="text" name="value" value={this.props.row.value} onChange={this.handleChange.bind(this)} />
            <input type="text" name="text" value={this.props.row.text} onChange={this.handleChange.bind(this)} />
        </div>
      );
    }
  }