import { AdaptableEventArgs, AdaptableEventData } from './BlotterEvents';

import { AdaptableAlert } from '../../Utilities/Interface/IMessage';

/**
 * Event Args used as part of the **on('AlertFired')** event.
 *
 * Includes the Alert has been fired - this will contain details of the Alert Definition that triggered the Alert, and (optionally) what Data Change was responsible.
 */
export interface AlertFiredEventArgs extends AdaptableEventArgs {
  data: AlertFiredEventData[];
}

export interface AlertFiredEventData extends AdaptableEventData {
  id: AlertFiredInfo;
}

export interface AlertFiredInfo {
  alert: AdaptableAlert;
}
