import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { DualListBoxEditor } from '../Components/ListBox/DualListBoxEditor';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { IMasterChildren } from '../../Utilities/Interface/IMasterChildren';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { ColumnCategory } from '../../PredefinedConfig/ColumnCategoryState';
import { Flex } from 'rebass';

interface ColumnChooserPopupProps extends StrategyViewPopupProps<ColumnChooserPopupComponent> {
  onNewColumnListOrder: (
    VisibleColumnList: AdaptableColumn[]
  ) => SystemRedux.SetNewColumnListOrderAction;
  ColumnCategories: Array<ColumnCategory>;
}

class ColumnChooserPopupComponent extends React.Component<ColumnChooserPopupProps, {}> {
  render() {
    let availableValues: any[];
    let selectedValues: any[];
    let masterChildren: IMasterChildren[];
    if (ArrayExtensions.IsNotEmpty(this.props.ColumnCategories)) {
      masterChildren = this.props.ColumnCategories.map(cc => {
        return {
          Master: cc.ColumnCategoryId,
          Children: cc.ColumnIds.map(ci =>
            ColumnHelper.getFriendlyNameFromColumnId(ci, this.props.Columns)
          ),
        };
      });
    }
    availableValues = this.props.Columns.map(x =>
      ColumnHelper.getFriendlyNameFromColumn(x.ColumnId, x)
    );
    selectedValues = this.props.Columns.filter(x => x.Visible).map(x =>
      ColumnHelper.getFriendlyNameFromColumn(x.ColumnId, x)
    );

    let infoBody: any[] = [
      "Move items between the 'Hidden Columns' and 'Visible Columns' listboxes to hide / show them.",
      <br />,
      <br />,
      "Use the buttons on the right of the 'Visible Columns' listbox to order them as required.",
      <br />,
      <br />,
      'All changes made while using the Column Chooser are implemented in Adaptable immediately.',
    ];

    return (
      <PanelWithImage
        variant="primary"
        header={StrategyConstants.ColumnChooserStrategyFriendlyName}
        glyphicon={StrategyConstants.ColumnChooserGlyph}
        infoBody={infoBody}
        bodyProps={{
          style: { display: 'flex' },
        }}
      >
        <Flex padding={2} style={{ width: '100%' }}>
          <DualListBoxEditor
            AvailableValues={availableValues}
            SelectedValues={selectedValues}
            HeaderAvailable="Hidden Columns"
            HeaderSelected="Visible Columns"
            MasterChildren={masterChildren}
            onChange={SelectedValues => this.ColumnListChange(SelectedValues)}
          />
        </Flex>
      </PanelWithImage>
    );
  }

  private ColumnListChange(columnList: Array<string>) {
    let cols: AdaptableColumn[] = ColumnHelper.getColumnsFromFriendlyNames(
      columnList,
      this.props.Columns
    );
    this.props.onNewColumnListOrder(cols);
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any): Partial<ColumnChooserPopupProps> {
  return {
    ColumnCategories: state.ColumnCategory.ColumnCategories,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<ColumnChooserPopupProps> {
  return {
    onNewColumnListOrder: (VisibleColumnList: AdaptableColumn[]) =>
      dispatch(SystemRedux.SetNewColumnListOrder(VisibleColumnList)),
  };
}

export let ColumnChooserPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(ColumnChooserPopupComponent);
