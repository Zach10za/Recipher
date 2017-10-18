import React, { Component } from 'react';

import XMLEditor from './XMLEditor.js';
import GUIEditor from './GUIEditor.js';

//import logo from '../images/logo.svg';
import '../containers/App.css';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      xml: "",
      GUIEditor: {
        status: "enabled"
      },
      elements: [{
        id: 0,
        qtype: 'radio',
        qlabel: 'Q1',
        qcond: "",
        qtitle: 'Test Question',
        qinstructions: "",
        shuffle: {
          rows: true,
          cols: false
        },
        rows: [{
          label: "r1",
          value: "1",
          text: "test row 1"
        },{
          label: "r2",
          value: "2",
          text: "test row 2"
        },{
          label: "r3",
          value: "3",
          text: "test row 3"
        }]
      }]
    };
  }

  updateElements(elements) {
    this.setState({ elements });
  }

  updateXML(xml) {
    this.setState({ xml })
  }

  updateElement(element) {
    let elements = this.state.elements;
    let elem = elements[element.id];
    elem.qtype = element.qtype;
    elem.qlabel = element.qlabel;
    elem.qcond = element.qcond;
    elem.qtitle = element.qtitle;
    elem.qinstructions = element.qinstructions;
    elem.shuffle = element.shuffle;
    elem.rows = element.rows;
    elements[element.id] = elem;
    this.updateElements(elements);
    this.refs.XML.compileXML();
  }
  
  addElement(element) {
    let elements = this.state.elements;
    elements.push(element);
    this.updateElements(elements);
    this.refs.XML.compileXML();
  }

  handleXMLFocus(focus) {
    let GUIEditor = this.state.GUIEditor;
    if (focus === "focus") {
      GUIEditor.status = "disabled";
    } else if (focus === "blur") {
      GUIEditor.status = "enabled";
    }
    this.setState({ GUIEditor });
  }

  render() {
    return (
      <div className="App">
        <XMLEditor 
          ref='XML' 
          elements={this.state.elements}
          xml={this.state.xml}
          updateElements={this.updateElements.bind(this)}
          updateXML={this.updateXML.bind(this)}
          handleFocus={this.handleXMLFocus.bind(this)} />
        <GUIEditor 
          ref='GUI'
          elements={this.state.elements} 
          updateElement={this.updateElement.bind(this)}
          addElement={this.addElement.bind(this)}
          status={this.state.GUIEditor.status} />
      </div>
    );
  }
}

export default App;
