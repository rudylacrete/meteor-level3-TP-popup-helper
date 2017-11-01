import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

export default {
  createPopup(templateName, data, options) {
    if(!_.has(Template, templateName))
      return null;
    options = _.extend({}, options);
    let blazeView = null;
    let extraClass = '';
    if(options.noPadding == true)
      extraClass = 'no-padding';
    $.magnificPopup.open({
      items: {
        src: `<div class="white-popup mfp-with-anim ${extraClass}"></div>`
      },
      type: 'inline',
      modal: _.isUndefined(options.modal) ? true : options.modal,
      removalDelay: 300,
      mainClass: 'mfp-with-zoom',
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it
    
        duration: 300, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function
    
        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function(openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      },
      callbacks: {
        close() {
          if(blazeView) {
            Blaze.remove(blazeView);
            blazeView = null;
          }
        }
      }
    });
    const parent = $.magnificPopup.instance.content[0];
    blazeView = Blaze.renderWithData(Template[templateName], data, parent);
    return $(parent);
  }
}