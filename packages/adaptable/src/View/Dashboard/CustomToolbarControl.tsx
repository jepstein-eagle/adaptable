import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import { CustomToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import SimpleButton from '../../components/SimpleButton';
import AdaptableHelper from '../../Utilities/Helpers/AdaptableHelper';
import { CustomToolbar } from '../../PredefinedConfig/DashboardState';
import { ToolbarButton } from '../../PredefinedConfig/Common/ToolbarButton';
import {
  ToolbarButtonClickedInfo,
  ToolbarButtonClickedEventArgs,
} from '../../Api/Events/ToolbarButtonClicked';

interface CustomToolbarControlComponentProps
  extends CustomToolbarStrategyViewPopupProps<CustomToolbarControlComponent> {
  //  CustomToolbars: CustomToolbar[];
}
class CustomToolbarControlComponent extends React.Component<
  CustomToolbarControlComponentProps,
  {}
> {
  render(): any {
    let showGlyphicon: boolean = StringExtensions.IsNotNullOrEmpty(this.props.CustomToolbar.Glyph);

    let contentsDivId: string = 'ab-CustomToolbar__' + this.props.CustomToolbar.Name + '__contents';

    return (
      <PanelDashboard
        className="ab-CustomToolbar ab-DashboardToolbar__Custom"
        headerText={this.props.CustomToolbar.Title}
        showConfigureButton={false}
        showGlyphIcon={showGlyphicon}
        glyphicon={this.props.CustomToolbar.Glyph}
        onClose={() => this.props.onClose(this.props.CustomToolbar.Name)} //this.props.customToolbar.Name)} // need to do...
      >
        <div
          id={contentsDivId}
          className="CustomToolBarContents ab-CustomToolbar__contents ab-CustomToolbar__contents--render"
          style={{ minHeight: 22 }}
        />
        <div
          id="ab-CustomToolbar__buttons"
          className="ab-CustomToolbar__buttons"
          style={{ minHeight: 22 }}
        >
          {this.props.CustomToolbar.ToolbarButtons &&
            this.props.CustomToolbar.ToolbarButtons.map((button: ToolbarButton, index: number) => {
              let toolbarButtonClickedInfo: ToolbarButtonClickedInfo = {
                toolbarButton: button,
              };
              const toolbarButtonClickedEventArgs: ToolbarButtonClickedEventArgs = AdaptableHelper.createFDC3Message(
                'Toolbar Button Clicked Args',
                toolbarButtonClickedInfo
              );
              let buttonVariant =
                button.ButtonStyle && button.ButtonStyle.Variant
                  ? button.ButtonStyle.Variant
                  : 'outlined';
              let buttonTone =
                button.ButtonStyle && button.ButtonStyle.Tone ? button.ButtonStyle.Tone : 'neutral';
              return (
                <SimpleButton
                  style={{ marginLeft: index ? 'var(--ab-space-1)' : 0 }}
                  key={button.Name}
                  variant={buttonVariant}
                  tone={buttonTone}
                  onClick={() => {
                    this.props.Adaptable.api.eventApi.emit(
                      'ToolbarButtonClicked',
                      toolbarButtonClickedEventArgs
                    );
                  }}
                >
                  {button.Caption}
                </SimpleButton>
              );
            })}
        </div>
      </PanelDashboard>
    );
  }
}

function mapStateToProps() {
  return {
    // CustomToolbars: state.Dashboard.CustomToolbars,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {
    onClose: (customToolbarName: string) =>
      dispatch(DashboardRedux.DashboardHideToolbar(customToolbarName)),
  };
}

export const CustomToolbarControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomToolbarControlComponent);
