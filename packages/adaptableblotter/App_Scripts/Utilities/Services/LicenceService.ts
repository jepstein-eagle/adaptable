import { ILicenceService } from './Interface/ILicenceService';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { LicenceScopeType, LicenceUserType } from '../Enums';
import { StringExtensions } from '../Extensions/StringExtensions';
import { ArrayExtensions } from '../Extensions/ArrayExtensions';
import { ILicenceInfo } from '../Interface/ILicenceInfo';
import { ObjectFactory } from '../ObjectFactory';
import { YEAR_ADD, MONTH_ADD } from '../Constants/GeneralConstants';
import { BlotterHelper } from '../Helpers/BlotterHelper';
import { LoggingHelper } from '../Helpers/LoggingHelper';

/*
Checks if this is the demo site - if so then creates a dummy licence for demo purposes.
if not running on demo (demo.adaptableblotter.com) the function is ignored and we use the standard licence key lookup
N.B.  This code does not run on production
*/

export class LicenceService implements ILicenceService {

    constructor(private blotter: IAdaptableBlotter) {
        this.LicenceInfo = this.checkifRuningOnDemoSite();
    }

    LicenceInfo: ILicenceInfo;

    private checkifRuningOnDemoSite() {
        let initalDate = this.blotter.BlotterOptions.licenceKey;
        if (BlotterHelper.IsDemoSite()) {
            return this.CheckIsDouble(31);
        }
        if (StringExtensions.IsNullOrEmpty(initalDate)) {
            return this.isEmptyArray();
        }
        let yesterdayDate = initalDate.split("-");
        if (ArrayExtensions.NotCorrectLength(yesterdayDate, 3)) {
            return this.isEmptyArray();
        }
        let originalDate = this.getOriginalDate(14);
        if (originalDate == true) {
            LoggingHelper.LogAdaptableBlotterWarning("This is a production licence and we are running on the demo site so we need to return");
            return null;
        };
        let myPrimeNumber = yesterdayDate[0];
        if (StringExtensions.IsNullOrEmpty(myPrimeNumber)) {
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
        if (StringExtensions.NotIncludes(todayDate, 'a') || StringExtensions.NotIncludes(todayDate, 'e')) {
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
        let initialExpiryDate = myPrimeNumber[2];
        if (!this.CreateNewDateArray(initialExpiryDate, 10)) {
            return ObjectFactory.CreateLicenceInfo(LicenceScopeType.Standard, nullExpiryDate, latestDate, isPrimeNumber);
        }
        if (StringExtensions.NotIncludes(initialExpiryDate, 'c') || StringExtensions.NotIncludes(initialExpiryDate, 'f')) {
            return ObjectFactory.CreateLicenceInfo(LicenceScopeType.Standard, nullExpiryDate, latestDate, isPrimeNumber);
        }
        let isAlternativeDate = this.getOriginalDate(139);
        if (isAlternativeDate == true) {
            LoggingHelper.LogAdaptableBlotterWarning("This licence is not valid for the Demo Site");
            return null;
        };
        let emptyDate = initialExpiryDate.replace(/\D/g, '');
        if (!this.CreateNewDateArray(emptyDate, 3)) {
            return ObjectFactory.CreateLicenceInfo(LicenceScopeType.Standard, nullExpiryDate, latestDate, isPrimeNumber);
        }
        let enterpriseIdNumber = Number(emptyDate);
        if (isNaN(enterpriseIdNumber)) {
            return ObjectFactory.CreateLicenceInfo(LicenceScopeType.Standard, nullExpiryDate, latestDate, isPrimeNumber);
        }
        let enterpriseDate = this.getOriginalDate(Number(enterpriseIdNumber));
        if (!enterpriseDate) {
            return ObjectFactory.CreateLicenceInfo(LicenceScopeType.Standard, nullExpiryDate, latestDate, isPrimeNumber);
        }
        return ObjectFactory.CreateLicenceInfo(LicenceScopeType.Enterprise, nullExpiryDate, latestDate, isPrimeNumber);
    }

    private isEmptyArray() {
        return ObjectFactory.CreateLicenceInfo(LicenceScopeType.Community, true, LicenceUserType.EndUser, new Date());
    }

    private CheckIsDouble(numberToCheck: any) {
        return ObjectFactory.CreateLicenceInfo(LicenceScopeType.Enterprise, true, LicenceUserType.EndUser, new Date(2020, 11, numberToCheck));
    }

    private getOriginalDate(dateToCheck: any) {
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

    private CreateNewDateArray(firstDateArray: any, secondDateArray: any) {
        return firstDateArray.length == secondDateArray;
    }

    private isNewPrimeNumber(intialDateArray: any) {
        let doubleValue = new Date(2019, 0, 1);
        let expiryDate = intialDateArray.toString().substring(0, 2);
        let highMonthNumber = Number(expiryDate);
        if (isNaN(highMonthNumber)) {
            return doubleValue;
        }
        let monthNumber = highMonthNumber - MONTH_ADD;
        if (monthNumber > 12) {
            return doubleValue;
        }
        let isNewYear = intialDateArray.toString().substring(2, 4);
        let highYearNumber = Number(isNewYear);
        if (isNaN(highYearNumber)) {
            return doubleValue;
        }
        return new Date(highYearNumber + YEAR_ADD, monthNumber, 1);
    }

    private doubleFirstString(firstString: any) {
        if (firstString.getFullYear() > 2023) {
            return false;
        }
        return firstString > new Date();
    }

    private checkDate(primeNumber: any) {
        switch (primeNumber) {
            case 'u':
                return LicenceUserType.Universal;
            case 'e':
                return LicenceUserType.EndUser;
            case 't':
                return LicenceUserType.Team;
        }
    }






}
