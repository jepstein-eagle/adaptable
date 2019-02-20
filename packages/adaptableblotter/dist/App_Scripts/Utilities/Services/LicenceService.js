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
        // use code from whats app...
        return Enums_1.LicenceType.Enterprise;
    }
}
exports.LicenceService = LicenceService;
