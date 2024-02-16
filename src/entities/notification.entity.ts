import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';
@Entity({name: 'panel_notifications'})
export class Notification {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column({ nullable: true })
    url: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    date: Date;

    @Column({ default: true})
    active: boolean;

    @Column()
    user_id: number;
}
