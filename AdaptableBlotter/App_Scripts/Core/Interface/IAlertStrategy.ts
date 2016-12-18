import { NotificationType, AlertCategory } from '../Enums';


export interface IAlert {
    Notification: INotification,
    SendEmail: Boolean,
    ShowPopup: Boolean,
    AlertText: string
}


export interface INotification {
    NotificationType: NotificationType,
    AlertCategory: AlertCategory
    LongDescription: string,
    WhereApplied(): string,
    WhenApplied(): string,
}

export interface INotificationCellChanged {
    ColumnId: string,
    CellChangeRule: ICellChangeRule
}

export abstract class NotificationBase implements INotification {
    public NotificationType: NotificationType
    public AlertCategory: AlertCategory
    public LongDescription: string
    WhereApplied(): string {
        return "where applied base"
    }
    WhenApplied(): string {
        return "when applied base"
    }
}

export class NotificationCellChangedBase extends NotificationBase implements INotificationCellChanged {
    public ColumnId: string
    public CellChangeRule: ICellChangeRule

    constructor() {
        super();
    }


    WhenApplied(): string {
        return this.CellChangeRule.GetDescription();
    }
}

export class NotificationCellUpdated extends NotificationCellChangedBase {
    public ColumnId: string
    public CellChangeRule: ICellChangeRule

    constructor() {
        super();
        this.LongDescription = "Raises an Instant Alert when a cell is updated, whether its edited or the source changes";
        this.AlertCategory = AlertCategory.Data;
        this.NotificationType = NotificationType.CellUpdated;
    }

    WhereApplied(): string {
        return "'" + this.ColumnId + "' column updated";
    }
}

export class NotificationCellEdited extends NotificationCellChangedBase {
    public ColumnId: string
    public CellChangeRule: ICellChangeRule
    constructor() {
        super();
        this.LongDescription = "Raises an Instant Alert when a cell is edited";
        this.AlertCategory = AlertCategory.Data;
        this.NotificationType = NotificationType.CellEdited;
    }

    WhereApplied(): string {
        return "'" + this.ColumnId + "' column edited";
    }
}

export class NotificationCellUserDataEdited extends NotificationBase {
    constructor() {
        super();
        this.LongDescription = "Raises an Instant Alert when any type of user data is edited";
        this.AlertCategory = AlertCategory.Data;
        this.NotificationType = NotificationType.UserDataEdited;
    }
}

export class NotificationCellFunctionExecuted extends NotificationBase {
    constructor() {
        super();
        this.LongDescription = "Raises an Instant Alert when a blotter executes a function";
        this.AlertCategory = AlertCategory.Action;
        this.NotificationType = NotificationType.FunctionExecuted;
    }
}


// not column type stuff at the moment...
export interface ICellChangeRule {
    Rule: string,
    ChangeValue: any,
    GetDescription(): string
}

export class CellChangeRuleAny implements ICellChangeRule {
    Rule: string;
    ChangeValue: any;
    Description: string;

    constructor() {
        this.Rule = "Any Change In Value";
    }

    public GetDescription(): string {
        return "Any value change"
    }
}

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



export class TempNotificationCreator {
    public CreateTempAlerts(): IAlert[] {
        let returnAlerts: IAlert[] = []

        var alert1: IAlert = {
            Notification: this.CreateTempNotificationCellUpdated(),
            ShowPopup: false,
            SendEmail: true,
            AlertText: "hello"
        }

        var alert2: IAlert = {
            Notification: this.CreateTempNotificationCellEdited(),
            ShowPopup: true,
            SendEmail: false,
            AlertText: "hello"
        }

        var alert3: IAlert = {
            Notification: this.CreateTempNotificationCellUpdatedMore(),
            ShowPopup: true,
            SendEmail: false,
            AlertText: "hello"
        }
        returnAlerts.push(alert1);
        returnAlerts.push(alert2);
        returnAlerts.push(alert3);

        return returnAlerts;
    }


    private CreateTempNotificationCellUpdated(): NotificationCellUpdated {
        var obj = new NotificationCellUpdated();
        obj.ColumnId = "bid"
        obj.CellChangeRule = new CellChangeRuleGreaterThan();
        obj.CellChangeRule.ChangeValue = 5;

        return obj;
    }

    private CreateTempNotificationCellUpdatedMore(): NotificationCellUpdated {
        var obj = new NotificationCellUpdated();
        obj.ColumnId = "bid"
        obj.CellChangeRule = new CellChangeRuleLessThan();
        obj.CellChangeRule.ChangeValue = 9;

        return obj;
    }

    private CreateTempNotificationCellEdited(): NotificationCellEdited {
        var obj = new NotificationCellEdited();
        obj.ColumnId = "ask"
        obj.CellChangeRule = new CellChangeRuleAny();
        //  obj.CellChangeRule.ChangeValue = 5;

        return obj;
    }
}