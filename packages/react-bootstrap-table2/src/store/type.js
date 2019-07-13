import Const from '../const';

export const typeConvert = (type, value) => {
  if (!type || type === Const.TYPE_STRING) {
    return String(value);
  } else if (type === Const.TYPE_NUMBER) {
    return Number(value);
  } else if (type === Const.TYPE_BOOLEAN) {
    if (typeof value === 'boolean') {
      return value;
    }
    return value === 'true';
  } else if (type === Const.TYPE_DATE) {
    return new Date(value);
  }
  return value;
};

