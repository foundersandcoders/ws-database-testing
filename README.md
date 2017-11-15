# Testing Database Queries with Tape

To test database queries first you need to mock a database, this will stop you
accidentally deleting or modifying important data.

## 1. Create tests folder

* Copy files `db_build.js` and `db_build.sql` from the database folder. Rename
  them to `test_db_build.js` and `test_db_build.sql`.
* Create file `tests.js`.

## 2. Set up your test database:

This workshop is based on the
[pg-workshop](https://github.com/foundersandcoders/pg-workshop) we've just
completed. That's why we assume that you've already set up your local database,
and your config.env contains your database url.

#### 1. Now we have to set up a test database and add its url to config.env.

    #### Follow these steps if you have doubts how to set up a database:

    In terminal type psql, or pgcli if installed. Within psql/pcli enter the following commands
    each followed by a return. Things in square brackets are for your desired values.
    Note that password is a string inside '' (NOT double quotes -> ""):
    ```
    CREATE DATABASE [db_name];
    CREATE USER [user_name] WITH PASSWORD ['password'];
    ```
    Now you can set the database url in your config.env as
    follows (setting the values in square brackets to the values you defined in the steps above):

    `postgres://[user_name]:[password]@localhost:5432/[db_name]`

#### 2. Next run the test_db_build.js file in terminal: `node tests/test_db_build.js`. This will create the schema and populate your test database with data from `test_db_build.sql`.

#### 3. Now we have to specify in which cases we use the real database and in which cases we use the test one. To do that we have to set up a NODE_ENV variable:

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

#### 4. We are almost ready to write the tests. An important idea to keep in mind is that before running the tests we need to make sure that our test database is at its default state. That's why before running every single test we have to rerun the script from `test_db_build.js` to restart the database.

To make sure that any tests will be executed only after the database has been
restarted make sure that the `runDbBuild` function in `test_db_build.js` is a
callback function.

### Now you are ready to write some tests!

## Tests

#### 1. To start off lets make sure that all of the information we expect to be in the tables has, in fact been properly populated.

* Write a test to make sure that the information in the users table is what you
  expect.

Make sure that you are running the `test_db_build.js` before every test!

#### 2. Now we know the tables have been populated properly, lets test whether inserting into the tables works as expected.

* Create a test that inserts into the users table and that checks whether the
  data has been added to the table correctly.

When dealing with tests that insert data it is imperative that the test database
is reset before every test otherwise the tables will change every time they are
run.

#### 3. Write your own tests

* Now you should experiment with writing your own tests. Try changing the
  `test_db_build.sql` file and writing your own queries to test different
  aspects of the database.
