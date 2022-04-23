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
import { styles } from "../style";
import { utcToZonedTime } from "date-fns-tz";
import Logo from "../component/Logo";
import { RouteComponentProps } from "react-router";
import { useParams } from "../router/indexWeb";
import { Item } from "semantic-ui-react";
import BackButton from "../component/BackButton";



// type DashboardScreenProps = NativeStackScreenProps<RootStackParamList, 'תורים'>
interface Props extends RouteComponentProps { }

export const WaitingListScreen: React.FC<Props> = ({ history }) => {

    const [schedule, setSchedule] = React.useState<any>([]);
    const [date, setDate] = React.useState(new Date());
    const { userStore } = useStore();
    const [loading, setLoading] = React.useState(false);
    const { username } = useParams<{ username: string }>();
    const { user } = userStore;
    const { appointmentStore } = useStore();










    useEffect(() => {


        async function loadUserAppointment() {

            const response = agent.Waitings.list();
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            const data = (await response).map((waiting) => {

                if (user?.userName === username && waiting.barberName === user.displayName) {

                    const checkDate = Date.parse(waiting.date)
                    const compareDate = utcToZonedTime(checkDate, timezone);
                    const past = isBefore(compareDate, new Date());
                    console.log(past);

                    return {
                        id: waiting.id,
                        displayName: waiting.displayName,
                        date: waiting.date,
                        phoneNumber: waiting.phoneNumber,
                        past: past,


                    }




                }

            })

            const watingList = data.filter(item => typeof item !== 'undefined' && new Date(item.date).getDate() === date.getDate());
            if (watingList.length > 0) {



                setSchedule(watingList)
                console.log(watingList);
                console.log((date.toString().split('T').join().slice(0, 16)));
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
            <BackButton goBack={() => history.goBack()} />
            <Logo />
            <Header>רשימת ממתינים</Header>
            <Header children={undefined}></Header>
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

                schedule ? (
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
                                        <Button onPress={() => history.push(`/waitingDetails/${item.id}`)}>
                                            <div className="event_item" key={item.id}>
                                                <div className="ei_Title">
                                                    {item.displayName}
                                                </div>
                                            </div>
                                        </Button></>

                                )}
                            </ScrollView>}
                        scrollEnabled={true}

                    />
                ) :
                    (
                        <View>
                            <Text style={styles.label}>  רשימת ממתינים ריקה ליום זה </Text>
                        </View>
                    )

            }




        </Background >
    )
}







