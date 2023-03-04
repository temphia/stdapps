export interface TaskState {
  name: string;
  groups: Group[];
}

export interface Group {
  name: string;
  items: Item[];
}

export interface Item {
  title: string;
  contents: string;
  closed: boolean;
}
