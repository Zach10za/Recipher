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
        qtitle: 'Test Question',
        shuffle: {
          rows: true,
          cols: false
        },
        rows: [{
          label: "r1",
          text: "test row 1"
        },{
          label: "r2",
          text: "test row 2"
        },{
          label: "r3",
          text: "test row 3"
        }]
      },{
        id: 1,
        qtype: 'checkbox',
        qlabel: 'Q2',
        qtitle: 'Another Question',
        shuffle: {
          rows: false,
          cols: false
        },
        rows: [{
          label: "A",
          text: "test row A"
        },{
          label: "B",
          text: "test row B"
        }]
      }]
    };
  }

  updateElements(elements) {
    this.setState({ elements });
    console.log(this.state);
  }

  updateXML(xml) {
    this.setState({ xml })
  }

  updateElement(element) {
    let elements = this.state.elements;
    let elem = elements[element.id];
    elem.qtype = element.qtype;
    elem.qlabel = element.qlabel;
    elem.qtitle = element.qtitle;
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
