
import React, { Component } from 'react';

export default class ElementOptions extends Component {

    constructor(props) {
        super(props);
        this.shuffle = this.props.shuffle;
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        this.shuffle[name] = event.target.checked;
        this.props.updateOptions(this.shuffle);
    }

    render() {
      return (
        <div className="gui-element-options">
            <input type="checkbox" name="rows" checked={this.props.shuffle.rows} onChange={this.handleChange.bind(this)} />
            <input type="checkbox" name="cols" checked={this.props.shuffle.cols} onChange={this.handleChange.bind(this)} />
        </div>
      );
    }
  }