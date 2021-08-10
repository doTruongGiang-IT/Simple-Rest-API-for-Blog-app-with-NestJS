/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserAuth(email, pass);
    if(user) {
      const { password, ...result } = user;
      return result;
    }else {
      return null;
    };
  };

//   async login(user: any) {
//     const payload = { username: user.username, sub: user.userId };
//     return {
//       access_token: this.jwtService.sign(payload),
//     };
//   }
}