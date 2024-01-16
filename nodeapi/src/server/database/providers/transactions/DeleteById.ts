import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';

export const deleteById = async(id: string): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.transactions)
      .where('id', '=', id).del();

    if (result > 0) return;

    return new Error('Erro ao apagar o registro');
  } catch (error) {
    return new Error('Erro ao apagar o registro');
  }
};