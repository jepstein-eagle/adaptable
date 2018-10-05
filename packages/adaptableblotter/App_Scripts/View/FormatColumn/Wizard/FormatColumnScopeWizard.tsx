import * as React from "react";
import { Col, Panel } from 'react-bootstrap';
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { SelectionMode } from '../../../Core/Enums';
import { ColumnSelector } from "../../Components/Selectors/ColumnSelector";
import { StringExtensions } from '../../../Core/Extensions/StringExtensions';
import { IFormatColumn } from "../../../Core/Api/Interface/IAdaptableBlotterObjects";

export interface FormatColumnScopeWizardProps extends AdaptableWizardStepProps<IFormatColumn> {
    Columns: Array<IColumn>
}

export interface FormatColumnScopeWizardState {
    ColumnId: string
}

export class FormatColumnScopeWizard extends React.Component<FormatColumnScopeWizardProps, FormatColumnScopeWizardState> implements AdaptableWizardStep {

    constructor(props: FormatColumnScopeWizardProps) {
        super(props)
        this.state = {
            ColumnId: this.props.Data.ColumnId
        }
    }

    render(): any {
        let cssClassName: string = this.props.cssClassName + "-scope"
       
        return <div className={cssClassName}>
        <Panel header="Choose a column to format" bsStyle="primary">

                <Col xs={12} className="ab_medium_margin">
                    <ColumnSelector  cssClassName={cssClassName} SelectedColumnIds={[this.state.ColumnId]}
                        ColumnList={this.props.Columns}
                        onColumnChange={columns => this.onColumnSelectedChanged(columns)}
                        SelectionMode={SelectionMode.Single} />
                </Col>
            </Panel>
        </div>
    }

    private onColumnSelectedChanged(columns: IColumn[]) {
        this.setState({ ColumnId: columns.length > 0 ? columns[0].ColumnId : "" } as FormatColumnScopeWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean {
        return (StringExtensions.IsNotNullOrEmpty(this.state.ColumnId));
    }

    public canBack(): boolean { return false; }
    public Next(): void {
        this.props.Data.ColumnId = this.state.ColumnId;
    }

    public Back(): void {
        //todo
    }

    public GetIndexStepIncrement(){
        return 1;
    }
    public GetIndexStepDecrement(){
        return 1;
    }
    public StepName = this.props.StepName
}

