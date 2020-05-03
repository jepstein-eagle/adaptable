import { SharedEntity } from '../PredefinedConfig/TeamSharingState';

/**
 * Options for managing **Team Sharing** where Adaptable Objects can be shared between colleagues.
 *
 * [Demo Site](https://demo.adaptabletools.com/admin/aggridteamsharingdemo) | [Team Sharing Guide](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/guides/adaptable-team-sharing-guide.md) | [Team Sharing Video](https://youtu.be/bPb1PQtyjlQ)
 *
 * Includes 2 functions
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
