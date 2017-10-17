
import React, { Component } from 'react';
import ElementRow from '../components/ElementRow.js'

export default class ElementRows extends Component {

    constructor(props) {
        super(props);
        this.rows = this.props.rows;
    }

    updateRow(index, row) {
        this.rows[index] = row;
        this.props.updateRows(this.rows);
    }

    render() {
        return (
            <div className="gui-element-rows">
                { this.props.rows.map((row, index) => {
                    return <ElementRow 
                            key={index} 
                            rowIndex={index} 
                            row={row}
                            updateRow={this.updateRow.bind(this)}/>
                })}
            </div>
        );
    }
  }