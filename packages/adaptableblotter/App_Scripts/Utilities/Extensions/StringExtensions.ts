export function IsNull(stringToCheck: string) {
  return stringToCheck == null;
}

export function IsNotNull(stringToCheck: string) {
  return !IsNull(stringToCheck);
}

export function IsEmpty(stringToCheck: string) {
  return stringToCheck == '';
}

export function IsNotEmpty(stringToCheck: string) {
  return !IsEmpty(stringToCheck);
}

export function IsNullOrEmpty(stringToCheck: string) {
  return IsNull(stringToCheck) || IsEmpty(stringToCheck);
}

export function IsNotNullOrEmpty(stringToCheck: string) {
  return !this.IsNullOrEmpty(stringToCheck);
}

export function PlaceSpaceBetweenCapitalisedWords(stringToCheck: string) {
  return stringToCheck.replace(/([A-Z])/g, ' $1').trim();
}

export function RemoveTrailingComma(stringToCheck: string) {
  return stringToCheck.replace(/,\s*$/, '');
}

export function ToLowerCase(stringToCheck: string) {
  return IsNullOrEmpty(stringToCheck) ? stringToCheck : stringToCheck.toLowerCase();
}

export function Includes(stringToCheck: string, valueToCheck: string) {
  return stringToCheck.includes(valueToCheck);
}

export function NotIncludes(stringToCheck: string, valueToCheck: string) {
  return !Includes(stringToCheck, valueToCheck);
}

export function abbreviateString(stringToAbbreviate: string, maxLength: number) {
  return stringToAbbreviate.length < maxLength
    ? stringToAbbreviate
    : stringToAbbreviate.substr(0, maxLength) + '...';
}

export const StringExtensions = {
  IsNull,
  IsNotNull,
  IsEmpty,
  IsNotEmpty,
  IsNullOrEmpty,
  IsNotNullOrEmpty,
  PlaceSpaceBetweenCapitalisedWords,
  RemoveTrailingComma,
  ToLowerCase,
  Includes,
  NotIncludes,
  abbreviateString,
};

export default StringExtensions;
