import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';

import { AdaptableBlotterState } from '../../PredefinedConfig/AdaptableBlotterState';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { AdaptableBlotterColumn } from '../../PredefinedConfig/Common/AdaptableBlotterColumn';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as CellValidationRedux from '../../Redux/ActionsReducers/CellValidationRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { Helper } from '../../Utilities/Helpers/Helper';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { CellValidationWizard } from './Wizard/CellValidationWizard';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { CellValidationEntityRow } from './CellValidationEntityRow';
import {
  EditableConfigEntityState,
  WizardStatus,
} from '../Components/SharedProps/EditableConfigEntityState';
import { IColItem } from '../UIInterfaces';
import { UIHelper } from '../UIHelper';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { AdaptableBlotterObject } from '../../PredefinedConfig/Common/AdaptableBlotterObject';
import { CellValidationRule } from '../../PredefinedConfig/CellValidationState';
import SimpleButton from '../../components/SimpleButton';
import { Flex } from 'rebass';
import EmptyContent from '../../components/EmptyContent';

interface CellValidationPopupProps extends StrategyViewPopupProps<CellValidationPopupComponent> {
  CellValidations: CellValidationRule[];
  onAddCellValidation: (
    cellValidationRule: CellValidationRule
  ) => CellValidationRedux.CellValidationAddAction;
  onEditCellValidation: (
    cellValidationRule: CellValidationRule
  ) => CellValidationRedux.CellValidationEditAction;
  onShare: (entity: AdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}

class CellValidationPopupComponent extends React.Component<
  CellValidationPopupProps,
  EditableConfigEntityState
> {
  constructor(props: CellValidationPopupProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }
  shouldClosePopupOnFinishWizard: boolean = false;
  componentDidMount() {
    if (this.props.PopupParams) {
      if (this.props.PopupParams.action && this.props.PopupParams.columnId) {
        if (this.props.PopupParams.action == 'New') {
          let cellValitdation = ObjectFactory.CreateEmptyCellValidation();
          cellValitdation.ColumnId = this.props.PopupParams.columnId;
          this.setState({
            EditedAdaptableBlotterObject: cellValitdation,
            WizardStartIndex: 1,
            WizardStatus: WizardStatus.New,
          });
        }
      }
      this.shouldClosePopupOnFinishWizard =
        this.props.PopupParams.source && this.props.PopupParams.source == 'ColumnMenu';
    }
  }
  render() {
    let infoBody: any[] = [
      'Cell Validation Rules determine whether an edit is valid.',
      <br />,
      <br />,
      'Rules can disallow all edits for a specified column, or only those that fail to meet specified criteria.',
      <br />,
      <br />,
      'When a rule is broken, you can choose whether to prevent the edit outright, or allow it after a warning is displayed.',
    ];

    let colItems: IColItem[] = [
      { Content: 'Validation Rule', Size: 4 },
      { Content: 'Expression', Size: 4 },
      { Content: 'Action', Size: 2 },
      { Content: '', Size: 2 },
    ];

    let CellValidationItems = this.props.CellValidations.map((cellValidationRule, index) => {
      let column = ColumnHelper.getColumnFromId(cellValidationRule.ColumnId, this.props.Columns);
      return (
        <CellValidationEntityRow
          key={index}
          colItems={colItems}
          AdaptableBlotterObject={cellValidationRule}
          Column={column}
          Columns={this.props.Columns}
          UserFilters={this.props.UserFilters}
          onEdit={() => this.onEdit(cellValidationRule)}
          onShare={() => this.props.onShare(cellValidationRule)}
          TeamSharingActivated={this.props.TeamSharingActivated}
          onDeleteConfirm={CellValidationRedux.CellValidationDelete(cellValidationRule)}
          onChangeActionMode={(x, actionMode) => this.onActionModeChanged(x, actionMode)}
          AccessLevel={this.props.AccessLevel}
          ValidationService={this.props.Blotter.ValidationService}
        />
      );
    });
    let newButton = (
      <SimpleButton
        onClick={() => this.onNew()}
        tone="accent"
        tooltip="Create Cell Validation Rule"
        icon="plus"
        variant="raised"
        AccessLevel={this.props.AccessLevel}
      >
        NEW
      </SimpleButton>
    );

    return (
      <PanelWithButton
        headerText={StrategyConstants.CellValidationStrategyName}
        button={newButton}
        glyphicon={StrategyConstants.CellValidationGlyph}
        infoBody={infoBody}
        bodyProps={{ padding: 0 }}
      >
        {CellValidationItems.length > 0 ? (
          <AdaptableObjectCollection colItems={colItems} items={CellValidationItems} />
        ) : (
          <EmptyContent>
            <p>Click 'New' to start creating rules for valid cell edits.</p>
            <p>
              Edits that fail validation can be either prevented altogether or allowed (after
              over-riding a warning and providing a reason).
            </p>
          </EmptyContent>
        )}

        {this.state.EditedAdaptableBlotterObject != null && (
          <CellValidationWizard
            EditedAdaptableBlotterObject={
              this.state.EditedAdaptableBlotterObject as CellValidationRule
            }
            ConfigEntities={null}
            Blotter={this.props.Blotter}
            ModalContainer={this.props.ModalContainer}
            Columns={this.props.Columns}
            UserFilters={this.props.UserFilters}
            SystemFilters={this.props.SystemFilters}
            NamedFilters={this.props.NamedFilters}
            ColumnCategories={this.props.ColumnCategories}
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
      EditedAdaptableBlotterObject: ObjectFactory.CreateEmptyCellValidation(),
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.New,
    });
  }

  onEdit(CellValidation: CellValidationRule) {
    this.setState({
      EditedAdaptableBlotterObject: Helper.cloneObject(CellValidation),
      WizardStartIndex: 1,
      WizardStatus: WizardStatus.Edit,
    });
  }

  onActionModeChanged(cellValidationRule: CellValidationRule, actionMode: any) {
    cellValidationRule.ActionMode = actionMode;
    this.props.onEditCellValidation(cellValidationRule);
  }

  onCloseWizard() {
    this.props.onClearPopupParams();
    this.setState({
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });

    if (this.shouldClosePopupOnFinishWizard) {
      this.props.onClosePopup();
    }
  }

  onFinishWizard() {
    let cellValidationRule: CellValidationRule = Helper.cloneObject(
      this.state.EditedAdaptableBlotterObject
    );

    if (this.state.WizardStatus == WizardStatus.New) {
      this.props.onAddCellValidation(cellValidationRule);
    } else {
      this.props.onEditCellValidation(cellValidationRule);
    }
    this.setState({
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 5,
      WizardStatus: WizardStatus.None,
    });
    this.shouldClosePopupOnFinishWizard = false;
  }

  canFinishWizard() {
    let cellValidationRule = this.state.EditedAdaptableBlotterObject as CellValidationRule;
    return (
      StringExtensions.IsNotNullOrEmpty(cellValidationRule.ColumnId) &&
      ExpressionHelper.IsNullOrEmptyOrValidExpression(cellValidationRule.Expression) &&
      StringExtensions.IsNotNullOrEmpty(
        this.props.Blotter.ValidationService.createCellValidationDescription(
          cellValidationRule,
          this.props.Columns
        )
      )
    );
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    CellValidations: state.CellValidation.CellValidations,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableBlotterState>>) {
  return {
    onAddCellValidation: (cellValidationRule: CellValidationRule) =>
      dispatch(CellValidationRedux.CellValidationAdd(cellValidationRule)),
    onEditCellValidation: (cellValidationRule: CellValidationRule) =>
      dispatch(CellValidationRedux.CellValidationEdit(cellValidationRule)),
    onShare: (entity: AdaptableBlotterObject) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.CellValidationStrategyId)
      ),
  };
}

export let CellValidationPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(CellValidationPopupComponent);
