
import axios, { AxiosError, AxiosResponse } from "axios";
import { Appointment, AppointmentFormValues } from "../models/appointment";
import { Profile } from "../models/profile";
import { User, UserFormValues } from "../models/user";
import { Waiting, WaitingFormValues } from "../models/waiting";
import { store } from "../stores/store";



axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) config.headers!!.Authorization = `Bearer ${token}`
    return config;
})


function sleep(delay: number) {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    });
}
axios.interceptors.response.use(async response => {
    if (process.env.NODE_ENV === 'development') await sleep(1000);
    return response;
}, (error: AxiosError | any) => {
    const { data, status, config } = error.response;


    console.log(data, status, config);
    return Promise.reject(error);

})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Appointments = {
    list: () => requests.get<Appointment[]>('/appointments'),
    details: (appointmentId: string) => requests.get<Appointment>(`/appointments/${appointmentId}`),
    create: (appointment: AppointmentFormValues) => requests.post<void>('/appointments', appointment),
    update: (appointment: AppointmentFormValues) => requests.put<void>(`/appointments/${appointment.appointmentId}`, appointment),
    delete: (appointmentId: string) => requests.delete<void>(`/appointments/${appointmentId}`),
    attend: (id: string) => requests.post<void>(`/appointments/${id}/attend`, {})
}
const Waitings = {
    list: () => requests.get<Waiting[]>('/waiting'),
    details: (id: string) => requests.get<Waiting>(`/waiting/${id}`),
    create: (waiting: WaitingFormValues) => requests.post<void>('/waiting', waiting),
    delete: (id: string) => requests.delete<void>(`/waiting/${id}`),
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user)
}



const agent = {
    Appointments,
    Account,
    Waitings
}

export default agent



