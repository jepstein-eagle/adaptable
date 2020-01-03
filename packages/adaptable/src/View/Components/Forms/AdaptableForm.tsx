import * as React from 'react';

export type AdaptableFormProps = any;

export class AdaptableForm extends React.Component<AdaptableFormProps, {}> {
  render() {
    const { children, ...attrs } = this.props;
    return (
      <form {...attrs} onSubmit={this.CancelOnFormSubmit}>
        {children}
      </form>
    );
  }
  CancelOnFormSubmit = (e: React.FormEvent<any>) => {
    e.preventDefault();
    if (this.props.onSubmit) {
      this.props.onSubmit(null);
    }
  };
}
