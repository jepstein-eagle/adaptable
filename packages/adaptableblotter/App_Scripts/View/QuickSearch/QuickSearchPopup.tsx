import * as React from 'react';
import * as Redux from 'redux';
import * as _ from 'lodash';
import { connect } from 'react-redux';

import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import * as QuickSearchRedux from '../../Redux/ActionsReducers/QuickSearchRedux';
import { EnumExtensions } from '../../Utilities/Extensions/EnumExtensions';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { ColorPicker } from '../ColorPicker';

import { AdaptableBlotterFormControlTextClear } from '../Components/Forms/AdaptableBlotterFormControlTextClear';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';

import {
  QUICK_SEARCH_DEFAULT_BACK_COLOR,
  QUICK_SEARCH_DEFAULT_FORE_COLOR,
} from '../../Utilities/Constants/GeneralConstants';
import { DisplayAction, LeafExpressionOperator } from '../../PredefinedConfig/Common/Enums';
import { IStyle } from '../../PredefinedConfig/Common/IStyle';
import { AdaptablePopover } from '../AdaptablePopover';

import WizardPanel from '../../components/WizardPanel';
import Dropdown from '../../components/Dropdown';
import Checkbox from '../../components/CheckBox';
import { Text, Flex, Box } from 'rebass';
import Panel from '../../components/Panel';
import FormLayout, { FormRow } from '../../components/FormLayout';

interface QuickSearchPopupProps extends StrategyViewPopupProps<QuickSearchPopupComponent> {
  QuickSearchText: string;
  DisplayAction: DisplayAction;
  QuickSearchStyle: IStyle;

  onRunQuickSearch: (quickSearchText: string) => QuickSearchRedux.QuickSearchApplyAction;
  onSetSearchDisplayType: (
    DisplayAction: DisplayAction
  ) => QuickSearchRedux.QuickSearchSetDisplayAction;
  onSetStyle: (style: IStyle) => QuickSearchRedux.QuickSearchSetStyleAction;
}

interface QuickSearchPopupState {
  EditedQuickSearchText: string;
  EditedStyle: IStyle;
}

class QuickSearchPopupComponent extends React.Component<
  QuickSearchPopupProps,
  QuickSearchPopupState
