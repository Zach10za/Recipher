
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
      let qlabel = "Q1"
      let id = 0;
      if (this.props.elements.length > 0) {
        const last_element = this.props.elements.slice(-1)[0];
        id = last_element.id + 1;
        if (last_element.qlabel.charAt(0) === "Q") {
            let qlabel_split = last_element.qlabel.split("Q");
            let qlabel_number = parseInt(qlabel_split[1],10);
            qlabel = "Q" + (qlabel_number + 1);
        }
      }
      let element = {
          id: id,
          qtype: "radio",
          qlabel: qlabel,
          qcond: "",
          qtitle: "",
          qinstruction: "",
          shuffle: {
            rows: false,
            cols: false
          },
          rows: [{
            label: "r1",
            value: "",
            text: "Example 1"
          },{
            label: "r2",
            value: "",
            text: "Example 2"
          },{
            label: "r3",
            value: "",
            text: "Example 3"
          }],
          cols: []
      }
      
      let elements = this.props.elements;
      elements.push(element);
      this.props.updateElements(elements);
    }

    removeElement(id) {
      let elements = this.props.elements;
      elements = elements.filter((obj) => {
        return obj.id !== id;
      });
      this.props.updateElements(elements);
    }

    saveProject(event) {
      this.props.saveProject();
    }

    loadProject(event) {
      this.props.loadProject(event.target.value);
    }

    render() {
      return (
        <section className={`gui-editor gui-${this.props.status}`}>
            <div className="disabled-overlay"></div>
            <select className="main-btns load-project" onChange={this.loadProject.bind(this)}>
              { this.props.projects.map((project, index) => {
                  return <option key={index} value={project}>{project}</option>
              })}
            </select>
            
            <a className="main-btns save-project" onClick={this.saveProject.bind(this)}>Save Project</a>
            { this.props.elements.map((element, index) => {
                return <ElementForm 
                        element={element} 
                        key={element.id} 
                        id={element.id} 
                        updateForm={this.updateForm}
                        removeElement={this.removeElement.bind(this)} />
            })}
            <a className="add-element" onClick={this.addElement}>+ New Element</a>
        </section>
      );
    }
  }