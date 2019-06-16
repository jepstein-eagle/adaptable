import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import * as FormatColumnRedux from '../../Redux/ActionsReducers/FormatColumnRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { HelpBlock } from 'react-bootstrap';
import { FormatColumnEntityRow } from './FormatColumnEntityRow';
import { FormatColumnWizard } from './Wizard/FormatColumnWizard';
import { Helper } from '../../Utilities/Helpers/Helper';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import {
  EditableConfigEntityState,
  WizardStatus,
} from '../Components/SharedProps/EditableConfigEntityState';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { IColItem } from '../UIInterfaces';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { UIHelper } from '../UIHelper';
import { IAdaptableBlotterObject } from '../../PredefinedConfig/IAdaptableBlotterObject';
import { IFormatColumn } from '../../PredefinedConfig/IUserState/FormatColumnState';

interface FormatColumnPopupProps extends StrategyViewPopupProps<FormatColumnPopupComponent> {
  FormatColumns: Array<IFormatColumn>;
  StyleClassNames: string[];
  onAddFormatColumn: (formatColumn: IFormatColumn) => FormatColumnRedux.FormatColumnAddAction;
  onEditFormatColumn: (formatColumn: IFormatColumn) => FormatColumnRedux.FormatColumnEditAction;
  onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}

class FormatColumnPopupComponent extends React.Component<
  FormatColumnPopupProps,
  EditableConfigEntityState
> {
  constructor(props: FormatColumnPopupProps) {
    super(props);
    this.state = {
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    };
  }

  componentDidMount() {
    if (StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
      let arrayParams = this.props.PopupParams.split('|');
      if (arrayParams.length == 2 && arrayParams[0] == 'New') {
        let newFormatColumn = ObjectFactory.CreateEmptyFormatColumn();
        newFormatColumn.ColumnId = arrayParams[1];
        this.onNewFromColumn(newFormatColumn);
      }
      if (arrayParams.length == 2 && arrayParams[0] == 'Edit') {
        let editFormatColumn = this.props.FormatColumns.find(x => x.ColumnId == arrayParams[1]);
        this.onEdit(editFormatColumn);
      }
    }
  }

  render() {
    let cssClassName: string = this.props.cssClassName + '__formatcolumn';
    let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + '__formatcolumn';

    let infoBody: any[] = [
      'Format a column so it styles with the colours and font properties that you provide.',
      <br />,
      <br />,
      'Unlike Conditional Styles the column is ',
      <b>always</b>,
      ' formatted as set and is not dependent on a rule being met.',
    ];

    let colItems: IColItem[] = [
      { Content: 'Column', Size: 4 },
      { Content: 'Format Style', Size: 6 },
      { Content: '', Size: 2 },
    ];
    let FormatColumns = this.props.FormatColumns.map((formatColumn: IFormatColumn, index) => {
      return (
        <FormatColumnEntityRow
          key={formatColumn.Uuid}
          cssClassName={cssClassName}
          colItems={colItems}
          AdaptableBlotterObject={formatColumn}
          Columns={this.props.Columns}
          UserFilters={null}
          onEdit={() => this.onEdit(formatColumn)}
          onShare={() => this.props.onShare(formatColumn)}
          TeamSharingActivated={this.props.TeamSharingActivated}
          onDeleteConfirm={FormatColumnRedux.FormatColumnDelete(formatColumn)}
        />
      );
    });

    let newButton = (
      <ButtonNew
        cssClassName={cssClassName}
        onClick={() => this.onNew()}
        overrideTooltip="Create Format Column"
        DisplayMode="Glyph+Text"
        size={'small'}
        AccessLevel={this.props.AccessLevel}
      />
    );

    return (
      <div className={cssClassName}>
        <PanelWithButton
          cssClassName={cssClassName}
          headerText={StrategyConstants.FormatColumnStrategyName}
          button={newButton}
          bsStyle="primary"
          className="ab_main_popup"
          glyphicon={StrategyConstants.FormatColumnGlyph}
          infoBody={infoBody}
        >
          {this.props.FormatColumns.length == 0 ? (
            <HelpBlock>Click 'New' to create a new column format.</HelpBlock>
          ) : (
            <AdaptableObjectCollection
              cssClassName={cssClassName}
              colItems={colItems}
              items={FormatColumns}
            />
          )}

          {this.state.EditedAdaptableBlotterObject != null && (
            <FormatColumnWizard
              cssClassName={cssWizardClassName}
              EditedAdaptableBlotterObject={
                this.state.EditedAdaptableBlotterObject as IFormatColumn
              }
              ModalContainer={this.props.ModalContainer}
              ColorPalette={this.props.ColorPalette}
              StyleClassNames={this.props.StyleClassNames}
              UserFilters={this.props.UserFilters}
              SystemFilters={this.props.SystemFilters}
              Columns={this.props.Columns}
              Blotter={this.props.Blotter}
              ConfigEntities={this.props.FormatColumns}
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
      EditedAdaptableBlotterObject: ObjectFactory.CreateEmptyFormatColumn(),
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.New,
    });
  }

  onNewFromColumn(formatColumn: IFormatColumn) {
    let clonedObject: IFormatColumn = Helper.cloneObject(formatColumn);
    this.setState({
      EditedAdaptableBlotterObject: clonedObject,
      WizardStatus: WizardStatus.New,
      WizardStartIndex: 1,
    });
  }

  onEdit(formatColumn: IFormatColumn) {
    let clonedObject: IFormatColumn = Helper.cloneObject(formatColumn);
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
    let formatColumn = this.state.EditedAdaptableBlotterObject as IFormatColumn;
    if (this.state.WizardStatus == WizardStatus.Edit) {
      this.props.onEditFormatColumn(formatColumn);
    } else {
      this.props.onAddFormatColumn(formatColumn);
    }
    this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0 });
  }
  canFinishWizard() {
    let formatColumn = this.state.EditedAdaptableBlotterObject as IFormatColumn;
    return (
      StringExtensions.IsNotNullOrEmpty(formatColumn.ColumnId) &&
      UIHelper.IsNotEmptyStyle(formatColumn.Style)
    );
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    FormatColumns: state.FormatColumn.FormatColumns,
    StyleClassNames: state.UserInterface.StyleClassNames,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onAddFormatColumn: (formatColumn: IFormatColumn) =>
      dispatch(FormatColumnRedux.FormatColumnAdd(formatColumn)),
    onEditFormatColumn: (formatColumn: IFormatColumn) =>
      dispatch(FormatColumnRedux.FormatColumnEdit(formatColumn)),
    onShare: (entity: IAdaptableBlotterObject) =>
      dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.FormatColumnStrategyId)),
  };
}

export let FormatColumnPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(FormatColumnPopupComponent);
