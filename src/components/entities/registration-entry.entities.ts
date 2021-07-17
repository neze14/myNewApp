import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('registration_entry')
export class RegistrationEntry {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nationalIdentityNumber: number;

    @Column()
    firstName: string;

    @Column()
    middleName: string;

    @Column()
    lastName: string;

    @Column()
    simNumber: number;

}