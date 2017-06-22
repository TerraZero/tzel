'use strict';

const Table = require('cli-table2');

module.exports = class TableFormatter {

  static table(head, values, options = {}) {
    options.head = head;
    const table = new Table(options);

    for (const index in values) {
      table.push(values[index]);
    }
    return table;
  }

  constructor(defintion) {
    this._definition = defintion;
    this._filters = [];
    this._adders = [];
    this._sorter = [];

    const operations = defintion.split(';');

    for (const o in operations) {
      const parts = operations[o].split('::');
      switch (parts[0]) {
        case 'filter':
          this.initFilter(parts[1]);
          break;
        case 'sort':
          this.initSorter(parts[1]);
          break;
        case 'add':
          this.initAdder(parts[1]);
          break;
      }
    }
  }

  initFilter(filters) {
    const filter = filters.split('&');

    for (const index in filter) {
      const operators = filter[index].split(/[=\^§#]/);
      const operation = filter[index].substring(operators[0].length, operators[0].length + 1);
      const newFilter = {
        head: operators[0],
        value: operators[1],
        operation: operation,
      };

      if (operation == '#') {
        newFilter.value = newFilter.value.split('-');
        newFilter.value.push(newFilter.value[0]);
      }

      this._filters.push(newFilter);
    }
  }

  initSorter(sorter) {

  }

  initAdder(adders) {
    const adder = adders.split('&');

    for (const index in adder) {
      const param = adder[index].split(':');

      this._adders.push({
        pos: param[0],
        name: param[1],
        value: param[2],
      });
    }
  }

  format(head, values, options = {}) {
    // filter the values
    const accepted = [];
    for (const index in values) {
      if (this.filter(head, values[index], index)) {
        accepted.push(values[index]);
      }
    }

    for (const index in this._adders) {
      let pos = this._adders[index].pos;
      if (pos == '>') {
        pos = head.length;
      }
      for (const a in accepted) {
        this.adder(head, accepted[a], a, this._adders[index], pos);
      }
      head.splice(pos, 0, this._adders[index].name);
    }

    return TableFormatter.table(head, accepted, options);
  }

  adder(head, row, index, adder, pos) {
    switch (adder.value) {
      case '#':
        row.splice(pos, 0, 1 + parseInt(index));
        break;
      default:
        const data = adder.value.split('?');

        if (data.length > 1) {
          const span = head.indexOf(data.shift());
          let value = row[span];

          const property = value[data.shift()];
          if (typeof property === 'function') {
            value = property.apply(value, data);
          } else {
            value = property;
          }
          row.splice(pos, 0, value);
        }
    }
  }

  filter(head, row, index) {
    for (const i in this._filters) {
      const filter = this._filters[i];
      const span = head.indexOf(filter.head);
      const value = row[span];

      if (this.compare(value, index, filter) == false) {
        return false;
      }
    }
    return true;
  }

  compare(value, index, filter) {
    switch (filter.operation) {
      case '=':
        return value == filter.value;
      case '^':
        return value.startsWith(filter.value);
      case '§':
        return value.endsWith(filter.value);
      case '#':
        return filter.value[0] <= index && filter.value[1] >= index;
    }
    return true;
  }

}
