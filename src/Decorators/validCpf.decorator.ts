import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';

export const ValidCpf = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    
      let Soma = 0;
      let Resto;
      let strCPF = request.body.cpf
    
      if (strCPF == "00000000000") throw new HttpException(`Cpf Nao e valido`, HttpStatus.BAD_REQUEST);
    
      for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
      Resto = (Soma * 10) % 11;
    
      if ((Resto == 10) || (Resto == 11)) Resto = 0;
      if (Resto != parseInt(strCPF.substring(9, 10))) throw new HttpException(`Cpf Nao e valido`, HttpStatus.BAD_REQUEST);
    
      Soma = 0;
      for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
      Resto = (Soma * 10) % 11;
    
      if ((Resto == 10) || (Resto == 11)) Resto = 0;
      if (Resto != parseInt(strCPF.substring(10, 11))) throw new HttpException(`Cpf Nao e valido`, HttpStatus.BAD_REQUEST);
      return true;
    
    
    

  },
);