> {
  constructor(props: QuickSearchPopupProps) {
    super(props);
    this.state = { EditedQuickSearchText: '', EditedStyle: null };
  }

  debouncedRunQuickSearch = _.debounce(
    () => this.props.onRunQuickSearch(this.state.EditedQuickSearchText),
    250
  );

  public componentDidMount() {
    this.setState({
      EditedQuickSearchText: this.props.QuickSearchText,
      EditedStyle: this.props.QuickSearchStyle,
    });
  }

  handleQuickSearchTextChange(text: string) {
    this.setState({ EditedQuickSearchText: text });
    this.debouncedRunQuickSearch();
  }

  onDisplayTypeChange(value: any) {
    this.props.onSetSearchDisplayType(value as DisplayAction);
  }

  private onUseBackColorCheckChange(checked: boolean) {
    let style: IStyle = this.state.EditedStyle;
    style.BackColor = checked
      ? this.props.QuickSearchStyle.BackColor
        ? this.props.QuickSearchStyle.BackColor
        : QUICK_SEARCH_DEFAULT_BACK_COLOR
      : null;
    this.setState({ EditedStyle: style });
    this.props.onSetStyle(style);
  }

  private onUseForeColorCheckChange(checked: boolean) {
    let style: IStyle = this.state.EditedStyle;
    style.ForeColor = checked
      ? this.props.QuickSearchStyle.ForeColor
        ? this.props.QuickSearchStyle.ForeColor
        : QUICK_SEARCH_DEFAULT_FORE_COLOR
      : null;
    this.setState({ EditedStyle: style });
    this.props.onSetStyle(style);
  }

  private onBackColorSelectChange(event: React.FormEvent<ColorPicker>) {
    let e = event.target as HTMLInputElement;
    let style: IStyle = this.state.EditedStyle;
    style.BackColor = e.value;
    this.setState({ EditedStyle: style });
    this.props.onSetStyle(style);
  }

  private onForeColorSelectChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    let style: IStyle = this.state.EditedStyle;
    style.ForeColor = e.value;
    this.setState({ EditedStyle: style });
    this.props.onSetStyle(style);
  }

  render() {
    let cssClassName: string = this.props.cssClassName + '__quicksearch';

    let infoBody: any[] = [
      'Run a simple text search across all visible cells in the Blotter.',
      <br />,
      <br />,
      'Use Quick Search Options to set search operator, behaviour and back colour (all automatically saved).',
      <br />,
      <br />,
      'For a more powerful, multi-column, saveable search with a wide range of options, use ',
      <i>Advanced Search</i>,
      '.',
    ];

    let stringOperators: LeafExpressionOperator[] = [
      LeafExpressionOperator.Contains,
      LeafExpressionOperator.StartsWith,
    ];
    let DisplayActions = EnumExtensions.getNames(DisplayAction).map(enumName => {
      return {
        label: this.getTextForDisplayAction(enumName as DisplayAction),
        value: enumName,
      };
    });

    return (
      <PanelWithImage
        cssClassName={cssClassName}
        variant="primary"
        header={StrategyConstants.QuickSearchStrategyName}
        glyphicon={StrategyConstants.QuickSearchGlyph}
        infoBody={infoBody}
        bodyProps={{ padding: 2 }}
      >
        <FormLayout>
          <FormRow label={'Search For:'}>
            <AdaptableBlotterFormControlTextClear
              cssClassName={cssClassName}
              type="text"
              placeholder="Quick Search Text"
              value={this.state.EditedQuickSearchText}
              OnTextChange={x => this.handleQuickSearchTextChange(x)}
            />
          </FormRow>
        </FormLayout>

        <Panel
          header="Quick Search Options"
          style={{ height: 'auto' }}
          variant="default"
          borderRadius="none"
          marginTop={3}
        >
          <FormLayout columns={['label', 2, 3]}>
            <FormRow label={'Behaviour:'}>
              <Dropdown
                placeholder="select"
                style={{ width: '100%', maxWidth: 'none' }}
                value={this.props.DisplayAction.toString()}
                onChange={(x: any) => this.onDisplayTypeChange(x)}
                options={DisplayActions}
                marginRight={3}
              />
              <AdaptablePopover
                cssClassName={cssClassName}
                headerText={'Quick Search: Behaviour'}
                bodyText={[
                  <b>Highlight Cells Only:</b>,
                  ' Changes back colour of cells matching search text',
                  <br />,
                  <br />,
                  <b>Show Matching Rows Only:</b>,
                  ' Only shows rows containing cells matching search text',
                  <br />,
                  <br />,
                  <b>Highlight Cells and Show Matching Rows:</b>,
                  ' Only shows rows containing cells (which are also coloured) matching search text',
                ]}
              />
            </FormRow>
            <FormRow label="Set Back Colour:">
              <Flex alignItems="center">
                <Checkbox
                  value="existing"
                  checked={this.props.QuickSearchStyle.BackColor ? true : false}
                  onChange={(checked: boolean) => this.onUseBackColorCheckChange(checked)}
                  marginRight={3}
                  marginLeft={2}
                />
                {this.props.QuickSearchStyle.BackColor != null && (
                  <ColorPicker
                    ColorPalette={this.props.ColorPalette}
                    value={this.props.QuickSearchStyle.BackColor}
                    onChange={x => this.onBackColorSelectChange(x)}
                  />
                )}
              </Flex>
            </FormRow>
            <FormRow label="Set Fore Colour:">
              <Flex alignItems="center">
                <Checkbox
                  marginRight={3}
                  marginLeft={2}
                  value="existing"
                  checked={this.props.QuickSearchStyle.ForeColor ? true : false}
                  onChange={(checked: boolean) => this.onUseForeColorCheckChange(checked)}
                />
                {this.props.QuickSearchStyle.ForeColor != null && (
                  <ColorPicker
                    ColorPalette={this.props.ColorPalette}
                    value={this.props.QuickSearchStyle.ForeColor}
                    onChange={x => this.onForeColorSelectChange(x)}
                  />
                )}
              </Flex>
            </FormRow>
          </FormLayout>
        </Panel>
      </PanelWithImage>
    );
  }

  private getTextForDisplayAction(displayAction: DisplayAction): string {
    switch (displayAction) {
      case DisplayAction.HighlightCell:
        return 'Highlight Cells Only';
      case DisplayAction.ShowRow:
        return 'Show Matching Rows Only';
      case DisplayAction.ShowRowAndHighlightCell:
        return 'Highlight Cells & Show Matching Rows';
    }
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    QuickSearchText: state.QuickSearch.QuickSearchText,
    DisplayAction: state.QuickSearch.DisplayAction,
    QuickSearchStyle: state.QuickSearch.Style,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onRunQuickSearch: (quickSearchText: string) =>
      dispatch(QuickSearchRedux.QuickSearchApply(quickSearchText)),
    onSetSearchDisplayType: (searchDisplayType: DisplayAction) =>
      dispatch(QuickSearchRedux.QuickSearchSetDisplay(searchDisplayType)),
    onSetStyle: (style: IStyle) => dispatch(QuickSearchRedux.QuickSearchSetStyle(style)),
  };
}

export let QuickSearchPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuickSearchPopupComponent);
