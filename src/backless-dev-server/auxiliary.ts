import express from 'express';
import fs from 'fs';
import _ from 'lodash';

export const returnMockedJSON = (res: express.Response, path: string) => {
  fs.readFile(path, (err, buffer) => {
    if (_.isObject(err)) {
      res
        .status(404)
        .send(`Not found: ${err.code} ${err.name} ${err.message}`);
      return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.json(JSON.parse(buffer.toString()));
  });
};

export const returnMockedCsv = (res: express.Response, path: string) => {
  fs.readFile(path, (err, buffer) => {
    if (_.isObject(err)) {
      res
        .status(404)
        .send(`Not found: ${err.code} ${err.name} ${err.message}`);
      return;
    }
    res.setHeader('Content-Type', 'text/plain');
    res.send(_.isObject(buffer) ? buffer.toString() : '');
  });
};