/**
 * Created by dmitry on 04.11.15.
 */

import Input from './input.js'

export default class Textarea extends Input {

  get template() {
    return _.template($('#textarea').html());
  }

}