import { IEvent } from './Interface/IEvent';
import { EventDispatcher } from './EventDispatcher';

export module iPushPullHelper {
    export enum ServiceStatus {
        Unknown,
        Disconnected,
        Connected,
        Error
    }
    export var IPPStatus: ServiceStatus = ServiceStatus.Unknown
    let iPushPullApp: angular.IModule
    export function isIPushPullLoaded() {
        try {
            let angular = (<any>window).angular
            //first we check if angular is loaded (dependency from ipushpull)
            if (typeof angular == 'undefined') {
                return false;
            }
            //we try to create the angular module
            if (!iPushPullApp) {
                iPushPullApp = angular.module("myApp", ["ipushpull"])
                //PROD
                iPushPullApp.config(["ippConfigProvider", (ippConfigProvider: any) => {
                    ippConfigProvider.set({
                        api_key: "CbBaMaoqHVifScrYwKssGnGyNkv5xHOhQVGm3cYP",
                        api_secret: "xYzE51kuHyyt9kQCvMe0tz0H2sDSjyEQcF5SOBlPQmcL9em0NqcCzyqLYj5fhpuZxQ8BiVcYl6zoOHeI6GYZj1TkUiiLVFoW3HUxiCdEUjlPS8Vl2YHUMEPD5qkLYnGj",
                    });
                }]);
                //TEST
                // iPushPullApp.config(["ippConfigProvider", (ippConfigProvider: any) => {
                //     ippConfigProvider.set({
                //         api_url: "https://test.ipushpull.com/api/1.0",
                //         ws_url: "https://test.ipushpull.com",
                //         api_key: "rG25WWuOdEhLejupBc9TfPyB4womfOibmPHdBytJ",
                //         api_secret: "Icfcc8eceP1eNUt9EEAaa8mHjCfyAhaiG0EXBurhy2GWSqkDgakxAKr76hXBeNaymAkpG2NGfK6a3ScgCNSyZhIWxGTmuyi35YNQXMW5JT1e4zeazpfva14NUIevROE9",
                //     });
                // }]);
                angular.bootstrap(document, ['myApp']);
            }
        }
        catch (ex) {
            return false;
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

            serv.login(login, password).catch((err: string) => {
                IPPStatus = ServiceStatus.Error;
                reject(err)
            });
        })
    }

    var page: any
    export function LoadPage(): Promise<string> {
        return new Promise<string>((resolve: any, reject: any) => {
            console.log('Loading IPP PAge');
            let angular = (<any>window).angular
            var $inj = angular.element(document).injector();
            var serv = $inj.get('ippPageService');
            //PROD
            page = new serv("Blotter ", "SYInt")
            //TEST
            // page = new serv("MyDataPage", "NAIM")

            page.on(page.EVENT_NEW_CONTENT, function (data: any) {
                console.log("Page Ready")
                resolve();
                //we return true so it removes the listener for new content.
                //IPP should add that line to their wiki
                return true;
            });
        });
    }

    export function pushData(workBookName: string, data: any[], style: {
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

        page.Content.canDoDelta = false;
        page.Content.update(newData, true);
        page.push().then(function () {
            console.log('sucesss');
        }, (err: any) => {
            console.log('fail');
        });
    }
}