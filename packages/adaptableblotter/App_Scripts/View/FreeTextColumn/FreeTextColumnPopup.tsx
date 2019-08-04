import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
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
import { AdaptableBlotterObject } from '../../PredefinedConfig/AdaptableBlotterObject';
import { FreeTextColumn } from '../../PredefinedConfig/RunTimeState/FreeTextColumnState';
import EmptyContent from '../../components/EmptyContent';
import { Flex } from 'rebass';

interface FreeTextColumnPopupProps extends StrategyViewPopupProps<FreeTextColumnPopupComponent> {
  FreeTextColumns: Array<FreeTextColumn>;
  onAddFreeTextColumn: (
    FreeTextColumn: FreeTextColumn
  ) => FreeTextColumnRedux.FreeTextColumnAddAction;
  onEditFreeTextColumn: (
    FreeTextColumn: FreeTextColumn
  ) => FreeTextColumnRedux.FreeTextColumnEditAction;
  onShare: (entity: AdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}

class FreeTextColumnPopupComponent extends React.Component<
  FreeTextColumnPopupProps,
  EditableConfigEntityState
> {
  constructor(props: FreeTextColumnPopupProps) {
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
      if (arrayParams.length == 2 && arrayParams[0] == 'Edit') {
        let editFreeTextColumn = this.props.FreeTextColumns.find(x => x.ColumnId == arrayParams[1]);
        let index = this.props.FreeTextColumns.indexOf(editFreeTextColumn);
        this.onEdit(editFreeTextColumn);
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
      { Content: 'Column', Size: 3 },
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
            AdaptableBlotterObject={FreeTextColumn}
            Columns={this.props.Columns}
            UserFilters={this.props.UserFilters}
            onEdit={() => this.onEdit(FreeTextColumn)}
            onShare={() => this.props.onShare(FreeTextColumn)}
            TeamSharingActivated={this.props.TeamSharingActivated}
            onDeleteConfirm={FreeTextColumnRedux.FreeTextColumnDelete(FreeTextColumn)}
            AccessLevel={this.props.AccessLevel}
          />
        );
      }
    );

    let newButton = (
      <ButtonNew
        onClick={() => this.onNew()}
        tooltip="Create FreeText Column"
        AccessLevel={this.props.AccessLevel}
      />
    );

    return (
      <Flex flex={1} flexDirection="column">
        <PanelWithButton
          headerText={StrategyConstants.FreeTextColumnStrategyName}
          button={newButton}
          bodyProps={{ padding: 0 }}
          glyphicon={StrategyConstants.FreeTextColumnGlyph}
          infoBody={infoBody}
        >
          {this.props.FreeTextColumns.length == 0 ? (
            <EmptyContent>Click 'New' to create a new column FreeText.</EmptyContent>
          ) : (
            <AdaptableObjectCollection colItems={colItems} items={freeTextColumns} />
          )}

          {this.state.EditedAdaptableBlotterObject != null && (
            <FreeTextColumnWizard
              EditedAdaptableBlotterObject={
                this.state.EditedAdaptableBlotterObject as FreeTextColumn
              }
              ModalContainer={this.props.ModalContainer}
              UserFilters={this.props.UserFilters}
              SystemFilters={this.props.SystemFilters}
              NamedFilters={this.props.NamedFilters}
              ColumnCategories={this.props.ColumnCategories}
              Columns={this.props.Columns}
              Blotter={this.props.Blotter}
              ConfigEntities={this.props.FreeTextColumns}
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
      EditedAdaptableBlotterObject: ObjectFactory.CreateEmptyFreeTextColumn(),
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.New,
    });
  }

  onEdit(FreeTextColumn: FreeTextColumn) {
    let clonedObject: FreeTextColumn = Helper.cloneObject(FreeTextColumn);
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
    let freeTextColumn = this.state.EditedAdaptableBlotterObject as FreeTextColumn;
    if (this.state.WizardStatus == WizardStatus.Edit) {
      this.props.onEditFreeTextColumn(freeTextColumn);
    } else {
      this.props.onAddFreeTextColumn(freeTextColumn);
    }
    this.setState({
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard() {
    let freeTextColumn = this.state.EditedAdaptableBlotterObject as FreeTextColumn;
    return StringExtensions.IsNotNullOrEmpty(freeTextColumn.ColumnId);
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    FreeTextColumns: state.FreeTextColumn.FreeTextColumns,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onAddFreeTextColumn: (FreeTextColumn: FreeTextColumn) =>
      dispatch(FreeTextColumnRedux.FreeTextColumnAdd(FreeTextColumn)),
    onEditFreeTextColumn: (FreeTextColumn: FreeTextColumn) =>
      dispatch(FreeTextColumnRedux.FreeTextColumnEdit(FreeTextColumn)),
    onShare: (entity: AdaptableBlotterObject) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.FreeTextColumnStrategyId)
      ),
  };
}

export let FreeTextColumnPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(FreeTextColumnPopupComponent);
