import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as PercentBarRedux from '../../Redux/ActionsReducers/PercentBarRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { Helper } from '../../Utilities/Helpers/Helper';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { PercentBarWizard } from './Wizard/PercentBarWizard';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { PercentBarEntityRow } from './PercentBarEntityRow';
import {
  EditableConfigEntityState,
  WizardStatus,
} from '../Components/SharedProps/EditableConfigEntityState';
import { IColItem } from '../UIInterfaces';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { PercentBar } from '../../PredefinedConfig/PercentBarState';
import EmptyContent from '../../components/EmptyContent';
import { Flex } from 'rebass';
import { getHexForName, RED, DARK_GREEN } from '../UIHelper';

interface PercentBarPopupProps extends StrategyViewPopupProps<PercentBarPopupComponent> {
  PercentBars: PercentBar[];
  onAddPercentBar: (percentBar: PercentBar) => PercentBarRedux.PercentBarAddAction;
  onEditPercentBar: (percentBar: PercentBar) => PercentBarRedux.PercentBarEditAction;
  onShare: (
    entity: AdaptableObject,
    description: string
  ) => TeamSharingRedux.TeamSharingShareAction;
}

class PercentBarPopupComponent extends React.Component<
  PercentBarPopupProps,
  EditableConfigEntityState
> {
  constructor(props: PercentBarPopupProps) {
    super(props);
    this.state = {
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    };
  }
  shouldClosePopupOnFinishWizard: boolean = false;
  componentDidMount() {
    if (this.props.popupParams) {
      if (this.props.popupParams.action && this.props.popupParams.column) {
        let columnId: string = this.props.popupParams.column.ColumnId;
        if (this.props.popupParams.action == 'New') {
          let distinctColumnsValues: number[] = this.props.api.columnApi.getDistinctRawValuesForColumn(
            columnId
          );

          let newPercentRender: PercentBar = ObjectFactory.CreateEmptyPercentBar();
          newPercentRender.ColumnId = columnId;

          const minValue = Math.min(...distinctColumnsValues);
          const maxValue = Math.max(...distinctColumnsValues);

          if (minValue < 0) {
            newPercentRender.Ranges.push({
              Min: minValue,
              Max: 0,
              Color: getHexForName(RED),
            });
          }

          if (maxValue > 0) {
            newPercentRender.Ranges.push({
              Min: 0,
              Max: maxValue,
              Color: getHexForName(DARK_GREEN),
            });
          }

          this.onNewFromColumn(newPercentRender);
        }
        if (this.props.popupParams.action == 'Edit') {
          let editPercentRender = this.props.PercentBars.find(x => x.ColumnId == columnId);
          this.onEdit(editPercentRender);
        }
      }
      this.shouldClosePopupOnFinishWizard =
        this.props.popupParams.source && this.props.popupParams.source == 'ColumnMenu';
    }
  }

  render() {
    let infoBody: any[] = [
      'Use Percent Bars to render numeric columns with a coloured bar, the length of which is dependent on the column value',
      <br />,
      <br />,
      'For each Percent Bar you can select the colours and range boundaries.',
    ];

    let colItems: IColItem[] = [
      { Content: 'Column', Size: 10 },
      { Content: '', Size: 2 },
    ];

    let PercentBarItems = this.props.PercentBars.map((percentBar: PercentBar) => {
      let column = this.props.api.columnApi.getColumnFromId(percentBar.ColumnId);
      return (
        <PercentBarEntityRow
          key={percentBar.Uuid}
          colItems={colItems}
          api={this.props.api}
          AdaptableObject={percentBar}
          Column={column}
          onEdit={() => this.onEdit(percentBar)}
          onShare={description => this.props.onShare(percentBar, description)}
          TeamSharingActivated={this.props.teamSharingActivated}
          onDeleteConfirm={PercentBarRedux.PercentBarDelete(percentBar)}
          AccessLevel={this.props.accessLevel}
        />
      );
    });
    let newButton = (
      <ButtonNew
        onClick={() => this.onNew()}
        tooltip="Create Percent Bar "
        AccessLevel={this.props.accessLevel}
      />
    );

    return (
      <Flex flex={1} flexDirection="column">
        <PanelWithButton
          headerText={StrategyConstants.PercentBarStrategyFriendlyName}
          style={{ height: '100%' }}
          button={newButton}
          glyphicon={StrategyConstants.PercentBarGlyph}
          infoBody={infoBody}
          bodyProps={{ padding: 0 }}
        >
          {PercentBarItems.length > 0 ? (
            <AdaptableObjectCollection colItems={colItems} items={PercentBarItems} />
          ) : (
            <EmptyContent>
              <p>Click 'New' to start creating Percent Bars.</p>
              <p>
                Visualise numeric columns as a bar (positive, negative or both) in order better to
                see their contents.
              </p>
            </EmptyContent>
          )}

          {this.state.EditedAdaptableObject != null && (
            <PercentBarWizard
              editedAdaptableObject={this.state.EditedAdaptableObject as PercentBar}
              configEntities={null}
              api={this.props.api}
              modalContainer={this.props.modalContainer}
              wizardStartIndex={this.state.WizardStartIndex}
              onCloseWizard={() => this.onCloseWizard()}
              onFinishWizard={() => this.onFinishWizard()}
              canFinishWizard={() => this.canFinishWizard()}
            />
          )}
        </PanelWithButton>
      </Flex>
    );
  }

  onNewFromColumn(percentBar: PercentBar) {
    this.setState({
      EditedAdaptableObject: percentBar,
      WizardStatus: WizardStatus.New,
      WizardStartIndex: 1,
    });
  }

  onNew() {
    this.setState({
      EditedAdaptableObject: ObjectFactory.CreateEmptyPercentBar(),
      WizardStatus: WizardStatus.New,
      WizardStartIndex: 0,
    });
  }

  onEdit(percentBar: PercentBar) {
    let clonedObject: PercentBar = Helper.cloneObject(percentBar);
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
    let percentBar: PercentBar = Helper.cloneObject(this.state.EditedAdaptableObject);
    if (this.state.WizardStatus == WizardStatus.Edit) {
      this.props.onEditPercentBar(percentBar);
    } else {
      this.props.onAddPercentBar(percentBar);
    }
    this.setState({
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard(): boolean {
    let percentBar = this.state.EditedAdaptableObject as PercentBar;
    if (StringExtensions.IsNullOrEmpty(percentBar.ColumnId)) {
      return false;
    }
    if (percentBar.Ranges.length === 0) {
      return false;
    }
    // we are not currently checking for columns - ok? or problem?
    return true;
  }
}

function mapStateToProps(state: AdaptableState): Partial<PercentBarPopupProps> {
  return {
    PercentBars: state.PercentBar.PercentBars,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<PercentBarPopupProps> {
  return {
    onAddPercentBar: (percentBar: PercentBar) =>
      dispatch(PercentBarRedux.PercentBarAdd(percentBar)),
    onEditPercentBar: (percentBar: PercentBar) =>
      dispatch(PercentBarRedux.PercentBarEdit(percentBar)),
    onShare: (entity: AdaptableObject, description: string) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(
          entity,
          StrategyConstants.PercentBarStrategyId,
          description
        )
      ),
  };
}

export let PercentBarPopup = connect(mapStateToProps, mapDispatchToProps)(PercentBarPopupComponent);
