import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { RouteComponentProps } from "react-router";
import Background from "../component/Background";
import Button from "../component/Button";
import Header from "../component/Header";
import Logo from "../component/Logo";
import Paragraph from "../component/Paragraph";
import { useParams } from "../router/indexWeb";
import { useStore } from "../stores/store";
import { styles, stylesRegister } from "../style";
interface Props extends RouteComponentProps { }

export const ConfirmationScreen: React.FC<Props> = observer(({ history }) => {

    const { appointmentId } = useParams<{ appointmentId: string }>();
    const { appointmentStore } = useStore();
    const { deleteAppointment, loadAppointment, selectedAppointment: appointment, loadingInitial } = appointmentStore;


    useEffect(() => {
        if (appointmentId) loadAppointment(appointmentId);

    }, [appointmentId, loadAppointment]);


    const event = new Date(appointment!.appointmentDate.slice().slice(0, 15))
    const day = event.getDay();
    var dayheb = '';
    if (day === 0) {
        dayheb = 'ראשון';
    }
    else if (day === 1) {
        dayheb = 'שני'
    }
    else if (day === 2) {
        dayheb = 'שלישי'
    }
    else if (day === 3) {
        dayheb = 'רביעי'
    }
    else if (day === 4) {
        dayheb = 'חמישי'
    }
    else if (day === 5) {
        dayheb = 'שישי'
    }



    if (loadingInitial || !appointment) return <View><Text>Loading</Text></View>;
    return (
        <Background>
            <Logo />
            <Header children={undefined}></Header>
            <Header>{appointment.attendee.displayName}</Header>
            <Header children={undefined}></Header>
            <Image
                source={require("../assets/confirmation.png")}
                style={styles1.buttonImageIconStyle}
            />
            <Header children={undefined}></Header>

            <Text style={stylesRegister.link}>{"   התור נקלט בהצלחה "}</Text>

            <Text style={stylesRegister.link}>{' '}{'  ליום ' + dayheb}  {event.toLocaleDateString('he-IL', {
                day: 'numeric', month: 'short'
            }).replace(/ /g, '-')}</Text>

            <Text style={stylesRegister.link}>{"   בשעה "}{appointment.appointmentDate?.split('').slice(16, 21)}{` ל${appointment.barberName}`}</Text>
            <Header children={undefined}></Header>


            <Button style={styles.button}
                onPress={() => history.push('/')}
            >
                בחזרה לעמוד הראשי
            </Button>




        </Background>
    );





})

const styles1 = StyleSheet.create({
    container: {
        // flex: 1,
        // margin: 10,
        // marginTop: 30,
        // padding: 30,
    },
    buttonGPlusStyle: {
        // flexDirection: 'row',
        // alignItems: 'center',
        // backgroundColor: '#dc4e41',
        // borderWidth: 0.5,
        // borderColor: '#fff',
        // height: 40,
        // borderRadius: 5,
        // margin: 5,
    },
    buttonFacebookStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'black',
        borderWidth: 1,
        borderColor: 'black',
        height: 100,
        borderRadius: 10,
        margin: 10,
    },
    buttonImageIconStyle: {
        padding: 15,
        margin: 15,
        height: 45,
        width: 45,
        resizeMode: 'stretch',
    },
    buttonTextStyle: {
        color: '#fff',
        marginBottom: 8,
        marginRight: 20,
    },
    buttonIconSeparatorStyle: {
        backgroundColor: 'black',
        width: 2,
        height: 80,
    },
});