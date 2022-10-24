import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    login: string;

    @Column()
    password: string;

    @Column({
        nullable: true
    })
    name: string;

    @Column({
        nullable: true
    })
    phone: string;

    @Column('text', {
        nullable: true
    })
    address: string;

    @Column('text', {
        nullable: true
    })
    info: string;
}