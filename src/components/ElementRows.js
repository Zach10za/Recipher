
import React, { Component } from 'react';
import ElementRow from '../components/ElementRow.js'

export default class ElementRows extends Component {

    constructor(props) {
        super(props);
        this.rows = this.props.rows;
    }

    updateRow(index, row) {
        let rows = this.props.rows;
        rows[index] = row;
        this.props.updateRows(rows);
    }
    
    addRow(event) {
        let rows = this.props.rows;
        const last_row = rows.slice(-1)[0];
        let last_label = last_row.label;
        let last_value = parseInt(last_row.value,10);
        let label;
        if (/^(r[0-9]?[0-9])$/.test(last_label)) {
            let label_split = last_label.split("r");
            let label_number = parseInt(label_split[1],10);
            label = "r" + (label_number + 1);
        } else if (/^([A-Z]?[A-Z])$/.test(last_label)) {
            const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
            label = alphabet[alphabet.indexOf(last_label) + 1];
        }
        rows.push({
            label: label,
            value: (last_row.value ? last_value + 1 : ""),
            text: "",
            cond:"",
            anchor: false,
            exclusive: false,
            open: false
          });
        this.props.updateRows(rows);
    }

    deleteRow(index) {
      let rows = this.props.rows;
      rows.splice(index, 1);
      this.props.updateRows(rows);
    }

    render() {
        return (
            <div className="gui-element-rows">
                { this.props.rows.map((row, index) => {
                    return <ElementRow 
                            key={index} 
                            rowIndex={index} 
                            row={row}
                            updateRow={this.updateRow.bind(this)} 
                            deleteRow={this.deleteRow.bind(this)} />
                })}
                <a className="add-row" onClick={this.addRow.bind(this)}>+ New Row</a>
            </div>
        );
    }
  }