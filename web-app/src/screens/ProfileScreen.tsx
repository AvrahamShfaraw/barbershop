import React, { useEffect, useState } from "react";
import { FlatList, Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import agent from "../api/agent";
import Background from "../component/Background";
import Button from "../component/Button";
import Header from "../component/Header";
import { useStore } from "../stores/store";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { RootStackParamList } from "../types";



import {
    subDays,
    addDays,
    isBefore,
} from 'date-fns';
import { styles, stylesRegister } from "../style";
import { utcToZonedTime } from "date-fns-tz";
import Logo from "../component/Logo";
import { RouteComponentProps } from "react-router";
import { useParams } from "../router/indexWeb";
import BackButton from "../component/BackButton";



// type DashboardScreenProps = NativeStackScreenProps<RootStackParamList, 'תורים'>
interface Props extends RouteComponentProps { }

export const ProfileScreen: React.FC<Props> = ({ history }) => {

    const [schedule, setSchedule] = React.useState<any>([]);
    const [date, setDate] = React.useState(new Date());
    const { userStore } = useStore();
    const [loading, setLoading] = React.useState(false);
    const { username } = useParams<{ username: string }>();
    const { user } = userStore;
    const { appointmentStore } = useStore();
    const [countW, setCountWaitings] = useState(0);
    const [countA, setCountAvailable] = useState(0);










    useEffect(() => {


        async function loadUserAppointment() {

            const response = agent.Appointments.list();
            const response2 = agent.Waitings.list();
            const waitings = (await response2).map((waiting) => {
                if (waiting.barberName === user?.displayName && new Date(waiting.date).getDate() === date.getDate()) {
                    return waiting;
                }
            })

            const countWaitings = waitings.filter(a => typeof a !== 'undefined');
            if (countWaitings.length > 0) {
                setCountWaitings(countWaitings.length);
            } else {
                setCountWaitings(0);
            }


            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            const data = (await response).map((appointment) => {
                if (user?.userName === username && appointment.barberName === user.displayName) {

                    const checkDate = Date.parse(appointment.appointmentDate)
                    const compareDate = utcToZonedTime(checkDate, timezone);
                    const past = isBefore(compareDate, new Date());
                    console.log(past);
                    if (!past) {
                        return {
                            appointmentId: appointment.appointmentId,
                            displayName: appointment.attendee.displayName,
                            date: appointment.appointmentDate.split('T').join().slice(0, 21),
                            phoneNumber: appointment.attendee.phoneNumber,
                            past: past,


                        }
                    }



                }

            }


            )

            const userAppointment = data.filter(item => typeof item !== 'undefined' && (new Date(item.date).getDate() === date.getDate()));
            const sortedAsc = userAppointment.sort(
                (objA, objB) => new Date(objA!.date).getTime() - new Date(objB!.date).getTime());
            // const unique = sortedAsc.map(item => item?.date)
            //     .filter((value, index, self) =>
            //         self.indexOf(value) === index);
            // console.log(unique);

            const uniqueIds: (string | undefined)[] = [];

            const unique = sortedAsc.filter(element => {
                const isDuplicate = uniqueIds.includes(element?.date);

                if (!isDuplicate) {
                    uniqueIds.push(element?.date);

                    return true;
                }

                return false;
            });
            if (unique.length > 0) {



                setSchedule(unique)
            } else {
                setSchedule(null);

            }


        }

        loadUserAppointment();


    }, [date])



    function handlePrevDay() {

        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const checkDate = date
        const compareDate = utcToZonedTime(checkDate, timezone);

        const past = isBefore(compareDate, new Date())


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






    // //format(date, 'EEEE d MMM y')
    return (
        <Background>
            <BackButton goBack={() => history.push('/')} />
            <Logo />
            <Header >{user?.displayName}</Header>
            <Header>התורים שלך</Header>
            <Header children={undefined}></Header>
            {

                <View >
                    <Text style={{ color: 'white', fontSize: 25 }}>
                        <TouchableOpacity onPress={handlePrevDay}>
                            {date.getDay() === new Date().getDay() ? (<Text>{''}</Text>) : (
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


            }
            {

                !schedule ? (
                    <View>
                        <Text style={stylesRegister.link}>עדייו לא נקבע תור למועד זה</Text>
                    </View>
                ) :
                    (

                        <FlatList
                            style={{
                                height: 250,
                                flexGrow: 0
                            }}
                            data={schedule}
                            renderItem={({ item }) =>
                                <ScrollView style={{
                                    flex: 2,

                                    margin: 2,
                                }} >

                                    {(
                                        <>
                                            <Button onPress={() => Linking.openURL(`https://wa.me/972${item.phoneNumber}`)}>
                                                <div className="event_item" key={item.appointmentId}>
                                                    <div className="ei_Title">
                                                        {item.date.split('T').join().slice(16, 21) + ' ' + item.displayName}
                                                    </div>
                                                </div>
                                            </Button></>

                                    )}
                                </ScrollView>}
                            scrollEnabled={true}

                        />
                    )

            }
            <TouchableOpacity

                onPress={() => history.push(`/waiting/${user?.userName}`)}
            >
                <Text style={{ color: 'white', fontSize: 14, }}>רשימת ממתינים <Text style={{ color: 'red', fontSize: 14, }}>{" " + countW}</Text></Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => history.push(`/ProfileDashboard/${username}`)}
            >
                <Text style={{ color: 'white', fontSize: 14, }}>תורים זמינים ברגע זה</Text>
            </TouchableOpacity>

        </Background >
    )
}







