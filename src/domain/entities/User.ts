import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export default class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ nullable: false, length: 255, unique: true })
  username: string;

  @Column({ nullable: false, length: 255 })
  password: string;

  @ApiProperty()
  @Column({ length: 255 })
  name: string;

  @ApiProperty()
  @Column({ nullable: true, length: 255, unique: true })
  email: string;

  @ApiProperty()
  @Column({ nullable: true, name: 'phone_number', length: 255 })
  phoneNumber: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
