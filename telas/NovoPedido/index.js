import {
  Button,
  Flex,
  IconButton,
  ListItem,
  Spacer,
  Stack,
  Text,
} from "@react-native-material/core";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Alert } from "react-native";
import { obterTodosProdutos } from "../../services/produtoService";
import { obterCategorias } from "../../services/categoriaService";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";

export default function NovoPedidoScreen({ navigation }) {
  const [carrinho, setCarrinho] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useFocusEffect(
    useCallback(() => {
      obterTodosProdutos().then((response) => {
        setProdutos(response);
      });
  
      obterCategorias().then((r) => {
        setCategorias(r);
      });
    }, [])
  );

  return (
    <Flex>
      <Flex center>
        <Flex direction="row">
          <Spacer />
          <Flex center>
            <Text variant="h4">Itens do pedido</Text>
          </Flex>
          <Spacer />
          <Flex>
            <IconButton
              icon={(props) => (
                <Icon name="cart" {...props} title="Concluir pedito" />
              )}
              onPress={() =>
                navigation.navigate("Carrinho", { carrinho, setCarrinho })
              }
            />
          </Flex>
          <Spacer />
        </Flex>
      </Flex>
      <Flex style={{ margin: 25 }}>
        {categorias.map((cat, i) => {
          return (
            <Flex key={i}>
              <Flex center>
                <Text variant="h5" cen>
                  {cat.descricao}
                </Text>
              </Flex>
              {produtos?.map((value, index) => {
                if (value.categoriaId === cat.categoriaId)
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
                          secondaryText={`R$ ${value.precoUnitario}`}
                          key={`listItem-${value.produtoId}`}
                          trailing={(props) => <Icon name="plus" {...props} />}
                        />
                      </TouchableOpacity>
                    </Flex>
                  );
              })}
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
