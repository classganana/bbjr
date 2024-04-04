import React from 'react';
import { View, Modal, Text, Button } from 'react-native';

type ErrorModalProps = {
    visible: boolean;
    errorMessage: string;
    onClose: () => void;
}

export const ErrorModal = ({ visible, errorMessage, onClose }: ErrorModalProps) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'white', padding: 20 }}>
          <Text>{errorMessage}</Text>
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};


export default ErrorModal;
