export const has = Object.prototype.hasOwnProperty;

export const convertToPlainObject = (data, excludes = []) => {
  const object = {};
  Object.getOwnPropertyNames(data).forEach((propertyName) => {
    if (!excludes.includes(propertyName) && has.call(data, propertyName)) {
      object[propertyName] = data[propertyName];
    }
  });
  return object;
};
