import {
  myConnection,
  produtoTableName,
  vendaProdutoTableName,
  vendaTableName,
} from "./data/dbCreator";

export function inserirVenda(venda, carrinho) {
  // console.log(`Iniciando inserção da venda.`);

  return new Promise((resolve, reject) => {
    myConnection().transaction(
      (tx) => {
        tx.executeSql(
          `insert into ${vendaTableName} (data) values(?);`,
          [venda.data.toString()],
          (_, { insertId }) => {
            // console.log(`id da nova venda inserida: ${insertId}`);
            inserirVendaProduto(carrinho, insertId);
            resolve(insertId);
          }
        );
      },

      (error) => {
        // console.log(`erro ao inserir venda: ${error}`);
        resolve(false);
      },
      () => {
        // console.log("Venda criada com sucesso.");
      }
    );
  });
}

function inserirVendaProduto(carrinho, vendaId) {
  // console.log(`Iniciando inserção da vendaProduto.`);

  return new Promise((resolve) => {
    myConnection().transaction(
      (tx) => {
        for (const produto of carrinho) {
          tx.executeSql(
            `insert into ${vendaProdutoTableName} (vendaId, produtoId, quantidade) values(?, ?, ?);`,
            [vendaId, produto.produtoId, 1],
            (_, { insertId }) => {
              // console.log(`id da nova vendaProduto inserida: ${insertId}`);
              resolve(insertId);
            }
          );
        }
      },

      (error) => {
        // console.log(`erro ao inserir venda: ${error}`);
        resolve(false);
      },
      () => {
        // console.log("Venda criada com sucesso.");
      }
    );
  });
}

export function obterPedidos() {
  // console.log("Obtendo todos pedidos.");

  return new Promise((resolve) => {
    myConnection().transaction(
      (tx) => {
        tx.executeSql(`select * from ${vendaTableName};`, [], async (_, { rows }) => {
          var pedidos = [];

          for (let i = 0; i < rows.length; i++) {
            let pedido = {
              pedidoId: Number(rows.item(i).vendaId),
              data: new Date(rows.item(i).data),
              pedidoProdutos: await obterVendaProduto(Number(rows.item(i).vendaId))
            };

            pedidos.push(pedido);
          }

          // console.log(
          //   "query de todos os produtos foi realizada! Qtde. produtos: " +
          //     pedidos.length
          // );
          resolve(pedidos);
        });
      },
      (error) => {
        // console.log("erro ao selecionar todos os produtos: " + error);
        resolve([]);
      },
      () => {
        // console.log(
        //   "transação de recuperação dos produtos executada com sucesso :)"
        // );
      }
    );
  });
}

function obterVendaProduto(vendaId, produtoId) {
  return new Promise((resolve) => {
    myConnection().transaction(
      (tx) => {
        tx.executeSql(`
          select * from ${vendaProdutoTableName} 
            join ${produtoTableName} 
              on ${vendaProdutoTableName}.produtoId = ${produtoTableName}.produtoId where vendaId=?`,
               [vendaId], (_, { rows }) => {
          var vendaProdutos = [];

          for (let i = 0; i < rows.length; i++) {
            let vendaProduto = {
              vendaProdutoId: Number(rows.item(i).vendaProdutoId),
              vendaId: Number(rows.item(i).vendaId),
              produtoId: Number(rows.item(i).produtoId),
              quantidade: Number(rows.item(i).quantidade),
              descricao: rows.item(i).descricao,
              precoUnitario: Number(rows.item(i).precoUnitario)
            };

            vendaProdutos.push(vendaProduto);
          }

          // console.log(
          //   "query de todos os produtos foi realizada! Qtde. produtos: " +
          //     vendaProdutos.length
          // );
          resolve(vendaProdutos);
        });
      },
      (error) => {
        // console.log("erro ao selecionar todos os produtos: " + error);
        resolve([]);
      },
      () => {
        // console.log(
        //   "transação de recuperação dos produtos executada com sucesso :)"
        // );
      }
    );
  });
}
