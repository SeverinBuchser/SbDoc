const SbTypeDoc = require('./type-doc');
const util = require('./util');

class SbMemberDoc {

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

  get readonly() {
    return this.doc.readonly;
  }

  get type() {
    if (this.doc.type) {
      return new SbTypeDoc(this.doc.type);
    }
    throw new Error(`${this.longname} is missing a type!`)
  }

  get signature() {
    return (this.scope == 'static' || this.readonly ? 'static ' : '') + this.name;
  }

  constructor(doc) {
    this.doc = doc;
  }

  get tableDocRow() {
    return [
      util.inlineCode(this.signature),
      util.inlineCode(this.type.signature),
      this.description
    ]
  }
}

module.exports = SbMemberDoc;
