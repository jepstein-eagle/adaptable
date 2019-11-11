import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import * as UpdatedRowRedux from '../../Redux/ActionsReducers/UpdatedRowRedux';
import Checkbox from '../../components/CheckBox';
import { Flex, Box, Text } from 'rebass';
import { UpdatedRowState } from '../../PredefinedConfig/UpdatedRowState';
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import HelpBlock from '../../components/HelpBlock';
import { ColorPicker } from '../ColorPicker';
import Input from '../../components/Input';
import StringExtensions from '../../Utilities/Extensions/StringExtensions';

interface UpdatedRowPopupProps extends StrategyViewPopupProps<UpdatedRowPopupComponent> {
  UpdatedRowState: UpdatedRowState;
  onEnableDisableUpdatedRow: (
    shouldEnable: boolean
  ) => UpdatedRowRedux.UpdatedRowEnableDisableAction;
  onEnableDisableJumpToRow: (shouldEnable: boolean) => UpdatedRowRedux.JumpToRowEnableDisableAction;
  onSetUpColor: (upColor: string) => UpdatedRowRedux.UpColorSetAction;
  onSetDownColor: (downColor: string) => UpdatedRowRedux.DownColorSetAction;
  onSetNeutralColor: (neutralColor: string) => UpdatedRowRedux.NeutralColorSetAction;
  onSetMaxItems: (maxItems: number) => UpdatedRowRedux.MaxItemsSetAction;
}

interface UpdatedRowPopupState {
  EnableUpdatedRow: boolean | undefined;
  JumpToRow: boolean | undefined;
  UpColor: string;
  DownColor: string;
  NeutralColor: string;
  MaxItems: number;
}

class UpdatedRowPopupComponent extends React.Component<UpdatedRowPopupProps, UpdatedRowPopupState> {
  constructor(props: UpdatedRowPopupProps) {
    super(props);
    this.state = {
      EnableUpdatedRow: this.props.UpdatedRowState.EnableUpdatedRow,
      JumpToRow: this.props.UpdatedRowState.JumpToRow,
      UpColor: this.props.UpdatedRowState.UpColor,
      DownColor: this.props.UpdatedRowState.DownColor,
      NeutralColor: this.props.UpdatedRowState.NeutralColor,
      MaxItems: this.props.UpdatedRowState.MaxUpdatedRowsInStore,
    };
  }

  render() {
    let infoBody: any[] = [
      'Highlight updated rows by selecting the back color (depending on direction)',
      <br />,
      <br />,
      "Choose whether the grid should 'jump' to the row that has changed.",
      <br />,
      <br />,
      'Clear any updated rows through the Context Menu.',
    ];

    let enableUpdatedRowOption = (
      <Box>
        <Checkbox
          marginLeft={2}
          onChange={() => this.onenableUpdatedRowChanged()}
          checked={this.state.EnableUpdatedRow}
        >
          Enable Updated Row
        </Checkbox>
      </Box>
    );

    let enableJumpToRowOption = (
      <Box>
        <Checkbox
          marginLeft={2}
          onChange={() => this.onEnableJumpToRowChanged()}
          checked={this.state.JumpToRow}
        >
          Jump to Updated Row in Grid (after update)
        </Checkbox>
      </Box>
    );

    return (
      <Flex flex={1} flexDirection="column">
        <PanelWithImage
          variant="primary"
          header={StrategyConstants.UpdatedRowStrategyName}
          glyphicon={StrategyConstants.UpdatedRowGlyph}
          infoBody={infoBody}
          bodyProps={{ padding: 0 }}
        >
          {enableUpdatedRowOption}
          {enableJumpToRowOption}

          <Flex flexDirection="column" margin={1}>
            <HelpBlock>
              Select the back colour for an updated row. Select colours for when the change in value
              is <b>Up</b>, <b>Down</b> and <b>non-directional</b>.
            </HelpBlock>

            <Flex flexDirection="row" alignItems="center" margin={2}>
              <Text marginRight={4}>Up Direction Change Color:</Text>

              <ColorPicker
                ColorPalette={this.props.ColorPalette}
                value={this.state.UpColor}
                onChange={x => this.onUpColorSelectChange(x)}
              />
            </Flex>

            <Flex flexDirection="row" alignItems="center" margin={2}>
              <Text marginRight={3}>Down Direction Change Color:</Text>

              <ColorPicker
                ColorPalette={this.props.ColorPalette}
                value={this.state.DownColor}
                onChange={x => this.onDownColorSelectChange(x)}
              />
            </Flex>
            <Flex flexDirection="row" alignItems="center" margin={2}>
              <Text marginRight={4}>No Direction Change Color:</Text>

              <ColorPicker
                ColorPalette={this.props.ColorPalette}
                value={this.state.NeutralColor}
                onChange={x => this.onNeutralColorSelectChange(x)}
              />
            </Flex>
            <HelpBlock>
              Set the maximum number of updated rows that can be displayed at any time. Leave empty
              to be infinite.
            </HelpBlock>
            <Flex flexDirection="row" alignItems="center" margin={2}>
              <Text style={{ flex: 2 }} marginRight={2}>
                Max Updated Rows:
              </Text>

              <Flex flex={7} flexDirection="row" alignItems="center">
                <Input
                  style={{ flex: 1 }}
                  type="number"
                  placeholder="Enter Number"
                  onChange={(x: any) => this.onMaxItemsChanged(x)}
                  value={this.state.MaxItems}
                  marginRight={3}
                />
              </Flex>
            </Flex>
          </Flex>
        </PanelWithImage>
      </Flex>
    );
  }

