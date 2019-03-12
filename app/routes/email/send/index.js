import Route from '@ember/routing/route';
import ListRouteMixin from 'leads-manage/mixins/list-route-mixin';

import query from 'leads-manage/gql/queries/email-send/list';
import search from 'leads-manage/gql/queries/email-send/search';

export default Route.extend(ListRouteMixin, {
  /**
   *
   * @param {object} params
   */
  model({ first, sortBy, ascending, phrase, searchType, searchBy }) {
    return this.getResults({
      query,
      queryKey: 'allEmailSends',
    }, {
      search,
      searchKey: 'searchEmailSends',
    }, { first, sortBy, ascending, phrase, searchType, searchBy });
  },
});
