import { AdaptableState } from '../PredefinedConfig/AdaptableState';

/**
 * Options related to state hydration/dehydration - allows users to intercept state persistence and state loading with custom functionality.
 *
 * By default, AdaptableState is persisted in the local storage of the user browser, under the `adaptableId` key.
 *
 * The various state-management functions provided here allow you to change this default behaviour, and also to add custom properties in the persisted state.
 *
 * Note: since Version 7 this is the only way to manage remote storage as the previous (and long deprecated) implementation - Config Server - was removed.
 *
 * --------------
 *
 *  **Further AdapTable Help Resources**
 *
 * [Demo Site](https://demo.adaptabletools.com/adaptablestate/aggridstatefunctionsdemo) | [Adaptable State ReadMe](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/guides/adaptable-state-guide.md)
 *
 *  --------------
 *
 * The 4 functions you can provide your own implementations for are:
 *
 * - `loadState`: Allows the customization of state loading.
 *
 * - `applyState`: Allows hooking into AdaptableState hydration
 *
 * - `saveState`: Allows the customization of the state that is going to be persisted
 *
 * - `persistState`: Allows the customization of state persistence
 *
 * AdaptableState flow is the following:
 *
 * **User Loads Page** --> `loadState()`: state1 -> `applyState(state1)`: state2 ---- ADAPTABLE NOW READY WITH STATE (state2) ---- **User Updates State** ------ `saveState(state3)`: state4  -> `persistState(state4)`
 *
 */
export interface StateOptions {
  /**
   * Allows the customization of state persistence. By default, state stringified using JSON.stringify and persisted into the localStorage, at the key denoted by `adaptableId`.
   *
   * This function can be used to change this behavior, throttle state persistence, etc.
   *
   * If defined, most likely it should be used in conjunction with `stateOptions.loadState`, which is the other side of the persistence mechanism.
   *
   * The persistence (dehydration) flow is the following: `saveState` -> `persistState`.
   *
   * So if you want to add other properties on the state that is going to be persisted, use `saveState`. Whatever `saveState` returns is passed to `persistState`.
   *
   * **Default Implementation: stringifies the state and puts it into the localStorage using the `adaptableId` key**
   */
  persistState?: AdaptablePersistStateFunction;

  /**
   * Allows the customization of state loading.
   *
   * By default, AdapTable will read the state that was persisted from localStorage (at the `adaptableId` key) and returns it.
   *
   * If this function is defined, most likely it will be used in conjunction with `stateOptions.persistState`, which is the other side of the persistence mechanism.
   *
   * For example, `loadState` could be used to load adaptable state from the browser window object or from a remote location altogether.
   *
   * The hydration flow is the following: `loadState` -> `applyState`
   *
   * So whatever `loadState` returns, is passed to `applyState`.
   *
   * **Default implementation: for local predefinedConfig, it reads the state from `localStorage<adaptableId>` and parses it as a JavaScript object, which is returned**
   *
   *
   */
  loadState?: AdaptableLoadStateFunction;

  /**
   * Allows the customization of the state that is going to be persisted.
   *
   * So if you simply want to add other properties to the state, before persistence, use this function:
   *
   * ```ts
   * adaptableOptions = {
   *   stateOptions: {
   *     saveState: (state) => {
   *       return {
   *         ...state,
   *         userSettings: {
   *           language: 'de'
   *         }
   *       }
   *     }
   *   }
   * }
   * ```
   *
   * In this case, you might find it useful to also define `applyState` which hooks into state hydration, and gives you access to the persisted custom properties, so you can use them later in the app.
   *
   * If you also want to modify the persistence behavior, you have to implement the `persistState` as well.
   *
   * The persistence (dehydration) flow is the following: `saveState` -> `persistState`.
   *
   * NOTE: You have to make sure that the returned object is serializable with JSON.stringify - in case that it's not, you could define `persistState` to do a custom serialization of the object.
   *
   * NOTE: This function should be a synchronous function.
   *
   * NOTE: If you used `saveState` to add custom app-specific properties on the top-level object you returned, it's a good practice to clear these properties and just return adaptable state from the `applyState` function.
   *
   * **Default implementation: (state) => state**
   */
  saveState?: AdaptableSaveStateFunction;

  /**
   * Allows hooking into AdaptableState hydration - useful when `saveState` was specified and added new custom properties, which will again be accessible into the `applyState` function.
   *
   * This function determines what state is (re)applied in adaptable when adaptable is initialized.
   *
   * NOTE: If you used `saveState` to add custom app-specific properties on the top-level object you returned, it's a good practice to clear these properties and just return adaptable state from the `applyState` function.
   *
   * ```ts
   * adaptableOptions = {
   *   stateOptions: {
   *     saveState: (state) => {
   *       return {
   *         ...state,
   *         userSettings: {
   *           language: 'de'
   *         }
   *       }
   *     },
   *     applyState: (state) => {
   *       const { userSettings, ...adaptableState } = state
   *       // do something with userSettings here
   *       return adaptableState
   *     }
   *   }
   * }
   * ```
   *
   * The hydration flow is the following: `loadState` -> `applyState`
   * So whatever `loadState` returns, is passed to `applyState`.
   *
   * NOTE: This function should be a synchronous function.
   *
   * **Default implementation: (state) => state**
   */
  applyState?: (state: Partial<AdaptableState>) => Partial<AdaptableState>;

  /**
   * An optional delay (in milliseconds) to debounce state persistence - namely saveState/persistState calls.
   *
   * The debounce technique allow us to "group" multiple sequential calls in a single one - a good illustration is elevator doors.
   *
   * **Defaults to: 400**. Also, the wait will be max 1000ms, at which point the save/persist calls will happen anyway.
   */
  debounceStateDelay?: number;
}

type AdaptableStateFunctionConfig = {
  adaptableId: string;
  adaptableStateKey: string;
  userName: string;
  url?: string;
};

/**
 * Allows the customization of state persistence.
 *
 * Userd by the `persistState` function property in StateOptions
 */
export interface AdaptablePersistStateFunction {
  (
    state: any,
    { adaptableId, adaptableStateKey, userName, url }: AdaptableStateFunctionConfig
  ): Promise<any>;
}

/**
 * Allows the customization of state persistence.
 *
 * Used by the `saveState` function property in StateOptions
 */
export interface AdaptableSaveStateFunction {
  (
    state: AdaptableState,
    { adaptableId, adaptableStateKey, userName, url }: AdaptableStateFunctionConfig
  ): Partial<AdaptableState>;
}

/**
 * Allows the customization of state loading.
 *
 * Userd by the `loadState` function property in StateOptions
 */
export interface AdaptableLoadStateFunction {
  (config: AdaptableStateFunctionConfig): Promise<any>;
}
