const getData = require('./queries/getData.js');

const router = (request, response) => {
  getData((error, users) => {
    if (error) {
      response.writeHead(500, { 'content-type': 'text/html' });
      response.end(`
        <h1>Server error</h1>
        <pre>${JSON.stringify(error, null, 2)}</pre>
      `);
    }
    response.writeHead(200, { 'content-type': 'text/html' });
    response.end(`
      <h1>Users</h1>
      <pre>${JSON.stringify(users, null, 2)}</pre>
    `);
  });
};

module.exports = router;
