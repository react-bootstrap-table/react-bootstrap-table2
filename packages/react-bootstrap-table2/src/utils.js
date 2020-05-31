/* eslint no-empty: 0 */
/* eslint no-param-reassign: 0 */
/* eslint prefer-rest-params: 0 */
import _ from 'underscore';

function splitNested(str) {
  return [str]
    .join('.')
    .replace(/\[/g, '.')
    .replace(/\]/g, '')
    .split('.');
}

function contains(list, value) {
  if (_.includes) {
    return _.includes(list, value);
  }

  return list.indexOf(value) > -1;
}

function get(target, field) {
  const directGet = target[field];
  if (directGet !== undefined && directGet !== null) {
    return directGet;
  }

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

function isEmptyObject(obj) {
  if (!_.isObject(obj)) return false;

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

function debounce(func, wait, immediate) {
  let timeout;

  return () => {
    const later = () => {
      timeout = null;

      if (!immediate) {
        func.apply(this, arguments);
      }
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, wait || 0);

    if (callNow) {
      func.apply(this, arguments);
    }
  };
}

export default Object.assign(_, {
  get,
  set,
  isDefined,
  isEmptyObject,
  sleep,
  debounce,
  contains
});
