import * as React from 'react';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';

import FieldWrap from '../../../components/FieldWrap';
import SimpleButton from '../../../components/SimpleButton';
import Input, { InputProps } from '../../../components/Input';

export type AdaptableBlotterFormControlTextClearProps = {
  OnTextChange: (textValue: string) => void;
  autoFocus?: boolean;
  cssClassName?: string;
} & InputProps;

export class AdaptableBlotterFormControlTextClear extends React.Component<
  AdaptableBlotterFormControlTextClearProps,
  {}
> {
  render() {
    return (
      <FieldWrap
        style={{
          background: 'var(--ab-color-white)',
          overflow: 'visible',
          width: '100%',
        }}
      >
        <Input
          autoFocus={this.props.autoFocus}
          style={this.props.style}
          type="text"
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={(x: any) => this.props.OnTextChange((x.target as HTMLInputElement).value)}
        />

        <SimpleButton
          variant="text"
          icon="clear"
          tone="none"
          tooltip="Clear"
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
