import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { ISystemStatusStrategy } from './Interface/ISystemStatusStrategy';
import { MenuItemShowPopup } from '../Utilities/MenuItem';
import { AdaptableBlotterMenuItem, ContextMenuInfo } from '../PredefinedConfig/Common/Menu';
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
  }

  protected InitState() {
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

  public addMainMenuItem(): AdaptableBlotterMenuItem | undefined {
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

  public addContextMenuItem(
    contextMenuInfo: ContextMenuInfo
  ): AdaptableBlotterMenuItem | undefined {
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
