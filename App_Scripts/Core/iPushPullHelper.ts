import { IEvent } from './Interface/IEvent';
import { EventDispatcher } from './EventDispatcher';
import { IPPDomain } from '../Redux/ActionsReducers/Interface/IState';
import { IPPStyle } from './Interface/IAdaptableBlotter';

export module iPushPullHelper {
    export enum ServiceStatus {
        Unknown,
        Disconnected,
        Connected,
        Error
    }
    export var IPPStatus: ServiceStatus = ServiceStatus.Unknown
    let iPushPullApp: angular.IModule
    export function isIPushPullLoaded(iPPConfig?: any) {
        try {
            let angular = (<any>window).angular
            //first we check if angular is loaded (dependency from ipushpull)
            if (typeof angular == 'undefined') {
                return false;
            }
            //we try to create the angular module
            if (!iPushPullApp) {
                iPushPullApp = angular.module("myApp", ["ipushpull"])
                iPushPullApp.config(["ippConfigProvider", (ippConfigProvider: any) => {
                    ippConfigProvider.set(iPPConfig);
                }]);
                angular.bootstrap(document, ['myApp']);
            }
        }
        catch (ex) {
            iPushPullApp = null;
        } finally {
            return iPushPullApp != null;
        }
    }

    export function Login(login: string, password: string): Promise<any> {
        return new Promise<string>((resolve: any, reject: any) => {
            let angular = (<any>window).angular
            let $inj = angular.element(document).injector();
            var serv = $inj.get('ippAuthService');
            serv.on(serv.EVENT_LOGGED_IN, function () {
                IPPStatus = ServiceStatus.Connected;
                resolve();
            });

            serv.login(login, password).catch((err: any) => {
                IPPStatus = ServiceStatus.Error;
                reject(err.message)
            });
        })
    }

    export function GetDomainPages(clientId: string): Promise<IPPDomain[]> {
        return new Promise<IPPDomain[]>((resolve: any, reject: any) => {
            let angular = (<any>window).angular
            let $inj = angular.element(document).injector();
            var serv2 = $inj.get('ippApiService');
            serv2.getDomainsAndPages(clientId)
                .then((x: any) => {
                    let result: IPPDomain[] = x.data.domains.map((domain: any) => {
                        return {
                            Name: domain.name,
                            Pages: domain.current_user_domain_page_access.pages
                                .filter((page: any) => page.special_page_type == 0 && page.write_access)
                                .map((page: any) => page.name)
                        }
                    })
                    resolve(result);
                })
                .catch((x: any) => {
                    console.error("couldn't get Domain/Pages from IPP : ", x)
                    reject(x.message)
                })
        })
    }

    var pages: Map<string, any> = new Map()
    export function LoadPage(folderIPP: string, pageIPP: string): Promise<any> {
        return new Promise<any>((resolve: any, reject: any) => {
            let angular = (<any>window).angular
            let $inj = angular.element(document).injector();
            let serv = $inj.get('ippPageService');
            let page = new serv(pageIPP, folderIPP)

            page.on(page.EVENT_NEW_CONTENT, function (data: any) {
                console.log("Page Ready : " + pageIPP)
                pages.set(pageIPP, page)
                resolve(page);
                //we return true so it removes the listener for new content.
                //IPP should add that line to their wiki
                return true;
            });
        });
    }

    export function UnloadPage(page: string) {
        let pageIPP = pages.get(page)
        if (pageIPP) {
            pageIPP.destroy()
            pages.delete(page)
            console.log("Page Unloaded : " + page)
        }
    }

    export function pushData(page: string, data: any[], style: IPPStyle): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            var newData = data.map(function (row: any, i: number) {
                return row.map((cell: any, y: number) => {
                    let col = (i == 0 ? style.Header.Columns.find(x => x.columnFriendlyName == data[0][y]) :
                        style.Row.Columns.find(x => x.columnFriendlyName == data[0][y]))
                    let styleIPP: any
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
                        }
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
                        }
                    }
                    else {
                        styleIPP = {
                            "background-color": i % 2 ? style.Row.backColor : style.Row.altBackColor,
                        }
                    }
                    return {
                        "value": cell,
                        "formatted_value": cell,
                        "style": styleIPP
                    }
                })
            });

            let pageIPP = pages.get(page)
            pageIPP.Content.canDoDelta = false;
            pageIPP.Content.update(newData, true);
            pageIPP.push().then(function () {
                console.log('Data pushed for page : ' + page);
                resolve()
            }, (err: any) => {
                console.log('Error pushing Data for page : ' + page);
                reject();
            });
        })
    }
}