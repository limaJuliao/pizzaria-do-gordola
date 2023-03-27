import { myConnection, produtoTableName } from "./data/dbCreator";

export function inserirProduto(produto) {
  console.log("iniciando inserção de produto.");

  return new Promise((resolve, reject) => {
    myConnection().transaction(
      (tx) => {
        tx.executeSql(
          `insert into ${produtoTableName} (descricao, precoUnitario, categoriaId) values(?, ?, ?);`,
          [produto.descricao, produto.precoUnitario, produto.categoriaId],
          (_, { insertId }) => {
            console.log(`id do novo produto inserted: ${insertId}`);
          }
        );

        resolve(true);
      },
      (error) => {
        console.log(`erro ao inserir novo produto: ${error}`);
        resolve(false);
      },
      () => {
        console.log("Produto criado com sucesso.");
      }
    );
  });
}

export function obterTodosProdutos() {
  console.log("Obtendo todos produtos.");

  return new Promise((resolve, reject) => {
    myConnection().transaction(
      (tx) => {
        tx.executeSql(
          `select * from ${produtoTableName}`,
          [],
          (_, { rows }) => {
            var produtos = [];

            for (let i = 0; i < rows.length; i++) {
              let produto = {
                produtoId: Number(rows.item(i).produtoId),
                descricao: rows.item(i).descricao.toString(),
                precoUnitario: rows.item(i).precoUnitario,
                categoriaId: rows.item(i).categoriaId,
              };

              produtos.push(produto);
            }

            console.log(
              "query de todos os produtos foi realizada! Qtde. produtos: " +
                produtos.length
            );
            resolve(produtos);
          }
        );
      },
      (error) => {
        console.log("erro ao selecionar todos os produtos: " + error);
        resolve([]);
      },
      () => {
        console.log(
          "transação de recuperação dos produtos executada com sucesso :)"
        );
      }
    );
  });
}

export function deletarProduto(id) {
  console.log(`Excluindo produto ${id}`);

  return new Promise((resolve, reject) => {
    myConnection().transaction(
      (tx) => {
        tx.executeSql(
          `delete from ${produtoTableName} where produtoId=?;`,
          [id],
          (_, { rowsAffected }) => {
            console.log(`Produto ${id} excluido.`);
          }
        );

        resolve(true);
      },
      (error) => {
        console.log(`Erro ao exluir produto ${id}`, error);
        resolve(false);
      },
      () => {
        console.log("Produto excluido com sucesso.");
      }
    );
  });
}

export function editarProduto(produto) {
  console.log("iniciando update de produto.", produto);

  return new Promise((resolve) => {
    myConnection().transaction(
      (tx) => {
        tx.executeSql(
          `update ${produtoTableName} set descricao=?, precoUnitario=?, categoriaId=? where produtoId=?;`,
          [produto.descricao, produto.precoUnitario, produto.categoriaId, produto.produtoId],
          (_, { rowsAffected }) => {
            console.log("produto alterado");
          }
        );

        resolve(true);
      },
      (error) => {
        console.log("erro ao alterar o produto: " + error);
        resolve(false);
      },
      () => {
        console.log(
          "transação de alteração de produto realizada com sucesso :)"
        );
      }
    );
  });
}
