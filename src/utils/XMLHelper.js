
class XMLHelper {

    static compileXML(elements) {
        let xml = "";
        for (let i=0; i<elements.length; i++) {
            let element = elements[i];
            xml += "\n<" + 
            element.qtype +
            "\n label=\"" +
            element.qlabel +
            "\"" +
            (element.qcond ? "\n cond=\"" + element.qcond + "\"": "") +
            (element.shuffle.rows && element.shuffle.cols ? "\n shuffle=\"rows,cols\"" : "") +
            (element.shuffle.rows && !element.shuffle.cols ? "\n shuffle=\"rows\"" : "") +
            (element.shuffle.cols && !element.shuffle.rows ? "\n shuffle=\"cols\"" : "") +
            ">\n\t<title>" +
            element.qtitle +
            "</title>\n"+
            (element.qinstruction ? "\t<comment><em>" + element.qinstruction + "</em></comment>\n" : "");
            for (let i=0; i<element.cols.length; i++) {
                xml += "\t<col label=\"" + 
                        element.cols[i].label + 
                        "\""+
                        (element.cols[i].value ? " value=\""+ element.cols[i].value + "\"" : "") +
                        (element.cols[i].anchor ? " randomize=\"0\"" : "") +
                        (element.cols[i].exclusive ? " exclusive=\"1\"" : "") +
                        ">" + 
                        element.cols[i].text + 
                        "</col>\n";
            }
            for (let i=0; i<element.rows.length; i++) {
                xml += "\t<row label=\"" + 
                        element.rows[i].label + 
                        "\""+
                        (element.rows[i].value ? " value=\""+ element.rows[i].value + "\"" : "") +
                        (element.rows[i].anchor ? " randomize=\"0\"" : "") +
                        (element.rows[i].exclusive ? " exclusive=\"1\"" : "") +
                        ">" + 
                        element.rows[i].text + 
                        "</row>\n";
            }
            xml += "</" + element.qtype + ">\n";
        }
        return xml;
    }

    static parseXML(xml) {
        const split = xml.split("\n");
        let elements = [];
        let elem = {
            id: null,
            qtype: "",
            qlabel: "",
            qtitle: "",
            qinstruction: "",
            qcond: "",
            shuffle: {
                rows: false,
                cols: false
            },
            rows: [],
            cols: []
        };
        for (let i=0; i<split.length; i++) {
            const line = split[i];
            if (line.length > 0) {
                if (line.charAt(0) === "<") {
                    if (line.charAt(1) === "/") { //detect closing line
                        elem.id = elements.length;
                        const element = JSON.parse(JSON.stringify(elem));
                        elements.push(element);
                        elem = {
                            id: null,
                            qtype: "",
                            qlabel: "",
                            qtitle: "",
                            qinstruction: "",
                            qcond: "",
                            shuffle: {
                                rows: false,
                                cols: false
                            },
                            rows: [],
                            cols: []
                        };
                    } else {
                        elem.qtype = line.split("<")[1];
                    }
                }
                if (line.includes("<title>")) {
                    let title = line.split("<title>")[1];
                    elem.qtitle = title.split("</title>")[0];
                }
                if (line.includes("<comment><em>")) {
                    let instruction = line.split("<comment><em>")[1];
                    elem.qinstruction = instruction.split("</em></comment>")[0];
                }
                if (line.includes("label=")) {
                    if (line.includes("<row ")) {
                        let row = {
                            label: line.split("\"")[1],
                            value: "",
                            text: line.split(">")[1].split("<")[0],
                            anchor: false,
                            exclusive: false
                        }
                        if (line.includes("value=")) {
                            row.value = line.split("value=\"")[1].split("\"")[0];
                        } 
                        if (line.includes("randomize=")) {
                            row.anchor = line.split("randomize=\"")[1].split("\"")[0] === "0";
                        } 
                        if (line.includes("exclusive=")) {
                            row.exclusive = line.split("exclusive=\"")[1].split("\"")[0] ===  "1";
                        } 
                        elem.rows.push(row);
                    } else if (line.includes("<col ")) {
                        let col = {
                            label: line.split("\"")[1],
                            value: "",
                            text: line.split(">")[1].split("<")[0],
                            anchor: false,
                            exclusive: false
                        }
                        if (line.includes("value=")) {
                            col.value = line.split("value=\"")[1].split("\"")[0];
                        } 
                        if (line.includes("randomize=")) {
                            col.anchor = line.split("randomize=\"")[1].split("\"")[0] === "0";
                        } 
                        if (line.includes("exclusive=")) {
                            col.exclusive = line.split("exclusive=\"")[1].split("\"")[0] ===  "1";
                        } 
                        elem.cols.push(col);
                    } else {
                        elem.qlabel = line.split("\"")[1];
                    }
                }
                if (line.includes("shuffle=")) {
                    if (line.includes("rows")) {
                        elem.shuffle.rows = true;
                    }
                    if (line.includes("cols")) {
                        elem.shuffle.cols = true;
                    }
                }
                if (line.includes("cond=")) {
                    elem.qcond = line.split("\"")[1];
                }
            }
        }
        return elements;
    }

}

export default XMLHelper;