import { ILicenceService } from './Interface/ILicenceService';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { StringExtensions } from '../Extensions/StringExtensions';
import { LicenceType } from '../Enums';

/*
Class to manage licence keys.  
Checks if the User has:
* Enterprise Licence (so can load and save state)
* AdvancedModules Licence (so can load and save charts - and other stuff in the future)
*/

export class LicenceService implements ILicenceService {

    constructor(private blotter: IAdaptableBlotter) {
        this.LicenceType = this.setLicenceType();
    }

    LicenceType: LicenceType;

    HasAdvancedModulesLicenceKey: boolean;

    private setLicenceType(): LicenceType {
        // use code from whats app...
        return LicenceType.Enterprise;
    }

   
}
