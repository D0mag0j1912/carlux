import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'InteriorColors' })
export class InteriorColorEntity {
    @PrimaryColumn()
    Hex: string;

    @Column()
    Name: string;
}
