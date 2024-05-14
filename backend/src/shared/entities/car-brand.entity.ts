import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CarModelEntity } from './car-model.entity';

@Entity({ name: 'CarBrands' })
export class CarBrandEntity {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    Code: string;

    @Column()
    Title: string;

    @OneToMany(() => CarModelEntity, (model) => model.brand)
    models: CarModelEntity[];
}
