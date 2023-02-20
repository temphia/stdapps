import type { IStore, DataSchema } from "./boardtypes";

const KEY = "__freeboard_data___";

const initData: DataSchema = {
  boards: [],
  plug_version: 0,
  schema_version: 0,
};

export class LocalStore implements IStore {
  constructor() {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      return;
    }

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

export class MemStore implements IStore {
  _state: string;
  constructor() {
    this._state = JSON.stringify(initData);
  }

  async Load() {
    try {
      return Promise.resolve(JSON.parse(this._state));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async Save(data: DataSchema) {
    try {
      this._state = JSON.stringify(data);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
