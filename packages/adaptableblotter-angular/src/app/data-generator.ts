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

export default class DataGenerator {
  private _numericCols: string[] = ['price', 'bid', 'ask'];

  constructor() {}

  getTrades(count: number) {
    const trades = [];
    for (let i = 1; i <= count; i++) {
      trades.push(this.createTrade(i));
    }
    return trades;
  }

  getDollarTrades(count: number) {
    const trades = [];
    for (let i = 1; i <= count; i++) {
      trades.push(this.createTrade(i, 'USD'));
    }
    return trades;
  }

  getGBPTrades(count: number) {
    const trades = [];
    for (let i = 1; i <= count; i++) {
      trades.push(this.createTrade(i, 'GBP'));
    }
    return trades;
  }

  getEuroTrades(count: number) {
    const trades = [];
    for (let i = 1; i <= count; i++) {
      trades.push(this.createTrade(i, 'EUR'));
    }
    return trades;
  }

  getBonds(count: number): IBond[] {
    const bonds: IBond[] = [];
    for (let i = 1; i <= count; i++) {
      bonds.push(this.createBond(i));
    }
    return bonds;
  }

  getFX(count: number): IFX[] {
    const fxs: IFX[] = [];
    for (let i = 1; i <= count; i++) {
      fxs.push(this.createFX(i));
    }
    return fxs;
  }

  // Can't be bothered to create a ts file for kendo....
  startTickingDataKendo(grid: any) {
    setInterval(() => {
      const numberToAdd: number = this.generateRandomInt(1, 2) === 1 ? -0.5 : 0.5;
      // pick a random trade in the first ten
      const trade = this.getRandomItem(grid.dataSource.data(), 10);
      // pick a random colum in the numeric col
      const columnName = this.getRandomItem(this._numericCols);
      const initialNewValue = trade[columnName];
      const newValue = initialNewValue + numberToAdd;
      // for now I decide to use dataItem.set but we'll need to see how people are
      // managing ticking data since the grid doesn't allow partial refresh... so if we keep calling sync on
      // every tick the grid becomes unusable since we loose editing, cell selection etc......
      // also if people call sync then we don't have the 'change' event

      // JW. Im still not sure that the crude cell.html isnt the easiest after all so long as we make sure it covers all bases
      // as that way at least we dont refresh anything etc and it has no impact.
      //   trade.set(columnName, newValue);

      // trade[columnName] = newValue;
      // trade.dirty = true;
      // grid.dataSource.sync();
    }, 5000);
  }

  startTickingDataHypergrid(grid: any) {
    setInterval(() => {
      const numberToAdd: number = this.generateRandomInt(1, 2) === 1 ? -0.5 : 0.5;
      // pick a random trade in the first ten
      const trade = this.getRandomItem(grid.behavior.getData(), 30);
      // pick a random colum in the numeric col
      const columnName = 'price'; // this.getRandomItem(this._numericCols);
      const initialNewValue = trade[columnName];
      const newValue = this.roundTo4Dp(initialNewValue + numberToAdd);
      trade[columnName] = newValue;

      trade['ask'] = this.roundTo4Dp(trade['price'] - trade['bidOfferSpread'] / 2);
      trade['bid'] = this.roundTo4Dp(trade['price'] + trade['bidOfferSpread'] / 2);

      trade['bloombergAsk'] = this.roundTo4Dp(trade['ask'] + 0.01);
      trade['bloombergBid'] = this.roundTo4Dp(trade['bid'] - 0.01);
      // grid.behavior.reindex();
      grid.repaint();
    }, 100);
  }

