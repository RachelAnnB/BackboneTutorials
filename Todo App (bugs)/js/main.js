$(document).ready(function(){
    //HERE IS OUR COLLECTION
    var todoList = new TodoList();
    todoList.fetch();
    
    //HERE IS OUR VIEW
    var todoListView = new TodoListView({ model: todo });
    $("body").append(todoListView.render().$el);
});