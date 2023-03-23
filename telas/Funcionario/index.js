import { Button } from "@react-native-material/core";
import { View, Text, StyleSheet } from "react-native";

export default function FuncionariosScreen({ navigation }) {
  return (
    <View style={style.container}>
      <View style={style.caixaTitulo}>
        <Text style={style.titulo}>Gerenciamento</Text>
      </View>
      <Button
      color="red" tintColor="white"
        title="Produtos"
        onPress={() => navigation.navigate("Produtos")}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 30,
  },
  caixaTitulo: { alignItems: "center" },
});
