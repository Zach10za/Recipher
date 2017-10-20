
const Menu = window.require('electron').remote.Menu;

class CustomMenu {

  constructor() {
    this.template = [{
        label: 'File',
        submenu: [{
            label: 'New Project',
            click() {
              console.log('new project')
            }
          },{
            label: 'Recent',
            submenu: [{
                label: 'project_1',
                click() {
                  console.log('load project_!')
                }
              }]
          },{
            label: 'Open',
            click() {
              console.log('open')
            }
          },{
            label: 'Save',
            accelerator: 'Ctrl+S',
            click() {
              console.log('Saved!')
            }
        }]
    }];
  }

  static setMenu() {
    const appMenu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(appMenu);
  }

}

export default CustomMenu;