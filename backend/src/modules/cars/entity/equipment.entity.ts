import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CarsEquipmentEntity } from './cars-equipment.entity';

@Entity({ name: 'Equipment' })
export class EquipmentEntity {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    Name: string;

    @OneToMany(() => CarsEquipmentEntity, (carEquipment) => carEquipment.equipment)
    carEquipments: CarsEquipmentEntity[];
}
