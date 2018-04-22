import Route from '@ember/routing/route';
import { get } from '@ember/object';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import LoadingMixin from 'leads-manage/mixins/loading-mixin';

import mutation from 'leads-manage/gql/mutations/create-form';

export default Route.extend(RouteQueryManager, LoadingMixin, {
  model() {
    return {
      externalSource: {
        identifier: '',
        namespace: 'wufoo',
      }
    };
  },

  actions: {
    create({ customer, externalSource }) {
      this.showLoading();
      const customerId = customer ? get(customer, 'id') : undefined;
      const payload = { customerId, externalSource };
      const variables = { input: { payload } };
      return this.get('apollo').mutate({ mutation, variables }, 'createForm')
        .then(response => this.transitionTo('form.edit', response.id))
        .then(() => this.get('notify').info('Form created successfully.'))
        .catch(e => this.get('graphErrors').show(e))
        .finally(() => this.hideLoading())
      ;
    },
  },
});
