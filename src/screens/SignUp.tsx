// import React, {useState} from 'react';
// import {zodResolver} from '@hookform/resolvers/zod';
// import auth from '@react-native-firebase/auth';
// import {Box, Icon, KeyboardAvoidingView, useTheme, VStack} from 'native-base';
// import { Envelope, Key } from 'phosphor-react-native';
// import {useForm} from 'react-hook-form';
// import {Alert, Keyboard, TouchableWithoutFeedback} from 'react-native';
// import * as zod from 'zod';
// import Logo from '../assets/logo_primary.svg';
// import { Button } from '../components/Button';
// import { Input } from '../components/Input';
// import { Header } from '../components/Header';

// const signUpValidationSchema = zod
//     .object({
//         email: zod
//             .string({
//                 required_error: 'O e-mail é obrigatório'
//             })
//             .email(
//                 'Escreva um e-mail válido'
//             ),
//             password: zod.string({
//                 required_error: 'A password é obrigatória'
//             }),
//             passwordConfirmation: zod.string().optional()

//     })
//     .refine(data => data.passwordConfirmation === data.password, {
//         message: 'As passwords têm de coincidir',
//         path: ['passwordConfirmation']
//     });

// type SignUpFormData = zod.infer<typeof signUpValidationSchema>;

// export const SignUp: React.FC = () => {
//     const {colors} = useTheme();
//     const [loading, setLoading] = useState(false);
//     const {
//         handleSubmit,
//         control,
//         formState: { errors },
//     } = useForm<SignUpFormData>({
//         resolver: zodResolver(signUpValidationSchema)
//     });

//     async function handleSignUp({email, password}: SignUpFormData){
//         setLoading(true);

//         try {
//             await auth().createUserWithEmailAndPassword(email, password);
//         } catch (error) {
//             console.warn(error);
//             setLoading(false);
//             Alert.alert('Registo', 'Não foi possível criar a sua conta.');
//         }

//     }

//     return (
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//             <Box bg="gray.600"
//             flex={1}>
//                 <KeyboardAvoidingView behavior="position" enabled>
//                     <VStack alignItems="center" 
//                     px={8}
//                     pt={24}>
//                         <Logo />

//                         <Header title="Registar Conta" />

//                         <Input placeholder="Email"
//                         keyboardType="email-address"
//                         mb={4}
//                         InputLeftElement={
//                             <Icon ml={4}
//                             as={<Envelope color={colors.gray[300]} />} />
//                         }
//                         // name="email"
//                         // control={control}
//                         // error={errors.email?.message} 
//                         />
//                     </VStack>
//                 </KeyboardAvoidingView>
//             </Box>
//         </TouchableWithoutFeedback>
//     );

// }


