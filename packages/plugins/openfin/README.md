# AdapTable Openfin Plugin Read Me

In order to use this plugin, you have to install `@adaptabletools/adaptable-plugin-openfin` and specify it in your `adaptableOptions` configuration object, as shown below:

```ts
const adaptableOptions: AdaptableOptions = {
    adaptableId: 'openfindemo1',
    plugins: [
      openfin()
    ]
    // ... other options
}
```

## OpenFin configuration

To use the AdapTable-Excel integration with your openfin setup, in your app.json, you need to specify

```json
"services": [
    { "name": "excel",
        "manifestUrl": "http://openfin.github.io/excel-api-example/provider/app.json"
    }
]
```

## Help

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

The other source for Help is our collection of 'Read Me' Docs ([full list here](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/readme-list.md)).

> Previously the main source of AdapTable Help was our [Zendesk Pages](https://adaptabletools.zendesk.com/hc/en-us/articles/360007083017-Help-) but these have been replaced by these 'Read Me' docs and the Developer Documentation that is automatically produced and therefore always up to date.

## More Information

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a Support Ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
