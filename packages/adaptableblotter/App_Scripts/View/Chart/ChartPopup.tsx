import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import {
  HelpBlock,
  DropdownButton,
  OverlayTrigger,
  Tooltip,
  Glyphicon,
  MenuItem,
} from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import * as ChartRedux from '../../Redux/ActionsReducers/ChartRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { Helper } from '../../Utilities/Helpers/Helper';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { ChartEntityRow } from './ChartEntityRow';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import {
  EditableConfigEntityState,
  WizardStatus,
} from '../Components/SharedProps/EditableConfigEntityState';
import { IColItem } from '../UIInterfaces';
import { UIHelper } from '../UIHelper';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { IAdaptableBlotterObject } from '../../PredefinedConfig/IAdaptableBlotterObject';
import { IChartDefinition } from '../../PredefinedConfig/IUserState Interfaces/ChartState';
import { ChartVisibility, ChartType } from '../../PredefinedConfig/Common Objects/ChartEnums';
import { CategoryChartWizard } from './CategoryChart/Wizard/CategoryChartWizard';
import { PieChartWizard } from './PieChart/Wizard/PieChartWizard';
import { AccessLevel } from '../../PredefinedConfig/Common Objects/Enums';

interface ChartPopupProps extends StrategyViewPopupProps<ChartPopupComponent> {
  onAddChartDefinition: (chartDefinition: IChartDefinition) => ChartRedux.ChartDefinitionAddAction;
  onEditChartDefinition: (
    chartDefinition: IChartDefinition
  ) => ChartRedux.ChartDefinitionEditAction;
  onSelectChartDefinition: (chartDefinition: string) => ChartRedux.ChartDefinitionSelectAction;
  onShowChart: () => SystemRedux.ChartSetChartVisibiityAction;
  ChartDefinitions: Array<IChartDefinition>;
  CurrentChartDefinition: IChartDefinition;
  onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}

class ChartPopupComponent extends React.Component<ChartPopupProps, EditableConfigEntityState> {
  constructor(props: ChartPopupProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }

  componentDidMount() {
    if (StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
      if (StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
        let arrayParams = this.props.PopupParams.split('|');
        let action: string = arrayParams[0].trim();
        let chartType: ChartType = arrayParams[1].trim() as ChartType; // todo: use the enum...

        if (action == 'New') {
          this.onNew(chartType);
        }
        if (this.props.PopupParams == 'Edit') {
          let index: number = this.props.ChartDefinitions.findIndex(
            cd => cd.Name == this.props.CurrentChartDefinition.Name
          );
          this.onEdit(this.props.CurrentChartDefinition);
        }
      }
    }
  }

  render() {
    let cssClassName: string = this.props.cssClassName + '__Chart';
    let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + '__Chart';

    let infoBody: any[] = ['Create Charts to view your grid data visually.'];

    let colItems: IColItem[] = [
      { Content: 'Name', Size: 3 },
      { Content: 'Description', Size: 3 },
      { Content: 'Type', Size: 3 },
      { Content: 'Show', Size: 1 },
      { Content: '', Size: 2 },
    ];

    let Charts = this.props.ChartDefinitions.map((Chart: IChartDefinition, index) => {
      return (
        <ChartEntityRow
          cssClassName={cssClassName}
          colItems={colItems}
          AdaptableBlotterObject={Chart}
          key={Chart.Name}
          onEdit={() => this.onEdit(Chart as IChartDefinition)}
          TeamSharingActivated={this.props.TeamSharingActivated}
          onShare={() => this.props.onShare(Chart)}
          onDeleteConfirm={ChartRedux.ChartDefinitionDelete(Chart)}
          onShowChart={chartName => this.onShowChart(chartName)}
          AccessLevel={this.props.AccessLevel}
        />
      );
    });

    let categoryChartMenuItem = (
      <MenuItem
        disabled={this.props.AccessLevel == AccessLevel.ReadOnly}
        onClick={() => this.onNew(ChartType.CategoryChart)}
        key={'categoryChart'}
      >
        {'Category Chart'}
      </MenuItem>
    );
    let pieChartMenuItem = (
      <MenuItem
        disabled={this.props.AccessLevel == AccessLevel.ReadOnly}
        onClick={() => this.onNew(ChartType.PieChart)}
        key={'pieChart'}
      >
        {'Pie Chart'}
      </MenuItem>
    );

    // we need to make this a button type...
    const plusGlyph: any = (
      <OverlayTrigger
        key={'exportOverlay'}
        overlay={<Tooltip id="tooltipButton"> {'Create New Chart Definition'}</Tooltip>}
      >
        <span>
          <Glyphicon glyph={'plus'} /> {'New'}{' '}
        </span>
      </OverlayTrigger>
    );

    let dropdownButton = (
      <DropdownButton
        style={{ float: 'right', marginRight: '0px' }}
        bsSize={'small'}
        bsStyle={StyleConstants.INFO_BSSTYLE}
        title={plusGlyph}
        id="chartDropdown"
      >
        {categoryChartMenuItem}
        {pieChartMenuItem}
      </DropdownButton>
    );

    let editedChartDefinition = this.state.EditedAdaptableBlotterObject as IChartDefinition;

    return (
      <div className={cssClassName}>
        <PanelWithButton
          cssClassName={cssClassName}
          headerText={StrategyConstants.ChartStrategyName}
          className="ab_main_popup"
          infoBody={infoBody}
          button={dropdownButton}
          bsStyle="primary"
          glyphicon={StrategyConstants.ChartGlyph}
        >
          {Charts.length > 0 ? (
            <AdaptableObjectCollection
              cssClassName={cssClassName}
              colItems={colItems}
              items={Charts}
            />
          ) : (
            <HelpBlock>
              Click 'New' to create a new Chart.
              <br />
              Choose between Category and Pie Chart.
              <br />
            </HelpBlock>
          )}

          {this.state.EditedAdaptableBlotterObject && (
            <div>
              {editedChartDefinition.ChartType == ChartType.CategoryChart ? (
                <CategoryChartWizard
                  cssClassName={cssWizardClassName}
                  EditedAdaptableBlotterObject={editedChartDefinition}
                  ConfigEntities={this.props.ChartDefinitions}
                  ModalContainer={this.props.ModalContainer}
                  Columns={this.props.Columns}
                  UserFilters={this.props.UserFilters}
                  SystemFilters={this.props.SystemFilters}
                  Blotter={this.props.Blotter}
                  WizardStartIndex={this.state.WizardStartIndex}
                  onCloseWizard={() => this.onCloseWizard()}
                  onFinishWizard={() => this.onFinishWizard()}
                  canFinishWizard={() => this.canFinishWizard()}
                />
              ) : (
                <PieChartWizard
                  cssClassName={cssClassName}
                  EditedAdaptableBlotterObject={editedChartDefinition}
                  ConfigEntities={this.props.ChartDefinitions}
                  ModalContainer={this.props.ModalContainer}
                  Columns={this.props.Columns}
                  UserFilters={this.props.UserFilters}
                  SystemFilters={this.props.SystemFilters}
                  Blotter={this.props.Blotter}
                  WizardStartIndex={0}
                  onCloseWizard={() => this.onCloseWizard()}
                  onFinishWizard={() => this.onFinishWizard()}
                  canFinishWizard={() => this.canFinishWizard()}
                />
              )}
            </div>
          )}
        </PanelWithButton>
      </div>
    );
  }

