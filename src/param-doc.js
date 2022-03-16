const SbTypeDoc = require('./type-doc');
const util = require('./util');

class SbParamDoc {

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

  get type() {
    if (this.doc.type) {
      return new SbTypeDoc(this.doc.type);
    }
    throw new Error(`${this.longname} is missing a type!`)
  }

  get variable() {
    return this.doc.variable;
  }

  constructor(doc) {
    this.doc = doc;
  }

  get signature() {
    return (this.variable ? '...' : '') + this.name;
  }

  get tableDocRow() {
    return [
      util.inlineCode(this.signature),
      util.inlineCode(this.type.signature),
      this.description
    ]
  }
}

module.exports = SbParamDoc;
