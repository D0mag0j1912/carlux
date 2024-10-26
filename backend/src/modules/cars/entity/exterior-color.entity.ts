import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'ExteriorColors' })
export class ExteriorColorsEntity {
    @PrimaryColumn()
    Hex: string;

    @Column()
    Name: string;
}
