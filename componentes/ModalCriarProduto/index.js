import React, { useState } from "react";
import {
  Stack,
  Button,
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
  TextInput,
} from "@react-native-material/core";

const App = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button
        title="Adicionar novo"
        style={{ margin: 16 }}
        color="red"
        tintColor="white"
        onPress={() => setVisible(true)}
      />
      <Dialog visible={visible} onDismiss={() => setVisible(false)}>
        <DialogHeader title="Dialog Header" />
        <DialogContent>
          <Stack spacing={2}>
            <TextInput label="Descrição" variant="standard" />
            <TextInput label="Preço Unitário" variant="standard" keyboardType='numeric' />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            title="Cancel"
            compact
            variant="text"
            onPress={() => setVisible(false)}
          />
          <Button
            title="Ok"
            compact
            variant="text"
            onPress={() => setVisible(false)}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

const ModalAdicionarProduto = () => <App />;

export default ModalAdicionarProduto;
