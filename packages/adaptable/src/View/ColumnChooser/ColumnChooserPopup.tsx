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
import { IMasterChildren } from '../../Utilities/Interface/IMasterChildren';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { ColumnCategory } from '../../PredefinedConfig/ColumnCategoryState';
import { Flex } from 'rebass';

interface ColumnChooserPopupProps extends StrategyViewPopupProps<ColumnChooserPopupComponent> {
  onNewColumnListOrder: (VisibleColumnList: string[]) => SystemRedux.SetNewColumnListOrderAction;
  ColumnCategories: Array<ColumnCategory>;
}

class ColumnChooserPopupComponent extends React.Component<ColumnChooserPopupProps, {}> {
  render() {
    let availableValues: any[];
    let masterChildren: IMasterChildren[];
    let columns: AdaptableColumn[] = this.props.Api.gridApi.getColumns();
    if (ArrayExtensions.IsNotEmpty(this.props.ColumnCategories)) {
      masterChildren = this.props.ColumnCategories.map(cc => {
        return {
          Master: cc.ColumnCategoryId,
          Children: cc.ColumnIds.map(ci => this.props.Api.gridApi.getFriendlyNameFromColumnId(ci)),
        };
      });
    }
    availableValues = columns.map(x =>
      this.props.Api.gridApi.getFriendlyNameFromColumn(x.ColumnId, x)
    );

    const visibleColumnIds = this.props.Api.layoutApi
      .getCurrentVisibleColumnIds()
      .filter(columnId => {
        return !this.props.Api.gridApi.isRowGroupColumn(columnId);
      });

    const selectedValues: string[] = this.props.Api.gridApi.getFriendlyNamesFromColumnIds(
      visibleColumnIds
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

  private ColumnListChange(columnList: string[]) {
    let colIds: string[] = this.props.Api.gridApi
      .getColumnsFromFriendlyNames(columnList)
      .filter(c => c)
      .map(c => c.ColumnId);
    this.props.onNewColumnListOrder(colIds);
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
    onNewColumnListOrder: (VisibleColumnList: string[]) =>
      dispatch(SystemRedux.SetNewColumnListOrder(VisibleColumnList)),
  };
}

export let ColumnChooserPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(ColumnChooserPopupComponent);
