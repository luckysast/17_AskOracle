require('module-alias/register');

const http = require('http'),
      AskOracleAPI = require('@AskOracleAPI'),
      AskOracleServer = http.Server(AskOracleAPI),
      AskOraclePORT = process.env.PORT || 3001,
      LOCAL = '0.0.0.0';
AskOracleServer.listen(AskOraclePORT, LOCAL, () => console.log(`AskOracleAPI running on ${AskOraclePORT}`));
