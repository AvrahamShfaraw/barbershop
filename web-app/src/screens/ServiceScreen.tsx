import React from "react";
import { RouteComponentProps } from "react-router";
import BackButton from "../component/BackButton";
import Background from "../component/Background";
import Button from "../component/Button";
import Header from "../component/Header";
import Logo from "../component/Logo";
import Paragraph from "../component/Paragraph";
import { stylesRegister } from "../style";
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from "react-native-status-bar-height";
interface Props extends RouteComponentProps { }

export const ServiceScreen: React.FC<Props> = ({ history }) => {
    return (
        <Background>
            <TouchableOpacity
                style={styles2.container}
                onPress={() => history.goBack()}
            >
                <Image style={styles2.image} source={require('../assets/2454563.png')} />
            </TouchableOpacity>
            <Logo />
            <Header children={undefined}></Header>
            <Header children={undefined}></Header>
            <Header children={undefined}></Header>
            <Paragraph>מספרת סלמון ויהודה</Paragraph>
            <Paragraph>היא הרבה יותר מאשר מספרה</Paragraph>
            <Paragraph>המציעה שירותי עיצוב שיער</Paragraph>
            <Paragraph>מקצועיים</Paragraph>
            <Paragraph>לקוחות המקום יכולים ליהנות משירותים כמו</Paragraph>
            <Paragraph>תספורות לגברים</Paragraph>
            <Paragraph>צבע</Paragraph>
            <Paragraph>זקן</Paragraph>
            <Paragraph>אווירה אשש</Paragraph>
            <Paragraph>תגיעו</Paragraph>

        </Background>
    )
}


const styles2 = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 10 + getStatusBarHeight(),
        left: -24,
    },
    image: {
        width: 50,
        height: 40,
    },
});
