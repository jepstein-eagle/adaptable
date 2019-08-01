import * as React from 'react';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';

import FieldWrap from '../../../components/FieldWrap';
import SimpleButton from '../../../components/SimpleButton';
import Input, { InputProps } from '../../../components/Input';
import { CSSProperties } from 'react';

export type AdaptableBlotterFormControlTextClearProps = {
  OnTextChange: (textValue: string) => void;
  autoFocus?: boolean;
  inputStyle?: CSSProperties;
} & InputProps;

export class AdaptableBlotterFormControlTextClear extends React.Component<
  AdaptableBlotterFormControlTextClearProps,
  {}
> {
  render() {
    let closeButtonTooltip: string = this.props.value ? 'clear' : null;
    return (
      <FieldWrap
        style={{
          background: 'var(--ab-color-defaultbackground)',
          overflow: 'visible',
          width: '100%',
          ...this.props.style,
        }}
      >
        <Input
          autoFocus={this.props.autoFocus}
          style={this.props.inputStyle}
          type="text"
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={(x: any) => this.props.OnTextChange((x.target as HTMLInputElement).value)}
        />

        <SimpleButton
          variant="text"
          icon="clear"
          tone="none"
          tooltip={closeButtonTooltip} // jw commenting out as tooltip stayed in place when it was cleared
          px={0}
          py={0}
          marginRight={1}
          onClick={(event: React.SyntheticEvent) => {
            this.props.OnTextChange('');
            const { target } = event;
            const input = (target as any).previousSibling;
            requestAnimationFrame(() => {
              if (input && input.focus) {
                input.focus();
              }
            });
          }}
          disabled={StringExtensions.IsNullOrEmpty(this.props.value.toString())}
        />
      </FieldWrap>
    );
  }
}
