import {View} from 'backbone';
import {Model} from 'backbone';
import {Collection} from 'backbone';
import {Router} from 'backbone';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'c3';
import templateHeader from 'text-loader!./templates/templateHeader.html';
import templateTopMenu from 'text-loader!./templates/templateTopMenu.html';
import templateInformation from 'text-loader!./templates/templateInformation.html'
import templatePageContentHome from 'text-loader!./templates/templatePageContentHome.html'
import templateFooter from  'text-loader!./templates/templateFooter.html'
import templateCounters from 'text-loader!./templates/templateCounters.html'
import templateLastAdded from 'text-loader!./templates/templateLastAdded.html'
import './common/css/main.scss';
import './common/css/mixins.scss';
import './common/css/secondary.scss';
import './common/css/helpers/base.default.scss';
import './common/css/components/utilities.scss';
import './common/css/helpers/fonts.scss';
import './common/css/forms/dropdowns.scss'

class CounterModel extends Model {
    constructor() {
        super();
        this.set('counter', 0);
    }
}
class LastAddedModel extends Model {
    constructor(attributes, options) {
        super(attributes, options);
        this.defaults = {name: "-", developer: '-', date: "-", view: '-'};
    }
}

class LastAddedCollection extends Collection {
    constructor() {
        super();
        this.model = LastAddedModel;
    }

}
let Store = {
    counterSheet: new CounterModel(),
    counterCheking: new CounterModel(),
    lastAddedModel: new LastAddedModel(),
    lastAddedCollection: new LastAddedCollection(),

};

Store.lastAddedCollection.add([
    {name: "-", developer: '-', date: "-", view: '-'},
    {name: "1", developer: '2', date: "3", view: '4'},
    {name: "q", developer: 'w', date: "e", view: 'r'},
]);

class AppRouter extends Router {
    constructor() {
        super();
        this.routes = {
            'reg': 'register'
        }
    }

    register() {

    }
}


class ParentView extends View {
    constructor() {
        super();
        this.chiledViews = [];
    }

    renderChildes() {
        for (let i = 0; i < this.chiledViews.length; i++) {
            this.chiledViews[i].render();
        }
    };

    renderChildesAppend() {
        for (let i = 0; i < this.chiledViews.length; i++) {
            this.chiledViews[i].render();
            this.$el.append(this.chiledViews[i].$el)
        }
    }

    deleteChildes() {
        for (let i = 0; i < this.chiledViews.length; i++) {
            delete this.chiledViews[i];
        }
    };

    addChiledView(view) {
        this.chiledViews.push(view);
    }
}
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

//Вьюха для счетчика блока информации
class AppViewCounter extends View {
    constructor($el, model) {
        super();
        this.$el = $el;
        this.template = _.template(templateCounters);
        this._data = model;
        this._data.on('change', this.render, this)
    }

    render() {
        this.$el.html(this.template(this._data.attributes))
    }
}

//Въюха для блока информации
class AppViewInformation extends ParentView {
    constructor($el, store) {
        super();
        this.$el = $el;
        this.template = _.template(templateInformation);
        this.store = store;

    }

    render() {
        this.$el.html(this.template());
        this.deleteChildes();
        this.addChiledView(new AppViewCounter($('#counterSheet'), this.store.counterSheet));
        this.addChiledView(new AppViewCounter($('#counterCheking'), this.store.counterCheking));
        this.renderChildes();
    }
}
let viewInformation = new AppViewInformation($('.information'), Store);
viewInformation.render();

//Вьюха для блока последних добавленных листов
class AppViewLastAdded extends View {
    constructor(model) {
        super({
            className: 'col-md-4'
        });
        this.template = _.template(templateLastAdded);
        this._data = model;
        this._data.on('change', this.render, this)
    }

    render() {
        this.$el.html(this.template(this._data.attributes))
    }
}

class AppViewLastAddedCollection extends ParentView {
    constructor($el, store) {
        super();
        this.store = store;
        this.$el = $el;
    }

    render() {
        this.deleteChildes();
        for (let i = 0; i < this.store.lastAddedCollection.length; i++) {
            this.addChiledView(new AppViewLastAdded(this.store.lastAddedCollection.at(i)));
        }
        this.renderChildesAppend();
    }
}
class AppViewContentHome extends ParentView {
    constructor($el, store) {
        super();
        this.$el = $el;
        this.template = _.template(templatePageContentHome);
        this.store = store
    }

    render() {
        this.$el.html(this.template());
        this.deleteChildes();
        this.addChiledView(new AppViewLastAddedCollection($('.last-added'), this.store));
        this.renderChildes();
    }
}
let viewContentHome = new AppViewContentHome($('.page-content'), Store);
viewContentHome.render();
//Вьюха для блока контента
class AppViewPageContent extends ParentView {

}


//Вьюха для футера
class AppViewFooter extends View {
    constructor($el) {
        super();
        this.$el = $el;
        this.template = _.template(templateFooter)
    }
    render() {
        this.$el.append(this.template())
    }
}
let viewFooter = new AppViewFooter($('.cwt__footer'));
viewFooter.render();

Store.counterCheking.set('counter', 100);