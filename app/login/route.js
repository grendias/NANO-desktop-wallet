import Route from '@ember/routing/route';
import { get } from '@ember/object';

import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

import { service } from 'ember-decorators/service';
import { action } from 'ember-decorators/object';

import { InvalidPasswordError } from '../authenticators/wallet';

export default Route.extend(UnauthenticatedRouteMixin, {
  @service intl: null,
  @service session: null,
  @service flashMessages: null,

  model() {
    const wallet = this.get('session.data.wallet');
    if (!wallet) {
      return this.transitionTo('setup');
    }

    return wallet;
  },

  @action
  async unlockWallet(changeset) {
    const wallet = get(changeset, 'wallet');
    const password = get(changeset, 'password');
    try {
      return this.get('session').authenticate('authenticator:wallet', { wallet, password });
    } catch (err) {
      if (!(err instanceof InvalidPasswordError)) {
        throw err;
      }

      const message = this.get('intl').t('wallets.unlock.invalidPassword');
      this.get('flashMessages').danger(message);
      return false;
    }
  },

  @action
  setupWallet() {
    return this.transitionTo('setup');
  },
});