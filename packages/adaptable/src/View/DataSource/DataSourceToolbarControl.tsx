import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as DataSourceRedux from '../../Redux/ActionsReducers/DataSourceRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';

import { DataSource } from '../../PredefinedConfig/DataSourceState';
import { AdaptablePopover } from '../AdaptablePopover';
import { DataSourceParamsPopover } from './DataSourceParamsPopover';
import ArrayExtensions from '../../Utilities/Extensions/ArrayExtensions';
import { ButtonApply } from '../Components/Buttons/ButtonApply';
import Dropdown from '../../components/Dropdown';
import { Flex } from 'rebass';
import { AdaptableDashboardToolbar } from '../../PredefinedConfig/Common/Types';
import DropdownButton from '../../components/DropdownButton';

interface DataSourceToolbarControlComponentProps
  extends ToolbarStrategyViewPopupProps<DataSourceToolbarControlComponent> {
  CurrentDataSourceName: string;
  DataSources: DataSource[];

  onSelectDataSource: (DataSourceName: string) => DataSourceRedux.DataSourceSelectAction;
}

interface DataSourceToolbarControlComponentState {
  CurrentDataSource: DataSource;
}

class DataSourceToolbarControlComponent extends React.Component<
  DataSourceToolbarControlComponentProps,
  DataSourceToolbarControlComponentState
> {
  constructor(props: DataSourceToolbarControlComponentProps) {
    super(props);
    this.state = {
      CurrentDataSource: StringExtensions.IsNullOrEmpty(this.props.CurrentDataSourceName)
        ? null
        : this.props.DataSources.find(ds => ds.Name == this.props.CurrentDataSourceName),
    };
  }

  render() {
    const selectDataSourceString: string = 'Select Data Source';

    let currentDataSourceName =
      this.state.CurrentDataSource == null
        ? selectDataSourceString
        : this.state.CurrentDataSource.Name;

    // this will be a method that will check params...
    let canApplyDataSource: boolean = this.canApplyDataSource();

    let availableDataSources: any[] = this.props.DataSources
      // .filter(
      //   s => s.Name != currentDataSourceName
      // )
      .map((dataSource, index) => {
        return {
          value: dataSource.Name,
          label: dataSource.Name,
          onClick: () => this.onSelectedDataSourceChanged(dataSource.Name),
        };
      });

    let dataSourceParamsPopover =
      this.state.CurrentDataSource == null ? null : (
        <DataSourceParamsPopover dataSourceParams={this.state.CurrentDataSource.DataSourceParams} />
      );

    let content = (
      <Flex alignItems="stretch" className="ab-DashboardToolbar__DataSource__wrap">
        <DropdownButton
          marginRight={2}
          columns={['label']}
          style={{ fontSize: 'small' }}
          className="ab-DashboardToolbar__DataSource__select"
          items={availableDataSources}
          variant="outlined"
          tone={'neutral'}
        >
          {currentDataSourceName}
        </DropdownButton>

        <ButtonApply
          className="ab-DashboardToolbar__DataSource__apply"
          marginLeft={2}
          onClick={() => this.onApplyClick()}
          tooltip="Get Data Source"
          disabled={!canApplyDataSource}
          accessLevel={this.props.accessLevel}
        />
        {/*
        {this.state.CurrentDataSource != null && !canApplyDataSource && (
          <AdaptablePopover
            showDefaultStyle={this.props.UseSingleColourForButtons}
            size={this.props.DashboardSize}

            headerText="Data Source Params"
            bodyText={[dataSourceParamsPopover]}
            tooltipText={'Get Data Source Params'}
            useButton={true}
            triggerAction={'click'}
            popoverMinWidth={300}
          />
        )}*/}
      </Flex>
    );

    return (
      <PanelDashboard
        className="ab-DashboardToolbar__DataSource"
        headerText={StrategyConstants.DataSourceStrategyFriendlyName}
        onConfigure={() => this.props.onConfigure()}
        onClose={() => this.props.onClose('DataSource')}
      >
        {content}
      </PanelDashboard>
    );
  }

  onSelectedDataSourceChanged(dataSourceName: string) {
    if (StringExtensions.IsNullOrEmpty(dataSourceName)) {
      this.setState({ CurrentDataSource: null });
    } else {
      let newDataSource: DataSource = this.props.DataSources.find(ds => ds.Name == dataSourceName);
      this.setState({ CurrentDataSource: newDataSource });
    }
  }

  private onApplyClick(): void {
    if (this.canApplyDataSource) {
      if (this.state.CurrentDataSource != null) {
        this.props.onSelectDataSource(this.state.CurrentDataSource.Name);
      }
    }
  }

  private canApplyDataSource(): boolean {
    if (this.state.CurrentDataSource == null) {
      return false;
    }
    if (ArrayExtensions.IsNotNullOrEmpty(this.state.CurrentDataSource.DataSourceParams)) {
      return false;
    }

    return true;
  }
}

function mapStateToProps(
  state: AdaptableState,
  ownProps: any
): Partial<DataSourceToolbarControlComponentProps> {
  return {
    CurrentDataSourceName: state.DataSource.CurrentDataSource,
    DataSources: state.DataSource.DataSources,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<DataSourceToolbarControlComponentProps> {
  return {
    onSelectDataSource: (DataSourceName: string) =>
      dispatch(DataSourceRedux.DataSourceSelect(DataSourceName)),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.DataSourceStrategyId,
          ScreenPopups.DataSourcePopup
        )
      ),
    onClose: (toolbar: AdaptableDashboardToolbar) =>
      dispatch(DashboardRedux.DashboardCloseToolbar(toolbar)),
  };
}

export let DataSourceToolbarControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(DataSourceToolbarControlComponent);
