import { ExtendedRequest } from "@/types/extended-request";
import { DEFAULT_KEY } from "@/utils/default-key";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: ExtendedRequest, res: Response, next: NextFunction) {
    if (req.cookies.token) {
      return res.status(401).send("Unauthorized: There is a user already logged in")
    }

    next()
  }
}

export class UserMiddleware implements NestMiddleware {
  use(req: ExtendedRequest, res: Response, next: NextFunction) { 
    const { token } = req.cookies
    
    if (!token) return res.status(401).send("Unauthorized: You are not logged in")

    jwt.verify(token, DEFAULT_KEY, async (err: any, user: any) => {
      if (err) throw new Error(err)

      req.user = user.id
    })

    next()
  }
}

export class AuthenticatedMiddleware implements NestMiddleware {
  use(req: ExtendedRequest, res: Response, next: NextFunction) { 
    const { token } = req.cookies

    if (!token) return next()
    
    jwt.verify(token, DEFAULT_KEY, async (err: any, user: any) => {
      if (err) throw new Error(err)

      req.user = user.id
    })

    next()
  }
}