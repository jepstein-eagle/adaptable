import { SharedEntity } from '../PredefinedConfig/TeamSharingState';

/**
 * Options for managing **Team Sharing** where Adaptable Objects can be shared between colleagues.
 *
 * [Team Sharing Guide](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/guides/adaptable-team-sharing-guide.md) | [Team Sharing Demo](https://demo.adaptabletools.com/admin/aggridteamsharingdemo) | [Team Sharing Video](https://youtu.be/bPb1PQtyjlQ)
 *
 * Team Sharing allows users to share - at run-time - Adaptable Objects between colleagues.
 *
 * It is designed for use cases where the same, newly-created Adaptable Object (e.g. a Layout, Conditional Style, Advanced Search, Report etc.) will be required by multiple users.
 *
 * Team Sharing is available when the `enableTeamSharing` property is set to true (and the Entitlement's `AccessLevel` is 'Full')
 *
 * **How It Works**
 *
 * The Team Sharing workflow is simple (based on a pull operation) as the following example indicates:
 *
 * 1. A User creates a new Layout
 *
 * 2. In the Layouts Popup an orange Team Share button will appear in the row for the Layout (if Team Sharing is enabled)
 *
 * 3. After this button is clicked, the Layout will be in the Team Sharing collection (available for download by the User's colleagues)
 *
 * 4. A colleague opens the Team Sharing Popup (which lists all available Adaptable Objects that have been shared) and clicks to download the Layout created in Step 1.
 *
 * **Team Sharing Functions**
 *
 * There are 2 functions that need to be provided:
 *
 * - *getSharedEntities*: retrieves any available Shared Entities for the user to download
 *
 * - *setSharedEntities*: saves (essentially uploads) Shared Entities so they can be re-used by other members of the team
 *
 * ```ts
 * teamSharingOptions: {
 *     enableTeamSharing: true,
 *      async getSharedEntities(adaptableId) {
 *        return new Promise(resolve => {
 *          const sharedEntities = JSON.parse(
 *            localStorage.getItem(`TEAM_SHARING:${adaptableId}`) || '[]'
 *          );
 *          setTimeout(() => resolve(sharedEntities), 1000);
 *        });
 *      },
 *      async setSharedEntities(adaptableId, sharedEntities) {
 *        return new Promise(resolve => {
 *          localStorage.setItem(`TEAM_SHARING:${adaptableId}`, JSON.stringify(sharedEntities));
 *          setTimeout(() => resolve(), 1000);
 *        });
 *      },
 *    },
 * ```
 */
export interface TeamSharingOptions {
  /**
   * Whether Team Sharing is enabled
   *
   * **Default Value: false**
   */
  enableTeamSharing: boolean;

  /**
   * Function which retrieves any available Shared Entities that the user is able to download (and merge automatically with his Adaptable State)
   */
  getSharedEntities: (adaptableId: string) => Promise<SharedEntity[]>;

  /**
   * Function which saves (essentially uploads) Shared Entities so they can be downloaded (and re-used) by other members of the team
   */
  setSharedEntities: (adaptableId: string, sharedEntities: SharedEntity[]) => Promise<void>;
}
