const SbDocTable = require('./doc-table');
const util = require('./util');

class SbModuleDoc {
  elements = [];

  get name() {
    return this.doc.name;
  }

  get longname() {
    return this.doc.longname;
  }

  get description() {
    if (this.doc.description) {
      return util.normalizeDescription(this.doc.description)
    }
    return '';
  }

  get kind() {
    return this.doc.kind;
  }

  get classes() {
    return this.elements.filter(element => element.kind == 'class');
  }

  get hasClasses() {
    return this.classes.length > 0;
  }

  get functions() {
    return this.elements.filter(element => element.kind == 'function');
  }

  get hasFunctions() {
    return this.functions.length > 0;
  }

  get constants() {
    return this.elements.filter(element => element.kind == 'constant');
  }

  get hasConstants() {
    return this.constants.length > 0;
  }

  constructor(doc) {
    this.doc = doc;
  }

  build(doc) {
    doc.addLine('# ' + this.longname);

    if (this.hasConstants) {
      doc.addLine('## Constatns')
      let docTable = new SbDocTable();
      docTable.addHeader("Name", "Type", "Description");
      this.constants.forEach(constantDoc => {
        docTable.addRow(...constantDoc.tableDocRow)
      })
      doc.addTable(docTable);
    }

    if (this.hasFunctions) {
      doc.addLine('## Functions')
      this.functions.forEach(functionDoc => {
        functionDoc.build(doc);
      })
    }

    if (this.hasClasses) {
      doc.addLine('## Classes')
      this.classes.forEach(classDoc => {
        classDoc.build(doc);
      })
    }
  }

  addElement(element) {
    if (this.isElement(element)) {
      this.elements.push(element);
    }
  }

  isElement(element) {
    return element.memberof == this.longname;
  }
}


module.exports = SbModuleDoc;
