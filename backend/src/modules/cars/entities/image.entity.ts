import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CarEntity } from './car.entity';

@Entity({ name: 'Images' })
export class ImageEntity {
    @PrimaryGeneratedColumn()
    Id?: number;

    @Column()
    Image: string;

    @Column()
    CarId: number;

    @ManyToOne(() => CarEntity, (car) => car.Id)
    @JoinColumn({ name: 'CarId' })
    car: CarEntity;
}
