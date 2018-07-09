import Route from '@ember/routing/route';
import ListRouteMixin from 'leads-manage/mixins/list-route-mixin';

import query from 'leads-manage/gql/queries/campaign/list';
import search from 'leads-manage/gql/queries/campaign/search';

export default Route.extend(ListRouteMixin, {
  /**
   *
   * @param {Transition} transition
   */
  beforeModel(transition) {
    if (!this.user.get('permissions.campaign.list')) {
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
      queryKey: 'allCampaigns',
    }, {
      search,
      searchKey: 'searchCampaigns',
    }, { first, sortBy, ascending, phrase, searchType, searchBy });
  },
});
