// import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { isBefore } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { RouteComponentProps } from "react-router";
import agent from "../api/agent";
import BackButton from "../component/BackButton";
import Background from "../component/Background";
import Button from "../component/Button";
import Header from "../component/Header";
import Logo from "../component/Logo";
import TextInput from "../component/TextInput";
import { UserFormValues } from "../models/user";
import { useStore } from "../stores/store";
import { styles, stylesLogin } from "../style";
import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
// import { RootStackParamList } from "../types";
// type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'התחברות'>

interface Props extends RouteComponentProps { }

export const LoginScreen: React.FC<Props> = observer(({ history }) => {
    const { userStore } = useStore();
    const [check, setCheck] = useState(false);
    const [erorr, setErorrs] = useState('');

    const [phoneNumber, setPhoneNumber] = useState({ value: '', error: '' });


    const phoneNumberValidate = (str: string) => {
        if (str === '')
            return 'הזן מס טלפון';
    }




    async function haveAnAppointment() {

        const response = await agent.Appointments.list();
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        const userAppointment = response.map((appointment) => {
            if (appointment.attendee.userName === userStore.user?.userName) {
                const checkDate = Date.parse(appointment.appointmentDate)
                const compareDate = utcToZonedTime(checkDate, timezone);
                const past = isBefore(compareDate, new Date());
                if (!past)
                    return {
                        appointmentDate: appointment.appointmentDate
                    };







            }
        });

        userAppointment.filter((item: any) => typeof item!.appointmentDate !== 'undefined');

        if (userAppointment.length) setCheck(false); else setCheck(true);
        console.log(check);




    }

    const isSalamon = (name: string) => {
        if (name === 'user0520000999') return true;
        else return false;
        ;
    }

    const isYoda = (name: string) => {
        if (name === 'user0520000888') return true;
        else return false;
        ;
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

        userStore.login(creds).then(() => {
            haveAnAppointment();
            if (isSalamon(creds.userName!)) {
                history.push(`/profile/${creds.userName}`)
            } else if (isYoda(creds.userName!)) {
                history.push(`/profile/${creds.userName}`)
            } else if (check) {

                history.push('/barberName')
            } else {
                history.push('/')
            }





        }).catch(error => setErorrs(error.response.data));
    };



    return (
        <Background>
            <TouchableOpacity
                style={styles2.container}
                onPress={() => history.goBack()}
            >
                <Image style={styles2.image} source={require('../assets/2454563.png')} />
            </TouchableOpacity>
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

            <Text style={styles.label}>{erorr ? erorr : ''}</Text>
            <Button mode="contained"
                onPress={_onSignInPressed}
                style={styles.button}>
                התחבר
            </Button>
        </Background>
    );
})

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