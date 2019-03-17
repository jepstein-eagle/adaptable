import { LicenceType } from "../Enums";

// used in layouts to save which is the current sorted column
export interface ILicenceInfo {
  LicenceType: LicenceType;
  IsLicenceInDate: boolean;
  IsUniversalLicence: boolean;
}
