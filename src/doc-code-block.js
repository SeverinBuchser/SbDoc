class SbDocCodeBlock {
  string = '';

  addLine(string) {
    this.string += string + '\n';
  }

  toString() {
    return '```js\n' + this.string + '```';
  }
}

module.exports = SbDocCodeBlock
