// tslint:disable-next-line:no-var-requires
import express from 'express';
import { returnMockedJSON, returnMockedCsv } from './auxiliary';

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/static-csv/:name', (req, res) => {
  returnMockedCsv(res, `assets/csv/${req.params.name}`);
});

app.get('/config/:appId', (req, res) => {
  returnMockedJSON(res, 'assets/project-configuration.json');
});

app.get('/config/:appId/:projectId', (req, res) => {
  returnMockedJSON(res, 'assets/project-configuration.json');
});

app.get('/data/channel/:channelId/data', (req, res) => {
  returnMockedCsv(res, `assets/data-${req.params.channelId}.csv`);
});

app.get('/anomalies/find', (req, res) => {
  returnMockedCsv(res, `assets/find-${req.query.series}.csv`);
});

app.get('/data/site/:siteId', (req, res) => {
  returnMockedJSON(res, 'assets/sites.json');
});

app.get('/data/channel/:channelId', (req, res) => {
  returnMockedJSON(res, 'assets/channels.json');
});

// tslint:disable-next-line:no-console
app.listen(3900, () => console.log('listening on port 3900'));