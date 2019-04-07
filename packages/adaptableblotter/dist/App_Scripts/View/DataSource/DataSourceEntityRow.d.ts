import * as React from "react";
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IDataSource } from "../../Utilities/Interface/BlotterObjects/IDataSource";
export interface DataSourceEntityRowProps extends SharedEntityRowProps<DataSourceEntityRow> {
    onChangeName: (DataSource: IDataSource, Name: string) => void;
    onChangeDescription: (DataSource: IDataSource, Description: string) => void;
}
export declare class DataSourceEntityRow extends React.Component<DataSourceEntityRowProps, {}> {
    render(): any;
    onDescriptionChange(event: React.FormEvent<any>): void;
    onNameChange(event: React.FormEvent<any>): void;
}
