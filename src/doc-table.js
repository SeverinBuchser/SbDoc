class SbDocTable {
  string = '';

  addHeader(...heads) {
    this.string += '| '
    heads.forEach(head => {
      this.string += head + ' | ';
    })
    this.string += '\n|' + heads.reduce(separator => separator += ' --- |', '') + '\n';
  }

  addRow(...columns) {
    this.string += '| '
    columns.forEach(column => {
      this.string += column + ' | ';
    })
    this.string += '\n';
  }

  toString() {
    return this.string;
  }
}

module.exports = SbDocTable
