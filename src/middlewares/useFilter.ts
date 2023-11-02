import { FilterOperator } from 'src/types/express/customRequestAttrs';
import { Request, Response, NextFunction } from 'express';

type FilterObjCallbackType = (filterObj: object) => any;

export const useFilter =
  <IFields extends string>(
    filterFields: IFields[],
    filterCallback?: FilterObjCallbackType,
    defaultFilterOperator: FilterOperator = 'or'
  ) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const {
      query: { filterOperator, ...filterQuery },
    } = req;

    const filter: Record<IFields, any> = filterFields.reduce((fields, field) => {
      return Object.keys(filterQuery).includes(field)
        ? { ...fields, [field]: filterQuery[field] }
        : fields;
    }, {} as Record<IFields, any>);

    const operator = (['and', 'or'] as FilterOperator[]).includes(filterOperator as FilterOperator)
      ? (filterOperator as FilterOperator)
      : defaultFilterOperator;

    const filterManipulation = filterCallback?.(filter);

    req.filterData = {
      filterManipulation,
      operator,
      filter,
    };

    next();
  };
