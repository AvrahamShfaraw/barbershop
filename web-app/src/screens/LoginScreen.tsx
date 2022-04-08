// import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { RouteComponentProps } from "react-router";
import Background from "../component/Background";
import Button from "../component/Button";
import Header from "../component/Header";
import Logo from "../component/Logo";
import TextInput from "../component/TextInput";
import { UserFormValues } from "../models/user";
import { useStore } from "../stores/store";
import { styles, stylesLogin } from "../style";
// import { RootStackParamList } from "../types";
// type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'התחברות'>

interface Props extends RouteComponentProps { }

export const LoginScreen: React.FC<Props> = ({ history }) => {
    const { userStore } = useStore();

    const [phoneNumber, setPhoneNumber] = useState({ value: '', error: '' });


    const phoneNumberValidate = (str: string) => {

        if (str === '')
            return 'הזן מס טלפון';



    }






    const _onSignInPressed = () => {

        const phoneErorr = phoneNumberValidate(phoneNumber.value);

        var creds: UserFormValues = {
            userName: 'user' + phoneNumber.value,
            password: 'Pa$$w0rd' + phoneNumber.value
        }

        if (phoneErorr) {

            setPhoneNumber({ ...phoneNumber, error: phoneErorr! });

            return;
        }

        userStore.login(creds).then(() => history.push('/barberName'))
    };


    return (
        <Background>
            <Logo />
            <Header>התחברות</Header>
            <TextInput

                label="מס טלפון"
                returnKeyType="next"
                style={stylesLogin.input}
                value={phoneNumber.value}
                onChangeText={(text: any) => setPhoneNumber({ value: text, error: '' })}
                error={!!phoneNumber.error}
                errorText={phoneNumber.error}
                autoComplete={'tel'}

            />


            <Button mode="contained"
                onPress={_onSignInPressed}
                style={styles.button}>
                התחבר
            </Button>



        </Background>
    );
}