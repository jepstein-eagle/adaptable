import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { InputGroup, Button } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import * as BulkUpdateRedux from '../../Redux/ActionsReducers/BulkUpdateRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { ButtonApply } from '../Components/Buttons/ButtonApply';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { AdaptablePopover } from '../AdaptablePopover';
import { StatusColour, AccessLevel, MessageType, DashboardSize } from '../../Utilities/Enums';
import { PreviewResultsPanel } from '../Components/PreviewResultsPanel';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { UIHelper } from '../UIHelper';
import { IPreviewInfo } from '../../Utilities/Interface/IPreview';
import { ColumnValueSelector } from '../Components/Selectors/ColumnValueSelector';
import { IUIConfirmation } from '../../Utilities/Interface/IMessage';
import { CellValidationHelper } from '../../Utilities/Helpers/CellValidationHelper';
import { DEFAULT_BSSTYLE, PRIMARY_BSSTYLE } from '../../Utilities/Constants/StyleConstants';

interface BulkUpdateToolbarControlComponentProps
  extends ToolbarStrategyViewPopupProps<BulkUpdateToolbarControlComponent> {
  BulkUpdateValue: string;
  IsValidSelection: boolean;
  PreviewInfo: IPreviewInfo;

  onBulkUpdateValueChange: (value: string) => BulkUpdateRedux.BulkUpdateChangeValueAction;
  onBulkUpdateCheckSelectedCells: () => SystemRedux.BulkUpdateCheckCellSelectionAction;
  onApplyBulkUpdate: () => BulkUpdateRedux.BulkUpdateApplyAction;
  onConfirmWarningCellValidation: (
    confirmation: IUIConfirmation
  ) => PopupRedux.PopupShowConfirmationAction;
}

interface BulkUpdateToolbarControlComponentState {
  Disabled: boolean;
  SubFunc: any;
}

class BulkUpdateToolbarControlComponent extends React.Component<
  BulkUpdateToolbarControlComponentProps,
  BulkUpdateToolbarControlComponentState
