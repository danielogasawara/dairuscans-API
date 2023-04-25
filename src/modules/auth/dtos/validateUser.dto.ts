import { IsEmail, IsStrongPassword, Length } from 'class-validator';

export class ValidateUserDto {
  @IsEmail(undefined, { message: 'O formato do e-mail não é válido' })
  email: string;

  @IsStrongPassword()
  @Length(6, 255, { message: 'A senha deve conter de 6 a 255 caractéres' })
  password: string;
}
