# Testing Database Queries with Tape


To test database queries first you need to mock a database, otherwise you may affect the real database with your tests.  

## 1. Create tests folder

* Copy files `db_build.js` and `db_build.sql` from database folder. Rename them to `test_db_build.js` and `test_db_build.sql`.
* Create file `tests.js`.

## 2. Set up your test database:

This workshop is based on [pg-workshop](https://github.com/foundersandcoders/pg-workshop) we've just done before.
That's why we assume that you already set up your local database and your config.env has database url.

1. Now we have to set up a test database and add its url to config.env.

    #### Follow these steps if you have doubts how to set up a database:

    In terminal type psql or pgcli if installed. Within psql/pcli enter the following commands each followed by an enter. Things in square brackets are for your desired values (without square brackets). Note that password is a string inside '' (NOT double ""):
    ```
    CREATE DATABASE [db_name];
    CREATE USER [user_name] WITH PASSWORD ['password'];
    ```
    Now you can set the database url in your config.env as follows (setting the values in square brackets to the values you defined in the steps above):

    `postgres://[user_name]:[password]@localhost:5432/[db_name]`

2. Next run the test_db_build.js file in terminal: `node tests/test_db_build.js `. This will create the schema and populate your test database with data from `test_db_build.sql`.

3. Now we have to specify in which cases we use the real database and in which cases we need the test one. To do that we have to set up NODE_ENV variable:

> NODE_ENV is an environment variable popularized by the Express framework. It specifies the environment in which an application is running such as development, staging, production, testing, etc.
>
> By default, our application will run in development environment. And we can change the environment by changing process.env.NODE_ENV.

* In `db_connection.js` add this condition:
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
* The last thing to do here is to add a script in `package.json` to run your tests: `"test": "NODE_ENV=test node tests/test.js",`

4. We are almost ready to write the tests. Important idea to keep in mind is that before running the tests we need to make sure that our test database has its default state. That's why before running every single test we have to rerun the script from `test_db_build.js ` to restart the database.
* To make sure that tests will be executed only after database has been restarted write `runDbBuild` function in `test_db_build.js` as a callback function.

5. Now you are ready to write to test database queries.
