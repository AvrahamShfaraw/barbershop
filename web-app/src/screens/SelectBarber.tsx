import { FlatList, ScrollView } from "react-native";
import { RouteComponentProps } from "react-router"
import Background from "../component/Background";
import Button from "../component/Button";
import Header from "../component/Header";
import Logo from "../component/Logo";

interface Props extends RouteComponentProps { }

export const SelectBarber: React.FC<Props> = ({ history }) => {

    const range = ["יהודה", "סלמון"];


    return (
        <Background>
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
