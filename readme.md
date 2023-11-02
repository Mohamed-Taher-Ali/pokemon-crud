#pokemon backend task


after clone the project, just run these 2 commands:
    docker compose up
    docker compose up -d



project structure:

src
|---- middlewares
|---- modules
      |---- pokemon
            |---- models
            |---- routes
            |---- services
            |---- types
            |---- validations
|---- services
|---- startup
|---- types
|---- uploads
|---- utils


apis map:

localhost:8000
    /api
        /pokemons
            POST    /      > create
            PUT     /:id   > update
            GET     /:id   > get
            GET     /      > list
            DELETE  /:id   > delete

        /pokemon-populates
            /evolutionStages
                POST    /      > create
                PUT     /:id   > update
                GET     /:id   > get
                GET     /      > list
            /types
                POST    /      > create
                PUT     /:id   > update
                GET     /:id   > get
                GET     /      > list
            /weathers
                POST    /      > create
                PUT     /:id   > update
                GET     /:id   > get
                GET     /      > list
        /uploads
            POST    /      > seed



> you can monitor the db on (mongodb://root:123456@localhost:64000/pokemon_db?authSource=admin)
> i attached the file of postman for all apis in the main directory.
> also i attached the excel file in uploads.

there are 2 ways for seeding
    1- by uploading through api >>> /api/uploads/ > the file name is > file
    2- by putting the excel file in uploads directory then run command > yarn seedExcel $the_file_name_you_put
        1- move an excel file manually in app/src/uploads (there is a one by default i put it)
        2- run > docker exec -it <container id> bash
        2- run > yarn seedExcel <excel file name>
        ... congratulations you seeded the db with pokemons & their dependencies.

adding customized fields in request object to serve multiple aims like filter | pagination

**scenario > to add a new pokemon
    1- add evolutionStage > api
    2- add evolutionStage > api
    3- add evolutionStage > api
    4- add evolutionStage > api
    5- add evolutionStage > api

    6- by ids of these docs you append these ids in the body of adding pokemon.



achieves: [
multiple middlewares,
high maintainability,
modularized structure,
dependency inversion,
dependency injection,
high reusability,
high scalability,
adapter pattern,
facade pattern,
split concerns,
polymerphism,
enclosure,
solid,
oop,
dry,
];


philosophy::: <
tried to reduce redundancy in data by extracting some fields like
(evolution stage |
[[type1 | type2] same data source] |
[[weather1 | weather2] same data source] |
)

so we have 3 modules must be (joined to pokemon )
so evolutionStage, type1, type2, weather1, weather2
are references to other models (foreign keys).
>


would like to do:::
1- path aliase for files importing by ts config but faced some issues related to ts & tsconfig
2- piping a stream for uploading excel sheet but no read stream for mongo
3- access layer but there were some obstacles with mongoose types

somethings lost my time :)
    1- ts config for path aliases
    2- access seed command from docker
    3- some obstacles in exceljs package


thaaaaaaaaaaaaaaaaaaanx ;)