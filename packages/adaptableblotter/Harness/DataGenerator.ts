/// <reference path="trade.d.ts" />

import { ColDef, GridOptions } from "ag-grid-community";
import { LeaderLineType } from "igniteui-react-charts/ES2015/LeaderLineType";

export interface IFtse {
    date: Date;
    start: number;
    end: number;
    low: number;
    high: number;
    volume: number;
}

export interface IBond {
    tradeId: number;
    buySell: string;
    currency: string;
    tradedAt: number;
    isin: string;
    counterparty: string;
    ticker: string;
    coupon: number;
    trader: string;
    tradeDate: Date;
    effectiveDate: Date;
    maturityDate: Date;
    lastUpdated: Date;
}

export interface IFX {
    tradeId: number;
    dealType: string;
    baseCcy: string;
    baseAmount: number;
    secondCcy: string;
    secondAmount: number;
    rate: number;
    pnL: number;
    counterparty: string;
    trader: string;
    tradeDate: Date;
    effectiveDate: Date;
    lastUpdated: Date;

}

function addDays(date: Date, days: number): Date {
    let newDate = new Date(date.getFullYear(), date.getMonth(), date.getDay());
    newDate.setDate(newDate.getDate() + days);
    return newDate
}

export class DataGenerator {

    getFtseData(count: number): IFtse[] {
        let ftseRows: IFtse[] = [];
        let todayDate: Date = new Date();
        let startDate: Date = addDays(todayDate, 20);
        let start: number = this.roundTo2Dp(325 + this.generateRandomDouble());
        let end: number = this.roundTo2Dp(start + (this.generateRandomInt(-15, 10) + this.generateRandomDouble()));
        ftseRows.push(this.createIFtse(startDate, 0, start, end));
        for (let i = 1; i <= count; i++) {
            let newStart: number = end;
            end = this.roundTo2Dp(newStart + this.generateRandomInt(-15, 10) + this.generateRandomDouble());
            ftseRows.push(this.createIFtse(startDate, i, newStart, end));
        }
        return ftseRows;
    }

    getTrades(count: number): ITrade[] {
        let trades: ITrade[] = [];
        for (let i = 1; i <= count; i++) {
            trades.push(this.createTrade(i));
        }
        return trades;
    }
    getDollarTrades(count: number): ITrade[] {
        let trades: ITrade[] = [];
        for (let i = 1; i <= count; i++) {
            trades.push(this.createTrade(i, "USD"));
        }
        return trades;
    }
    getGBPTrades(count: number): ITrade[] {
        let trades: ITrade[] = [];
        for (let i = 1; i <= count; i++) {
            trades.push(this.createTrade(i, "GBP"));
        }
        return trades;
    }
    getEuroTrades(count: number): ITrade[] {
        let trades: ITrade[] = [];
        for (let i = 1; i <= count; i++) {
            trades.push(this.createTrade(i, "EUR"));
        }
        return trades;
    }

    getBonds(count: number): IBond[] {
        let bonds: IBond[] = [];
        for (let i = 1; i <= count; i++) {
            bonds.push(this.createBond(i));
        }
        return bonds;
    }

    getFX(count: number): IFX[] {
        let fxs: IFX[] = [];
        for (let i = 1; i <= count; i++) {
            fxs.push(this.createFX(i));
        }
        return fxs;
    }

    startTickingDataHypergrid(grid: any) {
        setInterval(() => {
            let numberToAdd: number = this.generateRandomInt(1, 2) == 1 ? -0.5 : 0.5;
            //pick a random trade in the first ten
            let trade = this.getRandomItem(grid.behavior.getData(), 30);
            //pick a random colum in the numeric col
            let columnName = "price";// this.getRandomItem(this._numericCols);
            let initialNewValue = trade[columnName];
            let newValue = this.roundTo4Dp(initialNewValue + numberToAdd);
            trade[columnName] = newValue;

            trade["ask"] = this.roundTo4Dp(trade["price"] - trade["bidOfferSpread"] / 2);
            trade["bid"] = this.roundTo4Dp(trade["price"] + trade["bidOfferSpread"] / 2);

            trade["bloombergAsk"] = this.roundTo4Dp(trade["ask"] + 0.01);
            trade["bloombergBid"] = this.roundTo4Dp(trade["bid"] - 0.01);
            //grid.behavior.reindex();
            grid.repaint()
        }, 500)
    }

