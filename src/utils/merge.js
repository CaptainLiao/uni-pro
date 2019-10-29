let hasOwnProperty = Object.prototype.hasOwnProperty
export default function merge(target) {
  target = typeof target !== 'object' || target === null ? {} : target;
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {};
    for (let prop in source) {
      if (hasOwnProperty.call(source, prop)) {
        let value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }

  return target;
}