import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Text } from "react-native";
import { RouteComponentProps } from "react-router-dom";
import Background from "../component/Background";
import Button from "../component/Button";
import Header from "../component/Header";
import Logo from "../component/Logo";
import { useStore } from "../stores/store";
import { useParams } from "../router/indexWeb";
import { styles } from "../style";

interface Props extends RouteComponentProps { }
export const DeleteScreen: React.FC<Props> = observer(({ history }) => {

    const { appointmentId } = useParams<{ appointmentId: string }>();
    const { appointmentStore } = useStore();
    const { deleteAppointment, loadAppointment } = appointmentStore;

    useEffect(() => {
        if (appointmentId) loadAppointment(appointmentId);

    }, [appointmentId, loadAppointment]);

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
