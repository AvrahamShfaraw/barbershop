import { Dashboard } from "../screens/Dashboard";
import { DefaultScreen } from "../screens/DefaultScreen";
import { DetailsAppointment } from "../screens/DetailsAppointment";
import { HomeScreen } from "../screens/HomeScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { Router, Route, Switch } from "./indexWeb";

export const Routes = () => {

    return (

        <Router>
            <Switch>
                <Route exact path={'/'} component={DefaultScreen} />
                <Route exact path={'/home'} component={HomeScreen} />
                <Route exact path={'/login'} component={LoginScreen} />
                <Route exact path={'/register'} component={RegisterScreen} />
                <Route exact path={'/appointments'} component={Dashboard} />
                <Route exact path='/DetailsAppointments/:appointmentId' component={DetailsAppointment} />
                <Route exact path={'/Profile'} component={ProfileScreen} />
            </Switch>
        </Router>

    );
}