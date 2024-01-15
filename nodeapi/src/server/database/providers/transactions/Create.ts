import { v4 as uuidv4 } from 'uuid';

import { ITransactions } from '../../models';
import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';

export const create = async(transactions: Omit<ITransactions, 'id' | 'created_at' | 'updated_at'>): Promise<String | Error> => {
  try {
    const id = uuidv4();
    const formattedDate = new Date();

    const [result] = await Knex(ETableNames.transactions)
      .insert({...transactions, id, created_at: formattedDate, updated_at: formattedDate});

    if (result !== undefined) {
      return id;
    }

    return new Error('erro teste');
  } catch (error) {
    return new Error('Erro ao cadastrar o resistro');
  }
};