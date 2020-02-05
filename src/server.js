// App server

const app = require('./app');
const logger = require('./logger');
const { PORT } = require('./config');

app.listen(PORT, () => {
  logger.info('server is listening on port ' + PORT);
});
