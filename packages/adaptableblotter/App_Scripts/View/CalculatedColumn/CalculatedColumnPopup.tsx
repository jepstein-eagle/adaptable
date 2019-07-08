import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { HelpBlock } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
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
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { CalculatedColumn } from '../../PredefinedConfig/RunTimeState/CalculatedColumnState';
import { AdaptableBlotterObject } from '../../PredefinedConfig/AdaptableBlotterObject';
import EmptyContent from '../../components/EmptyContent';
import { Flex } from 'rebass';

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
  onShare: (entity: AdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
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
    if (StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
      let arrayParams = this.props.PopupParams.split('|');
      // only editing is possible - you cannot create a new calc column from the column menu
      if (arrayParams.length == 2 && arrayParams[0] == 'Edit') {
        let calculatedColumn = this.props.CalculatedColumns.find(x => x.ColumnId == arrayParams[1]);
        this.onEdit(calculatedColumn);
      }
    }
  }

  render() {
    let cssClassName: string = this.props.cssClassName + '__calculatedcolumn';
    let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + '__calculatedcolumn';

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
            cssClassName={cssClassName}
            colItems={colItems}
            Columns={this.props.Columns}
            onShare={() => this.props.onShare(calculatedColumn)}
            TeamSharingActivated={this.props.TeamSharingActivated}
            AdaptableBlotterObject={calculatedColumn}
            key={calculatedColumn.ColumnId}
            onEdit={calculatedColumn => this.onEdit(calculatedColumn as CalculatedColumn)}
            onDeleteConfirm={CalculatedColumnRedux.CalculatedColumnDelete(calculatedColumn)}
          />
        );
      }
    );

    let newButton = (
      <ButtonNew
        onClick={() => {
          this.onNew();
        }}
        cssClassName={cssClassName}
        overrideTooltip="Create Calculated Column"
        DisplayMode="Glyph+Text"
        size={'small'}
        AccessLevel={this.props.AccessLevel}
      />
    );

    return (
      <Flex className={cssClassName} flex={1} flexDirection="column">
        <PanelWithButton
          cssClassName={cssClassName}
          headerText={StrategyConstants.CalculatedColumnStrategyName}
          className="ab_main_popup"
          infoBody={infoBody}
          button={newButton}
          bsStyle="primary"
          border="none"
          bodyProps={{ padding: 0 }}
          glyphicon={StrategyConstants.CalculatedColumnGlyph}
        >
          {this.props.CalculatedColumns.length > 0 ? (
            <AdaptableObjectCollection
              cssClassName={cssClassName}
              colItems={colItems}
              items={calculatedColumns}
            />
          ) : (
            <EmptyContent>Click 'New' to create a new Calculated Column.</EmptyContent>
          )}

          {/* we dont pass in directly the value GetErrorMessage as the steps are cloned in the wizzard. */}
          {this.state.EditedAdaptableBlotterObject && (
            <CalculatedColumnWizard
              cssClassName={cssWizardClassName}
              EditedAdaptableBlotterObject={
                this.state.EditedAdaptableBlotterObject as CalculatedColumn
              }
              ConfigEntities={this.props.CalculatedColumns}
              Columns={this.props.Columns}
              ModalContainer={this.props.ModalContainer}
              UserFilters={this.props.UserFilters}
              SystemFilters={this.props.SystemFilters}
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
      </Flex>
    );
  }

  onNew() {
    this.setState({
      EditedAdaptableBlotterObject: ObjectFactory.CreateEmptyCalculatedColumn(),
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.New,
    });
  }

  onEdit(calculatedColumn: CalculatedColumn) {
    let clonedObject = Helper.cloneObject(calculatedColumn);
    this.setState({
      EditedAdaptableBlotterObject: clonedObject,
      WizardStartIndex: 1,
      WizardStatus: WizardStatus.Edit,
    });
  }

  onCloseWizard() {
    this.props.onClearPopupParams();
    this.setState({
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
    this.props.IsExpressionValid('');
  }

  onFinishWizard() {
    let calculatedColumn: CalculatedColumn = Helper.cloneObject(
      this.state.EditedAdaptableBlotterObject
    );
    if (this.state.WizardStatus == WizardStatus.Edit) {
      this.props.onEditCalculatedColumn(calculatedColumn);
    } else {
      this.props.onAddCalculatedColumn(calculatedColumn);
    }
    this.setState({
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard() {
    let calculatedColumn = this.state.EditedAdaptableBlotterObject as CalculatedColumn;
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

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onAddCalculatedColumn: (calculatedColumn: CalculatedColumn) =>
      dispatch(CalculatedColumnRedux.CalculatedColumnAdd(calculatedColumn)),
    onEditCalculatedColumn: (calculatedColumn: CalculatedColumn) =>
      dispatch(CalculatedColumnRedux.CalculatedColumnEdit(calculatedColumn)),
    IsExpressionValid: (expression: string) =>
      dispatch(SystemRedux.CalculatedColumnIsExpressionValid(expression)),
    onShare: (entity: AdaptableBlotterObject) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.CalculatedColumnStrategyId)
      ),
  };
}

export let CalculatedColumnPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(CalculatedColumnPopupComponent);
