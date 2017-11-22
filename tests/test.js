const tape = require('tape');
const runDbBuild = require("../src/database/db_build");
const getData = require('../src/queries/getData');
const postData = require('../src/queries/postData');

tape('tape is working', (t) => {
t.equals(1, 1, 'one equals one');
t.end();
});

tape('getData is working properly', (t)=> {
  runDbBuild(function(err, res){

    const expected = [
    {
      id: 1,
      name: "Alina",
      location: "Moscow"
    }
  ];

   getData((err, result) => {
     if(err) {
      console.log(err);
     }
     t.deepEqual(result, expected, "Returns expected data");
     t.end();
   })
  })
})
