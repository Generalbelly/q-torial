import admin from './admin';
import functions from './functions';
import { onTutorialDelete, onTutorialCreate, onTutorialUpdate } from './tutorial';
import { addGa, queryAccounts, onGaDelete } from './ga';
import { getTutorial, storePerformance } from './api';
import { stripeWebhook, cancelSubscription } from './stripe';

if (functions.config().app.env !== 'production') {
  const express = require('express');
  const basicAuth = require('basic-auth-connect');
  const app = express();
  const USERNAME = 'q';
  const PASSWORD = 'torial';
  app.use(basicAuth(USERNAME, PASSWORD));
  app.use(express.static( __dirname + '/dist/'));
  exports.staging = functions.https.onRequest(app);
}

admin.initializeApp(functions.config().firebase);

exports.onTutorialDelete = onTutorialDelete;
exports.onTutorialCreate = onTutorialCreate;
exports.onTutorialUpdate = onTutorialUpdate;

exports.addGa = addGa;
exports.queryAccounts = queryAccounts;
exports.onGaDelete = onGaDelete;

exports.getTutorial = getTutorial;
exports.storePerformance = storePerformance;

exports.stripeWebhook = stripeWebhook;
exports.cancelSubscription = cancelSubscription;
