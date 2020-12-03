/**
 * Get flattened array.
 * @param {Array} items - Set of homogenous elements.
 * @param {Function} callback - Аdditional processing of array elements.
 * @throws {Error} The argument is not an array.
 * @returns {Array} Flattened array.
 */
export function flat(items, callback = null) {
    if (!Array.isArray(items)) throw new Error('The argument is not an array.')
    if (!items || items == []) return items
    items = items.flat(Infinity)
    if (callback != null) items.every((item, i, arr) => {
        let result = callback(item, i, arr)
        if (typeof result === 'undefined' || result === true) return true
        return false
    })
    return items
}

export function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

export function isArray(item) {
    return Array.isArray(item)
}

export function merge(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();
    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                merge(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }
    return merge(target, ...sources);
}