const SbTypeDoc = require('./type-doc');
const util = require('./util');

class SbReturnsDoc {

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
    throw new Error(`Type has not been supplied to a return type!`)
  }

  constructor(doc) {
    this.doc = doc;
  }

  get tableDocRow() {
    return [
      '**Returns**',
      util.inlineCode(this.type.signature),
      this.description
    ]
  }
}

module.exports = SbReturnsDoc;
