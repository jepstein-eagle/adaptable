import * as ReduxStorage from 'redux-storage';
import { IAdaptableBlotter } from '../../api/Interface/IAdaptableBlotter';
export declare function createEngine(url: string, userName: string, blotterId: string, blotter: IAdaptableBlotter): ReduxStorage.StorageEngine;
