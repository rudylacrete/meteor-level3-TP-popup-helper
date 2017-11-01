import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import PopupHekper from '/imports/client/popupHelper.js';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
  setInterval(() => {
    this.counter.set(this.counter.get() + 1);
  }, 1000);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
    const data = () => {
      return {
        counter: instance.counter.get()
      };
    }
    PopupHekper.createPopup('testPopup', data, {modal: false});
  }
});
