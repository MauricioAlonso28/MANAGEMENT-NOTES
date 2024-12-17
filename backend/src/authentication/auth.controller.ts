import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Response, Request } from 'express'
import { ExtendedRequest } from "@/types/extended-request";
import createAccessToken from "@/libs/jwt";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('signup')
  async signUp(
    @Body() body: { email: string; password: string },
    @Res() res: Response,
    @Req() req: ExtendedRequest
  ) {
    try {
      if (!body.email) throw new Error('The email is missing!')
      if (!body.password) throw new Error('The password is missing!')
    
      const { user } = await this.authService.signUp(body.email, body.password)
      const token = await createAccessToken({
        id: user.id,
      })

      res.cookie('token', token)
      
      return res.status(HttpStatus.CREATED).send({ message: 'User registered successfully' })
    } catch (error: any) {
      return res.status(HttpStatus.BAD_REQUEST).send(error.message)
    }
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() body: { email: string; password: string },
    @Res() res: Response,
    @Req() req: ExtendedRequest
  ) {
    try {
      if (!body.email) throw new Error('The email is missing!')
      if (!body.password) throw new Error('The password is missing!')
      
      const { user } = await this.authService.signIn(body.email, body.password);

      const token = await createAccessToken({
        id: user.id
      })
      res.cookie('token', token);

      return res.send({ message: 'User signed in successfully' });
    } catch (error: any) {
      return res.status(HttpStatus.UNAUTHORIZED).send({ message: error.message });
    }
  }
  
  @Post('signout')
  @HttpCode(HttpStatus.OK)
  async signOut(
    @Res() res: Response,
    @Req() req: ExtendedRequest
  ) {
    req.user = null
    res.clearCookie('token');
    return res.send({ message: 'User signed out successfully' });
  }
    
  @Get('verify')
  @HttpCode(HttpStatus.OK)
  async verifyToken(
    @Req() req: ExtendedRequest,
    @Res() res: Response
  ) { 
    try {
      const user = req.user; 
      if (!user) throw new UnauthorizedException('Not authenticated');

      return res.status(200).json({ authenticated: true, user });
    } catch (error: any) {
      return res.status(201).json({ authenticated: false });
    }
  }
}