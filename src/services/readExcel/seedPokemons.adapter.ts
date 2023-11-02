import {
  PokemonTypeModelName,
  PokemonWeatherModelName,
  PokemonEvolutionStageModelName,
} from "../../modules/pokemon/models";
import { getAllPokemonFields } from "../../modules/pokemon/services/pokemon";
import { getUniqueArray, removeEmptyAttrs } from "../../utils";
import { insertManyIfNotExist } from "./seedPokemonModel";
import { IPokemon } from "../../modules/pokemon/types";
import { ExecuteSeed } from "./executeRead";
import Excel, { Row } from "exceljs";
import fs from "fs";

export const seedPokemonsAdapter = (
  fileName: string,
  executeSeed: ExecuteSeed,
  seedPokemons: (data: IPokemon[]) => void,
  onEnd?: () => void
) => {
  if (!fs.existsSync(fileName)) throw new Error("file name is required");

  const onData = async (worksheet: Excel.Worksheet) => {
    const popFields = await insertPopFieldsToDb(worksheet);

    const rowsCount = worksheet.lastRow.number;
    const bulk = [];

    worksheet.eachRow(async (r, i) => {
      if (i === 1) return;

      const bulkObj = mapRowToPokemonData(r);

      Object.entries({ ...popFields }).map(([field, valObj]) => {
        const val = bulkObj[field];

        if (valObj) {
          const id = valObj[val];
          bulkObj[field] = id;
        }
      });

      bulk.push(removeEmptyAttrs(bulkObj));
      if (i === rowsCount) {
        await seedPokemons(bulk);
        onEnd?.();
      }
    });
  };

  const insertPopFieldsToDb = async (worksheet: Excel.Worksheet) => {
    const fields = [
      {
        evolutionStage: getUniqueArray(
          [...worksheet.getColumn(6).values],
          true
        ),
        moduleName: PokemonEvolutionStageModelName,
      },
      {
        type: getUniqueArray(
          [
            ...worksheet.getColumn(10).values,
            ...worksheet.getColumn(11).values,
          ],
          true
        ),
        realFields: ["type1", "type2"],
        moduleName: PokemonTypeModelName,
      },
      {
        weather: getUniqueArray(
          [
            ...worksheet.getColumn(12).values,
            ...worksheet.getColumn(13).values,
          ],
          true
        ),
        realFields: ["weather1", "weather2"],
        moduleName: PokemonWeatherModelName,
      },
    ];

    return (
      await Promise.all(
        fields.map(async (fieldsObj) => {
          const [name, fieldsArr] = Object.entries(fieldsObj)[0];

          return {
            realFields: fieldsObj.realFields,
            [name]: await insertManyIfNotExist(
              fieldsObj.moduleName,
              fieldsArr as string[],
              "name"
            ),
          };
        })
      )
    ).reduce((acc, elm) => {
      if (!elm.realFields) return { ...acc, ...elm };

      const { realFields, ...remain } = elm;
      const [_name, fieldsArr] = Object.entries(remain)[0];

      return {
        ...acc,
        ...realFields.reduce((acc, elm) => ({ ...acc, [elm]: fieldsArr }), {}),
      };
    }, {});
  };

  const mapRowToPokemonData = (row: Row) => {
    const allFields = getAllPokemonFields();
    const numFields: (keyof IPokemon)[] = [
      "pokedexNumber",
      "generation",
      "familyId",
      "hatchable",
      "cp40",
      "cp39",
    ];

    const pokemonData = {};

    row.eachCell((_cell, ind) => {
      if (![1].includes(ind)) {
        const fieldName = allFields[ind - 2];
        const cellVal = row.getCell(ind).value;

        const val =
          numFields.includes(fieldName) && !isNaN(+cellVal)
            ? +cellVal
            : cellVal.toString();

        if (val == 0 || !!val) pokemonData[fieldName] = val;
      }
    });
    delete pokemonData["statTotal"];
    return pokemonData;
  };

  executeSeed({ fileName, callback: onData });
};
