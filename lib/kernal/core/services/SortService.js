'use strict';

const Exception = use('proxy::exception');

/**
 * @Service('helper.sort')
 *
 * @Inject('helper.norm')
 */
module.exports = class SortService {

  inject(norm) {
    this._norm = norm;
  }

  dependencies(items, depend, name = null, save = false) {
    const base = {};
    const register = {};
    const sorted = [];

    if (this._norm.isString(depend)) {
      depend = (function (name) {
        return function (item, index) {
          return item[name];
        };
      })(depend);
    }

    if (this._norm.isArray(items)) {
      if (this._norm.isString(name)) {
        name = (function (name) {
          return function (item, index) {
            return item[name];
          };
        })(name);
      }

      for (const index in items) {
        const key = name(items[index], index);

        base[key] = {
          item: items[index],
          depend: depend(items[index], index),
          name: key,
        };
      }
    }

    if (save) {
      for (const index in base) {
        this._sortDependenciesSave(sorted, base, base[index], register);
      }
    } else {
      for (const index in base) {
        this._sortDependencies(sorted, base, base[index], register);
      }
    }
    return sorted;
  }

  _sortDependencies(sorted, base, item, register) {
    if (register[item.name]) return;

    for (const index in item.depend) {
      this._sortDependencies(sorted, base, base[item.depend[index]], register);
    }

    sorted.push(item.item);
    register[item.name] = true;
  }

  _sortDependenciesSave(sorted, base, item, register, current = []) {
    if (register[item.name]) return;

    if (current.indexOf(item.name) !== -1) {
      new Exception('sort').setArgs(item.name).setTree(current).throw();
    }
    current.push(item.name);

    for (const index in item.depend) {
      if (base[item.depend[index]] === undefined) {
        new Exception('sort').setType(1).setArgs(item.depend[index], item.name).throw();
      }
      this._sortDependenciesSave(sorted, base, base[item.depend[index]], register, current);
    }
    sorted.push(item.item);
    register[item.name] = true;
  }

}
