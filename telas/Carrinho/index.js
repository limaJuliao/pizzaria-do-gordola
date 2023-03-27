import {
  Button,
  Flex,
  ListItem,
  Provider,
  Stack,
  Text,
} from "@react-native-material/core";
import { inserirVenda } from "../../services/vendaService";

export default function CarrinhoScreen({ route, navigation }) {
  const { carrinho, setCarrinho } = route.params;

  async function addVenda() {
    const data = new Date();
    vendaId = await inserirVenda({ data }, carrinho);

    navigation.navigate("CompraEfetivada", {
      vendaId,
      data,
      carrinho,
      setCarrinho,
    });
    setCarrinho([])
  }

  return (
    <Flex>
      <Stack spacing={5}>
        <Flex center>
          <Text variant="h3">Carrinho</Text>
        </Flex>
        <Flex>
          <Button
            title="Concluir compra"
            style={{ margin: 16 }}
            color="red"
            tintColor="white"
            onPress={async () => addVenda()}
          />
        </Flex>
        <Flex style={{ margin: 25 }}>
          {carrinho?.map((value, index) => (
            <ListItem
              title={`${value.descricao}`}
              secondaryText={value.precoUnitario}
              key={`listItem-${value.produtoId}`}
            />
          ))}
        </Flex>
      </Stack>
    </Flex>
  );
}
