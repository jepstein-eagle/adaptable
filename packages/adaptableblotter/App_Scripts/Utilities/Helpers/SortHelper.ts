
    export function orderBy(collection: any, iteratees: any, orders: any, functions: any): any {
        let index = -1
    
        const result = baseMap(collection, (value: any, key: any, collection: any) => {
            const criteria = iteratees.map((iteratee: any) => iteratee(value))
            return { 'criteria': criteria, 'index': ++index, 'value': value }
        })

        return sortBy(result, (object: any, other: any) => compareMultiple(object, other, orders, functions))
    }

    function baseMap(collection: any, iteratee: any) {
        var index = -1,
            result = Array(collection.length)
        baseEach(collection, function (value: any, key: any, collection: any) {
            result[++index] = iteratee(value, key, collection);
        });
        return result;
    }

    function compareMultiple(object: any, other: any, orders: any, functions: any) {
        let index = -1
        const objCriteria = object.criteria
        const othCriteria = other.criteria
        const length = objCriteria.length
      
        while (++index < length) {
            var order = orders[index] 
            var sortFunction = functions[index] 
            let result;
            result = sortFunction(objCriteria[index], othCriteria[index], order)
            if (result) {
                return result
            }
        }
        return object.index - other.index
    }


    function sortBy(array: any, comparer: any) {
        let { length } = array

        array.sort(comparer)
        while (length--) {
            array[length] = array[length].value.OriginalIndex
        }
        return array
    }

    function baseEach(collection: any, iteratee: any) {
        if (collection == null) {
            return collection
        }

        const length = collection.length
        const iterable = Object(collection)
        let index = -1

        while (++index < length) {
            if (iteratee(iterable[index], index, iterable) === false) {
                break
            }
        }
        return collection
    }

export const SortHelper = {
    orderBy
}
export default SortHelper