    startTickingDataagGrid(gridOptions: any) {
        setInterval(() => {
            let tradeId = this.generateRandomInt(0, 30);
            if (gridOptions != null && gridOptions.api != null) {
                gridOptions.api.forEachNode((rowNode: any, index: number) => {
                    if (rowNode.group) {
                        return;
                    }
                    let rowTradeId = gridOptions.api.getValue("tradeId", rowNode);
                    if (rowTradeId != tradeId) { return; }

                    let numberToAdd: number = this.generateRandomInt(1, 2) == 1 ? -0.5 : 0.5;
                    let trade = rowNode;
                    let columnName = "price";
                    let initialPrice = gridOptions.api.getValue(columnName, trade);
                    let newPrice = (this.roundTo4Dp(initialPrice + numberToAdd));
                    trade.setDataValue(columnName, newPrice);
                    let bidOfferSpread = gridOptions.api.getValue("bidOfferSpread", trade);
                    let ask = this.roundTo4Dp(newPrice + bidOfferSpread / 2);
                    trade.setDataValue("ask", ask)
                    let bid = this.roundTo4Dp(newPrice - bidOfferSpread / 2);
                    trade.setDataValue("bid", bid)
                    trade.setDataValue("bloombergAsk", this.roundTo4Dp(ask + 0.01))
                    trade.setDataValue("bloombergBid", this.roundTo4Dp(bid - 0.01))
                });
            }
        }, 500)

    }

    createIFtse(date: Date, index: number, start: number, end: number): IFtse {
        let newDate: Date = addDays(date, -index)
        let low: number = (start > end) ?
            this.roundTo2Dp(end - this.generateRandomInt(0, 10) + this.generateRandomDouble()) :
            this.roundTo2Dp(start - this.generateRandomInt(0, 10) + this.generateRandomDouble());
        let high = (start > end) ?
            this.roundTo2Dp(start + this.generateRandomInt(0, 10) + this.generateRandomDouble()) :
            this.roundTo2Dp(end + this.generateRandomInt(0, 10) + this.generateRandomDouble());
        let volume = this.generateRandomInt(3423, 6978);
        let ftse =
        {
            "date": newDate,
            "start": start,
            "end": end,
            "low": low,
            "high": high,
            "volume": volume
        };
        return ftse;
    }

    createBond(i: number): IBond {
        let tradedAt = this.getMeaningfulDoubleInRange(0, 2);
        let coupon = this.roundTo4Dp(this.getMeaningfulDouble() * this.getRandomItem(this.getBidOfferSpreads()));
        let tradeDate = this.generateRandomDateAndTime(-1000, 1000);
        let bond =
        {
            "tradeId": i,
            "notional": this.getRandomItem(this.getNotionals()),
            "buySell": this.getRandomItem(this.getBuySell()),
            "currency": this.getRandomItem(this.getCurrencies()),
            "tradedAt": tradedAt,
            "isin": this.getIsin(i),
            "counterparty": this.getRandomItem(this.getCounterparties()),
            "ticker": this.getTicker(i),
            "coupon": coupon,
            "trader": this.getRandomItem(this.getNames()),
            "tradeDate": tradeDate,
            "effectiveDate": this.addDays(tradeDate, 3),
            "maturityDate": this.addDays(tradeDate, 245),
            "lastUpdated": this.generateRandomDateAndTime(-7, 0),
        };
        return bond;
    }

