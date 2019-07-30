import * as React from 'react';

import { FontWeight, FontStyle, FontSize } from '../../PredefinedConfig/Common/Enums';
import { EnumExtensions } from '../../Utilities/Extensions/EnumExtensions';
import { ColorPicker } from '../ColorPicker';
import { AdaptablePopover } from '../AdaptablePopover';

import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { IStyle } from '../../PredefinedConfig/Common/IStyle';
import Checkbox from '../../components/CheckBox';
import Panel from '../../components/Panel';
import HelpBlock from '../../components/HelpBlock';
import { Flex, Box } from 'rebass';
import Dropdown from '../../components/Dropdown';
import join from '../../components/utils/join';
import { CSSProperties } from 'react';
import WizardPanel from '../../components/WizardPanel';

export interface StyleComponentProps extends React.ClassAttributes<StyleComponent> {
  className?: string;
  style?: CSSProperties;
  ColorPalette: string[];
  StyleClassNames: string[];
  Style: IStyle;
  UpdateStyle: (style: IStyle) => void;
  CanUseClassName: boolean;
}

export interface StyleComponentState {
  myStyle: IStyle;
  ShowClassName: boolean;
}

export class StyleComponent extends React.Component<StyleComponentProps, StyleComponentState> {
  constructor(props: StyleComponentProps) {
    super(props);
    this.state = {
      myStyle: this.props.Style,
      ShowClassName: StringExtensions.IsNotNullOrEmpty(this.props.Style.ClassName),
    };
  }

  render() {
    let optionFontSizes = EnumExtensions.getNames(FontSize).map(enumName => {
      return {
        value: enumName,
        label: enumName,
      };
    });

    let optionClassNames = this.props.StyleClassNames.map(scn => {
      return {
        value: scn,
        label: scn,
      };
    });

    return (
      <WizardPanel header="Style">
        {this.props.CanUseClassName && this.props.StyleClassNames.length > 0 && (
          <Checkbox
            onChange={checked => this.onShowClassNameChanged(checked)}
            checked={this.state.ShowClassName}
          >
            Use Style Class Name
          </Checkbox>
        )}

        {this.state.ShowClassName ? (
          <div>
            <HelpBlock>{'Choose a style from the dropdown.'}</HelpBlock>
            <HelpBlock>
              {
                'Note: This assumes that you have provided a style with the same name in a stylesheet.'
              }
            </HelpBlock>
            <Dropdown
              placeholder="select"
              value={this.state.myStyle.ClassName}
              onChange={(value: any) => this.onStyleClassNameChanged(value)}
              options={[
                {
                  value: 'select',
                  label: 'Select Style Class Name',
                },
                ...optionClassNames,
              ]}
            />
          </div>
        ) : (
          <Flex flexDirection="column">
            <Flex flex={1}>
              <Panel header="Cell Colours" bodyProps={{ padding: 0 }}>
                <HelpBlock marginTop={2}>
                  Set the colour by ticking a checkbox and selecting a colour from the dropdown;
                  leave unchecked to use colours from the cell's existing style.
                </HelpBlock>
                <Flex flexDirection="column" margin={1}>
                  <Flex flexDirection="row" alignItems="center">
                    <Checkbox
                      value="existing"
                      marginLeft={1}
                      marginRight={3}
                      checked={this.state.myStyle.BackColor ? true : false}
                      onChange={checked => this.onUseBackColorCheckChange(checked)}
                    >
                      Set Back Colour
                    </Checkbox>

                    {this.state.myStyle.BackColor != null && (
                      <ColorPicker
                        ColorPalette={this.props.ColorPalette}
                        value={this.state.myStyle.BackColor}
                        onChange={x => this.onBackColorSelectChange(x)}
                      />
                    )}
                  </Flex>

                  <Flex flexDirection="row" alignItems="center">
                    <Checkbox
                      marginLeft={1}
                      marginRight={3}
                      value="existing"
                      checked={this.state.myStyle.ForeColor ? true : false}
                      onChange={checked => this.onUseForeColorCheckChange(checked)}
                    >
                      Set Fore Colour
                    </Checkbox>

                    {this.state.myStyle.ForeColor != null && (
                      <ColorPicker
                        ColorPalette={this.props.ColorPalette}
                        value={this.state.myStyle.ForeColor}
                        onChange={x => this.onForeColorSelectChange(x)}
                      />
                    )}
                  </Flex>
                </Flex>
              </Panel>
            </Flex>

            <Flex flex={1} marginTop={2}>
              <Panel header="Font Properties" style={{ width: '100%' }}>
                <Flex flexDirection="column">
                  <Checkbox
                    marginLeft={1}
                    value={FontWeight.Normal.toString()}
                    checked={this.state.myStyle.FontWeight == FontWeight.Bold}
                    onChange={checked => this.onFontWeightChange(checked)}
                  >
                    Bold
                  </Checkbox>

                  <Checkbox
                    marginLeft={1}
                    value={FontStyle.Normal.toString()}
                    checked={this.state.myStyle.FontStyle == FontStyle.Italic}
                    onChange={checked => this.onFontStyleChange(checked)}
                  >
                    Italic
                  </Checkbox>

                  <Box>
                    <Checkbox
                      marginLeft={1}
                      checked={this.state.myStyle.FontSize ? true : false}
                      onChange={checked => this.onUseFontSizeCheckChange(checked)}
                    >
                      Set Font Size
                    </Checkbox>
                  </Box>
                  <Box>
                    {/*we use the componentclass fieldset to indicate its not a new form...*/}
                    {this.state.myStyle.FontSize != null && (
                      <Flex flexDirection="row" alignItems="center">
                        <Dropdown
                          placeholder="select"
                          marginRight={2}
                          value={this.state.myStyle.FontSize.toString()}
                          onChange={(value: any) => this.onFontSizeChange(value)}
                          options={optionFontSizes}
                        />{' '}
                        <AdaptablePopover
                          headerText={'Conditional Style: Font Size'}
                          bodyText={[
                            "Select the size of the font for the Conditional Style.  The default is 'Medium'.",
                          ]}
                        />
                      </Flex>
                    )}
                  </Box>
                </Flex>
              </Panel>
            </Flex>
          </Flex>
        )}
      </WizardPanel>
    );
  }

