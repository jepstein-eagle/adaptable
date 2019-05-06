


// ignores time
export function IsDateInPast(date: Date) {
  return new Date(date.toDateString()) < new Date(new Date().toDateString());
}

export function IsDateInFuture(date: Date) {
  return !IsDateInPast(date);
}

export const DateExtensions = {
  IsDateInFuture,
  IsDateInPast
}

export default DateExtensions