import {
  Stack,
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
  TextInput,
  Button,
  Flex,
  IconButton,
  ListItem,
  Provider,
  Text,
  Spacer,
} from "@react-native-material/core";
import { View, StyleSheet } from "react-native";
import { Alert } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import {
  deletarProduto,
  editarProduto,
  inserirProduto,
  obterTodosProdutos,
} from "../../services/produtoService";

import { obterCategorias } from "../../services/categoriaService";
import Produto from "../../entities/produto";
import DropDownPicker from "react-native-dropdown-picker";

export default function ProdutosScreen({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [visibleModalEdit, VisibleModalEdit] = useState(false);
  const [produtoId, setProdutoId] = useState(0);
  const [descricao, setDescricao] = useState("");
  const [precoUnitario, setPrecoUnitario] = useState("");
  const [categoriaId, setCategoriaId] = useState(1);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    obterTodosProdutos().then((response) => {
      setProdutos(response);
    });

    obterCategorias().then((response) =>
      setItems(
        response.map((x) => {
          return {
            label: x.descricao,
            value: x.categoriaId,
          };
        })
      )
    );
  }, []);

  return (
    <Provider>
      <Flex>
        <Flex center>
          <Flex>
            <Text variant="h3">Produtos</Text>
          </Flex>
          <Spacer />
          <Flex>
            <Button
              title="Adicionar novo"
              style={{ margin: 16 }}
              color="red"
              tintColor="white"
              onPress={() => VisibleModalEdit(true)}
            />
          </Flex>
        </Flex>
        <Spacer />
        <Flex style={{ margin: 25 }}>
          {produtos.map((value, index) => {
            return (
              <Flex key={index}>
                <ListItem
                  title={value.descricao}
                  secondaryText={value.precoUnitario}
                  key={`listItem-${index}`}
                  trailing={(props) => (
                    <Flex direction="row" key={`flex-${index}`}>
                      <IconButton
                        key={`iconButton-update-${index}`}
                        icon={(props) => <Icon name="pencil" {...props} />}
                        style={{ width: 25 }}
                        onPress={() => {
                          prepararEdicao(value);
                        }}
                      />
                      <IconButton
                        key={`iconButton-delete-${index}`}
                        icon={(props) => <Icon name="delete" {...props} />}
                        style={{ color: "red" }}
                        onPress={() => {
                          deletarProduto(value.produtoId).then(() => {
                            obterTodosProdutos().then((response) =>
                              setProdutos(response)
                            );
                          });
                        }}
                      />
                    </Flex>
                  )}
                />
              </Flex>
            );
          })}
        </Flex>
      </Flex>

      <Flex>
        <Dialog
          visible={visibleModalEdit}
          onDismiss={() => VisibleModalEdit(false)}
        >
          <DialogHeader title="Editar Produto" />
          <DialogContent>
            <Stack spacing={2}>
              <TextInput
                value={descricao ? descricao : null}
                label="Descrição"
                variant="filled"
                onChangeText={(descricao) => setDescricao(descricao)}
              />
              <TextInput
                value={precoUnitario ? precoUnitario.toString() : null}
                label="Preço Unitário"
                variant="filled"
                keyboardType="numeric"
                onChangeText={(precoUnitario) =>
                  setPrecoUnitario(precoUnitario)
                }
              />
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                onChangeValue={(val) => setCategoriaId(val)}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              title="Cancel"
              compact
              variant="text"
              onPress={() => {
                zerarModal();
              }}
            />
            <Button
              title="Ok"
              compact
              variant="text"
              onPress={() => {
                VisibleModalEdit(false);
                adicionarEditarProduto();
              }}
            />
          </DialogActions>
        </Dialog>
      </Flex>
    </Provider>
  );
  function reiniciarPropriedadesProduto() {
    setDescricao("");
    setPrecoUnitario("");
    setCategoriaId(0);
  }

  async function adicionarEditarProduto() {
    if (!produtoId) {
      const produto = new Produto(null, descricao, precoUnitario, categoriaId);
      inserirProduto(produto).then(() => {
        reiniciarPropriedadesProduto();

        obterTodosProdutos().then((response) => {
          setProdutos(response);
        });

        Alert.alert("Produto adicionado.");
      });
      zerarModal();
    } else {
      const produto = new Produto(
        produtoId,
        descricao,
        precoUnitario,
        categoriaId
      );

      // console.log(`meu teste categoria`, produto);

      editarProduto(produto).then(() => {
        reiniciarPropriedadesProduto();

        obterTodosProdutos().then((response) => {
          setProdutos(response);
        });
      });

      Alert.alert("Produto editado.");
      zerarModal();
    }
  }

  function zerarModal() {
    VisibleModalEdit(false);
    setDescricao("");
    setPrecoUnitario("");
    setProdutoId(0);
    setCategoriaId(0);
    setValue(null);
  }

  function prepararEdicao(value) {
    // console.log(value);
    setCategoriaId(value.categoriaId);
    setProdutoId(value.produtoId);
    setDescricao(value.descricao);
    setPrecoUnitario(value.precoUnitario.toString());
    VisibleModalEdit(true);

    setValue(value.categoriaId);
  }
}
