import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text } from "react-native";
import { RouteComponentProps } from "react-router";
import Background from "../component/Background";
import Button from "../component/Button";
import Header from "../component/Header";
import Logo from "../component/Logo";
import Paragraph from "../component/Paragraph";
import { styles } from "../style";
interface Props extends RouteComponentProps { }

export const ServiceScreen: React.FC<Props> = ({ history }) => {
    return (
        <Background>
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
            <Paragraph>החלקה</Paragraph>
            <Paragraph>ועוד</Paragraph>




        </Background>
    )
}