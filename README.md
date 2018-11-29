# Testing Database Queries with Tape

## Contents
<!-- generated using markdown-toc
$ npx markdown-toc README.md
-->
* [Learning Objectives](#learning-objectives)
* [Why do we need a test database?](#why-do-we-need-a-test-database)
* [Let's go!](#lets-go)
  + [1. Create a test database](#1-create-a-test-database)
  + [2. Configure the `db_connection` file](#2-configure-the-db_connection-file)
  + [3. Create the test script](#3-create-the-test-script)
  + [4. Turn the db build script into a reusable function](#4-turn-the-db-build-script-into-a-reusable-function)
  + [5. Write tests!](#5-write-tests)
* [Additional Info](#additional-info)

## Learning Objectives

To be able to:

* Create and set up a test database
* Test database queries

## Why do we need a test database?

In this workshop we will create a test database to run our tests on, which is separate from our production database. We use a test database so that we can add, delete, or update data in our tests without affecting our production database.

## Let's go!

* Clone this repo
* Navigate to it in your terminal and run `npm i`

We are going to start by creating a test database for us to run our tests on.

### 1. Create a test database

Set up your test database:

   This workshop is based on the
   [pg-workshop](https://github.com/foundersandcoders/pg-workshop) we've just
   completed. That's why we assume that you've already set up your local
   database. Create `config.env` and copy the database url from
   [pg-workshop](https://github.com/foundersandcoders/pg-workshop) in it.

* Now we have to set up a test database and add its url to config.env.

  _Follow these steps if you have doubts how to set up a database:_

___________________________________________________________________________________
 In terminal type psql, or pgcli if installed. Within psql/pcli enter the
following commands each followed by a return. Things in square brackets are for
your desired values. Note that password is a string inside '' (NOT double quotes
-> ""):

```
CREATE DATABASE [db_name];
CREATE USER [user_name] WITH SUPERUSER PASSWORD ['password'];
ALTER DATABASE [db_name] OWNER TO [user_name];
```

___________________________________________________________________________________

Now you can set the test database url in your config.env as follows (setting the
values in square brackets to the values you defined in the steps above):

`TEST_DB_URL = postgres://[user_name]:[password]@localhost:5432/[db_name]`

* Next open psql/pgcli in terminal and connect to your test database: `\c
  [test_database_name]`
* Next you will run the db_build.sql file to create the schema and populate your
  test database with data: `\i [full_path_to_db_build.sql]` (To easily copy a
  file's full path right click on it in atom and click on "Copy Full Path")

### 2. Configure the `db_connection` file

* Now we have to specify in which cases we use the real database and in which
  cases we use the test one. To do that we have to set up a `NODE_ENV` variable:

> NODE_ENV is an environment variable popularized by the Express framework. It
> specifies the environment in which an application is running such as
> development, staging, production, testing, etc.
>
> By default, our application will run in development environment. And we can
> change the environment by changing process.env.NODE_ENV.

In `db_connection.js` add this condition:

```js
let DB_URL = process.env.DB_URL;
if (process.env.NODE_ENV === "test") {
  DB_URL = process.env.TEST_DB_URL;
}
```

And don't forget to replace the existing similar code with these changes:

```js
if (!DB_URL) throw new Error("Enviroment variable DB_URL must be set");

const params = url.parse(DB_URL);
```

### 3. Create the test script

Create a tests folder:

* Create a `tests` folder in the root folder.
* Create file `test.js` in `tests`.

Then add a script in `package.json` to run your
tests: `"test": "NODE_ENV=test node tests/test.js",` When you want to run your
tests, run `npm run test` in your terminal.

### 4. Turn the db build script into a reusable function

* We are almost ready to write the tests. An important idea to keep in mind is
  that before running the tests we need to make sure that our test database is
  at its default state. That's why before running every single test we have to
  rerun the script from `db_build.js` to reset the database.

* To do this we need to turn the script into a function, `runDbBuild`, and export it. Then we can import it in the test file and build the database before running the tests.

```js
// before:
// dbConnection.query(sql, (err, res) => {
//   if (err) throw err;
//   console.log('Users table created with result: ', res);
// });

// after:
const runDbBuild = cb => dbConnection.query(sql, cb)

module.exports = runDbBuild
```

### 5. Write tests!

* In your `tests.js` require tape, runDbBuild function and queries that you are
  going to test:

```js
const tape = require("tape");
const runDbBuild = require("../src/database/db_build");
const getData = require("../src/queries/getData");
const postData = require("../src/queries/postData");
```

* Check that tape is working by running this test:

```js
tape("tape is working", t => {
  t.equals(1, 1, "one equals one");
  t.end();
});
```

* You are ready to test database queries! Remember that before every test you
  have to restart the test database by calling `runDbBuild` function:

```js
tape('what you are going to test', (t)=> {
  runDbBuild(function(err, res){
   your test goes here
  })
})
```

* Now it's time to experiment with writing your tests! :)

## Additional Info

On larger projects we may want to have a `test_db_build.sql` so that we can have a range of fake data in our test database to test on. To do this our `db_build.js` will need to check which sql script it needs to run.

One way in which you could implement this would be to add the following to your
`db_build.js`:

```js
if ((process.env.NODE_END = "test")) {
  sql = fs.readFileSync(`${__dirname}/test_db_build.sql`).toString();
} else {
  sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();
}
```

This will specify which file to use based on whether it's in a test environment
or not.
