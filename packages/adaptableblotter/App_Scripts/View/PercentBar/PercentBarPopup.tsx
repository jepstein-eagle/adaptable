import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { HelpBlock } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
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
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { IAdaptableBlotterObject } from '../../PredefinedConfig/IAdaptableBlotterObject';
import { PercentBar } from '../../PredefinedConfig/IUserState/PercentBarState';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { DistinctCriteriaPairValue } from '../../PredefinedConfig/Common/Enums';

interface PercentBarPopupProps extends StrategyViewPopupProps<PercentBarPopupComponent> {
  PercentBars: PercentBar[];
  onAddPercentBar: (percentBar: PercentBar) => PercentBarRedux.PercentBarAddAction;
  onEditPercentBar: (percentBar: PercentBar) => PercentBarRedux.PercentBarEditAction;
  onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}

class PercentBarPopupComponent extends React.Component<
  PercentBarPopupProps,
  EditableConfigEntityState
> {
  constructor(props: PercentBarPopupProps) {
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
        let columnId: string = arrayParams[1];
        let distinctColumnsValues: number[] = this.props.Blotter.getColumnValueDisplayValuePairDistinctList(
          columnId,
          DistinctCriteriaPairValue.RawValue,
          false
        ).map(pair => {
          return pair.RawValue;
        });
        let newPercentRender: PercentBar = ObjectFactory.CreateEmptyPercentBar();
        newPercentRender.ColumnId = columnId;
        newPercentRender.MinValue = Math.min(...distinctColumnsValues);
        newPercentRender.MaxValue = Math.max(...distinctColumnsValues);
        this.onNewFromColumn(newPercentRender);
      }
      if (arrayParams.length == 2 && arrayParams[0] == 'Edit') {
        let editPercentRender = this.props.PercentBars.find(x => x.ColumnId == arrayParams[1]);
        this.onEdit(editPercentRender);
      }
    }
  }

  render() {
    let cssClassName: string = this.props.cssClassName + '__percentBar';
    let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + '__percentBar';

    let infoBody: any[] = [
      'Use Percent Bars to render numeric columns with a coloured bar, the length of which is dependent on the column value',
      <br />,
      <br />,
      'For each Percent Bar you can select the colours and range boundaries.',
    ];

    let colItems: IColItem[] = [
      { Content: 'Column', Size: 2 },
      { Content: 'Min', Size: 2 },
      { Content: 'Max', Size: 2 },
      { Content: 'Positive', Size: 2 },
      { Content: 'Negative', Size: 2 },
      { Content: '', Size: 2 },
    ];

    let PercentBarItems = this.props.PercentBars.map((percentBar: PercentBar, index) => {
      let column = ColumnHelper.getColumnFromId(percentBar.ColumnId, this.props.Columns);
      return (
        <PercentBarEntityRow
          key={percentBar.Uuid}
          cssClassName={cssClassName}
          colItems={colItems}
          AdaptableBlotterObject={percentBar}
          Column={column}
          Columns={this.props.Columns}
          UserFilters={this.props.UserFilters}
          ColorPalette={this.props.ColorPalette}
          onEdit={() => this.onEdit(percentBar)}
          onShare={() => this.props.onShare(percentBar)}
          TeamSharingActivated={this.props.TeamSharingActivated}
          onDeleteConfirm={PercentBarRedux.PercentBarDelete(percentBar)}
          onMinimumValueChanged={(percentBar, minimumValue) =>
            this.onMinimumValueChanged(percentBar, minimumValue)
          }
          onMaximumValueChanged={(percentBar, maximumValue) =>
            this.onMaximumValueChanged(percentBar, maximumValue)
          }
          onPositiveColorChanged={(percentBar, positiveColor) =>
            this.onPositiveColorChanged(percentBar, positiveColor)
          }
          onNegativeColorChanged={(percentBar, negativeColor) =>
            this.onNegativeColorChanged(percentBar, negativeColor)
          }
        />
      );
    });
    let newButton = (
      <ButtonNew
        cssClassName={cssClassName}
        onClick={() => this.onNew()}
        overrideTooltip="Create Percent Bar "
        DisplayMode="Glyph+Text"
        size={'small'}
        AccessLevel={this.props.AccessLevel}
      />
    );

    return (
      <div className={cssClassName}>
        <PanelWithButton
          headerText={StrategyConstants.PercentBarStrategyName}
          bsStyle="primary"
          cssClassName={cssClassName}
          button={newButton}
          glyphicon={StrategyConstants.PercentBarGlyph}
          infoBody={infoBody}
        >
          {PercentBarItems.length > 0 ? (
            <AdaptableObjectCollection
              cssClassName={cssClassName}
              colItems={colItems}
              items={PercentBarItems}
            />
          ) : (
            <div>
              <HelpBlock>Click 'New' to start creating Percent Bars.</HelpBlock>
              <HelpBlock>
                Visualise numeric columns as a bar (positive, negative or both) in order better to
                see their contents.
              </HelpBlock>
            </div>
          )}

          {this.state.EditedAdaptableBlotterObject != null && (
            <PercentBarWizard
              cssClassName={cssWizardClassName}
              EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject as PercentBar}
              ConfigEntities={null}
              Blotter={this.props.Blotter}
              ModalContainer={this.props.ModalContainer}
              Columns={this.props.Columns}
              ColorPalette={this.props.ColorPalette}
              UserFilters={this.props.UserFilters}
              SystemFilters={this.props.SystemFilters}
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

  onMinimumValueChanged(percentBar: PercentBar, minimumValue: number): void {
    let clonedPercentBar: PercentBar = Helper.cloneObject(percentBar);
    clonedPercentBar.MinValue = minimumValue;
    this.props.onEditPercentBar(clonedPercentBar);
  }
  onMaximumValueChanged(percentBar: PercentBar, maximumValue: number): void {
    let clonedPercentBar: PercentBar = Helper.cloneObject(percentBar);
    clonedPercentBar.MaxValue = maximumValue;
    this.props.onEditPercentBar(clonedPercentBar);
  }
  onPositiveColorChanged(percentBar: PercentBar, positiveColor: string): void {
    let clonedPercentBar: PercentBar = Helper.cloneObject(percentBar);
    clonedPercentBar.PositiveColor = positiveColor;
    this.props.onEditPercentBar(clonedPercentBar);
  }
  onNegativeColorChanged(percentBar: PercentBar, negativeColor: string): void {
    let clonedPercentBar: PercentBar = Helper.cloneObject(percentBar);
    clonedPercentBar.NegativeColor = negativeColor;
    this.props.onEditPercentBar(clonedPercentBar);
  }

  onNewFromColumn(percentBar: PercentBar) {
    this.setState({
      EditedAdaptableBlotterObject: percentBar,
      WizardStatus: WizardStatus.New,
      WizardStartIndex: 1,
    });
  }

  onNew() {
    this.setState({
      EditedAdaptableBlotterObject: ObjectFactory.CreateEmptyPercentBar(),
      WizardStatus: WizardStatus.New,
      WizardStartIndex: 0,
    });
  }

  onEdit(percentBar: PercentBar) {
    let clonedObject: PercentBar = Helper.cloneObject(percentBar);
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
    let percentBar: PercentBar = Helper.cloneObject(this.state.EditedAdaptableBlotterObject);
    if (this.state.WizardStatus == WizardStatus.Edit) {
      this.props.onEditPercentBar(percentBar);
    } else {
      this.props.onAddPercentBar(percentBar);
    }
    this.setState({
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard(): boolean {
    let percentBar = this.state.EditedAdaptableBlotterObject as PercentBar;
    if (
      StringExtensions.IsNullOrEmpty(percentBar.ColumnId) ||
      StringExtensions.IsNullOrEmpty(percentBar.PositiveColor) ||
      StringExtensions.IsNullOrEmpty(percentBar.NegativeColor)
    ) {
      return false;
    }
    // we are not currently checking for columns - ok? or problem?
    return true;
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    PercentBars: state.PercentBar.PercentBars,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onAddPercentBar: (percentBar: PercentBar) =>
      dispatch(PercentBarRedux.PercentBarAdd(percentBar)),
    onEditPercentBar: (percentBar: PercentBar) =>
      dispatch(PercentBarRedux.PercentBarEdit(percentBar)),
    onShare: (entity: IAdaptableBlotterObject) =>
      dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.PercentBarStrategyId)),
  };
}

export let PercentBarPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(PercentBarPopupComponent);
