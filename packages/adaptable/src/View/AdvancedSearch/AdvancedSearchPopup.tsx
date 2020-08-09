import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as AdvancedSearchRedux from '../../Redux/ActionsReducers/AdvancedSearchRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { UIHelper } from '../UIHelper';
import { PanelWithImage } from '../Components/Panels/PanelWithImage';

interface AdvancedSearchPopupProps extends StrategyViewPopupProps<AdvancedSearchPopupComponent> {
  CurrentAdvancedSearchName: string;
  onChangeAdvancedSearch: (
    SelectedSearchName: string
  ) => AdvancedSearchRedux.AdvancedSearchChangeAction;
}

export interface AdvancedSearchState {}

class AdvancedSearchPopupComponent extends React.Component<
  AdvancedSearchPopupProps,
  AdvancedSearchState
> {
  constructor(props: AdvancedSearchPopupProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }
  shouldClosePopupOnFinishWizard: boolean = false;

  render() {
    let infoBody: any[] = [
      'Build multi-column named searches by creating a Query - which will contain a selection of column values, filters and ranges.',
      <br />,
      <br />,
      'Created searches are available in the Advanced Search Toolbar dropdown in the Dashboard.',
    ];

    return (
      <PanelWithImage
        header={StrategyConstants.AdvancedSearchStrategyFriendlyName}
        infoBody={infoBody}
        bodyProps={{ padding: 0 }}
        glyphicon={StrategyConstants.AdvancedSearchGlyph}
      >
        Put something here?
      </PanelWithImage>
    );
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any): Partial<AdvancedSearchPopupProps> {
  return {
    CurrentAdvancedSearchName: state.AdvancedSearch.CurrentAdvancedSearch,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<AdvancedSearchPopupProps> {
  return {
    onChangeAdvancedSearch: (selectedQuery: string) =>
      dispatch(AdvancedSearchRedux.AdvancedSearchChange(selectedQuery)),
  };
}

export let AdvancedSearchPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvancedSearchPopupComponent);
