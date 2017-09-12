/* eslint no-empty: 0 */

function get(target, field) {
  const pathArray = [field]
    .join('.')
    .replace(/\[/g, '.')
    .replace(/\]/g, '')
    .split('.');
  let result;
  try {
    result = pathArray.reduce((curr, path) => curr[path], target);
  } catch (e) {}
  return result;
}

function isFunction(obj) {
  return obj && (typeof obj === 'function');
}

/**
 * Checks if `value` is the Object. the `Object` except `Function` and `Array.`
 *
 * @param {*} obj - The value gonna check
 */
function isObject(obj) {
  const type = typeof obj;
  return obj !== null && type === 'object' && obj.constructor === Object;
}

function isEmptyObject(obj) {
  if (!isObject(obj)) return false;

  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const keys = Object.keys(obj);

  for (let i = 0; i < keys.length; i += 1) {
    if (hasOwnProperty.call(obj, keys[i])) return false;
  }

  return true;
}

export default {
  get,
  isFunction,
  isObject,
  isEmptyObject
};
