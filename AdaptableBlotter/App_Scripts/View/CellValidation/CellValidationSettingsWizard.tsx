/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { Col, Panel } from 'react-bootstrap';
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { ICellValidationRule } from '../../Core/interface/ICellValidationStrategy';
import { StringExtensions } from '../../Core/Extensions';
import { SingleListBox } from '../SingleListBox'

interface CellValidationSettingsWizardProps extends AdaptableWizardStepProps<ICellValidationRule> {
    Blotter: IAdaptableBlotter
    Columns: Array<IColumn>
}
interface CellValidationSettingsWizardState {
    ColumnId: string
}

export class CellValidationSettingsWizard extends React.Component<CellValidationSettingsWizardProps, CellValidationSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: CellValidationSettingsWizardProps) {
        super(props)
        this.state = {
            ColumnId: this.props.Data.ColumnId,
        }
    }

    render(): any {

        let selectedColumnValues: string[] = StringExtensions.IsNullOrEmpty(this.state.ColumnId) ? [] : [this.state.ColumnId];

        return <div>
            <Panel header="Select a Column" bsStyle="primary">

                <Col xs={2}></Col>

                <Col xs={8}>

                    <SingleListBox style={divStyle}
                        Values={this.props.Columns}
                        UiSelectedValues={selectedColumnValues}
                        DisplayMember="FriendlyName"
                        ValueMember="ColumnId"
                        SortMember=""
                        onSelectedChange={(list) => this.onColumnSelectedChanged(list)}>
                    </SingleListBox>
                </Col>
            </Panel>
        </div>
    }

    private onColumnSelectedChanged(selectedColumnValues: Array<any>) {
        this.setState({ ColumnId: selectedColumnValues[0] } as CellValidationSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean {
        return (StringExtensions.IsNotNullOrEmpty(this.state.ColumnId));
    }

    public canBack(): boolean { return true; }
    public Next(): void {
        this.props.Data.ColumnId = this.state.ColumnId;
    }

    public Back(): void { }
    public StepName = "Cell Validation Column "
}

let divStyle = {
    'overflowY': 'auto',
    'height': '400px',
    'marginBottom': '0'
}
