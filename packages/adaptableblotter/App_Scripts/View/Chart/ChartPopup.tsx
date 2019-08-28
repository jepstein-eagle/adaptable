import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
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

import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import {
  EditableConfigEntityState,
  WizardStatus,
} from '../Components/SharedProps/EditableConfigEntityState';
import { IColItem } from '../UIInterfaces';
import { UIHelper } from '../UIHelper';
import { AdaptableBlotterObject } from '../../PredefinedConfig/AdaptableBlotterObject';
import { ChartDefinition } from '../../PredefinedConfig/RunTimeState/ChartState';
import { ChartVisibility, ChartType } from '../../PredefinedConfig/Common/ChartEnums';
import { CategoryChartWizard } from './CategoryChart/Wizard/CategoryChartWizard';
import { PieChartWizard } from './PieChart/Wizard/PieChartWizard';
import { SparklinesChartWizard } from './SparklinesChart/Wizard/SparklinesChartWizard';
import { AccessLevel } from '../../PredefinedConfig/Common/Enums';
import HelpBlock from '../../components/HelpBlock';
import EmptyContent from '../../components/EmptyContent';
import DropdownButton from '../../components/DropdownButton';
import PlusIcon from '../../components/icons/plus';

interface ChartPopupProps extends StrategyViewPopupProps<ChartPopupComponent> {
  onAddChartDefinition: (chartDefinition: ChartDefinition) => ChartRedux.ChartDefinitionAddAction;
  onEditChartDefinition: (chartDefinition: ChartDefinition) => ChartRedux.ChartDefinitionEditAction;
  onSelectChartDefinition: (chartDefinition: string) => ChartRedux.ChartDefinitionSelectAction;
  onShowChart: () => SystemRedux.ChartSetChartVisibiityAction;
  ChartDefinitions: Array<ChartDefinition>;
  CurrentChartDefinition: ChartDefinition;
  onShare: (entity: AdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
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
    let infoBody: any[] = ['Create Charts to view your grid data visually.'];

    let colItems: IColItem[] = [
      { Content: 'Name', Size: 3 },
      { Content: 'Description', Size: 3 },
      { Content: 'Type', Size: 3 },
      { Content: 'Show', Size: 1 },
      { Content: '', Size: 2 },
    ];

    let Charts = this.props.ChartDefinitions.map((Chart: ChartDefinition, index) => {
      return (
        <ChartEntityRow
          colItems={colItems}
          AdaptableBlotterObject={Chart}
          key={Chart.Name}
          onEdit={() => this.onEdit(Chart as ChartDefinition)}
          TeamSharingActivated={this.props.TeamSharingActivated}
          onShare={() => this.props.onShare(Chart)}
          onDeleteConfirm={ChartRedux.ChartDefinitionDelete(Chart)}
          onShowChart={chartName => this.onShowChart(chartName)}
          AccessLevel={this.props.AccessLevel}
        />
      );
    });

    let categoryChartMenuItem = {
      disabled: this.props.AccessLevel == AccessLevel.ReadOnly,
      onClick: () => this.onNew(ChartType.CategoryChart),
      label: 'Category Chart',
    };
    let pieChartMenuItem = {
      disabled: this.props.AccessLevel == AccessLevel.ReadOnly,
      onClick: () => this.onNew(ChartType.PieChart),
      label: 'Pie Chart',
    };

    let sparklinesChartMenuItem = {
      disabled: this.props.AccessLevel == AccessLevel.ReadOnly,
      onClick: () => this.onNew(ChartType.SparklinesChart),
      label: 'Sparklines Chart',
    };

    // we need to make this a button type...

    let dropdownButton = (
      <DropdownButton
        tooltip="Create New Chart Definition"
        variant="raised"
        tone="accent"
        columns={['label']}
        items={[categoryChartMenuItem, pieChartMenuItem, sparklinesChartMenuItem]}
        style={{ zIndex: 100 }}
      >
        <PlusIcon /> New
      </DropdownButton>
    );

    let editedChartDefinition = this.state.EditedAdaptableBlotterObject as ChartDefinition;

    return (
      <PanelWithButton
        headerText={StrategyConstants.ChartStrategyName}
        infoBody={infoBody}
        button={dropdownButton}
        bodyProps={{ padding: 0 }}
        bodyScroll
        glyphicon={StrategyConstants.ChartGlyph}
      >
        {Charts.length > 0 ? (
          <AdaptableObjectCollection colItems={colItems} items={Charts} />
        ) : (
          <EmptyContent>
            <p>Click 'New' to create a new Chart.</p>

            <p>Choose between Category, Pie or Sparklines Chart.</p>
          </EmptyContent>
        )}

        {this.state.EditedAdaptableBlotterObject && (
          <div>
            {editedChartDefinition.ChartType == ChartType.CategoryChart ? (
              <CategoryChartWizard
                EditedAdaptableBlotterObject={editedChartDefinition}
                ConfigEntities={this.props.ChartDefinitions}
                ModalContainer={this.props.ModalContainer}
                Columns={this.props.Columns}
                UserFilters={this.props.UserFilters}
                SystemFilters={this.props.SystemFilters}
                NamedFilters={this.props.NamedFilters}
                ColumnCategories={this.props.ColumnCategories}
                Blotter={this.props.Blotter}
                WizardStartIndex={this.state.WizardStartIndex}
                onCloseWizard={() => this.onCloseWizard()}
                onFinishWizard={() => this.onFinishWizard()}
                canFinishWizard={() => this.canFinishWizard()}
              />
            ) : null}
            {editedChartDefinition.ChartType === ChartType.PieChart ? (
              <PieChartWizard
                EditedAdaptableBlotterObject={editedChartDefinition}
                ConfigEntities={this.props.ChartDefinitions}
                ModalContainer={this.props.ModalContainer}
                Columns={this.props.Columns}
                UserFilters={this.props.UserFilters}
                SystemFilters={this.props.SystemFilters}
                NamedFilters={this.props.NamedFilters}
                ColumnCategories={this.props.ColumnCategories}
                Blotter={this.props.Blotter}
                WizardStartIndex={0}
                onCloseWizard={() => this.onCloseWizard()}
                onFinishWizard={() => this.onFinishWizard()}
                canFinishWizard={() => this.canFinishWizard()}
              />
            ) : null}

            {editedChartDefinition.ChartType === ChartType.SparklinesChart ? (
              <SparklinesChartWizard
                EditedAdaptableBlotterObject={editedChartDefinition}
                ConfigEntities={this.props.ChartDefinitions}
                ModalContainer={this.props.ModalContainer}
                Columns={this.props.Columns}
                UserFilters={this.props.UserFilters}
                SystemFilters={this.props.SystemFilters}
                NamedFilters={this.props.NamedFilters}
                ColumnCategories={this.props.ColumnCategories}
                Blotter={this.props.Blotter}
                WizardStartIndex={0}
                onCloseWizard={() => this.onCloseWizard()}
                onFinishWizard={() => this.onFinishWizard()}
                canFinishWizard={() => this.canFinishWizard()}
              />
            ) : null}
          </div>
        )}
      </PanelWithButton>
    );
  }

