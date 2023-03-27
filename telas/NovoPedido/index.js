import {
  Button,
  Flex,
  IconButton,
  ListItem,
  Spacer,
  Stack,
  Text,
} from "@react-native-material/core";
import { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { obterTodosProdutos } from "../../services/produtoService";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function NovoPedidoScreen({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    obterTodosProdutos().then((response) => {
      setProdutos(response);
    });
  }, []);

  return (
    <Flex>
      <Flex center>
        <Flex direction="row">
          <Spacer />
          <Flex center>
            <Text variant="h4">Item do pedido</Text>
          </Flex>
          <Spacer />
          <Flex>
            <IconButton
              icon={(props) => <Icon name="cart" {...props} title="Concluir pedito"/>}
              onPress={() =>
                navigation.navigate("Carrinho", { carrinho, setCarrinho })
              }
            />
          </Flex>
          <Spacer />
        </Flex>
      </Flex>
      <Flex style={{ margin: 25 }}>
        {produtos.map((value, index) => {
          return (
            <Flex key={index}>
              <TouchableOpacity
                onPress={() => {
                  setCarrinho([...carrinho, value]);
                  Alert.alert(`Produto adicionado no carrinho.`);
                }}
              >
                <ListItem
                  title={`${value.descricao}`}
                  secondaryText={value.precoUnitario}
                  key={`listItem-${value.produtoId}`}
                  trailing={(props) => <Icon name="plus" {...props} />}
                />
              </TouchableOpacity>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
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
