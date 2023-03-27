import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
  Flex,
  ListItem,
  Pressable,
  Provider,
  Spacer,
  Stack,
  Text,
  TextInput,
} from "@react-native-material/core";
import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { obterPedidos } from "../../services/vendaService";

export default function VendasScreen({ navigation }) {
  const [pedidos, setPedidos] = useState([]);
  const [visible, setVisible] = useState(false);
  const [currentPedido, setCurrentPedido] = useState({});

  useEffect(() => {
    obterPedidos().then((response) => {
      setPedidos(response);
    });
  }, []);

  function exibeDetatlhedoPedido(pedido) {
    setCurrentPedido(pedido);
    setVisible(true);
    // console.log(pedido.data);
  }

  var total = currentPedido.pedidoProdutos?.reduce(getTotal, 0);
  function getTotal(total, item) {
    return total + item.precoUnitario * item.quantidade;
  }

  return (
    <Provider>
      <Flex>
        <ScrollView>
          <Flex>
            <Flex center>
              <Text variant="h4">Pedidos</Text>
            </Flex>
            <Flex>
              <Text variant="h5"></Text>
            </Flex>
            <Flex center>
              <Stack spacing={2}>
                {pedidos.map((value, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => exibeDetatlhedoPedido(value)}
                  >
                    <Flex direction="row" key={index}>
                      <Flex center>
                        <Text variant="h6">Pedido N: {value.pedidoId}</Text>
                      </Flex>
                      <Flex center>
                        <Text variant="h6"> </Text>
                      </Flex>
                      <Flex>
                        <Text variant="h6">
                          Data: {value.data.toLocaleDateString("pt-BR")}
                        </Text>
                      </Flex>
                    </Flex>
                  </TouchableOpacity>
                ))}
              </Stack>
            </Flex>
          </Flex>
        </ScrollView>

        <Flex>
          <>
            <Dialog visible={visible} onDismiss={() => setVisible(false)}>
              <DialogHeader title="Dados do pedido" />
              <DialogContent>
                <Stack spacing={2}>
                  <Text variant="h6">N: {currentPedido.pedidoId}</Text>
                  <Text variant="h6">
                    Data: {currentPedido.data?.toLocaleDateString("pt-BR")}
                  </Text>
                  {currentPedido.pedidoProdutos?.map((x, index) => {
                    return (
                      <>
                        <Flex direction="row" key={index}>
                          <Text variant="h7">{x.descricao}</Text>
                          <Text> </Text>
                          <Text variant="h7">{x.precoUnitario}</Text>
                        </Flex>
                      </>
                    );
                  })}
                  <Text>Valor Total: R$ {total}</Text>
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button
                  title="Cancel"
                  compact
                  variant="text"
                  onPress={() => {
                    setVisible(false);
                    setCurrentPedido({});
                  }}
                />
                <Button
                  title="Ok"
                  compact
                  variant="text"
                  onPress={() => {
                    setVisible(false);
                    setCurrentPedido({});
                  }}
                />
              </DialogActions>
            </Dialog>
          </>
        </Flex>
      </Flex>
    </Provider>
  );
}
