import { User } from "@/modules/users/users.entity";
import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import * as crypto from 'crypto'
import { AuthenticatedMiddleware, AuthMiddleware } from "@/middleware/Auth.middleware";
import { DEFAULT_KEY } from "@/utils/default-key";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: DEFAULT_KEY,
      signOptions: { expiresIn: '3h' },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
			.forRoutes(
				{ path: 'auth/signin', method: RequestMethod.POST },
				{ path: 'auth/signup', method: RequestMethod.POST },
			)
      
		consumer
			.apply(AuthenticatedMiddleware)
			.forRoutes({ path: 'auth/verify', method: RequestMethod.GET })
  }
}