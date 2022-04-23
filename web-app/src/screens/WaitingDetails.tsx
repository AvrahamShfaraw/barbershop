import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Linking, Text, View } from "react-native";
import { RouteComponentProps } from "react-router";
import BackButton from "../component/BackButton";
import Background from "../component/Background";
import Button from "../component/Button";
import Header from "../component/Header";
import Logo from "../component/Logo";
import { useParams } from "../router/indexWeb";
import { useStore } from "../stores/store";
import { stylesRegister } from "../style";
interface Props extends RouteComponentProps { }

export const WaitingDetails: React.FC<Props> = observer(({ history }) => {

    const { id } = useParams<{ id: string }>();
    const { waitingStore } = useStore();
    const { deleteWating, selectedWaiting: waiting, loadingInitial, loadWaiting } = waitingStore;


    useEffect(() => {
        if (id) loadWaiting(id);

    }, [id, loadWaiting]);







    if (loadingInitial || !waiting) return <View><Text>Loading</Text></View>;
    return (
        <Background>
            <BackButton goBack={() => history.push('/')} />
            <Logo />
            <Header>פרטים</Header>
            <Header children={undefined}></Header>

            <Header children={undefined}></Header>
            <Header>{waiting.displayName}</Header>






            <Button mode="contained" onPress={() => Linking.openURL(`https://wa.me/972${waiting.phoneNumber}`)}>
                וואטסאפ
            </Button>
            <Button
                mode="contained"
                onPress={() => deleteWating(id).then(() => history.goBack())}
            >
                מחק מרשימת ממתינים
            </Button>
            <Header children={undefined}></Header>
            <Button
                mode="outlined"
                onPress={() => history.goBack()}
            >
                חזרה
            </Button>
        </Background>
    );





})