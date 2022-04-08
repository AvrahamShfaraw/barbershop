import { ConfirmationScreen } from "../screens/ConfirmationScreen";
import { ContactScreen } from "../screens/ContactScreen";
import { Dashboard } from "../screens/Dashboard";
import { DefaultScreen } from "../screens/DefaultScreen";
import { DeleteScreen } from "../screens/DeleteAppointment";
import { DetailsAppointment } from "../screens/DetailsAppointment";
import { HomeScreen } from "../screens/HomeScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { ProductList } from "../screens/ProductList";
import { ProfileScreen } from "../screens/ProfileScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { SelectBarber } from "../screens/SelectBarber";
import { ServiceScreen } from "../screens/ServiceScreen";
import { Router, Route, Switch } from "./indexWeb";

export const Routes = () => {

    return (

        <Router>
            <Switch>
                <Route exact path={'/'} component={DefaultScreen} />
                <Route exact path={'/home'} component={HomeScreen} />
                <Route exact path={'/login'} component={LoginScreen} />
                <Route exact path={'/register'} component={RegisterScreen} />
                <Route exact path={'/service'} component={ServiceScreen} />
                <Route exact path={'/contact'} component={ContactScreen} />
                <Route exact path={'/delete/:appointmentId'} component={DeleteScreen} />
                <Route exact path={'/barberName'} component={SelectBarber} />
                <Route exact path={'/dashboard/:item'} component={Dashboard} />
                <Route exact path='/DetailsAppointments/:appointmentId' component={DetailsAppointment} />
                <Route exact path='/Confirmation/:appointmentId' component={ConfirmationScreen} />
                <Route exact path='/ProductList' component={ProductList} />
                <Route exact path={'/Profile'} component={ProfileScreen} />
            </Switch>
        </Router>

    );
}