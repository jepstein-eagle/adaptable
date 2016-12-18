import { NotificationType, CellChangeType } from '../Enums';


export interface IAlert {
    NotificationType: NotificationType
    SendEmail: Boolean,
    ShowPopup: Boolean,
    AlertText: string,
    LongDescription: string,
    CellChangeRule: ICellChangeRule
  //  WhereApplied(): string,
  //  WhenApplied(): string,
}

// not column type stuff at the moment...
export interface ICellChangeRule {
    ColumnId: string,
    CellChangeType: CellChangeType,
    ChangeValue: any,
//    GetDescription(): string
}

export class TempNotificationCreator {
    public CreateTempAlerts(): IAlert[] {
        let returnAlerts: IAlert[] = []

        let cellChangeRule1: ICellChangeRule = {
           ColumnId: "bid",
            CellChangeType: CellChangeType.GreaterThan,
            ChangeValue: 5,
          //   GetDescription(): null
        }


        var alert1: IAlert = {
            NotificationType: NotificationType.CellUpdated,
            CellChangeRule: cellChangeRule1,
            ShowPopup: false,
            SendEmail: true,
            AlertText: "hello",
            LongDescription: "",
            
        }

        returnAlerts.push(alert1);
        return returnAlerts;
    }


// updated
//   this.LongDescription = "Raises an Instant Alert when a cell is updated, whether its edited or the source changes";

// edited
// this.LongDescription = "Raises an Instant Alert when a cell is edited";

// data edited
//        this.LongDescription = "Raises an Instant Alert when any type of user data is edited";

// function executed
//      this.LongDescription = "Raises an Instant Alert when a blotter executes a function";





/*
export class CellChangeRuleGreaterThan implements ICellChangeRule {
    Rule: string;
    ChangeValue: any;
    Description: string;

    constructor() {
        this.Rule = "New Value Greater Than: ";
    }

    public GetDescription(): string {
        return "New Value > " + this.ChangeValue
    }
}

export class CellChangeRuleLessThan implements ICellChangeRule {
    Rule: string;
    ChangeValue: any;

    constructor() {
        this.Rule = "New Value Less Than";
    }

    public GetDescription(): string {
        return "New Value < " + this.ChangeValue
    }
}

export class CellChangeRuleValueChange implements ICellChangeRule {
    Rule: string;
    ChangeValue: any;

    constructor() {
        this.Rule = "Change in Value at least";
    }

    public GetDescription(): string {
        return "New Value < " + this.ChangeValue
    }
}

export class CellChangeRulePercentChange implements ICellChangeRule {
    Rule: string;
    ChangeValue: any;

    constructor() {
        this.Rule = "% Change is at least";
    }

    public GetDescription(): string {
        return "New Value < " + this.ChangeValue
    }
}
*/





}