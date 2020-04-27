# AdapTable 'No Code' Plugin Read Me

<p>
            The No Code Plugin allows you to create an AdapTable instance at
            runtime from any JSON (and soon any Excel) file that you give it.
          </p>
          <p>
            It will dynamically provide a fully functional AdapTable including
            advanced features like state management and audit log, enabling you
            to attach to the same source daily or multiple different sources.
          </p>
          <p>
            Simply link to a file (or drag and drop) and the AdapTable No Code
            Wizard will appear.
          </p>
          <p>
            In the first step it will read the file and work out which columns
            it contains, giving you the option to change any assumptions around
            datatype and to set editabiity and sortabiity for each column.
          </p>
          <p>
            In the second (optional) step you can set up many of the{' '}
            <a
              href="https://api.adaptabletools.com/modules/_src_adaptableoptions_adaptableoptions_.html"
              target="_blank"
            >
              Adaptable Options
            </a>{' '}
            that you would normally provide at design-time to ensure that your
            AdapTable instance suits your requirements.
          </p>
          <p>
            <b>Note: </b> The source data must have one column that contains{' '}
            <b>unique values</b> which you will set as the{' '}
            <a
              href="https://api.adaptabletools.com/interfaces/_src_adaptableoptions_adaptableoptions_.adaptableoptions.html#primarykey"
              target="_blank"
            >
              Primary Key column
            </a>{' '}
            (by convention the first column).
          </p>

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
