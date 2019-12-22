import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../PredefinedConfig/AdaptableBlotterState';
import * as FormatColumnRedux from '../../Redux/ActionsReducers/FormatColumnRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
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
import { UIHelper } from '../UIHelper';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { FormatColumn } from '../../PredefinedConfig/FormatColumnState';
import { Flex } from 'rebass';
import EmptyContent from '../../components/EmptyContent';

interface FormatColumnPopupProps extends StrategyViewPopupProps<FormatColumnPopupComponent> {
  FormatColumns: Array<FormatColumn>;
  StyleClassNames: string[];
  onAddFormatColumn: (formatColumn: FormatColumn) => FormatColumnRedux.FormatColumnAddAction;
  onEditFormatColumn: (formatColumn: FormatColumn) => FormatColumnRedux.FormatColumnEditAction;
  onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}

class FormatColumnPopupComponent extends React.Component<
  FormatColumnPopupProps,
  EditableConfigEntityState
> {
  constructor(props: FormatColumnPopupProps) {
    super(props);
    this.state = {
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    };
  }
  shouldClosePopupOnFinishWizard: boolean = false;
  componentDidMount() {
    if (this.props.PopupParams) {
      if (this.props.PopupParams.action && this.props.PopupParams.columnId) {
        let columnId: string = this.props.PopupParams.columnId;
        if (this.props.PopupParams.action == 'New') {
          let newFormatColumn = ObjectFactory.CreateEmptyFormatColumn();
          newFormatColumn.ColumnId = columnId;
          this.onNewFromColumn(newFormatColumn);
        }
        if (this.props.PopupParams.action == 'Edit') {
          let editFormatColumn = this.props.FormatColumns.find(x => x.ColumnId == columnId);
          this.onEdit(editFormatColumn);
        }
      }
      this.shouldClosePopupOnFinishWizard =
        this.props.PopupParams.source && this.props.PopupParams.source == 'ColumnMenu';
    }
  }

  render() {
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
    let FormatColumns = this.props.FormatColumns.map((formatColumn: FormatColumn, index) => {
      return (
        <FormatColumnEntityRow
          key={formatColumn.Uuid}
          colItems={colItems}
          AdaptableObject={formatColumn}
          Columns={this.props.Columns}
          UserFilters={this.props.UserFilters}
          onEdit={() => this.onEdit(formatColumn)}
          onShare={() => this.props.onShare(formatColumn)}
          TeamSharingActivated={this.props.TeamSharingActivated}
          onDeleteConfirm={FormatColumnRedux.FormatColumnDelete(formatColumn)}
          AccessLevel={this.props.AccessLevel}
        />
      );
    });

    let newButton = (
      <ButtonNew
        onClick={() => this.onNew()}
        tooltip="Create Format Column"
        AccessLevel={this.props.AccessLevel}
      />
    );

    return (
      <Flex flex={1} flexDirection="column">
        <PanelWithButton
          headerText={StrategyConstants.FormatColumnStrategyName}
          button={newButton}
          glyphicon={StrategyConstants.FormatColumnGlyph}
          infoBody={infoBody}
          bodyProps={{ padding: 0 }}
        >
          {this.props.FormatColumns.length == 0 ? (
            <EmptyContent>Click 'New' to create a new column format.</EmptyContent>
          ) : (
            <AdaptableObjectCollection colItems={colItems} items={FormatColumns} />
          )}

          {this.state.EditedAdaptableObject != null && (
            <FormatColumnWizard
              EditedAdaptableObject={this.state.EditedAdaptableObject as FormatColumn}
              ModalContainer={this.props.ModalContainer}
              ColorPalette={this.props.ColorPalette}
              StyleClassNames={this.props.StyleClassNames}
              UserFilters={this.props.UserFilters}
              SystemFilters={this.props.SystemFilters}
              NamedFilters={this.props.NamedFilters}
              ColumnCategories={this.props.ColumnCategories}
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
      </Flex>
    );
  }

  onNew() {
    this.setState({
      EditedAdaptableObject: ObjectFactory.CreateEmptyFormatColumn(),
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.New,
    });
  }

  onNewFromColumn(formatColumn: FormatColumn) {
    let clonedObject: FormatColumn = Helper.cloneObject(formatColumn);
    this.setState({
      EditedAdaptableObject: clonedObject,
      WizardStatus: WizardStatus.New,
      WizardStartIndex: 1,
    });
  }

  onEdit(formatColumn: FormatColumn) {
    let clonedObject: FormatColumn = Helper.cloneObject(formatColumn);
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
    let formatColumn = this.state.EditedAdaptableObject as FormatColumn;
    if (this.state.WizardStatus == WizardStatus.Edit) {
      this.props.onEditFormatColumn(formatColumn);
    } else {
      this.props.onAddFormatColumn(formatColumn);
    }
    this.setState({ EditedAdaptableObject: null, WizardStartIndex: 0 });
    this.shouldClosePopupOnFinishWizard = false;
  }
  canFinishWizard() {
    let formatColumn = this.state.EditedAdaptableObject as FormatColumn;
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

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableBlotterState>>) {
  return {
    onAddFormatColumn: (formatColumn: FormatColumn) =>
      dispatch(FormatColumnRedux.FormatColumnAdd(formatColumn)),
    onEditFormatColumn: (formatColumn: FormatColumn) =>
      dispatch(FormatColumnRedux.FormatColumnEdit(formatColumn)),
    onShare: (entity: AdaptableObject) =>
      dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.FormatColumnStrategyId)),
  };
}

export let FormatColumnPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(FormatColumnPopupComponent);
