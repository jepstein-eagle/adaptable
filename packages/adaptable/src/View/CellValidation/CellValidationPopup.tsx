import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';

import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as CellValidationRedux from '../../Redux/ActionsReducers/CellValidationRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import * as SharedQueryRedux from '../../Redux/ActionsReducers/SharedQueryRedux';
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
  EditableExpressionConfigEntityState,
} from '../Components/SharedProps/EditableConfigEntityState';
import { IColItem } from '../UIInterfaces';
import { UIHelper } from '../UIHelper';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { CellValidationRule } from '../../PredefinedConfig/CellValidationState';
import SimpleButton from '../../components/SimpleButton';
import { Flex } from 'rebass';
import EmptyContent from '../../components/EmptyContent';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';
import { EMPTY_STRING } from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../PredefinedConfig/Uuid';
import { SharedQuery } from '../../PredefinedConfig/SharedQueryState';

interface CellValidationPopupProps extends StrategyViewPopupProps<CellValidationPopupComponent> {
  CellValidations: CellValidationRule[];
  onAddCellValidation: (
    cellValidationRule: CellValidationRule
  ) => CellValidationRedux.CellValidationAddAction;
  onEditCellValidation: (
    cellValidationRule: CellValidationRule
  ) => CellValidationRedux.CellValidationEditAction;
  onShare: (
    entity: AdaptableObject,
    description: string
  ) => TeamSharingRedux.TeamSharingShareAction;
  onAddSharedQuery: (sharedQuery: SharedQuery) => SharedQueryRedux.SharedQueryAddAction;
}

class CellValidationPopupComponent extends React.Component<
  CellValidationPopupProps,
  EditableExpressionConfigEntityState
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
            EditedAdaptableObject: cellValitdation,
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
      let column = this.props.Api.columnApi.getColumnFromId(cellValidationRule.ColumnId);
      return (
        <CellValidationEntityRow
          key={index}
          colItems={colItems}
          api={this.props.Api}
          AdaptableObject={cellValidationRule}
          Column={column}
          onEdit={() => this.onEdit(cellValidationRule)}
          onShare={description => this.props.onShare(cellValidationRule, description)}
          TeamSharingActivated={this.props.TeamSharingActivated}
          onDeleteConfirm={CellValidationRedux.CellValidationDelete(cellValidationRule)}
          onChangeActionMode={(x, actionMode) => this.onActionModeChanged(x, actionMode)}
          AccessLevel={this.props.AccessLevel}
          ValidationService={this.props.Api.internalApi.getValidationService()}
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
        headerText={StrategyConstants.CellValidationStrategyFriendlyName}
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

        {this.state.EditedAdaptableObject != null && (
          <CellValidationWizard
            EditedAdaptableObject={this.state.EditedAdaptableObject as CellValidationRule}
            ConfigEntities={null}
            Api={this.props.Api}
            ModalContainer={this.props.ModalContainer}
            onSetNewSharedQueryName={(newSharedQueryName: string) =>
              this.setState({
                NewSharedQueryName: newSharedQueryName,
              })
            }
            onSetUseSharedQuery={(useSharedQuery: boolean) =>
              this.setState({
                UseSharedQuery: useSharedQuery,
              })
            }
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
      EditedAdaptableObject: ObjectFactory.CreateEmptyCellValidation(),
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.New,
    });
  }

  onEdit(CellValidation: CellValidationRule) {
    this.setState({
      EditedAdaptableObject: Helper.cloneObject(CellValidation),
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
    this.resetState();

    if (this.shouldClosePopupOnFinishWizard) {
      this.props.onClosePopup();
    }
  }

  onFinishWizard() {
    let cellValidationRule: CellValidationRule = Helper.cloneObject(
      this.state.EditedAdaptableObject
    );

    if (StringExtensions.IsNotNullOrEmpty(this.state.NewSharedQueryName)) {
      const SharedQueryId = createUuid();
      this.props.onAddSharedQuery({
        Uuid: SharedQueryId,
        Name: this.state.NewSharedQueryName,
        Expression: cellValidationRule.Expression,
      });
      cellValidationRule.Expression = undefined;
      cellValidationRule.SharedQueryId = SharedQueryId;
    }

    if (this.state.WizardStatus == WizardStatus.New) {
      this.props.onAddCellValidation(cellValidationRule);
    } else {
      this.props.onEditCellValidation(cellValidationRule);
    }
    this.resetState();
  }

  canFinishWizard() {
    let cellValidationRule = this.state.EditedAdaptableObject as CellValidationRule;

    if (StringExtensions.IsNullOrEmpty(cellValidationRule.ColumnId)) {
      return false;
    }
    // need to do some validation around the Expression / Shared Query but leave for now

    return true;
  }

  resetState() {
    this.setState({
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
      NewSharedQueryName: EMPTY_STRING,
      UseSharedQuery: false,
    });
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any): Partial<CellValidationPopupProps> {
  return {
    CellValidations: state.CellValidation.CellValidations,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<CellValidationPopupProps> {
  return {
    onAddCellValidation: (cellValidationRule: CellValidationRule) =>
      dispatch(CellValidationRedux.CellValidationAdd(cellValidationRule)),
    onEditCellValidation: (cellValidationRule: CellValidationRule) =>
      dispatch(CellValidationRedux.CellValidationEdit(cellValidationRule)),
    onAddSharedQuery: (sharedQuery: SharedQuery) =>
      dispatch(SharedQueryRedux.SharedQueryAdd(sharedQuery)),
    onShare: (entity: AdaptableObject, description: string) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(
          entity,
          StrategyConstants.CellValidationStrategyId,
          description
        )
      ),
  };
}

export let CellValidationPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(CellValidationPopupComponent);
