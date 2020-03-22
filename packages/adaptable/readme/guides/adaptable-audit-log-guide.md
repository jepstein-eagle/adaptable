# AdapTable Audit Log Guide

The Audit Log - if enabled - streams messages about AdapTable activity to an HTTP Channel for you to listen to (see Audit Log for more information).


To Do!

## FAQ


Can we filter which audit messages are sent via Audit Log?

Yes, the Audit Options section of Adaptable Options allows you to specify which of the Audit Categories you want to enable (CellEdits, FunctionEvents, UserStateChanges and InternalStateChanges).

In addition, most reporting software will allow you to filter the messages that you receive so that you only report and save the ones in which you are interested.

Where do you store the Audit Log messages? 

We don't store them anywhere - AdapTable simply streams all Audit Log messages. Its your responsibility to listen to this stream and persist the messages where most appropriate.

There is an option in Audit Options to send these messages just to the Console though most users prefer for them to be streamed to the Http Channel so that they can use software like the Elastic Stack to listen to them in advanced ways.

What information is sent in an Audit Log message?

That depends on the type of message. All messages have some common properties but others are added if its a function change or a cell edit.

Can we turn off Audit Log if we don't need it?

Yes that is straightforward to do and indeed its turned off by default. If none of the 4 AuditOptions in Audit Options are set to true (auditCellEdits, auditFunctionEvents, auditUserStateChanges, auditInternalStateChanges) then Audit will not be enabled.



## Demos

Visit the [AdapTable Demo Site](https://demo.adaptabletools.com/adaptablestate) to see a number of state-related demos

## Help

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

The other source for Help is our collection of 'Read Me' Docs ([full list here](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/readme-list.md)).

> Previously the main source of AdapTable Help was our [Zendesk Pages](https://adaptabletools.zendesk.com/hc/en-us) but these have been replaced by these 'Read Me' docs and the Developer Documentation that is automatically produced and therefore always up to date.

## More Information

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
