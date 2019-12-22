import * as React from 'react';
import * as Redux from 'redux';
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import { connect } from 'react-redux';
import { Helper } from '../../Utilities/Helpers/Helper';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { AdaptableBlotterState } from '../../PredefinedConfig/AdaptableBlotterState';
import * as CalculatedColumnRedux from '../../Redux/ActionsReducers/CalculatedColumnRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
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
    let sharing = this.props.TeamSharingActivated;

    this.props.CalculatedColumns.map((item, index) => {
      if (item.ColumnId == this.props.SummarisedColumn.ColumnId) {
        detailRow = (
          <StrategyDetail
            key={'UF' + index}
            Item1={StrategyConstants.CalculatedColumnStrategyName}
            Item2={item.ColumnExpression}
            ConfigEnity={item}
            showShare={this.props.TeamSharingActivated}
            EntityType={StrategyConstants.CalculatedColumnStrategyName}
            onEdit={() => this.onEdit(item)}
            onShare={() => this.props.onShare(item)}
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
            EditedAdaptableObject={this.state.EditedAdaptableObject as CalculatedColumn}
            ConfigEntities={this.props.CalculatedColumns}
            Columns={this.props.Columns}
            ModalContainer={this.props.ModalContainer}
            UserFilters={this.props.UserFilters}
            SystemFilters={this.props.SystemFilters}
            NamedFilters={this.props.NamedFilters}
            ColumnCategories={this.props.ColumnCategories}
            GetErrorMessage={() => this.props.CalculatedColumnErrorMessage}
            IsExpressionValid={expression => this.props.IsExpressionValid(expression)}
            Blotter={this.props.Blotter}
            WizardStartIndex={this.state.WizardStartIndex}
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

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    CalculatedColumns: state.CalculatedColumn.CalculatedColumns,
    CalculatedColumnErrorMessage: state.System.CalculatedColumnErrorMessage,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableBlotterState>>) {
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
