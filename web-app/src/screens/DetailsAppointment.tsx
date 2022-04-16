import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { RouteComponentProps } from "react-router";
import Background from "../component/Background";
import Button from "../component/Button";
import Header from "../component/Header";
import Logo from "../component/Logo";
import { useParams } from "../router/indexWeb";
import { useStore } from "../stores/store";
import { stylesRegister } from "../style";
interface Props extends RouteComponentProps { }

export const DetailsAppointment: React.FC<Props> = observer(({ history }) => {

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
            <Header>פרטי תור</Header>
            <Header children={undefined}></Header>

            <Header children={undefined}></Header>
            <Header>{appointment.attendee.displayName}</Header>

            <Text style={stylesRegister.link}>{"   בחרת להסתפר אצל "}{appointment.barberName}</Text>

            <Text style={stylesRegister.link}>{' '}{'  יום ' + dayheb}  {event.toLocaleDateString('he-IL', {
                day: 'numeric', month: 'short'
            }).replace(/ /g, '-')}</Text>

            <Text style={stylesRegister.link}>{"   שעה "}{appointment.appointmentDate?.split('').slice(16, 21)}</Text>
            <Text style={stylesRegister.link}>{'   שימו לב!! '}</Text>
            <Text style={stylesRegister.link}>{'   על מנת שהתור יתווסף בחרו באישור '}</Text>
            <Text style={stylesRegister.link}>{'   אחרת בחרו ביטול '}</Text>

            <Button mode="contained" onPress={() => history.push(`/Confirmation/${appointment.appointmentId}`)}>
                אישור
            </Button>
            <Button
                mode="outlined"
                onPress={() => deleteAppointment(appointmentId).then(() => history.goBack())}
            >
                ביטול
            </Button>




        </Background>
    );





})