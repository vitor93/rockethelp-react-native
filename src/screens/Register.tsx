import { useState } from 'react';
import { Alert } from 'react-native';

import { VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';


import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();

  function handleNewOrderRegister(){
    if(!patrimony || !description){
      return Alert.alert('Solicitação', 'Preencher todos os campos.');
    }

    setIsLoading(true);

    firestore()
    .collection('orders')
    .add({
      patrimony,
      description,
      status: 'open',
      created_at: firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      Alert.alert('Solicitação', 'Solicitação registada com sucesso.');
      navigation.goBack();
    })
    .catch((error) => {
      console.log(error);
      setIsLoading(false);
      return Alert.alert('Solicitação', 'Não foi possível adicionar solicação.')
    });
  }

  return (
    <VStack flex={1} 
    p={6}
    bg="gray.600">
        <Header title="Solicitação" />

        <Input placeholder="Número de patrimonio"
        mt={4}
        onChangeText={setPatrimony}
         />

        <Input placeholder='Descrição do problema' 
        mt={5}
        flex={1}
        multiline
        textAlignVertical="top"
        onChangeText={setDescription} />

        <Button title="Registar"
        mt={5}
        isLoading={isLoading}
        onPress={handleNewOrderRegister} />

    </VStack>
  );
}