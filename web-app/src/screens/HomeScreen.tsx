import React from "react";
import { RouteComponentProps } from "react-router";
import BackButton from "../component/BackButton";
import Background from "../component/Background";
import Button from "../component/Button";
import Header from "../component/Header";
import Logo from "../component/Logo";
import { styles } from "../style";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
interface Props extends RouteComponentProps { }

export const HomeScreen: React.FC<Props> = ({ history }) => {
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

            <Button style={styles.button} mode="contained" onPress={() => history.push('/Login')}>
                לקוח קיים
            </Button>
            <Button
                mode="outlined"
                style={styles.button}
                onPress={() => history.push('/Register')}
            >
                לקוח חדש
            </Button>

        </Background>
    )
}


const styles2 = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 10 + getStatusBarHeight(),
        left: -35,
    },
    image: {
        width: 50,
        height: 40,
    },
});