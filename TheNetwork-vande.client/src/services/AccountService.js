import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async editAccount(accountData) {
    const res = await api.put('/account', accountData)

    logger.log("[EDITED ACCOUNT]", res.data)

    let updatedAccount = new Account(res.data)

    AppState.account = updatedAccount
  }
}

export const accountService = new AccountService()
