import { Token, User } from '@interfaces';

export interface AuthResponse extends Token {
    user: User;
}
