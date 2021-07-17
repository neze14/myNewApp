export interface IRegistrationEntry {
    id?: number;
    nationalIdentityNumber?: number;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    simNumber?: number;
}

export interface IState{
    registrationEntries: IRegistrationEntry[],
    onAddEntry: boolean
}