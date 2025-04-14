import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToOne,
} from 'typeorm';
import { Employee } from '../../employee/entities/employee.entity';
import * as bcrypt from 'bcryptjs';
import { Role } from 'src/auth/enums/role.enum';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: Role.Admin })
  role: Role;

  @OneToOne(() => Employee, (employee) => employee.user)
  employee: Employee;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(plainPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, this.password);
  }
}
