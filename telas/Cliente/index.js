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

export default function ClienteScreen({ navigation }) {
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
          <Flex>
            <Text variant="h4">Escolha seus itens</Text>
          </Flex>
          <Spacer />
          <Flex>
            <IconButton
              icon={(props) => <Icon name="cart" {...props} />}
              onPress={() =>
                navigation.navigate("Carrinho", { carrinho, setCarrinho })
              }
            />
          </Flex>
          <Spacer />
        </Flex>
      </Flex>
      <Flex>
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
                    title={`${value.descricao} - R$${value.precoUnitario}`}
                    key={`listItem-${value.produtoId}`}
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
