import * as React from "react";
import { Radio, Panel, ControlLabel, FormControl, Col, FormGroup } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { DataType, MessageType, MathOperation } from '../../../Core/Enums';
import { EnumExtensions } from '../../../Core/Extensions/EnumExtensions';
import { StringExtensions } from '../../../Core/Extensions/StringExtensions';
import { AdaptablePopover } from '../../AdaptablePopover';
import * as CalendarConstants from '../../../Core/Constants/CalendarConstants';
import { AdaptableBlotterForm } from '../../Components/Forms/AdaptableBlotterForm';
import { KeyValuePair } from "../../UIInterfaces";
import { WizardSummaryPage } from "../../Components/WizardSummaryPage";
import * as StrategyNames from '../../../Core/Constants/StrategyNames'
import { IShortcut } from "../../../Core/Api/Interface/AdaptableBlotterObjects";

export interface ShortcutSummaryWizardProps extends AdaptableWizardStepProps<IShortcut> {
}

export class ShortcutSummaryWizard extends React.Component<ShortcutSummaryWizardProps, {}> implements AdaptableWizardStep {

    constructor(props: ShortcutSummaryWizardProps) {
        super(props);

    }

    render() {

        let cssClassName: string = this.props.cssClassName + "-summary"

        let keyValuePairs: KeyValuePair[] = [
            { Key: "Key", Value: this.props.Data.ShortcutKey },
            { Key: "Result", Value: this.props.Data.ShortcutResult },
            { Key: "Operation", Value: this.props.Data.ShortcutOperation },
            { Key: "Columns", Value: this.props.Data.ColumnType },
        ]

        let summaryPage = <WizardSummaryPage cssClassName={cssClassName} KeyValuePairs={keyValuePairs} header={StrategyNames.ShortcutStrategyName} />
        return <div className={cssClassName}>
            {summaryPage}
        </div>
    }



    public canNext(): boolean {
        return true
    }

    public canBack(): boolean { return true; }
    public Next(): void {
        //
    }
    public Back(): void { /* no implementation required   */ }
    public GetIndexStepIncrement() {
        return 1;
    }
    public GetIndexStepDecrement() {
        return 1;
    }
    public StepName = this.props.StepName
}




