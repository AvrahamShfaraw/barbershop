import React, { useEffect } from "react";
import { Text, TouchableOpacity, View, Image, Linking, FlatList, ScrollView } from "react-native";
import Background from "../component/Background";
import Button from "../component/Button";
import Logo from "../component/Logo";
import { StyleSheet } from 'react-native';
import Header from "../component/Header";
import { stylesRegister } from "../style";
import { RouteComponentProps } from "react-router";
import { useStore } from "../stores/store";
import agent from "../api/agent";
import { utcToZonedTime } from "date-fns-tz";
import { isBefore } from "date-fns";
import { observer } from "mobx-react-lite";




interface Props extends RouteComponentProps { }
export const DefaultScreen: React.FC<Props> = observer(({ history }) => {
    const [schedule, setSchedule] = React.useState<any>([]);
    const { userStore } = useStore()
    const { user } = userStore;
    const { appointmentStore } = useStore();
    const { deleteAppointment } = appointmentStore;

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

    useEffect(() => {

        async function loadUserAppointment() {
            const response = await agent.Appointments.list();
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            const data = response.map((appointment) => {

                const checkDate = Date.parse(appointment.appointmentDate)
                const compareDate = utcToZonedTime(checkDate, timezone);
                const past = isBefore(compareDate, new Date());
                if (!past) {
                    return {
                        appointmentId: appointment.appointmentId,
                        barberName: appointment.barberName,
                        userName: appointment.attendee.userName,
                        appointmentDate: appointment.appointmentDate.split('T').join().slice(0, 21),
                        past: past,


                    }
                } else {
                    deleteAppointment(appointment.appointmentId);
                }



            }


            )

            const userAppointment = data.filter(item => typeof item !== 'undefined' && item.userName === user?.userName);
            if (userAppointment.length > 0) {
                setSchedule(userAppointment)
            } else {
                setSchedule(null);
            }



        }

        loadUserAppointment();




    }, [])

    return (

        <Background>
            <Logo />
            {userStore.isLoggedIn ? (


                user?.userName === 'user0522540642' ? (


                    <><><Header>{userStore.user?.displayName}</Header></>
                        <Button onPress={() => { userStore.logout() }}>התנתק</Button>
                        <Button onPress={() => history.push(`/profile/${user.userName}`)}>
                            <Text>רשימת התורים שלי</Text></Button>


                        {
                            <>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={styles.container}>

                                        <TouchableOpacity
                                            style={styles.buttonFacebookStyle}
                                            activeOpacity={0.5}
                                            onPress={() => history.push('/service')}
                                        >
                                            <Image
                                                source={require("../assets/barber-shop.png")}
                                                style={styles.buttonImageIconStyle} />
                                            <View style={styles.buttonIconSeparatorStyle} />
                                        </TouchableOpacity>
                                        <Text style={styles.buttonTextStyle}>
                                            שירותי מספרה
                                        </Text>
                                    </View>
                                    <View style={styles.container}>

                                        <TouchableOpacity
                                            style={styles.buttonFacebookStyle}
                                            activeOpacity={0.5}
                                            onPress={() => history.push('/ProductList')}
                                        >
                                            <Image
                                                source={require("../assets/cart.png")}
                                                style={{
                                                    padding: 15,
                                                    margin: 15,
                                                    height: 70,
                                                    width: 70,
                                                    resizeMode: 'stretch',
                                                }} />
                                            <View style={styles.buttonIconSeparatorStyle} />
                                        </TouchableOpacity>
                                        <Text style={styles.buttonTextStyle}>
                                            המוצרים שלנו
                                        </Text>
                                    </View>
                                    <View style={styles.container}>

                                        <TouchableOpacity
                                            style={styles.buttonFacebookStyle}
                                            activeOpacity={0.5}
                                            onPress={() => history.push('/contact')}
                                        >
                                            <Image
                                                source={require("../assets/placeholder.png")}
                                                style={styles.buttonImageIconStyle} />
                                            <View style={styles.buttonIconSeparatorStyle} />
                                        </TouchableOpacity>
                                        <Text style={styles.buttonTextStyle}>
                                            איך מגיעים
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={styles.container}>

                                        <TouchableOpacity
                                            style={styles.buttonFacebookStyle}
                                            activeOpacity={0.5}
                                            onPress={() => Linking.openURL('https://instagram.com/s.ybarbers?utm_medium=copy_link')}
                                        >
                                            <Image
                                                source={require("../assets/instagram (4).png")}
                                                style={styles.buttonImageIconStyle} />
                                            <View style={styles.buttonIconSeparatorStyle} />
                                        </TouchableOpacity>
                                        <Text style={styles.buttonTextStyle}>
                                            אינסטגרם
                                        </Text>
                                    </View>
                                    <View style={styles.container}>

                                        <TouchableOpacity
                                            style={styles.buttonFacebookStyle}
                                            activeOpacity={0.5}
                                            onPress={() => Linking.openURL('https://wa.me/972522540642')}
                                        >
                                            <Image
                                                source={require("../assets/whatsapp.png")}
                                                style={styles.buttonImageIconStyle} />
                                            <View style={styles.buttonIconSeparatorStyle} />
                                        </TouchableOpacity>
                                        <Text style={styles.buttonTextStyle}>
                                            וואטסאפ סלמון
                                        </Text>
                                    </View>
                                    <View style={styles.container}>

                                        <TouchableOpacity
                                            style={styles.buttonFacebookStyle}
                                            activeOpacity={0.5}
                                            onPress={() => Linking.openURL('https://wa.me/972527701195')}
                                        >
                                            <Image
                                                source={require("../assets/whatsapp.png")}
                                                style={styles.buttonImageIconStyle} />
                                            <View style={styles.buttonIconSeparatorStyle} />
                                        </TouchableOpacity>
                                        <Text style={styles.buttonTextStyle}>
                                            וואטסאפ יהודה
                                        </Text>
                                    </View>
                                </View></>


                        }

                    </>
                ) : (
                    <>
                        <><><Header>{userStore.user?.displayName}</Header></>
                            <Button onPress={() => { userStore.logout() }}>התנתק</Button>

                            {
                                schedule ? (
                                    <><><FlatList
                                        data={schedule}
                                        renderItem={({ item }) => <ScrollView>

                                            {(
                                                <><Button onPress={() => { history.push(`/delete/${item.appointmentId}`); }}>{'לביטול התור לחץ כאן'}</Button>
                                                    <Button mode="outlined" onPress={() => history.push(`/DetailsAppointments/${item.appointmentId}`)}>
                                                        <div className="event_item" key={item.appointmentId}>
                                                            <div className="ei_Title">{new Date(item.appointmentDate).toLocaleDateString('he-IL', {
                                                                day: 'numeric', month: 'short'
                                                            }).replace(/ /g, '-').toString() + ' יום ' + func(new Date(item.appointmentDate).getDay())}
                                                                {' ' + item.appointmentDate.split('T').join().slice(16, 21) + '' + "  ל" + item.barberName}
                                                            </div>
                                                        </div>
                                                    </Button></>

                                            )}

                                        </ScrollView>} />

                                        <View style={{ flexDirection: "row" }}>
                                            <View style={styles.container}>

                                                <TouchableOpacity
                                                    style={styles.buttonFacebookStyle}
                                                    activeOpacity={0.5}
                                                    onPress={() => history.push('/service')}
                                                >
                                                    <Image
                                                        source={require("../assets/barber-shop.png")}
                                                        style={styles.buttonImageIconStyle} />
                                                    <View style={styles.buttonIconSeparatorStyle} />
                                                </TouchableOpacity>
                                                <Text style={styles.buttonTextStyle}>
                                                    שירותי מספרה
                                                </Text>
                                            </View>
                                            <View style={styles.container}>

                                                <TouchableOpacity
                                                    style={styles.buttonFacebookStyle}
                                                    activeOpacity={0.5}
                                                    onPress={() => history.push('/ProductList')}
                                                >
                                                    <Image
                                                        source={require("../assets/cart.png")}
                                                        style={{
                                                            padding: 15,
                                                            margin: 15,
                                                            height: 70,
                                                            width: 70,
                                                            resizeMode: 'stretch',
                                                        }} />
                                                    <View style={styles.buttonIconSeparatorStyle} />
                                                </TouchableOpacity>
                                                <Text style={styles.buttonTextStyle}>
                                                    המוצרים שלנו
                                                </Text>
                                            </View>
                                            <View style={styles.container}>

                                                <TouchableOpacity
                                                    style={styles.buttonFacebookStyle}
                                                    activeOpacity={0.5}
                                                    onPress={() => history.push('/contact')}
                                                >
                                                    <Image
                                                        source={require("../assets/placeholder.png")}
                                                        style={styles.buttonImageIconStyle} />
                                                    <View style={styles.buttonIconSeparatorStyle} />
                                                </TouchableOpacity>
                                                <Text style={styles.buttonTextStyle}>
                                                    איך מגיעים
                                                </Text>
                                            </View></View>
                                    </><View style={{ flexDirection: "row" }}>
                                            <View style={styles.container}>

                                                <TouchableOpacity
                                                    style={styles.buttonFacebookStyle}
                                                    activeOpacity={0.5}
                                                    onPress={() => Linking.openURL('https://instagram.com/s.ybarbers?utm_medium=copy_link')}
                                                >
                                                    <Image
                                                        source={require("../assets/instagram (4).png")}
                                                        style={styles.buttonImageIconStyle} />
                                                    <View style={styles.buttonIconSeparatorStyle} />
                                                </TouchableOpacity>
                                                <Text style={styles.buttonTextStyle}>
                                                    אינסטגרם
                                                </Text>
                                            </View>
                                            <View style={styles.container}>

                                                <TouchableOpacity
                                                    style={styles.buttonFacebookStyle}
                                                    activeOpacity={0.5}
                                                    onPress={() => Linking.openURL('https://wa.me/972522540642')}
                                                >
                                                    <Image
                                                        source={require("../assets/whatsapp.png")}
                                                        style={styles.buttonImageIconStyle} />
                                                    <View style={styles.buttonIconSeparatorStyle} />
                                                </TouchableOpacity>
                                                <Text style={styles.buttonTextStyle}>
                                                    וואטסאפ סלמון
                                                </Text>
                                            </View>
                                            <View style={styles.container}>

                                                <TouchableOpacity
                                                    style={styles.buttonFacebookStyle}
                                                    activeOpacity={0.5}
                                                    onPress={() => Linking.openURL('https://wa.me/972527701195')}
                                                >
                                                    <Image
                                                        source={require("../assets/whatsapp.png")}
                                                        style={styles.buttonImageIconStyle} />
                                                    <View style={styles.buttonIconSeparatorStyle} />
                                                </TouchableOpacity>
                                                <Text style={styles.buttonTextStyle}>
                                                    וואטסאפ יהודה
                                                </Text>
                                            </View>
                                        </View></>




                                ) : <><Button onPress={() => history.push('/barberName')}>
                                    <Text>הזמנת תור אונלייין</Text></Button><Header children={undefined}></Header>
                                    <View style={{ flexDirection: "row" }}>
                                        <View style={styles.container}>

                                            <TouchableOpacity
                                                style={styles.buttonFacebookStyle}
                                                activeOpacity={0.5}
                                                onPress={() => history.push('/service')}
                                            >
                                                <Image
                                                    source={require("../assets/barber-shop.png")}
                                                    style={styles.buttonImageIconStyle} />
                                                <View style={styles.buttonIconSeparatorStyle} />
                                            </TouchableOpacity>
                                            <Text style={styles.buttonTextStyle}>
                                                שירותי מספרה
                                            </Text>
                                        </View>
                                        <View style={styles.container}>

                                            <TouchableOpacity
                                                style={styles.buttonFacebookStyle}
                                                activeOpacity={0.5}
                                                onPress={() => history.push('/ProductList')}
                                            >
                                                <Image
                                                    source={require("../assets/cart.png")}
                                                    style={{
                                                        padding: 15,
                                                        margin: 15,
                                                        height: 70,
                                                        width: 70,
                                                        resizeMode: 'stretch',
                                                    }} />
                                                <View style={styles.buttonIconSeparatorStyle} />
                                            </TouchableOpacity>
                                            <Text style={styles.buttonTextStyle}>
                                                המוצרים שלנו
                                            </Text>
                                        </View>
                                        <View style={styles.container}>

                                            <TouchableOpacity
                                                style={styles.buttonFacebookStyle}
                                                activeOpacity={0.5}
                                                onPress={() => history.push('/contact')}
                                            >
                                                <Image
                                                    source={require("../assets/placeholder.png")}
                                                    style={styles.buttonImageIconStyle} />
                                                <View style={styles.buttonIconSeparatorStyle} />
                                            </TouchableOpacity>
                                            <Text style={styles.buttonTextStyle}>
                                                איך מגיעים
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <View style={styles.container}>

                                            <TouchableOpacity
                                                style={styles.buttonFacebookStyle}
                                                activeOpacity={0.5}
                                                onPress={() => Linking.openURL('https://instagram.com/s.ybarbers?utm_medium=copy_link')}
                                            >
                                                <Image
                                                    source={require("../assets/instagram (4).png")}
                                                    style={styles.buttonImageIconStyle} />
                                                <View style={styles.buttonIconSeparatorStyle} />
                                            </TouchableOpacity>
                                            <Text style={styles.buttonTextStyle}>
                                                אינסטגרם
                                            </Text>
                                        </View>
                                        <View style={styles.container}>

                                            <TouchableOpacity
                                                style={styles.buttonFacebookStyle}
                                                activeOpacity={0.5}
                                                onPress={() => Linking.openURL('https://wa.me/972522540642')}
                                            >
                                                <Image
                                                    source={require("../assets/whatsapp.png")}
                                                    style={styles.buttonImageIconStyle} />
                                                <View style={styles.buttonIconSeparatorStyle} />
                                            </TouchableOpacity>
                                            <Text style={styles.buttonTextStyle}>
                                                וואטסאפ סלמון
                                            </Text>
                                        </View>
                                        <View style={styles.container}>

                                            <TouchableOpacity
                                                style={styles.buttonFacebookStyle}
                                                activeOpacity={0.5}
                                                onPress={() => Linking.openURL('https://wa.me/972527701195')}
                                            >
                                                <Image
                                                    source={require("../assets/whatsapp.png")}
                                                    style={styles.buttonImageIconStyle} />
                                                <View style={styles.buttonIconSeparatorStyle} />
                                            </TouchableOpacity>
                                            <Text style={styles.buttonTextStyle}>
                                                וואטסאפ יהודה
                                            </Text>
                                        </View>
                                    </View></>


                            }

                        </></>
                )
            ) : <><Button onPress={() => history.push('/Home')}>
                <Text>בוא נתחיל התחבר/הרשם</Text></Button><Header children={undefined}></Header><View style={{ flexDirection: "row" }}>
                    <View style={styles.container}>

                        <TouchableOpacity
                            style={styles.buttonFacebookStyle}
                            activeOpacity={0.5}
                            onPress={() => history.push('/service')}
                        >
                            <Image
                                source={require("../assets/barber-shop.png")}
                                style={styles.buttonImageIconStyle} />
                            <View style={styles.buttonIconSeparatorStyle} />
                        </TouchableOpacity>
                        <Text style={styles.buttonTextStyle}>
                            שירותי מספרה
                        </Text>
                    </View>
                    <View style={styles.container}>

                        <TouchableOpacity
                            style={styles.buttonFacebookStyle}
                            activeOpacity={0.5}
                            onPress={() => history.push('/ProductList')}
                        >
                            <Image
                                source={require("../assets/cart.png")}
                                style={{
                                    padding: 15,
                                    margin: 15,
                                    height: 70,
                                    width: 70,
                                    resizeMode: 'stretch',
                                }} />
                            <View style={styles.buttonIconSeparatorStyle} />
                        </TouchableOpacity>
                        <Text style={styles.buttonTextStyle}>
                            המוצרים שלנו
                        </Text>
                    </View>
                    <View style={styles.container}>

                        <TouchableOpacity
                            style={styles.buttonFacebookStyle}
                            activeOpacity={0.5}
                            onPress={() => history.push('/contact')}
                        >
                            <Image
                                source={require("../assets/placeholder.png")}
                                style={styles.buttonImageIconStyle} />
                            <View style={styles.buttonIconSeparatorStyle} />
                        </TouchableOpacity>
                        <Text style={styles.buttonTextStyle}>
                            איך מגיעים
                        </Text>
                    </View>
                </View><View style={{ flexDirection: "row" }}>
                    <View style={styles.container}>

                        <TouchableOpacity
                            style={styles.buttonFacebookStyle}
                            activeOpacity={0.5}
                            onPress={() => Linking.openURL('https://instagram.com/s.ybarbers?utm_medium=copy_link')}
                        >
                            <Image
                                source={require("../assets/instagram (4).png")}
                                style={styles.buttonImageIconStyle} />
                            <View style={styles.buttonIconSeparatorStyle} />
                        </TouchableOpacity>
                        <Text style={styles.buttonTextStyle}>
                            אינסטגרם
                        </Text>
                    </View>
                    <View style={styles.container}>

                        <TouchableOpacity
                            style={styles.buttonFacebookStyle}
                            activeOpacity={0.5}
                            onPress={() => Linking.openURL('https://wa.me/972522540642')}
                        >
                            <Image
                                source={require("../assets/whatsapp.png")}
                                style={styles.buttonImageIconStyle} />
                            <View style={styles.buttonIconSeparatorStyle} />
                        </TouchableOpacity>
                        <Text style={styles.buttonTextStyle}>
                            וואטסאפ סלמון
                        </Text>
                    </View>
                    <View style={styles.container}>

                        <TouchableOpacity
                            style={styles.buttonFacebookStyle}
                            activeOpacity={0.5}
                            onPress={() => Linking.openURL('https://wa.me/972527701195')}
                        >
                            <Image
                                source={require("../assets/whatsapp.png")}
                                style={styles.buttonImageIconStyle} />
                            <View style={styles.buttonIconSeparatorStyle} />
                        </TouchableOpacity>
                        <Text style={styles.buttonTextStyle}>
                            וואטסאפ יהודה
                        </Text>
                    </View>
                </View>
                <Header children={undefined}></Header>
                <Header children={undefined}></Header>
                <View>
                    <TouchableOpacity


                        onPress={() => Linking.openURL('https://wa.me/972504214777')}
                    >
                        <Text style={stylesRegister.link}>אהבת את האפליקציה? רוצה גם? לחץ כאן</Text>
                    </TouchableOpacity>
                </View>
                <Text style={stylesRegister.link}>{'\u00A9'} Development&Designed By Avraham-Shfarawo.</Text>
            </>

            }



        </Background >
    )
})



const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // margin: 10,
        // marginTop: 30,
        // padding: 30,
    },
    buttonGPlusStyle: {
        // flexDirection: 'row',
        // alignItems: 'center',
        // backgroundColor: '#dc4e41',
        // borderWidth: 0.5,
        // borderColor: '#fff',
        // height: 40,
        // borderRadius: 5,
        // margin: 5,
    },
    buttonFacebookStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'black',
        borderWidth: 1,
        borderColor: 'black',
        height: 100,
        borderRadius: 10,
        margin: 10,
    },
    buttonImageIconStyle: {
        padding: 15,
        margin: 15,
        height: 45,
        width: 45,
        resizeMode: 'stretch',
    },
    buttonTextStyle: {
        color: '#fff',
        marginBottom: 8,
        marginRight: 20,
    },
    buttonIconSeparatorStyle: {
        backgroundColor: 'black',
        width: 2,
        height: 80,
    },
});

