import { forwardRef, Module } from '@nestjs/common';
import { CaslAbilityFactory } from './casl-ability.factory/casl-ability.factory';
import { UserModule } from '../user/user.module';
import {APP_GUARD} from "@nestjs/core";
import {CaslGuard} from "./casl.guard";

@Module({
  providers: [
      CaslAbilityFactory,
      {
        provide: APP_GUARD,
        useClass: CaslGuard,
      },
  ],
  exports: [CaslAbilityFactory],
  imports: [forwardRef(() => UserModule)],
})
export class CaslModule {}