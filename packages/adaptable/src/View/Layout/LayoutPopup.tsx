import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as LayoutRedux from '../../Redux/ActionsReducers/LayoutRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { LayoutWizard } from './Wizard/LayoutWizard';
import { LayoutEntityRow } from './LayoutEntityRow';
import { Helper } from '../../Utilities/Helpers/Helper';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import {
  EditableConfigEntityState,
  WizardStatus,
} from '../Components/SharedProps/EditableConfigEntityState';
import { IColItem } from '../UIInterfaces';
import { UIHelper } from '../UIHelper';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { Layout } from '../../PredefinedConfig/LayoutState';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import EmptyContent from '../../components/EmptyContent';
import { Flex } from 'rebass';
import SimpleButton from '../../components/SimpleButton';
import { createUuid } from '../../components/utils/uuid';

interface LayoutPopupProps extends StrategyViewPopupProps<LayoutPopupComponent> {
  Layouts: Layout[];
  CurrentLayoutName: string;
  onSaveLayout: (layout: Layout) => LayoutRedux.LayoutSaveAction;
  onAddLayout: (layout: Layout) => LayoutRedux.LayoutAddAction;
  onSelectLayout: (SelectedSearchName: string) => LayoutRedux.LayoutSelectAction;
  onShare: (
    entity: AdaptableObject,
    description: string
  ) => TeamSharingRedux.TeamSharingShareAction;
}

class LayoutPopupComponent extends React.Component<LayoutPopupProps, EditableConfigEntityState> {
  constructor(props: LayoutPopupProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }
  shouldClosePopupOnFinishWizard: boolean = false;
  componentDidMount() {
    if (this.props.popupParams) {
      // if we come in from a function then open the current layout
      if (this.props.popupParams.source == 'FunctionButton') {
        let currentLayout = this.props.Layouts.find(as => as.Name == this.props.CurrentLayoutName);
        if (currentLayout) {
          this.onEdit(currentLayout);
        }
      }

      if (this.props.popupParams.action) {
        if (this.props.popupParams.action == 'New') {
          this.onNew();
        }
        if (this.props.popupParams.action == 'Edit') {
          let currentLayout = this.props.Layouts.find(
            as => as.Name == this.props.CurrentLayoutName
          );
          if (currentLayout) {
            this.onEdit(currentLayout);
          }
        }
      }

      this.shouldClosePopupOnFinishWizard =
        this.props.popupParams.source &&
        (this.props.popupParams.source == 'Toolbar' ||
          this.props.popupParams.source == 'FunctionButton' ||
          this.props.popupParams.source == 'ColumnMenu');
    }
  }

