import * as getAll from './GetAll';
import * as getById from './GetById';

export const TransactionsProvider = {
  ...getAll,
  ...getById,
};