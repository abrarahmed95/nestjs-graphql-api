import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Workspace } from 'src/workspace/entities/workspace.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column({ nullable: false, unique: true })
  @Index({ unique: true })
  @ApiProperty()
  email: string;

  @Column({ nullable: false, select: false })
  @ApiHideProperty()
  @Exclude()
  password: string;

  @Column({ nullable: false, unique: true })
  @ApiProperty()
  username: string;

  @Column({ nullable: true, default: false })
  @ApiProperty()
  verified: boolean;

  @OneToMany(() => Workspace, (workspace) => workspace.user, {
    cascade: true,
  })
  workspaces: Workspace[];

  @BeforeInsert()
  async setPassword(password: string): Promise<void> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password || password, salt);
    this.password = hash;
  }

  async comparePassword(password: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, this.password);

    if (!isMatch) {
      throw new UnauthorizedException('Passwords do not match');
    }

    return isMatch;
  }
}
