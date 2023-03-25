import { Button, Stack } from "@react-native-material/core";
import { View, Text, StyleSheet } from "react-native";

export default function FuncionariosScreen({ navigation }) {
  return (
    <View style={style.container}>
      <Stack spacing={50}>
        <View style={style.caixaTitulo}>
          <Text style={style.titulo}>Gerenciamento</Text>
        </View>
        <Button
          color="red"
          tintColor="white"
          title="Produtos"
          onPress={() => navigation.navigate("Produtos")}
        />
        {/* <Button
          color="red"
          tintColor="white"
          title="Produtos"
          onPress={() => navigation.navigate("Produtos")}
        /> */}
      </Stack>
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
