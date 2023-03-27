import {
  myConnection,
  vendaProdutoTableName,
  vendaTableName,
} from "./data/dbCreator";

export function inserirVenda(venda, carrinho) {
  console.log(`Iniciando inserção da venda.`);

  return new Promise((resolve, reject) => {
    myConnection().transaction(
      (tx) => {
        tx.executeSql(
          `insert into ${vendaTableName} (data) values(?);`,
          [venda.data.toString()],
          (_, { insertId }) => {
            console.log(`id da nova venda inserida: ${insertId}`);
            inserirVendaProduto(carrinho, insertId);
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

function inserirVendaProduto(carrinho, vendaId) {
  console.log(`Iniciando inserção da vendaProduto.`);

  return new Promise((resolve) => {
    myConnection().transaction(
      (tx) => {
        for (const produto of carrinho) {
          tx.executeSql(
            `insert into ${vendaProdutoTableName} (vendaId, produtoId, quantidade) values(?, ?, ?);`,
            [vendaId, produto.produtoId, 1],
            (_, { insertId }) => {
              console.log(`id da nova vendaProduto inserida: ${insertId}`);
              resolve(insertId);
            }
          );
        }
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
