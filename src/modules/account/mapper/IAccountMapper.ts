import { AccountDTO } from '../DTO/accountDTO.model';

export interface IAccountMapper {
  toAccountDTO(account): AccountDTO;
}