  private onenableUpdatedRowChanged() {
    let newEnabledValue = !this.state.EnableUpdatedRow;
    this.setState({ EnableUpdatedRow: newEnabledValue } as UpdatedRowPopupState);
    this.props.onEnableDisableUpdatedRow(newEnabledValue);
  }

  private onEnableJumpToRowChanged() {
    let newEnabledValue = !this.state.JumpToRow;
    this.setState({ JumpToRow: newEnabledValue } as UpdatedRowPopupState);
    this.props.onEnableDisableJumpToRow(newEnabledValue);
  }

  private onUpColorSelectChange(event: React.FormEvent<ColorPicker>) {
    let e = event.target as HTMLInputElement;
    let upColor = e.value;
    this.setState({ UpColor: upColor } as UpdatedRowPopupState);
    this.props.onSetUpColor(upColor);
  }

  private onDownColorSelectChange(event: React.FormEvent<ColorPicker>) {
    let e = event.target as HTMLInputElement;
    let downColor = e.value;
    this.setState({ DownColor: downColor } as UpdatedRowPopupState);
    this.props.onSetDownColor(downColor);
  }

  private onNeutralColorSelectChange(event: React.FormEvent<ColorPicker>) {
    let e = event.target as HTMLInputElement;
    let neutralColor = e.value;
    this.setState({ NeutralColor: neutralColor } as UpdatedRowPopupState);
    this.props.onSetNeutralColor(neutralColor);
  }

  private onMaxItemsChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    let maxItems = StringExtensions.IsNullOrEmpty(e.value) ? Infinity : parseInt(e.value);
    console.log(maxItems);
    this.setState({ MaxItems: maxItems } as UpdatedRowPopupState);
    this.props.onSetMaxItems(maxItems);
  }
}

function mapStateToProps(state: AdaptableBlotterState) {
  return {
    UpdatedRowState: state.UpdatedRow,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableBlotterState>>) {
  return {
    onEnableDisableUpdatedRow: (shouldEnable: boolean) =>
      dispatch(UpdatedRowRedux.UpdatedRowEnableDisable(shouldEnable)),
    onEnableDisableJumpToRow: (shouldEnable: boolean) =>
      dispatch(UpdatedRowRedux.JumpToRowEnableDisable(shouldEnable)),
    onSetUpColor: (upColor: string) => dispatch(UpdatedRowRedux.UpColorSet(upColor)),
    onSetDownColor: (downColor: string) => dispatch(UpdatedRowRedux.DownColorSet(downColor)),
    onSetNeutralColor: (neutralColor: string) =>
      dispatch(UpdatedRowRedux.NeutralColorSet(neutralColor)),
    onSetMaxItems: (maxItems: number) => dispatch(UpdatedRowRedux.MaxItemsSet(maxItems)),
  };
}

export let UpdatedRowPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdatedRowPopupComponent);
