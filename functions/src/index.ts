import admin from './admin';
import functions from './functions';
import UserRepository from './repositories/user';
import TaskRepository from './repositories/task';
import { addGa, queryAccounts, onGaDelete } from './ga';
import { addGcp, onGcpDelete, setup } from './gcp';
import { stripeWebhook, cancelSubscription } from './stripe';

const userRepository = new UserRepository(admin.firestore());
const taskRepository = new TaskRepository(admin.firestore());

if (functions.config().app.env !== 'production') {
  const express = require('express');
  const basicAuth = require('basic-auth-connect');
  const app = express();
  const USERNAME = functions.config().app.basic_auth_username;
  const PASSWORD = functions.config().app.basic_auth_password;
  app.use(basicAuth(USERNAME, PASSWORD));
  app.use(express.static( __dirname + '/dist/'));
  exports.staging = functions.https.onRequest(app);
}

exports.addGa = addGa(userRepository);
exports.queryAccounts = queryAccounts(userRepository);
exports.onGaDelete = onGaDelete;

exports.addGcp = addGcp(userRepository);
exports.onGcpDelete = onGcpDelete;
exports.setup = setup(userRepository, taskRepository);

exports.stripeWebhook = stripeWebhook(userRepository);;
exports.cancelSubscription = cancelSubscription(userRepository);;
