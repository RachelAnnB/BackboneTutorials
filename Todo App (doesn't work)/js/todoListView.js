//THIS IS THE VIEW FOR THE TODO LIST COLLECTION
var todoListView = Backbone.View.extend({
  el: $("#todolistview"),
  
  statsTemplate: _.template($('#stats-template').html()),
  
  events: {
    "keypress #new-todo": "creatOnEnter",
    "click #clear-completed": "clearCompleted",
    "click #toggle-all": "toggleAllComplete"
  },
  
  initialize: function() {
    this.input = this.$('#new-todo');
    this.allCheckbox = this.$("toggle-all")[0];
    
    this.listenTo(Todos, 'add', this.addOne);
    this.listenTo(Todos, 'reset', this.addAll);
    this.listenTo(Todos, 'all', this.render);
    
    this.footer = this.$('footer');
    this.main = $('#main');
    
    Todos.fetch();
  },
  
  render: function() {
    var done = Todos.done().length;
    var remaining = Todos.remaining().length;
    
    if (Todos.length) {
      this.main.show();
      this.footer.show();
      this.footer.html(this.statsTemplate({done: done, remaining: remaining}));
    }
    else {
      this.main.hide();
      this.footer.hide();
    }
    
    this.allCheckbox.checked = !remaining;
  },
  
  addOne: function(todo) {
    var view = new TodoView({model: todo});
    this.$("#todo-list").append(view.render().el);
  },
  
  addAll: function() {
    Todos.each(this.addOne, this);
  },
  
  createOnEnter: function(e) {
    if (e.keyCode !=13) return;
    if (!this.input.val()) return;
    
    Todos.create({title: this.input.val()});
    this.input.val('');
  },
  
  clearCompleted: function() {
    _.invoke(Todos.done(), 'destroy');
    return false;
  },
  
  toggleAllComplete: function() {
    var done = this.allCheckbox.cheecked;
    Todos.each(function (todo) { todo.save({'done': done}); });
  }
  
});

var view = new TodoListView;