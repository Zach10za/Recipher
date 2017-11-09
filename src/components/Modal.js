
import React, { Component } from 'react';

export default class ElementCol extends Component {

    constructor(props) {
        super(props);
        this.state = {
            project_name: this.props.project_name,
        }
    }
    

    handleChange(e) {
        this.setState({project_name: e.target.value});
    }

    saveAs(e) {
        e.preventDefault();
        this.props.save(this.state.project_name);
    }

    render() {
        console.log(this.props.open);
        return this.props.open ? (
            <form ref="saveModal" open={false} className="save-modal" onSubmit={this.saveAs.bind(this)}>
                <h4>Save As</h4>
                <label name="save-as" >Project Name</label>
                <input className="save-as" value={this.state.project_name} onChange={this.handleChange.bind(this)} type="text" name="save-as" />
                <input type="submit" value="Save" />
            </form>
        ) : null;
    }

}