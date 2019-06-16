import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { HelpBlock } from 'react-bootstrap';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
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
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { SortOrder, AccessLevel } from '../../PredefinedConfig/Common/Enums';
import { IAdaptableBlotterObject } from '../../PredefinedConfig/IAdaptableBlotterObject';
import { Layout } from '../../PredefinedConfig/IUserState/LayoutState';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';

interface LayoutPopupProps extends StrategyViewPopupProps<LayoutPopupComponent> {
  Layouts: Layout[];
  CurrentLayoutName: string;
  onSaveLayout: (layout: Layout) => LayoutRedux.LayoutSaveAction;
  onSelectLayout: (SelectedSearchName: string) => LayoutRedux.LayoutSelectAction;
  onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}

class LayoutPopupComponent extends React.Component<LayoutPopupProps, EditableConfigEntityState> {
  constructor(props: LayoutPopupProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }

  componentDidMount() {
    if (this.props.PopupParams == 'New') {
      this.onNew();
    }
    // dont think we will ever let you an edit a layout this way - only create and then save what is currently in the grid.
    //   if (this.props.PopupParams == "Edit") {
    //       let currentLayout = this.props.Layouts.find(as => as.Name == this.props.CurrentLayoutName)
    //       if (currentLayout) {
    ///          this.onEdit(currentLayout)
    //     }
    //  }
  }

  render() {
    let cssClassName: string = this.props.cssClassName + '__layout';
    let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + '__layout';

    let currentLayout = this.props.Layouts.find(as => as.Name == this.props.CurrentLayoutName);

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
            cssClassName={cssClassName}
            colItems={colItems}
            IsCurrentLayout={x.Name == this.props.CurrentLayoutName}
            AdaptableBlotterObject={x}
            Columns={this.props.Columns}
            UserFilters={this.props.UserFilters}
            onEdit={() => this.onEdit(x)}
            onShare={() => this.props.onShare(x)}
            TeamSharingActivated={this.props.TeamSharingActivated}
            onDeleteConfirm={LayoutRedux.LayoutDelete(x)}
            onSelect={() => this.props.onSelectLayout(x.Name)}
          />
        );
      }
    );

    let newSearchButton = (
      <ButtonNew
        cssClassName={cssClassName}
        onClick={() => this.onNew()}
        overrideTooltip="Create New Advanced Search"
        DisplayMode="Glyph+Text"
        size={'small'}
        AccessLevel={this.props.AccessLevel}
      />
    );

    return (
      <div className={cssClassName}>
        <PanelWithButton
          cssClassName={cssClassName}
          bsStyle="primary"
          headerText={StrategyConstants.LayoutStrategyName}
          infoBody={infoBody}
          button={newSearchButton}
          glyphicon={StrategyConstants.LayoutGlyph}
          className="ab_main_popup"
        >
          {LayoutRows.length > 0 ? (
            <AdaptableObjectCollection
              cssClassName={cssClassName}
              colItems={colItems}
              items={LayoutRows}
            />
          ) : (
            <HelpBlock>Click 'New' to start creating layouts.</HelpBlock>
          )}

          {this.state.EditedAdaptableBlotterObject != null && (
            <LayoutWizard
              cssClassName={cssWizardClassName}
              EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject}
              ConfigEntities={this.props.Layouts}
              ModalContainer={this.props.ModalContainer}
              Columns={this.props.Columns}
              UserFilters={this.props.UserFilters}
              SystemFilters={this.props.SystemFilters}
              ColumnSorts={this.props.ColumnSorts}
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

  onNew() {
    this.setState({
      EditedAdaptableBlotterObject: ObjectFactory.CreateLayout([], [], null, ''),
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.New,
    });
  }

  onEdit(layout: Layout) {
    let clonedObject: Layout = Helper.cloneObject(layout);
    this.setState({
      EditedAdaptableBlotterObject: clonedObject,
      WizardStartIndex: 1,
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
    let clonedObject: Layout = Helper.cloneObject(this.state.EditedAdaptableBlotterObject);

    this.props.onSaveLayout(clonedObject);

    let currentLayout = this.props.Layouts.find(l => l.Name == this.props.CurrentLayoutName);
    let shouldChangeLayout: boolean =
      this.state.WizardStatus == WizardStatus.New || currentLayout.Uuid == clonedObject.Uuid;

    this.setState({
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });

    if (shouldChangeLayout) {
      // its new so make it the selected layout or name has changed.
      this.props.onSelectLayout(clonedObject.Name);
    }
  }

  canFinishWizard() {
    let layout = this.state.EditedAdaptableBlotterObject as Layout;
    if (ArrayExtensions.IsNotNullOrEmpty(layout.ColumnSorts)) {
      let canFinish: boolean = true;
      layout.ColumnSorts.forEach(gs => {
        if (StringExtensions.IsNullOrEmpty(gs.Column) || gs.SortOrder == SortOrder.Unknown) {
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

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    Layouts: state.Layout.Layouts,
    CurrentLayoutName: state.Layout.CurrentLayout,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onSaveLayout: (layout: Layout) => dispatch(LayoutRedux.LayoutSave(layout)),
    onSelectLayout: (selectedSearchName: string) =>
      dispatch(LayoutRedux.LayoutSelect(selectedSearchName)),
    onShare: (entity: IAdaptableBlotterObject) =>
      dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.LayoutStrategyId)),
  };
}

export let LayoutPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(LayoutPopupComponent);