  onShowChart(chartName: string) {
    this.props.onSelectChartDefinition(chartName);
    this.props.onShowChart();
  }

  onEdit(Chart: IChartDefinition) {
    //so we dont mutate original object
    this.setState({
      EditedAdaptableBlotterObject: Helper.cloneObject(Chart),
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.Edit,
    });
  }

  onNew(chartType: ChartType) {
    let emptyChartDefinition: IChartDefinition =
      chartType == ChartType.CategoryChart
        ? ObjectFactory.CreateEmptyCategoryChartDefinition()
        : ObjectFactory.CreateEmptyPieChartDefinition();
    this.setState({
      EditedAdaptableBlotterObject: emptyChartDefinition,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.New,
    });
  }

  onCloseWizard() {
    this.props.onClearPopupParams();
    this.setState({
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  onFinishWizard() {
    let clonedObject: IChartDefinition = Helper.cloneObject(
      this.state.EditedAdaptableBlotterObject
    );
    if (this.state.WizardStatus == WizardStatus.Edit) {
      this.props.onEditChartDefinition(clonedObject);
    } else {
      this.props.onAddChartDefinition(clonedObject);
    }

    let shouldSelectChart: boolean =
      this.state.WizardStatus == WizardStatus.New ||
      this.props.CurrentChartDefinition.Uuid == clonedObject.Uuid;

    this.setState({
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });

    if (shouldSelectChart) {
      // its new so make it the new chart or we are editing the current chart
      this.props.onSelectChartDefinition(clonedObject.Name);
    }
  }

  canFinishWizard() {
    let Chart = this.state.EditedAdaptableBlotterObject as IChartDefinition;
    return StringExtensions.IsNotNullOrEmpty(Chart.Name);
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    ChartDefinitions: state.Chart.ChartDefinitions,
    CurrentChartDefinition: state.Chart.ChartDefinitions.find(
      c => c.Name == state.Chart.CurrentChartName
    ),
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onAddChartDefinition: (chartDefinition: IChartDefinition) =>
      dispatch(ChartRedux.ChartDefinitionAdd(chartDefinition)),
    onEditChartDefinition: (chartDefinition: IChartDefinition) =>
      dispatch(ChartRedux.ChartDefinitionEdit(chartDefinition)),
    onSelectChartDefinition: (chartDefinition: string) =>
      dispatch(ChartRedux.ChartDefinitionSelect(chartDefinition)),
    onShowChart: () => dispatch(SystemRedux.ChartSetChartVisibility(ChartVisibility.Maximised)),
    onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam()),
    onShare: (entity: IAdaptableBlotterObject) =>
      dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ChartStrategyId)),
  };
}

export let ChartPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartPopupComponent);
