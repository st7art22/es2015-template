/**
 * Created by dmitry on 04.11.15.
 */

export default class Input extends Backbone.View {

  get className() {
    return "form-group";
  }

  get template() {
    return _.template($('#input').html());
  }

  get events() {
    return {
      'change input': 'onChange'
    };
  }

  static get Model() {
    return FieldModel;
  }

  onChange(e) {
    this.model.set('value', $(e.currentTarget).val());
    if (this.model.validate()) {
      this.$el.addClass('has-error');
    } else {
      this.$el.removeClass('has-error');
    }
  }

  render() {
    this.$el
      .html(this.template(this.model.toJSON()))
      .addClass(this.className);
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

  get validateMethods() {
    return {
      required: value => !_.isEmpty(value)
    }
  }

  get validateErrors() {
    return {
      required: "Не заполнено обязательное поле"
    }
  }

  validate() {
    var validate = this.get('validate');
    var errors = [];
    for(let methodName in validate) {
      if (!validate[methodName] || !this.validateMethods[methodName]) return;
      if (!this.validateMethods[methodName](this.get('value'))) {
        errors.push(this.validateErrors[methodName]);
      }
    }
    if (errors.length > 0) return errors;
  }

}