class SbDoc {
  string = '';

  addTable(docTable) {
    this.addLine(docTable.toString());
  }

  addCodeBlock(docCodeBlock) {
    this.addLine(docCodeBlock.toString());
  }

  addLine(string) {
    this.string += string + '\n';
  }

  toString() {
    return this.string;
  }
}

module.exports = SbDoc;
