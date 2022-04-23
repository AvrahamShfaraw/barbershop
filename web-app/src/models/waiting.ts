export interface Waiting {
    id: string;
    userName: string;
    displayName: string;
    phoneNumber: string;
    barberName: string;
    date: string;

}

export class Waiting implements Waiting {
    constructor(init?: WaitingFormValues) {
        Object.assign(this, init);
    }
}

export class WaitingFormValues {

    id?: string
    userName?: string;
    displayName?: string;
    phoneNumber?: string;
    barberName?: string;
    date?: string;

    constructor(waiting?: WaitingFormValues) {
        if (waiting) {
            this.id = waiting.id;
            this.userName = waiting.userName;
            this.displayName = waiting.displayName;
            this.phoneNumber = waiting.phoneNumber;
            this.barberName = waiting.barberName;
            this.date = waiting.date;

        }
    }
}