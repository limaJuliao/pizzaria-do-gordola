import { Flex, Provider } from "@react-native-material/core";
import { Text } from "react-native";

export default function CompraEfetivadaScreen({ route, navigation }) {
  const { vendaId, data, carrinho } = route.params;


  console.log(vendaId)
  return (
    <Provider>
      <Flex>
        <Text>Compra realizada com sucesso</Text>
        <Text>Código da compra: {vendaId.toString()}</Text>
        <Text>Data: {data.toLocaleDateString('pt-BR')}</Text>
        {carrinho.map((x) => (
          <Text>{x.descricao}</Text>
        ))}
      </Flex>
    </Provider>
  );
}
