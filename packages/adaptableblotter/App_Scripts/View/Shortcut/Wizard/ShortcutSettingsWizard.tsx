import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { DataType, MathOperation } from '../../../PredefinedConfig/Common/Enums';
import { EnumExtensions } from '../../../Utilities/Extensions/EnumExtensions';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { AdaptablePopover } from '../../AdaptablePopover';
import * as CalendarConstants from '../../../Utilities/Constants/CalendarConstants';
import { Shortcut } from '../../../PredefinedConfig/RunTimeState/ShortcutState';
import WizardPanel from '../../../components/WizardPanel';
import Dropdown from '../../../components/Dropdown';
import { Flex, Text } from 'rebass';
import Input from '../../../components/Input';
import Radio from '../../../components/Radio';

export interface ShortcutSettingsWizardProps extends AdaptableWizardStepProps<Shortcut> {
  NumericKeysAvailable: Array<string>;
  DateKeysAvailable: Array<string>;
}
export interface ShortcutSettingsWizardState {
  ShortcutKey: string;
  ShortcutResult: any;
  ShortcutOperation: MathOperation;
  IsDynamic: boolean;
}

export class ShortcutSettingsWizard
  extends React.Component<ShortcutSettingsWizardProps, ShortcutSettingsWizardState>
  implements AdaptableWizardStep {
  changeContent = (e: any) => {
    this.setState({ ShortcutResult: e.target.value } as ShortcutSettingsWizardState, () =>
      this.props.UpdateGoBackState()
    );
  };

  constructor(props: ShortcutSettingsWizardProps) {
    super(props);

    this.state = {
      ShortcutKey: this.props.Data.ShortcutKey,
      ShortcutResult: this.props.Data.ShortcutResult == null ? '' : this.props.Data.ShortcutResult,
      ShortcutOperation: this.props.Data.ShortcutOperation as MathOperation,
      IsDynamic: this.props.Data.IsDynamic,
    };
  }

  onClickShortcutOperation(shortcutOperation: MathOperation) {
    this.setState(
      {
        ShortcutOperation: shortcutOperation,
        ShortcutResult: this.state.ShortcutResult,
      } as ShortcutSettingsWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  render() {
    // sort out keys
    let keyList: string[] =
      this.props.Data.ColumnType == DataType.Number
        ? this.props.NumericKeysAvailable
        : this.props.DateKeysAvailable;

    let optionKeys = keyList.map(x => {
      return {
        value: x,
        label: x,
      };
    });

    // sort out actions
    let optionActions = EnumExtensions.getNames(MathOperation)
      .filter(name => name != MathOperation.Replace)
      .map(enumName => {
        return {
          value: enumName,
          label: enumName,
        };
      });

    let currentActionValue = this.state.ShortcutOperation;
    let currentKeyValue = !this.state.ShortcutKey ? 'select' : this.state.ShortcutKey;
    let currentDynamicResult =
      this.state.ShortcutResult != '' ? this.state.ShortcutResult : 'select';
    let cssClassName: string = this.props.cssClassName + '-settings';

    return (
      <WizardPanel header="Shortcut Settings">
        <Flex flexDirection="row" alignItems="center">
          <Text style={{ flex: 2 }} textAlign="end" marginRight={2}>
            Key:
          </Text>

          <Flex flex={7} flexDirection="row" alignItems="center">
            <Dropdown
              placeholder="Select Key"
              style={{ flex: 1, maxWidth: 'none' }}
              value={currentKeyValue}
              onChange={(x: any) => this.onShortcutKeyChanged(x)}
              marginRight={3}
              options={optionKeys}
            ></Dropdown>

            <AdaptablePopover
              cssClassName={cssClassName}
              headerText={'Shortcut: Key'}
              bodyText={['The keyboard key that, when pressed, triggers the shortcut.']}
            />
          </Flex>
        </Flex>

        {this.props.Data.ColumnType == DataType.Number ? (
          <>
            <Flex flexDirection="row" alignItems="center" marginTop={3}>
              <Text style={{ flex: 2 }} textAlign="end" marginRight={2}>
                Operation:
              </Text>
              <Flex flex={7} flexDirection="row" alignItems="center">
                <Dropdown
                  style={{ flex: 1, maxWidth: 'none' }}
                  placeholder="select"
                  showEmptyItem={false}
                  value={currentActionValue}
                  marginRight={3}
                  onChange={(x: any) => this.onShortcutOperationChanged(x)}
                  options={optionActions}
                ></Dropdown>

                <AdaptablePopover
                  cssClassName={cssClassName}
                  headerText={'Shortcut: Operation'}
                  bodyText={[
                    "The mathematical operation that is peformed on the cell's current value - using the shortcut's 'value' - in order to calculate the new total for the cell.",
                  ]}
                />
              </Flex>
            </Flex>
            <Flex flexDirection="row" alignItems="center" marginTop={3}>
              <Text style={{ flex: 2 }} textAlign="end" marginRight={2}>
                Value:
              </Text>
              <Flex flex={7} flexDirection="row" alignItems="center">
                <Input
                  style={{ flex: 1 }}
                  type="number"
                  placeholder="Enter Number"
                  onChange={this.changeContent}
                  value={this.state.ShortcutResult}
                  marginRight={3}
                />

                <AdaptablePopover
                  cssClassName={cssClassName}
                  headerText={'Shortcut: Value'}
                  bodyText={[
                    "The number that is used - together with the shortcut's mathmetical 'operation' and the current cell value - in order to calculate the new total for the cell.",
                  ]}
                />
              </Flex>
            </Flex>
          </>
        ) : (
          <>
            <Flex flexDirection="row" alignItems="center">
              <Text style={{ flex: 2 }} textAlign="end" marginRight={2}>
                Date Type:
              </Text>
              <Flex flex={7} flexDirection="row" alignItems="center">
                <Flex flex={1} flexDirection="row" alignItems="center" marginRight={3}>
                  <Radio
                    value="custom"
                    checked={this.state.IsDynamic == false}
                    onChange={(_, e: any) => this.onDynamicSelectChanged(e)}
                    marginRight={2}
                  >
                    Custom
                  </Radio>
                  <Radio
                    value="dynamic"
                    checked={this.state.IsDynamic == true}
                    onChange={(_, e: any) => this.onDynamicSelectChanged(e)}
                  >
                    Dynamic
                  </Radio>
                </Flex>

                <AdaptablePopover
                  cssClassName={cssClassName}
                  headerText={'Shortcut: Date Type'}
                  bodyText={[
                    <b>Custom dates</b>,
                    " are 'real' dates chosen by the user.",
                    <br />,
                    <br />,
                    <b>Dynamic dates</b>,
                    " are predefined dates that come with the Blotter and are re-evaluated each day (e.g. 'Today').",
                    <br />,
                    <br />,
                    'Dynamic dates that use working days are based on the current holiday calendar.',
                  ]}
                />
              </Flex>
            </Flex>

            {this.state.IsDynamic == true ? (
              <Flex flexDirection="row" alignItems="center">
                <Text style={{ flex: 2 }} textAlign="end" marginRight={2}>
                  Dynamic Date:
                </Text>
                <Flex flex={7} flexDirection="row" alignItems="center">
                  <Dropdown
                    placeholder="select"
                    style={{ flex: 1, maxWidth: 'none' }}
                    value={currentDynamicResult}
                    onChange={(x: any) => this.onDynamicResultChanged(x)}
                    options={[
                      { value: 'select', label: 'Select Dynamic Date' },
                      { value: CalendarConstants.TODAY, label: 'Today' },
                      { value: CalendarConstants.YESTERDAY, label: 'Yesterday' },
                      { value: CalendarConstants.TOMORROW, label: 'Tomorrow' },
                      {
                        value: CalendarConstants.PREVIOUS_WORK_DAY,
                        label: 'Previous Work Day',
                      },
                      {
                        value: CalendarConstants.NEXT_WORK_DAY,
                        label: 'Next Work Day',
                      },
                    ]}
                    marginRight={3}
                  />

                  <AdaptablePopover
                    cssClassName={cssClassName}
                    headerText={'Shortcut: Dynamic Date'}
                    bodyText={[
                      "The dynamic date that becomes the cell's new value when the shortcut is triggered.",
                    ]}
                  />
                </Flex>
              </Flex>
            ) : (
              <Flex flexDirection="row" alignItems="center">
                <Text style={{ flex: 2 }} textAlign="end" marginRight={2}>
                  Custom Date:
                </Text>

                <Flex flex={7} flexDirection="row" alignItems="center">
                  <Input
                    type="date"
                    style={{ flex: 1 }}
                    placeholder="Shortcut Result"
                    onChange={this.changeContent}
                    value={this.state.ShortcutResult}
                    marginRight={3}
                  />
                  <AdaptablePopover
                    cssClassName={cssClassName}
                    headerText={'Shortcut: Custom Date'}
                    bodyText={[
                      "The date that becomes the cell's new value when the shortcut is triggered.",
                    ]}
                  />
                </Flex>
              </Flex>
            )}
          </>
        )}
      </WizardPanel>
    );
  }

  private onShortcutKeyChanged(value: any) {
    this.setState({ ShortcutKey: value } as ShortcutSettingsWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onShortcutOperationChanged(value: any) {
    this.setState({ ShortcutOperation: value } as ShortcutSettingsWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onDynamicResultChanged(value: any) {
    this.setState({ ShortcutResult: value } as ShortcutSettingsWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onDynamicSelectChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ IsDynamic: e.value == 'dynamic' } as ShortcutSettingsWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    if (this.state.IsDynamic && this.state.ShortcutResult == 'select') {
      return false;
    }

    return (
      StringExtensions.IsNotNullOrEmpty(this.state.ShortcutResult) &&
      StringExtensions.IsNotNullOrEmpty(this.state.ShortcutKey) &&
      this.state.ShortcutKey != 'select'
    );
  }

  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.ShortcutResult = this.state.ShortcutResult;
    this.props.Data.ShortcutOperation = this.state.ShortcutOperation;
    this.props.Data.ShortcutKey = this.state.ShortcutKey;
    this.props.Data.IsDynamic = this.state.IsDynamic;
  }
  public Back(): void {
    /* no implementation required   */
  }
  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
