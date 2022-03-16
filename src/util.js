function inlineCode(string) {
  return '`' + string + '`';
}

function normalizeDescription(description) {
  return description.split('\n').join(' ');
}

function normalizeType(type) {
  return type.replaceAll('.', '');
}

module.exports = {
  inlineCode,
  normalizeDescription,
  normalizeType
}
