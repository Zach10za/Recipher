
import React, { Component } from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/xml';
import 'brace/theme/monokai';

import XMLHelper from '../utils/XMLHelper.js'

export default class XMLEditor extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.state = ({
            xml: XMLHelper.compileXML(this.props.elements)
        })
    }

    handleChange(value, event) {
        const xml = value;
        this.setState({xml});
    }

    compileXML() {
        const xml = XMLHelper.compileXML(this.props.elements);
        this.setState({xml});
    }
    
    parseXML() {
        const elements = XMLHelper.parseXML(this.state.xml);
        this.props.updateElements(elements);
    }

    handleSelection(selection, event) {
        //let lead = [selection.selectionLead.column, selection.selectionLead.row];
        //let anchor = [selection.selectionAnchor.column, selection.selectionAnchor.row];
    }

    handleFocus(event) {
        if (event.type === "focus") {
            this.props.handleFocus("focus");
        } else if (event.type === "blur") {
            this.props.handleFocus("blur");
            this.parseXML();
        }
    }

    render() {
      return (
        <section className="xml-editor">
            <AceEditor 
                mode="xml" 
                theme="monokai" 
                onChange={this.handleChange} 
                value={this.state.xml} 
                name="1" 
                onSelectionChange={this.handleSelection} 
                onFocus={this.handleFocus}
                onBlur={this.handleFocus} 
                editorProps={{ $blockScrolling: Infinity }} />
        </section>
      );
    }
  }