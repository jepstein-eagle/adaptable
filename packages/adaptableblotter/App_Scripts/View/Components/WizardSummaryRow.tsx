import * as React from "react";
import { Radio } from 'react-bootstrap';
import { EntityListActionButtons } from './Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from './AdaptableObjectRow';
import { SharedEntityExpressionRowProps, BaseRowProps } from './SharedProps/ConfigEntityRowProps';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import * as StrategyConstants from '../../Core/Constants/StrategyConstants'
import { IColItem } from "../UIInterfaces";

export interface WizardSummaryRowProps<WizardSummaryRow> extends BaseRowProps<WizardSummaryRow> {
    propertyName: string
    propertyValue: any
}

export class WizardSummaryRow extends React.Component<WizardSummaryRowProps<WizardSummaryRow>, {}> {

    render(): any {
         let colItems: IColItem[] = [].concat(this.props.colItems);

        colItems[0].Content = this.props.propertyName
        colItems[1].Content = this.props.propertyValue
        
        return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} fontSize={"medium"} />
    }
}
