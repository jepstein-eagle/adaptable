import { startCase } from 'lodash';
import { StringExtensions } from '../Extensions/StringExtensions';
import { LoggingHelper } from './LoggingHelper';

export function objectExists(item: any): boolean {
  return item != null && item != undefined;
}

export function objectNotExists(item: any): boolean {
  return !objectExists(item);
}

export function getStringRepresentionFromKey(event: KeyboardEvent | any): string {
  if (event.key == null) {
    return event.char; // IE
  }
  return event.key;
}

export function cloneObject(obj: any): any {
  return JSON.parse(JSON.stringify(obj));
}

export function humanize(s: string): string {
  return startCase(s);
}

export function capitalize(string: string) {
  return (/[a-z]/.test(string) ? string : string.toLowerCase())
    .replace(/[\s\-_]*([^\s\-_])([^\s\-_]+)/g, replacer)
    .replace(/[A-Z]/g, ' $&')
    .trim();
}

export const arrayToKeyMap = <T extends string | number | symbol>(
  arr?: T[]
): Record<T, boolean> => {
  const defaultAccumulator = {} as Record<T, boolean>;

  if (!arr || !Array.isArray(arr)) {
    return defaultAccumulator;
  }

  return arr.reduce((acc, key: T) => {
    acc[key] = true;
    return acc;
  }, defaultAccumulator);
};

function replacer(b: string, c: string) {
  return b.toUpperCase() + c;
}

// converts an array (or an array of arrays) to CSV
export function convertArrayToCsv(array: any[], separator: string = " ' "): string {
  var csvContent = '';
  array.forEach((infoArray, index) => {
    var line = [];
    var item: any;
    var i;
    for (i = 0; i < infoArray.length; ++i) {
      item = infoArray[i];
      if (separator == ',') {
        if (item != null && item != undefined) {
          if (item.indexOf(',') !== -1 || item.indexOf('"') !== -1) {
            item = `"${item.replace(/"/g, '""')}"`;
          }
          // bit of a hack but we have a user where they have "+2502+S" as a value which Excel then thinks is a formula
          if (item.indexOf('+') == 0) {
            item = `'${item}'`;
          }
        }
      }
      line.push(item);
    }
    csvContent += line.join(separator) + (index != array.length - 1 ? '\n' : '');
  });
  return csvContent;
}