  private onShowClassNameChanged(checked: boolean) {
    // clear everything
    this.state.myStyle.BackColor = null;
    this.state.myStyle.ForeColor = null;
    this.state.myStyle.FontSize = null;
    this.state.myStyle.FontStyle = null;
    this.state.myStyle.FontWeight = null;
    this.state.myStyle.ClassName = '';
    this.setState({ ShowClassName: checked } as StyleComponentState);
  }

  private onStyleClassNameChanged(value: any) {
    this.state.myStyle.ClassName = value == 'select' ? '' : value;
    this.props.UpdateStyle(this.state.myStyle);
  }

  private onUseBackColorCheckChange(checked: boolean) {
    this.state.myStyle.BackColor = checked ? '#ffffff' : null;
    this.props.UpdateStyle(this.state.myStyle);
  }

  private onUseForeColorCheckChange(checked: boolean) {
    this.state.myStyle.ForeColor = checked ? '#000000' : null;
    this.props.UpdateStyle(this.state.myStyle);
  }

  private onUseFontSizeCheckChange(checked: boolean) {
    this.state.myStyle.FontSize = checked ? FontSize.Medium : null;
    this.props.UpdateStyle(this.state.myStyle);
  }

  private onBackColorSelectChange(event: React.FormEvent<ColorPicker>) {
    let e = event.target as HTMLInputElement;
    this.state.myStyle.BackColor = e.value;
    this.props.UpdateStyle(this.state.myStyle);
  }

  private onForeColorSelectChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.state.myStyle.ForeColor = e.value;
    this.props.UpdateStyle(this.state.myStyle);
  }

  private onFontWeightChange(checked: boolean) {
    let fontWeight: FontWeight = checked ? FontWeight.Bold : FontWeight.Normal;
    this.state.myStyle.FontWeight = fontWeight;
    this.props.UpdateStyle(this.state.myStyle);
  }

  private onFontStyleChange(checked: boolean) {
    let fontStyle: FontStyle = checked ? FontStyle.Italic : FontStyle.Normal;
    this.state.myStyle.FontStyle = fontStyle;
    this.props.UpdateStyle(this.state.myStyle);
  }

  private onFontSizeChange(value: any) {
    this.state.myStyle.FontSize = value as FontSize;
    this.props.UpdateStyle(this.state.myStyle);
  }
}
