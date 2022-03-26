import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Background from "../component/Background";
import Button from "../component/Button";
import Logo from "../component/Logo";
import Paragraph from "../component/Paragraph";
import { StyleSheet } from 'react-native';
import Header from "../component/Header";
import { stylesRegister } from "../style";
import { RouteComponentProps } from "react-router";




interface Props extends RouteComponentProps { }
export const DefaultScreen: React.FC<Props> = ({ history }) => {


    return (

        <Background>
            <Logo />


            <Paragraph>
                The easiest way to start with your amazing application.
            </Paragraph>
            <Header> <Button style={{ width: 250 }} onPress={() => history.push('/Home')}>
                <Text >הזמנת תור</Text>

            </Button></Header>
            <View style={{ flexDirection: "row" }}>
                <View style={styles1.buttonStyleContainer}>
                    <Button onPress={() => console.log('hello')}> <Text style={stylesRegister.link}>text</Text></Button>
                </View>
                <View style={styles1.buttonStyleContainer}>
                    <Button onPress={() => console.log('hello')}> <Text style={stylesRegister.link}>text</Text></Button>
                </View>
                <View style={styles1.buttonStyleContainer}>
                    <Button onPress={() => console.log('hello')}> <Text style={stylesRegister.link}>text</Text></Button>
                </View>
            </View>

            <View style={{ flexDirection: "row" }}>
                <View style={styles1.buttonStyleContainer}>
                    <Button onPress={() => console.log('hello')}> <Text style={stylesRegister.link}>text</Text></Button>
                </View>
                <View style={styles1.buttonStyleContainer}>
                    <Button onPress={() => console.log('hello')}> <Text style={stylesRegister.link}>text</Text></Button>
                </View>
                <View style={styles1.buttonStyleContainer}>
                    <Button onPress={() => console.log('hello')}> <Text style={stylesRegister.link}>text</Text></Button>
                </View>

            </View>
            <View>

            </View>


            <View style={stylesRegister.row}>
                <TouchableOpacity onPress={() => console.log('hello')}>
                    <Text style={{ color: 'white' }}> אהבתם את האפליקציה? רוצים גם? לחצו כאן</Text>

                </TouchableOpacity>
            </View>


            <Text style={{ color: '#F1723C', fontSize: 10, fontFamily: 'Lucida Sans' }}>Development&Design by AVRAHAM SHFARAWO</Text>
        </Background>
    )
}


export const styles1 = StyleSheet.create({
    backgroundVideo: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },

    buttonStyleContainer: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 5,
        height: 100
    }
});