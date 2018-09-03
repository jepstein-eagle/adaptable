import { IStrategy } from './IStrategy';
import { KeyValuePair } from '../../View/UIInterfaces';
export interface IAboutStrategy extends IStrategy {
    CreateAboutInfo(): KeyValuePair[];
}
