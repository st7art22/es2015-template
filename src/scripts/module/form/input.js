/**
 * Created by dmitry on 04.11.15.
 */

export default class Input extends Backbone.View {

  constructor(options) {
    super(options);

    this.className = "form-group";
    this.template = _.template($('#input').html());
  }

  render() {
    this.$el
      .html(this.template(this.model.toJSON()))
      .addClass(this.className);
    return this;
  }

}