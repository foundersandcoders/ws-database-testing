# Testing Database Queries with Tape

## Learning Objectives

To be able to:

* Create and set up a test database
* Test database queries

## Getting Started

To test database queries first you need to mock a database, this will stop you
accidentally deleting or modifying important data.

1. Create tests folder:

* Create `tests` folder in the root folder.
* Copy files `db_build.js` and `db_build.sql` from the `database` folder to
  `tests`. Rename them to `test_db_build.js` and `test_db_build.sql`.
* Create file `tests.js` in `tests`.

2. Set up your test database:

   This workshop is based on the
   [pg-workshop](https://github.com/foundersandcoders/pg-workshop) we've just
   completed. That's why we assume that you've already set up your local
   database. Create `config.env` and copy the database url from
   [pg-workshop](https://github.com/foundersandcoders/pg-workshop) in it.

* Now we have to set up a test database and add its url to config.env.

  _Follow these steps if you have doubts how to set up a database:_

  In terminal type psql, or pgcli if installed. Within psql/pcli enter the
  following commands each followed by a return. Things in square brackets are
  for your desired values. Note that password is a string inside '' (NOT double
  quotes -> ""):

  ```
  CREATE DATABASE [db_name];
  CREATE USER [user_name] WITH PASSWORD ['password'];
  ```

  Now you can set the database url in your config.env as follows (setting the
  values in square brackets to the values you defined in the steps above):

  `TEST_DB_URL = postgres://[user_name]:[password]@localhost:5432/[db_name]`

* Next run the test_db_build.js file in terminal: `node tests/test_db_build.js`.
  This will create the schema and populate your test database with data from
  `test_db_build.sql`.

* Now we have to specify in which cases we use the real database and in which
  cases we use the test one. To do that we have to set up a NODE_ENV variable:

> NODE_ENV is an environment variable popularized by the Express framework. It
> specifies the environment in which an application is running such as
> development, staging, production, testing, etc.
>
> By default, our application will run in development environment. And we can
> change the environment by changing process.env.NODE_ENV.

In `db_connection.js` add this condition:

```
  let DB_URL = process.env.DB_URL
   if (process.env.NODE_ENV === 'test') {
     DB_URL = process.env.TEST_DB_URL
   }
```

And don't forget to add these changes:

```
if (!DB_URL) throw new Error('Enviroment variable DB_URL must be set');

const params = url.parse(DB_URL);
```

The last thing to do here is to add a script in `package.json` to run your
tests: `"test": "NODE_ENV=test node tests/test.js",`

* We are almost ready to write the tests. An important idea to keep in mind is
  that before running the tests we need to make sure that our test database is
  at its default state. That's why before running every single test we have to
  rerun the script from `test_db_build.js` to restart the database.

* To make sure that any tests will be executed only after the database has been
  restarted make sure that the `runDbBuild` function in `test_db_build.js` is a
  callback function:

```
const runDbBuild = (cb) => {
  dbConnection.query(sql, (err, res) => {
      if (err) return cb(err);
      cb(null, res)
  });
};
```

#### Now you are ready to write some tests!

## Tests

* In your `tests.js` require tape, runDbBuild function and queries that you are
  going to test:

```
const tape = require('tape');
const runDbBuild = require('./test_db_build');
const getData = require('../src/queries/getData');
const postData = require('../src/queries/postData');
```

* Check that tape is working by running this test:

```
  tape('tape is working', (t) => {
  t.equals(1, 1, 'one equals one');
  t.end();
});
```

* You are ready to test database queries! Remember that before every test you
  have to restart the test database by calling runDbBuild function:

```
tape('what you are going to test', (t)=> {
  runDbBuild(function(err, res){
   your test goes here
  })
})
```

* Now it's time to experiment with writing your tests! :)
