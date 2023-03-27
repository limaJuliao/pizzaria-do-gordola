import { Box, Flex, Provider, Spacer, Text } from "@react-native-material/core";

export default function CompraEfetivadaScreen({ route, navigation }) {
  const { vendaId, data, carrinho } = route.params;

  return (
    <Provider>
      <Flex fill wrap>
        <Flex direction="row" center>
          <Text variant="h4">Compra realizada com sucesso</Text>
        </Flex>
        <Flex center>
          <Spacer />
        </Flex>
        <Flex center>
          <Text>Código da compra: {vendaId.toString()}</Text>
        </Flex>
        <Flex center>
          <Text>Data: {data.toLocaleDateString("pt-BR")}</Text>
        </Flex>

        {carrinho.map((x, index) => (
          <Flex center direction="row">
            <Box>
            <Text variant="h6" key={`text-${index}`}>{x.descricao}</Text>

            </Box>
            <Box>

            <Text variant="h7" >{x.precoUnitario}</Text>
            </Box>
          </Flex>
        ))}
      </Flex>
    </Provider>
  );
}
