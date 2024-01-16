import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ITransactions } from '../../models';

export const updateById = async (id: string, user_id: string, transactions: Omit<ITransactions, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<void | Error> => {
  try {
    const formattedDate = new Date();

    const result = await Knex(ETableNames.transactions)
      .update({...transactions, updated_at: formattedDate})
      .where('id', '=', id)
      .where('user_id', '=', user_id);

    if (result > 0) return;

    return new Error('Erro ao atualizar o resistro');
  } catch (error) {
    return new Error('Erro ao atualizar o resistro');
  }
};