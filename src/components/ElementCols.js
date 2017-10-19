
import React, { Component } from 'react';
import ElementCol from '../components/ElementCol.js'

export default class ElementCols extends Component {

    constructor(props) {
        super(props);
        this.cols = this.props.cols;
    }

    updateCol(index, col) {
        let cols = this.props.cols;
        cols[index] = col;
        this.props.updateCols(cols);
    }
    
    addCol(event) {
        let cols = this.props.cols;
        let label = 'c1';
        let value = '';
        if (cols.length > 0) {
            const last_col = cols.slice(-1)[0];
            let last_label = last_col.label;
            value = parseInt(last_col.value,10) + 1;
            if (/^(c[0-9]?[0-9])$/.test(last_label)) {
                let label_split = last_label.split("c");
                let label_number = parseInt(label_split[1],10);
                label = "c" + (label_number + 1);
            }
        }
        cols.push({
            label: label,
            value: value,
            text: "",
            anchor: false,
            exclusive: false
          });
        this.props.updateCols(cols);
    }

    deleteCol(index) {
      let cols = this.props.cols;
      cols.splice(index, 1);
      this.props.updateCols(cols);
    }

    render() {
        return (
            <div className="gui-element-rows">
                { this.props.cols.map((col, index) => {
                    return <ElementCol 
                            key={index} 
                            colIndex={index} 
                            col={col}
                            updateCol={this.updateCol.bind(this)} 
                            deleteCol={this.deleteCol.bind(this)} />
                })}
                <a className="add-row" onClick={this.addCol.bind(this)}>+ New Column</a>
            </div>
        );
    }
  }