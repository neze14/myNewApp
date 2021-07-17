import { Connection, createConnection, getRepository, Repository } from "typeorm";
import { RegistrationEntry } from "../entities/registration-entry.entities";
import { IRegistrationEntry, IState } from "../interfaces/registration-entry.interface";

export const getDbConnection = async (setConnection:React.Dispatch<React.SetStateAction<Connection | null>> , state: IState, setState: React.Dispatch<React.SetStateAction<IState>>) => {
    try {
      const connection = await createConnection({
        type: 'expo',
        database: 'registration_entries.db',
        driver: require('expo-sqlite'),

        synchronize: true,
        entities: [RegistrationEntry],
      });
      setConnection(connection);
      getRegistrationEntries(state, setState);
    } catch (error) {
      console.log(error);
    }
}

export const getRegistrationEntries = async (state: IState, setState: React.Dispatch<React.SetStateAction<IState>>) => {
  try {
      const registrationEntryRepository: Repository<RegistrationEntry> = getRepository(RegistrationEntry);
      let registrationEntries = await registrationEntryRepository.find();
      setState({ ...state, registrationEntries });
  } catch (error) {
      console.log(error);
  }
};

export const createRegistrationEntry = async (registrationEntryData: IRegistrationEntry, state: IState, setState: React.Dispatch<React.SetStateAction<IState>>) => {
  try {
      const registrationEntryRepository: Repository<RegistrationEntry> = getRepository(RegistrationEntry);
      const newRegistrationEntry = registrationEntryRepository.create(registrationEntryData);
      const registrationEntry = await registrationEntryRepository.save(newRegistrationEntry);
      // The functions below modify state after it has been created
      const registrationEntries = state.registrationEntries;
      registrationEntries.push(registrationEntry);
      setState({ ...state, registrationEntries, onAddEntry: false }); // this ensures that the form in the component closes after it has been submitted
  } catch (error) {
      console.log(error);
  }
};

export const deleteRegistrationEntry = async (id: number, state: IState, setState: React.Dispatch<React.SetStateAction<IState>>) => {
  try {
      const registrationEntryRepository: Repository<RegistrationEntry> = getRepository(RegistrationEntry);
      await registrationEntryRepository.delete(id);
      // This removes entry from state
      const currentEntries = state.registrationEntries;
      const index = currentEntries.findIndex((entry) => entry.id === id);
      currentEntries.splice(index, 1);
      setState({ ...state, registrationEntries: currentEntries });
  } catch (error) {
      console.log(error);
  }
};