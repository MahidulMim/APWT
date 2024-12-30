import { ProductEntity } from 'src/products/entities/product.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'reviews' })
export class ReivewEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  ratings: number;
  @Column()
  comment: string;
  @CreateDateColumn()
  created_at: Timestamp;
  @UpdateDateColumn()
  updated_at: Timestamp;

  @ManyToOne(() => UserEntity, (user) => user.reviews)
  user: UserEntity;

  @ManyToOne(() => ProductEntity, (prod) => prod.reviews)
  product: ProductEntity;
}
