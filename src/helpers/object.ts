/**
 * Return a copy of the object with the specified properties removed.
 * @param {obj} object
 * @param {keys} array The list of properties to remove.
 */
export function objectWithoutProperties(obj: Record<string, any>, keys: Array<string>): Record<string, any> {
  const target: Record<string, any> = {};
  for (const i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}
