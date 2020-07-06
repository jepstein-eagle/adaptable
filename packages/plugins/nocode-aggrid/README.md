# AdapTable 'No Code' Plugin

The No Code Plugin allows end users to create an AdapTable instance at runtime from any JSON or Excel file that they provide.
 
It will dynamically instantiate a fully functional AdapTable including advanced features like state management and audit log, enabling Users to attach to the same source daily or multiple different sources.
 
## No Code Wizard
Once a JSON or Excel file has been selected (or dragged and droppped), the AdapTable No Code Wizard will appear.

It has 2 steps:

1.  The Wizard will read the input file / JSON and list the available columns it contains, together with options for each column to change the DataType, and set editing, filtering, sorting, grouping and other properties.

2. A second (optional) step allows Users to set up many of the [Adaptable Options](https://api.adaptabletools.com/modules/_src_adaptableoptions_adaptableoptions_.html) that would normally be configured at design-time, in order to ensure that the AdapTable instance suits their precise requirements.
         
> The source data must have one column that contains **unique values** which will be set as the [Primary Key column](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_adaptableoptions_.adaptableoptions.html#primarykey) (by convention this is the first column).

## Code Required
There is minimum code required to set up the No Code plugin. 

A full example would be as follows:

```jsx
import "@adaptabletools/adaptable/index.css";
import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css";
import nocode from "@adaptabletools/adaptable-plugin-nocode-aggrid";
import { AdaptableOptions} from "@adaptabletools/adaptable/types";
import { AllEnterpriseModules } from "@ag-grid-enterprise/all-modules";
import Adaptable from "@adaptabletools/adaptable/agGrid";

const adaptableOptions: AdaptableOptions = {
  primaryKey: "",
  userName: "Demo User",
  adaptableId: "Nocode Plugin Demo",
  plugins: [
    nocode({
      onInit: adaptableOptions => {
        adaptableOptions.vendorGrid.modules = AllEnterpriseModules;
      }
    })
  ]
};

Adaptable.init(adaptableOptions).then((api) => {
  console.log(api, "!!!");
});
```

## Example Project
Visit the [No Code Example Project](https://github.com/AdaptableTools/example-adaptable-nocode-aggrid) to see a basic example of how to set up the No Code plugin.

## Demo
Visit the [No Code Demo](https://demo.adaptabletools.com/admin/aggridnocodedemo) to see AdapTable running the No Code plugin.

## Help
Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

The other source for Help is our collection of 'Read Me' Docs ([full list here](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/readme-list.md)).

> Previously the main source of AdapTable Help was our [Zendesk Pages](https://adaptabletools.zendesk.com/hc/en-us/articles/360007083017-Help-) but these have been replaced by these 'Read Me' docs and the Developer Documentation that is automatically produced and therefore always up to date.

## More Information
General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com) 

## Support
For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a Support Ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
