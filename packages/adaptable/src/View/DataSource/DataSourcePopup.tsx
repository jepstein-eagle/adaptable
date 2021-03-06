import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
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
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { DataSource } from '../../PredefinedConfig/DataSourceState';
import { Helper } from '../../Utilities/Helpers/Helper';
import { Flex } from 'rebass';
import EmptyContent from '../../components/EmptyContent';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';

interface DataSourcePopupProps extends StrategyViewPopupProps<DataSourcePopupComponent> {
  onAddDataSource: (DataSource: DataSource) => DataSourceRedux.DataSourceAddAction;
  onEditDataSource: (DataSource: DataSource) => DataSourceRedux.DataSourceEditAction;

  onSelectDataSource: (SelectedDataSource: string) => DataSourceRedux.DataSourceSelectAction;
  DataSources: Array<DataSource>;
  CurrentDataSource: string;
  onShare: (
    entity: AdaptableObject,
    description: string
  ) => TeamSharingRedux.TeamSharingShareAction;
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
    let infoBody: any[] = [
      'Use DataSources to select from existing server queries what data to show in Adaptable.',
    ];

    let colItems: IColItem[] = [
      { Content: 'Name', Size: 5 },
      { Content: 'Description', Size: 5 },
      { Content: '', Size: 2 },
    ];

    let dataSources = this.props.DataSources.map((dataSource: DataSource, index: number) => {
      return (
        <DataSourceEntityRow
          adaptableObject={dataSource}
          key={'ns' + index}
          onEdit={() => this.onEdit(dataSource)}
          colItems={colItems}
          api={this.props.api}
          onShare={description => this.props.onShare(dataSource, description)}
          teamSharingActivated={this.props.teamSharingActivated}
          onDeleteConfirm={DataSourceRedux.DataSourceDelete(dataSource)}
          onChangeName={(dataSource, name) => this.onChangeName(dataSource, name)}
          onChangeDescription={(dataSource, description) =>
            this.onChangeDescription(dataSource, description)
          }
          accessLevel={this.props.accessLevel}
        />
      );
    });

    let newButton = (
      <ButtonNew
        onClick={() => this.CreateDataSource()}
        tooltip="Create New DataSource"
        accessLevel={this.props.accessLevel}
        style={{
          color: 'var(--ab-color-text-on-add)',
          fill: 'var(--ab-color-text-on-add',
          background: 'var(--ab-color-action-add)',
        }}
      />
    );

    let DataSource: DataSource = this.state.editedAdaptableObject as DataSource;

    return (
      <PanelWithButton
        headerText={StrategyConstants.DataSourceStrategyFriendlyName}
        button={newButton}
        bodyProps={{ padding: 0 }}
        glyphicon={StrategyConstants.DataSourceGlyph}
        infoBody={infoBody}
      >
        {dataSources.length > 0 ? (
          <AdaptableObjectCollection colItems={colItems} items={dataSources} />
        ) : (
          <EmptyContent>Click 'New' to add a new DataSource.</EmptyContent>
        )}

        {this.state.editedAdaptableObject != null && (
          <DataSourceWizard
            editedAdaptableObject={DataSource}
            configEntities={this.props.DataSources}
            modalContainer={this.props.modalContainer}
            api={this.props.api}
            wizardStartIndex={this.state.wizardStartIndex}
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
      editedAdaptableObject: clonedObject,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.Edit,
    });
  }

  onCloseWizard() {
    this.props.onClearPopupParams();
    this.setState({
      editedAdaptableObject: null,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.None,
    });
  }

  onFinishWizard() {
    //  let searchIndex: number = this.state.EditedAdaptableObjectIndex;
    //  let currentSearchIndex: number = this.props.DataSources.findIndex(
    //    as => as.Name == this.props.CurrentDataSource
    //  );
    let clonedObject: DataSource = Helper.cloneObject(this.state.editedAdaptableObject);
    if (this.state.wizardStatus == WizardStatus.Edit) {
      this.props.onEditDataSource(clonedObject);
    } else {
      this.props.onAddDataSource(clonedObject);
    }

    this.setState({
      editedAdaptableObject: null,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.None,
    });
    //  if (searchIndex == -1 || searchIndex == currentSearchIndex) {
    // its new so make it the new search or we are editing the current search (but might have changed the name)
    //  this.props.onSelectDataSource(clonedObject.Name);
    //  }
  }

  canFinishWizard() {
    let DataSource = this.state.editedAdaptableObject as DataSource;

    return (
      StringExtensions.IsNotNullOrEmpty(DataSource.Name) &&
      StringExtensions.IsNotNullOrEmpty(DataSource.Description)
    );
  }

  CreateDataSource() {
    this.setState({
      editedAdaptableObject: ObjectFactory.CreateEmptyDataSource(),
      wizardStartIndex: 0,
    });
  }
}

function mapStateToProps(state: AdaptableState): Partial<DataSourcePopupProps> {
  return {
    DataSources: state.DataSource.DataSources,
    CurrentDataSource: state.DataSource.CurrentDataSource,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<DataSourcePopupProps> {
  return {
    onAddDataSource: (DataSource: DataSource) =>
      dispatch(DataSourceRedux.DataSourceAdd(DataSource)),
    onEditDataSource: (DataSource: DataSource) =>
      dispatch(DataSourceRedux.DataSourceEdit(DataSource)),
    onSelectDataSource: (SelectedDataSource: string) =>
      dispatch(DataSourceRedux.DataSourceSelect(SelectedDataSource)),

    onShare: (entity: AdaptableObject, description: string) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(
          entity,
          StrategyConstants.DataSourceStrategyId,
          description
        )
      ),
  };
}

export let DataSourcePopup = connect(mapStateToProps, mapDispatchToProps)(DataSourcePopupComponent);
