import {
  Button,
  Flex,
  Icon,
  IconButton,
  ListItem,
  Stack,
} from "@react-native-material/core";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { obterTodosProdutos } from "../../services/produtoService";

export default function ClienteScreen({ navigation }) {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    obterTodosProdutos().then((response) => {
      setProdutos(response);
    });
  }, []);

  return (
    <View style={style.container}>
      <View style={style.caixaTitulo}>
        <Text style={style.titulo}>Escolha seus itens</Text>
      </View>
      {produtos.map((value) => {
        return (
          <Flex>
            <ListItem
              title={`${value.descricao} - R$${value.precoUnitario}`}
              key={`listItem-${value.produtoId}`}
              // onPress={() => }
              // trailing={(props) => {
              //   <Flex direction="row" key={`flex-${value.produtoId}`}>
                  
              //   </Flex>;
              // }}
            />
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