  render() {
    let infoBody: any[] = [
      'Create layouts - groups of column order, visibility and sorts.',
      <br />,
      <br />,
      'You can create as many layouts as you wish.',
    ];

    let colItems: IColItem[] = [
      { Content: 'Current', Size: 1 },
      { Content: 'Name', Size: 2 },
      { Content: 'Details', Size: 7 },
      { Content: '', Size: 2 },
    ];

    let LayoutRows = this.props.Layouts.map((x, index) => {
      return (
        <LayoutEntityRow
          key={x.Uuid}
          colItems={colItems}
          api={this.props.api}
          IsCurrentLayout={x.Name == this.props.CurrentLayoutName}
          adaptableObject={x}
          onEdit={() => this.onEdit(x)}
          onClone={() => this.onClone(x)}
          onShare={description => this.props.onShare(x, description)}
          teamSharingActivated={this.props.teamSharingActivated}
          onDeleteConfirm={LayoutRedux.LayoutDelete(x)}
          canDelete={this.props.Layouts.length > 1}
          onSelect={() => this.props.onSelectLayout(x.Name)}
          accessLevel={this.props.accessLevel}
        />
      );
    });

    let newSearchButton = (
      <ButtonNew
        onClick={() => this.onNew()}
        tooltip="Create New Layout"
        accessLevel={this.props.accessLevel}
        style={{
          color: 'var(--ab-color-text-on-add)',
          fill: 'var(--ab-color-text-on-add',
          background: 'var(--ab-color-action-add)',
        }}
      />
    );

    return (
      <Flex flex={1} flexDirection="column">
        <PanelWithButton
          headerText={StrategyConstants.LayoutStrategyFriendlyName}
          infoBody={infoBody}
          button={newSearchButton}
          glyphicon={StrategyConstants.LayoutGlyph}
          bodyProps={{ padding: 0 }}
        >
          {LayoutRows.length > 0 ? (
            <AdaptableObjectCollection colItems={colItems} items={LayoutRows} />
          ) : (
            <EmptyContent>Click 'New' to start creating layouts.</EmptyContent>
          )}

          {this.state.editedAdaptableObject != null && (
            <LayoutWizard
              editedAdaptableObject={this.state.editedAdaptableObject}
              configEntities={this.props.Layouts}
              modalContainer={this.props.modalContainer}
              ColumnSorts={this.props.api.gridApi.getColumnSorts()}
              api={this.props.api}
              wizardStartIndex={this.state.wizardStartIndex}
              onCloseWizard={() => this.onCloseWizard()}
              onFinishWizard={() => this.onFinishWizard()}
              canFinishWizard={() => this.canFinishWizard()}
            />
          )}
        </PanelWithButton>
      </Flex>
    );
  }

  onNew() {
    this.setState({
      editedAdaptableObject: ObjectFactory.CreateEmptyLayout({
        Name: '',
      }),
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.New,
    });
  }

  onEdit(layout: Layout) {
    const clonedObject: Layout = Helper.cloneObject(layout);
    this.setState({
      editedAdaptableObject: clonedObject,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.Edit,
    });
  }

  onClone(layout: Layout) {
    let clonedObject: Layout = Helper.cloneObject(layout);
    clonedObject.Name = '';
    clonedObject.Uuid = createUuid();
    this.setState({
      editedAdaptableObject: clonedObject,
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

    if (this.shouldClosePopupOnFinishWizard) {
      this.props.onClosePopup();
    }
  }

  onFinishWizard() {
    const clonedObject: Layout = Helper.cloneObject(this.state.editedAdaptableObject);

    const isNew = this.state.wizardStatus == WizardStatus.New;
    if (isNew) {
      this.props.onAddLayout(clonedObject);
    } else {
      this.props.onSaveLayout(clonedObject);
    }

    let currentLayout = this.props.Layouts.find(l => l.Name == this.props.CurrentLayoutName);
    let shouldChangeLayout: boolean = isNew || currentLayout.Uuid == clonedObject.Uuid;

    this.setState({
      editedAdaptableObject: null,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.None,
    });

    if (shouldChangeLayout) {
      // its new so make it the selected layout or name has changed.
      this.props.onSelectLayout(clonedObject.Name);
    }
  }

  canFinishWizard() {
    let layout = this.state.editedAdaptableObject as Layout;

    return StringExtensions.IsNotNullOrEmpty(layout.Name);
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any): Partial<LayoutPopupProps> {
  return {
    Layouts: state.Layout.Layouts,
    CurrentLayoutName: state.Layout.CurrentLayout,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<LayoutPopupProps> {
  return {
    onSaveLayout: (layout: Layout) => dispatch(LayoutRedux.LayoutSave(layout)),
    onAddLayout: (layout: Layout) => dispatch(LayoutRedux.LayoutAdd(layout)),
    onSelectLayout: (selectedSearchName: string) =>
      dispatch(LayoutRedux.LayoutSelect(selectedSearchName)),

    onShare: (entity: AdaptableObject, description: string) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.LayoutStrategyId, description)
      ),
  };
}

export let LayoutPopup = connect(mapStateToProps, mapDispatchToProps)(LayoutPopupComponent);
