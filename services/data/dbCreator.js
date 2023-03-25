import * as SQLlite from "expo-sqlite";
import { version } from "react";
import Carrinho from "../../entities/carrinho";
import Categoria from "../../entities/categoria";
import Produto from "../../entities/produto";
import Venda from "../../entities/venda";
import VendaProduto from "../../entities/vendaProduto";

export function myConnection() {
  const dbConnetion = {
    getConnection: () => SQLlite.openDatabase("gordola.db"),
  };

  return dbConnetion.getConnection();
}

export const categoriaTableName = new Categoria().constructor.name;
export const produtoTableName = new Produto().constructor.name;
export const carrinhoTableName = new Carrinho().constructor.name;
export const vendaTableName = new Venda().constructor.name;
export const vendaProdutoTableName = new VendaProduto().constructor.name;

export function createDataBase() {
  let connection = myConnection();

  console.log("Criando bando de dados...");
  connection.transaction(
    (tx) => {
      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS ${categoriaTableName}(
          categoriaId integer primary key AUTOINCREMENT, 
          descricao text not null);`);
      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS ${produtoTableName}(
          produtoId integer primary key AUTOINCREMENT, 
          descricao text not null, 
          precoUnitario real not null,
          categoriaId integer not null, 
          FOREIGN KEY(categoriaId) REFERENCES ${categoriaTableName}(categoriaId));`);
      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS ${carrinhoTableName}(
          produtoId integer primary key, 
          quantidade integer not null,
          FOREIGN KEY(produtoId) REFERENCES ${produtoTableName}(produtoId));`);
      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS ${vendaTableName}(
          vendaId integer primary key AUTOINCREMENT, 
          data text not null);`);
      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS ${vendaProdutoTableName}(
          vendaProdutoId integer primary key AUTOINCREMENT, 
          vendaId integer not null, 
          produtoId integer not null, 
          quantidade integer not null, 
          FOREIGN KEY(vendaId) REFERENCES ${vendaTableName}(vendaId), 
          FOREIGN KEY(produtoId) REFERENCES ${produtoTableName}(produtoId));`);
    },
    (erro) => console.log(`Erro ao criar banco!`, erro),
    () => console.log(`Banco criado.`)
  );
}
