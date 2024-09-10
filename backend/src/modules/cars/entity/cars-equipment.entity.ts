import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CarEntity } from '../../../shared/entities/car.entity';
import { EquipmentEntity } from './equipment.entity';

@Entity({ name: 'CarsEquipment' })
export class CarsEquipmentEntity {
    @PrimaryGeneratedColumn()
    Id: number;

    @ManyToOne(() => CarEntity, (car) => car.carEquipments)
    car: CarEntity;

    @ManyToOne(() => EquipmentEntity, (equipment) => equipment.carEquipments)
    equipment: EquipmentEntity;
}
