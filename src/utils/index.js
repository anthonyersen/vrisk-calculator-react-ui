export function toNumber(value) {
  if (!value) {
    return null;
  }

  const result = Number(value);

  return Number.isNaN(result) ? null : result;
}

export function formatNumber(value) {
  if (value === null) {
    return '';
  }

  return value;
}

export function hasOwnProperty(obj, property) {
  return Object.prototype.hasOwnProperty.call(obj, property);
}
