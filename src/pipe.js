/** 
* Sirve para realizar procesos en orden como en las tuberías
*/
const pipe = (...fns) => (arguments) => fns.reduce((value, fn) => fn(value), arguments);
module.exports = pipe;