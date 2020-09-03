import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
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
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';

interface FormatColumnPopupProps extends StrategyViewPopupProps<FormatColumnPopupComponent> {
  FormatColumns: Array<FormatColumn>;
  StyleClassNames: string[];
  onAddFormatColumn: (formatColumn: FormatColumn) => FormatColumnRedux.FormatColumnAddAction;
  onEditFormatColumn: (formatColumn: FormatColumn) => FormatColumnRedux.FormatColumnEditAction;
  onShare: (
    entity: AdaptableObject,
    description: string
  ) => TeamSharingRedux.TeamSharingShareAction;
}

class FormatColumnPopupComponent extends React.Component<
  FormatColumnPopupProps,
  EditableConfigEntityState
> {
  constructor(props: FormatColumnPopupProps) {
    super(props);
    this.state = {
      editedAdaptableObject: null,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.None,
    };
  }
  shouldClosePopupOnFinishWizard: boolean = false;
  componentDidMount() {
    if (this.props.popupParams) {
      if (this.props.popupParams.action && this.props.popupParams.column) {
        let column: AdaptableColumn = this.props.popupParams.column;
        if (this.props.popupParams.action == 'New') {
          let newFormatColumn = ObjectFactory.CreateEmptyFormatColumn();
          newFormatColumn.Scope = {
            ColumnIds: [column.ColumnId],
          };
          this.onNewFromColumn(newFormatColumn);
        }
        if (this.props.popupParams.action == 'Edit') {
          // have to hope we get the most suitable / current one
          let editFormatColumn = this.props.api.formatColumnApi.getFormatColumnForColumn(column);
          this.onEdit(editFormatColumn);
        }
      }
      this.shouldClosePopupOnFinishWizard =
        this.props.popupParams.source && this.props.popupParams.source == 'ColumnMenu';
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
      { Content: 'Column', Size: 3 },
      { Content: 'Style', Size: 4 },
      { Content: 'Format', Size: 3 },
      { Content: '', Size: 2 },
    ];
    let FormatColumns = this.props.FormatColumns.map((formatColumn: FormatColumn, index) => {
      return (
        <FormatColumnEntityRow
          key={formatColumn.Uuid}
          colItems={colItems}
          api={this.props.api}
          adaptableObject={formatColumn}
          onEdit={() => this.onEdit(formatColumn)}
          onShare={description => this.props.onShare(formatColumn, description)}
          teamSharingActivated={this.props.teamSharingActivated}
          onDeleteConfirm={FormatColumnRedux.FormatColumnDelete(formatColumn)}
          accessLevel={this.props.accessLevel}
        />
      );
    });

    let newButton = (
      <ButtonNew
        onClick={() => this.onNew()}
        tooltip="Create Format Column"
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
          headerText={StrategyConstants.FormatColumnStrategyFriendlyName}
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

          {this.state.editedAdaptableObject != null && (
            <FormatColumnWizard
              editedAdaptableObject={this.state.editedAdaptableObject as FormatColumn}
              modalContainer={this.props.modalContainer}
              api={this.props.api}
              StyleClassNames={this.props.StyleClassNames}
              configEntities={this.props.FormatColumns}
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
      editedAdaptableObject: ObjectFactory.CreateEmptyFormatColumn(),
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.New,
    });
  }

  onNewFromColumn(formatColumn: FormatColumn) {
    let clonedObject: FormatColumn = Helper.cloneObject(formatColumn);
    this.setState({
      editedAdaptableObject: clonedObject,
      wizardStatus: WizardStatus.New,
      wizardStartIndex: 1,
    });
  }

  onEdit(formatColumn: FormatColumn) {
    let clonedObject: FormatColumn = Helper.cloneObject(formatColumn);
    this.setState({
      editedAdaptableObject: clonedObject,
      wizardStartIndex: 1,
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
    if (this.shouldClosePopupOnFinishWizard) {
      this.props.onClosePopup();
    }
  }

  onFinishWizard() {
    let formatColumn = this.state.editedAdaptableObject as FormatColumn;
    if (this.state.wizardStatus == WizardStatus.Edit) {
      this.props.onEditFormatColumn(formatColumn);
    } else {
      this.props.onAddFormatColumn(formatColumn);
    }
    this.setState({ editedAdaptableObject: null, wizardStartIndex: 0 });
  }

  canFinishWizard() {
    let formatColumn = this.state.editedAdaptableObject as FormatColumn;
    if (formatColumn.Scope == undefined || formatColumn.Scope == null) {
      return false;
    }

    // cannot complete if its an empty style and no format and no alignment
    // you need at least one
    if (
      formatColumn.Style &&
      UIHelper.IsEmptyStyle(formatColumn.Style) &&
      formatColumn.DisplayFormat === undefined &&
      formatColumn.CellAlignment == undefined
    ) {
      return false;
    }

    return true;
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any): Partial<FormatColumnPopupProps> {
  return {
    FormatColumns: state.FormatColumn.FormatColumns,
    StyleClassNames: state.UserInterface.StyleClassNames,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<FormatColumnPopupProps> {
  return {
    onAddFormatColumn: (formatColumn: FormatColumn) =>
      dispatch(FormatColumnRedux.FormatColumnAdd(formatColumn)),
    onEditFormatColumn: (formatColumn: FormatColumn) =>
      dispatch(FormatColumnRedux.FormatColumnEdit(formatColumn)),
    onShare: (entity: AdaptableObject, description: string) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(
          entity,
          StrategyConstants.FormatColumnStrategyId,
          description
        )
      ),
  };
}

export let FormatColumnPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(FormatColumnPopupComponent);
