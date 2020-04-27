# AdapTable 'No Code' Plugin Read Me

The No Code Plugin allows you to create an AdapTable instance at runtime from any JSON (and soon any Excel) file that you give it.
 
It will dynamically provide a fully functional AdapTable including advanced features like state management and audit log, enabling you to attach to the same source daily or multiple different sources.
 
Simply link to a file (or drag and drop) and the AdapTable No Code Wizard will appear.

In the first step it will read the file and work out which columns t contains, giving you the option to change any assumptions around datatype and to set editabiity and sortabiity for each column.

In the second (optional) step you can set up many of the [Adaptable Options](https://api.adaptabletools.com/modules/_src_adaptableoptions_adaptableoptions_.html) that you would normally provide at design-time to ensure that your AdapTable instance suits your requirements.
         
**Note**: The source data must have one column that contains *unique values* which you will set as the [Primary Key column](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_adaptableoptions_.adaptableoptions.html#primarykey (by convention the first column).

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
