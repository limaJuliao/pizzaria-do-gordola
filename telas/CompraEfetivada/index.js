import {
  Box,
  Button,
  Flex,
  Provider,
  Spacer,
  Stack,
  Text,
} from "@react-native-material/core";

export default function CompraEfetivadaScreen({ route, navigation }) {
  const { vendaId, data, carrinho , setCarrinho} = route.params;

  return (
    <Provider>
      <Flex fill>
        <Stack spacing={20}>
          <Flex direction="row" center>
            <Text variant="h4">Compra realizada com sucesso</Text>
          </Flex>
          <Flex center>
            <Spacer />
          </Flex>
          <Flex center>
            <Text variant="h5">Código da compra: {vendaId.toString()}</Text>
          </Flex>
          <Flex center>
            <Text variant="h5">Data: {data.toLocaleDateString("pt-BR")}</Text>
          </Flex>
          <Flex>
            <Stack spacing={10}>
              <Flex center>
                <Text variant="h5">Itens:</Text>
              </Flex>
              <Flex>
                {carrinho.map((x, index) => (
                  <Flex center direction="row" style={{ margin: 10 }} key={index}>
                    <Flex>
                      <Text variant="h6" >
                        {x.descricao}
                      </Text>
                    </Flex>
                    <Spacer />
                    <Flex>
                      <Text variant="h7">{x.precoUnitario}</Text>
                    </Flex>
                  </Flex>
                ))}
              </Flex>{" "}
              <Flex>
                <Button
                  title="Novo Pedido"
                  style={{ margin: 16 }}
                  color="red"
                  tintColor="white"
                  onPress={async () =>{ navigation.navigate("NovoPedido"); setCarrinho([])}}
                />
              </Flex>
            </Stack>
          </Flex>
        </Stack>
      </Flex>
    </Provider>
  );
}
