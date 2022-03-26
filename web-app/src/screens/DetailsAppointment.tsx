import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { RouteComponentProps } from "react-router";
import Background from "../component/Background";
import Button from "../component/Button";
import Header from "../component/Header";
import Paragraph from "../component/Paragraph";
import { useParams } from "../router/indexWeb";
import { useStore } from "../stores/store";
import { styles } from "../style";
interface Props extends RouteComponentProps { }

export const DetailsAppointment: React.FC<Props> = ({ history }) => {

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




            <Header>{appointment.attendee.displayName}</Header>
            <Paragraph>
                <Text style={styles.label}>{appointment.attendee.phoneNumber}</Text>
            </Paragraph>
            <Paragraph>
                <Text style={styles.label}>{event.toLocaleDateString()}</Text>
            </Paragraph>
            <Paragraph>
                <Text style={styles.label}>{appointment.appointmentDate?.split('').slice(16, 21)}</Text>
            </Paragraph>

            <Paragraph>
                <Text style={styles.label}>יום  {dayheb}</Text>
            </Paragraph>
            <Button mode="contained" onPress={() => history.push('/Profile')}>
                אישור
            </Button>
            <Button
                mode="outlined"
                onPress={() => deleteAppointment(appointment.appointmentDate).then(() => history.goBack())}
            >
                ביטול
            </Button>




        </Background>
    );





}