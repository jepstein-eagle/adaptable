
export module StringExtensions {

  export function IsNull(stringToCheck: string) {
    return stringToCheck == null;
  }

  export function IsNotNull(stringToCheck: string) {
    return !StringExtensions.IsNull(stringToCheck);
  }

  export function IsEmpty(stringToCheck: string) {
    return stringToCheck == "";
  }

  export function IsNotEmpty(stringToCheck: string) {
    return !StringExtensions.IsEmpty(stringToCheck);
  }

  export function IsNullOrEmpty(stringToCheck: string) {
    return StringExtensions.IsNull(stringToCheck) || StringExtensions.IsEmpty(stringToCheck);
  }

  export function IsNotNullOrEmpty(stringToCheck: string) {
    return !this.IsNullOrEmpty(stringToCheck);
  }

  export function PlaceSpaceBetweenCapitalisedWords(stringToCheck: string) {
    return stringToCheck.replace(/([A-Z])/g, ' $1').trim()
  }

  export function RemoveTrailingComma(stringToCheck: string) {
    return stringToCheck.replace(/,\s*$/, "")
  }

  export function ToLowerCase(stringToCheck: string) {
    return (StringExtensions.IsNullOrEmpty(stringToCheck)) ? stringToCheck : stringToCheck.toLowerCase()
  }

}
