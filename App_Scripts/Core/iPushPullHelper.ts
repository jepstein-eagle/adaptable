import { IEvent } from './Interface/IEvent';
import { EventDispatcher } from './EventDispatcher';
import { IPPDomain } from '../Redux/ActionsReducers/Interface/IState';

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

    export function GetDomainPages(): Promise<IPPDomain[]> {
        return new Promise<IPPDomain[]>((resolve: any, reject: any) => {
            let angular = (<any>window).angular
            let $inj = angular.element(document).injector();
            var serv2 = $inj.get('ippApiService');
            serv2.getDomainsAndPages()
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

    var pages: any[] = []

    export function LoadPage(folderIPP: string, pageIPP: string): Promise<any> {
        return new Promise<any>((resolve: any, reject: any) => {
            console.log('Loading IPP PAge');
            let angular = (<any>window).angular
            let $inj = angular.element(document).injector();
            let serv = $inj.get('ippPageService');
            let page = new serv(pageIPP, folderIPP)

            page.on(page.EVENT_NEW_CONTENT, function (data: any) {
                console.log("Page Ready : " + pageIPP)
                pages.push(page)
                resolve(page);
                //we return true so it removes the listener for new content.
                //IPP should add that line to their wiki
                return true;
            });
        });
    }

    export function UnloadPage(page: string) {
        let pageIPP = pages.find(x => x.data.name == page)
        if (pageIPP) {
            pageIPP.destroy()
            let pageIPPIdx = pages.findIndex(x => x.data.name == page)
            pages.splice(pageIPPIdx, 1)
            console.log("Page Unloaded : " + page)
        }
    }

    export function pushData(page: string, data: any[], style: {
        headerColor: string,
        headerBackColor: string,
        headerFont: string,
        color: string,
        backColor: string,
        altBackColor: string,
        font: string,
        height: number,
        columnWidths: { columnFriendlyName: string, width: number }[]
    }) {

        var newData = data.map(function (row: any, i: number) {
            return row.map((cell: any, y: number) => {
                return {
                    "value": cell,
                    "formatted_value": cell,
                    "style": style != null ? {
                        "background-color": i == 0 ? style.headerBackColor : i % 2 ? style.backColor : style.altBackColor,
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
                        "color": i == 0 ? style.headerColor : style.color,
                        "font": style.font,
                        // "font-family": "Calibri",
                        // "font-size": "11pt",
                        // "font-style": "normal",
                        // "font-weight": "400",
                        "height": String(style.height) + "px",
                        "text-align": "right",
                        "vertical-align": "bottom",
                        "white-space": "nowrap",
                        "width": String(style.columnWidths.find(x => x.columnFriendlyName == data[0][y]).width) + "px",
                        "text-wrap": "normal",
                        "word-wrap": "normal"
                    } :
                        {
                            "background-color": i == 0 ? '#d9ecf5' : i % 2 ? "FFFFFF" : '#e6f2f8',
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
                            "color": i == 0 ? "#00435e" : "#003f59"/*"000000"*/,
                            "font-family": "Calibri",
                            "font-size": "11pt",
                            "font-style": "normal",
                            "font-weight": "400",
                            "height": "20px",
                            "text-align": "right",
                            "vertical-align": "bottom",
                            "white-space": "nowrap",
                            "width": "64px",
                            "text-wrap": "normal",
                            "word-wrap": "normal"
                        }
                }
            })
        });

        let pageIPP = pages.find(x => x.data.name == page)
        pageIPP.Content.canDoDelta = false;
        pageIPP.Content.update(newData, true);
        pageIPP.push().then(function () {
            console.log('Data pushed for page : ' + page);
        }, (err: any) => {
            console.log('Error pushing Data for page : ' + page);
        });
    }
}