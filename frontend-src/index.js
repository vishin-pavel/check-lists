import {View} from 'backbone';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import templateHeader from 'text-loader!./templates/templateHeader.html';
import templateTopMenu from 'text-loader!./templates/templateTopMenu.html';
import templateInformation from 'text-loader!./templates/templateInformation.html'
import './common/css/main.scss';
import './common/css/mixins.scss';
import './common/css/secondary.scss';
import './common/css/helpers/base.default.scss';
import './common/css/components/utilities.scss';
import './common/css/helpers/fonts.scss';
import './common/css/forms/dropdowns.scss'

// Въюха для хедера
class AppViewHeader extends View {
  constructor ($el){
    super();
      this.$el = $el;
      this.template = _.template(templateHeader)
  }
  render(){
    this.$el.append(this.template())
  }
}

let viewHeader = new AppViewHeader($('.header'));
viewHeader.render();

//Въюха для топ меню
class AppViewTopMenu extends View {
    constructor($el) {
        super();
        this.$el = $el;
        this.template = _.template(templateTopMenu)
    }

    render() {
        this.$el.append(this.template())
    }
}

let viewTopMenu = new AppViewTopMenu($('.top-menu'));
viewTopMenu.render();

//Въюха для блока информации
class AppViewInformation extends View {
    constructor($el) {
        super();
        this.$el = $el;
        this.template = _.template(templateInformation)
    }

    render() {
        this.$el.append(this.template())
    }
}
let viewInformation = new AppViewInformation($('.information'));
viewInformation.render();

