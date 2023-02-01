import { Team } from './entities/team.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Global, Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './controller/team.controller';
import { TeamResolver } from './resolver/team.resolver';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Team])],
  providers: [TeamService, TeamResolver],
  controllers: [TeamController],
  exports: [TeamService, TypeOrmModule],
})
export class TeamModule {}
