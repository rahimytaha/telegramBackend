import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
}
