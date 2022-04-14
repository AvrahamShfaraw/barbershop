// import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import agent from "../api/agent";
import Background from "../component/Background";
import Button from "../component/Button";
import Logo from "../component/Logo";
import { useStore } from "../stores/store";
// import { RootStackParamList } from "../types";
import {
    addDays,
    isBefore, subDays
} from 'date-fns';
import { utcToZonedTime } from "date-fns-tz";
import { RouteComponentProps } from "react-router";
import Header from "../component/Header";
import { useParams } from "../router/indexWeb";

import { styles } from "../style";
import el from "date-fns/esm/locale/el/index.js";
import { observer } from "mobx-react-lite";

// type ProfileScreen = NativeStackScreenProps<RootStackParamList, 'פרופיל'>
interface Props extends RouteComponentProps { }
export const ProfileScreen: React.FC<Props> = observer(({ history }) => {
    const [schedule, setSchedule] = React.useState<any>([]);
    const [date, setDate] = useState(new Date());
    const [isPass, setIsPass] = React.useState(true);
    const { userStore, appointmentStore } = useStore()
    const { user } = userStore;
    const { deleteAppointment } = appointmentStore;

    const { username } = useParams<{ username: string }>();


    function handlePrevDay() {

        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const checkDate = date;
        const compareDate = utcToZonedTime(checkDate, timezone);

        const past = isBefore(compareDate, new Date())
        setIsPass(past);

        if (!past && date.getDay() !== 6) {
            if (date.getDay() === 0) {
                setDate(subDays(date, 2));

            } else {
                setDate(subDays(date, 1));
            }

        }
    }

    function handleNextDay() {
        if (date.getDay() === 5) {
            setDate(addDays(date, 2));
        } else {
            setDate(addDays(date, 1));
        }

    }
    const day = date.getDay();

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
    else {
        dayheb = 'שבת'
    }



    useEffect(() => {

        async function loadUserAppointment() {
            const response = await agent.Appointments.list();

            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            const data = response.map((appointment) => {
                if (user?.userName === username && appointment.barberName === user.displayName) {

                    const checkDate = Date.parse(appointment.appointmentDate)
                    const compareDate = utcToZonedTime(checkDate, timezone);
                    const past = isBefore(compareDate, new Date());
                    setIsPass(past);
                    console.log(past);
                    if (!past) {
                        return {
                            appointmentId: appointment.appointmentId,
                            displayName: appointment.attendee.displayName,
                            date: appointment.appointmentDate.split('T').join().slice(0, 21),
                            past: past,


                        }
                    } else {
                        deleteAppointment(appointment.appointmentDate);

                    }


                }

            }


            )

            const userAppointment = data.filter(item => typeof item !== 'undefined' && (new Date(item.date).getDate() === date.getDate()));
            if (userAppointment.length > 0) {
                if (date.getDay() === new Date().getDay()) setIsPass(true);
                else {
                    setIsPass(false);
                }
                const sortedAsc = userAppointment.sort(
                    (objA, objB) => new Date(objA!.date).getTime() - new Date(objB!.date).getTime());
                setSchedule(sortedAsc)
                console.log(userAppointment);
            } else {
                setSchedule(null);
            }


        }

        loadUserAppointment();


    }, [date])

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
            <Header>{user?.displayName}</Header>
            <Header children={undefined}></Header>
            {
                !isPass ? (
                    <View >
                        <Text style={{ color: 'white', fontSize: 25 }}>
                            <TouchableOpacity onPress={handlePrevDay}>
                                {isPass ? (<Text>{''}</Text>) : (
                                    <Text style={{ color: 'red', fontSize: 20 }} >{'אחורה'}</Text>)}
                            </TouchableOpacity>
                            {'  יום ' + dayheb}  {date.toLocaleDateString('he-IL', {
                                day: 'numeric', month: 'short'
                            }).replace(/ /g, '-')}
                            <TouchableOpacity onPress={handleNextDay}>
                                <Text style={{ color: 'red', fontSize: 20 }} > {' הבא'}</Text>
                            </TouchableOpacity>
                        </Text>
                        <Header children={undefined}></Header>
                    </View>
                ) : (
                    <View >
                        <Text style={{ color: 'white', fontSize: 25 }}>
                            <TouchableOpacity onPress={handlePrevDay}>
                                {isPass ? (<Text>{''}</Text>) : (
                                    <Text style={{ color: 'balck', fontSize: 20 }} >{'אחורה'}</Text>)}
                            </TouchableOpacity>
                            {' '}{'  יום ' + dayheb}  {date.toLocaleDateString('he-IL', {
                                day: 'numeric', month: 'short'
                            }).replace(/ /g, '-')}
                            <TouchableOpacity onPress={handleNextDay}>
                                <Text style={{ color: 'red', fontSize: 20 }} > {' הבא'}</Text>
                            </TouchableOpacity>
                        </Text>
                        <Header children={undefined}></Header>
                    </View>

                )
            }
            {
                schedule ? (
                    <FlatList
                        data={schedule}
                        renderItem={({ item }) =>
                            <ScrollView >

                                {
                                    (
                                        <Button onPress={() => history.push(`/DetailsAppointments/${item.appointmentId}`)} >
                                            <div className="event_item" key={item.appointmentId}>
                                                <div className="ei_Title">{new Date(item.date).toLocaleDateString('he-IL', {
                                                    day: 'numeric', month: 'short'
                                                }).replace(/ /g, '-').toString() + ' יום ' + func(new Date(item.date).getDay())}
                                                    {' ' + item.date.split('T').join().slice(16, 21) + ' ' + item.displayName}
                                                </div>
                                            </div>
                                        </Button>

                                    )

                                }

                            </ScrollView>}

                    />

                ) : (
                    (
                        <View>
                            <Text style={styles.label}>אין תורים ביום זה</Text>
                        </View>
                    )
                )

            }
            <Button
                mode="outlined"
                onPress={() => history.push('/')}
            >
                בחזרה לעמוד הראשי
            </Button>
        </Background>
    )
})
