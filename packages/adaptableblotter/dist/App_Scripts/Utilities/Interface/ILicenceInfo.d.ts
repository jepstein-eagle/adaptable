import { LicenceScopeType, LicenceUserType } from "../Enums";
export interface ILicenceInfo {
    LicenceScopeType: LicenceScopeType;
    IsLicenceInDate: boolean;
    ExpiryDate: Date;
    LicenceUserType: LicenceUserType;
}
