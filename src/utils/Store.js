const electron = window.require('electron');
const fs = window.require('fs');

class Store {

  constructor() {
    this.userDataPath = (electron.app || electron.remote.app).getPath('userData') + '\\projects\\';

    fs.stat(this.userDataPath, (err, stats) => {
      if (err) {
        try {
          fs.mkdir(this.userDataPath);
        } catch(error) {
          console.log(error);
        }
      }
      if (!stats.isDirectory()) {
        return new Error(this.userDataPath + ' exists and is not a directory');
      }
    });

    this.parseDataFile = this.parseDataFile.bind(this);
  }

  get(filename) {
    let path = this.userDataPath + filename + '.json';
    return this.parseDataFile(path);
  }

  set(project_name, state) {
    let path = this.userDataPath + project_name + '.json';
    try {
      fs.writeFileSync(path, JSON.stringify(state));
    } catch(err) {
      return(err);
    }
    console.log('Saved!');
  }

  list() {
    let list = fs.readdirSync(this.userDataPath);
    for (let i=0; i<list.length; i++) {
        list[i] = list[i].split('.json')[0];
    }
    return list;
  }

  getStats(filename) {
    let path = this.userDataPath + filename + '.json';
    return fs.statSync(path);
  }

  parseDataFile(filePath) {
    try {
      return JSON.parse(fs.readFileSync(filePath));
    } catch(err) {
      return err;
    }
  }

}

export default Store;