    createFX(i: number): IFX {
        let baseAmount = this.getRandomItem(this.getNotionals())
        let rate = this.getMeaningfulDoubleInRange(0, 2);
        let secondaryAmount = this.removeDecimalPoints(baseAmount * rate);
        let tradeDate = this.generateRandomDateAndTime(-1000, 1000);
        let baseCurrency = this.getRandomItem(this.getCurrencies());
        let fx =
        {
            "tradeId": i,
            "notional": this.getRandomItem(this.getNotionals()),
            "dealType": this.getRandomItem(this.getDealType()),
            "baseCcy": baseCurrency,
            "baseAmount": baseAmount,
            "secondCcy": this.getRandomItem(this.getCurrenciesOtherThanOne(baseCurrency)),
            "secondAmount": secondaryAmount,
            "rate": rate,
            "pnL": this.getMeaningfulDoubleInRange(3, 40),
            "counterparty": this.getRandomItem(this.getCounterparties()),
            "trader": this.getRandomItem(this.getNames()),
            "tradeDate": tradeDate,
            "effectiveDate": this.addDays(tradeDate, 3),
            "lastUpdated": this.generateRandomDateAndTime(-7, 0),
        };
        return fx;
    }




    createTrade(i: number, currency?: string): ITrade {
        let price = this.getMeaningfulDouble();
        let bidOfferSpread = this.getRandomItem(this.getBidOfferSpreads());
        let ask = this.roundTo4Dp(price + bidOfferSpread / 2);
        let bid = this.roundTo4Dp(price - bidOfferSpread / 2);
        let tradeDate = this.generateRandomDate(-1000, 1000);
        let moodyRating = this.getRandomItem(this.getMoodysRatings())
        let tradeCurrency = currency ? currency : this.getRandomItem(this.getCurrencies())
        let trade =
        {
            "tradeId": i,
            "notional": this.generateRandomInt(0, 300),// this.getRandomItem(this.getNotionals()),
            "deskId": this.generateRandomInt(0, 400),
            "counterparty": this.getRandomItem(this.getCounterparties()),
            "currency": tradeCurrency,
            "country": this.getRandomItem(this.getCountries()),
            "changeOnYear": this.getMeaningfulPositiveNegativeInteger(800),//  this.getMeaningfulPositiveNegativeDouble(),
            "amount": this.getRandomItem(this.getAmounts()),
            "price": price,
            "bid": bid,
            "ask": ask,
            "dv01": ask,
            "bidOfferSpread": bidOfferSpread,
            "status": this.getStatus(),
            "isLive": this.generateRandomBool(),
            "moodysRating": moodyRating,
            "fitchRating": this.getRatingFromMoodyRating(moodyRating),
            "sandpRating": this.getRatingFromMoodyRating(moodyRating),
            "tradeDate": tradeDate,
            "settlementDate": this.addDays(tradeDate, 3),
            "bloombergAsk": this.getSimilarNumber(ask),
            "bloombergBid": this.getSimilarNumber(bid),
            "percentChange": this.generateRandomInt(0, 100), // this.generateRandomNullableDouble(),
            "lastUpdated": this.generateRandomDateAndTime(-7, 0),
            "lastUpdatedBy": this.getRandomItem(this.getNames()),
            /*
             "extraCol1": "1",
             "extraCol2": "2",
             "extraCol3": "3",
             "extraCol4": "4",
             "extraCol5": "5",
             "extraCol6": "6",
             "extraCol7": "7",
             "extraCol8": "8",
             "extraCol9": "9",
             "extraCol10": "10",
             "extraCol11": "11",
             "extraCol12": "12",
             "extraCol13": "13",
             "extraCol14": "14",
             "extraCol15": "15",
             "extraCol16": "16",
             "extraCol17": "17",
             "extraCol18": "18"
             
               "bid2": bid,
               "ask2": ask,
               "bidOfferSpread2": bidOfferSpread,
               "isLive2": this.generateRandomBool(),
               "moodysRating2": moodyRating,
               "fitchRating2": this.getRatingFromMoodyRating(moodyRating),
               "sandpRating2": this.getRatingFromMoodyRating(moodyRating),
               "tradeDate2": tradeDate,
               "settlementDate2": this.addDays(tradeDate, 3),
               "bloombergAsk2": this.roundTo4Dp(ask + 0.01),
               "bloombergBid2": this.roundTo4Dp(bid - 0.01),
               "percentChange2": this.generateRandomNullableDouble(),
               "lastUpdated2": this.generateRandomDateAndTime(-7, 0),
               "lastUpdatedBy2": this.getRandomItem(this.getNames())
               */
        };
        return trade;
    }


