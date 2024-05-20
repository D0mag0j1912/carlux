import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CarBrandEntity } from './car-brand.entity';

@Entity({ name: 'CarModels' })
export class CarModelEntity {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    BrandId: number;

    @Column()
    Code: string;

    @Column()
    Title: string;

    @ManyToOne(() => CarBrandEntity, (brand) => brand.models)
    brand: CarBrandEntity;
}
