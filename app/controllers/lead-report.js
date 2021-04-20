import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  displayAdMetrics: computed('model.{adMetrics.enabled,customer.linkedAdvertisers.googleAdManager.nodes.length}', function() {
    return Boolean(this.get('model.adMetrics.enabled') && this.get('model.customer.linkedAdvertisers.googleAdManager.nodes.length'));
  }),
  displayVideoMetrics: computed('model.{videoMetrics.enabled,customer.linkedVideos.brightcove.nodes.length}', function() {
    return Boolean(this.get('model.videoMetrics.enabled') && this.get('model.customer.linkedVideos.brightcove.nodes.length'));
  }),
});