    // If minValue is 1 and maxValue is 2, then Math.random()*(maxValue-minValue+1)
    // generates a value between 0 and 2 =[0, 2), adding 1 makes this
    // [1, 3) and Math.floor gives 1 or 2.
    public generateRandomInt(minValue: number, maxValue: number): number {
        return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
    }


    protected generateRandomBool(): boolean {
        let amount = this.generateRandomInt(0, 1);
        return amount === 0;
    }

    // [0, 1)
    protected generateRandomDouble(): number {
        return Math.random();
    }

    protected getStatus(): string {
        let randomNumber = this.generateRandomInt(1, 3);
        if (randomNumber == 1) {
            return "Completed"
        } else if (randomNumber == 2) {
            return "Pending"
        } else if (randomNumber == 3) {
            return "Rejected"
        }
    }

    protected generateRandomNullableDouble(): number {
        let myValue = this.generateRandomDouble();
        let randomInt = this.generateRandomInt(1, 10);
        if (randomInt > 7) {
            myValue = null;
        }

        if (randomInt % 2 === 0 && myValue != null) {
            myValue = myValue * -1;
        }

        return myValue;
    }

    protected generateRandomNullableString(myString: string): string {
        let randomInt = this.generateRandomInt(1, 10);
        if (randomInt > 7) {
            myString = null;
        }
        return myString;
    }

    protected getMeaningfulDouble(): number {
        return this.roundTo4Dp(this.generateRandomInt(10, 150) + this.generateRandomDouble());
    }

    protected getMeaningfulPositiveNegativeDouble(): number {
        return this.roundTo4Dp(this.generateRandomInt(-150, 150) + this.generateRandomDouble());
    }

    protected getMeaningfulPositiveNegativeInteger(seed: number): number {
        return this.generateRandomInt(-seed, seed)
    }

    protected removeDecimalPoints(val: number): number {
        return Math.round(val * 1) / 1;
    }

    protected roundTo4Dp(val: number): number {
        return Math.round(val * 10000) / 10000;
    }

    protected roundTo2Dp(val: number): number {
        return Math.round(val * 100) / 100;
    }

    protected getMeaningfulDoubleInRange(min: number, max: number): number {
        return this.roundTo4Dp(this.generateRandomInt(min, max) + this.generateRandomDouble());
    }

    protected getMeaningfulDoubleTest(): number {
        return (Math.round((100 + this.generateRandomDouble()) * 10) / 10) + this.generateRandomDouble() / 1000;
    }

