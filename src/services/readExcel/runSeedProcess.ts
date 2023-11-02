import { seedPokemonsAdapter } from "./seedPokemons.adapter";
import { seedPokemonModel } from "./seedPokemonModel";
import { executeSeed } from "./executeRead";
import { runDB } from "../../startup/runDB";
import path from "path";

const p = process.env.UPLOAD_PATH;
const fileName = process.argv.slice(2)[0];

const fileFullName = path.join(p, fileName);

runDB(() => {
  seedPokemonsAdapter(fileFullName, executeSeed, seedPokemonModel, () => {
    process.exit(0);
  });
});
