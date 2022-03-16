const fs = require('fs');
const jsdoc = require('jsdoc-api');

const SbModuleDoc = require('./module-doc');
const SbClassDoc = require('./class-doc');
const SbMemberDoc = require('./member-doc');
const SbFunctionDoc = require('./function-doc');
const SbConstantDoc = require('./constant-doc');
const SbDoc = require('./doc');

function removeUnusedDocs(rawDoc) {
  // get module elements
  rawDoc = rawDoc.reduce((elements, element) => {
    if (!(element.ignore) && (element.scope != undefined || element.kind == 'module')) {
      elements.push(element);
    }
    return elements;
  }, [])

  // get all documented elements
  rawDoc = rawDoc.reduce((elements, element) => {
    if (!element.undocumented) {
      elements.push(element);
    }
    return elements;
  }, [])

  return rawDoc;
}

function transformDocs(rawDoc) {
  return rawDoc.map(element => {
    switch (element.kind) {
      case 'module':
        return new SbModuleDoc(element);
      case 'class':
        return new SbClassDoc(element);
      case 'member':
        return new SbMemberDoc(element);
      case 'function':
        return new SbFunctionDoc(element);
      case 'constant':
        return new SbConstantDoc(element);
      default:
        return undefined;
    }
  });
}

function assignModuleMembers(moduleDoc, rawDoc) {
  return rawDoc.reduce((elements, element) => {
    if (moduleDoc.isElement(element)) {
      moduleDoc.addElement(element);
    } else {
      elements.push(element);
    }
    return elements;
  }, []);
}

function assignModuleClassMembers(moduleDoc, rawDoc) {
  return rawDoc.reduce((elements, element) => {
    moduleDoc.classes.forEach(classDoc => {
      if (classDoc.isElement(element)) {
        classDoc.addElement(element);
      } else {
        elements.push(element);
      }
    })
    return elements;
  }, []);
}

function doc(input) {
  var rawDoc = jsdoc.explainSync({
    source: fs.readFileSync(input, 'utf-8')
  });
  rawDoc = removeUnusedDocs(rawDoc);
  rawDoc = transformDocs(rawDoc);

  const moduleDocIndex = rawDoc.findIndex(element => element.kind == 'module');
  if (moduleDocIndex < 0) {
    throw new Error('Module not defined!');
  }
  const moduleDoc = rawDoc.splice(moduleDocIndex, 1)[0];

  rawDoc = assignModuleMembers(moduleDoc, rawDoc);
  rawDoc = assignModuleClassMembers(moduleDoc, rawDoc);

  let doc = new SbDoc();
  moduleDoc.build(doc);

  return {moduleDoc, markdown: doc.toString()};
}

module.exports = doc;
