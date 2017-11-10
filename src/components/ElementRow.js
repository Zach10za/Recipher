
import React, { Component } from 'react';

export default class ElementRow extends Component {

    constructor(props) {
        super(props);
        this.index = this.props.rowIndex;
        // this.state = {
        //     label: this.props.row.label,
        //     value: this.props.row.value,
        //     text: this.props.row.text,
        //     cond: this.props.row.cond,
        //     anchor: this.props.row.anchor,
        //     exclusive: this.props.row.exclusive,
        //     open: this.props.row.open
        // }
        this.handleChange = this.handleChange.bind(this);
        this.changeOption = this.changeOption.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        let row = this.props.row;
        row[name] = value;
        // this.setState(row);
        this.props.updateRow(this.index, row);
    }

    changeOption(event) {
        const name = event.target.name;
        const checked = event.target.checked;
        let row = this.props.row;
        row[name] = checked;
        // this.setState(row);
        this.props.updateRow(this.index, row);
    }

    delete(event) {
        this.props.deleteRow(this.index);
    }

    render() {
      return (
        <div className="gui-element-row">
            <label className="label">
                <input type="text" name="label" value={this.props.row.label} onChange={this.handleChange} />
            </label>
            <label className="value">
                <input type="text" name="value" value={this.props.row.value} onChange={this.handleChange} />
            </label>
            <label className="text">
                <input type="text" name="text" value={this.props.row.text} onChange={this.handleChange} />
            </label>
            <input type="checkbox" name="anchor" className="row-option" checked={this.props.row.anchor} onChange={this.changeOption} />
            <input type="checkbox" name="exclusive" className="row-option" checked={this.props.row.exclusive} onChange={this.changeOption} />
            <a className="row-option delete-row" onClick={this.delete.bind(this)}>X</a>
        </div>
      );
    }
  }