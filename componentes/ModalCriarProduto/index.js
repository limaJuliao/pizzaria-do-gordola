import React, { useState } from "react";
import {
  Stack,
  Button,
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
  TextInput,
} from "@react-native-material/core";
import { inserirProduto, obterTodos } from "../../services/produtoService";
import { Alert } from "react-native";
import Produto from "../../entities/produto";

const App = () => {
  const [visible, setVisible] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [precoUnitario, setPrecoUnitario] = useState("");
  const [categoriaId, setCategoriaId] = useState(1);

  async function adicionarProduto() {
    const produto = new Produto(null, descricao, precoUnitario, categoriaId);

    inserirProduto(produto).then(() => {
      reiniciarPropriedadesProduto();
      obterTodos().then(response => console.log(response))
    });

    Alert.alert("Produto adicionado.");
  }

  return (
    <>
      <Button
        title="Adicionar novo"
        style={{ margin: 16 }}
        color="red"
        tintColor="white"
        onPress={() => setVisible(true)}
      />
      <Dialog visible={visible} onDismiss={() => setVisible(false)}>
        <DialogHeader title="Adicionar produto" />
        <DialogContent>
          <Stack spacing={2}>
            <TextInput
              label="Descrição"
              variant="standard"
              onChangeText={(descricao) => setDescricao(descricao)}
            />
            <TextInput
              label="Preço Unitário"
              variant="standard"
              keyboardType="numeric"
              onChangeText={(precoUnitario) => setPrecoUnitario(precoUnitario)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            title="Cancel"
            compact
            variant="text"
            onPress={() => setVisible(false)}
          />
          <Button
            title="Ok"
            compact
            variant="text"
            onPress={() => {
              setVisible(false);
              adicionarProduto();
            }}
          />
        </DialogActions>
      </Dialog>
    </>
  );

  function reiniciarPropriedadesProduto() {
    setDescricao("");
    setPrecoUnitario("");
    setCategoriaId(1);
  }
};

const ModalAdicionarProduto = () => <App />;

export default ModalAdicionarProduto;
