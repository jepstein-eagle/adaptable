import * as React from 'react';
import * as Redux from 'redux';
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import {
  EditableConfigEntityState,
  WizardStatus,
} from '../Components/SharedProps/EditableConfigEntityState';
import { connect } from 'react-redux';
import { Helper } from '../../Utilities/Helpers/Helper';
import { FormatColumnWizard } from './Wizard/FormatColumnWizard';
import * as FormatColumnRedux from '../../Redux/ActionsReducers/FormatColumnRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import { StrategyHeader } from '../Components/StrategySummary/StrategyHeader';
import { StrategyDetail } from '../Components/StrategySummary/StrategyDetail';
import { StrategyProfile } from '../Components/StrategyProfile';
import { StyleVisualItem } from '../Components/StyleVisualItem';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { UIHelper } from '../UIHelper';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { FormatColumn } from '../../PredefinedConfig/FormatColumnState';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';

export interface FormatColumnSummaryProps
  extends StrategySummaryProps<FormatColumnSummaryComponent> {
  FormatColumns: FormatColumn[];
  ColorPalette: string[];
  StyleClassNames: string[];
  onAddFormatColumn: (FormatColumn: FormatColumn) => FormatColumnRedux.FormatColumnAddAction;
  onEditFormatColumn: (FormatColumn: FormatColumn) => FormatColumnRedux.FormatColumnEditAction;
  onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}

export class FormatColumnSummaryComponent extends React.Component<
  FormatColumnSummaryProps,
  EditableConfigEntityState
> {
  constructor(props: FormatColumnSummaryProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }

  render(): any {
    let formatColumn: FormatColumn = this.props.FormatColumns.find(
      c => c.ColumnId == this.props.SummarisedColumn.ColumnId
    );
    let noFormatColumn: boolean = formatColumn == null;

    let formatColumnRow: any;

    if (noFormatColumn) {
      formatColumnRow = (
        <StrategyHeader
          key={StrategyConstants.FormatColumnStrategyName}
          StrategyId={StrategyConstants.FormatColumnStrategyId}
          StrategySummary={'No Format Column Set'}
          onNew={() => this.onNew()}
          NewButtonTooltip={StrategyConstants.FormatColumnStrategyName}
          AccessLevel={this.props.AccessLevel}
        />
      );
    } else {
      formatColumnRow = (
        <StrategyDetail
          key={StrategyConstants.FormatColumnStrategyName}
          Item1={<StrategyProfile StrategyId={StrategyConstants.FormatColumnStrategyId} />}
          Item2={<StyleVisualItem Style={formatColumn.Style} />}
          ConfigEnity={formatColumn}
          showShare={this.props.TeamSharingActivated}
          EntityType={StrategyConstants.FormatColumnStrategyName}
          onEdit={() => this.onEdit(formatColumn)}
          onShare={() => this.props.onShare(formatColumn)}
          onDelete={FormatColumnRedux.FormatColumnDelete(formatColumn)}
          showBold={true}
        />
      );
    }

    return (
      <div>
        {formatColumnRow}

        {this.state.EditedAdaptableObject && (
          <FormatColumnWizard
            EditedAdaptableObject={this.state.EditedAdaptableObject as FormatColumn}
            ModalContainer={this.props.ModalContainer}
            Columns={this.props.Columns}
            ConfigEntities={this.props.FormatColumns}
            UserFilters={this.props.UserFilters}
            SystemFilters={this.props.SystemFilters}
            NamedFilters={this.props.NamedFilters}
            ColumnCategories={this.props.ColumnCategories}
            ColorPalette={this.props.ColorPalette}
            StyleClassNames={this.props.StyleClassNames}
            WizardStartIndex={this.state.WizardStartIndex}
            onCloseWizard={() => this.onCloseWizard()}
            onFinishWizard={() => this.onFinishWizard()}
            canFinishWizard={() => this.canFinishWizard()}
            Blotter={this.props.Blotter}
          />
        )}
      </div>
    );
  }

  onNew() {
    let configEntity: FormatColumn = ObjectFactory.CreateEmptyFormatColumn();
    configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
    this.setState({
      EditedAdaptableObject: configEntity,
      WizardStartIndex: 1,
      WizardStatus: WizardStatus.New,
    });
  }

  onEdit(formatColumn: FormatColumn) {
    let clonedObject: FormatColumn = Helper.cloneObject(formatColumn);
    this.setState({
      EditedAdaptableObject: clonedObject,
      WizardStartIndex: 1,
      WizardStatus: WizardStatus.Edit,
    });
  }

  onCloseWizard() {
    this.setState({
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  onFinishWizard() {
    let formatColumn: FormatColumn = this.state.EditedAdaptableObject as FormatColumn;
    if (this.props.FormatColumns.find(x => x.ColumnId == formatColumn.ColumnId)) {
      this.props.onEditFormatColumn(formatColumn);
    } else {
      this.props.onAddFormatColumn(formatColumn);
    }
    this.setState({
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard() {
    let formatColumn = this.state.EditedAdaptableObject as FormatColumn;
    return (
      StringExtensions.IsNotNullOrEmpty(formatColumn.ColumnId) &&
      UIHelper.IsNotEmptyStyle(formatColumn.Style)
    );
  }
}
function mapStateToProps(state: AdaptableState, ownProps: any) {
  return {
    Columns: state.Grid.Columns,
    FormatColumns: state.FormatColumn.FormatColumns,
    ColorPalette: state.UserInterface.ColorPalette,
    Entitlements: state.Entitlements.FunctionEntitlements,
    StyleClassNames: state.UserInterface.StyleClassNames,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {
    onAddFormatColumn: (FormatColumn: FormatColumn) =>
      dispatch(FormatColumnRedux.FormatColumnAdd(FormatColumn)),
    onEditFormatColumn: (FormatColumn: FormatColumn) =>
      dispatch(FormatColumnRedux.FormatColumnEdit(FormatColumn)),
    onShare: (entity: AdaptableObject) =>
      dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.FormatColumnStrategyId)),
  };
}

export let FormatColumnSummary = connect(
  mapStateToProps,
  mapDispatchToProps
)(FormatColumnSummaryComponent);
