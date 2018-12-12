import Controller from '@ember/controller';
import FormMixin from 'leads-manage/mixins/form-mixin';
import { inject } from '@ember/service';

import nameMutation from 'leads-manage/gql/mutations/line-item/email/name';
import requiredLeadsMutation from 'leads-manage/gql/mutations/line-item/email/required-leads';
import totalValueMutation from 'leads-manage/gql/mutations/line-item/email/total-value';
import dateRangeMutation from 'leads-manage/gql/mutations/line-item/email/date-range';

export default Controller.extend(FormMixin, {
  apollo: inject(),

  actions: {
    async setName(event) {
      this.startAction();
      try {
        const { value } = event.target;
        if (!value) throw new Error('The line item name is required.');
        const id = this.get('model.id');
        const input = { id, name: value };
        const variables = { input };
        await this.get('apollo').mutate({ mutation: nameMutation, variables }, 'emailLineItemName');
        this.get('notify').info('Name saved.');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },

    async setRequiredLeads(event) {
      this.startAction();
      try {
        const { value } = event.target;
        const requiredLeads = Number(value);
        if (!requiredLeads || requiredLeads < 1) throw new Error('The total number of leads is required..');
        const id = this.get('model.id');
        const input = { id, requiredLeads: value };
        const variables = { input };
        await this.get('apollo').mutate({ mutation: requiredLeadsMutation, variables }, 'emailLineItemRequiredLeads');
        this.get('notify').info('Total required leads saved.');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },

    async setTotalValue(event) {
      this.startAction();
      try {
        const { value } = event.target;
        const totalValue = Number(value);
        if (totalValue < 0) throw new Error('The total value must be 0 or greater.');
        const id = this.get('model.id');
        const input = { id, totalValue };
        const variables = { input };
        await this.get('apollo').mutate({ mutation: totalValueMutation, variables }, 'emailLineItemTotalValue');
        this.get('notify').info('Total value saved.');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },

    async setDateRange(range) {
      const { start, end } = range;
      if (!end) {
        this.set('model.range', range);
      } else {
        this.startAction();
        const id = this.get('model.id');
        const input = {
          id,
          range: {
            start: start.valueOf(),
            end: end.valueOf(),
          },
        };
        const variables = { input };
        try {
          await this.get('apollo').mutate({ mutation: dateRangeMutation, variables }, 'emailLineItemDateRange');
          this.get('notify').info('Date range saved.');
        } catch (e) {
          this.get('graphErrors').show(e);
        } finally {
          this.endAction();
        }
      }
    },
  },
});
