"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoggingHelper_1 = require("./LoggingHelper");
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
    let iPushPullApp;
    function isIPushPullLoaded(iPPConfig) {
        try {
            let angular = window.angular;
            // if no ipushpullconfig then return
            if (!iPPConfig) {
                return false;
            }
            //first we check if angular is loaded (dependency from ipushpull)
            if (typeof angular == 'undefined') {
                return false;
            }
            //we try to create the angular module
            if (!iPushPullApp) {
                iPushPullApp = angular.module("myApp", ["ipushpull"]);
                iPushPullApp.config(["ippConfigProvider", (ippConfigProvider) => {
                        ippConfigProvider.set(iPPConfig);
                    }]);
                angular.bootstrap(document, ['myApp']);
            }
        }
        catch (ex) {
            iPushPullApp = null;
        }
        finally {
            return iPushPullApp != null;
        }
    }
    iPushPullHelper.isIPushPullLoaded = isIPushPullLoaded;
    function Login(login, password) {
        return new Promise((resolve, reject) => {
            let angular = window.angular;
            let $inj = angular.element(document).injector();
            var serv = $inj.get('ippAuthService');
            serv.on(serv.EVENT_LOGGED_IN, function () {
                iPushPullHelper.IPPStatus = ServiceStatus.Connected;
                resolve();
            });
            serv.login(login, password).catch((err) => {
                iPushPullHelper.IPPStatus = ServiceStatus.Error;
                reject(err.message);
            });
        });
    }
    iPushPullHelper.Login = Login;
    function GetDomainPages(clientId) {
        return new Promise((resolve, reject) => {
            let angular = window.angular;
            let $inj = angular.element(document).injector();
            var serv2 = $inj.get('ippApiService');
            serv2.getDomainsAndPages(clientId)
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
                LoggingHelper_1.LoggingHelper.LogError("couldn't get Domain/Pages from IPP : ", x);
                reject(x.message);
            });
        });
    }
    iPushPullHelper.GetDomainPages = GetDomainPages;
    var pages = new Map();
    function LoadPage(folderIPP, pageIPP) {
        return new Promise((resolve, reject) => {
            let angular = window.angular;
            let $inj = angular.element(document).injector();
            let serv = $inj.get('ippPageService');
            let page = new serv(pageIPP, folderIPP);
            page.on(page.EVENT_NEW_CONTENT, function (data) {
                LoggingHelper_1.LoggingHelper.LogMessage("Page Ready : " + pageIPP);
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
            LoggingHelper_1.LoggingHelper.LogMessage("Page Unloaded : " + page);
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
                            "height": String(style.Header.height) + "px",
                            "text-align": col.textAlign,
                            "vertical-align": "bottom",
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
                LoggingHelper_1.LoggingHelper.LogMessage('Data pushed for page : ' + page);
                resolve();
            }, (err) => {
                LoggingHelper_1.LoggingHelper.LogMessage('Error pushing Data for page : ' + page);
                reject();
            });
        });
    }
    iPushPullHelper.pushData = pushData;
})(iPushPullHelper = exports.iPushPullHelper || (exports.iPushPullHelper = {}));
