"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("../Enums");
/*
Class to manage licence keys.
Checks if the User has:
* Enterprise Licence (so can load and save state)
* AdvancedModules Licence (so can load and save charts - and other stuff in the future)
*/
class LicenceService {
    constructor(blotter) {
        this.blotter = blotter;
        this.LicenceType = this.setLicenceType();
    }
    setLicenceType() {
        let myString = this.blotter.BlotterOptions.licenceKey;
        let myArr = myString.split("-");
        let enterpriseId = myArr[1].replace(/\D/g, '');
        let isEnterpriseValid = this.isPrimeNumber(Number(enterpriseId));
        let chartId = myArr[2].replace(/\D/g, '');
        let isChartValid = this.isPrimeNumber(Number(chartId));
        if (isChartValid) {
            return Enums_1.LicenceType.Advanced;
        }
        else if (isEnterpriseValid) {
            return Enums_1.LicenceType.Enterprise;
        }
        return Enums_1.LicenceType.Community;
    }
    isPrimeNumber(num) {
        for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
            if (num % i === 0) {
                return false;
            }
        }
        return num > 1;
    }
}
exports.LicenceService = LicenceService;
