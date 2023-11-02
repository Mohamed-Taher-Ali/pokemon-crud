export interface IPagination {
  offset: number;
  limit: number;
}

export type FilterOperator = 'and' | 'or';

export type IFilterData = {
  filterManipulation?: any;
  operator?: FilterOperator;
  filter?: Record<string, any>;
};

export interface ICustomRequestAttrs {
  pagination?: IPagination;
  filterData?: IFilterData;
}
