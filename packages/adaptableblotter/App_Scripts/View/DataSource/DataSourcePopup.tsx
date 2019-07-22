import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import * as DataSourceRedux from '../../Redux/ActionsReducers/DataSourceRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { DataSourceEntityRow } from './DataSourceEntityRow';
import { DataSourceWizard } from './Wizard/DataSourceWizard';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import {
  EditableConfigEntityState,
  WizardStatus,
} from '../Components/SharedProps/EditableConfigEntityState';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { IColItem } from '../UIInterfaces';
import { UIHelper } from '../UIHelper';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { AdaptableBlotterObject } from '../../PredefinedConfig/AdaptableBlotterObject';
import { DataSource } from '../../PredefinedConfig/RunTimeState/DataSourceState';
import { Helper } from '../../Utilities/Helpers/Helper';
import { Flex } from 'rebass';
import EmptyContent from '../../components/EmptyContent';

interface DataSourcePopupProps extends StrategyViewPopupProps<DataSourcePopupComponent> {
  onAddDataSource: (DataSource: DataSource) => DataSourceRedux.DataSourceAddAction;
  onEditDataSource: (DataSource: DataSource) => DataSourceRedux.DataSourceEditAction;

  onSelectDataSource: (SelectedDataSource: string) => DataSourceRedux.DataSourceSelectAction;
  DataSources: Array<DataSource>;
  CurrentDataSource: string;
  onShare: (entity: AdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}

class DataSourcePopupComponent extends React.Component<
  DataSourcePopupProps,
  EditableConfigEntityState
> {
  constructor(props: DataSourcePopupProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }

  render() {
    let cssClassName: string = this.props.cssClassName + '__DataSource';
    let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + '__DataSource';

    let infoBody: any[] = [
      'Use DataSources to select from existing server queries what data to show in the Blotter.',
    ];

    let colItems: IColItem[] = [
      { Content: 'Name', Size: 5 },
      { Content: 'Description', Size: 5 },
      { Content: '', Size: 2 },
    ];

    let dataSources = this.props.DataSources.map((dataSource: DataSource, index: number) => {
      return (
        <DataSourceEntityRow
          cssClassName={cssClassName}
          AdaptableBlotterObject={dataSource}
          key={'ns' + index}
          onEdit={() => this.onEdit(dataSource)}
          colItems={colItems}
          onShare={() => this.props.onShare(dataSource)}
          TeamSharingActivated={this.props.TeamSharingActivated}
          onDeleteConfirm={DataSourceRedux.DataSourceDelete(dataSource)}
          onChangeName={(dataSource, name) => this.onChangeName(dataSource, name)}
          onChangeDescription={(dataSource, description) =>
            this.onChangeDescription(dataSource, description)
          }
        />
      );
    });

    let newButton = (
      <ButtonNew
        className={cssClassName}
        onClick={() => this.CreateDataSource()}
        tooltip="Create New DataSource"
        AccessLevel={this.props.AccessLevel}
      />
    );

    let DataSource: DataSource = this.state.EditedAdaptableBlotterObject as DataSource;

    return (
      <PanelWithButton
        cssClassName={cssClassName}
        headerText={StrategyConstants.DataSourceStrategyName}
        className="ab_main_popup"
        button={newButton}
        bodyProps={{ padding: 0 }}
        glyphicon={StrategyConstants.DataSourceGlyph}
        infoBody={infoBody}
      >
        {dataSources.length > 0 ? (
          <AdaptableObjectCollection
            cssClassName={cssClassName}
            colItems={colItems}
            items={dataSources}
          />
        ) : (
          <EmptyContent>Click 'New' to add a new DataSource.</EmptyContent>
        )}

        {this.state.EditedAdaptableBlotterObject != null && (
          <DataSourceWizard
            cssClassName={cssWizardClassName}
            EditedAdaptableBlotterObject={DataSource}
            ConfigEntities={this.props.DataSources}
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
        )}
      </PanelWithButton>
    );
  }

  onChangeName(dataSource: DataSource, name: string): void {
    let clonedDataSource: DataSource = Helper.cloneObject(dataSource);
    clonedDataSource.Name = name;
    this.props.onEditDataSource(clonedDataSource);
  }

  onChangeDescription(dataSource: DataSource, description: string): void {
    let clonedDataSource: DataSource = Helper.cloneObject(dataSource);
    clonedDataSource.Description = description;
    this.props.onEditDataSource(clonedDataSource);
  }

  onEdit(dataSource: DataSource) {
    let clonedObject: DataSource = Helper.cloneObject(dataSource);
    this.setState({
      EditedAdaptableBlotterObject: clonedObject,
      WizardStartIndex: 0,
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
  }

  onFinishWizard() {
    //  let searchIndex: number = this.state.EditedAdaptableBlotterObjectIndex;
    //  let currentSearchIndex: number = this.props.DataSources.findIndex(
    //    as => as.Name == this.props.CurrentDataSource
    //  );
    let clonedObject: DataSource = Helper.cloneObject(this.state.EditedAdaptableBlotterObject);
    if (this.state.WizardStatus == WizardStatus.Edit) {
      this.props.onEditDataSource(clonedObject);
    } else {
      this.props.onAddDataSource(clonedObject);
    }

    this.setState({
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
    //  if (searchIndex == -1 || searchIndex == currentSearchIndex) {
    // its new so make it the new search or we are editing the current search (but might have changed the name)
    //  this.props.onSelectDataSource(clonedObject.Name);
    //  }
  }

  canFinishWizard() {
    let DataSource = this.state.EditedAdaptableBlotterObject as DataSource;

    return (
      StringExtensions.IsNotNullOrEmpty(DataSource.Name) &&
      StringExtensions.IsNotNullOrEmpty(DataSource.Description)
    );
  }

  CreateDataSource() {
    this.setState({
      EditedAdaptableBlotterObject: ObjectFactory.CreateEmptyDataSource(),
      WizardStartIndex: 0,
    });
  }
}

function mapStateToProps(state: AdaptableBlotterState) {
  return {
    DataSources: state.DataSource.DataSources,
    CurrentDataSource: state.DataSource.CurrentDataSource,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onAddDataSource: (DataSource: DataSource) =>
      dispatch(DataSourceRedux.DataSourceAdd(DataSource)),
    onEditDataSource: (DataSource: DataSource) =>
      dispatch(DataSourceRedux.DataSourceEdit(DataSource)),
    onSelectDataSource: (SelectedDataSource: string) =>
      dispatch(DataSourceRedux.DataSourceSelect(SelectedDataSource)),
    onShare: (entity: AdaptableBlotterObject) =>
      dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.DataSourceStrategyId)),
  };
}

export let DataSourcePopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(DataSourcePopupComponent);
