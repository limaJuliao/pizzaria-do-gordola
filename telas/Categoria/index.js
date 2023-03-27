import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
  Flex,
  IconButton,
  ListItem,
  Provider,
  Spacer,
  Stack,
  Text,
  TextInput,
} from "@react-native-material/core";
import { useEffect, useState } from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Categoria from "../../entities/categoria";
import {
  deletarCategoria,
  editarCategoria,
  inserirCategoria,
  obterCategorias,
} from "../../services/categoriaService";
import { Alert } from "react-native";

export default function CategoriasScreen({ navigation }) {
  const [categorias, setCategorias] = useState([]);
  const [visibleModalEdit, VisibleModalEdit] = useState(false);
  const [categoriaId, setCategoriaId] = useState(0);
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    obterCategorias().then((response) => {
      setCategorias(response);
    });
  }, []);

  return (
    <Provider>
      <Flex>
        <Flex center>
          <Flex>
            <Text variant="h3">Categorias</Text>
          </Flex>
          <Spacer />
          <Flex>
            <Button
              title="Adicionar nova"
              style={{ margin: 16 }}
              color="red"
              tintColor="white"
              onPress={() => VisibleModalEdit(true)}
            />
          </Flex>
        </Flex>
        <Spacer />
        <Flex style={{ margin: 25 }}>
          {categorias.map((value, index) => {
            return (
              <Flex key={index}>
                <ListItem
                  title={value.descricao}
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
                          deletarCategoria(value.categoriaId).then(() => {
                            obterCategorias().then((response) =>
                              setCategorias(response)
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
          <DialogHeader title="Editar Categoria" />
          <DialogContent>
            <Stack spacing={2}>
              <TextInput
                value={descricao ? descricao : null}
                label="Descrição"
                variant="filled"
                onChangeText={(descricao) => setDescricao(descricao)}
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
                adicionarEditarCategoria();
              }}
            />
          </DialogActions>
        </Dialog>
      </Flex>
    </Provider>
  );

  function reiniciarPropriedadesCategoria() {
    setDescricao("");
    setCategoriaId(0);
  }

  async function adicionarEditarCategoria() {
    if (!categoriaId) {
      const categoria = new Categoria(null, descricao);
      // console.log(categoria);
      inserirCategoria(categoria).then(() => {
        reiniciarPropriedadesCategoria();

        obterCategorias().then((response) => {
          setCategorias(response);
        });

        Alert.alert(`Categoria adicionada`);
      });
      zerarModal();
    } else {
      const categoria = new Categoria(categoriaId, descricao);

      editarCategoria(categoria).then(() => {
        reiniciarPropriedadesCategoria();

        obterCategorias().then((response) => {
          setCategorias(response);
        });
      });

      Alert.alert("Categoria editado.");
      zerarModal();
    }
  }

  function zerarModal() {
    VisibleModalEdit(false);
    setDescricao("");
    setCategoriaId(0);
  }

  function prepararEdicao(value) {
    setCategoriaId(value.categoriaId);
    setDescricao(value.descricao);
    VisibleModalEdit(true);
  }
}
