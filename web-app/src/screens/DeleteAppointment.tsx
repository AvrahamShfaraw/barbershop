import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Text } from "react-native";
import { RouteComponentProps } from "react-router-dom";
import Background from "../component/Background";
import Button from "../component/Button";
import Header from "../component/Header";
import Logo from "../component/Logo";
import Paragraph from "../component/Paragraph";
import { useStore } from "../stores/store";
import { useParams } from "../router/indexWeb";
import { styles } from "../style";

interface Props extends RouteComponentProps { }
export const DeleteScreen: React.FC<Props> = observer(({ history }) => {

    const { appointmentId } = useParams<{ appointmentId: string }>();
    const { appointmentStore } = useStore();
    const { deleteAppointment, loadAppointment, selectedAppointment: appointment, loadingInitial } = appointmentStore;

    useEffect(() => {
        if (appointmentId) loadAppointment(appointmentId);

    }, [appointmentId, loadAppointment]);

    const func = (number: number) => {
        var dayheb = '';
        if (number === 0) {
            return dayheb = 'ראשון';
        }
        else if (number === 1) {
            return dayheb = 'שני'
        }
        else if (number === 2) {
            return dayheb = 'שלישי'
        }
        else if (number === 3) {
            return dayheb = 'רביעי'
        }
        else if (number === 4) {
            return dayheb = 'חמישי'
        }
        else if (number === 5) {
            return dayheb = 'שישי'
        }
        else {
            return dayheb = 'שבת'
        }

    }
    return (
        <Background>
            <Logo />

            <Header>ביטול תור</Header>
            <Header children={undefined}></Header>
            <Header children={undefined}></Header>



            <Button mode="contained" onPress={() => deleteAppointment(appointmentId).then(() => history.push('/'))}>
                אישור
            </Button>
            <Button
                mode="outlined"
                onPress={() => history.goBack()}
            >
                ביטול
            </Button>
        </Background>
    )
})
