import { AdaptableObject } from './AdaptableObject';

/**
 * Defines a Toolbar Button that is specified at design time by users and rendered dynamically by the Adaptable at run-time.
 *
 * It is hosted in a Cuatom Toolbar
 *
 * When a Custom Toolbar Button is clicked, the Adaptable will fire an *ToolbarButtonClicked* event to which you can subscribe via the Event API.
 */
export interface ToolbarButton extends AdaptableObject {
  /**
   * The name of the button
   *
   * **This should be a name that is valid as an HTML element**
   */
  Name: string;

  /**
   * What text will appear on the button
   *
   * *Currently you cannot provide an image for this button but that will be made available in a forthcoming release*
   */
  Caption: string;

  /**
   * The style to use for the Custom Toolbar Button.
   *
   * Includes 'Variant' and 'Tone'
   */
  ButtonStyle?: ButtonStyle;
}

export interface ButtonStyle {
  /**
   * How the button will appear.
   *
   * Options are:
   *
   * -'text' (just the caption)
   *
   * -'outlined' (with a border)
   *
   * -'raised' (the button will be raised)
   *
   * -'unelevated'(the button will appear in the primary colour of the theme - primarily used for non light themes)
   *
   * **Default Value: 'outlined'**
   */
  Variant?: 'text' | 'outlined' | 'raised' | 'unelevated';
  /**
   * The tone of the button
   *
   * **Default Value: 'neutral'**
   */
  Tone?: 'success' | 'error' | 'neutral' | 'none' | 'warning' | 'info' | 'accent';
}
