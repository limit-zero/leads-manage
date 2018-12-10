import Route from '@ember/routing/route';
import ListRouteMixin from 'leads-manage/mixins/list-route-mixin';

import query from 'leads-manage/gql/queries/order/list';
import search from 'leads-manage/gql/queries/order/search';

export default Route.extend(ListRouteMixin, {
  /**
   *
   * @param {Transition} transition
   */
  beforeModel(transition) {
    if (!this.user.get('permissions.order.list')) {
     transition.abort();
     this.transitionTo('index');
    }
  },

  /**
   *
   * @param {object} params
   */
  model({ first, sortBy, ascending, phrase, searchType, searchBy }) {
    return this.getResults({
      query,
      queryKey: 'allOrders',
    }, {
      search,
      searchKey: 'searchOrders',
    }, { first, sortBy, ascending, phrase, searchType, searchBy });
  },
});
