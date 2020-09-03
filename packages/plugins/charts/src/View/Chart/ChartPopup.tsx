import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableState } from '@adaptabletools/adaptable/src/PredefinedConfig/AdaptableState';
import * as ChartRedux from '@adaptabletools/adaptable/src/Redux/ActionsReducers/ChartRedux';
import * as PopupRedux from '@adaptabletools/adaptable/src/Redux/ActionsReducers/PopupRedux';
import * as SystemRedux from '@adaptabletools/adaptable/src/Redux/ActionsReducers/SystemRedux';
import * as TeamSharingRedux from '@adaptabletools/adaptable/src/Redux/ActionsReducers/TeamSharingRedux';
import * as QueryRedux from '@adaptabletools/adaptable/src/Redux/ActionsReducers/QueryRedux';
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
  EditableExpressionConfigEntityState,
} from '@adaptabletools/adaptable/src/View/Components/SharedProps/EditableConfigEntityState';
import { IColItem } from '@adaptabletools/adaptable/src/View/UIInterfaces';
import { UIHelper } from '@adaptabletools/adaptable/src/View/UIHelper';
import { AdaptableObject } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/AdaptableObject';
import {
  ChartDefinition,
  CategoryChartDefinition,
  SparklinesChartDefinition,
} from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
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
import { SharedQuery } from '@adaptabletools/adaptable/src/PredefinedConfig/QueryState';
import { EMPTY_STRING } from '@adaptabletools/adaptable/src/Utilities/Constants/GeneralConstants';
import { createUuid } from '@adaptabletools/adaptable/src/PredefinedConfig/Uuid';

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
  onAddSharedQuery: (sharedQuery: SharedQuery) => QueryRedux.SharedQueryAddAction;
}

class ChartPopupComponent extends React.Component<
  ChartPopupProps,
  EditableExpressionConfigEntityState
