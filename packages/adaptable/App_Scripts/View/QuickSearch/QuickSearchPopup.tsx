import * as React from 'react';
import * as Redux from 'redux';
import * as _ from 'lodash';
import { connect } from 'react-redux';

import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as QuickSearchRedux from '../../Redux/ActionsReducers/QuickSearchRedux';
import { EnumExtensions } from '../../Utilities/Extensions/EnumExtensions';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { ColorPicker } from '../ColorPicker';
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
import HelpBlock from '../../components/HelpBlock';
import Radio from '../../components/Radio';
import { AdaptableFormControlTextClear } from '../Components/Forms/AdaptableFormControlTextClear';

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
    let infoBody: any[] = [
      'Run a simple text search across all visible cells in Adaptable.',
      <br />,
      <br />,
      'Use Quick Search Options to set search operator, behaviour and back colour (all automatically saved).',
      <br />,
      <br />,
      'For a more powerful, multi-column, saveable search with a wide range of options, use ',
      <i>Advanced Search</i>,
      '.',
    ];

    let DisplayActions = EnumExtensions.getNames(DisplayAction).map(enumName => {
      return {
        label: this.getTextForDisplayAction(enumName as DisplayAction),
        value: enumName,
      };
    });

    return (
      <PanelWithImage
        variant="primary"
        header={StrategyConstants.QuickSearchStrategyFriendlyName}
        glyphicon={StrategyConstants.QuickSearchGlyph}
        infoBody={infoBody}
        bodyProps={{ padding: 2 }}
      >
        <FormLayout>
          <FormRow label={'Search For:'}>
            <AdaptableFormControlTextClear
              type="text"
              placeholder="Quick Search Text"
              value={this.state.EditedQuickSearchText}
              OnTextChange={x => this.handleQuickSearchTextChange(x)}
            />
          </FormRow>
        </FormLayout>

        <Panel
          header="Quick Search Behaviour"
          style={{ height: 'auto' }}
          variant="default"
          borderRadius="none"
          marginTop={3}
        >
          <HelpBlock marginBottom={1}>
            Choose what happens to those cells that match the Quick Search text:
          </HelpBlock>

          <Flex flexDirection="column" padding={2}>
            <Radio
              value="HighlightCell"
              checked={this.props.DisplayAction == DisplayAction.HighlightCell}
              onChange={() => this.onDisplayTypeChange(DisplayAction.HighlightCell)}
            >
              Highlight any matching cells in the Grid
            </Radio>

            <Radio
              value="ShowRow"
              checked={this.props.DisplayAction == DisplayAction.ShowRow}
              onChange={() => this.onDisplayTypeChange(DisplayAction.ShowRow)}
            >
              Only display rows which contain matching cells
            </Radio>

            <Radio
              value="ShowRowAndHighlightCell"
              checked={this.props.DisplayAction == DisplayAction.ShowRowAndHighlightCell}
              onChange={() => this.onDisplayTypeChange(DisplayAction.ShowRowAndHighlightCell)}
            >
              Highlight any matching cells and only display rows that contain them
            </Radio>
          </Flex>
        </Panel>

        <Panel
          header="Quick Search Options"
          style={{ height: 'auto' }}
          variant="default"
          borderRadius="none"
          marginTop={3}
        >
          <FormLayout columns={['label', 2, 3]}>
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

function mapStateToProps(state: AdaptableState, ownProps: any) {
  return {
    QuickSearchText: state.QuickSearch.QuickSearchText,
    DisplayAction: state.QuickSearch.DisplayAction,
    QuickSearchStyle: state.QuickSearch.Style,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
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
