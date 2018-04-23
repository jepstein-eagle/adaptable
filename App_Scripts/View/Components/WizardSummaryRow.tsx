import * as React from "react";
import { IAdvancedSearch } from '../../Strategy/Interface/IAdvancedSearchStrategy';
import { Radio } from 'react-bootstrap';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityExpressionRowProps, BaseRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import * as StrategyNames from '../../Core/Constants/StrategyNames'
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
