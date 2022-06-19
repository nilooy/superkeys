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
}

export interface ISuperKeyOptional {
  id?: number;
  queryUrl?: string;
  subKeys?: ISuperSubKey[];
  querySeparator?: string;
  separator?: string;
  key?: string;
  url?: string;
  duplicate?: boolean;
  searchValue?: string;
}

export interface ISearchHandler {
  keyItem: ISuperKeyOptional | null;
  value?: string;
}
