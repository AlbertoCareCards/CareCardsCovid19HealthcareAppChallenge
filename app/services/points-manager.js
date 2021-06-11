import Service, { inject } from '@ember/service';
import config from '../config/environment';

const mockWallet = {
  points: 100
}

/**
 * Service responsible of creating wallets and managing their
 * content.
 */
export default class PointsManager extends Service {
  @inject ajax;

  /**
   * Request server to create a new wallet. The promise will return a string
   * with the address of the created wallet.
   * @return {*}
   */
  createWallet() {
    return this.ajax.request(`${config.APP.host}/api/v1/wallet`, { method: 'POST', data: {} });
  }

  /**
   * Request wallet information.
   * @param {string} walletAddress
   * @param {string} walletPassword
   * @return {*}
   */
  loadWallet(walletAddress, walletPassword) {
    return new Promise(resolve => resolve(mockWallet))
  }
}
