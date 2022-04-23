import { FlatList, Image, ScrollView, TouchableOpacity, TouchableOpacityBase } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { RouteComponentProps } from "react-router"
import BackButton from "../component/BackButton";
import Background from "../component/Background";
import Button from "../component/Button";
import Header from "../component/Header";
import Logo from "../component/Logo";
import { stylesRegister } from "../style";
import { StyleSheet } from 'react-native';

interface Props extends RouteComponentProps { }

export const SelectBarber: React.FC<Props> = ({ history }) => {

    const range = ["יהודה", "סלמון"];


    return (
        <Background>
            <TouchableOpacity
                style={styles.container}
                onPress={() => history.push('/')}
            >
                <Image style={styles.image} source={require('../assets/2454563.png')} />
            </TouchableOpacity>

            <Logo />
            <Header>בחר ספר</Header>
            <Header children={undefined}></Header>
            <Header children={undefined}></Header>
            {

                <FlatList
                    style={{
                        height: 250,
                        flexGrow: 0
                    }}
                    data={range}
                    renderItem={({ item }) =>
                        <ScrollView style={{
                            flex: 2,
                            flexDirection: 'column',
                            margin: 8,

                        }} >

                            {
                                <Button onPress={() => history.push(`/dashboard/${item}`)} >
                                    <div className="event_item" key={item}>
                                        <div className="ei_Title">{item}</div>
                                    </div>
                                </Button>
                            }
                        </ScrollView>}
                    numColumns={3}
                    scrollEnabled={true}

                />

            }

        </Background >
    )
}

const styles = StyleSheet.create({
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