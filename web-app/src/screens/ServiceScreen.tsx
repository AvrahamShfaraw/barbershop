import React from "react";
import { RouteComponentProps } from "react-router";
import Background from "../component/Background";
import Header from "../component/Header";
import Logo from "../component/Logo";
import Paragraph from "../component/Paragraph";
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
            <Paragraph>אווירה אשש</Paragraph>
            <Paragraph>תגיעו</Paragraph>




        </Background>
    )
}
