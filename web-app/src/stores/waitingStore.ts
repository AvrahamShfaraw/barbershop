import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Waiting, WaitingFormValues } from "../models/waiting";
import { store } from "./store";

export default class WaitingtStore {
    WaitingRegistry = new Map<string, Waiting>();
    selectedWaiting: Waiting | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    appointmentDetails = new Map<string, any>();

    constructor() {
        makeAutoObservable(this)
    }








    loadWaitings = async () => {
        this.loadingInitial = true;
        try {
            const waitings = await agent.Waitings.list();
            waitings.forEach((waiting: Waiting | undefined) => {
                this.selectedWaiting = waiting;

            })
            this.loadingInitial = false;
        } catch (error) {
            console.log(error);
            this.loadingInitial = false;
        }
    }



    loadWaiting = async (id: string) => {
        let waiting = this.getWaiting(id)
        if (waiting) {
            this.selectedWaiting = waiting
            return waiting;
        } else {
            this.loadingInitial = true;
            try {
                waiting = await agent.Waitings.details(id);
                this.setWaiting(waiting!);
                runInAction(() => {
                    this.selectedWaiting = waiting;
                });

                this.setLoadingInitial(false);
                return waiting;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }


    private setWaiting = (waiting: Waiting) => {


        waiting.date = waiting.date!;
        this.WaitingRegistry.set(waiting.id, waiting);


    }
    private getWaiting = (id: string) => {
        return this.WaitingRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createWaiting = async (waiting: WaitingFormValues) => {

        try {
            await agent.Waitings.create(waiting);
            const newAppointment = new Waiting(waiting);


            this.setWaiting(newAppointment);
            runInAction(() => {
                this.selectedWaiting = newAppointment;
            })
        } catch (error) { console.log(error); }
    }



    deleteWating = async (id: string) => {
        this.loading = true;
        try {
            await agent.Waitings.delete(id);
            runInAction(() => {
                this.WaitingRegistry.delete(id);
                this.loading = false;
                console.log(id)
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }

    }









}