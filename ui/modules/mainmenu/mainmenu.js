import tp_menu from './_mainmenu.html';

class Menu extends Backbone.Model {
    defaults(){
        return {
            href:"#",
            icon:'la-chain',
            text:"New Menu",
            has_badge:false
        }
    }
}

class MenuList extends Backbone.Collection {
    initialize(){
        this.model = Menu;
    }
}

class MenuView extends Backbone.View {
    initialize(){
        this.template = _.template(tp_menu)
        this.render();
    }
    
    bindEvents() {
        this.$el.on('click',(e) => {
            console.log($(e.currentTarget).data("module"));
        })
    }

    render() {
        this.$el = $(this.template(this.model.attributes))
        this.bindEvents();
        return this;
    }
}

class MenuListView extends Backbone.View{

    initialize(options) {
        this.el = options.targetEle;
        this.$el = $(this.el);
        this.menuList = new MenuList(options.menuData);

        this.listenTo(this.menuList,'add',() => {
            this.render();
        });

        this.render();

        console.log(this.el);
    }

    addMenu(attr) {
        this.menuList.add(new Menu(attr))
    }

    render() {
        this.menuList.each((model)=>{
            var menu = new MenuView({
                model:model
            });
            console.log(menu);
            this.$el.append(menu.render().$el);
        })
    }
}

export {MenuListView}
