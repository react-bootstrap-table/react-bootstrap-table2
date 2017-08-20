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

export default {
  get
};
