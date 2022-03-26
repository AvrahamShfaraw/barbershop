// import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { FlatList, ScrollView } from "react-native";
import agent from "../api/agent";
import Background from "../component/Background";
import Button from "../component/Button";
import Logo from "../component/Logo";
import { useStore } from "../stores/store";
// import { RootStackParamList } from "../types";
import {
    isBefore
} from 'date-fns';
import { utcToZonedTime } from "date-fns-tz";
import { RouteComponentProps } from "react-router";

// type ProfileScreen = NativeStackScreenProps<RootStackParamList, 'פרופיל'>
interface Props extends RouteComponentProps { }
export const ProfileScreen: React.FC<Props> = ({ history }) => {
    const [schedule, setSchedule] = React.useState<any>([]);
    const [isPass, setIsPass] = React.useState(false);
    const { userStore } = useStore()
    const { user } = userStore;

    useEffect(() => {

        async function loadUserAppointment() {
            const response = await agent.Appointments.list();
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            const data = response.map((appointment) => {

                const checkDate = Date.parse(appointment.appointmentDate)
                const compareDate = utcToZonedTime(checkDate, timezone);
                const past = isBefore(compareDate, new Date());
                setIsPass(past)
                if (!past)
                    return {
                        id: appointment.appointmentId,
                        userName: appointment.attendee.userName,
                        date: appointment.appointmentDate.split('T').join().slice(0, 21),
                        past: past,


                    }


            }


            )

            const userAppointment = data.filter(item => typeof item !== 'undefined' && item.userName === user?.userName);
            if (userAppointment.length > 0) {
                console.log(isPass);

                setSchedule(userAppointment)
                console.log(userAppointment);
            } else {
                setSchedule(null);
            }



        }

        loadUserAppointment();


    }, [])

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
            <FlatList
                data={schedule}
                renderItem={({ item }) =>
                    <ScrollView >

                        {
                            (
                                <Button onPress={() => history.goBack()} >
                                    <div className="event_item" key={item.id}>
                                        <div className="ei_Title">{new Date(item.date).toLocaleDateString('he-IL', {
                                            day: 'numeric', month: 'short'
                                        }).replace(/ /g, '-').toString() + ' יום ' + func(new Date(item.date).getDay())}
                                            {' ' + item.date.split('T').join().slice(16, 21)}
                                        </div>
                                    </div>
                                </Button>

                            )

                        }

                    </ScrollView>}

            />
            <Button
                mode="outlined"
                onPress={() => history.push('/appointments')}
            >
                הוספת תור חדש
            </Button>
        </Background>
    )
}
