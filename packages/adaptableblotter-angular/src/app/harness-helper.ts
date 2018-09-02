export class HarnessHelper {
  public currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });

  shortDateFormatter = new Intl.DateTimeFormat('en-GB');

  getTradeSchemaTemp(): any {
    const schema = [];
    schema.push({ headerName: 'Trade Id', field: 'tradeId' });
    return schema;
  }

  getTradeSchema(): any {
    const schema = [];
    schema.push({ headerName: 'Trade Id', field: 'tradeId', editable: false, filter: 'text' });
    schema.push({
      headerName: 'Notional',
      field: 'notional',
      editable: true,
      filter: 'text',
      cellRenderer: this.notionalCellRenderer,
      enableRowGroup: true,
      enableValue: true
    });
    schema.push({
      headerName: 'DeskId',
      field: 'deskId',
      editable: true,
      filter: 'text',
      enableRowGroup: true
    });
    schema.push({
      headerName: 'Counterparty',
      field: 'counterparty',
      editable: true,
      filter: 'text',
      enableRowGroup: true
    });
    schema.push({
      headerName: 'Country',
      field: 'country',
      editable: true,
      filter: 'text',
      enableRowGroup: true
    });
    schema.push({
      headerName: 'Currency',
      field: 'currency',
      editable: false,
      filter: 'text',
      enableRowGroup: true,
      suppressFilter: true
    });
    schema.push({
      headerName: 'Change On Year',
      field: 'changeOnYear',
      editable: true,
      filter: 'text'
    });

    schema.push({
      headerName: 'Bid Offer Spread',
      field: 'bidOfferSpread',
      columnGroupShow: 'open',
      editable: true,
      cellClass: 'number-cell'
    });
    schema.push({
      headerName: 'Price',
      field: 'price',
      columnGroupShow: 'open',
      editable: true,
      cellClass: 'number-cell',
      enableRowGroup: true
    });
    schema.push({
      headerName: 'Ask',
      field: 'ask',
      columnGroupShow: 'closed',
      cellClass: 'number-cell'
    });
    schema.push({
      headerName: 'Bid',
      field: 'bid',
      columnGroupShow: 'closed',
      cellClass: 'number-cell'
    });
    schema.push({
      headerName: 'Bloomberg Ask',
      field: 'bloombergAsk',
      columnGroupShow: 'closed',
      cellClass: 'number-cell'
    });
    schema.push({
      headerName: 'Bloomberg Bid',
      field: 'bloombergBid',
      columnGroupShow: 'closed',
      cellClass: 'number-cell'
    });
    schema.push({
      headerName: 'Fitch Rating',
      field: 'fitchRating',
      editable: true,
      filter: 'text'
    });
    schema.push({
      headerName: 'Moodys Rating',
      field: 'moodysRating',
      editable: true,
      filter: 'text'
    });
    schema.push({
      headerName: 'SandP Rating',
      field: 'sandpRating',
      editable: true,
      filter: 'text'
    });
    schema.push({
      headerName: 'Trade Date',
      field: 'tradeDate',
      editable: true,
      cellEditorParams: { useFormatter: true },
      valueParser: this.dateParseragGrid,
      valueFormatter: this.shortDateFormatteragGrid
    });
    schema.push({
      headerName: 'Settlement Date',
      field: 'settlementDate',
      editable: true,
      cellEditorParams: { useFormatter: true },
      valueParser: this.dateParseragGrid,
      valueFormatter: this.shortDateFormatteragGrid
    });
    schema.push({ headerName: 'Percent Change', field: 'percentChange', filter: 'text' });
    schema.push({
      headerName: 'Last Updated By',
      field: 'lastUpdatedBy',
      filter: 'text',
      enableRowGroup: true
    });
    schema.push({
      headerName: 'Last Updated',
      field: 'lastUpdated',
      editable: true,
      cellEditorParams: { useFormatter: true },
      valueParser: this.dateParseragGrid,
      valueFormatter: this.shortDateFormatteragGrid
    });
    return schema;
  }

  notionalCellRenderer = (params: any) => {
    if (params.value) {
      return this.currencyFormatter.format(params.value);
    } else {
      return null;
    }
  }

  numberToBool = (params: any) => {
    if (params.value === 0) {
      return 'false';
    } else {
      return 'true';
    }
  }

  dateParseragGrid = (params: any) => {
    try {
      return this.stringToDate(params.newValue, 'dd/mm/yyyy', '/');
    } catch (ex) {
      console.error(
        'Error parsing the date value: ' + params.newValue + ' and node : ',
        params.node
      );
    }
  }

  stringToDate = (date: any, format: any, delimiter: any) => {
    const formatLowerCase = format.toLowerCase();
    const formatItems = formatLowerCase.split(delimiter);
    const dateItems = date.split(delimiter);
    const monthIndex = formatItems.indexOf('mm');
    const dayIndex = formatItems.indexOf('dd');
    const yearIndex = formatItems.indexOf('yyyy');
    const month = parseInt(dateItems[monthIndex], 10) - 1;
    const formatedDate = new Date(
      parseInt(dateItems[yearIndex], 10),
      month,
      parseInt(dateItems[dayIndex], 10)
    );
    return formatedDate;
  }

  decimalPlaceRendereragGrid = (minDigits: any, maxDigits: any) =>
    function(params: any) {
      if (params.value) {
        const decimalPlaceFormatter = new Intl.NumberFormat('en-GB', {
          minimumFractionDigits: minDigits,
          maximumFractionDigits: maxDigits
        });
        return decimalPlaceFormatter.format(params.value);
      }
    }

  capitalize = (string: any) => {
    return (/[a-z]/.test(string) ? string : string.toLowerCase())
      .replace(/[\s\-_]*([^\s\-_])([^\s\-_]+)/g, this.replacer)
      .replace(/[A-Z]/g, ' $&')
      .trim();
  }

  replacer(a: any, b: any, c: any) {
    return b.toUpperCase() + c;
  }

  shortDateFormatteragGrid = (params: any) => {
    try {
      if (params.value) {
        return this.shortDateFormatter.format(params.value);
      } else {
        return null;
      }
    } catch (ex) {
      console.error(
        'Error formatting the date for value: ' + params.value + ' and node : ',
        params.node
      );
    }
  }

  boolParseragGrid = (params: any) => {
    try {
      return `<input type='checkbox'   ${params.value ? 'checked' : ''} />`;
    } catch (ex) {
      console.error(
        'Error parsing the date value: ' + params.newValue + ' and node : ',
        params.node
      );
    }
  }

  currencyRendereragGrid = (params: any) => {
    try {
      if (params.value) {
        return this.currencyFormatter.format(params.value);
      } else {
        return null;
      }
    } catch (ex) {
      console.error(
        'Error formatting the currency for value: ' + params.value + ' and node : ',
        params.node
      );
    }
  }
}
