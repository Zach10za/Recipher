
import React, { Component } from 'react';
import ElementRows from '../components/ElementRows.js'
import ElementOptions from '../components/ElementOptions.js'

export default class ElementForm extends Component {

    constructor(props) {
        super(props);
        this.element = {
            id: this.props.id,
            qtype: this.props.element.qtype,
            qlabel: this.props.element.qlabel,
            qcond: this.props.element.qcond,
            qtitle: this.props.element.qtitle,
            qinstructions: this.props.element.qinstructions,
            shuffle: this.props.element.shuffle,
            rows: this.props.element.rows
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        this.element[name] = event.target.value;
        this.props.updateForm(this.element);
    }

    updateRows(rows) {
        this.element.rows = rows;
        this.props.updateForm(this.element);
    }

    addRow(row) {
        
    }

    updateOptions(options) {
        this.element.shuffle = options;
        this.props.updateForm(this.element);
    }

    render() {
      return (
        <form className="gui-element">
            <label className="qtype">
                Type:
                <input type="text" name="qtype" value={this.props.element.qtype} onChange={this.handleChange.bind(this)} />
            </label>
            <label className="qlabel">
                Label:
                <input type="text" name="qlabel" value={this.props.element.qlabel} onChange={this.handleChange.bind(this)} />
            </label>
            <label className="qcond">
                Cond:
                <input type="text" name="qcond" value={this.props.element.qcond} onChange={this.handleChange.bind(this)} />
            </label>
            <label className="qtitle">
                Question:
                <input type="text" name="qtitle" value={this.props.element.qtitle} onChange={this.handleChange.bind(this)} />
            </label>
            <label className="qinstructions">
                Instructions:
                <input type="text" name="qinstructions" value={this.props.element.qinstructions} onChange={this.handleChange.bind(this)} />
            </label>

            <ElementRows rows={this.props.element.rows} updateRows={this.updateRows.bind(this)}/>

            <ElementOptions shuffle={this.props.element.shuffle} updateOptions={this.updateOptions.bind(this)} />
        </form>
      );
    }
  }