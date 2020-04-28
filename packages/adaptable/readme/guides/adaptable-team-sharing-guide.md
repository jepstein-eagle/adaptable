# AdapTable Team Sharing Guide
Team Sharing allows users to share - at run-time - Adaptable Objects between colleagues.

It is designed for use cases where the same, newly-created Adaptable Object (e.g. a Layout, Conditional Style, Advanced Search, Report etc.) will be used by multiple users.

## How It Works
The workflow is simple (based on a pull operation):

1. A User creates a new Layout

2. In the Layouts Popup an orange *Team Share* button will appear at the end of the row for each Layout (if Team Sharing has been [enabled](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_teamsharingoptions_.teamsharingoptions.html))

3. When the User clicks this button the Layout will appear in the Team Sharing collection available for download by colleagues

4. Any colleague can now open the Team Sharing Popup (which lists all available Adaptable Objects that have been shared) and click to download the Layout created in Step 1.

## Team Sharing Functions
Setting up Team Sharing requires the provision at design-time of 2 functions (both of which return Promises both of which are supplied through [Team Sharing Options](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_teamsharingoptions_.teamsharingoptions.html)):

 - **[getSharedEntities](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_teamsharingoptions_.teamsharingoptions.html#getsharedentities)**: retrieves any available Shared Entities that the user is able to download (and which AdapTable will then merge automatically with his Adaptable State)

 - **[setSharedEntities](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_teamsharingoptions_.teamsharingoptions.html#setsharedentities)**: saves (essentially uploads) Shared Entities so they can be downloaded (and re-used) by other members of the team

 ```ts

 teamSharingOptions: {
     enableTeamSharing: true,
      async getSharedEntities(adaptableId) {
        return new Promise(resolve => {
          const sharedEntities = JSON.parse(
            localStorage.getItem(`TEAM_SHARING:${adaptableId}`) || '[]'
          );
          setTimeout(() => resolve(sharedEntities), 1000);
        });
      },
      async setSharedEntities(adaptableId, sharedEntities) {
        return new Promise(resolve => {
          localStorage.setItem(`TEAM_SHARING:${adaptableId}`, JSON.stringify(sharedEntities));
          setTimeout(() => resolve(), 1000);
        });
      },
    }

 ```

## FAQ

**Can we turn off Team Sharing if we don't want to use it?**

You don't need to turn off Team Sharing as its not available by default. 

Team Sharing is only available if the `enableTeamSharing` property is set to true in [Team Sharing Options](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_teamsharingoptions_.teamsharingoptions.html) 

**Can we share Adaptable Objects between different Adaptable instances?**

No.  Team Sharing is designed to be used only for instances that share a single `AdaptableId`; e.g. all users of a CDS Pricer can share the same Report but it cannot also be used in a Bond Matrix Pricer.


## Demos

Visit the [AdapTable Demo Site](https://demo.adaptabletools.com/) to see a number of AdapTable.

## Help

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

The other source for Help is our collection of 'Read Me' Docs ([full list here](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/readme-list.md)).

> Previously the main source of AdapTable Help was our [Zendesk Pages](https://adaptabletools.zendesk.com/hc/en-us/articles/360007083017-Help-) but these have been replaced by these 'Read Me' docs and the Developer Documentation that is automatically produced and therefore always up to date.

## More Information

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a Support Ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).