  onShowChart(chartName: string) {
    this.props.onSelectChartDefinition(chartName);
    this.props.onShowChart();
  }

  onEdit(Chart: ChartDefinition) {
    //so we dont mutate original object
    this.setState({
      EditedAdaptableBlotterObject: Helper.cloneObject(Chart),
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.Edit,
    });
  }

  onNew(chartType: ChartType) {
    let emptyChartDefinition: ChartDefinition;

    switch (chartType) {
      case ChartType.CategoryChart: {
        emptyChartDefinition = ObjectFactory.CreateEmptyCategoryChartDefinition();
        break;
      }
      case ChartType.PieChart: {
        emptyChartDefinition = ObjectFactory.CreateEmptyPieChartDefinition();
        break;
      }
      case ChartType.SparklinesChart: {
        emptyChartDefinition = ObjectFactory.CreateEmptySparklinesChartDefinition();
      }
    }
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
    let clonedObject: ChartDefinition = Helper.cloneObject(this.state.EditedAdaptableBlotterObject);
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
    let Chart = this.state.EditedAdaptableBlotterObject as ChartDefinition;
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

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableBlotterState>>) {
  return {
    onAddChartDefinition: (chartDefinition: ChartDefinition) =>
      dispatch(ChartRedux.ChartDefinitionAdd(chartDefinition)),
    onEditChartDefinition: (chartDefinition: ChartDefinition) =>
      dispatch(ChartRedux.ChartDefinitionEdit(chartDefinition)),
    onSelectChartDefinition: (chartDefinition: string) =>
      dispatch(ChartRedux.ChartDefinitionSelect(chartDefinition)),
    onShowChart: () => dispatch(SystemRedux.ChartSetChartVisibility(ChartVisibility.Maximised)),
    onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam()),
    onShare: (entity: AdaptableBlotterObject) =>
      dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ChartStrategyId)),
  };
}

export let ChartPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartPopupComponent);
