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
import * as StrategyConstants from '@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants';
import { CategoryChartComponent } from './CategoryChart/CategoryChartComponent';
import { PieChartComponent } from './PieChart/PieChartComponent';
import { PieChartWizard } from './PieChart/Wizard/PieChartWizard';
import { SparklinesChartComponent } from './SparklinesChart/SparklinesChartComponent';
import { SparklinesChartWizard } from './SparklinesChart/Wizard/SparklinesChartWizard';

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
}

export interface ChartDisplayPopupState {
  EditedChartDefinition: ChartDefinition;
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
      this.props.ChartVisibility == ChartVisibility.Minimised ? null : (
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
                  CurrentChartDefinition={
                    this.props.CurrentChartDefinition as CategoryChartDefinition
                  }
                  ChartData={this.props.ChartData}
                  ColorPalette={this.props.ColorPalette}
                  Columns={this.props.Columns}
                  onUpdateChartProperties={(chartUuid, chartProperties) =>
                    this.props.onUpdateChartProperties(chartUuid, chartProperties)
                  }
                />
              ) : null}
              {currentChartType == ChartType.PieChart ? (
                <PieChartComponent
                  CurrentChartDefinition={this.props.CurrentChartDefinition as PieChartDefinition}
                  ChartData={this.props.ChartData}
                  //   ColorPalette={this.props.ColorPalette}
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
            </div>
          )}

        {this.state.EditedChartDefinition && (
          <div>
            {this.state.EditedChartDefinition.ChartType == ChartType.CategoryChart ? (
              <CategoryChartWizard
                EditedAdaptableObject={this.state.EditedChartDefinition}
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
            {this.state.EditedChartDefinition.ChartType == ChartType.PieChart ? (
              <PieChartWizard
                EditedAdaptableObject={this.state.EditedChartDefinition}
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

            {this.state.EditedChartDefinition.ChartType == ChartType.SparklinesChart ? (
              <SparklinesChartWizard
                EditedAdaptableObject={this.state.EditedChartDefinition}
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
    let isNew: boolean =
      this.props.ChartDefinitions.find(cd => cd.Uuid == this.state.EditedChartDefinition.Uuid) ==
      null;
    if (isNew) {
      this.props.onAddChartDefinition(clonedObject);
    } else {
      this.props.onEditChartDefinition(clonedObject);
    }
    this.setState({ EditedChartDefinition: null });
    this.props.onSelectChartDefinition(clonedObject.Name);
  }

  canFinishWizard() {
    return StringExtensions.IsNotNullOrEmpty(this.state.EditedChartDefinition.Name);
  }
}

function mapStateToProps(state: AdaptableState) {
  return {
    ChartDefinitions: state.Chart.ChartDefinitions,
    CurrentChartDefinition: state.Chart.ChartDefinitions.find(
      c => c.Name == state.Chart.CurrentChartName
    ),
    ChartData: state.System.ChartData,
    ChartVisibility: state.System.ChartVisibility,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
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
  };
}

export let ChartDisplayPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartDisplayPopupComponent);
