import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { IReminderStrategy } from './Interface/IReminderStrategy';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import * as ScheduleRedux from '../Redux/ActionsReducers/ScheduleRedux';
import { TeamSharingImportInfo } from '../PredefinedConfig/TeamSharingState';
import { ReminderSchedule } from '../PredefinedConfig/ReminderState';

export class ReminderStrategy extends AdaptableStrategyBase implements IReminderStrategy {
  constructor(adaptable: IAdaptable) {
    super(
      StrategyConstants.ReminderStrategyId,
      StrategyConstants.ReminderStrategyFriendlyName,
      StrategyConstants.ReminderGlyph,
      ScreenPopups.ReminderPopup,
      adaptable
    );
  }

  public getTeamSharingAction(): TeamSharingImportInfo<ReminderSchedule> {
    return {
      FunctionEntities: this.adaptable.api.reminderApi.getAllReminder(),
      AddAction: ScheduleRedux.ReminderScheduleAdd,
      EditAction: ScheduleRedux.ReminderScheduleEdit,
    };
  }
}
