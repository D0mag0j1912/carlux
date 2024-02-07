import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Images' })
export class ImageEntity {
    @PrimaryGeneratedColumn()
    Id?: number;

    @Column()
    Image: string;
}
