import { Button, Stack } from "@react-native-material/core";
import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={style.container}>
      <Stack spacing={50}>
        <View style={style.caixaTitulo}>
          <Text style={style.titulo}>Home</Text>
        </View>
        <Button
          color="red"
          tintColor="white"
          title="Funcionario"
          onPress={() => navigation.navigate("Funcionarios")}
        />
        <Button
          color="red"
          tintColor="white"
          title="Cliente"
          onPress={() => navigation.navigate("Cliente")}
        />
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
