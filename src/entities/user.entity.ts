import {
    BeforeInsert,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({name: 'api_users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false })
    username: string;

    @Column({ nullable: false })
    password: string;

    @BeforeInsert()
    async hashPasword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
