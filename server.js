const app = require('./app');
const { connect } = require('./db/mongo');

const port = process.env.PORT || 3000;

(async () => {
  await connect();
  app.listen(port, () => console.log(`Server running on port ${port}`));
})();
