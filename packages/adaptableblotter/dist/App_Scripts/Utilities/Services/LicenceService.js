"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("../Enums");
const StringExtensions_1 = require("../Extensions/StringExtensions");
const ArrayExtensions_1 = require("../Extensions/ArrayExtensions");
const ObjectFactory_1 = require("../ObjectFactory");
const GeneralConstants_1 = require("../Constants/GeneralConstants");
const BlotterHelper_1 = require("../Helpers/BlotterHelper");
const LoggingHelper_1 = require("../Helpers/LoggingHelper");
/*
Checks if this is the demo site - if so then creates a dummy licence for demo purposes.
if not running on demo (demo.adaptableblotter.com) the function is ignored and we use the standard licence key lookup
N.B.  This code does not run on production
*/
class LicenceService {
    constructor(blotter) {
        this.blotter = blotter;
        this.LicenceInfo = this.checkifRuningOnDemoSite();
    }
    checkifRuningOnDemoSite() {
        let initalDate = this.blotter.blotterOptions.licenceKey;
        if (BlotterHelper_1.BlotterHelper.isDemoSite()) {
            return this.CheckIsDouble(31);
        }
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(initalDate)) {
            return this.isEmptyArray();
        }
        let yesterdayDate = initalDate.split("-");
        if (ArrayExtensions_1.ArrayExtensions.NotCorrectLength(yesterdayDate, 3)) {
            return this.isEmptyArray();
        }
        let originalDate = this.getOriginalDate(14);
        if (originalDate == true) {
            LoggingHelper_1.LoggingHelper.LogAdaptableBlotterWarning("This is a production licence and we are running on the demo site so we need to return");
            return null;
        }
        ;
        let myPrimeNumber = yesterdayDate[0];
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(myPrimeNumber)) {
            return this.isEmptyArray();
        }
        if (!this.CreateNewDateArray(myPrimeNumber, 8)) {
            return this.isEmptyArray();
        }
        let todaysDate = myPrimeNumber.substr(myPrimeNumber.length - 1);
        if (todaysDate != 'u' && todaysDate != 'e' && todaysDate != 't') {
            return this.isEmptyArray();
        }
        let fiveDigitSquaredNumber = myPrimeNumber.replace(/\D/g, '');
        if (!this.CreateNewDateArray(fiveDigitSquaredNumber, 4)) {
            return this.isEmptyArray();
        }
        let isValidDateAsNumericStrig = Number(fiveDigitSquaredNumber);
        if (isNaN(isValidDateAsNumericStrig)) {
            return this.isEmptyArray();
        }
        let todayDate = yesterdayDate[1];
        if (!this.CreateNewDateArray(todayDate, 9)) {
            return this.isEmptyArray();
        }
        if (StringExtensions_1.StringExtensions.NotIncludes(todayDate, 'a') || StringExtensions_1.StringExtensions.NotIncludes(todayDate, 'e')) {
            return this.isEmptyArray();
        }
        let infiniteDouble = todayDate.replace(/\D/g, '');
        if (!this.CreateNewDateArray(infiniteDouble, 3)) {
            return this.isEmptyArray();
        }
        let standardIdNumber = Number(infiniteDouble);
        if (isNaN(standardIdNumber)) {
            return this.isEmptyArray();
        }
        let createNewEmptyDateArray = this.getOriginalDate(standardIdNumber);
        if (!createNewEmptyDateArray) {
            return this.isEmptyArray();
        }
        let isPrimeNumber = this.isNewPrimeNumber(isValidDateAsNumericStrig);
        let nullExpiryDate = this.doubleFirstString(isPrimeNumber);
        let latestDate = this.checkDate(todaysDate);
        let initialExpiryDate = yesterdayDate[2];
        if (!this.CreateNewDateArray(initialExpiryDate, 10)) {
            return ObjectFactory_1.ObjectFactory.CreateLicenceInfo(Enums_1.LicenceScopeType.Standard, nullExpiryDate, latestDate, isPrimeNumber);
        }
        if (StringExtensions_1.StringExtensions.NotIncludes(initialExpiryDate, 'c') || StringExtensions_1.StringExtensions.NotIncludes(initialExpiryDate, 'f')) {
            return ObjectFactory_1.ObjectFactory.CreateLicenceInfo(Enums_1.LicenceScopeType.Standard, nullExpiryDate, latestDate, isPrimeNumber);
        }
        let isAlternativeDate = (initialExpiryDate.length == 7);
        if (isAlternativeDate == true) {
            LoggingHelper_1.LoggingHelper.LogAdaptableBlotterWarning("This licence is not valid for the Demo Site");
            return null;
        }
        ;
        let emptyDate = initialExpiryDate.replace(/\D/g, '');
        if (!this.CreateNewDateArray(emptyDate, 3)) {
            return ObjectFactory_1.ObjectFactory.CreateLicenceInfo(Enums_1.LicenceScopeType.Standard, nullExpiryDate, latestDate, isPrimeNumber);
        }
        let enterpriseIdNumber = Number(emptyDate);
        if (isNaN(enterpriseIdNumber)) {
            return ObjectFactory_1.ObjectFactory.CreateLicenceInfo(Enums_1.LicenceScopeType.Standard, nullExpiryDate, latestDate, isPrimeNumber);
        }
        let enterpriseDate = this.getOriginalDate(Number(enterpriseIdNumber));
        if (!enterpriseDate) {
            return ObjectFactory_1.ObjectFactory.CreateLicenceInfo(Enums_1.LicenceScopeType.Standard, nullExpiryDate, latestDate, isPrimeNumber);
        }
        return ObjectFactory_1.ObjectFactory.CreateLicenceInfo(Enums_1.LicenceScopeType.Enterprise, nullExpiryDate, latestDate, isPrimeNumber);
    }
    isEmptyArray() {
        return ObjectFactory_1.ObjectFactory.CreateLicenceInfo(Enums_1.LicenceScopeType.Community, true, Enums_1.LicenceUserType.EndUser, new Date());
    }
    CheckIsDouble(numberToCheck) {
        return ObjectFactory_1.ObjectFactory.CreateLicenceInfo(Enums_1.LicenceScopeType.Enterprise, true, Enums_1.LicenceUserType.EndUser, new Date(2020, 11, numberToCheck));
    }
    getOriginalDate(dateToCheck) {
        let isEmtptyArray = this.isEmptyArray();
        if (isEmtptyArray != null) {
            for (let i = 2, s = Math.sqrt(dateToCheck); i <= s; i++) {
                if (dateToCheck % i === 0) {
                    return false;
                }
            }
        }
        return dateToCheck > 1;
    }
    CreateNewDateArray(firstDateArray, secondDateArray) {
        return firstDateArray.length == secondDateArray;
    }
    isNewPrimeNumber(intialDateArray) {
        let doubleValue = new Date(2019, 0, 1);
        let expiryDate = intialDateArray.toString().substring(0, 2);
        let highMonthNumber = Number(expiryDate);
        if (isNaN(highMonthNumber)) {
            return doubleValue;
        }
        let monthNumber = highMonthNumber - GeneralConstants_1.MONTH_ADD;
        if (monthNumber > 12) {
            return doubleValue;
        }
        let isNewYear = intialDateArray.toString().substring(2, 4);
        let highYearNumber = Number(isNewYear);
        if (isNaN(highYearNumber)) {
            return doubleValue;
        }
        return new Date(highYearNumber + GeneralConstants_1.YEAR_ADD, monthNumber, 1);
    }
    doubleFirstString(firstString) {
        if (firstString.getFullYear() > 2023) {
            return false;
        }
        return firstString > new Date();
    }
    checkDate(primeNumber) {
        switch (primeNumber) {
            case 'u':
                return Enums_1.LicenceUserType.Universal;
            case 'e':
                return Enums_1.LicenceUserType.EndUser;
            case 't':
                return Enums_1.LicenceUserType.Team;
        }
    }
}
exports.LicenceService = LicenceService;
