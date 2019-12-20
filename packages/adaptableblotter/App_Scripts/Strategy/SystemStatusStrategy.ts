import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { ISystemStatusStrategy } from './Interface/ISystemStatusStrategy';
import * as SystemStatusRedux from '../Redux/ActionsReducers/SystemStatusRedux';
import { AdaptableBlotterMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import { AdaptableBlotterColumn } from '../PredefinedConfig/Common/AdaptableBlotterColumn';
import { SystemStatusState } from '../PredefinedConfig/SystemStatusState';
import StringExtensions from '../Utilities/Extensions/StringExtensions';
import { MessageType } from '../PredefinedConfig/Common/Enums';
import Helper from '../Utilities/Helpers/Helper';

export class SystemStatusStrategy extends AdaptableStrategyBase implements ISystemStatusStrategy {
  private systemStatusState: SystemStatusState;
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.SystemStatusStrategyId, blotter);

    blotter.adaptableBlotterStore.onAny((eventName: string) => {
      if (
        eventName == SystemStatusRedux.SYSTEM_SYSTEM_SET_UPDATE ||
        eventName == SystemStatusRedux.SYSTEM_SYSTEM_SET_SHOW_ALERT ||
        eventName == SystemStatusRedux.SYSTEM_STATUS_CLEAR
      ) {
        this.doStuff();
      }
    });
  }

  protected doStuff(): void {
    let systemStatusState = this.blotter.api.systemStatusApi.getSystemStatusState();
    if (StringExtensions.IsNullOrEmpty(systemStatusState.StatusMessage)) {
      this.blotter.api.systemStatusApi.setSystemStatus(
        systemStatusState.DefaultStatusMessage,
        systemStatusState.StatusType
      );
    }
    if (Helper.objectNotExists(systemStatusState.StatusType)) {
      this.blotter.api.systemStatusApi.setSystemStatus(
        systemStatusState.StatusMessage,
        systemStatusState.DefaultStatusType
      );
    }
  }

  protected InitStateOld() {
    if (this.systemStatusState != this.blotter.api.systemStatusApi.getSystemStatusState()) {
      this.systemStatusState = this.blotter.api.systemStatusApi.getSystemStatusState();
      if (StringExtensions.IsNullOrEmpty(this.systemStatusState.StatusMessage)) {
        this.blotter.api.systemStatusApi.setSystemStatus(
          this.systemStatusState.DefaultStatusMessage,
          this.systemStatusState.StatusType
        );
      }
      if (Helper.objectNotExists(this.systemStatusState.StatusType)) {
        this.blotter.api.systemStatusApi.setSystemStatus(
          this.systemStatusState.StatusMessage,
          this.systemStatusState.DefaultStatusType
        );
      }
    }
  }

  public addFunctionMenuItem(): AdaptableBlotterMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.SystemStatusStrategyName,
      ComponentName: ScreenPopups.SystemStatusPopup,
      Icon: StrategyConstants.SystemStatusGlyph,
    });
  }

  public addColumnMenuItem(column: AdaptableBlotterColumn): AdaptableBlotterMenuItem | undefined {
    return this.createColumnMenuItemShowPopup(
      'Show ' + StrategyConstants.SystemStatusStrategyName,
      ScreenPopups.SystemStatusPopup,
      StrategyConstants.SystemStatusGlyph
    );
  }

  public addContextMenuItem(menuInfo: MenuInfo): AdaptableBlotterMenuItem | undefined {
    let popUpParams: StrategyParams = {
      source: 'ContextMenu',
    };
    return this.createMainMenuItemShowPopup({
      Label: 'Show ' + StrategyConstants.SystemStatusStrategyName,
      ComponentName: ScreenPopups.SystemStatusPopup,
      Icon: StrategyConstants.SystemStatusGlyph,
      PopupParams: popUpParams,
    });
  }
}
