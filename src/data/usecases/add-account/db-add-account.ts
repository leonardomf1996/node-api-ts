import { AddAccount, AddAccountModel, AccountModel, Encrypter, AddAccountRepository } from './db-add-account-protocols';

export class DbAddAccount implements AddAccount {
   constructor(
      private readonly encrypter: Encrypter,
      private readonly addAccountRepository: AddAccountRepository,
   ) { }

   async add(accountData: AddAccountModel): Promise<AccountModel> {
      const hashedPassword = await this.encrypter.encrypt(accountData.password);
      /* 
      No método abaixo, o assign() cria um obj novo ({}), atribui os dados de 
         accountData nesse obj novo e, por fim, sobrescreve password com hashedPassword
      */
      await this.addAccountRepository.add(Object.assign({}, accountData, {
         password: hashedPassword
      }))
      return new Promise(resolve => resolve(null))
   }
}