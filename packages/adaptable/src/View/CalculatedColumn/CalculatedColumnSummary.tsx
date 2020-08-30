import * as React from 'react';
import * as Redux from 'redux';
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import { connect } from 'react-redux';
import { Helper } from '../../Utilities/Helpers/Helper';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as CalculatedColumnRedux from '../../Redux/ActionsReducers/CalculatedColumnRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import { CalculatedColumnWizard } from './Wizard/CalculatedColumnWizard';
import {
  EditableConfigEntityState,
  WizardStatus,
} from '../Components/SharedProps/EditableConfigEntityState';
import { UIHelper } from '../UIHelper';
import { StrategyDetail } from '../Components/StrategySummary/StrategyDetail';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { CalculatedColumn } from '../../PredefinedConfig/CalculatedColumnState';

export interface CalculatedColumnSummaryProps
  extends StrategySummaryProps<CalculatedColumnSummaryComponent> {
  CalculatedColumns: CalculatedColumn[];
  onEdit: (calculatedColumn: CalculatedColumn) => void;
  onDeleteConfirm: Redux.Action;
  CalculatedColumnErrorMessage: string;
  IsExpressionValid: (expression: string) => SystemRedux.CalculatedColumnIsExpressionValidAction;
}

export class CalculatedColumnSummaryComponent extends React.Component<
  CalculatedColumnSummaryProps,
  EditableConfigEntityState
> {
  constructor(props: CalculatedColumnSummaryProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }

  render(): any {
    let detailRow;
    let sharing = this.props.teamSharingActivated;

    this.props.CalculatedColumns.map((item, index) => {
      if (item.ColumnId == this.props.summarisedColumn.ColumnId) {
        detailRow = (
          <StrategyDetail
            key={'UF' + index}
            Item1={StrategyConstants.CalculatedColumnStrategyFriendlyName}
            Item2={item.ColumnExpression}
            ConfigEnity={item}
            showShare={this.props.teamSharingActivated}
            EntityType={StrategyConstants.CalculatedColumnStrategyFriendlyName}
            onEdit={() => this.onEdit(item)}
            onShare={description => this.props.onShare(item, description)}
            onDelete={CalculatedColumnRedux.CalculatedColumnDelete(item)}
            showBold={true}
          />
        );
      }
    });

    return (
      <div>
        {detailRow}

        {this.state.EditedAdaptableObject && (
          <CalculatedColumnWizard
            editedAdaptableObject={this.state.EditedAdaptableObject as CalculatedColumn}
            configEntities={this.props.CalculatedColumns}
            modalContainer={this.props.modalContainer}
            GetErrorMessage={() => this.props.CalculatedColumnErrorMessage}
            IsExpressionValid={expression => this.props.IsExpressionValid(expression)}
            api={this.props.api}
            wizardStartIndex={this.state.WizardStartIndex}
            onCloseWizard={() => this.onCloseWizard()}
            onFinishWizard={() => this.onFinishWizard()}
            canFinishWizard={() => this.canFinishWizard()}
          />
        )}
      </div>
    );
  }

  onEdit(calculatedColumn: CalculatedColumn) {
    this.setState({
      EditedAdaptableObject: Helper.cloneObject(calculatedColumn),
      WizardStartIndex: 0,
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
    let calculatedColumn: CalculatedColumn = Helper.cloneObject(this.state.EditedAdaptableObject);
    this.props.onEdit(calculatedColumn);
    this.setState({
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard() {
    let calculatedColumn = this.state.EditedAdaptableObject as CalculatedColumn;
    return (
      StringExtensions.IsNotNullOrEmpty(calculatedColumn.ColumnId) &&
      StringExtensions.IsNotNullOrEmpty(calculatedColumn.ColumnExpression)
    );
  }
}

function mapStateToProps(
  state: AdaptableState,
  ownProps: any
): Partial<CalculatedColumnSummaryProps> {
  return {
    CalculatedColumns: state.CalculatedColumn.CalculatedColumns,
    CalculatedColumnErrorMessage: state.System.CalculatedColumnErrorMessage,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<CalculatedColumnSummaryProps> {
  return {
    onEdit: (calculatedColumn: CalculatedColumn) =>
      dispatch(CalculatedColumnRedux.CalculatedColumnEdit(calculatedColumn)),
    IsExpressionValid: (expression: string) =>
      dispatch(SystemRedux.CalculatedColumnIsExpressionValid(expression)),
  };
}

export let CalculatedColumnSummary = connect(
  mapStateToProps,
  mapDispatchToProps
)(CalculatedColumnSummaryComponent);
