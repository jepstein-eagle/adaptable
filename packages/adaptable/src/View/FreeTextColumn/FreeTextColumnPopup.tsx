import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as FreeTextColumnRedux from '../../Redux/ActionsReducers/FreeTextColumnRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { FreeTextColumnEntityRow } from './FreeTextColumnEntityRow';
import { FreeTextColumnWizard } from './Wizard/FreeTextColumnWizard';
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
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { FreeTextColumn } from '../../PredefinedConfig/FreeTextColumnState';
import EmptyContent from '../../components/EmptyContent';
import { Flex } from 'rebass';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';

interface FreeTextColumnPopupProps extends StrategyViewPopupProps<FreeTextColumnPopupComponent> {
  FreeTextColumns: Array<FreeTextColumn>;
  onAddFreeTextColumn: (
    FreeTextColumn: FreeTextColumn
  ) => FreeTextColumnRedux.FreeTextColumnAddAction;
  onEditFreeTextColumn: (
    FreeTextColumn: FreeTextColumn
  ) => FreeTextColumnRedux.FreeTextColumnEditAction;
  onShare: (
    entity: AdaptableObject,
    description: string
  ) => TeamSharingRedux.TeamSharingShareAction;
}

class FreeTextColumnPopupComponent extends React.Component<
  FreeTextColumnPopupProps,
  EditableConfigEntityState
> {
  constructor(props: FreeTextColumnPopupProps) {
    super(props);
    this.state = {
      editedAdaptableObject: null,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.None,
    };
  }

  componentDidMount() {
    if (this.props.popupParams) {
      if (this.props.popupParams.action && this.props.popupParams.column) {
        if (this.props.popupParams.action == 'Edit') {
          let editFreeTextColumn = this.props.FreeTextColumns.find(
            x => x.ColumnId == this.props.popupParams.column.ColumnId
          );
          let index = this.props.FreeTextColumns.indexOf(editFreeTextColumn);
          this.onEdit(editFreeTextColumn);
        }
      }
    }
  }

  render() {
    let infoBody: any[] = [
      'A FreeText Column is one where you can insert any values you wish (e.g.comments).',
      <br />,
      <br />,
      'These values are stored with your settings and not with the rest of the data in the grid.',
    ];

    let colItems: IColItem[] = [
      { Content: 'Column Id', Size: 3 },
      { Content: 'Column Name', Size: 3 },
      { Content: 'Default Value', Size: 4 },
      { Content: 'No. Stored Value', Size: 3 },
      { Content: '', Size: 2 },
    ];
    let freeTextColumns = this.props.FreeTextColumns.map(
      (FreeTextColumn: FreeTextColumn, index) => {
        return (
          <FreeTextColumnEntityRow
            key={FreeTextColumn.Uuid}
            colItems={colItems}
            api={this.props.api}
            adaptableObject={FreeTextColumn}
            onEdit={() => this.onEdit(FreeTextColumn)}
            onShare={description => this.props.onShare(FreeTextColumn, description)}
            teamSharingActivated={this.props.teamSharingActivated}
            onDeleteConfirm={FreeTextColumnRedux.FreeTextColumnDelete(FreeTextColumn)}
            accessLevel={this.props.accessLevel}
          />
        );
      }
    );

    let newButton = (
      <ButtonNew
        onClick={() => this.onNew()}
        tooltip="Create FreeText Column"
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
          headerText={StrategyConstants.FreeTextColumnStrategyFriendlyName}
          button={newButton}
          bodyProps={{ padding: 0 }}
          glyphicon={StrategyConstants.FreeTextColumnGlyph}
          infoBody={infoBody}
        >
          {this.props.FreeTextColumns.length == 0 ? (
            <EmptyContent>Click 'New' to create a new Free Text Column.</EmptyContent>
          ) : (
            <AdaptableObjectCollection colItems={colItems} items={freeTextColumns} />
          )}

          {this.state.editedAdaptableObject != null && (
            <FreeTextColumnWizard
              editedAdaptableObject={this.state.editedAdaptableObject as FreeTextColumn}
              modalContainer={this.props.modalContainer}
              api={this.props.api}
              configEntities={this.props.FreeTextColumns}
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
      editedAdaptableObject: ObjectFactory.CreateEmptyFreeTextColumn(),
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.New,
    });
  }

  onEdit(FreeTextColumn: FreeTextColumn) {
    let clonedObject: FreeTextColumn = Helper.cloneObject(FreeTextColumn);
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
    let freeTextColumn = this.state.editedAdaptableObject as FreeTextColumn;
    if (this.state.wizardStatus == WizardStatus.Edit) {
      this.props.onEditFreeTextColumn(freeTextColumn);
    } else {
      this.props.onAddFreeTextColumn(freeTextColumn);
    }
    this.setState({
      editedAdaptableObject: null,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard() {
    let freeTextColumn = this.state.editedAdaptableObject as FreeTextColumn;
    return StringExtensions.IsNotNullOrEmpty(freeTextColumn.ColumnId);
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any): Partial<FreeTextColumnPopupProps> {
  return {
    FreeTextColumns: state.FreeTextColumn.FreeTextColumns,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<FreeTextColumnPopupProps> {
  return {
    onAddFreeTextColumn: (FreeTextColumn: FreeTextColumn) =>
      dispatch(FreeTextColumnRedux.FreeTextColumnAdd(FreeTextColumn)),
    onEditFreeTextColumn: (FreeTextColumn: FreeTextColumn) =>
      dispatch(FreeTextColumnRedux.FreeTextColumnEdit(FreeTextColumn)),
    onShare: (entity: AdaptableObject, description: string) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(
          entity,
          StrategyConstants.FreeTextColumnStrategyId,
          description
        )
      ),
  };
}

export let FreeTextColumnPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(FreeTextColumnPopupComponent);
