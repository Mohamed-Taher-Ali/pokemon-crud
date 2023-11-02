import { FilterOperator } from "../../../../types/express/customRequestAttrs";

const manipulateSearchQuery = (filter = {}, populatedFields, operator) => {
  if (!Object.keys(filter)?.length) return {};

  const query = {
    [`$${operator}`]: Object.entries(filter).reduce((fields, [key, val]) => {
      const isPopulatedField = populatedFields.includes(key);
      const updatedKey = isPopulatedField ? `${key}.name` : key;
      return [...fields, { [updatedKey]: isNaN(+val) ? val : +val }];
    }, []),
  };

  return query;
};

type GetPokemonAggregationQueryParams = {
  searchQuery?: Record<string, any>;
  populatedFields: string[];
  operator: FilterOperator;
  offset: number;
  limit: number;
};
export const getPokemonAggregationQuery = ({
  limit,
  offset,
  operator,
  searchQuery,
  populatedFields,
}: GetPokemonAggregationQueryParams) => [
  {
    $lookup: {
      from: "pokemonevolutionstages",
      localField: "evolutionStage",
      foreignField: "_id",
      as: "evolutionStage",
    },
  },
  {
    $lookup: {
      from: "pokemontypes",
      localField: "type1",
      foreignField: "_id",
      as: "type1",
    },
  },
  {
    $lookup: {
      from: "pokemontypes",
      localField: "type2",
      foreignField: "_id",
      as: "type2",
    },
  },
  {
    $lookup: {
      from: "pokemonweathers",
      localField: "weather1",
      foreignField: "_id",
      as: "weather1",
    },
  },
  {
    $lookup: {
      from: "pokemonweathers",
      localField: "weather2",
      foreignField: "_id",
      as: "weather2",
    },
  },
  {
    $addFields: {
      evolutionStage: {
        $arrayElemAt: ["$evolutionStage", 0],
      },
      type1: {
        $arrayElemAt: ["$type2", 0],
      },
      weather1: {
        $arrayElemAt: ["$weather2", 0],
      },
    },
  },
  {
    $match: manipulateSearchQuery(searchQuery, populatedFields, operator),
  },
  { $skip: offset },
  { $limit: limit },
];
