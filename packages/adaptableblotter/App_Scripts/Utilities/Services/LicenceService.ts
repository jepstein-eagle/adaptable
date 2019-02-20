import { ILicenceService } from './Interface/ILicenceService';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
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

    private setLicenceType(): LicenceType {
        let myString: string = this.blotter.BlotterOptions.licenceKey;
        let myArr: string[] = myString.split("-");

        let enterpriseId: string = myArr[1].replace(/\D/g, '');
        let isEnterpriseValid: boolean = this.isPrimeNumber(Number(enterpriseId));

        let chartId: string = myArr[2].replace(/\D/g, '');
        let isChartValid: boolean = this.isPrimeNumber(Number(chartId));

        if (isChartValid) {
            return LicenceType.Advanced
        } else if (isEnterpriseValid) {
            return LicenceType.Enterprise;
        }
        return LicenceType.Community;
    }

    private isPrimeNumber(num: number): boolean {
        for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
            if (num % i === 0) {
                return false;
            }
        }
        return num > 1;
    }

}
