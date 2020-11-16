/**
 * Get flattened array.
 * @param {Array} items - Set of homogenous elements.
 * @param {Function} callback - Аdditional processing of array elements.
 * @throws {Error} The argument is not an array.
 * @returns {Array} Flattened array.
 */
export default function flat(items, callback = null) {
    if (!Array.isArray(items)) throw new Error('The argument is not an array.')
    if (!items || items == []) return 0
    items = items.flat(Infinity)
    if (callback != null) items.every((item, i, arr) => {
        let result = callback(item, i, arr)
        if (typeof result === 'undefined' || result === true) return true
        return false
    })
    return items
}