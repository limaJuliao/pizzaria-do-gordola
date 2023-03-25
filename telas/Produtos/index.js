import {
  Button,
  Flex,
  IconButton,
  ListItem,
  Provider,
} from "@react-native-material/core";
import { View, Text, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import ModalAdicionarProduto from "../../componentes/ModalCriarProduto";
import { useEffect, useState } from "react";
import { deletarProduto, obterTodosProdutos } from "../../services/produtoService";

export default function ProdutosScreen({ navigation }) {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    obterTodosProdutos()
    .then((response) => {
        setProdutos(response);
    });
},[]);

  return (
    <Provider>
      <View style={style.container}>
        <View style={style.caixaTitulo}>
          <Text style={style.titulo}>Produtos</Text>
        </View>
        <ModalAdicionarProduto />
        {produtos.map((value) => {
          return (
            <Flex>
              <ListItem
                title={value.descricao}
                key={`listItem-${value.produtoId}`}
                trailing={(props) => (
                  <Flex direction="row" key={`flex-${value.produtoId}`}>
                    <IconButton
                      key={`iconButton-update-${value.produtoId}`}
                      icon={(props) => <Icon name="pencil" {...props} />}
                      style={{ width: 25 }}
                      onPress={() => console.log(`update ${value.produtoId}`)}
                    />
                    <IconButton
                      key={`iconButton-delete-${value.produtoId}`}
                      icon={(props) => <Icon name="delete" {...props} />}
                      style={{ color: "red" }}
                      onPress={() => {
                        deletarProduto(value.produtoId).then((resolve) => {
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
      </View>
    </Provider>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  titulo: {
    fontSize: 30,
  },
  caixaTitulo: { alignItems: "center" },
});
