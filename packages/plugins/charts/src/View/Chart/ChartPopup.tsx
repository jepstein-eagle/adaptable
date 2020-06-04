import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableState } from '@adaptabletools/adaptable/src/PredefinedConfig/AdaptableState';
import * as ChartRedux from '@adaptabletools/adaptable/src/Redux/ActionsReducers/ChartRedux';
import * as PopupRedux from '@adaptabletools/adaptable/src/Redux/ActionsReducers/PopupRedux';
import * as SystemRedux from '@adaptabletools/adaptable/src/Redux/ActionsReducers/SystemRedux';
import * as TeamSharingRedux from '@adaptabletools/adaptable/src/Redux/ActionsReducers/TeamSharingRedux';
import * as StrategyConstants from '@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants';
import { StrategyViewPopupProps } from '@adaptabletools/adaptable/src/View/Components/SharedProps/StrategyViewPopupProps';
import { Helper } from '@adaptabletools/adaptable/src/Utilities/Helpers/Helper';
import { ObjectFactory } from '@adaptabletools/adaptable/src/Utilities/ObjectFactory';
import { ChartEntityRow } from './ChartEntityRow';
import { PanelWithButton } from '@adaptabletools/adaptable/src/View/Components/Panels/PanelWithButton';

import { StringExtensions } from '@adaptabletools/adaptable/src/Utilities/Extensions/StringExtensions';
import { AdaptableObjectCollection } from '@adaptabletools/adaptable/src/View/Components/AdaptableObjectCollection';
import {
  EditableConfigEntityState,
  WizardStatus,
} from '@adaptabletools/adaptable/src/View/Components/SharedProps/EditableConfigEntityState';
import { IColItem } from '@adaptabletools/adaptable/src/View/UIInterfaces';
import { UIHelper } from '@adaptabletools/adaptable/src/View/UIHelper';
import { AdaptableObject } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/AdaptableObject';
import { ChartDefinition } from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
import {
  ChartVisibility,
  ChartType,
} from '@adaptabletools/adaptable/src/PredefinedConfig/Common/ChartEnums';
import { CategoryChartWizard } from './CategoryChart/Wizard/CategoryChartWizard';
import { PieChartWizard } from './PieChart/Wizard/PieChartWizard';
import { SparklinesChartWizard } from './SparklinesChart/Wizard/SparklinesChartWizard';
import { AccessLevel } from '@adaptabletools/adaptable/src/PredefinedConfig/EntitlementState';
import HelpBlock from '@adaptabletools/adaptable/src/components/HelpBlock';
import EmptyContent from '@adaptabletools/adaptable/src/components/EmptyContent';
import DropdownButton from '@adaptabletools/adaptable/src/components/DropdownButton';
import PlusIcon from '@adaptabletools/adaptable/src/components/icons/plus';
import { AdaptableFunctionName } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/Types';

interface ChartPopupProps extends StrategyViewPopupProps<ChartPopupComponent> {
  onAddChartDefinition: (chartDefinition: ChartDefinition) => ChartRedux.ChartDefinitionAddAction;
  onEditChartDefinition: (chartDefinition: ChartDefinition) => ChartRedux.ChartDefinitionEditAction;
  onSelectChartDefinition: (chartDefinition: string) => ChartRedux.ChartDefinitionSelectAction;
  onShowChart: () => SystemRedux.ChartSetChartVisibiityAction;
  ChartDefinitions: Array<ChartDefinition>;
  CurrentChartDefinition: ChartDefinition;
  onShare: (
    entity: AdaptableObject,
    description: string
  ) => TeamSharingRedux.TeamSharingShareAction;
}

class ChartPopupComponent extends React.Component<ChartPopupProps, EditableConfigEntityState> {
  constructor(props: ChartPopupProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }

  componentDidMount() {
    if (this.props.PopupParams) {
      if (this.props.PopupParams.action && this.props.PopupParams.value) {
        let chartType: ChartType = this.props.PopupParams.value.trim() as ChartType; // todo: use the enum...

        if (this.props.PopupParams.action == 'New') {
          this.onNew(chartType);
        }
        if (this.props.PopupParams.action == 'Edit') {
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
          AdaptableObject={Chart}
          key={Chart.Name}
          onEdit={() => this.onEdit(Chart as ChartDefinition)}
          TeamSharingActivated={this.props.TeamSharingActivated}
          onShare={description => this.props.onShare(Chart, description)}
          onDeleteConfirm={ChartRedux.ChartDefinitionDelete(Chart)}
          onShowChart={chartName => this.onShowChart(chartName)}
          AccessLevel={this.props.AccessLevel}
        />
      );
    });

    let categoryChartMenuItem = {
      disabled: this.props.AccessLevel == 'ReadOnly',
      onClick: () => this.onNew(ChartType.CategoryChart),
      label: 'Category Chart',
    };
    let pieChartMenuItem = {
      disabled: this.props.AccessLevel == 'ReadOnly',
      onClick: () => this.onNew(ChartType.PieChart),
      label: 'Pie Chart',
    };

    let sparklinesChartMenuItem = {
      disabled: this.props.AccessLevel == 'ReadOnly',
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

    let editedChartDefinition = this.state.EditedAdaptableObject as ChartDefinition;

    return (
      <PanelWithButton
        headerText={StrategyConstants.ChartStrategyFriendlyName}
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

        {this.state.EditedAdaptableObject && (
          <div>
            {editedChartDefinition.ChartType == ChartType.CategoryChart ? (
              <CategoryChartWizard
                EditedAdaptableObject={editedChartDefinition}
                ConfigEntities={this.props.ChartDefinitions}
                ModalContainer={this.props.ModalContainer}
                Columns={this.props.Columns}
                UserFilters={this.props.UserFilters}
                SystemFilters={this.props.SystemFilters}
                NamedFilters={this.props.NamedFilters}
                ColumnCategories={this.props.ColumnCategories}
                Adaptable={this.props.Adaptable}
                WizardStartIndex={this.state.WizardStartIndex}
                onCloseWizard={() => this.onCloseWizard()}
                onFinishWizard={() => this.onFinishWizard()}
                canFinishWizard={() => this.canFinishWizard()}
              />
            ) : null}
            {editedChartDefinition.ChartType === ChartType.PieChart ? (
              <PieChartWizard
                EditedAdaptableObject={editedChartDefinition}
                ConfigEntities={this.props.ChartDefinitions}
                ModalContainer={this.props.ModalContainer}
                Columns={this.props.Columns}
                UserFilters={this.props.UserFilters}
                SystemFilters={this.props.SystemFilters}
                NamedFilters={this.props.NamedFilters}
                ColumnCategories={this.props.ColumnCategories}
                Adaptable={this.props.Adaptable}
                WizardStartIndex={0}
                onCloseWizard={() => this.onCloseWizard()}
                onFinishWizard={() => this.onFinishWizard()}
                canFinishWizard={() => this.canFinishWizard()}
              />
            ) : null}

            {editedChartDefinition.ChartType === ChartType.SparklinesChart ? (
              <SparklinesChartWizard
                EditedAdaptableObject={editedChartDefinition}
                ConfigEntities={this.props.ChartDefinitions}
                ModalContainer={this.props.ModalContainer}
                Columns={this.props.Columns}
                UserFilters={this.props.UserFilters}
                SystemFilters={this.props.SystemFilters}
                NamedFilters={this.props.NamedFilters}
                ColumnCategories={this.props.ColumnCategories}
                Adaptable={this.props.Adaptable}
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
      EditedAdaptableObject: Helper.cloneObject(Chart),
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
        break;
      }
    }
    this.setState({
      EditedAdaptableObject: emptyChartDefinition,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.New,
    });
  }

  onCloseWizard() {
    this.props.onClearPopupParams();
    this.setState({
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
    // if we've come from the Toolbar and the Searches are identical then close the main popup
    if (
      this.props.PopupParams &&
      this.props.PopupParams.source &&
      this.props.PopupParams.source == 'Toolbar'
    ) {
      if (
        this.props.ChartDefinitions === this.props.Adaptable.api.chartApi.getAllChartDefinitions()
      ) {
        this.props.onClosePopup();
      }
    }
  }

  onFinishWizard() {
    let clonedObject: ChartDefinition = Helper.cloneObject(this.state.EditedAdaptableObject);
    if (this.state.WizardStatus == WizardStatus.Edit) {
      this.props.onEditChartDefinition(clonedObject);
    } else {
      this.props.onAddChartDefinition(clonedObject);
    }

    let shouldSelectChart: boolean =
      this.state.WizardStatus == WizardStatus.New ||
      this.props.CurrentChartDefinition.Uuid == clonedObject.Uuid;

    this.setState({
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });

    if (shouldSelectChart) {
      // its new so make it the new chart or we are editing the current chart
      this.props.onSelectChartDefinition(clonedObject.Name);
    }
  }

  canFinishWizard() {
    let Chart = this.state.EditedAdaptableObject as ChartDefinition;
    return StringExtensions.IsNotNullOrEmpty(Chart.Name);
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any): Partial<ChartPopupProps> {
  return {
    ChartDefinitions: state.Chart.ChartDefinitions,
    CurrentChartDefinition: state.Chart.ChartDefinitions.find(
      c => c.Name == state.Chart.CurrentChartName
    ),
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<ChartPopupProps> {
  return {
    onAddChartDefinition: (chartDefinition: ChartDefinition) =>
      dispatch(ChartRedux.ChartDefinitionAdd(chartDefinition)),
    onEditChartDefinition: (chartDefinition: ChartDefinition) =>
      dispatch(ChartRedux.ChartDefinitionEdit(chartDefinition)),
    onSelectChartDefinition: (chartDefinition: string) =>
      dispatch(ChartRedux.ChartDefinitionSelect(chartDefinition)),
    onShowChart: () => dispatch(SystemRedux.ChartSetChartVisibility(ChartVisibility.Maximised)),
    onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam()),
    onShare: (entity: AdaptableObject, description: string) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ChartStrategyId, description)
      ),
  };
}

export let ChartPopup = connect(mapStateToProps, mapDispatchToProps)(ChartPopupComponent);
