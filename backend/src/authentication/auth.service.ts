import { User } from "@/modules/users/users.entity";
import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcryptjs'
import { JwtService } from "@nestjs/jwt";
import { DEFAULT_KEY } from "@/utils/default-key";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) { }
  
  async signUp(
    email: string,
    password: string,
  ): Promise<{ user: User }> {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    })

    if (existingUser) throw new ConflictException("User with this email already exists")

    // HASHING PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = this.userRepository.create({
      email,
      password: hashedPassword
    })
    
    const userSaved = await this.userRepository.save(newUser)
    
    if (!userSaved) throw new NotFoundException("Couldn't save user")

    // GENERATE JWT FOR USER

    return { user: userSaved}
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ user: User }> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException("Invalid email or password");

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) throw new UnauthorizedException("Invalid email or password");

    return { user: user}
  }
}