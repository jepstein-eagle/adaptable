import { AdaptableBlotterState } from '../Redux/Store/Interface/IAdaptableStore';

/**
 * Options related to state hydration/dehydration - allows users to intercept state persistence and state loading with custom functionality.
 *
 * By default, AdaptableBlotterState is persisted in the local storage of the user browser, under the `blotterId` key.
 *
 * (Or if you are using [Config Server](_blotteroptions_configserveroptions_.configserveroptions.html) in the location specified by the configServerUrl property).
 *
 * The various state-management functions provided here allow you to change this default behaviour, and also to add custom properties in the persisted state.
 *
 * The AdaptableBlotterState flow is the following:
 *
 * **User Loads Page** --> loadState(): state1 -> applyState(state1): state2 ---- BLOTTER NOW READY WITH STATE (state2) ---- **User Updates State** ------ saveState(state3): state4  -> persistState(state4)
 *
 */
export interface StateOptions {
  /**
   * Allows the customization of state persistence. By default, state stringified using JSON.stringify and persisted into the localStorage, at the key denoted by `blotterId` - in case no config server was defined via `configServerOptions`. If a config server was specified, the default implementation sends a POST request at the url of the config server, with the blotter state as the body (in JSON) of the request.
   *
   * This function can be used to change this behavior, throttle state persistence, etc.
   *
   * If defined, most likely it should be used in conjunction with `stateOptions.loadState`, which is the other side of the persistence mechanism.
   *
   * The persistence (dehydration) flow is the following: `saveState` -> `persistState`.
   *
   * So if you want to add other properties on the state that is going to be persisted, use `saveState`. Whatever `saveState` returns is passed to `persistState`.
   *
   * **Default Implementation: stringifies the state and puts it into the localStorage using the `blotterId` key**
   */
  persistState?: AdaptableBlotterPersistStateFunction;

  /**
   * Allows the customization of state loading.
   *
   * By default, it reads the state that was persisted from localStorage (at the `blotterId` key) and returns it.
   *
   * (If Remote Config Server has been set up, then the default implementation fetches the config server url and returns the resulting object).
   *
   * If defined, most likely it is used in conjunction with `stateOptions.persistState`, which is the other side of the persistence mechanism.
   *
   * For example, `loadState` could be used to load the blotter state from the browser window object or from a remote location altogether.
   *
   * The hydration flow is the following: `loadState` -> `applyState`
   *
   * So whatever `loadState` returns, is passed to `applyState`.
   *
   * **Default implementation: for local predefinedConfig, it reads the state from `localStorage<blotterId>` and parses it as a JavaScript object, which is returned**
   *
   *
   */
  loadState?: AdaptableBlotterLoadStateFunction;

  /**
   * Allows the customization of the state that is going to be persisted.
   * So if you simply want to add other properties to the state, before persistence, use this function:
   *
   * ```ts
   * blotterOptions = {
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
   * NOTE: If you used `saveState` to add custom app-specific properties on the top-level object you returned, it's a good practice to clear these properties and just return the blotter state from the `applyState` function.
   *
   * **Default implementation: (state) => state**
   */
  saveState?: (state: AdaptableBlotterState) => Partial<AdaptableBlotterState>;

  /**
   * Allows hooking into the blotter state hydration - useful when `saveState` was specified and added new custom properties, which will again be accessible into the `applyState` function.
   *
   * This function determines what state is (re)applied on the blotter when the blotter is initialized.
   *
   * NOTE: If you used `saveState` to add custom app-specific properties on the top-level object you returned, it's a good practice to clear these properties and just return the blotter state from the `applyState` function.
   *
   * ```ts
   * blotterOptions = {
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
   *       const { userSettings, ...blotterState } = state
   *
   *       // do something with userSettings here
   *
   *       return blotterState
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
  applyState?: (state: any) => any;
}

/**
 * Allows the customization of state persistence.
 *
 * Userd by the `persistState` function property in StateOptions
 */
export interface AdaptableBlotterPersistStateFunction {
  (
    state: Partial<AdaptableBlotterState>,
    { blotterId, userName, url }: { blotterId: string; userName: string; url?: string }
  ): Promise<any>;
}

/**
 * Allows the customization of state loading.
 *
 * Userd by the `loadState` function property in StateOptions
 */
export interface AdaptableBlotterLoadStateFunction {
  (config: { blotterId: string; userName: string; url?: string }): Promise<any>;
}
