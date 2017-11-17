
import React, { Component } from 'react';

export default class NewElementModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: "",
        }
        this.calculateRowLegends = this.calculateRowLegends.bind(this);
    }
    

    handleChange(e) {
        this.setState({text: e.target.value});
    }

    process(e) {
        e.preventDefault();
        const text = this.state.text;
        let element = {
            id: 99,
            qtype: "radio",
            qlabel: "",
            qcond: "",
            qtitle: "",
            qinstruction: "",
            shuffle: {
                rows: false,
                cols: false
            },
            colLegendRows: "",
            rows: [],
            cols: []
        };
        let tmp_rows = [];
        let tmp_rows_shuffle = false;
        const lines = text.split("\n");
        for (let i=0; i<lines.length; i++) {
            const line = lines[i].split("\t");
            if (line) {
                if (i === 0) {
                    element.qlabel = line[0].replace(".","");
                    element.qtitle = line[1];
                    if (line.length > 2) {
                        if (line[2].search(/please/i) > -1) {
                            element.qinstruction = line[2];
                        }
                        if (line[2].search(/check/i) > -1) {
                            element.qinstruction = line[2];
                            element.qtype = "checkbox";
                        }

                        if (line.length > 3) {
                        }

                    }
                } else {
                    if (line[0].search(/[0-9]/) > -1) {
                        let exclusive = false;
                        let anchor = false;
                        let open = false;
                        if (line.length > 2) {
                            if (line[2].search(/exclusive/i) > -1) {
                                exclusive = true;
                                anchor = true;
                                tmp_rows_shuffle = true;
                            }
                            if (line[2].search(/anchor/i) > -1) {
                                anchor = true;
                                tmp_rows_shuffle = true;
                            }
                        }
                        if (line[1] && line[1].search(/ \((please)? ?specify/i) > -1) {
                            line[1] = line[1].split(":")[0] + ":)";
                            anchor = true;
                            open = true;
                        }
                        tmp_rows.push({
                            label: "r"+line[0].trim(),
                            value: "",
                            text: (line[1] ? line[1].trim() : line[0].trim()),
                            anchor: anchor,
                            exclusive: exclusive,
                            open: open
                          });
                    } else if (line[0].search(/[A-Z]/) > -1) {
                        let exclusive = false;
                        let anchor = false;
                        let open = false;
                        if (line.length > 2) {
                            if (line[2].search(/exclusive/i) > -1) {
                                exclusive = true;
                                anchor = true;
                                element.shuffle.rows = true;
                            }
                            if (line[2].search(/anchor/i) > -1) {
                                anchor = true;
                                element.shuffle.rows = true;
                            }
                        }
                        if (line[1].search(/ \((please)? ?specify/i) > -1) {
                            line[1] = line[1].split(":")[0] + ":)";
                            anchor = true;
                            open = true;
                        }
                        element.rows.push({
                            label: line[0].trim(),
                            value: "",
                            text: line[1].trim(),
                            anchor: anchor,
                            exclusive: exclusive,
                            open: open
                          });
                    }

                }
            }
        }
        if (element.rows.length > 0) {
            element.shuffle.cols = tmp_rows_shuffle;
            for (let j=0; j<tmp_rows.length; j++) {
                tmp_rows[j].label = "c"+tmp_rows[j].label.split("r")[1];
                element.cols.push(tmp_rows[j]);
            }
            element.colLegendRows = this.calculateRowLegends(element.rows.length);
        } else {
            element.shuffle.rows = tmp_rows_shuffle;
            element.rows = tmp_rows;
        }
        this.props.addElement(element);
        this.setState({text: ""});
    }

    calculateRowLegends(num_rows) {
        const divisor = Math.round(num_rows / 10 - 0.2);
        if (divisor === 1) {
            return "";
        }
        let arr = [Math.ceil(num_rows / divisor) + 1];
        let remainder = num_rows % (Math.floor(num_rows / divisor));
        for (let i=1; i<divisor-1; i++) {
            arr.push((remainder > 1 ? 1 : 0) + arr[i-1] + Math.floor(num_rows / divisor))
            remainder--;
        }
        return arr;
    }

    render() {
        return this.props.open ? (
            <form ref="newElementModal" open={false} className="new-element-modal" onSubmit={this.process.bind(this)}>
                <label name="textbox" >Question</label>
                <textarea className="textbox" value={this.state.text} rows="50" onChange={this.handleChange.bind(this)} type="text" name="textbox" ></textarea>
                <input type="submit" value="Add Question" />
            </form>
        ) : null;
    }

}