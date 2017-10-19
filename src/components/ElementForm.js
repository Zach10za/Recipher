
import React, { Component } from 'react';
import ElementRows from '../components/ElementRows.js'
import ElementCols from '../components/ElementCols.js'
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
            qinstruction: this.props.element.qinstruction,
            shuffle: this.props.element.shuffle,
            rows: this.props.element.rows
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        let element = this.props.element;
        element[name] = event.target.value;
        this.props.updateForm(element);
    }

    updateRows(rows) {
        let element = this.props.element;
        element.rows = rows;
        this.props.updateForm(element);
    }
    
    updateCols(cols) {
        let element = this.props.element;
        element.cols = cols;
        this.props.updateForm(element);
    }

    deleteElement(event) {
        this.props.removeElement(this.props.id);
    }

    updateOptions(options) {
        let element = this.props.element;
        element.shuffle = options;
        this.props.updateForm(element);
    }

    render() {
      return (
        <form className="gui-element">
            <div className="gui-element-header">
                <label className="qlabel">
                    <input type="text" name="qlabel" value={this.props.element.qlabel} onChange={this.handleChange.bind(this)} />
                </label>
                <label className="qtype">
                    <select name="qtype" value={this.props.element.qtype} onChange={this.handleChange.bind(this)} >
                        <option value="radio">Single Select</option>
                        <option value="checkbox">Multi-Select</option>
                        <option value="number">Number</option>
                        <option value="select">Select</option>
                        <option value="text">Text</option>
                        <option value="textarea">Essay</option>
                    </select>
                </label>
                <a className="delete-element" onClick={this.deleteElement.bind(this)}>Remove</a>
            </div>
            <div className="gui-element-body">
                <label className="qcond inline">
                    <span>Show If:</span>
                    <input type="text" name="qcond" value={this.props.element.qcond} onChange={this.handleChange.bind(this)} />
                </label>
                <label className="qtitle">
                    Question:
                    <input type="text" name="qtitle" value={this.props.element.qtitle} onChange={this.handleChange.bind(this)} />
                </label>
                <label className="qinstruction">
                    Instruction:
                    <input type="text" name="qinstruction" value={this.props.element.qinstruction} onChange={this.handleChange.bind(this)} />
                </label>

                <label className="qrows">
                    Rows:
                    <ElementRows rows={this.props.element.rows} updateRows={this.updateRows.bind(this)}/>
                </label>

                <label className="qcols">
                    Columns:
                    <ElementCols cols={this.props.element.cols} updateCols={this.updateCols.bind(this)}/>
                </label>
                <ElementOptions shuffle={this.props.element.shuffle} updateOptions={this.updateOptions.bind(this)} />
            </div>
        </form>
      );
    }
  }