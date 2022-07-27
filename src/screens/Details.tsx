import { useEffect, useState } from 'react';
import {Alert} from 'react-native';
import { VStack, Text, HStack, useTheme, ScrollView, Box } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';
import { CircleWavyCheck, Hourglass, DesktopTower, ClipboardText } from 'phosphor-react-native';

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { OrderProps } from '../components/Order';
import { OrderFirestoreDTO } from '../DTOs/OrderFirestoreDTO';
import { dateFormat } from '../utils/firestoreDateFormat';
import { Loading } from '../components/Loading';
import { CardDetails} from '../components/CardDetails';

type RouteParams = {
  orderId: string;
}

type OrderDetails = OrderProps & {
  description: string;
  solution: string;
  closed: string;
}

export function Details() {
  const [loading, setLoading] = useState(true);
  const [solution, setSolution] = useState('');
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);

  const navigation = useNavigation();
  const {colors} = useTheme();
  const route = useRoute();
  const {orderId} = route.params as RouteParams;

  function handleOrderClosed(){
    if(!solution){
       return Alert.alert('Solicitação', 'Precisa de preencher a solução.');
    }

    firestore()
    .collection<OrderFirestoreDTO>('orders')
    .doc(orderId)
    .update({
      status: 'closed',
      solution,
      closed_at: firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      Alert.alert('Solicitação', 'Solicitação fechada.');
      navigation.goBack();
    })
    .catch((error) => {
      console.log(error);
      Alert.alert('Solicitação', 'Não foi possível fechar a sua solicitação.');
    });
  }

  useEffect(() => {

    const subscriber = firestore()
    .collection<OrderFirestoreDTO>('orders')
    .doc(orderId)
    .get()
    .then((doc) => {
      const {patrimony,
         description,
          status,
           created_at,
            closed_at,
             solution} = doc.data();

      const closed = closed_at ? dateFormat(closed_at) : null;

      setOrder({
        id: doc.id,
        patrimony,
        description,
        status,
        solution,
        when: dateFormat(created_at),
        closed
      });

      setLoading(false);
    });

  }, []);

  if(loading){
    return <Loading />
  }

  return (
    <VStack flex={1}
    bg ="gray.700">
        <Box px={6} bg="gray.600">
          <Header title="Solicitação" />
        </Box>
        <HStack bg="gray.500"
        justifyContent="center"
        p={4}>
          {
            order.status === 'closed'
            ? <CircleWavyCheck size={22} color={colors.green[300]} />
            : <Hourglass size={22} color={colors.secondary[700]} />
          }

          <Text fontSize="sm"
          color={order.status === 'closed' ? colors.green[300] : colors.secondary[700]} 
          ml={2}
          textTransform='uppercase' >
            {order.status === 'closed' ? 'Finalizado' : 'Em aberto'}
          </Text>
        </HStack>
        <ScrollView mx={5}
        showsVerticalScrollIndicator={false}>
          <CardDetails title="equipamento"
          description={`Patrimonio ${order.patrimony}`}
          icon={DesktopTower} />

          <CardDetails title="descrição do problema"
          description={order.description}
          icon={ClipboardText}
          footer={`Registado a ${order.when}`} />

          <CardDetails title="solução"
          icon={CircleWavyCheck}
          description={order.solution}
          footer={order.closed && `Encerrado em ${order.closed}`}>
            {/* <Text color="white">Eu sou um filho</Text> */}
            {
              order.status === 'open' &&
              <Input placeholder="Descrição da solução"
                onChangeText={setSolution}
                h={24}
                textAlignVertical="top"
                multiline={true} />
            }
          </CardDetails>
        </ScrollView>

        {
          order.status === 'open' && 
          <Button title="Encerrar solicitação"
          m={5}
          onPress={handleOrderClosed} />
        }

        {/* <Text color="white" >
          {orderId}
        </Text> */}
    </VStack>
  );
}