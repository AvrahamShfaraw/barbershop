import React from "react";
import { RouteComponentProps } from "react-router";
import Background from "../component/Background";
import Button from "../component/Button";
import Header from "../component/Header";
import Logo from "../component/Logo";
import { styles } from "../style";
interface Props extends RouteComponentProps { }

export const HomeScreen: React.FC<Props> = ({ history }) => {
    return (
        <Background>
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
