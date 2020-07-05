# AdapTable FAQ - General

This FAQ includes some of the more general questions that we have been asked. More specific questions can be found in the other FAQs.

## General Information

**Is there a demo site where I can see AdapTable in action?**

Yes, we have a [Demo Site](http://www.adaptabletools.com). This contains multiple data sets - many of which are pre-populated with Adaptable Objects like searches and styles - so you can see some examples of how AdapTable can be used.

**How performant is AdapTable?**

Very. We are confident that it is the fastest fully-featured HTML5 grid on the market. 

You can see from the [Big Data Demo](https://demo.adaptabletools.com/admin/aggridbigdatademo) that even with a very large data set and hundreds of thousands flashing cell and data updates a second, AdapTable is still completely reactive and all the styles and searches still work.

**We are not a financial company but would still like the functionality you offer. Are you only suitable for trading?**

You can use AdapTable in any profession or industry. Its a first class tool for managing large amounts of data, irrespective of what that data is. So while it is very popular with traders, sales and other financial users it is widely used in other industries as well.

> If you are a financial user then you can add our [Finance Plugin](https://github.com/AdaptableTools/adaptable/blob/master/packages/plugins/finance/README.md) which contains some financial-specific functionality.

## Data Requirements

**Is there a particular asset class or type of data for which AdapTable is most suitable? Can we use AdapTable for FX?**

AdapTable works with any data set, and is not restricted to one particular asset class; indeed the data in AdapTable doesn't have to be financial. 

Any 'tabular' data that fits neatly into rows and columns is suitable for AdapTable. 

So you can use the tool with any data that you want - we have users across mutliple sectors including legal, pharmaceutical and media.

**Does AdapTable know about particular asset classes?**

No, it doesn't. AdapTable is completely data agnostic and has no knowledge of any asset classes or financial instruments. 

> If you are a financial user then you can add our [Finance Plugin](https://github.com/AdaptableTools/adaptable/blob/master/packages/plugins/finance/README.md) which contains some financial-specific functionality.

**Does AdapTable help me to gather my data?**

No. AdapTable does not get involved in getting your data into the grid, nor what happens to your data after you edit it. 

The sole focus of AdapTable is to ensure that while the data is in front of you, you are able to search, edit, style, export, and manage your data in exciting, powerful and intuitive ways not previously possible.

**Where does the data AdapTable can display come from?**

Anywhere that you want. It can be streamed, or come from a database, middle tier, the cloud, read from files or anything else you want. 

So long your data is suitable to act as the datasource in the underlying grid, AdapTable will be able to use the data.

**Can I have multiple AdapTable instances all looking at the same data source?**

Yes, this is something that we support. To see a good example of multiple grids sharing data and updates with each other (and with 3rd party components via OpenFin and Finsemble) download the Finsemble demo from our demo site.

**Can I restrict who can do what?**

Yes. Our [Entitlements](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/guides/adaptable-entitlements-guide.md) functionality allows you set different permissions for each user.

**Can I use AdapTable to match trades?**

This is a good example of a very specific use case where it does not make sense for AdapTable to provide a full solution out of the box in its core functionality. However as a result of the Action Columns function, the RowSelection event and our Api, it is something that is trivial for developers using the Adaptable to do in just a few minutes.

**Do you store any user data?**

No we have no storage mechanism. Any data that is used in AdapTable is not accessible to us in any way.

**Who are the target audience of AdapTable?**

Anyone who has to manage large data sets and would benefit from the searching, styling, editing, exporting and other functions that we offer. Although we have initially targeted financial services in our marketing and sales efforts, AdapTable can be - and is being - used across all industries.

**Do I still have access to the underlying grid control if I use AdapTable?**

Yes AdapTable doesn't hide the underlying grid. So you still have full access to the full API and can code against it just as if AdapTable was not being used.

**Do you include licences for the underlying grid?**

No, we don't. If the underlying grid requires a commercial licence then you must pay for that separately. AdapTable will not check if the licence is present. 

## Grids

**Which grid version do you support?**

We support the most recent major version of each underlying grid. 

**Which underlying grids are currently supported?**

We currently support:

- ag-Grid (from ag-Grid)

- HyperGrid (from OpenFin)

- Kendo Grid (from Telerik)

We are adding more grids all the time so please watch this space.

> Additionally, we plan to release in 2020 our own Adaptable Grid designed to work closely with AdapTable.

**Which grids do you plan to add next?**

We are planning to add implementations for ng-Grid, SlickGrid and FancyGrid. But if you have urgent requirements for a different grid, please get in touch.

**How easy is it to add a new grid? How long does it take?**

Each use case is different but it usually takes a couple of months for us to implement a new grid. Most of our functions are implemented very quickly, but there is always one that requires a lot of bespoke work and effort. 

**Can we add a grid implementation?**

Yes, you can. We would be delighted if others contributed to our current grid implementations. Please get in touch.

**Do you support all the functionality in the underlying grid e.g. grouping?**

Yes, if the underlying grid has grouping then AdapTable will support it fully and all our functions will work while grouping is applied. For example, see the ag-Grid grouping demo on our demo site.


## Libraries and Frameworks

**What JavaScript libraries or framework do you use?**

We use React to build our own screens, and Redux to maintain our internal state.

**Should I use your Redux store or my own?**

It is best that you use your own Redux store. Although generally the advice is that one store per application is preferred, the best practice when you are using an external component (like AdapTable) is to have separate stores. You do of course have access to our store to listen, and react, to changes in our state.

**Can we listen to state changes in your Redux store?**

Yes, you can subscribe to our Redux store, and react to changes as appropriate.

> While the above option is valid we would strongly advise you to listen to the Adaptable API Events and Audit Events which will give you the same information - and more - in a more structured and safe way.

**Which JavaScript frameworks are you compatible with?**

AdapTable is compatible with any library or framework. Although it uses React and Redux internally to build its own screens, it works with any other library. We have users who use Angular, Ember, JQuery and many other libraries in the 'hosting' application.

**Do you offer framework-friendly wrappers?**

Yes we do.  We currently offer React and Angular wrappers (both for ag-Grid only) to be followed soon by Vue, Ember and others.


## Help

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

The other source for Help is our collection of 'Read Me' Docs ([full list here](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/readme-list.md)).

> Previously the main source of AdapTable Help was our [Zendesk Pages](https://adaptabletools.zendesk.com/hc/en-us/articles/360007083017-Help-) but these have been replaced by these 'Read Me' docs and the Developer Documentation that is automatically produced and therefore always up to date.

## More Information

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a Support Ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
