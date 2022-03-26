import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { RouteComponentProps } from "react-router";
import Background from "../component/Background";
import Button from "../component/Button";
import Logo from "../component/Logo";
import Paragraph from "../component/Paragraph";
interface Props extends RouteComponentProps { }

export const HomeScreen: React.FC<Props> = ({ history }) => {
    return (
        <Background>
            <Logo />

            <Paragraph>
                The easiest way to start with your amazing application.
            </Paragraph>
            <Button mode="contained" onPress={() => history.push('/Login')}>
                לקוח קיים
            </Button>
            <Button
                mode="outlined"
                onPress={() => history.push('/Register')}
            >
                לקוח חדש
            </Button>
        </Background>
    )
}
