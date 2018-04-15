import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from 'leads-manage/gql/queries/customer';
import deleteCustomer from 'leads-manage/gql/mutations/delete-customer';
import updateCustomer from 'leads-manage/gql/mutations/update-customer';

export default Route.extend(RouteQueryManager, {
  model({ id }) {
    const variables = { input: { id } };
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'customer');
  },
  actions: {
    update(model) {
      const mutation = updateCustomer;
      const { id, name, description, website } = model;
      const payload = { name, description, website };
      const input = { id, payload };
      const variables = { input };
      return this.get('apollo').mutate({ mutation, variables }, 'updateCustomer')
        .then(() => this.get('notify').success('Customer successfully updated.'))
        .catch(e => this.get('graphErrors').show(e))
      ;
    },
    delete(id, routeName) {
      const mutation = deleteCustomer;
      const variables = { input: { id } };
      return this.get('apollo').mutate({ mutation, variables }, 'deleteCustomer')
        .then(() => this.transitionTo(routeName))
        .catch(e => this.get('graphErrors').show(e))
      ;
    },
  },
});
