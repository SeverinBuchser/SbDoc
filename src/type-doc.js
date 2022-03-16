const util = require('./util');

class SbTypeDoc {

  get types() {
    if (this.doc.names) {
      return this.doc.names.map(type => util.normalizeType(type));
    } else return [];
  }

  constructor(doc) {
    this.doc = doc;
  }

  get signature() {
    return this.types.join(' | ');
  }
}

module.exports = SbTypeDoc;