    protected generateRandomDateAndTime(minDays: number, maxDays: number): Date {
        let currentDate = new Date(); // Fix it
        let start = this.addDays(currentDate, minDays);
        let end = this.addDays(currentDate, maxDays);
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    protected addDays(date: Date, days: number): Date {
        return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
    }

    protected generateRandomDate(minDays: number, maxDays: number): Date {
        let date = this.generateRandomDateAndTime(minDays, maxDays);
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
        //return toDateTimeString(date);
    }

    protected toDateTimeString(date: Date) {
        let options = {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        };
        return date.toLocaleTimeString("en-us", options);
    }

    protected generateCounterparty(): string {
        let counterparties = this.getCounterparties();
        return counterparties[this.generateRandomInt(0, counterparties.length - 1)];
    }

    protected generateCurrency(): string {
        let currencies = this.getCurrencies();
        return currencies[this.generateRandomInt(0, currencies.length - 1)];
    }

    protected getIsin(index: number): string {
        let isins: string[] = ["US046353AB45", "FR0010326975", "XS0133582147", "XS0097283096", "XS0253989635", "FR0010828095", "XS0315528850", "XS0173501379", "XS0297700006", "XS0630204351", "FR0010967216", "XS0323411016", "FR0010185975", "USF7061BAN04", "DE000A1MA9V5", "DE000DB5S5U8", "XS1000918018", "US822582AC66", "XS0097283096", "FR0011043124", "DE000A0TKUU3", "XS0469026453", "XS0133582147", "XS0493098486", "FR0010394478", "XS0369461644", "S780641AH94", "XS0369461644", "XS0909769407", "XS0741004062", "XS0783934911", "XS0133582147", "XS0097283096", "XS0253989635", "FR0010828095", "XS0315528850", "XS0173501379"]
        return isins[index];
    }

    protected getTicker(index: number): string {
        let tickers: string[] = ["AZN", "BOUY", "BYLAN", "KONIPHI", "SIEM", "LADBRK", "RNTKIL", "WENL", "PSON", "BAB", "DANONE", "STAN-Bank", "LOUISDR", "AF-AirFrance", "PERNOD", "RDSPLC", "DB", "BRITEL-BritTel", "DAMLR", "VLOF", "HEI", "TATELN", "SESG", "BAB", "SIEM", "CARR", "KPN", "SIEM", "LBTG-UPC", "TECHGH", "WENL", "CPGLN", "KONIPHI", "SIEM", "LADBRK", "RNTKIL", "WENL", "PSON", "BAB",]
        return tickers[index];
    }

    public getRandomItem(ary: any[], max?: number): any {
        if (max) {
            return ary[this.generateRandomInt(0, Math.min(max, ary.length - 1))];
        }
        else {
            return ary[this.generateRandomInt(0, ary.length - 1)];
        }
    }

    protected getNotionals(): number[] {
        let notionals = [
            1000000,
            2000000,
            5000000,
            7500000,
            10000000
        ];
        return notionals;
    }
    protected getBidOfferSpreads(): number[] {
        let bidOfferSpreads = [
            0.1,
            0.15,
            0.2,
            0.25,
            0.3,
            0.35,
            0.4,
            0.5,
            0.55,
            0.6,
            0.65,
            0.7,
            0.75,
            0.8,
            0.85,
            0.9,
            0.95,
            1.0
        ];
        return bidOfferSpreads;
    }
    protected getCounterparties(): string[] {
        let counterparties = [
            "Goldman Sachs",
            "Soc Gen",
            "BAML",
            "Nat West",
            "Barcap",
            "Citi",
            "JP Morgan",
            "Morgan Stanley",
            "BNP",
            //   "Lloyds TSB",
            //   "MUFJ",
            //   "Rabobank",
            //   "RBC",
            //   "Deutsche Bank",
            "Credit Suisse",
            "Nomura"
        ];
        return counterparties;
    }

    protected getCurrencies(): string[] {
        let currencies = [
            "EUR",
            "USD",
            "GBP",
            "CHF",
            "CAD",
            "AUD",
            "ZAR"
        ];
        return currencies;
    }

    protected getCurrenciesOtherThanOne(currency: string): string[] {
        return this.getCurrencies().filter(c => c == currency);
    }

    protected getBuySell(): string[] {
        let buySell = [
            "Buy",
            "Sell"
        ];
        return buySell;
    }
    protected getDealType(): string[] {
        let dealType = [
            "Swap",
            "Spot",
            "Forward"
        ];
        return dealType;
    }

    protected getCountries(): string[] {
        let countries = [
            "Argentina",
            "Australia",
            "Belgium",
            "Brazil",
            "Canada",
            "China",
            "Denmark",
            "Egypt",
            "France",
            "Germany",
            "Holland",
            "Hungary",
            "India",
            "Ireland",
            "Italy",
            "Japan",
            "Kenya",
            "Luxembourg",
            "Portugal",
            "Qatar",
            "Russia",
            "Spain",
            "Thailand"
        ];
        return countries;
    }

    protected getAmounts(): number[] {
        let amounts = [
            1000,
            1500,
            2000,
            2500,
            3000
        ];
        return amounts;
    }

    protected getMoodysRatings(): string[] {
        let moodysRatings = [
            "Aaa",
            "Aa1",
            "Aa2",
            "Aa3",
            "A1",
            "A2",
            "A3",
            "Baa1",
            "Baa2",
            "Baa3",
            "Ba1",
            "Ba2",
            "Ba3",
            "B1",
            "B2",
            "B3",
            "Caa",
            "Ca",
            "C",
            "WR",
            "NR",
        ];
        return moodysRatings;
    }

    protected getSimilarNumber(originalNumber: number): number {
        let direction = this.generateRandomInt(1, 2);
        //  let randomDouble = this.generateRandomDouble();
        let returnValue = (direction == 1) ? this.roundTo4Dp(originalNumber + 0.01) : this.roundTo4Dp(originalNumber - 0.01);
        return returnValue
    }



    // for s&P and Fitch we got one of 3 ratings based off the moodys rating
    protected getRatingFromMoodyRating(moodysRating: string): string {
        switch (moodysRating) {
            case "Aaa":
                return this.getRandomItem(["AAA", "AA+"]);
            case "Aa1":
                return this.getRandomItem(["AAA", "AA+", "AA"]);
            case "Aa2":
                return this.getRandomItem(["AA+", "AA", "AA-"]);
            case "Aa3":
                return this.getRandomItem(["AA", "AA-", "A+"]);
            case "A1":
                return this.getRandomItem(["AA-", "A+", "A"]);
            case "A2":
                return this.getRandomItem(["A+", "A", "A-"]);
            case "A3":
                return this.getRandomItem(["A", "A-", "BBB+"]);
            case "Baa1":
                return this.getRandomItem(["A-", "BBB+", "BBB"]);
            case "Baa2":
                return this.getRandomItem(["BBB+", "BBB", "BBB-"]);
            case "Baa3":
                return this.getRandomItem(["BBB", "BBB-", "BB+",]);
            case "Ba1":
                return this.getRandomItem(["BBB-", "BB+", "BB"]);
            case "Ba2":
                return this.getRandomItem(["BB+", "BB", "BB-"]);
            case "Ba3":
                return this.getRandomItem(["BB", "BB-", "B+"]);
            case "B1":
                return this.getRandomItem(["BB-", "B+", "B"]);
            case "B2":
                return this.getRandomItem(["B+", "B", "B-"]);
            case "B3":
                return this.getRandomItem(["B", "B-", "CCC"]);
            case "Caa":
                return this.getRandomItem(["B-", "CCC", "CC"]);
            case "Ca":
                return this.getRandomItem(["CCC", "CC"]);
            case "C":
                return this.getRandomItem(["CC", "D"]);
            case "WR":
                return "SD";
            case "NR":
                return "NR";
        }
    }

    protected getNames(): string[] {
        let names: string[] = [
            "Stacee Dreiling",
            "Cecil Staab",
            "Sheba Dowdy",
            "Loralee Stalker",
            "Sanjuana Kimsey",
            "Shante Hey",
            "Magen Willison",
            "Casimira Tabler",
            "Annemarie Rybicki",
            "Granville Westfall",
            "Colby Troupe",
            "Wei Frith",
            "Sarai Pilgrim",
            "Yael Rich",
            "Hester Bluhm",
            "Season Landreth",
            "Britany Saffell",
            "Kelley Babb",
            "Bradley Chumley",
            "Louella Spiker"
        ];
        return names;
    }

    public getGridOptionsTrade(rowCount: number): GridOptions {
        return {
            columnDefs: this.getTradeSchema(),
            rowData: this.getTrades(rowCount),
            enableRangeSelection: true,
            floatingFilter: true,
            suppressColumnVirtualisation: false,
            suppressMenuHide: true,
            sideBar: undefined,
            columnTypes: {
                abColDefNumber: {},
                abColDefString: {},
                abColDefBoolean: {},
                abColDefDate: {},
                abColDefObject: {},
            },
        };
    }

    public getGridOptionsFTSE(rowCount: number): GridOptions {
        return{
            columnDefs: this.getFTSESchema(),
            rowData: this.getFtseData(rowCount),
            enableRangeSelection: true,
            floatingFilter: true,
            suppressColumnVirtualisation: false,
            suppressMenuHide: true,
            sideBar: undefined,
            columnTypes: {
              abColDefNumber: {},
              abColDefString: {},
              abColDefBoolean: {},
              abColDefDate: {},
              abColDefObject: {},
            },
          };
    }

     public getFTSESchema(): ColDef[] {
        var schema: any[] = [];
        schema.push({
            headerName: 'Date',
            field: 'date',
            editable: false,
            filter: true,
            cellEditorParams: {
                useFormatter: true,
            },
            valueParser: this.dateParseragGrid,
            valueFormatter: this.shortDateFormatteragGrid,
        });

        schema.push({
            headerName: 'Start',
            field: 'start',
            filter: true,
            editable: true,
            cellClass: 'number-cell',
        });
        schema.push({
            headerName: 'End',
            field: 'end',
            filter: true,
            editable: true,
            cellClass: 'number-cell',
        });
        schema.push({
            headerName: 'Low',
            field: 'low',
            filter: true,
            editable: true,
            cellClass: 'number-cell',
        });
        schema.push({
            headerName: 'High',
            field: 'high',
            editable: true,
            cellClass: 'number-cell',
        });
        schema.push({
            headerName: 'Volume',
            field: 'volume',
            filter: true,
            editable: true,
            cellClass: 'number-cell',
        });

        return schema;
    }


    public getTradeSchema(): ColDef[] {
        var schema: any[] = [];
        schema.push({
            headerName: 'Trade Id',
            field: 'tradeId',
            editable: true,
            type: 'abColDefNumber',
            sortable: false,
            filter: true,
        });
        schema.push({
            headerName: 'Notional',
            field: 'notional',
            enableValue: true,
            editable: true,
            // valueFormatter: notionalFormatter,
            cellClass: 'number-cell',
            type: 'abColDefNumber',
            filter: true
        });
        schema.push({
            headerName: 'Counterparty',
            field: 'counterparty',
            editable: true,
            enableRowGroup: true,
            filter: true,
            sortable: true,
            type: 'abColDefString',
        });

        schema.push({
            headerName: 'Change',
            field: 'changeOnYear',
            filter: true,
            editable: true,
            type: 'abColDefNumber',
        });
        schema.push({
            headerName: 'Currency',
            field: 'currency',
            editable: true,
            enableRowGroup: true,
            sortable: true,
            filter: 'agTextColumnFilter',
            type: 'abColDefString',
        });
        schema.push({
            headerName: 'Status',
            field: 'status',
            editable: true,
            filter: true,
            sortable: true,
            enableRowGroup: true,
            type: 'abColDefString',
        });
        schema.push({
            headerName: 'B/O Spread',
            field: 'bidOfferSpread',
            columnGroupShow: 'open',
            enableValue: true,
            editable: true,
            filter: true,
            cellClass: 'number-cell',
            type: 'abColDefNumber',
        });
        schema.push({
            headerName: 'Price',
            field: 'price',
            columnGroupShow: 'open',
            editable: true,
            enableValue: true,
            cellClass: 'number-cell',
            enableRowGroup: true,
            filter: 'agNumberColumnFilter',
            type: 'abColDefNumber',
        });
        schema.push({
            headerName: 'Country',
            field: 'country',
            editable: true,
            filter: true,
            sortable: true,
            enableRowGroup: true,
            type: 'abColDefString',
        });
        schema.push({
            headerName: 'Ask',
            field: 'ask',
            columnGroupShow: 'closed',
            filter: true,
            cellClass: 'number-cell',
            type: 'abColDefNumber',
        });
        schema.push({
            headerName: 'DV01',
            field: 'dv01',
            columnGroupShow: 'closed',
            filter: true,
            cellClass: 'number-cell',
            type: 'abColDefNumber',
        });
        schema.push({
            headerName: 'Bid',
            field: 'bid',
            columnGroupShow: 'closed',
            filter: true,
            cellClass: 'number-cell',
            type: 'abColDefNumber',
        });

        schema.push({
            headerName: 'Bbg Ask',
            field: 'bloombergAsk',
            columnGroupShow: 'closed',
            cellClass: 'number-cell',
            type: 'abColDefNumber',
        });
        schema.push({
            headerName: 'Bbg Bid',
            field: 'bloombergBid',
            columnGroupShow: 'closed',
            cellClass: 'number-cell',
            type: 'abColDefNumber',
        });
        schema.push({
            headerName: 'Moodys',
            field: 'moodysRating',
            editable: true,
            filter: 'text',
            type: 'abColDefString',
        });
        schema.push({
            headerName: 'Trade Date',
            field: 'tradeDate',
            editable: true,
            cellEditorParams: {
                useFormatter: true,
            },
            valueParser: this.dateParseragGrid,
            valueFormatter: this.shortDateFormatteragGrid,
            filter: 'agDateColumnFilter',
            type: 'abColDefDate',
        });
        schema.push({
            headerName: 'SandP',
            field: 'sandpRating',
            editable: true,
            sortable: true,
            filter: 'text',
            type: 'abColDefString',
        });
        schema.push({
            headerName: 'Settlement Date',
            field: 'settlementDate',
            editable: true,
            cellEditorParams: {
                useFormatter: true,
            },
            valueParser: this.dateParseragGrid,
            valueFormatter: this.shortDateFormatteragGrid,
            type: 'abColDefDate',
        });
        schema.push({
            headerName: 'Last Updated By',
            field: 'lastUpdatedBy',
            enableRowGroup: true,
            type: 'abColDefString',
        });
        schema.push({
            headerName: 'Last Updated',
            field: 'lastUpdated',
            editable: true,
            cellEditorParams: {
                useFormatter: true,
            },
            valueParser: this.dateParseragGrid,
            valueFormatter: this.shortDateFormatteragGrid,
            type: 'abColDefDate',
        });
        schema.push({
            headerName: 'Pct Change',
            field: 'percentChange',
            editable: true,
            filter: 'text',
            type: 'abColDefNumber',
        });
        schema.push({
            headerName: 'Desk No.',
            field: 'deskId',
            editable: true,
            type: 'abColDefNumber',
            enableRowGroup: true,
        });
        return schema;
    }

    private dateParseragGrid = (params: any) => {
        try {
            return this.stringToDate(params.newValue, 'dd/mm/yyyy', '/');
        } catch (ex) {
            console.error(`Error parsing the date value: ${params.newValue} and node : `, params.node);
            return null;
        }
    }


    private stringToDate(date: any, format: any, delimiter: any) {
        var formatLowerCase = format.toLowerCase();
        var formatItems = formatLowerCase.split(delimiter);
        var dateItems = date.split(delimiter);
        var monthIndex = formatItems.indexOf('mm');
        var dayIndex = formatItems.indexOf('dd');
        var yearIndex = formatItems.indexOf('yyyy');
        var month = parseInt(dateItems[monthIndex], 10);
        month -= 1;
        var formatedDate = new Date(parseInt(dateItems[yearIndex], 10), month, parseInt(dateItems[dayIndex], 10));
        return formatedDate;
    }

    private shortDateFormatter = new Intl.DateTimeFormat('en-GB');

    private shortDateFormatteragGrid = (params: any) => {
        try {
            if (params.value) {
                return this.shortDateFormatter.format(params.value);
            }
        } catch (ex) {
            console.error(`Error formatting the date for value: ${params.value} and node : `, params.node);
        }
        return null;
    }


    // Think we have plans to replace this with something better but for now it will allow me to check in...
    public getLicenceKey(): string {
        return '';
    }

}