> {
  constructor(props: ChartPopupProps) {
    super(props);
    this.state = {
      editedAdaptableObject: null,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.None,
    };
  }

  componentDidMount() {
    if (this.props.popupParams) {
      if (this.props.popupParams.action && this.props.popupParams.value) {
        let chartType: ChartType = this.props.popupParams.value.trim() as ChartType; // todo: use the enum...

        if (this.props.popupParams.action == 'New') {
          this.onNew(chartType);
        }
        if (this.props.popupParams.action == 'Edit') {
          let index: number = this.props.ChartDefinitions.findIndex(
            cd => cd.Name == this.props.CurrentChartDefinition.Name
          );
          // try to find the chartType!
          let chartType: ChartType = ChartType.CategoryChart;
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

    let Charts = this.props.ChartDefinitions.map((chart: ChartDefinition, index) => {
      return (
        <ChartEntityRow
          colItems={colItems}
          adaptableObject={chart}
          api={this.props.api}
          key={chart.Name}
          onEdit={() => this.onEdit(chart as ChartDefinition)}
          teamSharingActivated={this.props.teamSharingActivated}
          onShare={description => this.props.onShare(chart, description)}
          onDeleteConfirm={ChartRedux.ChartDefinitionDelete(chart)}
          onShowChart={chartName => this.onShowChart(chartName)}
          accessLevel={this.props.accessLevel}
        />
      );
    });

    let categoryChartMenuItem = {
      disabled: this.props.accessLevel == 'ReadOnly',
      onClick: () => this.onNew(ChartType.CategoryChart),
      label: 'Category Chart',
    };
    let pieChartMenuItem = {
      disabled: this.props.accessLevel == 'ReadOnly',
      onClick: () => this.onNew(ChartType.PieChart),
      label: 'Pie Chart',
    };

    let sparklinesChartMenuItem = {
      disabled: this.props.accessLevel == 'ReadOnly',
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

    let editedChartDefinition = this.state.editedAdaptableObject as ChartDefinition;

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

        {this.state.editedAdaptableObject && (
          <div>
            {editedChartDefinition.ChartType == ChartType.CategoryChart ? (
              <CategoryChartWizard
                editedAdaptableObject={editedChartDefinition}
                configEntities={this.props.ChartDefinitions}
                modalContainer={this.props.modalContainer}
                api={this.props.api}
                wizardStartIndex={this.state.wizardStartIndex}
                onCloseWizard={() => this.onCloseWizard()}
                onFinishWizard={() => this.onFinishWizard()}
                canFinishWizard={() => this.canFinishWizard()}
                onSetNewSharedQueryName={(newSharedQueryName: string) =>
                  this.setState({
                    newSharedQueryName: newSharedQueryName,
                  })
                }
                onSetUseSharedQuery={(useSharedQuery: boolean) =>
                  this.setState({
                    useSharedQuery: useSharedQuery,
                  })
                }
              />
            ) : null}
            {editedChartDefinition.ChartType === ChartType.PieChart ? (
              <PieChartWizard
                editedAdaptableObject={editedChartDefinition}
                configEntities={this.props.ChartDefinitions}
                modalContainer={this.props.modalContainer}
                api={this.props.api}
                wizardStartIndex={0}
                onCloseWizard={() => this.onCloseWizard()}
                onFinishWizard={() => this.onFinishWizard()}
                canFinishWizard={() => this.canFinishWizard()}
                onSetNewSharedQueryName={(newSharedQueryName: string) =>
                  this.setState({
                    newSharedQueryName: newSharedQueryName,
                  })
                }
                onSetUseSharedQuery={(useSharedQuery: boolean) =>
                  this.setState({
                    useSharedQuery: useSharedQuery,
                  })
                }
              />
            ) : null}

            {editedChartDefinition.ChartType === ChartType.SparklinesChart ? (
              <SparklinesChartWizard
                editedAdaptableObject={editedChartDefinition}
                configEntities={this.props.ChartDefinitions}
                modalContainer={this.props.modalContainer}
                api={this.props.api}
                wizardStartIndex={0}
                onCloseWizard={() => this.onCloseWizard()}
                onFinishWizard={() => this.onFinishWizard()}
                canFinishWizard={() => this.canFinishWizard()}
                onSetNewSharedQueryName={(newSharedQueryName: string) =>
                  this.setState({
                    newSharedQueryName: newSharedQueryName,
                  })
                }
                onSetUseSharedQuery={(useSharedQuery: boolean) =>
                  this.setState({
                    useSharedQuery: useSharedQuery,
                  })
                }
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
      editedAdaptableObject: Helper.cloneObject(Chart),
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.Edit,
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
      editedAdaptableObject: emptyChartDefinition,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.New,
    });
  }

  onCloseWizard() {
    this.props.onClearPopupParams();
    this.setState({
      editedAdaptableObject: null,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.None,
    });
    // if we've come from the Toolbar and the Searches are identical then close the main popup
    if (
      this.props.popupParams &&
      this.props.popupParams.source &&
      this.props.popupParams.source == 'Toolbar'
    ) {
      if (this.props.ChartDefinitions === this.props.api.chartApi.getAllChartDefinitions()) {
        this.props.onClosePopup();
      }
    }
  }

  onFinishWizard() {
    let clonedObject: ChartDefinition = Helper.cloneObject(this.state.editedAdaptableObject);
    if (this.state.wizardStatus == WizardStatus.Edit) {
      this.props.onEditChartDefinition(clonedObject);
    } else {
      this.props.onAddChartDefinition(clonedObject);
    }

    if (StringExtensions.IsNotNullOrEmpty(this.state.newSharedQueryName)) {
      const SharedQueryId = createUuid();
      switch (clonedObject.ChartType) {
        case ChartType.CategoryChart: {
          this.props.onAddSharedQuery({
            Uuid: SharedQueryId,
            Name: this.state.newSharedQueryName,
            Expression: (clonedObject as CategoryChartDefinition).XAxisExpression,
          });

          (clonedObject as CategoryChartDefinition).XAxisExpression = undefined;
          (clonedObject as CategoryChartDefinition).XAxisSharedQueryId = SharedQueryId;
          break;
        }
        case ChartType.PieChart: {
          break;
        }
        case ChartType.SparklinesChart: {
          this.props.onAddSharedQuery({
            Uuid: SharedQueryId,
            Name: this.state.newSharedQueryName,
            Expression: (clonedObject as SparklinesChartDefinition).Expression,
          });

          (clonedObject as SparklinesChartDefinition).Expression = undefined;
          (clonedObject as SparklinesChartDefinition).SharedQueryId = SharedQueryId;
          break;
        }
      }
    }

    let shouldSelectChart: boolean =
      this.state.wizardStatus == WizardStatus.New ||
      this.props.CurrentChartDefinition.Uuid == clonedObject.Uuid;

    this.resetState();

    if (shouldSelectChart) {
      // its new so make it the new chart or we are editing the current chart
      this.props.onSelectChartDefinition(clonedObject.Name);
    }
  }

  canFinishWizard() {
    let Chart = this.state.editedAdaptableObject as ChartDefinition;
    return StringExtensions.IsNotNullOrEmpty(Chart.Name);
  }

  resetState() {
    this.setState({
      editedAdaptableObject: null,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.None,
      newSharedQueryName: EMPTY_STRING,
      useSharedQuery: false,
    });
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
    onAddSharedQuery: (sharedQuery: SharedQuery) =>
      dispatch(QueryRedux.SharedQueryAdd(sharedQuery)),
  };
}

export let ChartPopup = connect(mapStateToProps, mapDispatchToProps)(ChartPopupComponent);
