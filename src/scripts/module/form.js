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

  constructor(options) {
    super(options);
    this.template = _.template($('#form').html());
  }

  render() {
    this.$el.html(this.template(this.model.toJSON()));

    // =>, let
    _.each(this.model.get('fields'), field => {
      let View = TYPES[field.type];
      if (!View) return;

      let view = new View({model: new FieldModel(field)});
      this.$el.append(view.render().el);
    });
    return this;
  }

}

class FieldModel extends Backbone.Model {

  defaults() {
    return {
      name: "",
      placeholder: "",
      type: "",
      validate: "",
      value: ""
    };
  }

}