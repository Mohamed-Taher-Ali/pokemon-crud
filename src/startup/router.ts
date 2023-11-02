import {
  pokemonRouter,
  pokemonPopulatesRouter,
} from "../modules/pokemon/routes";
import { uploadRouter } from "../modules/pokemon/routes/uploads";
import { Express } from "express";

export const useAppRouter = (app: Express) => {
  const baseUrl = process.env.BASE_URL;

  [pokemonPopulatesRouter, pokemonRouter, uploadRouter].map((router) =>
    app.use(baseUrl, router)
  );
};
