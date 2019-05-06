

export function abbreviateNumber(numberToAbbreviate: number): string {
  let str: string = "";
  if (numberToAbbreviate >= 1000000000) {
    str = (numberToAbbreviate / 1000000000).toFixed(1) + "B";
  } else if (numberToAbbreviate >= 1000000) {
    str = (numberToAbbreviate / 1000000).toFixed(1) + "M";
  } else if (numberToAbbreviate >= 1000) {
    str = (numberToAbbreviate / 1000).toFixed(1) + "K";
  } else {
    str = numberToAbbreviate.toString();
  }
  return str;
}

export const NumberExtensions = {
  abbreviateNumber
}

export default NumberExtensions