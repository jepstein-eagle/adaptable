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
    let formatColumn: FormatColumn = this.props.api.formatColumnApi.getFormatColumnForColumn(
      this.props.summarisedColumn
    );
    let noFormatColumn: boolean = formatColumn == null;

    let formatColumnRow: any;

    if (noFormatColumn) {
      formatColumnRow = (
        <StrategyHeader
          key={StrategyConstants.FormatColumnStrategyFriendlyName}
          functionName={StrategyConstants.FormatColumnStrategyId}
          strategySummary={'No Format Column Set'}
          onNew={() => this.onNew()}
          newButtonTooltip={StrategyConstants.FormatColumnStrategyFriendlyName}
          accessLevel={this.props.accessLevel}
        />
      );
    } else {
      formatColumnRow = (
        <StrategyDetail
          key={StrategyConstants.FormatColumnStrategyFriendlyName}
          item1={<StrategyProfile FunctionName={StrategyConstants.FormatColumnStrategyId} />}
          item2={<StyleVisualItem Style={formatColumn.Style} />}
          configEnity={formatColumn}
          showShare={this.props.teamSharingActivated}
          entityType={StrategyConstants.FormatColumnStrategyFriendlyName}
          onEdit={() => this.onEdit(formatColumn)}
          onShare={description => this.props.onShare(formatColumn, description)}
          onDelete={FormatColumnRedux.FormatColumnDelete(formatColumn)}
          showBold={true}
        />
      );
    }

    return (
      <div>
        {formatColumnRow}

        {this.state.editedAdaptableObject && (
          <FormatColumnWizard
            editedAdaptableObject={this.state.editedAdaptableObject as FormatColumn}
            modalContainer={this.props.modalContainer}
            configEntities={this.props.FormatColumns}
            api={this.props.api}
            StyleClassNames={this.props.StyleClassNames}
            wizardStartIndex={this.state.wizardStartIndex}
            onCloseWizard={() => this.onCloseWizard()}
            onFinishWizard={() => this.onFinishWizard()}
            canFinishWizard={() => this.canFinishWizard()}
          />
        )}
      </div>
    );
  }

  onNew() {
    let configEntity: FormatColumn = ObjectFactory.CreateEmptyFormatColumn();
    configEntity.Scope = {
      ColumnIds: [this.props.summarisedColumn.ColumnId],
    };
    this.setState({
      editedAdaptableObject: configEntity,
      wizardStartIndex: 1,
      wizardStatus: WizardStatus.New,
    });
  }

  onEdit(formatColumn: FormatColumn) {
    let clonedObject: FormatColumn = Helper.cloneObject(formatColumn);
    this.setState({
      editedAdaptableObject: clonedObject,
      wizardStartIndex: 1,
      wizardStatus: WizardStatus.Edit,
    });
  }

  onCloseWizard() {
    this.setState({
      editedAdaptableObject: null,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.None,
    });
  }

  onFinishWizard() {
    let formatColumn: FormatColumn = this.state.editedAdaptableObject as FormatColumn;
    if (this.props.FormatColumns.find(x => x.Uuid == formatColumn.Uuid)) {
      this.props.onEditFormatColumn(formatColumn);
    } else {
      this.props.onAddFormatColumn(formatColumn);
    }
    this.setState({
      editedAdaptableObject: null,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard() {
    let formatColumn = this.state.editedAdaptableObject as FormatColumn;
    return formatColumn.Scope != undefined && UIHelper.IsNotEmptyStyle(formatColumn.Style);
  }
}
function mapStateToProps(state: AdaptableState, ownProps: any): Partial<FormatColumnSummaryProps> {
  return {
    FormatColumns: state.FormatColumn.FormatColumns,
    ColorPalette: state.UserInterface.ColorPalette,
    StyleClassNames: state.UserInterface.StyleClassNames,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<FormatColumnSummaryProps> {
  return {
    onAddFormatColumn: (FormatColumn: FormatColumn) =>
      dispatch(FormatColumnRedux.FormatColumnAdd(FormatColumn)),
    onEditFormatColumn: (FormatColumn: FormatColumn) =>
      dispatch(FormatColumnRedux.FormatColumnEdit(FormatColumn)),

    onShare: (entity: AdaptableObject, description: string) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(
          entity,
          StrategyConstants.FormatColumnStrategyId,
          description
        )
      ),
  };
}

export let FormatColumnSummary = connect(
  mapStateToProps,
  mapDispatchToProps
)(FormatColumnSummaryComponent);
