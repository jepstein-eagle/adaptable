# AdapTable Technical FAQ

This Read Me deals with some of the more technical questions that we have been asked.

**What language is AdapTable written in?**

Purely JavaScript.

**Does AdapTable provide any Server-Side capabilities - particularly around searching or filtering?**

Yes there are a number of features recently added to AdapTable that help you perform searching and filtering on the server rather than client.  See for more details.

Additionally we are partnering with a number of third party companies who will be able to provide advanced server side features where they can take dynamic AdapTable queries and run them against millions of rows of data on the server.

### Adaptable Objects

**What are Adaptable Objects**

These are the objects that are created either by the user at run-time, or by developers at design-time, which are used by the Functions. Advanced Searches, Conditional Styles, Shortcuts, Flashing Cell definitions, Cell Validation rules etc. are all Adaptable Objects.

**Are Adaptable Objects vendor specific?**

No, all Adaptable Objects work equally across all vendor implementations. That is one of the great beauties of AdapTable as it means that you can easily move from one underlying DataGrid to another (or have 2 different AdapTable instances sitting on different underlying grids) without needing to rewrite your Adaptable Objects. They will work identically for both vendors.

**Is it possible to create our own Adaptable Objects?**

Yes it is and we expect you to. All Adaptable Objects are simple JSON objects so you can easily create your own objects and then you can include them in the application.

**What do Adaptable Objects look like?**

Obviously all Adaptable Objects are different but they do all implement a common, empty AdaptableObject interface. 

**How easy is it to port Adaptable Objects created in AdaptableBlotter.NET to AdaptableBlotter.JS / AdapTable?**

AdaptableBlotter.NET Objects are stored as XML, while in AdaptableBlotter.JS / AdapTable we use JSON. However we have a conversion tool that will allow you easily to port your Adaptable Objects from XML to JSON (but not the other way round).

**Are we only able to save Adaptable Objects we create to the local browser cache?**

No. If you have enabled Remote Storage in Config Options section of Adaptable Options, then you can store your Adaptable Objects anywhere that you like by using Config Server.

For more details see User State.

**How do I know when an Adaptable Object has changed?**

By listening to the AuditStateChanged event (via the Audit Event api) which provides full details of which function has triggered the change and what the new state is for that function. 


## Help

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

The other source for Help is our collection of 'Read Me' Docs ([full list here](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/readme-list.md)).

> Previously the main source of AdapTable Help was our [Zendesk Pages](https://adaptabletools.zendesk.com/hc/en-us/articles/360007083017-Help-) but these have been replaced by these 'Read Me' docs and the Developer Documentation that is automatically produced and therefore always up to date.

## More Information

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a Support Ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
