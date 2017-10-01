/* eslint no-empty: 0 */
/* eslint no-param-reassign: 0 */

function splitNested(str) {
  return [str]
    .join('.')
    .replace(/\[/g, '.')
    .replace(/\]/g, '')
    .split('.');
}

function get(target, field) {
  const pathArray = splitNested(field);
  let result;
  try {
    result = pathArray.reduce((curr, path) => curr[path], target);
  } catch (e) {}
  return result;
}

function set(target, field, value, safe = false) {
  const pathArray = splitNested(field);
  let level = 0;
  pathArray.reduce((a, b) => {
    level += 1;
    if (typeof a[b] === 'undefined') {
      if (!safe) throw new Error(`${a}.${b} is undefined`);
      a[b] = {};
      return a[b];
    }

    if (level === pathArray.length) {
      a[b] = value;
      return value;
    }
    return a[b];
  }, target);
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

function isDefined(value) {
  return typeof value !== 'undefined' && value !== null;
}

function sleep(fn, ms) {
  return setTimeout(() => fn(), ms);
}

export default {
  get,
  set,
  isFunction,
  isObject,
  isEmptyObject,
  isDefined,
  sleep
};
