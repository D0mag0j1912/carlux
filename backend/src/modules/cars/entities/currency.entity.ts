import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'Currencies' })
export class CurrencyEntity {
    @Column()
    Name: string;

    @PrimaryColumn()
    Code: string;

    @Column()
    Symbol: string;
}
