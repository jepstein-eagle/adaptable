import { ApiBase } from "./ApiBase";
import { ISystemStatusApi } from './Interface/ISystemStatusApi';
export declare class SystemStatusApi extends ApiBase implements ISystemStatusApi {
    Set(statusMessage: string, statusColour: "Blue" | "Red" | "Amber" | "Green"): void;
    SetRed(statusMessage: string): void;
    SetAmber(statusMessage: string): void;
    SetGreen(statusMessage: string): void;
    SetBlue(statusMessage: string): void;
    Clear(): void;
}
