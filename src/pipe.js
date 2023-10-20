const pipe = (...fns) => (arguments) => fns.reduce((value, fn) => fn(value), arguments);
module.exports = pipe;