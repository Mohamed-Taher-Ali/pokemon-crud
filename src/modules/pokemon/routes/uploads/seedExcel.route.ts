import { seedPokemonsAdapter } from "../../../../services/readExcel/seedPokemons.adapter";
import { SingleRoute } from "../../../../services/configRouter/SingleRoute/SingleRoute";
import { seedPokemonModel } from "../../../../services/readExcel/seedPokemonModel";
import { executeSeed } from "../../../../services/readExcel/executeRead";
import { useUploader } from "../../../../middlewares";
import { HTTP_METHODS } from "../../../../types";
import { Request, Response } from "express";

const routeHandler = async (req: Request, res: Response) => {
  const {
    file: { filename },
  } = req;
  const uploadPath = process.env.UPLOAD_PATH;
  const fileFullName = `${uploadPath}/${filename}`;

  res.end(seedPokemonsAdapter(fileFullName, executeSeed, seedPokemonModel));
};

export const seedExcelRoute = new SingleRoute(
  HTTP_METHODS.post,
  "/",
  routeHandler,
  [useUploader.single("file")]
);
