const db_build = require("./db_build");
//if you see, having this file means you can still rebuild the database
// (production/development or test) easily, without having to run psql and run the \i command.
// you can just run `NODE_ENV=test node src/databse/run_db_build and the database will build
db_build((err, res) => {
  if (err) {
    console.log(`something went wrong: ${err}`);
  } else {
    console.log(`db built succesfully`);
  }
});
