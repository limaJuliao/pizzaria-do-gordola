import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Appbar, Menu, Provider } from "react-native-paper";
import { createDataBase } from "./services/data/dbCreator";
import { useState } from "react";

import HomeScreen from "./telas/Home";
import NovoPedidoScreen from "./telas/NovoPedido";
import FuncionariosScreen from "./telas/Funcionario";
import ProdutosScreen from "./telas/Produtos";
import CarrinhoScreen from "./telas/Carrinho";
import CompraEfetivadaScreen from "./telas/CompraEfetivada";

const Stack = createStackNavigator();
createDataBase();

export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="NovoPedido"
          screenOptions={{
            header: (props) => <CustomNavigationBar {...props} />,
          }}
        >
          <Stack.Screen name="NovoPedido" component={NovoPedidoScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Funcionarios" component={FuncionariosScreen} />
          <Stack.Screen name="Produtos" component={ProdutosScreen} />
          <Stack.Screen name="Carrinho" component={CarrinhoScreen} />
          <Stack.Screen
            name="CompraEfetivada"
            component={CompraEfetivadaScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

function CustomNavigationBar({ navigation, back }) {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Appbar.Header >
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="PIZZARIA DO GORDOLA" />
      {!back ? (
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action icon="menu" color="black" onPress={openMenu} />
          }
        >
          <Menu.Item
            onPress={() => {
              navigation.navigate("NovoPedido");
            }}
            title="Novo Pedido"
          />
          <Menu.Item
            onPress={() => {
              navigation.navigate("Produtos");
            }}
            title="Produtos"
          />
        </Menu>
      ) : null}
    </Appbar.Header>
  );
}
