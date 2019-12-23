import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';

import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as CalculatedColumnRedux from '../../Redux/ActionsReducers/CalculatedColumnRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { Helper } from '../../Utilities/Helpers/Helper';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { CalculatedColumnWizard } from './Wizard/CalculatedColumnWizard';
import { SortOrder } from '../../PredefinedConfig/Common/Enums';
import { CalculatedColumnEntityRow } from './CalculatedColumnEntityRow';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import {
  EditableConfigEntityState,
  WizardStatus,
} from '../Components/SharedProps/EditableConfigEntityState';
import { IColItem } from '../UIInterfaces';
import { UIHelper } from '../UIHelper';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { CalculatedColumn } from '../../PredefinedConfig/CalculatedColumnState';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import EmptyContent from '../../components/EmptyContent';
import { Flex } from 'rebass';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';

interface CalculatedColumnPopupProps
  extends StrategyViewPopupProps<CalculatedColumnPopupComponent> {
  onAddCalculatedColumn: (
    calculatedColumn: CalculatedColumn
  ) => CalculatedColumnRedux.CalculatedColumnAddAction;
  onEditCalculatedColumn: (
    calculatedColumn: CalculatedColumn
  ) => CalculatedColumnRedux.CalculatedColumnEditAction;
  CalculatedColumns: Array<CalculatedColumn>;
  CalculatedColumnErrorMessage: string;
  IsExpressionValid: (expression: string) => SystemRedux.CalculatedColumnIsExpressionValidAction;
  onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}

class CalculatedColumnPopupComponent extends React.Component<
  CalculatedColumnPopupProps,
  EditableConfigEntityState
> {
  constructor(props: CalculatedColumnPopupProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }

  componentDidMount() {
    if (this.props.PopupParams) {
      if (this.props.PopupParams.action && this.props.PopupParams.columnId) {
        if (this.props.PopupParams.action == 'Edit') {
          // only editing is possible - you cannot create a new calc column from the column menu
          let calculatedColumn = this.props.CalculatedColumns.find(
            x => x.ColumnId == this.props.PopupParams.columnId
          );
          this.onEdit(calculatedColumn);
        }
      }
    }
  }

  render() {
    let infoBody: any[] = [
      'Use Calculated Columns to create your own bespoke columns; the value of the column is an Expression which will update automatically in line with any columns it refers to.',
      <br />,
      <br />,
      'Once created, Calculated Columns are treated like any other column in the Grid.',
    ];

    let colItems: IColItem[] = [
      { Content: 'Column Name', Size: 3 },
      { Content: 'Column Expression', Size: 7 },
      { Content: '', Size: 2 },
    ];

    let propCalculatedColumns = ArrayExtensions.sortArrayWithProperty(
      SortOrder.Ascending,
      this.props.CalculatedColumns,
      'ColumnId'
    );
    let calculatedColumns = propCalculatedColumns.map(
      (calculatedColumn: CalculatedColumn, index) => {
        // let index = this.props.CalculatedColumns.indexOf(calculatedColumn)

        return (
          <CalculatedColumnEntityRow
            colItems={colItems}
            Columns={this.props.Columns}
            onShare={() => this.props.onShare(calculatedColumn)}
            TeamSharingActivated={this.props.TeamSharingActivated}
            AdaptableObject={calculatedColumn}
            key={calculatedColumn.ColumnId}
            onEdit={calculatedColumn => this.onEdit(calculatedColumn as CalculatedColumn)}
            onDeleteConfirm={CalculatedColumnRedux.CalculatedColumnDelete(calculatedColumn)}
            AccessLevel={this.props.AccessLevel}
            CalculatedColumnExpressionService={this.props.Blotter.CalculatedColumnExpressionService}
          />
        );
      }
    );

    let newButton = (
      <ButtonNew
        onClick={() => {
          this.onNew();
        }}
        tooltip="Create Calculated Column"
        AccessLevel={this.props.AccessLevel}
      />
    );

    return (
      <PanelWithButton
        headerText={StrategyConstants.CalculatedColumnStrategyName}
        className="ab_main_popup"
        infoBody={infoBody}
        button={newButton}
        border="none"
        bodyProps={{ padding: 0 }}
        glyphicon={StrategyConstants.CalculatedColumnGlyph}
      >
        {this.props.CalculatedColumns.length > 0 ? (
          <AdaptableObjectCollection colItems={colItems} items={calculatedColumns} />
        ) : (
          <EmptyContent>Click 'New' to create a new Calculated Column.</EmptyContent>
        )}

        {/* we dont pass in directly the value GetErrorMessage as the steps are cloned in the wizzard. */}
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
      </PanelWithButton>
    );
  }

  onNew() {
    this.setState({
      EditedAdaptableObject: ObjectFactory.CreateEmptyCalculatedColumn(),
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.New,
    });
  }

  onEdit(calculatedColumn: CalculatedColumn) {
    let clonedObject = Helper.cloneObject(calculatedColumn);
    this.setState({
      EditedAdaptableObject: clonedObject,
      WizardStartIndex: 1,
      WizardStatus: WizardStatus.Edit,
    });
  }

  onCloseWizard() {
    this.props.onClearPopupParams();
    this.setState({
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
    this.props.IsExpressionValid('');
  }

  onFinishWizard() {
    let calculatedColumn: CalculatedColumn = Helper.cloneObject(this.state.EditedAdaptableObject);
    if (this.state.WizardStatus == WizardStatus.Edit) {
      this.props.onEditCalculatedColumn(calculatedColumn);
    } else {
      this.props.onAddCalculatedColumn(calculatedColumn);
    }
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

function mapStateToProps(state: AdaptableState, ownProps: any) {
  return {
    CalculatedColumns: state.CalculatedColumn.CalculatedColumns,
    CalculatedColumnErrorMessage: state.System.CalculatedColumnErrorMessage,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {
    onAddCalculatedColumn: (calculatedColumn: CalculatedColumn) =>
      dispatch(CalculatedColumnRedux.CalculatedColumnAdd(calculatedColumn)),
    onEditCalculatedColumn: (calculatedColumn: CalculatedColumn) =>
      dispatch(CalculatedColumnRedux.CalculatedColumnEdit(calculatedColumn)),
    IsExpressionValid: (expression: string) =>
      dispatch(SystemRedux.CalculatedColumnIsExpressionValid(expression)),
    onShare: (entity: AdaptableObject) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.CalculatedColumnStrategyId)
      ),
  };
}

export let CalculatedColumnPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(CalculatedColumnPopupComponent);
