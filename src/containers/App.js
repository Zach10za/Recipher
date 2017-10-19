import React, { Component } from 'react';

import XMLEditor from './XMLEditor.js';
import GUIEditor from './GUIEditor.js';
import Store from '../utils/Store.js';

import '../containers/App.css';

const Menu = window.require('electron').remote.Menu;


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      project: {
        name: "project_3"
      },
      GUIEditor: {
        status: "enabled"
      },
      elements: []
    };
    this.store = new Store();
    this.list = this.store.list();
    
    this.loadStateFromFile = this.loadStateFromFile.bind(this);

    this.setMenu();
  }

  updateElements(elements) {
    this.setState({ elements }, () => {
      this.refs.XML.compileXML();
    }, this);
  }

  updateElement(element) {
    let elements = this.state.elements;
    let elem = elements[element.id];
    elem.qtype = element.qtype;
    elem.qlabel = element.qlabel;
    elem.qcond = element.qcond;
    elem.qtitle = element.qtitle;
    elem.qinstruction = element.qinstruction;
    elem.shuffle = element.shuffle;
    elem.rows = element.rows;
    elem.cols = element.cols;
    elements[element.id] = elem;
    this.updateElements(elements);
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

  saveStateToFile() {
    this.store.set(this.state.project.name, this.state);
  }

  loadStateFromFile(project_name) {
    let state = this.store.get(project_name);
    this.setState(state, () => {
      this.updateElements(this.state.elements);
    }, this);
    console.log('Loaded '+ project_name, this.state);
  }

  render() {
    return (
      <div className="App">
        <XMLEditor 
          ref='XML' 
          elements={this.state.elements}
          updateElements={this.updateElements.bind(this)}
          handleFocus={this.handleXMLFocus.bind(this)} />
        <GUIEditor 
          ref='GUI'
          elements={this.state.elements} 
          projects={this.list}
          updateElement={this.updateElement.bind(this)}
          updateElements={this.updateElements.bind(this)}
          status={this.state.GUIEditor.status}
          saveProject={this.saveStateToFile.bind(this)}
          loadProject={this.loadStateFromFile.bind(this)} />
      </div>
    );
  }

  setMenu() {
    let load_submenu = [];
    const projects = this.store.list();
    load_submenu = projects.map((project) => {
      return {
        label: project,
        click() {
          this.loadStateFromFile(project);
        }
      }
    }, this);
    console.log(load_submenu);
    let template = [
      {
        label: "File",
        submenu: [
          {
            label: "New Project",
            accelerator: "Ctrl+N",
            click() {
              alert("New Project");
            }
          },
          {
            label: "Load",
            submenu: load_submenu
          },
          {
            label: "Save",
            accelerator: "Ctrl+S",
            click() {
              this.saveStateToFile();
            }
          }
        ]
      },
      {
        label: "Edit",
        submenu: [
          {
            label: "Cut",
            role: ""
          },
          {
            label: "Copy",
            role: ""
          },
          {
            label: "Paste",
            role: ""
          },
          {
            label: "Preferences",
            role: ""
          }
        ]
      },
      {
        label: "Help",
        submenu: [
          {
            label: "About",
            click() {
              alert("About");
            }
          },
          {
            label: "Contribute",
            click() {
              alert("Contribute");
            }
          },
          {
            label: "Check for Update",
            click() {
              alert("Check for Update");
            }
          }
        ]
      }
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  }

}

export default App;
