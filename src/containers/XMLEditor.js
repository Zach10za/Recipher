
import React, { Component } from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/xml';
import 'brace/theme/monokai';

import XMLHelper from '../utils/XMLHelper.js'

export default class XMLEditor extends Component {

    constructor(props) {
        super(props);
        this.elements = this.props.elements;
        this.handleChange = this.handleChange.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
        this.handleFocus = this.handleFocus.bind(this);

        this.compileXML(this.xml);
    }


    handleChange(value, event) {
        this.xml = value;
    }

    compileXML() {
        this.xml = XMLHelper.compileXML(this.elements);
        this.props.updateXML(this.xml);
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

    parseXML() {
        this.props.updateXML(this.xml);
        this.elements = XMLHelper.parseXML(this.xml);
        this.props.updateElements(this.elements);
    }

    render() {
      return (
        <section className="xml-editor">
            <AceEditor 
                mode="xml" 
                theme="monokai" 
                onChange={this.handleChange} 
                value={this.props.xml} 
                name="1" 
                onSelectionChange={this.handleSelection} 
                onFocus={this.handleFocus}
                onBlur={this.handleFocus} 
                editorProps={{ $blockScrolling: Infinity }} />
        </section>
      );
    }
  }