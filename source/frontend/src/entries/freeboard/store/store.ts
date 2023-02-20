import type { IStore, DataSchema } from "./boardtypes";

const KEY = "__freeboard_data___";

export class LocalStore implements IStore {
  constructor() {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      return;
    }

    const initData: DataSchema = {
      boards: [],
      plug_version: 0,
      schema_version: 0,
    };

    localStorage.setItem(KEY, JSON.stringify(initData));
  }

  async Load() {
    try {
      return Promise.resolve(JSON.parse(localStorage.getItem(KEY)));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async Save(data: DataSchema) {
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
