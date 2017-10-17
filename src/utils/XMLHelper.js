
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
            (element.shuffle.rows && element.shuffle.cols ? "\n shuffle=\"rows,cols\"" : "") +
            (element.shuffle.rows && !element.shuffle.cols ? "\n shuffle=\"rows\"" : "") +
            (element.shuffle.cols && !element.shuffle.rows ? "\n shuffle=\"cols\"" : "") +
            ">\n\t<title>" +
            element.qtitle +
            "</title>\n";
            for (let i=0; i<element.rows.length; i++) {
                xml += "\t<row label=\"" + element.rows[i].label + "\">" + element.rows[i].text + "</row>\n";
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
            shuffle: {
                rows: false,
                cols: false
            },
            rows: []
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
                            shuffle: {
                                rows: false,
                                cols: false
                            },
                            rows: []
                        };
                    } else {
                        elem.qtype = line.split("<")[1];
                    }
                }
                if (line.includes("<title>")) {
                    let title = line.split("<title>")[1];
                    elem.qtitle = title.split("</title>")[0];
                }
                if (line.includes("label")) {
                    if (line.includes("<row ")) {
                        let row = {
                            label: line.split("\"")[1],
                            text: line.split(">")[1].split("<")[0]
                        }
                        elem.rows.push(row);
                    } else {
                        elem.qlabel = line.split("\"")[1];
                    }
                }
                if (line.includes("shuffle")) {
                    if (line.includes("rows")) {
                        elem.shuffle.rows = true;
                    }
                    if (line.includes("cols")) {
                        elem.shuffle.cols = true;
                    }
                } 
            }
        }
        return elements;
    }

}

export default XMLHelper;