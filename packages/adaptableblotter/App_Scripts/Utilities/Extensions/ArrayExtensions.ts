import { SortOrder } from '../../PredefinedConfig/Common/Enums';

export function GetLength(arrayToCheck: any[]): number {
  return arrayToCheck.length;
}

export function CorrectLength(arrayToCheck: any[], requiredLength: number): boolean {
  return GetLength(arrayToCheck) == requiredLength;
}

export function NotCorrectLength(arrayToCheck: any[], requiredLength: number): boolean {
  return !CorrectLength(arrayToCheck, requiredLength);
}

export function AddItem(array: any[], itemToAdd: any): void {
  if (ArrayExtensions.NotContainsItem(array, itemToAdd)) {
    array.push(itemToAdd);
  }
}

export function ContainsItem(array: any[], itemToCheck: any): boolean {
  if (array == null) {
    return false;
  }
  return array.indexOf(itemToCheck) > -1;
}

export function NotContainsItem(array: any[], itemToCheck: any): boolean {
  return !ContainsItem(array, itemToCheck);
}

export function RetrieveDistinct(array: any[]): any[] {
  return Array.from(new Set(array.map(item => item)));
}

export function IsNull(arrayToCheck: any[] | undefined | null): boolean {
  return arrayToCheck == null || arrayToCheck == undefined;
}

export function IsNotNull(arrayToCheck: any[] | undefined | null): boolean {
  return !ArrayExtensions.IsNull(arrayToCheck);
}

export function IsEmpty(arrayToCheck: any[]): boolean {
  return arrayToCheck.length == 0;
}

export function IsNotEmpty(arrayToCheck: any[]): boolean {
  return !ArrayExtensions.IsEmpty(arrayToCheck);
}

export function IsNullOrEmpty(arrayToCheck: any[] | undefined | null): boolean {
  return ArrayExtensions.IsNull(arrayToCheck) || ArrayExtensions.IsEmpty(arrayToCheck);
}

export function IsNotNullOrEmpty(arrayToCheck: any[] | undefined | null): boolean {
  return ArrayExtensions.IsNotNull(arrayToCheck) && ArrayExtensions.IsNotEmpty(arrayToCheck);
}

export function hasOneItem(arrayToCheck: any[]): boolean {
  return hasItemsOfCount(arrayToCheck, 1);
}

export function hasItemsOfCount(arrayToCheck: any[], numberOfItems: number): boolean {
  return arrayToCheck.length == numberOfItems;
}

export function moveArray(array: any[], from: number, to: number): void {
  array.splice(to, 0, array.splice(from, 1)[0]);
}

//This deliberately only checks contents equality and not positional so [1, 2, 3]== [1, 3, 2]
export function areArraysEqual(arr1: any[], arr2: any[]) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  return arr1.every(x => arr2.indexOf(x) != -1);
}

export function areArraysNotEqual(arr1: any[], arr2: any[]) {
  return !areArraysEqual(arr1, arr2);
}

export function areArraysEqualWithOrder(arr1: any[], arr2: any[]): boolean {
  if (arr1 == null) {
    return true;
  }

  if (arr1.length !== arr2.length) {
    return false;
  }
  return arr1.every((x, index) => arr2.indexOf(x) == index);
}

export function areArraysEqualWithOrderandProperties(value: any[], other: any[]): boolean {
  var type = Object.prototype.toString.call(value);

  // If the two objects are not the same type, return false
  if (type !== Object.prototype.toString.call(other)) {
    return false;
  }

  // If items are not an object or array, return false
  if (['[object Array]', '[object Object]'].indexOf(type) < 0) {
    return false;
  }

  // Compare the length of the length of the two items
  var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
  var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
  if (valueLen !== otherLen) {
    return false;
  }

  // Compare two items
  var compare = function(item1: any, item2: any) {
    // Get the object type
    var itemType = Object.prototype.toString.call(item1);

    // If an object or array, compare recursively
    if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
      if (!areArraysEqualWithOrderandProperties(item1, item2)) {
        return false;
      }
    }

    // Otherwise, do a simple comparison
    else {
      // If the two items are not the same type, return false
      if (itemType !== Object.prototype.toString.call(item2)) {
        return false;
      }

      // Else if it's a function, convert to a string and compare
      // Otherwise, just compare
      if (itemType === '[object Function]') {
        if (item1.toString() !== item2.toString()) {
          return false;
        }
      } else {
        if (item1 !== item2) {
          return false;
        }
      }
    }
  };

  // Compare properties
  if (type === '[object Array]') {
    for (var i = 0; i < valueLen; i++) {
      if (compare(value[i], other[i]) === false) {
        return false;
      }
    }
  } else {
    for (var key in value) {
      if (value.hasOwnProperty(key)) {
        if (compare(value[key], other[key]) === false) {
          return false;
        }
      }
    }
  }

  // If nothing failed, return true
  return true;
}

export function sortArrayWithProperty(
  sortOrder: SortOrder,
  values: any[],
  sortProperty?: string
): any[] {
  if (sortProperty) {
    let newValues = [].concat(values);
    let direction = 1;
    if (sortOrder == SortOrder.Descending) {
      direction = -1;
    }
    return newValues.sort((a, b) => {
      let aSortProperty = a[sortProperty];
      let bSortProperty = b[sortProperty];
      if (typeof aSortProperty == 'string' && typeof bSortProperty == 'string') {
        return aSortProperty.localeCompare(bSortProperty) * direction;
      } else {
        return aSortProperty < bSortProperty
          ? -1 * direction
          : aSortProperty > bSortProperty
          ? 1 * direction
          : 0;
      }
    });
  } else {
    return sortArray(values, sortOrder);
  }
}
export function sortArray(values: any[], sortOrder: SortOrder = SortOrder.Ascending): any[] {
  let newValues = [].concat(values);
  let direction = 1;
  if (sortOrder == SortOrder.Descending) {
    direction = -1;
  }
  return newValues.sort((a, b) => (a < b ? -1 * direction : a > b ? 1 * direction : 0));
}

export function groupArrayBy(array: Array<any>, prop: string): Array<any> {
  return array.reduce((acc, item) => {
    var key = item[prop];
    acc[key] = acc[key] || [];
    acc[key].push(item);
    return acc;
  }, {});
}

export function createCommaSeparatedString(values: any[]): string {
  return values.join(', ');
}
export const ArrayExtensions = {
  GetLength,
  CorrectLength,
  NotCorrectLength,
  groupArrayBy,
  AddItem,
  ContainsItem,
  NotContainsItem,
  RetrieveDistinct,
  IsNull,
  IsNotNull,
  IsEmpty,
  IsNotEmpty,
  IsNullOrEmpty,
  IsNotNullOrEmpty,
  hasOneItem,
  hasItemsOfCount,
  moveArray,
  areArraysEqual,
  areArraysNotEqual,
  areArraysEqualWithOrder,
  areArraysEqualWithOrderandProperties,
  sortArray,
  sortArrayWithProperty,
  createCommaSeparatedString,
};

export default ArrayExtensions;
