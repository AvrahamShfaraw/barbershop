// import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { RouteComponentProps } from "react-router";
import Background from "../component/Background";
import Button from "../component/Button";
import Header from "../component/Header";
import Logo from "../component/Logo";
import TextInput from "../component/TextInput";
import { UserFormValues } from "../models/user";
import { useStore } from "../stores/store";
import { stylesRegister, styles } from "../style";
// import { RootStackParamList } from "../types";

// type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'הרשמה'>
interface Props extends RouteComponentProps { }


export const RegisterScreen: React.FC<Props> = ({ history }) => {
    const { userStore } = useStore();


    const [displayName, setDisplayName] = useState({ value: '', error: '' });
    const [phoneNumber, setPhoneNumber] = useState({ value: '', error: '' });



    const dispalyNameValidate = (str: string) => {
        if (str === '')
            return 'הזן שם מלא ';

    }
    const phoneValidate = (str: string) => {
        if (str === '')
            return 'הזן מס טלפון';

    }

    const _onSignUpPressed = () => {
        const displayNameError = dispalyNameValidate(displayName.value);
        const phoneError = phoneValidate(phoneNumber.value);




        if (displayNameError || phoneError) {

            setDisplayName({ ...displayName, error: displayNameError! });
            setPhoneNumber({ ...phoneNumber, error: phoneError! });

            return;
        }
        var creds: UserFormValues = {
            userName: 'user' + phoneNumber.value,
            displayName: displayName.value,
            phoneNumber: phoneNumber.value,
            password: 'Pa$$w0rd' + phoneNumber.value
        }

        userStore.register(creds).then(() => history.push('/barberName'));


    }

    return (
        <Background>
            <Logo />
            <Header>הרשמה</Header>

            <TextInput
                label="שם מלא"
                returnKeyType="next"
                style={stylesRegister.input}
                value={displayName.value}
                onChangeText={(text: any) => setDisplayName({ value: text, error: '' })}
                error={!!displayName.error}
                errorText={displayName.error}
                autoComplete={'tel'}
            />
            <TextInput
                label="מס טלפון"
                returnKeyType="next"
                style={stylesRegister.input}
                value={phoneNumber.value}
                onChangeText={(text: any) => setPhoneNumber({ value: text, error: '' })}
                error={!!phoneNumber.error}
                errorText={phoneNumber.error}
                autoComplete={'tel'}
            />

            <Button mode="contained"
                onPress={_onSignUpPressed}
                style={styles.button}>
                הרשם
            </Button>
        </Background >
    );
}
