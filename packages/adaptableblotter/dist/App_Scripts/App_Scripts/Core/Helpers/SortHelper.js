"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SortHelper;
(function (SortHelper) {
    function orderBy(collection, iteratees, orders, functions) {
        let index = -1;
        const result = baseMap(collection, (value, key, collection) => {
            const criteria = iteratees.map((iteratee) => iteratee(value));
            return { 'criteria': criteria, 'index': ++index, 'value': value };
        });
        return sortBy(result, (object, other) => compareMultiple(object, other, orders, functions));
    }
    SortHelper.orderBy = orderBy;
    function baseMap(collection, iteratee) {
        var index = -1, result = Array(collection.length);
        baseEach(collection, function (value, key, collection) {
            result[++index] = iteratee(value, key, collection);
        });
        return result;
    }
    function compareMultiple(object, other, orders, functions) {
        let index = -1;
        const objCriteria = object.criteria;
        const othCriteria = other.criteria;
        const length = objCriteria.length;
        while (++index < length) {
            var order = orders[index];
            var sortFunction = functions[index];
            let result;
            result = sortFunction(objCriteria[index], othCriteria[index], order);
            if (result) {
                return result;
            }
        }
        return object.index - other.index;
    }
    function sortBy(array, comparer) {
        let { length } = array;
        array.sort(comparer);
        while (length--) {
            array[length] = array[length].value.OriginalIndex;
        }
        return array;
    }
    function baseEach(collection, iteratee) {
        if (collection == null) {
            return collection;
        }
        const length = collection.length;
        const iterable = Object(collection);
        let index = -1;
        while (++index < length) {
            if (iteratee(iterable[index], index, iterable) === false) {
                break;
            }
        }
        return collection;
    }
})(SortHelper = exports.SortHelper || (exports.SortHelper = {}));
