import React from "react";
import { RouteComponentProps } from "react-router";
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Background from "../component/Background";
import Header from "../component/Header";
import Logo from "../component/Logo";
import { stylesRegister } from "../style";
interface Props extends RouteComponentProps { }

export const ContactScreen: React.FC<Props> = ({ history }) => {
    return (
        <Background>
            <Logo />
            <Header >איך מגיעים</Header>
            <Image
                source={require("../assets/map.png")}
                style={styles1.buttonImageIconStyle}
            />
            <Text style={stylesRegister.link}>כתובת</Text>
            <Text style={stylesRegister.label}>רוגוזין 43, אשדוד</Text>

            <Image
                source={require("../assets/Phone_icon.png")}
                style={styles1.buttonImageIconStyle}
            />
            <Text style={stylesRegister.link}>טלפון</Text>
            <Text style={stylesRegister.label}>0527701195 יהודה, 0522540642 סלמון</Text>



            <Header children={undefined}></Header>
            <TouchableOpacity
                onPress={() => Linking.openURL(' https://waze.com/ul?ll=31.80117,34.64054&navigate=yes')}
            >

                <Image
                    source={require("../assets/waze.png")}
                    style={styles1.buttonImageIconStyle}
                />

                <View style={styles1.buttonIconSeparatorStyle} />
                <Text style={{ color: 'white' }}>{'   ' + "לחץ עליי"}</Text>
            </TouchableOpacity>

            <Text style={{ color: 'white' }}>WAZE</Text>
            <Header children={undefined}></Header>
            <Image
                source={require("../assets/map4.png")}
                style={styles.buttonImageIconStyle}
            />


        </Background>
    )
}


const styles1 = StyleSheet.create({
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
        // height: 100,
        borderRadius: 10,
        // margin: 10,
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
        // marginBottom: 8,
        marginRight: 20,
    },
    buttonIconSeparatorStyle: {
        backgroundColor: 'black',
        width: 2,
        // height: 80,
    },
});



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


    },
    buttonImageIconStyle: {
        height: 100,
        width: 350,
        resizeMode: 'stretch',
    },

});