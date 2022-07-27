import { useState } from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import { VStack, Heading, Icon, useTheme } from 'native-base';

import { Envelope, Key } from 'phosphor-react-native';

import Logo from '../assets/logo_primary.svg';

import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function SignIn(){
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');    

    const { colors } = useTheme(); 

    function handleSignIn(){
        if(!email || !password){
            return Alert.alert('Entrar', 'Informe email e password...');
        }

        setIsLoading(true);

        auth()
        .signInWithEmailAndPassword(email, password)
        // .then(response => {
        //     console.log(response);
        // })
        .catch((error) => {
            Alert.alert('Erro', error.message);
            // console.log(error);
            setIsLoading(false);

            if(error.code === 'auth/invalid-mail' || error.code === 'auth/wrong-password'){
                return Alert.alert('Entrar', 'E-mail ou password inválidos.');
            }
            
            if(error.code === 'auth/user-not-found'){
                return Alert.alert('Entrar', 'Utilizador não registado.');
            }
            
            return Alert.alert('Entrar', 'Não foi possível entrar.');
        });
    }

    return (
        <VStack flex={1}
         alignItems="center"
         bg="gray.600"
         px={8}
         pt={24}>
            <Logo />

            <Heading color="gray.100"
            fontSize="xl"
            mt={20}
            mb={6}>Aceda à sua conta {email}</Heading>

            <Input placeholder="E-mail"
            mb={4}
            InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />}
            onChangeText={setEmail}
             />
            <Input placeholder="Password"
            InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
            secureTextEntry
            mb={8}
            onChangeText={setPassword} />

            <Button title='Entrar'
             w="full"
             onPress={handleSignIn}
             isLoading={isLoading}
              />
        </VStack>
    );
}
