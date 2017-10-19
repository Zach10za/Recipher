
import React, { Component } from 'react';

export default class ElementCol extends Component {

    constructor(props) {
        super(props);
        this.index = this.props.colIndex;
        this.col = this.props.col;
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.col[name] = value;
        this.props.updateCol(this.index, this.col);
    }

    changeOption(event) {
        const name = event.target.name;
        const checked = event.target.checked;
        this.col[name] = checked;
        this.props.updateCol(this.index, this.col);
    }

    delete(event) {
        this.props.deleteCol(this.index);
    }

    render() {
      return (
        <div className="gui-element-row">
            <label className="label">
                <input type="text" name="label" value={this.props.col.label} onChange={this.handleChange.bind(this)} />
            </label>
            <label className="value">
                <input type="text" name="value" value={this.props.col.value} onChange={this.handleChange.bind(this)} />
            </label>
            <label className="text">
                <input type="text" name="text" value={this.props.col.text} onChange={this.handleChange.bind(this)} />
            </label>
            <input type="checkbox" name="anchor" className="row-option" checked={this.props.col.anchor} onChange={this.changeOption.bind(this)} />
            <input type="checkbox" name="exclusive" className="row-option" checked={this.props.col.exclusive} onChange={this.changeOption.bind(this)} />
            <a className="row-option delete-row" onClick={this.delete.bind(this)}>X</a>
        </div>
      );
    }
  }