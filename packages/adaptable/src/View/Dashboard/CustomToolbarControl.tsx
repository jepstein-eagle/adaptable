﻿import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import { CustomToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import SimpleButton from '../../components/SimpleButton';
import AdaptableHelper from '../../Utilities/Helpers/AdaptableHelper';
import { ToolbarButton } from '../../PredefinedConfig/Common/ToolbarButton';
import {
  ToolbarButtonClickedInfo,
  ToolbarButtonClickedEventArgs,
} from '../../Api/Events/ToolbarButtonClicked';
import {
  CustomToolbarConfiguredInfo,
  CustomToolbarConfiguredEventArgs,
} from '../../Api/Events/CustomToolbarConfigured';

/**
 * A Custom Toolbar has 2 Divs
 * One for custom content
 * One for just buttons
 */
interface CustomToolbarControlComponentProps
  extends CustomToolbarStrategyViewPopupProps<CustomToolbarControlComponent> {}
class CustomToolbarControlComponent extends React.Component<
  CustomToolbarControlComponentProps,
  {}
> {
  render(): any {
    let contentsDivId: string = 'ab-CustomToolbar__' + this.props.customToolbar.Name + '__contents';
    let buttonsDivId: string = 'ab-CustomToolbar__' + this.props.customToolbar.Name + '__buttons';

    let customToolbarConfiguredInfo: CustomToolbarConfiguredInfo = {
      customToolbar: this.props.customToolbar,
      adaptableApi: this.props.api,
    };
    const customToolbarConfiguredEventArgs: CustomToolbarConfiguredEventArgs = AdaptableHelper.createFDC3Message(
      'Custom Toolbar Configured Args',
      customToolbarConfiguredInfo
    );

    return (
      <PanelDashboard
        className="ab-CustomToolbar ab-DashboardToolbar__Custom"
        headerText={this.props.customToolbar.Title ? this.props.customToolbar.Title : ''}
        showConfigureButton={
          this.props.customToolbar.ShowConfigureButton != null &&
          this.props.customToolbar.ShowConfigureButton == true
        }
        onConfigure={() =>
          this.props.api.eventApi.emit('CustomToolbarConfigured', customToolbarConfiguredEventArgs)
        }
      >
        <div
          id={contentsDivId}
          className="CustomToolBarContents ab-CustomToolbar__contents ab-CustomToolbar__contents--render"
          style={{ minHeight: 22 }}
        />
        <div id={buttonsDivId} className="ab-CustomToolbar__buttons" style={{ minHeight: 22 }}>
          {this.props.customToolbar.ToolbarButtons &&
            this.props.customToolbar.ToolbarButtons.map((button: ToolbarButton, index: number) => {
              let toolbarButtonClickedInfo: ToolbarButtonClickedInfo = {
                toolbarButton: button,
                customToolbar: this.props.customToolbar,
                adaptableApi: this.props.api,
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
                    this.props.api.eventApi.emit(
                      'ToolbarButtonClicked',
                      toolbarButtonClickedEventArgs
                    );
                  }}
                >
                  {button.Icon ? <img {...button.Icon} /> : null}
                  {button.Caption}
                </SimpleButton>
              );
            })}
        </div>
      </PanelDashboard>
    );
  }
}

function mapStateToProps(): Partial<CustomToolbarControlComponentProps> {
  return {};
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<CustomToolbarControlComponentProps> {
  return {};
}

export const CustomToolbarControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomToolbarControlComponent);
