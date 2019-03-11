"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoggingHelper_1 = require("./LoggingHelper");
//import * as ipushpull from 'ipushpull-js'
var iPushPullHelper;
(function (iPushPullHelper) {
    let ServiceStatus;
    (function (ServiceStatus) {
        ServiceStatus["Unknown"] = "Unknown";
        ServiceStatus["Disconnected"] = "Disconnected";
        ServiceStatus["Connected"] = "Connected";
        ServiceStatus["Error"] = "Error";
    })(ServiceStatus = iPushPullHelper.ServiceStatus || (iPushPullHelper.ServiceStatus = {}));
    iPushPullHelper.IPPStatus = ServiceStatus.Unknown;
    let iPushPullApp; //angular.IModule
    // presumably this will be given a definition file in due course which would be great;
    var pages = new Map();
    // creates the iPushPullApp object using blotterOptions ippconfig
    function init(iPPConfig) {
        // taking out ipushpull for the moment as we cannot load it without issues
        //  if (iPushPullApp == null) {
        //     iPushPullApp = ipushpull.create(iPPConfig);
        //    }
    }
    iPushPullHelper.init = init;
    // checks if we have loaded iPushPullproperly
    function isIPushPullLoaded() {
        return iPushPullApp != null; // remove this if we want to go back to old version
    }
    iPushPullHelper.isIPushPullLoaded = isIPushPullLoaded;
    // Logs in to iPushpull
    function Login(login, password) {
        return new Promise((resolve, reject) => {
            iPushPullApp.auth.on(iPushPullApp.auth.EVENT_LOGGED_IN, function () {
                iPushPullHelper.IPPStatus = ServiceStatus.Connected;
                resolve();
            });
            iPushPullApp.auth.login(login, password).catch((err) => {
                iPushPullHelper.IPPStatus = ServiceStatus.Error;
                reject(err.message);
            });
        });
    }
    iPushPullHelper.Login = Login;
    // Retrieves domain pages from iPushPull
    function GetDomainPages(clientId) {
        return new Promise((resolve, reject) => {
            iPushPullApp.api.getDomainsAndPages(clientId)
                .then((x) => {
                let result = x.data.domains.map((domain) => {
                    return {
                        Name: domain.name,
                        Pages: domain.current_user_domain_page_access.pages
                            .filter((page) => page.special_page_type == 0 && page.write_access)
                            .map((page) => page.name)
                    };
                });
                resolve(result);
            })
                .catch((x) => {
                LoggingHelper_1.LoggingHelper.LogAdaptableBlotterError("couldn't get Domain/Pages from IPP : ", x);
                reject(x.message);
            });
        });
    }
    iPushPullHelper.GetDomainPages = GetDomainPages;
    function LoadPage(folderIPP, pageIPP) {
        return new Promise((resolve, reject) => {
            let page = new iPushPullApp.page(pageIPP, folderIPP);
            page.on(page.EVENT_NEW_CONTENT, function (data) {
                LoggingHelper_1.LoggingHelper.LogAdaptableBlotterInfo("Page Ready : " + pageIPP);
                pages.set(pageIPP, page);
                resolve(page);
                //we return true so it removes the listener for new content.
                //IPP should add that line to their wiki
                return true;
            });
        });
    }
    iPushPullHelper.LoadPage = LoadPage;
    function UnloadPage(page) {
        let pageIPP = pages.get(page);
        if (pageIPP) {
            pageIPP.destroy();
            pages.delete(page);
            LoggingHelper_1.LoggingHelper.LogAdaptableBlotterInfo("Page Unloaded : " + page);
        }
    }
    iPushPullHelper.UnloadPage = UnloadPage;
    function pushData(page, data, style) {
        return new Promise((resolve, reject) => {
            var newData = data.map(function (row, i) {
                return row.map((cell, y) => {
                    let col = (i == 0 ? style.Header.Columns.find(x => x.columnFriendlyName == data[0][y]) :
                        style.Row.Columns.find(x => x.columnFriendlyName == data[0][y]));
                    let styleIPP;
                    if (i == 0) {
                        styleIPP = {
                            "background-color": style.Header.headerBackColor,
                            "bbc": "000000",
                            "bbs": "none",
                            "bbw": "none",
                            "lbc": "000000",
                            "lbs": "none",
                            "lbw": "none",
                            "rbc": "000000",
                            "rbs": "none",
                            "rbw": "none",
                            "tbc": "000000",
                            "tbs": "none",
                            "tbw": "none",
                            "color": style.Header.headerColor,
                            "font-family": style.Header.headerFontFamily,
                            "font-size": style.Header.headerFontSize,
                            "font-style": style.Header.headerFontStyle,
                            "font-weight": style.Header.headerFontWeight,
                            "height": String(style.Header.height / 3) + "px",
                            "text-align": col.textAlign,
                            "vertical-align": "middle",
                            "white-space": "nowrap",
                            "width": String(col.width) + "px",
                            "text-wrap": "normal",
                            "word-wrap": "normal"
                        };
                    }
                    else if (i == 1) {
                        styleIPP = {
                            "background-color": i % 2 ? style.Row.backColor : style.Row.altBackColor,
                            "color": style.Row.color,
                            "font-family": style.Row.fontFamily,
                            "font-size": style.Row.fontSize,
                            "font-style": style.Row.fontStyle,
                            "font-weight": style.Row.fontWeight,
                            "text-align": col.textAlign
                        };
                    }
                    else {
                        styleIPP = {
                            "background-color": i % 2 ? style.Row.backColor : style.Row.altBackColor,
                        };
                    }
                    return {
                        "value": cell,
                        "formatted_value": cell,
                        "style": styleIPP
                    };
                });
            });
            let pageIPP = pages.get(page);
            pageIPP.Content.canDoDelta = false;
            pageIPP.Content.update(newData, true);
            pageIPP.push().then(function () {
                LoggingHelper_1.LoggingHelper.LogAdaptableBlotterSuccess('Data pushed for iPushPull page : ' + page);
                resolve();
            }, (err) => {
                LoggingHelper_1.LoggingHelper.LogAdaptableBlotterInfo('Error pushing data for iPushPull page : ' + page);
                reject();
            });
        });
    }
    iPushPullHelper.pushData = pushData;
})(iPushPullHelper = exports.iPushPullHelper || (exports.iPushPullHelper = {}));
