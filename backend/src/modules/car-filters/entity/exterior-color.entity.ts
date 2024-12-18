import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'ExteriorColors' })
export class ExteriorColorEntity {
    @PrimaryColumn()
    Hex: string;

    @Column()
    Name: string;
}