export function createDownloadedFile(content: any, fileName: string, mimeType: string) {
  var a = document.createElement('a');
  mimeType = mimeType || 'application/octet-stream';

  if (navigator.msSaveBlob) {
    // IE10
    navigator.msSaveBlob(
      new Blob([content], {
        type: mimeType,
      }),
      fileName
    );
  } else if (URL && 'download' in a) {
    // html5 A[download]
    a.href = URL.createObjectURL(
      new Blob([content], {
        type: mimeType,
      })
    );
    a.setAttribute('download', fileName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else {
    location.href = `data:application/octet-stream,${encodeURIComponent(content)}`; // only this mime type is supported
  }
}

// Copies a string to the clipboard. Must be called from within an
// event handler such as click. May return false if it failed, but
// this is not always possible. Browser support for Chrome 43+,
// Firefox 42+, Safari 10+, Edge and IE 10+.
// IE: The clipboard feature may be disabled by an administrator. By
// default a prompt is shown the first time the clipboard is
// used (per session).
export function copyToClipboard(text: string) {
  if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
    var textarea = document.createElement('textarea');
    textarea.textContent = text;
    textarea.style.width = '1px';
    textarea.style.height = '1px';
    textarea.style.top = '0px';
    textarea.style.left = '0px';
    textarea.style.position = 'absolute';
    textarea.style.opacity = '0.0';
    document.body.appendChild(textarea);
    textarea.select();
    textarea.focus();
    try {
      return document.execCommand('copy'); // Security exception may be thrown by some browsers.
    } catch (ex) {
      LoggingHelper.LogAdaptableBlotterWarning('Copy to clipboard failed.', ex);
      return false;
    } finally {
      document.body.removeChild(textarea);
    }
  }
  LoggingHelper.LogAdaptableBlotterWarning('Copy not available on this computer.');
}

export function ReturnItemCount(items: any[], itemName: string): string {
  if (items.length == 0) {
    return `No ${itemName}s`;
  }
  return items.length == 1 ? `1 ${itemName}` : `${items.length} ${itemName}s`;
}

export function IsInputNullOrEmpty(itemToCheck: any) {
  if (typeof itemToCheck === 'string') {
    return StringExtensions.IsNullOrEmpty(itemToCheck);
  }
  if (typeof itemToCheck === 'number') {
    return StringExtensions.IsNullOrEmpty(itemToCheck.toString());
  }
  if (itemToCheck instanceof Date) {
    return StringExtensions.IsNullOrEmpty(itemToCheck.toString());
  }
  return itemToCheck == null;
}

export function IsInputNotNullOrEmpty(itemToCheck: any) {
  return !IsInputNullOrEmpty(itemToCheck);
}

export function areObjectsEqual(obj1: any, obj2: any) {
  // if both are null return true
  if (obj1 == null && obj2 == null) {
    return true;
  }

  if (obj1 != null && obj2 == null) {
    return false;
  }

  if (obj1 == null && obj2 != null) {
    return false;
  }

  // Loop through properties in object 1
  for (var p in obj1) {
    // Check property exists on both objects
    if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) {
      return false;
    }

    switch (typeof obj1[p]) {
      // Deep compare objects
      case 'object':
        if (!areObjectsEqual(obj1[p], obj2[p])) {
          return false;
        }
        break;
      // Compare function code
      case 'function':
        if (
          typeof obj2[p] === 'undefined' ||
          (p != 'compare' && obj1[p].toString() != obj2[p].toString())
        ) {
          return false;
        }
        break;
      // Compare values
      default:
        if (obj1[p] != obj2[p]) {
          return false;
        }
        break;
    }

    // Check object 2 for any extra properties
    for (const p2 in obj2) {
      if (typeof obj1[p2] === 'undefined') {
        return false;
      }
    }
    return true;
  }
}

export function StringifyValue(value: any): string {
  if (!isNaN(Number(value))) {
    return Number(value).toString();
  }
  return value;
}

export function RoundNumber(numberToRound: any, decimalPlaces: number): number {
  switch (decimalPlaces) {
    case 1:
      return Math.round(numberToRound * 10) / 10;
    case 2:
      return Math.round(numberToRound * 100) / 100;
    case 3:
      return Math.round(numberToRound * 1000) / 1000;
    case 4:
      return Math.round(numberToRound * 10000) / 10000;
    case 5:
      return Math.round(numberToRound * 100000) / 100000;
    case 6:
      return Math.round(numberToRound * 1000000) / 1000000;
  }
}
export function RoundNumberTo4dp(numberToRound: any): number {
  return RoundNumber(numberToRound, 4);
}

export function RoundValueIfNumeric(numberToRound: any, decimalPlaces: number): any {
  let returnValue: any;
  if (!isNaN(Number(numberToRound))) {
    returnValue = RoundNumber(numberToRound, decimalPlaces);
  } else {
    returnValue = numberToRound;
  }
  return returnValue;
}

export const Helper = {
  objectExists,
  objectNotExists,
  getStringRepresentionFromKey,
  cloneObject,
  capitalize,
  convertArrayToCsv,
  createDownloadedFile,
  copyToClipboard,
  ReturnItemCount,
  IsInputNullOrEmpty,
  IsInputNotNullOrEmpty,
  areObjectsEqual,
  StringifyValue,
  RoundNumber,
  RoundNumberTo4dp,
  RoundValueIfNumeric,
};
export default Helper;
