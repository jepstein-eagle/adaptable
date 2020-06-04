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
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';

interface LayoutPopupProps extends StrategyViewPopupProps<LayoutPopupComponent> {
  Layouts: Layout[];
  CurrentLayoutName: string;
  onSaveLayout: (layout: Layout) => LayoutRedux.LayoutSaveAction;
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
    if (this.props.PopupParams) {
      if (this.props.PopupParams.action) {
        if (this.props.PopupParams.action == 'New') {
          this.onNew();
        }
      }

      this.shouldClosePopupOnFinishWizard =
        this.props.PopupParams.source && this.props.PopupParams.source == 'Toolbar';
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

    let LayoutRows = this.props.Layouts.filter(l => l.Name != GeneralConstants.DEFAULT_LAYOUT).map(
      (x, index) => {
        return (
          <LayoutEntityRow
            key={x.Uuid}
            colItems={colItems}
            IsCurrentLayout={x.Name == this.props.CurrentLayoutName}
            AdaptableObject={x}
            Columns={this.props.Columns}
            UserFilters={this.props.UserFilters}
            onEdit={() => this.onEdit(x)}
            onShare={description => this.props.onShare(x, description)}
            TeamSharingActivated={this.props.TeamSharingActivated}
            onDeleteConfirm={LayoutRedux.LayoutDelete(x)}
            onSelect={() => this.props.onSelectLayout(x.Name)}
            AccessLevel={this.props.AccessLevel}
            LayoutService={this.props.Adaptable.LayoutService}
          />
        );
      }
    );

    let newSearchButton = (
      <SimpleButton
        onClick={() => this.onNew()}
        tooltip="Create New Layout"
        icon="plus"
        tone="accent"
        variant="raised"
        AccessLevel={this.props.AccessLevel}
      >
        ADD
      </SimpleButton>
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

          {this.state.EditedAdaptableObject != null && (
            <LayoutWizard
              EditedAdaptableObject={this.state.EditedAdaptableObject}
              ConfigEntities={this.props.Layouts}
              ModalContainer={this.props.ModalContainer}
              Columns={this.props.Columns}
              UserFilters={this.props.UserFilters}
              SystemFilters={this.props.SystemFilters}
              NamedFilters={this.props.NamedFilters}
              ColumnCategories={this.props.ColumnCategories}
              ColumnSorts={this.props.ColumnSorts}
              Adaptable={this.props.Adaptable}
              WizardStartIndex={this.state.WizardStartIndex}
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
      EditedAdaptableObject: ObjectFactory.CreateEmptyLayout(),
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.New,
    });
  }

  onEdit(layout: Layout) {
    let clonedObject: Layout = Helper.cloneObject(layout);
    this.setState({
      EditedAdaptableObject: clonedObject,
      WizardStartIndex: 1,
      WizardStatus: WizardStatus.Edit,
    });
  }

  onCloseWizard() {
    this.props.onClearPopupParams();
    this.setState({
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });

    if (this.shouldClosePopupOnFinishWizard) {
      this.props.onClosePopup();
    }
  }

  onFinishWizard() {
    let clonedObject: Layout = Helper.cloneObject(this.state.EditedAdaptableObject);
    this.props.onSaveLayout(clonedObject);

    let currentLayout = this.props.Layouts.find(l => l.Name == this.props.CurrentLayoutName);
    let shouldChangeLayout: boolean =
      this.state.WizardStatus == WizardStatus.New || currentLayout.Uuid == clonedObject.Uuid;

    this.setState({
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });

    if (shouldChangeLayout) {
      // its new so make it the selected layout or name has changed.
      this.props.onSelectLayout(clonedObject.Name);
    }
    this.shouldClosePopupOnFinishWizard = false;
  }

  canFinishWizard() {
    let layout = this.state.EditedAdaptableObject as Layout;
    if (ArrayExtensions.IsNotNullOrEmpty(layout.ColumnSorts)) {
      let canFinish: boolean = true;
      layout.ColumnSorts.forEach(gs => {
        if (StringExtensions.IsNullOrEmpty(gs.Column)) {
          canFinish = false;
        }
      });
      if (!canFinish) {
        return false;
      }
    }
    return (
      StringExtensions.IsNotNullOrEmpty(layout.Name) &&
      ArrayExtensions.IsNotNullOrEmpty(layout.Columns)
    );
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
    onSelectLayout: (selectedSearchName: string) =>
      dispatch(LayoutRedux.LayoutSelect(selectedSearchName)),

    onShare: (entity: AdaptableObject, description: string) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.LayoutStrategyId, description)
      ),
  };
}

export let LayoutPopup = connect(mapStateToProps, mapDispatchToProps)(LayoutPopupComponent);
