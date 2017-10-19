
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

    changeOption(event) {
        const name = event.target.name;
        const checked = event.target.checked;
        this.row[name] = checked;
        this.props.updateRow(this.index, this.row);
    }

    delete(event) {
        this.props.deleteRow(this.index);
    }

    render() {
      return (
        <div className="gui-element-row">
            <label className="label">
                <input type="text" name="label" value={this.props.row.label} onChange={this.handleChange.bind(this)} />
            </label>
            <label className="value">
                <input type="text" name="value" value={this.props.row.value} onChange={this.handleChange.bind(this)} />
            </label>
            <label className="text">
                <input type="text" name="text" value={this.props.row.text} onChange={this.handleChange.bind(this)} />
            </label>
            <input type="checkbox" name="anchor" className="row-option" checked={this.props.row.anchor} onChange={this.changeOption.bind(this)} />
            <input type="checkbox" name="exclusive" className="row-option" checked={this.props.row.exclusive} onChange={this.changeOption.bind(this)} />
            <a className="row-option delete-row" onClick={this.delete.bind(this)}>X</a>
        </div>
      );
    }
  }