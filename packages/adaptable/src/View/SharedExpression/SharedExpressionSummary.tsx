import * as React from 'react';
import * as Redux from 'redux';
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import { connect } from 'react-redux';
import { Helper } from '../../Utilities/Helpers/Helper';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as SharedExpressionRedux from '../../Redux/ActionsReducers/SharedExpressionRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
import { SharedExpressionWizard } from './Wizard/SharedExpressionWizard';
import {
  EditableConfigEntityState,
  WizardStatus,
} from '../Components/SharedProps/EditableConfigEntityState';
import { UIHelper } from '../UIHelper';
import { StrategyDetail } from '../Components/StrategySummary/StrategyDetail';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { SharedExpression } from '../../PredefinedConfig/SharedExpressionState';

export interface SharedExpressionSummaryProps
  extends StrategySummaryProps<SharedExpressionSummaryComponent> {
  SharedExpressions: SharedExpression[];
  onEdit: (sharedExpression: SharedExpression) => void;
  onDeleteConfirm: Redux.Action;
  SharedExpressionErrorMessage: string;
  IsExpressionValid: (expression: string) => SystemRedux.SharedExpressionIsExpressionValidAction;
}

export class SharedExpressionSummaryComponent extends React.Component<
  SharedExpressionSummaryProps,
  EditableConfigEntityState
> {
  constructor(props: SharedExpressionSummaryProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }

  render(): any {
    let detailRow;
    let sharing = this.props.TeamSharingActivated;

    this.props.SharedExpressions.map((item, index) => {
      if (item.ColumnId == this.props.SummarisedColumn.ColumnId) {
        detailRow = (
          <StrategyDetail
            key={'UF' + index}
            Item1={StrategyConstants.SharedExpressionStrategyFriendlyName}
            Item2={item.ColumnExpression}
            ConfigEnity={item}
            showShare={this.props.TeamSharingActivated}
            EntityType={StrategyConstants.SharedExpressionStrategyFriendlyName}
            onEdit={() => this.onEdit(item)}
            onShare={description => this.props.onShare(item, description)}
            onDelete={SharedExpressionRedux.SharedExpressionDelete(item)}
            showBold={true}
          />
        );
      }
    });

    return (
      <div>
        {detailRow}

        {this.state.EditedAdaptableObject && (
          <SharedExpressionWizard
            EditedAdaptableObject={this.state.EditedAdaptableObject as SharedExpression}
            ConfigEntities={this.props.SharedExpressions}
            ModalContainer={this.props.ModalContainer}
            GetErrorMessage={() => this.props.SharedExpressionErrorMessage}
            IsExpressionValid={expression => this.props.IsExpressionValid(expression)}
            Api={this.props.Api}
            WizardStartIndex={this.state.WizardStartIndex}
            onCloseWizard={() => this.onCloseWizard()}
            onFinishWizard={() => this.onFinishWizard()}
            canFinishWizard={() => this.canFinishWizard()}
          />
        )}
      </div>
    );
  }

  onEdit(sharedExpression: SharedExpression) {
    this.setState({
      EditedAdaptableObject: Helper.cloneObject(sharedExpression),
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
    let sharedExpression: SharedExpression = Helper.cloneObject(this.state.EditedAdaptableObject);
    this.props.onEdit(sharedExpression);
    this.setState({
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard() {
    let sharedExpression = this.state.EditedAdaptableObject as SharedExpression;
    return (
      StringExtensions.IsNotNullOrEmpty(sharedExpression.ColumnId) &&
      StringExtensions.IsNotNullOrEmpty(sharedExpression.ColumnExpression)
    );
  }
}

function mapStateToProps(
  state: AdaptableState,
  ownProps: any
): Partial<SharedExpressionSummaryProps> {
  return {
    SharedExpressions: state.SharedExpression.SharedExpressions,
    SharedExpressionErrorMessage: state.System.SharedExpressionErrorMessage,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<SharedExpressionSummaryProps> {
  return {
    onEdit: (sharedExpression: SharedExpression) =>
      dispatch(SharedExpressionRedux.SharedExpressionEdit(sharedExpression)),
    IsExpressionValid: (expression: string) =>
      dispatch(SystemRedux.SharedExpressionIsExpressionValid(expression)),
  };
}

export let SharedExpressionSummary = connect(
  mapStateToProps,
  mapDispatchToProps
)(SharedExpressionSummaryComponent);
