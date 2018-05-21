import { ArrayExtensions } from "../Extensions/ArrayExtensions";


export module AdaptableBlotterLogger {

   // Bit pointless for now but will add some beef in 2.1...
    export function LogMessage(message: string, ...optionalParams: any[]): void {
        if (ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
            console.log("Adaptable Blotter: " + message, optionalParams)
        } else {
            console.log("Adaptable Blotter: " + message)
        }
    }
    export function  LogWarning(message: string, ...optionalParams: any[]): void {
        if (ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
            console.warn("Adaptable Blotter Warning: " + message, optionalParams)
        } else {
            console.warn("Adaptable Blotter Warning: " + message)
        }
    }
    export function  LogError(message: string, ...optionalParams: any[]): void {
        if (ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
            console.error("Adaptable Blotter Error: " + message, optionalParams)
        } else {
            console.error("Adaptable Blotter Error: " + message)
        }
    }


}
