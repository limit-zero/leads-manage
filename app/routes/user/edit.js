import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from 'leads-manage/gql/queries/user';
import deleteUser from 'leads-manage/gql/mutations/delete-user';
import updateUser from 'leads-manage/gql/mutations/update-user';

export default Route.extend(RouteQueryManager, {
  model({ id }) {
    const variables = { input: { id } };
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'user');
  },
  actions: {
    update(model) {
      const mutation = updateUser;
      const { id, email, givenName, familyName } = model;
      const payload = { email, givenName, familyName };
      const input = { id, payload };
      const variables = { input };
      return this.get('apollo').mutate({ mutation, variables }, 'updateUser')
        .then(() => this.get('notify').success('User successfully updated.'))
        .catch(e => this.get('graphErrors').show(e))
      ;
    },
    delete(id, routeName) {
      const mutation = deleteUser;
      const variables = { input: { id } };
      return this.get('apollo').mutate({ mutation, variables }, 'deleteUser')
        .then(() => this.transitionTo(routeName))
        .catch(e => this.get('graphErrors').show(e))
      ;
    },
  },
});
