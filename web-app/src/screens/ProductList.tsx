import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { RouteComponentProps } from "react-router";
import BackButton from "../component/BackButton";
import Background from "../component/Background";
import Button from "../component/Button";
import Header from "../component/Header";
import Logo from "../component/Logo";
import { stylesRegister } from "../style";
interface Props extends RouteComponentProps { }

export const ProductList: React.FC<Props> = ({ history }) => {

    const arrImages = ["../assets/1.png", "../assets/2.png", "../assets/3.png",
        "../assets/4.png", "../assets/5.png", "../assets/6.png", "../assets/7.png"];
    return (
        <Background>
            <TouchableOpacity
                style={styles2.container}
                onPress={() => history.goBack()}
            >
                <Image style={styles2.image} source={require('../assets/2454563.png')} />
            </TouchableOpacity>
            <Logo />
            <Header>המוצרים שלנו</Header>

            <Header children={undefined}></Header>
            <View style={{ flexDirection: "row" }}>
                <View style={styles.container}>

                    <TouchableOpacity
                        style={styles.buttonFacebookStyle}
                        activeOpacity={0.5}

                    >
                        <Image
                            source={require("../assets/1.png")}
                            style={styles.buttonImageIconStyle}
                        />
                        <Text style={styles.buttonTextStyle}>
                            60 שח
                        </Text>
                        <View style={styles.buttonIconSeparatorStyle} />
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>

                    <TouchableOpacity
                        style={styles.buttonFacebookStyle}
                        activeOpacity={0.5}

                    >
                        <Image
                            source={require("../assets/2.png")}
                            style={styles.buttonImageIconStyle}
                        />
                        <Text style={styles.buttonTextStyle}>
                            60 שח
                        </Text>
                        <View style={styles.buttonIconSeparatorStyle} />
                    </TouchableOpacity>

                </View>
            </View>
            <View style={{ flexDirection: "row" }}>
                <View style={styles.container}>

                    <TouchableOpacity
                        style={styles.buttonFacebookStyle}
                        activeOpacity={0.5}

                    >
                        <Image
                            source={require("../assets/3.png")}
                            style={styles.buttonImageIconStyle}
                        />
                        <Text style={styles.buttonTextStyle}>
                            50 שח
                        </Text>
                        <View style={styles.buttonIconSeparatorStyle} />
                    </TouchableOpacity>

                </View>
                <View style={styles.container}>

                    <TouchableOpacity
                        style={styles.buttonFacebookStyle}
                        activeOpacity={0.5}

                    >
                        <Image
                            source={require("../assets/7.png")}
                            style={styles.buttonImageIconStyle}
                        />
                        <Text style={styles.buttonTextStyle}>
                            40 שח
                        </Text>
                        <View style={styles.buttonIconSeparatorStyle} />
                    </TouchableOpacity>

                </View>
            </View>
            <View style={{ flexDirection: "row" }}>
                <View style={styles.container}>

                    <TouchableOpacity
                        style={styles.buttonFacebookStyle}
                        activeOpacity={0.5}

                    >
                        <Image
                            source={require("../assets/5.png")}
                            style={styles.buttonImageIconStyle}
                        />
                        <Text style={styles.buttonTextStyle}>
                            50 שח
                        </Text>
                        <View style={styles.buttonIconSeparatorStyle} />
                    </TouchableOpacity>

                </View>
                <View style={styles.container}>

                    <TouchableOpacity
                        style={styles.buttonFacebookStyle}
                        activeOpacity={0.5}

                    >
                        <Image
                            source={require("../assets/6.png")}
                            style={styles.buttonImageIconStyle}
                        />
                        <Text style={styles.buttonTextStyle}>
                            70 שח
                        </Text>
                        <View style={styles.buttonIconSeparatorStyle} />
                    </TouchableOpacity>

                </View>
            </View>

        </Background >
    )
}




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
        height: 100,
        width: 100,
        resizeMode: 'stretch',
    },
    buttonTextStyle: {
        color: '#fff',

    },
    buttonIconSeparatorStyle: {
        backgroundColor: 'black',
        width: 2,
        height: 80,
    },
});


const styles2 = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 10 + getStatusBarHeight(),
        left: 24,
    },
    image: {
        width: 50,
        height: 40,
    },
});
