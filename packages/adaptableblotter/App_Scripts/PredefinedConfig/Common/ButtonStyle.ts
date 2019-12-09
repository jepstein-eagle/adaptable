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
