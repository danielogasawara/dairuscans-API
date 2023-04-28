import { IsEmail, IsString, IsStrongPassword, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @Length(3, 255, { message: 'O nome deve conter de 3 a 255 caractéres' })
  name: string;

  @ApiProperty()
  @IsEmail(undefined, { message: 'O formato do e-mail não é válido' })
  email: string;

  @ApiProperty()
  @IsStrongPassword()
  @Length(6, 255, { message: 'A senha deve conter de 6 a 255 caractéres' })
  password: string;
}