  startTickingDataagGrid(gridOptions: any) {
    setInterval(() => {
      const tradeId = this.generateRandomInt(0, 29);
      gridOptions.api.forEachNode((rowNode: any, index: number) => {
        if (rowNode.group) {
          return;
        }
        const rowTradeId = gridOptions.api.getValue('tradeId', rowNode);
        // only do first 30
        if (rowTradeId !== tradeId) {
          return;
        }

        const numberToAdd: number = this.generateRandomInt(1, 2) === 1 ? -0.5 : 0.5;
        const trade = rowNode;
        const columnName = 'price';
        const initialNewValue = gridOptions.api.getValue(columnName, trade);
        const newValue = this.roundTo4Dp(initialNewValue + numberToAdd);
        trade.setDataValue(columnName, newValue);
        const ask = this.roundTo4Dp(
          gridOptions.api.getValue('price', trade) -
            gridOptions.api.getValue('bidOfferSpread', trade) / 2
        );
        trade.setDataValue('ask', ask);
        const bid = this.roundTo4Dp(
          gridOptions.api.getValue('price', trade) +
            gridOptions.api.getValue('bidOfferSpread', trade) / 2
        );
        trade.setDataValue('bid', bid);

        trade.setDataValue('bloombergAsk', this.roundTo4Dp(ask + 0.01));
        trade.setDataValue('bloombergBid', this.roundTo4Dp(bid - 0.01));
      });
    }, 100);
  }

  createBond(i: number): IBond {
    const tradedAt = this.getMeaningfulDoubleInRange(0, 2);
    const coupon = this.roundTo4Dp(
      this.getMeaningfulDouble() * this.getRandomItem(this.getBidOfferSpreads())
    );
    const tradeDate = this.generateRandomDateAndTime(-1000, 1000);
    const bond = {
      tradeId: i,
      notional: this.getRandomItem(this.getNotionals()),
      buySell: this.getRandomItem(this.getBuySell()),
      currency: this.getRandomItem(this.getCurrencies()),
      tradedAt: tradedAt,
      isin: this.getIsin(i),
      counterparty: this.getRandomItem(this.getCounterparties()),
      ticker: this.getTicker(i),
      coupon: coupon,
      trader: this.getRandomItem(this.getNames()),
      tradeDate: tradeDate,
      effectiveDate: this.addDays(tradeDate, 3),
      maturityDate: this.addDays(tradeDate, 245),
      lastUpdated: this.generateRandomDateAndTime(-7, 0)
    };
    return bond;
  }

  createFX(i: number): IFX {
    const baseAmount = this.getRandomItem(this.getNotionals());
    const rate = this.getMeaningfulDoubleInRange(0, 2);
    const secondaryAmount = this.removeDecimalPoints(baseAmount * rate);
    const tradeDate = this.generateRandomDateAndTime(-1000, 1000);
    const baseCurrency = this.getRandomItem(this.getCurrencies());
    const fx = {
      tradeId: i,
      notional: this.getRandomItem(this.getNotionals()),
      dealType: this.getRandomItem(this.getDealType()),
      baseCcy: baseCurrency,
      baseAmount: baseAmount,
      secondCcy: this.getRandomItem(this.getCurrenciesOtherThanOne(baseCurrency)),
      secondAmount: secondaryAmount,
      rate: rate,
      pnL: this.getMeaningfulDoubleInRange(3, 40),
      counterparty: this.getRandomItem(this.getCounterparties()),
      trader: this.getRandomItem(this.getNames()),
      tradeDate: tradeDate,
      effectiveDate: this.addDays(tradeDate, 3),
      lastUpdated: this.generateRandomDateAndTime(-7, 0)
    };
    return fx;
  }

