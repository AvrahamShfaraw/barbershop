// import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { RouteComponentProps } from "react-router";
import BackButton from "../component/BackButton";
import Background from "../component/Background";
import Button from "../component/Button";
import Header from "../component/Header";
import Logo from "../component/Logo";
import TextInput from "../component/TextInput";
import { UserFormValues } from "../models/user";
import { useStore } from "../stores/store";
import { stylesRegister, styles } from "../style";
import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

interface Props extends RouteComponentProps { }


export const RegisterScreen: React.FC<Props> = ({ history }) => {
    const { userStore } = useStore();


    const [displayName, setDisplayName] = useState({ value: '', error: '' });
    const [phoneNumber, setPhoneNumber] = useState({ value: '', error: '' });
    const [error, setSetErrort] = useState('');

    const isSalamon = (name: string) => {
        if (name === 'user0522540642') return true;
        else return false;
        ;
    }

    const isYoda = (name: string) => {
        if (name === 'user0527701195') return true;
        else return false;
        ;
    }



    const dispalyNameValidate = (str: string) => {
        if (str === '' || str.length <= 4) {
            return 'הזן שם מלא ';
        } else {
            for (let i = 0; i < str.length; i++) {
                if (str[i] >= '0' && str[i] <= '9') {
                    return 'שדה זה הינו שם מלא בלבד'
                }
            }
        }


    }



    const phoneValidate = (str: string) => {
        if (str === '') {
            return 'שדה ריק הזן מס טלפון';
        } else if (str.length != 10) {
            return 'הזן מס טלפון תקין 10 ספרות'
        }

        for (let i = 0; i < str.length; i++) {
            if (!(str[i] >= '0' && str[i] <= '9')) {
                return 'שדה זה מחייב מספרים בלבד  '
            }
            else if (!(str[0] === '0' && str[1] === '5')) {
                return 'מס נייד לא תקין חובה להתחיל ב 05'
            }
        }

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

        userStore.register(creds).catch(erorr => setSetErrort(erorr.response.data)).then(() => {
            if (isSalamon(creds.userName!)) {
                history.push(`/profile/${creds.userName}`)

            } else if (isYoda(creds.userName!)) {
                history.push(`/profile/${creds.userName}`)
            }
            else history.push('/barberName');


        });


    }

    return (
        <Background>
            <TouchableOpacity
                style={styles2.container}
                onPress={() => history.goBack()}
            >
                <Image style={styles2.image} source={require('../assets/2454563.png')} />
            </TouchableOpacity>
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
            <Text style={styles.label}>{error ? error : ''}</Text>

            <Button mode="contained"
                onPress={_onSignUpPressed}
                style={styles.button}>
                הרשם
            </Button>
        </Background >
    );
}


const styles2 = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 10 + getStatusBarHeight(),
        left: -24,
    },
    image: {
        width: 50,
        height: 40,
    },
});