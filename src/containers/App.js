import React, { Component } from 'react';

import XMLEditor from './XMLEditor.js';
import GUIEditor from './GUIEditor.js';
import Modal from '../components/Modal.js';
import NewElementModal from '../components/NewElementModal.js';
import Store from '../utils/Store.js';
import '../utils/GUIHelper.js';

import '../containers/App.css';

const Menu = window.require('electron').remote.Menu;
const ipcRenderer = window.require('electron').ipcRenderer;



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      project: {
        name: ""
      },
      GUIEditor: {
        status: "enabled"
      },
      elements: [],
      modal: {
        open: false
      },
      newElementModal: {
        open: false
      }
    };
    this.store = new Store();
    this.list = this.store.list();
    
    this.loadStateFromFile = this.loadStateFromFile.bind(this);
    this.saveStateToFile = this.saveStateToFile.bind(this);
    this.setMenu = this.setMenu.bind(this);
    this.saveAs = this.saveAs.bind(this);

    this.setMenu();

    this.handler = (ev) => {
      if (ev.type === 'beforeunload') {
        if (!this.state.project.name) {
          ev.returnValue = 'false';
          this.saveStateToFile();
        } else {
          let file = this.store.get(this.state.project.name);
          let current = this.state;
          let similar = JSON.stringify(file) === JSON.stringify(current);
          if (!similar) {
            this.saveStateToFile();
          }
        }
      }
    }
  }

  updateElements(elements) {
    this.setState({ elements }, () => {
      this.refs.XML.compileXML();
    }, this);
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.handler)
    if (localStorage.getItem('project_name')) {
      this.loadStateFromFile(localStorage.getItem('project_name'));
    }
  }

  componentWillUnmount() {
     window.removeEventListener("beforeunload", this.handler)
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
    elem.colLegendRows = element.colLegendRows;
    elem.rows = element.rows;
    elem.cols = element.cols;
    elements[element.id] = elem;
    this.updateElements(elements);
  }

  addElement(element) {
    let elements = this.state.elements;
    const id = (elements.length > 0 ? elements[elements.length-1].id + 1 : 0);
    element.id = id;
    elements.push(element);
    this.updateElements(elements);
    this.setState({newElementModal: {open: false}});
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
    if (!this.state.project.name) {
      this.setState({modal: {open: true}});
    } else {
      this.store.set(this.state.project.name, this.state);
    }
  }

  loadStateFromFile(project_name) {
    let state = this.store.get(project_name);
    localStorage.setItem('project_name', project_name);
    this.setState(state, () => {
      this.updateElements(this.state.elements);
    }, this);
  }

  saveAs(name) {
    let state = this.state;
    state.project.name = name;
    state.modal.open = false;
    this.setState({state});
    this.saveStateToFile();
  }

  render() {
    return (
      <div className="App">
        <Modal
          ref="saveAs"
          open={this.state.modal.open}
          project_name={this.state.project.name}
          save={this.saveAs} />
          
        <NewElementModal
          ref="newElementModal"
          addElement={this.addElement.bind(this)}
          open={this.state.newElementModal.open} />

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
    
    ipcRenderer.on("load-project", function(e, project) {
      this.loadStateFromFile(project);
    }.bind(this));
    
    ipcRenderer.on("save-project", function(e, project) {
      this.saveStateToFile();
    }.bind(this));

    ipcRenderer.on("new-element", function(e, project) {
      this.setState({newElementModal: {open: true}});
    }.bind(this));

    let load_submenu = [];
    const projects = this.store.list();
    load_submenu = projects.map((project) => {
      return {
        label: project,
        click(m,b,e) {
          b.webContents.send("load-project", project);
        }
      }
    }, this);
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
            click(m,b,e) {
              b.webContents.send("save-project");
            }
          }, 
          {
            label: "Force Reload",
            role: "forcereload"
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
        label: "Elements",
        submenu: [
          {
            label: "New Element",
            accelerator: "Ctrl+N",
            click(m,b,e) {
              b.webContents.send("new-element");
            }
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
            click(m,b,e) {
              b.webContents.send("load-project");
            }
          }
        ]
      }
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  }

  


}


export default App;
