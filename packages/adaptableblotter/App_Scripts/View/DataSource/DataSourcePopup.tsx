import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { HelpBlock } from 'react-bootstrap';
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
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { IColItem } from '../UIInterfaces';
import { UIHelper } from '../UIHelper';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { IAdaptableBlotterObject } from '../../Utilities/Interface/BlotterObjects/IAdaptableBlotterObject';
import { IDataSource } from '../../Utilities/Interface/BlotterObjects/IDataSource';
import { Helper } from '../../Utilities/Helpers/Helper';

interface DataSourcePopupProps extends StrategyViewPopupProps<DataSourcePopupComponent> {
  onAddDataSource: (DataSource: IDataSource) => DataSourceRedux.DataSourceAddAction;
  onEditDataSource: (
    Index: number,
    DataSource: IDataSource
  ) => DataSourceRedux.DataSourceEditAction;

  onSelectDataSource: (SelectedDataSource: string) => DataSourceRedux.DataSourceSelectAction;
  DataSources: Array<IDataSource>;
  CurrentDataSource: string;
  onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
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

    let dataSources = this.props.DataSources.map((dataSource: IDataSource, index: number) => {
      return (
        <DataSourceEntityRow
          cssClassName={cssClassName}
          AdaptableBlotterObject={dataSource}
          key={'ns' + index}
          Index={index}
          onEdit={(index, dataSource) => this.onEdit(index, dataSource as IDataSource)}
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
        cssClassName={cssClassName}
        onClick={() => this.CreateDataSource()}
        overrideTooltip="Create New DataSource"
        DisplayMode="Glyph+Text"
        size={'small'}
        AccessLevel={this.props.AccessLevel}
      />
    );

    let DataSource: IDataSource = this.state.EditedAdaptableBlotterObject as IDataSource;

    return (
      <div className={cssClassName}>
        <PanelWithButton
          cssClassName={cssClassName}
          headerText={StrategyConstants.DataSourceStrategyName}
          className="ab_main_popup"
          button={newButton}
          bsStyle="primary"
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
            <HelpBlock>Click 'New' to add a new DataSource.</HelpBlock>
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
      </div>
    );
  }

  onChangeName(dataSource: IDataSource, name: string): void {
    let currentIndex: number = this.props.DataSources.findIndex(ds => ds.Name == dataSource.Name);
    let clonedDataSource: IDataSource = Helper.cloneObject(dataSource);
    clonedDataSource.Name = name;
    this.props.onEditDataSource(currentIndex, clonedDataSource);
  }

  onChangeDescription(dataSource: IDataSource, description: string): void {
    let currentIndex: number = this.props.DataSources.findIndex(ds => ds.Name == dataSource.Name);
    let clonedDataSource: IDataSource = Helper.cloneObject(dataSource);
    clonedDataSource.Description = description;
    this.props.onEditDataSource(currentIndex, clonedDataSource);
  }

  onEdit(index: number, dataSource: IDataSource) {
    let clonedObject: IDataSource = Helper.cloneObject(dataSource);
    this.setState({
      EditedAdaptableBlotterObject: clonedObject,
      WizardStartIndex: 0,
      EditedAdaptableBlotterObjectIndex: index,
    });
  }

  onCloseWizard() {
    this.props.onClearPopupParams();
    this.setState({
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      EditedAdaptableBlotterObjectIndex: -1,
    });
  }

  onFinishWizard() {
    let searchIndex: number = this.state.EditedAdaptableBlotterObjectIndex;
    let currentSearchIndex: number = this.props.DataSources.findIndex(
      as => as.Name == this.props.CurrentDataSource
    );
    let clonedObject: IDataSource = Helper.cloneObject(this.state.EditedAdaptableBlotterObject);
    if (this.state.EditedAdaptableBlotterObject != -1) {
      this.props.onEditDataSource(this.state.EditedAdaptableBlotterObjectIndex, clonedObject);
    } else {
      this.props.onAddDataSource(clonedObject);
    }

    this.setState({
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      EditedAdaptableBlotterObjectIndex: -1,
    });
    if (searchIndex == -1 || searchIndex == currentSearchIndex) {
      // its new so make it the new search or we are editing the current search (but might have changed the name)
      this.props.onSelectDataSource(clonedObject.Name);
    }
  }

  canFinishWizard() {
    let DataSource = this.state.EditedAdaptableBlotterObject as IDataSource;

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
    onAddDataSource: (DataSource: IDataSource) =>
      dispatch(DataSourceRedux.DataSourceAdd(DataSource)),
    onEditSource: (Index: number, DataSource: IDataSource) =>
      dispatch(DataSourceRedux.DataSourceEdit(Index, DataSource)),
    onSelectDataSource: (SelectedDataSource: string) =>
      dispatch(DataSourceRedux.DataSourceSelect(SelectedDataSource)),
    onShare: (entity: IAdaptableBlotterObject) =>
      dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.DataSourceStrategyId)),
  };
}

export let DataSourcePopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(DataSourcePopupComponent);
