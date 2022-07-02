export interface ISuperSubKey {
  key: string;
  url: string;
}

export interface ISuperKey {
  id?: number;
  queryUrl: string;
  subKeys: ISuperSubKey[];
  querySeparator: string;
  separator: string;
  key: string;
  url: string;
  duplicate?: boolean;
  edited?: boolean;
}

export interface ISuperKeyOptional {
  id?: number;
  queryUrl?: string;
  subKeys?: ISuperSubKey[];
  querySeparator?: string;
  separator?: string;
  key?: string;
  url?: string;
  searchValue?: string;
  duplicate?: boolean;
  edited?: boolean;
  title?: string;
  type?: string;
}

export interface ISearchHandler {
  keyItem: ISuperKeyOptional | null;
  value?: string;
}

export interface StorageChange {
  /**
   * The old value of the item, if there was an old value.
   * Optional.
   */
  oldValue?: any;

  /**
   * The new value of the item, if there is a new value.
   * Optional.
   */
  newValue?: any;
}
