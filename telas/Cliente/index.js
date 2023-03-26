import {
  Button,
  Flex,
  IconButton,
  ListItem,
  Stack,
} from "@react-native-material/core";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
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
    <View style={style.container}>
      <View style={style.caixaTitulo}>
        <Flex direction="row">
          <Text style={style.titulo}>Escolha seus itens</Text>
          <IconButton
            icon={(props) => <Icon name="cart" {...props} />}
            onPress={() => navigation.navigate("Carrinho", { carrinho, setCarrinho })}
          />
        </Flex>
      </View>
      {produtos.map((value) => {
        return (
          <Flex>
            <TouchableOpacity
              onPress={() => {
                setCarrinho([...carrinho, value]);
                Alert.alert(`Produto adicionado no carrinho.`)
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
    </View>
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
