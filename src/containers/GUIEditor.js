
import React, { Component } from 'react';
import ElementForm from '../components/ElementForm.js';

export default class GUIEditor extends Component {

    constructor(props) {
        super(props);
        this.updateForm = this.updateForm.bind(this);
        this.addElement = this.addElement.bind(this);
    }

    updateForm(element) {
        this.props.updateElement(element);
    }

    addElement(event) {
        const last_element = this.props.elements.slice(-1)[0];
        let last_id = last_element.id;
        let new_id = last_id + 1;
        let qlabel = ""
        if (last_element.qlabel.charAt(0) === "Q") {
            let qlabel_split = last_element.qlabel.split("Q");
            let qlabel_number = parseInt(qlabel_split[1]);
            qlabel = "Q" + (qlabel_number + 1);
        }
        let element = {
            id: (last_element.id + 1),
            qtype: 'radio',
            qlabel: qlabel,
            qcond: "",
            qtitle: 'Question Title',
            qinstructions: "",
            shuffle: {
              rows: false,
              cols: false
            },
            rows: [{
              label: "r1",
              text: "Example 1"
            },{
              label: "r2",
              text: "Example 2"
            },{
              label: "r3",
              text: "Example 3"
            }]
        }
        this.props.addElement(element);
    }

    render() {
      return (
        <section className={`gui-editor gui-${this.props.status}`}>
            <div className="disabled-overlay"></div>
            { this.props.elements.map((element, index) => {
                return <ElementForm 
                        element={element} 
                        key={element.id} 
                        id={element.id} 
                        updateForm={this.updateForm} />
            })}
            <button className="add-element" onClick={this.addElement}>Add Element</button>
        </section>
      );
    }
  }