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
import { obterTodos as obterTodosProdutos } from "../../services/produtoService";

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
        {
          produtos.map((value) =>{
            return (
              <ListItem
                title={value.descricao}
                key={value.produtoId}
                trailing={(props) => (
                  <Flex direction="row" key={"f_"+value.id}>
                    <Icon
                      name="pencil"
                      {...props}
                      onPress={() => console.log("Editando...")}
                    />
                    <Icon name="delete" {...props} style={{ color: "red" }} onPress={console.log("Deletando...")}/>
                  </Flex>
                )}
              />
            )
          })
        }
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
