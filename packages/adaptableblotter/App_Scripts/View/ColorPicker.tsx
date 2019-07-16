import * as React from 'react';
import Input from '../components/Input';

export interface ColorPickerProps extends React.HTMLProps<ColorPicker> {
  ColorPalette: string[];
}

export class ColorPicker extends React.Component<ColorPickerProps, {}> {
  render(): any {
    // let cssClassName: string= this.props.cssClassName + StyleConstants.COLOR_PICKER
    const { ColorPalette, ...restProps } = this.props;
    let ABcolorChoicesOptions = ColorPalette.map(x => <option key={x}>{x}</option>);
    let ABcolorChoices = <datalist id={'ABcolorChoices'}>{ABcolorChoicesOptions}</datalist>;
    const Inpt = Input as any;
    return (
      <div className={'ColorPicker'}>
        <Inpt {...restProps} type="color" style={{ width: 70 }} list="ABcolorChoices" />
        {ABcolorChoices}
      </div>
    );
  }
}
