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
  onShare: (
    entity: AdaptableObject,
    description: string
  ) => TeamSharingRedux.TeamSharingShareAction;
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
    if (this.props.popupParams) {
      if (this.props.popupParams.action && this.props.popupParams.column) {
        if (this.props.popupParams.action == 'Edit') {
          // only editing is possible - you cannot create a new calc column from the column menu
          let calculatedColumn = this.props.CalculatedColumns.find(
            x => x.ColumnId == this.props.popupParams.column.ColumnId
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
      { Content: 'Column Id', Size: 3 },
      { Content: 'Column Name', Size: 3 },
      { Content: 'Column Expression', Size: 7 },
      { Content: '', Size: 2 },
    ];

    let propCalculatedColumns = ArrayExtensions.sortArrayWithProperty(
      SortOrder.Asc,
      this.props.CalculatedColumns,
      'ColumnId'
    );
    let calculatedColumns = propCalculatedColumns.map(
      (calculatedColumn: CalculatedColumn, index) => {
        // let index = this.props.CalculatedColumns.indexOf(calculatedColumn)

        return (
          <CalculatedColumnEntityRow
            colItems={colItems}
            api={this.props.api}
            onShare={description => this.props.onShare(calculatedColumn, description)}
            teamSharingActivated={this.props.teamSharingActivated}
            adaptableObject={calculatedColumn}
            key={calculatedColumn.ColumnId}
            onEdit={calculatedColumn => this.onEdit(calculatedColumn as CalculatedColumn)}
            onDeleteConfirm={CalculatedColumnRedux.CalculatedColumnDelete(calculatedColumn)}
            accessLevel={this.props.accessLevel}
          />
        );
      }
    );

    let newButton = (
      <ButtonNew
        onClick={() => {
          this.onNew();
        }}
        style={{
          color: 'var(--ab-color-text-on-add)',
          fill: 'var(--ab-color-text-on-add',
          background: 'var(--ab-color-action-add)',
        }}
        tooltip="Create Calculated Column"
        accessLevel={this.props.accessLevel}
      />
    );

    return (
      <PanelWithButton
        headerText={StrategyConstants.CalculatedColumnStrategyFriendlyName}
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
        {this.state.editedAdaptableObject && (
          <CalculatedColumnWizard
            editedAdaptableObject={this.state.editedAdaptableObject as CalculatedColumn}
            configEntities={this.props.CalculatedColumns}
            modalContainer={this.props.modalContainer}
            GetErrorMessage={() => this.props.CalculatedColumnErrorMessage}
            IsExpressionValid={expression => this.props.IsExpressionValid(expression)}
            api={this.props.api}
            wizardStartIndex={this.state.wizardStartIndex}
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
      editedAdaptableObject: ObjectFactory.CreateEmptyCalculatedColumn(),
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.New,
    });
  }

  onEdit(calculatedColumn: CalculatedColumn) {
    let clonedObject = Helper.cloneObject(calculatedColumn);
    this.setState({
      editedAdaptableObject: clonedObject,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.Edit,
    });
  }

  onCloseWizard() {
    this.props.onClearPopupParams();
    this.setState({
      editedAdaptableObject: null,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.None,
    });
    this.props.IsExpressionValid('');
  }

  onFinishWizard() {
    let calculatedColumn: CalculatedColumn = Helper.cloneObject(this.state.editedAdaptableObject);
    if (this.state.wizardStatus == WizardStatus.Edit) {
      this.props.onEditCalculatedColumn(calculatedColumn);
    } else {
      this.props.onAddCalculatedColumn(calculatedColumn);
    }
    this.setState({
      editedAdaptableObject: null,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard() {
    let calculatedColumn = this.state.editedAdaptableObject as CalculatedColumn;
    return (
      StringExtensions.IsNotNullOrEmpty(calculatedColumn.ColumnId) &&
      StringExtensions.IsNotNullOrEmpty(calculatedColumn.ColumnExpression)
    );
  }
}

function mapStateToProps(
  state: AdaptableState,
  ownProps: any
): Partial<CalculatedColumnPopupProps> {
  return {
    CalculatedColumns: state.CalculatedColumn.CalculatedColumns,
    CalculatedColumnErrorMessage: state.System.CalculatedColumnErrorMessage,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<CalculatedColumnPopupProps> {
  return {
    onAddCalculatedColumn: (calculatedColumn: CalculatedColumn) =>
      dispatch(CalculatedColumnRedux.CalculatedColumnAdd(calculatedColumn)),
    onEditCalculatedColumn: (calculatedColumn: CalculatedColumn) =>
      dispatch(CalculatedColumnRedux.CalculatedColumnEdit(calculatedColumn)),
    IsExpressionValid: (expression: string) =>
      dispatch(SystemRedux.CalculatedColumnIsExpressionValid(expression)),
    onShare: (entity: AdaptableObject, description: string) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(
          entity,
          StrategyConstants.CalculatedColumnStrategyId,
          description
        )
      ),
  };
}

export let CalculatedColumnPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(CalculatedColumnPopupComponent);
