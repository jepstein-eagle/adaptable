import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { ISystemStatusStrategy } from './Interface/ISystemStatusStrategy';
import * as SystemStatusRedux from '../Redux/ActionsReducers/SystemStatusRedux';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { SystemStatusState } from '../PredefinedConfig/SystemStatusState';
import StringExtensions from '../Utilities/Extensions/StringExtensions';
import { MessageType } from '../PredefinedConfig/Common/Enums';
import Helper from '../Utilities/Helpers/Helper';

export class SystemStatusStrategy extends AdaptableStrategyBase implements ISystemStatusStrategy {
  private systemStatusState: SystemStatusState;
  constructor(adaptable: IAdaptable) {
    super(
      StrategyConstants.SystemStatusStrategyId,
      StrategyConstants.SystemStatusStrategyFriendlyName,
      StrategyConstants.SystemStatusGlyph,
      ScreenPopups.SystemStatusPopup,
      adaptable
    );

    adaptable.adaptableStore.onAny((eventName: string) => {
      if (
        eventName == SystemStatusRedux.SYSTEM_SYSTEM_SET_UPDATE ||
        eventName == SystemStatusRedux.SYSTEM_SYSTEM_SET_SHOW_ALERT ||
        eventName == SystemStatusRedux.SYSTEM_STATUS_CLEAR
      ) {
        this.setSystemMessage();
      }
    });
  }

  public tidyOldConfig(): void {
    setTimeout(() => {
      this.adaptable.api.systemStatusApi.setDefaultMessage();
    }, 300);
  }

  protected setSystemMessage(): void {
    let systemStatusState = this.adaptable.api.systemStatusApi.getSystemStatusState();
    if (StringExtensions.IsNullOrEmpty(systemStatusState.StatusMessage)) {
      this.adaptable.api.systemStatusApi.setSystemStatus(
        systemStatusState.DefaultStatusMessage,
        systemStatusState.StatusType
      );
    }
    if (Helper.objectNotExists(systemStatusState.StatusType)) {
      this.adaptable.api.systemStatusApi.setSystemStatus(
        systemStatusState.StatusMessage,
        systemStatusState.DefaultStatusType
      );
    }
  }

  protected InitStateOld() {
    if (this.systemStatusState != this.adaptable.api.systemStatusApi.getSystemStatusState()) {
      this.systemStatusState = this.adaptable.api.systemStatusApi.getSystemStatusState();
      if (StringExtensions.IsNullOrEmpty(this.systemStatusState.StatusMessage)) {
        this.adaptable.api.systemStatusApi.setSystemStatus(
          this.systemStatusState.DefaultStatusMessage,
          this.systemStatusState.StatusType
        );
      }
      if (Helper.objectNotExists(this.systemStatusState.StatusType)) {
        this.adaptable.api.systemStatusApi.setSystemStatus(
          this.systemStatusState.StatusMessage,
          this.systemStatusState.DefaultStatusType
        );
      }
    }
  }

  public addColumnMenuItems(column: AdaptableColumn): AdaptableMenuItem[] | undefined {
    if (this.canCreateMenuItem('ReadOnly')) {
      return [
        this.createColumnMenuItemShowPopup(
          'Show ' + StrategyConstants.SystemStatusStrategyFriendlyName,
          ScreenPopups.SystemStatusPopup,
          StrategyConstants.SystemStatusGlyph
        ),
      ];
    }
  }

  public addContextMenuItem(menuInfo: MenuInfo): AdaptableMenuItem | undefined {
    let popUpParams: StrategyParams = {
      source: 'ContextMenu',
    };
    return this.createMainMenuItemShowPopup({
      Label: 'Show ' + StrategyConstants.SystemStatusStrategyFriendlyName,
      ComponentName: ScreenPopups.SystemStatusPopup,
      Icon: StrategyConstants.SystemStatusGlyph,
      PopupParams: popUpParams,
    });
  }
}
