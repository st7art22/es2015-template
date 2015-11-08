/**
 * Created by dmitry on 04.11.15.
 */

import Input from './input.js'

export default class Email extends Input {

  static get Model() {
    return EmailModel;
  }

}

class EmailModel extends Input.Model {

  get validateMethods() {
    return {
      required: value => {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(value);
      }
    }
  }
}