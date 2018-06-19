import * as React from "react";
import * as ReactDOM from "react-dom";
import { IAdaptableBlotterOptions } from "../Core/Api/Interface/IAdaptableBlotterOptions";

export interface AdaptableBlotterReactProps extends React.ClassAttributes<AdaptableBlotterReact> {
  BlotterOptions: IAdaptableBlotterOptions
}

export class AdaptableBlotterReact extends React.Component<AdaptableBlotterReactProps, {}> {
  render() {
    return <h1>Welcome</h1>
  }
}

