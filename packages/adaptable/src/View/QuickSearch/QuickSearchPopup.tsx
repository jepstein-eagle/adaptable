import * as React from 'react';
import * as Redux from 'redux';

import debounce from 'lodash-es/debounce';
import { connect } from 'react-redux';

import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as QuickSearchRedux from '../../Redux/ActionsReducers/QuickSearchRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';

import { AdaptableStyle } from '../../PredefinedConfig/Common/AdaptableStyle';

import Panel from '../../components/Panel';
import FormLayout, { FormRow } from '../../components/FormLayout';
import { AdaptableFormControlTextClear } from '../Components/Forms/AdaptableFormControlTextClear';
import { StyleComponent } from '../Components/StyleComponent';

interface QuickSearchPopupProps extends StrategyViewPopupProps<QuickSearchPopupComponent> {
  QuickSearchText: string;
  QuickSearchStyle: AdaptableStyle;
  StyleClassNames: string[];
  onRunQuickSearch: (quickSearchText: string) => QuickSearchRedux.QuickSearchApplyAction;
  onSetStyle: (style: AdaptableStyle) => QuickSearchRedux.QuickSearchSetStyleAction;
}

interface QuickSearchPopupState {
  EditedQuickSearchText: string;
  EditedStyle: AdaptableStyle;
}

class QuickSearchPopupComponent extends React.Component<
  QuickSearchPopupProps,
  QuickSearchPopupState
> {
  constructor(props: QuickSearchPopupProps) {
    super(props);
    this.state = { EditedQuickSearchText: '', EditedStyle: null };
  }

  debouncedRunQuickSearch = debounce(
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

  render() {
    let infoBody: any[] = [
      'Run a simple text search across all visible cells in Adaptable.',
      <br />,
      <br />,
      'Set the Quick Search style for matching cells.',
      <br />,
      <br />,
      'For a more powerful, multi-column, saveable search with a wide range of options, use ',
      <i>Query</i>,
      '.',
    ];

    let canUseClassName = true; // get from somewhere...

    return (
      <PanelWithImage
        variant="primary"
        header={StrategyConstants.QuickSearchStrategyFriendlyName}
        glyphicon={StrategyConstants.QuickSearchGlyph}
        infoBody={infoBody}
        bodyProps={{ padding: 2 }}
      >
        <Panel
          header="Quick Search Text"
          style={{ height: 'auto' }}
          variant="default"
          borderRadius="none"
          marginTop={3}
          marginLeft={2}
          marginRight={2}
        >
          {' '}
          <FormLayout>
            <FormRow label={'Search For:'}>
              <AdaptableFormControlTextClear
                type="text"
                placeholder="Search Text"
                value={this.state.EditedQuickSearchText}
                OnTextChange={x => this.handleQuickSearchTextChange(x)}
              />
            </FormRow>
          </FormLayout>
        </Panel>
        <StyleComponent
          style={{ height: '100%' }}
          api={this.props.api}
          StyleClassNames={this.props.StyleClassNames}
          Style={this.props.QuickSearchStyle}
          UpdateStyle={(style: AdaptableStyle) => this.onUpdateStyle(style)}
          CanUseClassName={canUseClassName}
        />
      </PanelWithImage>
    );
  }

  private onUpdateStyle(style: AdaptableStyle) {
    this.setState({ EditedStyle: style });
    this.props.onSetStyle(style);
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any): Partial<QuickSearchPopupProps> {
  return {
    QuickSearchText: state.QuickSearch.QuickSearchText,
    QuickSearchStyle: state.QuickSearch.Style,
    StyleClassNames: state.UserInterface.StyleClassNames,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<QuickSearchPopupProps> {
  return {
    onRunQuickSearch: (quickSearchText: string) =>
      dispatch(QuickSearchRedux.QuickSearchApply(quickSearchText)),
    onSetStyle: (style: AdaptableStyle) => dispatch(QuickSearchRedux.QuickSearchSetStyle(style)),
  };
}

export let QuickSearchPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuickSearchPopupComponent);
