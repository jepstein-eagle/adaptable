import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { ChartDisplayPopupPropsBase } from '@adaptabletools/adaptable/src/View/Components/SharedProps/ChartDisplayPopupPropsBase';
import {
  ChartDefinition,
  CategoryChartDefinition,
  ChartProperties,
  PieChartDefinition,
  ChartData,
  SparklinesChartDefinition,
  FinancialChartDefinition,
} from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
import {
  ChartVisibility,
  ChartType,
} from '@adaptabletools/adaptable/src/PredefinedConfig/Common/ChartEnums';
import { ButtonClose } from '@adaptabletools/adaptable/src/View/Components/Buttons/ButtonClose';
import { ButtonEdit } from '@adaptabletools/adaptable/src/View/Components/Buttons/ButtonEdit';
import { ButtonMaximise } from '@adaptabletools/adaptable/src/View/Components/Buttons/ButtonMaximise';
import { ButtonMinimise } from '@adaptabletools/adaptable/src/View/Components/Buttons/ButtonMinimise';
import { PanelWithImageThreeButtons } from '@adaptabletools/adaptable/src/View/Components/Panels/PanelWithIImageThreeButtons';
import { CategoryChartWizard } from './CategoryChart/Wizard/CategoryChartWizard';
import { Helper } from '@adaptabletools/adaptable/src/Utilities/Helpers/Helper';
import { StringExtensions } from '@adaptabletools/adaptable/src/Utilities/Extensions/StringExtensions';
import { AdaptableState } from '@adaptabletools/adaptable/src/PredefinedConfig/AdaptableState';
import * as ChartRedux from '@adaptabletools/adaptable/src/Redux/ActionsReducers/ChartRedux';
import * as SystemRedux from '@adaptabletools/adaptable/src/Redux/ActionsReducers/SystemRedux';
import * as QueryRedux from '@adaptabletools/adaptable/src/Redux/ActionsReducers/QueryRedux';
import * as StrategyConstants from '@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants';
import { CategoryChartComponent } from './CategoryChart/CategoryChartComponent';
import { PieChartComponent } from './PieChart/PieChartComponent';
import { PieChartWizard } from './PieChart/Wizard/PieChartWizard';
import { FinancialChartComponent } from './FinancialChart/FinancialChartComponent';
import { SparklinesChartComponent } from './SparklinesChart/SparklinesChartComponent';
import { SparklinesChartWizard } from './SparklinesChart/Wizard/SparklinesChartWizard';
import { SharedQuery } from '@adaptabletools/adaptable/src/PredefinedConfig/QueryState';
import { createUuid } from '@adaptabletools/adaptable/src/PredefinedConfig/Uuid';
import { EMPTY_STRING } from '@adaptabletools/adaptable/src/Utilities/Constants/GeneralConstants';

interface ChartDisplayPopupProps extends ChartDisplayPopupPropsBase<ChartDisplayPopupComponent> {
  ChartDefinitions: ChartDefinition[];
  CurrentChartDefinition: ChartDefinition;
  ChartData: ChartData;
  ChartVisibility: ChartVisibility;

  onAddChartDefinition: (chartDefinition: ChartDefinition) => ChartRedux.ChartDefinitionAddAction;
  onEditChartDefinition: (chartDefinition: ChartDefinition) => ChartRedux.ChartDefinitionEditAction;
  onSelectChartDefinition: (chartDefinition: string) => ChartRedux.ChartDefinitionSelectAction;
  onSetChartVisibility: (
    chartVisibility: ChartVisibility
  ) => SystemRedux.ChartSetChartVisibiityAction;
  onUpdateChartProperties: (
    chartUuid: string,
    chartProperties: ChartProperties
  ) => ChartRedux.ChartPropertiesUpdateAction;
  onAddSharedQuery: (sharedQuery: SharedQuery) => QueryRedux.SharedQueryAddAction;
}

export interface ChartDisplayPopupState {
  EditedChartDefinition: ChartDefinition;
  newSharedQueryName?: string;
  useSharedQuery?: boolean;
}

class ChartDisplayPopupComponent extends React.Component<
  ChartDisplayPopupProps,
  ChartDisplayPopupState
