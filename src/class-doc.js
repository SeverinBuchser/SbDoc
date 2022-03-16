const SbDocTable = require('./doc-table');
const SbParamDoc = require('./param-doc');
const SbDocCodeBlock = require('./doc-code-block');
const util = require('./util');

class SbClassDoc {
  elements = [];

  get name() {
    return this.doc.name;
  }

  get longname() {
    return this.doc.longname;
  }

  get memberof() {
    return this.doc.memberof;
  }

  get classdesc() {
    if (this.doc.classdesc) {
      return util.normalizeDescription(this.doc.classdesc)
    }
    return '';
  }

  get description() {
    if (this.doc.description) {
      return util.normalizeDescription(this.doc.description)
    }
    return '';
  }

  get augments() {
    if (this.doc.augments) {
      return this.doc.augments.join(', ');
    } else return undefined;
  }

  get scope() {
    return this.doc.scope;
  }

  get kind() {
    return this.doc.kind;
  }

  get params() {
    if (this.doc.params) {
      return this.doc.params.map(param => new SbParamDoc(param));
    } else return [];
  }

  get hasParams() {
    return this.params.length > 0;
  }

  get constructorSignature() {
    let signature = 'constructor(';
    this.params.forEach((param, index, params) => {
      signature += param.signature + (index + 1 < params.length ? ', ' : '');
    })
    return signature + ')';
  }

  get signature() {
    return this.kind + ' ' + this.name + (this.augments ? ' extends ' + this.augments : '');
  }


  get functions() {
    return this.elements.filter(element => element.kind == 'function');
  }

  get hasFunctions() {
    return this.functions.length > 0;
  }

  get staticFunctions() {
    return this.functions.filter(func => func.scope == 'static');
  }

  get nonStaticFunctions() {
    return this.functions.filter(func => func.scope != 'static');
  }

  get members() {
    return this.elements.filter(element => element.kind == 'member');
  }

  get hasMembers() {
    return this.members.length > 0;
  }

  get staticMembers() {
    return this.members.filter(member => member.scope == 'static');
  }

  get nonStaticMembers() {
    return this.members.filter(member => member.scope != 'static');
  }

  constructor(doc) {
    this.doc = doc;
  }

  build(doc) {
    doc.addLine('### ' + this.name);
    doc.addLine(this.classdesc);

    let docCodeBlock = new SbDocCodeBlock();
    docCodeBlock.addLine(this.signature + ' {');
    if (this.hasParams) {
      docCodeBlock.addLine('\t' + this.constructorSignature + ';');
    }

    this.nonStaticFunctions.forEach(functionDoc => {
      docCodeBlock.addLine('\t' + functionDoc.signature + ';');
    })
    this.staticFunctions.forEach(functionDoc => {
      docCodeBlock.addLine('\t' + functionDoc.signature + ';');
    })

    docCodeBlock.addLine('}');
    doc.addCodeBlock(docCodeBlock);

    if (this.hasMembers) {
      doc.addLine('#### Members');

      let docTable = new SbDocTable();
      docTable.addHeader("Name", "Type", "Description");
      this.nonStaticMembers.forEach(memberDoc => {
        docTable.addRow(...memberDoc.tableDocRow);
      })
      this.staticMembers.forEach(memberDoc => {
        docTable.addRow(...memberDoc.tableDocRow);
      })
      doc.addTable(docTable);
    }

    if (this.hasFunctions) {
      doc.addLine('#### Functions');
      this.nonStaticFunctions.forEach(functionDoc => functionDoc.build(doc));
      this.staticFunctions.forEach(functionDoc => functionDoc.build(doc))
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

module.exports = SbClassDoc;
