import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ITransactions } from '../../models';

export const getAll = async(user_id: string, page: number, limit: number, type: string): Promise<ITransactions[] | Error> => {
  try{
    let qry = Knex(ETableNames.transactions)
      .select('*')
      .where('user_id', '=', user_id)
      .offset((page - 1) * limit)
      .limit(limit);

    if (type !== ''){
      qry = qry.where('type', '=', type);
    }

    const result = await qry;

    if (!result || result.length === 0){
      throw new Error('Nenhuma transação encontrada');
    }

    return result;
  } catch {
    return new Error('Erro ao consultar os registros');
  }
};