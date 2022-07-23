import React, { useEffect, useState } from "react";
import { FlatList, Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import agent from "../api/agent";
import Background from "../component/Background";
import Button from "../component/Button";
import Header from "../component/Header";
import { AppointmentFormValues } from "../models/appointment";
import { useStore } from "../stores/store";
import uuid from 'react-native-uuid';
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
import { observer } from "mobx-react-lite";
import { WaitingFormValues } from "../models/waiting";
import { User } from "../models/user";
import { userInfo } from "os";
import BackButton from "../component/BackButton";



// type DashboardScreenProps = NativeStackScreenProps<RootStackParamList, 'תורים'>
interface Props extends RouteComponentProps { }

export const Dashboard: React.FC<Props> = observer(({ history }) => {

    const [schedule, setSchedule] = React.useState<any>([]);
    const [date, setDate] = React.useState(new Date());
    const { appointmentStore, waitingStore, userStore } = useStore();
    const { createAppointment, updateAppointment } = appointmentStore;
    const { createWaiting, deleteWating } = waitingStore;
    const { user } = userStore;
    const [loading, setLoading] = React.useState(false);
    const { item } = useParams<{ item: string }>();
    const [Waiting, setWaittng] = useState<any>([]);
    const [isWaiting, setIsWaittng] = useState(false);
    const [counter, setCounter] = useState(0);


    const handleNextClick = (num: number) => {
        setCounter(counter + num);
    }
    const handlePrevClick = (num: number) => {
        setCounter(counter - num);
    }
    const range12 = ['10:00', '10:20', '10:40', '11:00',
        '11:20', '11:40', '12:00', '12:20', '12:40',
        '13:00', '13:20', '13:40', '14:00', '14:20',
        '14:40', '15:00', '15:20', '15:40', '16:00', '16:20'
        , '16:40', '17:00', '17:20', '17:40', '18:00', '18:20',
        '18:40', '19:00', '19:20'];

    const range34 = ['10:00', '10:20', '10:40', '11:00',
        '11:20', '11:40', '12:00', '12:20', '12:40',
        '13:00', '13:20', '13:40', '14:00', '14:20',
        '14:40', '15:00', '15:20', '15:40', '16:00', '16:20'
        , '16:40', '17:00', '17:20', '17:40', '18:00', '18:20',
        '18:40', '19:00', '19:20', '19:40'];
    const range5 = ['10:00', '10:20', '10:40', '11:00',
        '11:20', '11:40', '12:00', '12:20', '12:40',
        '13:00', '13:20', '13:40', '14:00', '14:20',
        '14:40', '15:00', '15:20', '15:40', '16:00', '16:20'
        , '16:40', '17:00', '17:20', '17:40', '18:00', '18:20',
        '18:40', '19:00', '19:20', '19:40', '20:00', '20:20', '20:40', '21:00', '21:20', '21:40'];;



    const range6 = ['10:00', '10:20', '10:40', '11:00',
        '11:20', '11:40', '12:00', '12:20', '12:40',
        '13:00', '13:20', '13:40', '14:00', '14:20',
        '14:40', '15:00', '15:20', '15:40', '16:00', '16:20'];


    async function handleDeleteWating() {
        const response2 = await agent.Waitings.list();
        const waiting = response2.map((a) => {
            if (a.userName === user?.userName && new Date(a.date).getDate() === date.getDate()) {
                deleteWating(a.id);
            }
        });
    }

    const handleDateClick = (e: any) => {
        let newAppointment: AppointmentFormValues = {
            appointmentDate: e,
            barberName: item

        };
        handleFormSubmit(newAppointment)
    }

    const handleWaitingClick = () => {
        let newWaiting: WaitingFormValues = {
            userName: user?.userName,
            displayName: user?.displayName,
            phoneNumber: user?.phoneNumber,
            barberName: item,
            date: date.toString().split('T').join().slice(0, 16)
        }
        handleWaitingFormClick(newWaiting)
    }

    const handleWaitingFormClick = (waiting: WaitingFormValues) => {
        if (!waiting.id) {
            let newWaiting = {
                ...waiting,
                id: uuid.v4().toString(),
            };
            createWaiting(newWaiting).then(() => setIsWaittng(true))
        }


    }

    function handleFormSubmit(appointment: AppointmentFormValues) {
        if (!appointment.appointmentId) {
            let newAppointment = {
                ...appointment,
                appointmentId: uuid.v4().toString(),
            };
            createAppointment(newAppointment).then(() => history.push(`/DetailsAppointments/${newAppointment.appointmentId}`));

        } else {
            updateAppointment(appointment).then(() => history.push(`/DetailsAppointments/${appointment.appointmentId}`))
        }
    }

    useEffect(() => {

        async function loadAvailableAppointment() {
            const response = await agent.Appointments.list();
            const response2 = await agent.Waitings.list();

            const waiting = response2.map((a) => {
                if (a.userName === user?.userName && a.barberName === item && new Date(a.date).getDate() === date.getDate()) {
                    return a;
                }
            }
            );

            const data = waiting.filter(a => typeof a !== 'undefined');
            if (data.length > 0) {
                setWaittng(data);
                setIsWaittng(true);
            } else {

                setWaittng(null);
                setIsWaittng(false)
            }



            const appointments = response.map((a) => {

                return {
                    appointmentDate: a.appointmentDate.split('T').join().slice(0, 24),
                    barberName: a.barberName
                }
            });

            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            if (date.getDay() !== 6 && date.getDay() === 4) {

                const data = range5.map((hour, i) => {
                    const checkDate = Date.parse(date.toString().split('T').join().slice(0, 16) + hour + ':00');
                    const compareDate = utcToZonedTime(checkDate, timezone);

                    var check = date.toString().split('T').join().slice(0, 16) + hour + ':00';
                    const availbale = appointments.find((x) => x.appointmentDate === check && x.barberName === item) ? false : true;
                    const past = isBefore(compareDate, new Date())



                    if (availbale && !past) {
                        return {
                            key: i,
                            time: `${hour}`,
                            day: date.getDay(),
                            availbale: availbale,
                            past: isBefore(compareDate, new Date()),
                            appointmentDate: check,
                            x: appointments.find((x) => x.appointmentDate === check)
                        };

                    }


                });
                const newdata = data.filter((item) => typeof item !== 'undefined');


                if (newdata.length > 0) {
                    setSchedule(newdata);
                    console.log(date.getDate());
                    console.log(counter);

                } else {
                    setSchedule(null);
                }


            } else if (date.getDay() === 5) {
                const data = range6.map((hour, i) => {
                    const checkDate = Date.parse(date.toString().split('T').join().slice(0, 16) + hour + ':00');
                    const compareDate = utcToZonedTime(checkDate, timezone);

                    var check = date.toString().split('T').join().slice(0, 16) + hour + ':00';
                    const availbale = appointments.find((x) => x.appointmentDate === check && x.barberName === item) ? false : true;
                    const past = isBefore(compareDate, new Date())



                    if (availbale && !past) {
                        return {
                            key: i,
                            time: `${hour}`,
                            day: date.getDay(),
                            availbale: availbale,
                            past: isBefore(compareDate, new Date()),
                            appointmentDate: check,
                            x: appointments.find((x) => x.appointmentDate === check)
                        };

                    }


                });
                const newdata = data.filter((item) => typeof item !== 'undefined');


                if (newdata.length > 0) {
                    setSchedule(newdata);
                    console.log(counter);

                } else {
                    setSchedule(null);
                }
            } else if (date.getDay() === 2 || date.getDay() === 3) {
                const data = range34.map((hour, i) => {
                    const checkDate = Date.parse(date.toString().split('T').join().slice(0, 16) + hour + ':00');
                    const compareDate = utcToZonedTime(checkDate, timezone);

                    var check = date.toString().split('T').join().slice(0, 16) + hour + ':00';
                    const availbale = appointments.find((x) => x.appointmentDate === check && x.barberName === item) ? false : true;
                    const past = isBefore(compareDate, new Date());


                    if (availbale && !past) {
                        return {
                            key: i,
                            time: `${hour}`,
                            day: date.getDay(),
                            availbale: availbale,
                            past: isBefore(compareDate, new Date()),
                            appointmentDate: check,
                            x: appointments.find((x) => x.appointmentDate === check)
                        };

                    }


                });
                const newdata = data.filter((item) => typeof item !== 'undefined');


                if (newdata.length > 0) {
                    setSchedule(newdata);
                    console.log(counter);


                } else {
                    setSchedule(null);
                }
            } else if (date.getDay() === 0 || date.getDay() === 1) {
                const data = range12.map((hour, i) => {
                    const checkDate = Date.parse(date.toString().split('T').join().slice(0, 16) + hour + ':00');
                    const compareDate = utcToZonedTime(checkDate, timezone);

                    var check = date.toString().split('T').join().slice(0, 16) + hour + ':00';
                    const availbale = appointments.find((x) => x.appointmentDate === check && x.barberName === item) ? false : true;
                    const past = isBefore(compareDate, new Date());


                    if (availbale && !past) {
                        return {
                            key: i,
                            time: `${hour}`,
                            day: date.getDay(),
                            availbale: availbale,
                            past: isBefore(compareDate, new Date()),
                            appointmentDate: check,
                            x: appointments.find((x) => x.appointmentDate === check)
                        };

                    }


                });
                const newdata = data.filter((item) => typeof item !== 'undefined');


                if (newdata.length > 0) {
                    setSchedule(newdata);
                    console.log(counter);


                } else {
                    setSchedule(null);
                }
            } else {

                const data = null;
                setSchedule(data);


            }
        }

        loadAvailableAppointment();
        setLoading(true);
    }, [date]);



    function handlePrevDay() {

        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const checkDate = date
        const compareDate = utcToZonedTime(checkDate, timezone);

        const past = isBefore(compareDate, new Date());

        if (!past && date.getDay() !== 6) {
            if (date.getDay() === 0) {
                setDate(subDays(date, 2));
                handlePrevClick(2);

            } else {
                setDate(subDays(date, 1));
                handlePrevClick(1);


            }

        }
    }

    function handleNextDay() {
        if (date.getDay() === 5) {
            setDate(addDays(date, 2));
            handleNextClick(2);
        } else {
            setDate(addDays(date, 1));
            handleNextClick(1);

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



    if (!schedule && !loading) return <Header>loading</Header>


    // //format(date, 'EEEE d MMM y')
    return (
        <Background>
            <BackButton goBack={() => history.goBack()} />
            <Logo />
            <Header>בחר תור</Header>
            <Header children={undefined}></Header>
            <Header children={undefined}></Header>
            {



                <View >
                    <Text style={{ color: 'white', fontSize: 25 }}>
                        <TouchableOpacity onPress={handlePrevDay}>
                            {date.getDate() === new Date().getDate() ? (<Text>{''}</Text>) : (
                                <Text style={{ color: 'red', fontSize: 20 }} >{'אחורה'}</Text>)}
                        </TouchableOpacity>
                        {'  יום ' + dayheb}  {date.toLocaleDateString('he-IL', {
                            day: 'numeric', month: 'short'
                        }).replace(/ /g, '-')}{'  '}
                        <TouchableOpacity onPress={handleNextDay}>
                            {counter < 14 ? (<Text style={{ color: 'red', fontSize: 20 }} >{'קדימה'}</Text>) : (<Text style={{ color: 'blue', fontSize: 20 }} >{''}</Text>)}
                        </TouchableOpacity>
                    </Text>
                    <Header children={undefined}></Header>
                </View>


            }
            {

                schedule && loading ? (
                    <FlatList
                        style={{
                            height: 250,
                            flexGrow: 0
                        }}
                        data={schedule}
                        renderItem={({ item }) =>
                            <ScrollView style={{
                                flex: 2,
                                flexDirection: 'column',
                                margin: 8,
                            }} >

                                {
                                    <Button onPress={() => handleDateClick(item.appointmentDate)} >
                                        <div className="event_item" key={item.key}>
                                            <div className="ei_Title">{item.time}</div>
                                        </div>
                                    </Button>
                                }
                            </ScrollView>}
                        numColumns={3}
                        scrollEnabled={true}

                    />
                ) :
                    date.getDay() !== 6 ? (

                        isWaiting ? (
                            <View>
                                <Text style={{ color: 'white' }}>אתה נמצא ברשימת המתנה ל{item} בתאריך זה</Text>
                                <Header children={undefined}></Header>
                                <TouchableOpacity
                                    onPress={() => handleDeleteWating().then(() => setIsWaittng(false))}
                                >
                                    <Text style={stylesRegister.link}>{`לחץ כאן ליציאה מרשימת המתנה`}</Text>

                                </TouchableOpacity>

                            </View>

                        ) : (
                            <View>
                                <Text style={{ color: 'white' }}>{`לא נותרו תורים אצל ${item}`}</Text>
                                <Text style={{ color: 'white' }}>{`ניתן להזמין תור לספר אחר או להיכנס`}</Text>
                                <Text style={{ color: 'white' }}>{`לרשימת ממתינים`}</Text>
                                <Header children={undefined}></Header>
                                <TouchableOpacity


                                    onPress={() => handleWaitingClick()}
                                >
                                    <Text style={stylesRegister.link}>{`לחץ כאן להיכנס לרשימת המתנה`}</Text>

                                </TouchableOpacity>

                            </View>

                        )



                    ) : (
                        <View>

                            <Header children={undefined}></Header>
                            <Header children={undefined}></Header>
                            <Header children={undefined}></Header>
                            <Header children={undefined}></Header>
                            <Text style={stylesRegister.link}>שבת שלום</Text>

                        </View>
                    )
            }

            <Button
                mode="outlined"
                style={styles.button}
                onPress={() => history.push('/')}
            >
                חזרה לעמוד הראשי
            </Button>

        </Background >
    )
})







