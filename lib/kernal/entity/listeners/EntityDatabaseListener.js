'use strict';

module.exports = class EntityDatabaseListener {

  /**
   * @Inject('manager.entity')
   */
  inject(manager) {
    this._manager = manager;
  }

  /**
   * @Listener('system.alter')
   *
   * @param {Event} event
   */
  alterDefaultDatabase(event) {
    if (event.alter() === 'database' && event.info().name === 'default') {
      const db = event.subject();

      this.addEntityBaseTables(db);
      this.addEntityFieldTables(db);
    }
  }

  addEntityBaseTables(db) {
    const types = this._manager.types();

    for (const index in types) {
      const type = this._manager.type(types[index]);
      const table = type.addStore(db);
      const fields = type.fields();

      for (const index in fields) {
        const definition = fields[index].definition();

        if (!definition.hasStore(fields[index])) {
          definition.attach(fields[index], table, db);
        }
      }
    }
  }

  addEntityFieldTables(db) {
    const types = this._manager.types();

    for (const index in types) {
      const type = this._manager.type(types[index]);
      const fields = type.fields();

      for (const index in fields) {
        const definition = fields[index].definition();

        if (definition.hasStore(fields[index])) {
          definition.addStore(fields[index], db);
        }
      }
    }
  }

}
