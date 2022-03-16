const SbParamDoc = require('./param-doc');
const SbReturnsDoc = require('./returns-doc');
const SbDocTable = require('./doc-table');
const util = require('./util');

class SbFunctionDoc {

  get name() {
    return this.doc.name;
  }

  get longname() {
    return this.doc.longname;
  }

  get memberof() {
    return this.doc.memberof;
  }

  get description() {
    if (this.doc.description) {
      return util.normalizeDescription(this.doc.description)
    }
    return '';
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

  get returns() {
    if (this.doc.returns) {
      return this.doc.returns.map(returns => new SbReturnsDoc(returns));
    } else return [];
  }

  get hasReturns() {
    return this.returns.length > 0;
  }

  get signature() {
    let signature = '';
    signature += this.doc.override ? '@override ' : '';
    signature += this.scope == 'static' ? 'static ' : '';
    signature += this.name + '(';
    this.params.forEach((param, index, params) => {
      signature += param.signature + (index + 1 < params.length ? ', ' : '');
    })
    return signature + ')';
  }

  constructor(doc) {
    this.doc = doc;
  }

  build(doc) {
    doc.addLine('##### ' + util.inlineCode(this.signature));
    doc.addLine(this.description);

    let docTable = new SbDocTable();
    if (this.hasParams) {
      docTable.addHeader("Parameters", "", "")
      docTable.addRow("**Name**", "**Type**", "**Description**")
    } else {
      docTable.addHeader("Parameters", "-", "")
    }
    this.params.forEach(param => {
      docTable.addRow(...param.tableDocRow)
    })
    if (this.hasReturns) {
      this.returns.forEach(returns => {
        docTable.addRow(...returns.tableDocRow);
      })
    } else {
      docTable.addRow("**Returns**", util.inlineCode("void"));
    }
    doc.addTable(docTable);
  }
}

module.exports = SbFunctionDoc;
