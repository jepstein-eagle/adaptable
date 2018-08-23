import * as React from "react";
import { ControlLabel, Col, Panel } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { IChartDefinition } from "../../../Core/Api/Interface/AdaptableBlotterObjects";
import { SelectionMode, DistinctCriteriaPairValue } from "../../../Core/Enums";
import { ArrayExtensions } from "../../../Core/Extensions/ArrayExtensions";
import { SingleListBox } from "../../Components/ListBox/SingleListBox";
import { IRawValueDisplayValuePair } from "../../UIInterfaces";

export interface ChartAdditionalDetailsWizardProps extends AdaptableWizardStepProps<IChartDefinition> {
    getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => Array<IRawValueDisplayValuePair>
}

export interface ChartAdditionalDetailsWizardState {
    AdditionalColumnValues: string[],
    AvailableAdditionalColumnValues: IRawValueDisplayValuePair[]
}

export class ChartAdditionalDetailsWizard extends React.Component<ChartAdditionalDetailsWizardProps, ChartAdditionalDetailsWizardState> implements AdaptableWizardStep {
    constructor(props: ChartAdditionalDetailsWizardProps) {
        super(props)
        this.state = {
            AdditionalColumnValues: props.Data.AdditionalColumnValues ? props.Data.AdditionalColumnValues : [],
            AvailableAdditionalColumnValues: props.getColumnValueDisplayValuePairDistinctList(props.Data.AdditionalColumn, DistinctCriteriaPairValue.DisplayValue)
        }
    }
    render(): any {
        let cssClassName: string = this.props.cssClassName + "-settings"

        return <div className={cssClassName}>
            <Panel header="X Axis Additional Column Values" bsStyle="primary">
                <div>
                    <SingleListBox Values={this.state.AvailableAdditionalColumnValues}
                        cssClassName={cssClassName}
                        UiSelectedValues={this.state.AdditionalColumnValues}
                        DisplayMember={DistinctCriteriaPairValue[DistinctCriteriaPairValue.DisplayValue]}
                        ValueMember={DistinctCriteriaPairValue[DistinctCriteriaPairValue.DisplayValue]}
                        SortMember={DistinctCriteriaPairValue[DistinctCriteriaPairValue.RawValue]}
                        onSelectedChange={(list) => this.onColumnValuesChange(list)}
                        SelectionMode={SelectionMode.Multi}>
                    </SingleListBox>
                </div>
            </Panel>
        </div>
    }

    onColumnValuesChange(list: any[]): any {
        this.setState({
            AdditionalColumnValues: list
        } as ChartAdditionalDetailsWizardState, () => this.props.UpdateGoBackState())
    }




    public canNext(): boolean {
        return ArrayExtensions.IsNotNullOrEmpty(this.state.AdditionalColumnValues)
    }

    public canBack(): boolean { return true; }

    public Next(): void {
        this.props.Data.AdditionalColumnValues = this.state.AdditionalColumnValues
    }
    public Back(): void {
        // todo
    }

    public GetIndexStepIncrement() {
        return 1;
    }
    public GetIndexStepDecrement() {
        return 1;
    }
    public StepName = this.props.StepName
}

