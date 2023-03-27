import { Button, Flex, Stack, Text } from "@react-native-material/core";
import { View, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <Flex center>
      <Flex>
        <Stack spacing={150}>
          <Flex>
            <Text variant="h2">Home</Text>
          </Flex>
          <Flex>
            <Stack spacing={30}>
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
          </Flex>
        </Stack>
      </Flex>
    </Flex>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },
  titulo: {
    fontSize: 30,
  },
  caixaTitulo: { alignItems: "center" },
});
