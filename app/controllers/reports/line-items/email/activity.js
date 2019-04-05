import Controller from '@ember/controller';
import { computed, get } from '@ember/object';

export default Controller.extend({
  showEmail: computed('lineitem.excludedFields.[]', function() {
    if (this.get('lineitem.excludedFields').includes('emailAddress')) return false;
    return true;
  }),

  init() {
    this._super(...arguments);
    this.set('iframe', {
      show: false,
    });
  },

  actions: {
    displayIframeModal(send) {
      this.set('iframe.title', get(send, 'name'));
      this.set('iframe.src', get(send, 'url'));
      this.set('iframe.show', true);
    },
    displayIdentityModal(identity) {
      this.set('activeIdentity', identity);
      this.set('isIdentityModalOpen', true);
    },
  },
});
