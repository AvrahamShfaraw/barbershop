import { createContext, useContext } from "react";
import AppointmentStore from "./appointmentStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";
import WaitingtStore from "./waitingStore";

interface Store {
    userStore: UserStore;
    modalStore: ModalStore;
    commonStore: CommonStore;
    appointmentStore: AppointmentStore;
    waitingStore: WaitingtStore;
}

export const store: Store = {
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    commonStore: new CommonStore(),
    appointmentStore: new AppointmentStore(),
    waitingStore: new WaitingtStore(),

}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}