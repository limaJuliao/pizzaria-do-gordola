import { Button, Flex, ListItem, Provider } from "@react-native-material/core";
import { inserirVenda } from "../../services/vendaService";

export default function CarrinhoScreen({ route, navigation }) {
  const { carrinho, setCarrinho } = route.params;

  async function addVenda() {
    console.log(`Efetivando compra.`);
    const data = new Date();
    vendaId = await inserirVenda({ data }, carrinho);

    navigation.navigate("CompraEfetivada", { vendaId, data, carrinho });
  }

  return (
    <Provider>
      <Button
        title="Concluir compra"
        style={{ margin: 16 }}
        color="red"
        tintColor="white"
        onPress={async () => addVenda()}
      />
      {carrinho.map((value, index) => (
        <Flex key={`flex-${index}`}>
          <ListItem key={`listItem-${index}`} title={value.descricao} />
        </Flex>
      ))}
    </Provider>
  );
}
