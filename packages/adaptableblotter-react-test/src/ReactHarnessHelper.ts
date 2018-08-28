export class ReactHarnessHelper {
  public currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  getTradeSchemaTemp(): any {
    var schema = []
    schema.push({ headerName: 'Trade Id', field: 'tradeId' })
    return schema
  }

  getTradeSchema(): any {
    var schema = []
    schema.push({ headerName: 'Trade Id', field: 'tradeId', editable: false, filter: 'text' })
    schema.push({
      headerName: 'Notional',
      field: 'notional',
      editable: true,
      filter: 'text',
      cellRenderer: this.notionalCellRenderer,
      enableRowGroup: true,
      enableValue: true
    })
    schema.push({
      headerName: 'DeskId',
      field: 'deskId',
      editable: true,
      filter: 'text',
      enableRowGroup: true
    })
    schema.push({
      headerName: 'Counterparty',
      field: 'counterparty',
      editable: true,
      filter: 'text',
      enableRowGroup: true
    })
    schema.push({
      headerName: 'Country',
      field: 'country',
      editable: true,
      filter: 'text',
      enableRowGroup: true
    })
    schema.push({
      headerName: 'Currency',
      field: 'currency',
      editable: false,
      filter: 'text',
      enableRowGroup: true,
      suppressFilter: true
    })
    schema.push({
      headerName: 'Change On Year',
      field: 'changeOnYear',
      editable: true,
      filter: 'text'
    })

    schema.push({
      headerName: 'Bid Offer Spread',
      field: 'bidOfferSpread',
      columnGroupShow: 'open',
      editable: true,
      cellClass: 'number-cell'
    })
    schema.push({
      headerName: 'Price',
      field: 'price',
      columnGroupShow: 'open',
      editable: true,
      cellClass: 'number-cell',
      enableRowGroup: true
    })
    schema.push({
      headerName: 'Ask',
      field: 'ask',
      columnGroupShow: 'closed',
      cellClass: 'number-cell'
    })
    schema.push({
      headerName: 'Bid',
      field: 'bid',
      columnGroupShow: 'closed',
      cellClass: 'number-cell'
    })
    schema.push({
      headerName: 'Bloomberg Ask',
      field: 'bloombergAsk',
      columnGroupShow: 'closed',
      cellClass: 'number-cell'
    })
    schema.push({
      headerName: 'Bloomberg Bid',
      field: 'bloombergBid',
      columnGroupShow: 'closed',
      cellClass: 'number-cell'
    })
    schema.push({
      headerName: 'Fitch Rating',
      field: 'fitchRating',
      editable: true,
      filter: 'text'
    })
    schema.push({
      headerName: 'Moodys Rating',
      field: 'moodysRating',
      editable: true,
      filter: 'text'
    })
    schema.push({
      headerName: 'SandP Rating',
      field: 'sandpRating',
      editable: true,
      filter: 'text'
    })
    schema.push({
      headerName: 'Trade Date',
      field: 'tradeDate',
      editable: true,
      cellEditorParams: { useFormatter: true },
      valueParser: this.dateParseragGrid,
      valueFormatter: this.shortDateFormatteragGrid
    })
    schema.push({
      headerName: 'Settlement Date',
      field: 'settlementDate',
      editable: true,
      cellEditorParams: { useFormatter: true },
      valueParser: this.dateParseragGrid,
      valueFormatter: this.shortDateFormatteragGrid
    })
    schema.push({ headerName: 'Percent Change', field: 'percentChange', filter: 'text' })
    schema.push({
      headerName: 'Last Updated By',
      field: 'lastUpdatedBy',
      filter: 'text',
      enableRowGroup: true
    })
    schema.push({
      headerName: 'Last Updated',
      field: 'lastUpdated',
      editable: true,
      cellEditorParams: { useFormatter: true },
      valueParser: this.dateParseragGrid,
      valueFormatter: this.shortDateFormatteragGrid
    })
    return schema
  }

  notionalCellRenderer = (params: any) => {
    if (params.value) {
      return this.currencyFormatter.format(params.value)
    } else {
      return null
    }
  }
  numberToBool = (params: any) => {
    if (params.value === 0) {
      return 'false'
    } else {
      return 'true'
    }
  }

  dateParseragGrid = (params: any) => {
    try {
      return this.stringToDate(params.newValue, 'dd/mm/yyyy', '/')
    } catch (ex) {
      console.error(
        'Error parsing the date value: ' + params.newValue + ' and node : ',
        params.node
      )
    }
  }

  stringToDate = (date: any, format: any, delimiter: any) => {
    var formatLowerCase = format.toLowerCase()
    var formatItems = formatLowerCase.split(delimiter)
    var dateItems = date.split(delimiter)
    var monthIndex = formatItems.indexOf('mm')
    var dayIndex = formatItems.indexOf('dd')
    var yearIndex = formatItems.indexOf('yyyy')
    var month = parseInt(dateItems[monthIndex])
    month -= 1
    var formatedDate = new Date(
      parseInt(dateItems[yearIndex]),
      month,
      parseInt(dateItems[dayIndex])
    )
    return formatedDate
  }

  decimalPlaceRendereragGrid = (minDigits: any, maxDigits: any) =>
    function(params: any) {
      if (params.value) {
        var decimalPlaceFormatter = new Intl.NumberFormat('en-GB', {
          minimumFractionDigits: minDigits,
          maximumFractionDigits: maxDigits
        })
        return decimalPlaceFormatter.format(params.value)
      }
    }

  capitalize = (string: any) => {
    return (/[a-z]/.test(string) ? string : string.toLowerCase())
      .replace(/[\s\-_]*([^\s\-_])([^\s\-_]+)/g, this.replacer)
      .replace(/[A-Z]/g, ' $&')
      .trim()
  }

  replacer(a: any, b: any, c: any) {
    return b.toUpperCase() + c
  }

  shortDateFormatter = new Intl.DateTimeFormat('en-GB')
  shortDateFormatteragGrid = (params: any) => {
    try {
      if (params.value) {
        return this.shortDateFormatter.format(params.value)
      } else {
        return null
      }
    } catch (ex) {
      console.error(
        'Error formatting the date for value: ' + params.value + ' and node : ',
        params.node
      )
    }
  }

  boolParseragGrid = (params: any) => {
    try {
      return `<input type='checkbox'   ${params.value ? 'checked' : ''} />`
    } catch (ex) {
      console.error(
        'Error parsing the date value: ' + params.newValue + ' and node : ',
        params.node
      )
    }
  }

  currencyRendereragGrid = (params: any) => {
    try {
      if (params.value) {
        return this.currencyFormatter.format(params.value)
      } else {
        return null
      }
    } catch (ex) {
      console.error(
        'Error formatting the currency for value: ' + params.value + ' and node : ',
        params.node
      )
    }
  }
}
