
 interface ITrade {
        tradeId: number;
        notional: number;
        deskId: number;
        counterparty: string;
        currency: string;
        country: string;
        changeOnYear: number;
        amount: number;
        price: number;
        bid: number;
        ask: number;
        bidOfferSpread: number;
        status: string;
        isLive: boolean;
        fitchRating: string;
        moodysRating: string;
        sandpRating: string;
        tradeDate: Date;
        settlementDate: Date;
        bloombergAsk: number;
        bloombergBid: number;   
        percentChange: number;
         lastUpdated: Date;
        lastUpdatedBy: string;
        /*
        extraCol1: string;
        extraCol2: string;
        extraCol3: string;
        extraCol4: string;
        extraCol5: string;
        extraCol6: string;
        extraCol7: string;
        extraCol8: string;
        extraCol9: string;
        extraCol10: string;
        extraCol11: string;
        extraCol12: string;
        extraCol13: string;
        extraCol14: string;
        extraCol15: string;
        extraCol16: string;
        extraCol17: string;
        extraCol18: string;
        */
    }