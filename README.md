# sb-doc

Library for markdown JavaScript documentation.

## Installation

```
npm install --save-dev sb-doc
```

## Usage

Say you have a directory layout:

```
.
├── src/src-file.js
└── documentation.js
```

With the following contents:

```js
// src/src-file.js
/**
 * @module module-name
 */

/**
 * A class description.
 */
class SrcClass {
   
  /**
   * A static member.
   * @type {Array<any>}
   * @readonly
   */
  static aMember;
    
  /**
   * A member.
   * @type {Array<any>}
   */
  aMember;

  /**
   * Also a member.
   * @type {number}
   */
  get alsoAMember() {
    return 0;
  }

  /**
   * A constructor.
   * @param {Array<number>} numbers The variable array numbers.
   */
  constructor(...numbers) {
  	// ...
  }
    
  /**
   * A non static method, who overrides its super class function.
   * @returns {string} A string is returned.
   * @override
   */
  nonStaticFunction() {
    // ...
  }

  /**
   * Does something.
   * @param {object} options The options.
   */
  static staticFunction(options) {
    // ...
  }
}


module.exports = {
  SrcClass
}

```

```js
// documentation.js
const sbDoc = require('sb-doc');
console.log(sbDoc('src/src-file.js').markdown) 

// Output:
//
// # module:module-name
// ## Constatns
// | Name | Type | Description | 
// | --- | --- | --- |
// | `someConstant` | `object` | A constant | 
// 
// ## Functions
// ##### `aFunction()`
// A function.
// | Parameters | - |  | 
// | --- | --- | --- |
// | **Returns** | `void` | 
// 
// ## Classes
// ### SrcClass
// A class description.
// ```js
// class SrcClass {
// 	constructor(...numbers);
// 	@override nonStaticFunction();
// 	static staticFunction(options);
// }
// ```
// #### Members
// | Name | Type | Description | 
// | --- | --- | --- |
// | `static aStaticMember` | `Array<any>` | A static member. | 
// | `aMember` | `Array<any>` | A member. | 
// | `alsoAMember` | `number` | Also a member. | 
// 
// #### Functions
// ##### `@override nonStaticFunction()`
// A non static method, who overrides its super class function.
// | Parameters | - |  | 
// | --- | --- | --- |
// | **Returns** | `string` | A string is returned. | 
// 
// ##### `static staticFunction(options)`
// Does something.
// | Parameters |  |  | 
// | --- | --- | --- |
// | **Name** | **Type** | **Description** | 
// | `options` | `object` | The options. | 
// | **Returns** | `void` | 
```

Which results in the following markdown:

> # module:module-name
> ## Constatns
> | Name | Type | Description |
> | --- | --- | --- |
> | `someConstant` | `object` | A constant |
> 
> ## Functions
> ##### `aFunction()`
> A function.
> | Parameters | - |  |
> | --- | --- | --- |
> | **Returns** | `void` |
> 
> ## Classes
> ### SrcClass
> A class description.
> ```js
> class SrcClass {
> 	constructor(...numbers);
> 	@override nonStaticFunction();
> 	static staticFunction(options);
> }
> ```
> #### Members
> | Name | Type | Description |
> | --- | --- | --- |
> | `static aStaticMember` | `Array<any>` | A static member. |
> | `aMember` | `Array<any>` | A member. |
> | `alsoAMember` | `number` | Also a member. |
> 
> #### Functions
> ##### `@override nonStaticFunction()`
> A non static method, who overrides its super class function.
> | Parameters | - |  |
> | --- | --- | --- |
> | **Returns** | `string` | A string is returned. |
> 
> ##### `static staticFunction(options)`
> Does something.
> | Parameters |  |  |
> | --- | --- | --- |
> | **Name** | **Type** | **Description** |
> | `options` | `object` | The options. |
> | **Returns** | `void` |

## Further Documentation

For more accurate and detailed insight go visit the [GitHub Page](https://github.com/SeverinBuchser/SbDoc.git) and look into the source code or the documentation.

## Creator

Severin Buchser

* [GitHub](https://github.com/SeverinBuchser)
* [Npm](https://www.npmjs.com/~severinbuchser)
