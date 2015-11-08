/**
 * Created by dmitry on 04.11.15.
 */

var { Model, View, Collection, Router, LocalStorage } = Backbone;

import Form from './module/form.js'

var form = new Form({
  model: new Form.Model({
    action: "/contacts",
    fields: {
      company: { name: "company", placeholder: "Компания",    type: "text",     validate: {required: true} },
      name:    { name: "name",    placeholder: "Имя",         type: "text",     validate: {required: true} },
      email:   { name: "email",   placeholder: "Email",       type: "email",    validate: {required: true} },
      phone:   { name: "phone",   placeholder: "Телефон",     type: "phone",    validate: {required: true} },
      text:    { name: "text",    placeholder: "Комментарий", type: "textarea", validate: {required: false} },

      submit:  { value: "Отправить", type: "submit" }
    }
  })
});

$('#container').append(form.render().el);