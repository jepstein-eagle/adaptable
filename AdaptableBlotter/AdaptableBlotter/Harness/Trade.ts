module HarnessKendo {
    export interface ITrade {
        tradeId: number;
        notional: number;
        deskId: number;
        counterparty: string;
        currency: string;
        country: string;
        marketPrice: number;
        bid: number;
        ask: number;
        isLive: boolean;
        fitchRating: string;
        moodysRating: string;
        tradeDate: Date;
        settlementDate: Date;
        bloombergAsk: number;
        bloombergBid: number;
        indicativeAsk: number;
        indicativeBid: number;
        delta: number;
        occasionalPrice: number;
        bookingGuid: string;
        lastUpdated: Date;
        lastUpdatedBy: string;
    }
}