import { myConnection, vendaTableName } from "./data/dbCreator";

export function inserirVenda(venda) {
  console.log(`Iniciando inserção da venda.`);

  return new Promise((resolve, reject) => {
    myConnection().transaction(
      (tx) => {
        tx.executeSql(
          `insert into ${vendaTableName} (data) values(?);`,
          [venda.data.toString()],
          (_, { insertId }) => {
            console.log(`id da nova venda inserida: ${insertId}`);
            resolve(insertId);
          }
        );
      },

      (error) => {
        console.log(`erro ao inserir venda: ${error}`);
        resolve(false);
      },
      () => {
        console.log("Venda criada com sucesso.");
      }
    );
  });
}
