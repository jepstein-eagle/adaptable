import * as StrategyConstants from '../Constants/StrategyConstants'

export module StrategyHelper {

    export function IsEditStrategy(strategyId: string): boolean {
        return strategyId != StrategyConstants.SmartEditStrategyId
    }
    export function IsFilterStrategy(strategyId: string): boolean {
        return strategyId != StrategyConstants.SmartEditStrategyId
    }
    export function IsSortStrategy(strategyId: string): boolean {
        return strategyId != StrategyConstants.SmartEditStrategyId
    }

   

}