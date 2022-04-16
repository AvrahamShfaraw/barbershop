import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
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
import { styles } from "../style";
import { utcToZonedTime } from "date-fns-tz";
import Logo from "../component/Logo";
import { RouteComponentProps } from "react-router";
import { useParams } from "../router/indexWeb";
import { observer } from "mobx-react-lite";



// type DashboardScreenProps = NativeStackScreenProps<RootStackParamList, 'תורים'>
interface Props extends RouteComponentProps { }

export const Dashboard: React.FC<Props> = observer(({ history }) => {

    const [schedule, setSchedule] = React.useState<any>([]);
    const [date, setDate] = React.useState(new Date());
    const { appointmentStore } = useStore();
    const { createAppointment, updateAppointment } = appointmentStore;
    const [loading, setLoading] = React.useState(false);
    const { item } = useParams<{ item: string }>();


    const range1 = ['10:00', '10:20', '10:40', '11:00',
        '11:20', '11:40', '12:00', '12:20', '12:40',
        '13:00', '13:20', '13:40', '14:00', '14:20',
        '14:40', '15:00', '15:20', '15:40', '16:00', '16:20'
        , '16:40', '17:00', '17:20', '17:40', '18:00', '18:20',
        '18:40', '19:00', '19:20', '19:40', '20:00',
        '20:20', '20:40', '21:00'];

    const range2 = ['10:00', '10:20', '10:40', '11:00',
        '11:20', '11:40', '12:00', '12:20', '12:40',
        '13:00', '13:20', '13:40', '14:00', '14:20',
        '14:40', '15:00', '15:20', '15:40', '16:00', '16:20'
        , '16:40', '17:00', '17:20', '17:40', '18:00', '18:20',
        '18:40', '19:00', '19:20', '19:40', '20:00',
        '20:20', '20:40', '21:00', '21:20', '21:40', '22:00', '22:20',
        '22:40', '23:00'];
    const range3 = ['10:00', '10:20', '10:40', '11:00',
        '11:20', '11:40', '12:00', '12:20', '12:40',
        '13:00', '13:20', '13:40', '14:00', '14:20',
        '14:40', '15:00', '15:20', '15:40', '16:00'];




    const handleDateClick = (e: any) => {
        let newAppointment: AppointmentFormValues = {
            appointmentDate: e,
            barberName: item

        };
        handleFormSubmit(newAppointment)
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
            const appointments = response.map((a) => {

                return {
                    appointmentDate: a.appointmentDate.split('T').join().slice(0, 24),
                    barberName: a.barberName
                }
            });

            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            if (date.getDay() !== 6 && date.getDay() === 4) {

                const data = range2.map((hour, i) => {
                    const checkDate = Date.parse(date.toString().split('T').join().slice(0, 16) + hour + ':00');
                    const compareDate = utcToZonedTime(checkDate, timezone);

                    var check = date.toString().split('T').join().slice(0, 16) + hour + ':00';
                    const availbale = appointments.find((x) => x.appointmentDate === check && x.barberName === item) ? false : true;
                    const past = isBefore(compareDate, new Date())



                    if (availbale && !past && date.getDay() !== 6) {
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

                } else {
                    setSchedule(null);
                }


            } else if (date.getDay() === 5) {
                const data = range3.map((hour, i) => {
                    const checkDate = Date.parse(date.toString().split('T').join().slice(0, 16) + hour + ':00');
                    const compareDate = utcToZonedTime(checkDate, timezone);

                    var check = date.toString().split('T').join().slice(0, 16) + hour + ':00';
                    const availbale = appointments.find((x) => x.appointmentDate === check && x.barberName === item) ? false : true;
                    const past = isBefore(compareDate, new Date())



                    if (availbale && !past && date.getDay() !== 6) {
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
                } else {
                    setSchedule(null);
                }
            } else if (date.getDay() !== 6) {
                const data = range1.map((hour, i) => {
                    const checkDate = Date.parse(date.toString().split('T').join().slice(0, 16) + hour + ':00');
                    const compareDate = utcToZonedTime(checkDate, timezone);

                    var check = date.toString().split('T').join().slice(0, 16) + hour + ':00';
                    const availbale = appointments.find((x) => x.appointmentDate === check && x.barberName === item) ? false : true;
                    const past = isBefore(compareDate, new Date());


                    if (availbale && !past && date.getDay() !== 6) {
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



    if (!schedule && !loading) return <Header>loading</Header>


    // //format(date, 'EEEE d MMM y')
    return (
        <Background>
            <Logo />
            <Header>בחר תור</Header>
            <Header children={undefined}></Header>
            <Header children={undefined}></Header>
            {



                <View >
                    <Text style={{ color: 'white', fontSize: 25 }}>
                        <TouchableOpacity onPress={handlePrevDay}>
                            {date.getDay() === new Date().getDay() ? (<Text>{''}</Text>) : (
                                <Text style={{ color: 'red', fontSize: 20 }} >{'אחורה'}</Text>)}
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
                    (
                        <View>
                            <Text style={styles.label}>אין תורים זמינים ביום זה </Text>
                        </View>
                    )

            }


        </Background >
    )
})







