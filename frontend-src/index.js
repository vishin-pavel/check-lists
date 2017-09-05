import {View} from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import template from 'text-loader!./templates/test-module-template/template.html';
import './common/css/main.scss';

class AppView extends View {
  constructor ($el){
    super();
    this.$el = $el
    this.template = _.template(template)
  }
  render(){
    this.$el.append(this.template())
  }
}

let view = new AppView($('#app'))
view.render();