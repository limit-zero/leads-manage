import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import FormMixin from 'leads-manage/mixins/form-mixin';
// import { get } from '@ember/object';

// import deleteCampaign from 'leads-manage/gql/mutations/campaign/delete';
// import cloneCampaign from 'leads-manage/gql/mutations/campaign/clone';
// import updateCampaign from 'leads-manage/gql/mutations/campaign/update';

export default Route.extend(FormMixin, RouteQueryManager, {
  model() {
    return this.modelFor('order.edit');
  },

  actions: {
    async update() {

    },
  //   /**
  //    *
  //    * @param {object} params
  //    */
  //   async update({ id, customer, name, startDate, endDate, maxIdentities }) {
  //     this.startRouteAction();
  //     const mutation = updateCampaign;
  //     const payload = {
  //       customerId: get(customer || {}, 'id'),
  //       name,
  //       startDate: startDate ? startDate.valueOf() : undefined,
  //       endDate: endDate ? endDate.valueOf() : undefined,
  //       maxIdentities
  //     };
  //     const input = { id, payload };
  //     const variables = { input };
  //     try {
  //       await this.get('apollo').mutate({ mutation, variables }, 'updateCampaign');
  //       this.get('notify').info('Campaign successfully updated.');
  //     } catch (e) {
  //       this.get('graphErrors').show(e);
  //     } finally {
  //       this.endRouteAction();
  //     }
  //   },

  //   /**
  //    *
  //    * @param {*} id
  //    * @param {*} routeName
  //    */
  //   async delete(id, routeName) {
  //     this.startRouteAction();
  //     const mutation = deleteCampaign;
  //     const variables = { input: { id } };
  //     try {
  //       await this.get('apollo').mutate({ mutation, variables }, 'deleteCampaign');
  //       this.get('notify').info('Campaign successfully deleted.');
  //       this.transitionTo(routeName)
  //     } catch (e) {
  //       this.get('graphErrors').show(e);
  //     } finally {
  //       this.endRouteAction();
  //     }
  //   },

  //   /**
  //    *
  //    * @param {*} id
  //    */
  //   async clone(id) {
  //     this.startRouteAction();
  //     const mutation = cloneCampaign;
  //     const variables = { input: { id } };
  //     try {
  //       const response = await this.get('apollo').mutate({ mutation, variables }, 'cloneCampaign');
  //       this.get('notify').info('Campaign successfully cloned.');
  //       this.transitionTo('campaign.edit', response.id);
  //     } catch (e) {
  //       this.get('graphErrors').show(e);
  //     } finally {
  //       this.endRouteAction();
  //     }
  //   },
  },
});
