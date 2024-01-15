import * as getAll from './GetAll';
import * as getById from './GetById';
import * as create from './Create';

export const TransactionsProvider = {
  ...getAll,
  ...getById,
  ...create,
};