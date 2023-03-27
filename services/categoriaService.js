import { categoriaTableName, myConnection } from "./data/dbCreator";

export function inserirCategoria(categoria) {
  // console.log("iniciando inserção de categoria.");
  // console.log(categoria);

  return new Promise((resolve) => {
    myConnection().transaction(
      (tx) => {
        tx.executeSql(
          `insert into ${categoriaTableName} (descricao) values(?);`,
          [categoria.descricao],
          (_, { insertId }) => {
            // console.log(`id do novo categoria inserted: ${insertId}`);
          }
        );

        resolve(true);
      },
      (error) => {
        // console.log(`erro ao inserir novo categoria: ${error}`);
        resolve(false);
      },
      () => {
        // console.log("categoria criado com sucesso.");
      }
    );
  });
}

export function obterCategorias() {
  // console.log("Obtendo todos categorias.");

  return new Promise((resolve) => {
    myConnection().transaction(
      (tx) => {
        tx.executeSql(
          `select * from ${categoriaTableName}`,
          [],
          (_, { rows }) => {
            var categorias = [];

            for (let i = 0; i < rows.length; i++) {
              let categoria = {
                categoriaId: Number(rows.item(i).categoriaId),
                descricao: rows.item(i).descricao.toString(),
              };

              categorias.push(categoria);
            }

            // console.log(
            //   "query de todos os categorias foi realizada! Qtde. categorias: " +
            //     categorias.length
            // );
            resolve(categorias);
          }
        );
      },
      (error) => {
        // console.log("erro ao selecionar todos os categorias: " + error);
        resolve([]);
      },
      () => {
        // console.log(
        //   "transação de recuperação dos categorias executada com sucesso :)"
        // );
      }
    );
  });
}

export function deletarCategoria(id) {
  console.log(`Excluindo categoria ${id}`);

  return new Promise((resolve) => {
    myConnection().transaction(
      (tx) => {
        tx.executeSql(
          `delete from ${categoriaTableName} where categoriaId=?;`,
          [id],
          (_, { rowsAffected }) => {
            // console.log(`categoria ${id} excluido.`);
          }
        );

        resolve(true);
      },
      (error) => {
        // console.log(`Erro ao exluir categoria ${id}`, error);
        resolve(false);
      },
      () => {
        // console.log("categoria excluido com sucesso.");
      }
    );
  });
}

export function editarCategoria(categoria) {
  // console.log("iniciando update de categoria.", categoria);

  return new Promise((resolve) => {
    myConnection().transaction(
      (tx) => {
        tx.executeSql(
          `update ${categoriaTableName} set descricao=? where categoriaId=?;`,
          [categoria.descricao, categoria.categoriaId],
          (_, { rowsAffected }) => {
            // console.log("categoria alterado");
          }
        );

        resolve(true);
      },
      (error) => {
        // console.log("erro ao alterar o categoria: " + error);
        resolve(false);
      },
      () => {
        // console.log(
        //   "transação de alteração de categoria realizada com sucesso :)"
        // );
      }
    );
  });
}