> {
  constructor(props: ChartDisplayPopupProps) {
    super(props);

    this.state = { EditedChartDefinition: null };
  }

  UNSAFE_componentWillReceiveProps(nextProps: ChartDisplayPopupProps, nextContext: any) {
    if (
      this.props.CurrentChartDefinition == null ||
      nextProps.CurrentChartDefinition.Name != this.props.CurrentChartDefinition.Name
    ) {
      this.setState({ EditedChartDefinition: null });
    }
  }

  render() {
    // temp till do properly
    let currentChartType: ChartType = this.props.CurrentChartDefinition
      ? this.props.CurrentChartDefinition.ChartType
      : null;

    let closeButton = this.props.ShowModal ? null : (
      <ButtonClose
        style={{ color: 'var(--ab-color-defaultbackground)' }}
        onClick={() => this.props.onClose()}
        tooltip={null}
        tone="none"
      />
    );

    let editButton =
      this.props.ChartVisibility == ChartVisibility.Minimised ||
      currentChartType == ChartType.FinancialChart ? null : (
        <ButtonEdit
          style={{ color: 'var(--ab-color-defaultbackground)' }}
          onClick={() => this.onEditChart()}
          tooltip={null}
        />
      );

    let minmaxButton = this.props.ShowModal ? null : this.props.ChartVisibility ==
      ChartVisibility.Minimised ? (
      <ButtonMaximise
        style={{ color: 'var(--ab-color-defaultbackground)' }}
        onClick={() => this.onChartMaximised()}
        tooltip={null}
      />
    ) : (
      <ButtonMinimise
        style={{ color: 'var(--ab-color-defaultbackground)' }}
        onClick={() => this.onChartMinimised()}
      />
    );

    return (
      <PanelWithImageThreeButtons
        header={StrategyConstants.ChartStrategyFriendlyName}
        firstButton={editButton}
        secondButton={minmaxButton}
        thirdButton={closeButton}
        bodyProps={{
          padding: this.props.ChartVisibility == ChartVisibility.Minimised ? 0 : 2,
        }}
      >
        {this.props.ChartVisibility == ChartVisibility.Maximised &&
          this.props.ChartData != null &&
          this.props.CurrentChartDefinition != null && (
            <div>
              {currentChartType == ChartType.CategoryChart ? (
                <CategoryChartComponent
                  currentChartDefinition={
                    this.props.CurrentChartDefinition as CategoryChartDefinition
                  }
                  chartData={this.props.ChartData}
                  api={this.props.api}
                  columns={this.props.api.columnApi.getColumns()}
                  onUpdateChartProperties={(chartUuid, chartProperties) =>
                    this.props.onUpdateChartProperties(chartUuid, chartProperties)
                  }
                />
              ) : null}
              {currentChartType == ChartType.PieChart ? (
                <PieChartComponent
                  currentChartDefinition={this.props.CurrentChartDefinition as PieChartDefinition}
                  chartData={this.props.ChartData}
                  api={this.props.api}
                  //   api={this.props.api}
                  //   Columns={this.props.Columns}

                  onUpdateChartProperties={(chartUuid, chartProperties) =>
                    this.props.onUpdateChartProperties(chartUuid, chartProperties)
                  }
                />
              ) : null}
              {currentChartType == ChartType.SparklinesChart ? (
                <SparklinesChartComponent
                  CurrentChartDefinition={
                    this.props.CurrentChartDefinition as SparklinesChartDefinition
                  }
                  ChartData={this.props.ChartData}
                  onUpdateChartProperties={(chartUuid, chartProperties) =>
                    this.props.onUpdateChartProperties(chartUuid, chartProperties)
                  }
                />
              ) : null}

              {currentChartType == ChartType.FinancialChart ? (
                <FinancialChartComponent
                  CurrentChartDefinition={
                    this.props.CurrentChartDefinition as FinancialChartDefinition
                  }
                  ChartData={this.props.ChartData}
                />
              ) : null}
            </div>
          )}

        {this.state.EditedChartDefinition && (
          <div>
            {this.state.EditedChartDefinition.ChartType == ChartType.CategoryChart ? (
              <CategoryChartWizard
                editedAdaptableObject={this.state.EditedChartDefinition}
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
            {this.state.EditedChartDefinition.ChartType == ChartType.PieChart ? (
              <PieChartWizard
                editedAdaptableObject={this.state.EditedChartDefinition}
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

            {this.state.EditedChartDefinition.ChartType == ChartType.SparklinesChart ? (
              <SparklinesChartWizard
                editedAdaptableObject={this.state.EditedChartDefinition}
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
      </PanelWithImageThreeButtons>
    );
  }

  onEditChart(): void {
    this.setState({ EditedChartDefinition: Helper.cloneObject(this.props.CurrentChartDefinition) });
  }

  onChartMinimised() {
    this.props.onSetChartVisibility(ChartVisibility.Minimised);
  }

  onChartMaximised() {
    this.props.onSetChartVisibility(ChartVisibility.Maximised);
  }

  onCloseWizard() {
    this.setState({ EditedChartDefinition: null });
  }

  onFinishWizard() {
    let clonedObject: ChartDefinition = Helper.cloneObject(this.state.EditedChartDefinition);

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

    let isNew: boolean =
      this.props.ChartDefinitions.find(cd => cd.Uuid == this.state.EditedChartDefinition.Uuid) ==
      null;
    if (isNew) {
      this.props.onAddChartDefinition(clonedObject);
    } else {
      this.props.onEditChartDefinition(clonedObject);
    }
    this.setState({
      EditedChartDefinition: null,
      newSharedQueryName: EMPTY_STRING,
      useSharedQuery: false,
    });
    this.props.onSelectChartDefinition(clonedObject.Name);
  }

  canFinishWizard() {
    return StringExtensions.IsNotNullOrEmpty(this.state.EditedChartDefinition.Name);
  }
}

function mapStateToProps(state: AdaptableState): Partial<ChartDisplayPopupProps> {
  return {
    ChartDefinitions: state.Chart.ChartDefinitions,
    CurrentChartDefinition: state.Chart.ChartDefinitions.find(
      c => c.Name == state.Chart.CurrentChartName
    ),
    ChartData: state.System.ChartData,
    ChartVisibility: state.System.ChartVisibility,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<ChartDisplayPopupProps> {
  return {
    onAddChartDefinition: (chartDefinition: ChartDefinition) =>
      dispatch(ChartRedux.ChartDefinitionAdd(chartDefinition)),
    onEditChartDefinition: (chartDefinition: ChartDefinition) =>
      dispatch(ChartRedux.ChartDefinitionEdit(chartDefinition)),
    onSelectChartDefinition: (chartDefinition: string) =>
      dispatch(ChartRedux.ChartDefinitionSelect(chartDefinition)),
    onSetChartVisibility: (chartVisibility: ChartVisibility) =>
      dispatch(SystemRedux.ChartSetChartVisibility(chartVisibility)),
    onUpdateChartProperties: (chartUuid: string, chartProperties: ChartProperties) =>
      dispatch(ChartRedux.ChartPropertiesUpdate(chartUuid, chartProperties)),
    onAddSharedQuery: (sharedQuery: SharedQuery) =>
      dispatch(QueryRedux.SharedQueryAdd(sharedQuery)),
  };
}

export let ChartDisplayPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartDisplayPopupComponent);
