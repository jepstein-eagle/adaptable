import * as Redux from 'redux';
import { AboutState } from './Interface/IState';
import { KeyValuePair } from '../../View/UIInterfaces';
export declare const ABOUT_INFO_CREATE = "ABOUT_INFO_CREATE";
export declare const ABOUT_INFO_SET = "ABOUT_INFO_SET";
export interface AboutInfoCreateAction extends Redux.Action {
}
export interface AboutInfoSetAction extends Redux.Action {
    AboutInfo: KeyValuePair[];
}
export declare const AboutInfoCreate: () => AboutInfoCreateAction;
export declare const AboutInfoSet: (AboutInfo: KeyValuePair[]) => AboutInfoSetAction;
export declare const AboutReducer: Redux.Reducer<AboutState>;
