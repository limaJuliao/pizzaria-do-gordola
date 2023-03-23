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

export default function ProdutosScreen({ navigation }) {
  return (
    <Provider>
      <View style={style.container}>
        <View style={style.caixaTitulo}>
          <Text style={style.titulo}>Produtos</Text>
        </View>
        <ModalAdicionarProduto />
        <ListItem
          title="List Item"
          trailing={(props) => (
            <Flex direction="row">
              <Icon
                name="pencil"
                {...props}
                onPress={() => console.log("Editando...")}
              />
              <Icon name="delete" {...props} style={{ color: "red" }} onPress={console.log("Deletando...")}/>
            </Flex>
          )}
        />
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
