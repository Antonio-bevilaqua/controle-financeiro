import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';

export const deleteById = async(id: string, user_id: string): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.transactions)
      .where('id', '=', id)
      .where('user_id', '=', user_id)
      .del();

    if (result > 0) return;

    return new Error('Erro ao apagar o registro');
  } catch (error) {
    return new Error('Erro ao apagar o registro');
  }
};