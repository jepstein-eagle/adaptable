import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import * as DataSourceRedux from '../../Redux/ActionsReducers/DataSourceRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { InputGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import { DataSource } from '../../PredefinedConfig/RunTimeState/DataSourceState';
import { AdaptablePopover } from '../AdaptablePopover';
import { DataSourceParamsPopover } from './DataSourceParamsPopover';
import ArrayExtensions from '../../Utilities/Extensions/ArrayExtensions';
import { ButtonApply } from '../Components/Buttons/ButtonApply';

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
    let cssClassName: string = this.props.cssClassName + '__DataSource';

    let currentDataSourceName =
      this.state.CurrentDataSource == null
        ? selectDataSourceString
        : this.state.CurrentDataSource.Name;

    // this will be a method that will check params...
    let canApplyDataSource: boolean = this.canApplyDataSource();

    let availableDataSources: any[] = this.props.DataSources.filter(
      s => s.Name != currentDataSourceName
    ).map((dataSource, index) => {
      return (
        <MenuItem
          key={index}
          eventKey={index}
          onClick={() => this.onSelectedDataSourceChanged(dataSource.Name)}
        >
          {dataSource.Name}
        </MenuItem>
      );
    });

    let dataSourceParamsPopover =
      this.state.CurrentDataSource == null ? null : (
        <DataSourceParamsPopover
          cssClassName={cssClassName}
          dataSourceParams={this.state.CurrentDataSource.DataSourceParams}
        />
      );

    let content = (
      <span>
        <InputGroup>
          <DropdownButton
            disabled={availableDataSources.length == 0}
            style={{ minWidth: '140px' }}
            className={cssClassName}
            bsSize={this.props.DashboardSize}
            bsStyle={'default'}
            title={currentDataSourceName}
            id="DataSource"
            componentClass={InputGroup.Button}
          >
            {availableDataSources}
          </DropdownButton>

          <InputGroup.Button>
            <ButtonApply
              cssClassName={cssClassName}
              style={{ marginLeft: '3px' }}
              onClick={() => this.onApplyClick()}
              size={this.props.DashboardSize}
              glyph={'ok'}
              bsStyle={'default'}
              overrideTooltip="Get Data Source"
              overrideDisableButton={!canApplyDataSource}
              DisplayMode="Glyph"
              AccessLevel={this.props.AccessLevel}
              showDefaultStyle={this.props.UseSingleColourForButtons}
            />
          </InputGroup.Button>
        </InputGroup>
        {this.state.CurrentDataSource != null && !canApplyDataSource && (
          <AdaptablePopover
            showDefaultStyle={this.props.UseSingleColourForButtons}
            size={this.props.DashboardSize}
            cssClassName={cssClassName}
            headerText="Data Source Params"
            bodyText={[dataSourceParamsPopover]}
            tooltipText={'Get Data Source Params'}
            useButton={true}
            triggerAction={'click'}
            popoverMinWidth={300}
          />
        )}
      </span>
    );

    return (
      <PanelDashboard
        cssClassName={cssClassName}
        useDefaultPanelStyle={this.props.UseSingleColourForButtons}
        headerText={StrategyConstants.DataSourceStrategyName}
        glyphicon={StrategyConstants.DataSourceGlyph}
        onClose={() => this.props.onClose(StrategyConstants.DataSourceStrategyId)}
        onConfigure={() => this.props.onConfigure()}
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

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    CurrentDataSourceName: state.DataSource.CurrentDataSource,
    DataSources: state.DataSource.DataSources,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onSelectDataSource: (DataSourceName: string) =>
      dispatch(DataSourceRedux.DataSourceSelect(DataSourceName)),
    onClose: (dashboardControl: string) =>
      dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.DataSourceStrategyId,
          ScreenPopups.DataSourcePopup
        )
      ),
  };
}

export let DataSourceToolbarControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(DataSourceToolbarControlComponent);