  createTrade(i: number, currency?: string) {
    const price = this.getMeaningfulDouble();
    const bidOfferSpread = this.getRandomItem(this.getBidOfferSpreads());
    const ask = this.roundTo4Dp(price + bidOfferSpread / 2);
    const bid = this.roundTo4Dp(price - bidOfferSpread / 2);
    const tradeDate = this.generateRandomDate(-1000, 1000);
    const moodyRating = this.getRandomItem(this.getMoodysRatings());
    const tradeCurrency = currency ? currency : this.getRandomItem(this.getCurrencies());
    const trade = {
      tradeId: i,
      notional: this.getRandomItem(this.getNotionals()),
      deskId: this.generateRandomInt(0, 250),
      counterparty: this.getRandomItem(this.getCounterparties()),
      currency: tradeCurrency,
      country: this.getRandomItem(this.getCountries()),
      changeOnYear: this.getMeaningfulPositiveNegativeDouble(),
      amount: this.getRandomItem(this.getAmounts()),
      price: price,
      bid: bid,
      ask: ask,
      bidOfferSpread: bidOfferSpread,
      status: this.getStatus(),
      isLive: this.generateRandomBool(),
      moodysRating: moodyRating,
      fitchRating: this.getRatingFromMoodyRating(moodyRating),
      sandpRating: this.getRatingFromMoodyRating(moodyRating),
      tradeDate: tradeDate,
      settlementDate: this.addDays(tradeDate, 3),
      bloombergAsk: this.getSimilarNumber(ask),
      bloombergBid: this.getSimilarNumber(bid),
      percentChange: this.generateRandomNullableDouble(),
      lastUpdated: this.generateRandomDateAndTime(-7, 0),
      lastUpdatedBy: this.getRandomItem(this.getNames())
      /*
             'extraCol1': '1',
             'extraCol2': '2',
             'extraCol3': '3',
             'extraCol4': '4',
             'extraCol5': '5',
             'extraCol6': '6',
             'extraCol7': '7',
             'extraCol8': '8',
             'extraCol9': '9',
             'extraCol10': '10',
             'extraCol11': '11',
             'extraCol12': '12',
             'extraCol13': '13',
             'extraCol14': '14',
             'extraCol15': '15',
             'extraCol16': '16',
             'extraCol17': '17',
             'extraCol18': '18'
               'bid2': bid,
               'ask2': ask,
               'bidOfferSpread2': bidOfferSpread,
               'isLive2': this.generateRandomBool(),
               'moodysRating2': moodyRating,
               'fitchRating2': this.getRatingFromMoodyRating(moodyRating),
               'sandpRating2': this.getRatingFromMoodyRating(moodyRating),
               'tradeDate2': tradeDate,
               'settlementDate2': this.addDays(tradeDate, 3),
               'bloombergAsk2': this.roundTo4Dp(ask + 0.01),
               'bloombergBid2': this.roundTo4Dp(bid - 0.01),
               'percentChange2': this.generateRandomNullableDouble(),
               'lastUpdated2': this.generateRandomDateAndTime(-7, 0),
               'lastUpdatedBy2': this.getRandomItem(this.getNames())
               */
    };
    return trade;
  }

  // jo: just a poor attempt to create GUID in JS.... what a stupid language
  protected generateUuid(): string {
    let d = new Date().getTime();
    if (window.performance && typeof window.performance.now === 'function') {
      d += performance.now(); // use high-precision timer if available
    }
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  }

  // If minValue is 1 and maxValue is 2, then Math.random()*(maxValue-minValue+1)
  // generates a value between 0 and 2 =[0, 2), adding 1 makes this
  // [1, 3) and Math.floor gives 1 or 2.
  public generateRandomInt(minValue: number, maxValue: number): number {
    return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
  }

  protected generateRandomBool(): boolean {
    const amount = this.generateRandomInt(0, 1);
    return amount === 0;
  }

  // [0, 1)
  protected generateRandomDouble(): number {
    return Math.random();
  }

  protected getStatus(): string {
    const randomNumber = this.generateRandomInt(1, 3);
    if (randomNumber === 1) {
      return 'Completed';
    } else if (randomNumber === 2) {
      return 'Pending';
    } else if (randomNumber === 3) {
      return 'Rejected';
    }
    return '';
  }

  protected generateRandomNullableDouble(): number {
    let myValue: number = this.generateRandomDouble();
    const randomInt = this.generateRandomInt(1, 10);
    if (randomInt > 7) {
      return null;
    }

    if (randomInt % 2 === 0 && myValue != null) {
      myValue = myValue * -1;
    }

    return myValue;
  }

