import { RouteComponentProps, RouterProps } from "react-router-dom";


interface Props extends RouterProps {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;

}