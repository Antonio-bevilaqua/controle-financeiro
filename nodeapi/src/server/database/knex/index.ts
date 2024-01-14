import { knex } from 'knex';
import 'dotenv/config';

import { db } from './Environment';

const getEnvironment = () => {
  return db;
};

export const Knex = knex(getEnvironment());