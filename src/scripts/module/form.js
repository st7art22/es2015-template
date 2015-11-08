/**
 * Created by dmitry on 04.11.15.
 */

import Input from './form/input.js'
import Email from './form/email.js'
import Phone from './form/phone.js'
import Textarea from './form/textarea.js'
import Submit from './form/submit.js'

const TYPES = {
  text: Input,
  email: Email,
  phone: Phone,
  textarea: Textarea,
  submit: Submit
};

export default class Form extends Backbone.View {

  get template() {
    return _.template($('#form').html());
  }

  static get Model() {
    return FormModel;
  }

  render() {
    this.$el.html(this.template(this.model.toJSON()));

    _.each(this.model.get('fields'), field => {
      var View = TYPES[field.type];
      if (!View) return;

      var view = new View({model: new View.Model(field)});
      this.$el.append(view.render().el);
    });

    return this;
  }

}

class FormModel extends Backbone.Model {

  get url() {
    return "/";
  }

}