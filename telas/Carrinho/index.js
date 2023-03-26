import { Button, Flex, ListItem, Provider } from "@react-native-material/core";
import { inserirVenda } from "../../services/vendaService";

export default function CarrinhoScreen({ route, navigation }) {
  const { carrinho, setCarrinho } = route.params;

  async function addVenda() {
    console.log(`Efetivando compra.`);
    const data = new Date();
    vendaId = await inserirVenda({ data });

    navigation.navigate("CompraEfetivada", { vendaId, data, carrinho });
  }

  return (
    <Provider>
      {carrinho.map((value) => (
        <Flex key={`flex-${value.produtoId}`}>
          <ListItem
            key={`listItem-${value.produtoId}`}
            title={value.descricao}
          />
        </Flex>
      ))}
      <Button
        title="Concluir compra"
        color="red"
        tintColor="white"
        onPress={async () => addVenda()}
      />
    </Provider>
  );
}