> {
  constructor(props: BulkUpdateToolbarControlComponentProps) {
    super(props);
    this.state = {
      Disabled: true,
      SubFunc: () => {
        this.onSelectionChanged();
      },
    };
  }
  public componentDidMount() {
    if (this.props.Blotter) {
      this.props.Blotter.onSelectedCellsChanged().Subscribe(this.state.SubFunc);
    }
  }

  public componentWillUnmount() {
    if (this.props.Blotter) {
      this.props.Blotter.onSelectedCellsChanged().Unsubscribe(this.state.SubFunc);
    }
  }

  render() {
    let statusColour: StatusColour = this.getStatusColour();
    // missing datatype validation for time being

    // we dont want to show the panel in the form but will need to appear in a popup....
    let cssClassName: string = this.props.cssClassName + '__bulkupdate';

    let activeButtonStyle: string = this.props.UseSingleColourForButtons
      ? DEFAULT_BSSTYLE
      : PRIMARY_BSSTYLE;

    let activeButton = this.state.Disabled ? (
      <Button
        style={{ marginRight: '3px' }}
        onClick={() => this.onDisabledChanged()}
        bsStyle="default"
        bsSize={this.props.DashboardSize}
      >
        Off
      </Button>
    ) : (
      <Button
        style={{ marginRight: '3px' }}
        onClick={() => this.onDisabledChanged()}
        bsStyle={activeButtonStyle}
        bsSize={this.props.DashboardSize}
      >
        On
      </Button>
    );

    let selectedColumn =
      this.props.PreviewInfo && StringExtensions.IsNotNullOrEmpty(this.props.PreviewInfo.ColumnId)
        ? ColumnHelper.getColumnFromId(this.props.PreviewInfo.ColumnId, this.props.Columns)
        : null;

    let previewPanel = (
      <PreviewResultsPanel
        cssClassName={cssClassName}
        UpdateValue={this.props.BulkUpdateValue}
        PreviewInfo={this.props.PreviewInfo}
        Columns={this.props.Columns}
        UserFilters={this.props.UserFilters}
        SelectedColumn={selectedColumn}
        ShowPanel={true}
        ShowHeader={false}
      />
    );

    let content = (
      <span>
        <div
          className={
            this.props.AccessLevel == AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : ''
          }
        >
          <InputGroup>
            <InputGroup.Button>{activeButton}</InputGroup.Button>

            <ColumnValueSelector
              style={{ width: '120px', height: '10px' }}
              cssClassName={cssClassName}
              disabled={!this.props.IsValidSelection}
              bsSize={'small'}
              SelectedColumnValue={this.props.BulkUpdateValue}
              SelectedColumn={selectedColumn}
              Blotter={this.props.Blotter}
              onColumnValueChange={columns => this.onColumnValueSelectedChanged(columns)}
            />
          </InputGroup>

          {this.props.IsValidSelection &&
            StringExtensions.IsNotNullOrEmpty(this.props.BulkUpdateValue) && (
              <ButtonApply
                cssClassName={cssClassName}
                style={{ marginLeft: '3px' }}
                onClick={() => this.onApplyClick()}
                size={this.props.DashboardSize}
                glyph={'ok'}
                bsStyle={UIHelper.getStyleNameByStatusColour(statusColour)}
                overrideTooltip="Apply Bulk Update"
                overrideDisableButton={
                  StringExtensions.IsNullOrEmpty(this.props.BulkUpdateValue) ||
                  (this.props.PreviewInfo != null &&
                    this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent)
                }
                DisplayMode="Glyph"
                AccessLevel={this.props.AccessLevel}
                showDefaultStyle={this.props.UseSingleColourForButtons}
              />
            )}

          {this.props.IsValidSelection &&
            StringExtensions.IsNotNullOrEmpty(this.props.BulkUpdateValue) && (
              <span style={{ marginLeft: '3px' }}>
                <AdaptablePopover
                  showDefaultStyle={this.props.UseSingleColourForButtons}
                  size={this.props.DashboardSize}
                  cssClassName={cssClassName}
                  headerText="Preview Results"
                  bodyText={[previewPanel]}
                  MessageType={UIHelper.getMessageTypeByStatusColour(statusColour)}
                  useButton={true}
                  triggerAction={'click'}
                />
              </span>
            )}
        </div>
      </span>
    );

    return (
      <PanelDashboard
        cssClassName={cssClassName}
        useDefaultPanelStyle={this.props.UseSingleColourForButtons}
        headerText={StrategyConstants.BulkUpdateStrategyName}
        glyphicon={StrategyConstants.BulkUpdateGlyph}
        onClose={() => this.props.onClose(StrategyConstants.BulkUpdateStrategyId)}
        onConfigure={() => this.props.onConfigure()}
      >
        {content}
      </PanelDashboard>
    );
  }
  private onColumnValueSelectedChanged(selectedColumnValue: any) {
    this.props.onBulkUpdateValueChange(selectedColumnValue);
  }

  private onSelectionChanged(): void {
    if (!this.state.Disabled) {
      this.getSelectedCells();
    }
  }

  private getSelectedCells() {
    this.props.onBulkUpdateValueChange('');
    this.props.onBulkUpdateCheckSelectedCells();
  }

  private getStatusColour(): StatusColour {
    if (StringExtensions.IsNotNullOrEmpty(this.props.BulkUpdateValue) && this.props.PreviewInfo) {
      if (this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent) {
        return StatusColour.Red;
      }
      if (
        this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning ||
        this.props.PreviewInfo.PreviewValidationSummary.HasValidationPrevent
      ) {
        return StatusColour.Amber;
      }
    }
    return StatusColour.Green;
  }

  onDisabledChanged() {
    let newDisabledState: boolean = !this.state.Disabled;
    if (!newDisabledState) {
      this.props.onBulkUpdateCheckSelectedCells();
    }
    this.setState({ Disabled: newDisabledState });
  }

  private onApplyClick(): void {
    this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning
      ? this.onConfirmWarningCellValidation()
      : this.onApplyBulkUpdate();
  }

  private onConfirmWarningCellValidation() {
    let confirmAction: Redux.Action = BulkUpdateRedux.BulkUpdateApply(true);
    let cancelAction: Redux.Action = BulkUpdateRedux.BulkUpdateApply(false);
    let confirmation: IUIConfirmation = CellValidationHelper.createCellValidationUIConfirmation(
      confirmAction,
      cancelAction
    );
    this.props.onConfirmWarningCellValidation(confirmation);
  }

  onApplyBulkUpdate(): any {
    this.props.onApplyBulkUpdate();
    this.onSelectionChanged();
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    BulkUpdateValue: state.BulkUpdate.BulkUpdateValue,
    IsValidSelection: state.System.IsValidBulkUpdateSelection,
    PreviewInfo: state.System.BulkUpdatePreviewInfo,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onBulkUpdateValueChange: (value: string) =>
      dispatch(BulkUpdateRedux.BulkUpdateChangeValue(value)),
    onBulkUpdateCheckSelectedCells: () => dispatch(SystemRedux.BulkUpdateCheckCellSelection()),
    onApplyBulkUpdate: () => dispatch(BulkUpdateRedux.BulkUpdateApply(false)),
    onConfirmWarningCellValidation: (confirmation: IUIConfirmation) =>
      dispatch(PopupRedux.PopupShowConfirmation(confirmation)),
    onClose: (dashboardControl: string) =>
      dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.BulkUpdateStrategyId,
          ScreenPopups.BulkUpdatePopup
        )
      ),
  };
}

export let BulkUpdateToolbarControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(BulkUpdateToolbarControlComponent);