  protected generateRandomNullableString(myString: string): string {
    const randomInt = this.generateRandomInt(1, 10);
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

  protected removeDecimalPoints(val: number): number {
    return Math.round(val * 1) / 1;
  }

  protected roundTo4Dp(val: number): number {
    return Math.round(val * 10000) / 10000;
  }

  protected getMeaningfulDoubleInRange(min: number, max: number): number {
    return this.roundTo4Dp(this.generateRandomInt(min, max) + this.generateRandomDouble());
  }

  protected getMeaningfulDoubleTest(): number {
    return (
      Math.round((100 + this.generateRandomDouble()) * 10) / 10 + this.generateRandomDouble() / 1000
    );
  }

  protected generateRandomDateAndTime(minDays: number, maxDays: number): Date {
    const currentDate = new Date(); // Fix it
    const start = this.addDays(currentDate, minDays);
    const end = this.addDays(currentDate, maxDays);
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  protected addDays(date: Date, days: number): Date {
    return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
  }

  protected generateRandomDate(minDays: number, maxDays: number): Date {
    const date = this.generateRandomDateAndTime(minDays, maxDays);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    // return toDateTimeString(date);
  }

  protected toDateTimeString(date: Date) {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleTimeString('en-us', options);
  }

  protected generateCounterparty(): string {
    const counterparties = this.getCounterparties();
    return counterparties[this.generateRandomInt(0, counterparties.length - 1)];
  }

  protected generateCurrency(): string {
    const currencies = this.getCurrencies();
    return currencies[this.generateRandomInt(0, currencies.length - 1)];
  }

  protected getIsin(index: number): string {
    const isins: string[] = [
      'US046353AB45',
      'FR0010326975',
      'XS0133582147',
      'XS0097283096',
      'XS0253989635',
      'FR0010828095',
      'XS0315528850',
      'XS0173501379',
      'XS0297700006',
      'XS0630204351',
      'FR0010967216',
      'XS0323411016',
      'FR0010185975',
      'USF7061BAN04',
      'DE000A1MA9V5',
      'DE000DB5S5U8',
      'XS1000918018',
      'US822582AC66',
      'XS0097283096',
      'FR0011043124',
      'DE000A0TKUU3',
      'XS0469026453',
      'XS0133582147',
      'XS0493098486',
      'FR0010394478',
      'XS0369461644',
      'S780641AH94',
      'XS0369461644',
      'XS0909769407',
      'XS0741004062',
      'XS0783934911',
      'XS0133582147',
      'XS0097283096',
      'XS0253989635',
      'FR0010828095',
      'XS0315528850',
      'XS0173501379'
    ];
    return isins[index];
  }

  protected getTicker(index: number): string {
    const tickers: string[] = [
      'AZN',
      'BOUY',
      'BYLAN',
      'KONIPHI',
      'SIEM',
      'LADBRK',
      'RNTKIL',
      'WENL',
      'PSON',
      'BAB',
      'DANONE',
      'STAN-Bank',
      'LOUISDR',
      'AF-AirFrance',
      'PERNOD',
      'RDSPLC',
      'DB',
      'BRITEL-BritTel',
      'DAMLR',
      'VLOF',
      'HEI',
      'TATELN',
      'SESG',
      'BAB',
      'SIEM',
      'CARR',
      'KPN',
      'SIEM',
      'LBTG-UPC',
      'TECHGH',
      'WENL',
      'CPGLN',
      'KONIPHI',
      'SIEM',
      'LADBRK',
      'RNTKIL',
      'WENL',
      'PSON',
      'BAB'
    ];
    return tickers[index];
  }

  public getRandomItem(ary: any, max?: number): any {
    if (max) {
      return ary[this.generateRandomInt(0, Math.min(max, ary.length - 1))];
    } else {
      return ary[this.generateRandomInt(0, ary.length - 1)];
    }
  }

  protected getNotionals(): number[] {
    const notionals = [1000000, 2000000, 5000000, 7500000, 10000000];
    return notionals;
  }
  protected getBidOfferSpreads(): number[] {
    const bidOfferSpreads = [0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.5];
    return bidOfferSpreads;
  }
  protected getCounterparties(): string[] {
    const counterparties = [
      'Goldman Sachs',
      'Soc Gen',
      'BAML',
      'Nat West',
      'Barcap',
      'Citi',
      'JP Morgan',
      'Morgan Stanley',
      'BNP'
      //   'Lloyds TSB',
      //   'MUFJ',
      //   'Rabobank',
      //   'RBC',
      //   'Deutsche Bank',
      //   'Credit Suisse',
      //   'Nomura'
    ];
    return counterparties;
  }

  protected getCurrencies(): string[] {
    const currencies = ['EUR', 'USD', 'GBP', 'CHF', 'CAD', 'AUD', 'ZAR'];
    return currencies;
  }

  protected getCurrenciesOtherThanOne(currency: string): string[] {
    return this.getCurrencies().filter(c => c === currency);
  }

  protected getBuySell(): string[] {
    const buySell = ['Buy', 'Sell'];
    return buySell;
  }
  protected getDealType(): string[] {
    const dealType = ['Swap', 'Spot', 'Forward'];
    return dealType;
  }

  protected getCountries(): string[] {
    const countries = [
      'Argentina',
      'Australia',
      'Belgium',
      'Brazil',
      'Canada',
      'China',
      'Denmark',
      'Egypt',
      'France',
      'Germany',
      'Holland',
      'Hungary',
      'India',
      'Ireland',
      'Italy',
      'Japan',
      'Kenya',
      'Luxembourg',
      'Portugal',
      'Qatar',
      'Russia',
      'Spain',
      'Thailand'
    ];
    return countries;
  }

  protected getAmounts(): number[] {
    const amounts = [1000, 1500, 2000, 2500, 3000];
    return amounts;
  }

  protected getMoodysRatings(): string[] {
    const moodysRatings = [
      'Aaa',
      'Aa1',
      'Aa2',
      'Aa3',
      'A1',
      'A2',
      'A3',
      'Baa1',
      'Baa2',
      'Baa3',
      'Ba1',
      'Ba2',
      'Ba3',
      'B1',
      'B2',
      'B3',
      'Caa',
      'Ca',
      'C',
      'WR',
      'NR'
    ];
    return moodysRatings;
  }

  protected getSimilarNumber(originalNumber: number): number {
    const direction = this.generateRandomInt(1, 2);
    //  const randomDouble = this.generateRandomDouble();
    const returnValue =
      direction === 1
        ? this.roundTo4Dp(originalNumber + 0.01)
        : this.roundTo4Dp(originalNumber - 0.01);
    return returnValue;
  }

  // for s&P and Fitch we got one of 3 ratings based off the moodys rating
  protected getRatingFromMoodyRating(moodysRating: string): string {
    switch (moodysRating) {
      case 'Aaa':
        return this.getRandomItem(['AAA', 'AA+']);
      case 'Aa1':
        return this.getRandomItem(['AAA', 'AA+', 'AA']);
      case 'Aa2':
        return this.getRandomItem(['AA+', 'AA', 'AA-']);
      case 'Aa3':
        return this.getRandomItem(['AA', 'AA-', 'A+']);
      case 'A1':
        return this.getRandomItem(['AA-', 'A+', 'A']);
      case 'A2':
        return this.getRandomItem(['A+', 'A', 'A-']);
      case 'A3':
        return this.getRandomItem(['A', 'A-', 'BBB+']);
      case 'Baa1':
        return this.getRandomItem(['A-', 'BBB+', 'BBB']);
      case 'Baa2':
        return this.getRandomItem(['BBB+', 'BBB', 'BBB-']);
      case 'Baa3':
        return this.getRandomItem(['BBB', 'BBB-', 'BB+']);
      case 'Ba1':
        return this.getRandomItem(['BBB-', 'BB+', 'BB']);
      case 'Ba2':
        return this.getRandomItem(['BB+', 'BB', 'BB-']);
      case 'Ba3':
        return this.getRandomItem(['BB', 'BB-', 'B+']);
      case 'B1':
        return this.getRandomItem(['BB-', 'B+', 'B']);
      case 'B2':
        return this.getRandomItem(['B+', 'B', 'B-']);
      case 'B3':
        return this.getRandomItem(['B', 'B-', 'CCC']);
      case 'Caa':
        return this.getRandomItem(['B-', 'CCC', 'CC']);
      case 'Ca':
        return this.getRandomItem(['CCC', 'CC']);
      case 'C':
        return this.getRandomItem(['CC', 'D']);
      case 'WR':
        return 'SD';
      case 'NR':
        return 'NR';
    }
  }

  protected getNames(): string[] {
    const names: string[] = [
      'Stacee Dreiling',
      'Cecil Staab',
      'Sheba Dowdy',
      'Loralee Stalker',
      'Sanjuana Kimsey',
      'Shante Hey',
      'Magen Willison',
      'Casimira Tabler',
      'Annemarie Rybicki',
      'Granville Westfall',
      'Colby Troupe',
      'Wei Frith',
      'Sarai Pilgrim',
      'Yael Rich',
      'Hester Bluhm',
      'Season Landreth',
      'Britany Saffell',
      'Kelley Babb',
      'Bradley Chumley',
      'Louella Spiker'
    ];
    return names;
  }
}
