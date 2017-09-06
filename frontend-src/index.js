import {View} from 'backbone';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import template from 'text-loader!./templates/test-module-template/template.html';
import './common/css/main.scss';
import './common/css/mixins.scss';
import './common/css/secondary.scss';
import './common/css/helpers/base.default.scss';
import './common/css/components/utilities.scss';
import './common/css/helpers/fonts.scss';

class AppView extends View {
  constructor ($el){
    super();
      this.$el = $el;
    this.template = _.template(template)
  }
  render(){
    this.$el.append(this.template())
  }
}

let view = new AppView($('.header'))
view.render();