import { IsEmail, IsString, IsStrongPassword, Length } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @Length(3, 255, { message: 'O nome deve conter de 3 a 255 caractéres' })
  name: string;

  @IsEmail(undefined, { message: 'O formato do e-mail não é válido' })
  email: string;

  @IsStrongPassword()
  @Length(6, 255, { message: 'A senha deve conter de 6 a 255 caractéres' })
  password: string;
}
