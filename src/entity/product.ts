import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ObjectIdColumn,
  ObjectID,
} from 'typeorm'

@Entity()
export class Product {
  @ObjectIdColumn({ primary: true })
  _id: ObjectID

  @Column({ unique: true, generated: true })
  id: number

  @Column()
  name: string

  @Column()
  minPrice: number;

  @Column()
  maxPrice: number;

  @Column()
  img: string;

  @Column()
  downloadUrl: string;
}
