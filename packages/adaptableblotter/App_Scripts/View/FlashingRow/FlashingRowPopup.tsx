import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
//import * as FlashingRowRedux from '../../Redux/ActionsReducers/FlashingRowRedux';

import { DataType, SortOrder } from '../../PredefinedConfig/Common/Enums';
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { IColItem } from '../UIInterfaces';

import { FlashingCell } from '../../PredefinedConfig/RunTimeState/FlashingCellState';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { FlashingCellState } from '../../PredefinedConfig/RunTimeState/FlashingCellState';
import { CalculatedColumn } from '../../PredefinedConfig/RunTimeState/CalculatedColumnState';
import Checkbox from '../../components/CheckBox';
import { Flex, Box } from 'rebass';
//import { FlashingRowState } from '../../PredefinedConfig/RunTimeState/FlashingRowState';
import Radio from '../../components/Radio';

interface FlashingRowPopupProps extends StrategyViewPopupProps<FlashingRowPopupComponent> {
  //  FlashingRow: FlashingRowState;
  //  onEnableFlashingRow: () => FlashingRowRedux.FlashingRowEnableAction;
  //  onDisableFlashingRow: () => FlashingRowRedux.FlashingRowDisableAction;
}

class FlashingRowPopupComponent extends React.Component<FlashingRowPopupProps, {}> {
  render() {
    let infoBody: any[] = [
      'Make numeric cells flash briefly as their value changes',
      <br />,
      <br />,
      "Click the 'Live' checkbox to turn on flashing for a particular column; or the 'All Columns' checkbox to turn on flashing for all Columns",
      <br />,
      <br />,
      'Defaults are Green for positive change, Red for negative change and a Duration of 0.5 seconds, but these can be amended for each column.',
    ];

    let flashingCellDurations: number[] = [250, 500, 750, 1000];

    let setAllOption = (
      <Box>
        <Radio
          onChange={() => this.onEnableFlashing()}
          //   checked={this.props.FlashingRow.EnableFlashingRows}
        >
          Enabled
        </Radio>
        <Radio
          onChange={() => this.onDisableFlashing()}
          //   checked={!this.props.FlashingRow.EnableFlashingRows}
        >
          Disabled
        </Radio>
      </Box>
    );

    return (
      <Flex flex={1} flexDirection="column">
        {setAllOption}
      </Flex>
    );
  }

  onEnableFlashing() {
    //  this.props.onEnableFlashingRow();
  }

  onDisableFlashing() {
    //   this.props.onDisableFlashingRow();
  }
}

function mapStateToProps(state: AdaptableBlotterState) {
  return {
    //  FlashingRow: state.FlashingRow,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableBlotterState>>) {
  return {
    //  onEnableFlashingRow: () => dispatch(FlashingRowRedux.FlashingRowEnable()),
    //  onDisableFlashingRow: () => dispatch(FlashingRowRedux.FlashingRowDisable()),
  };
}

export let FlashingRowPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(FlashingRowPopupComponent);
