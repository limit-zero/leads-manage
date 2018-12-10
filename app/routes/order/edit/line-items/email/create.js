import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import FormMixin from 'leads-manage/mixins/form-mixin';
import { inject } from '@ember/service';

export default Route.extend(FormMixin, RouteQueryManager, {
  identityAttributes: inject(),
  linkTypes: inject(),

  model() {
    return {
      emailCategories: [],
      tags: [],
      range: {},
      linkTypes: ['(Not Set)', 'Advertising'],
      requiredFields: [
       'emailAddress',
      ],
      excludedFields: [
        'phoneNumber',
      ],
      identityFilters: [],
    }
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('order', this.modelFor('order.edit'));
  },
});