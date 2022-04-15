import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @IsNotEmpty({ message: 'Campo nome não pode ser vazio' })
  @IsEmail({}, { message: 'Formato email incorreto' })
  @ApiProperty({ example: 'lucasduarte@email.com', description: 'User email' })
  email: string;

  @IsNotEmpty({ message: 'Campo sobrenome não pode ser vazio' })
  @ApiProperty({ example: 'password', description: 'User Password' })
  password: string;
}
