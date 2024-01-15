import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ITransactions } from '../../models';

export const getById = async (id: string, user_id: string): Promise<ITransactions | Error> => {
  try {
    const result = await Knex(ETableNames.transactions)
      .select('*')
      .where('user_id', '=', user_id)
      .where('id', '=', id)
      .first();

    if (result) return result;

    return new Error('Registro não encontrado');
  } catch (error) {
    return new Error('Erro ao consultar o registro');
  }
};