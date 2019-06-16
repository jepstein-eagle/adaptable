import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { IColumn } from '../../Utilities/Interface/IColumn';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { DualListBoxEditor } from '../Components/ListBox/DualListBoxEditor';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { IMasterChildren } from '../../Utilities/Interface/IMasterChildren';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { ColumnCategory } from '../../PredefinedConfig/IUserState/ColumnCategoryState';

interface ColumnChooserPopupProps extends StrategyViewPopupProps<ColumnChooserPopupComponent> {
  onNewColumnListOrder: (VisibleColumnList: IColumn[]) => SystemRedux.SetNewColumnListOrderAction;
  ColumnCategories: Array<ColumnCategory>;
}

class ColumnChooserPopupComponent extends React.Component<ColumnChooserPopupProps, {}> {
  render() {
    let cssClassName: string = this.props.cssClassName + '__columnchooser';
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
      'All changes made while using the Column Chooser are implemented in the Blotter immediately.',
    ];

    return (
      <div className={cssClassName}>
        <PanelWithImage
          cssClassName={cssClassName}
          header={StrategyConstants.ColumnChooserStrategyName}
          bsStyle="primary"
          glyphicon={StrategyConstants.ColumnChooserGlyph}
          infoBody={infoBody}
        >
          <DualListBoxEditor
            AvailableValues={availableValues}
            cssClassName={cssClassName}
            SelectedValues={selectedValues}
            HeaderAvailable="Hidden Columns"
            HeaderSelected="Visible Columns"
            MasterChildren={masterChildren}
            onChange={SelectedValues => this.ColumnListChange(SelectedValues)}
          />
        </PanelWithImage>
      </div>
    );
  }

  private ColumnListChange(columnList: Array<string>) {
    let cols: IColumn[] = ColumnHelper.getColumnsFromFriendlyNames(columnList, this.props.Columns);
    this.props.onNewColumnListOrder(cols);
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    ColumnCategories: state.ColumnCategory.ColumnCategories,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onNewColumnListOrder: (VisibleColumnList: IColumn[]) =>
      dispatch(SystemRedux.SetNewColumnListOrder(VisibleColumnList)),
  };
}

export let ColumnChooserPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(ColumnChooserPopupComponent);
