var jsonUrl   = "/todos";

var todoRead = function(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";

  xhr.onload = function() {
    callback(xhr.response);
  };

  xhr.open("GET", url);
  xhr.send();
};

var todoComplete = function(url, comp) {
  var xhr   = new XMLHttpRequest;
  var data  = "isdone="+comp.checked;


  xhr.open("PATCH", url+"/"+comp.id);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(data);
};

var todoDelete = function(url, del) {
  var xhr = new XMLHttpRequest;

  xhr.open("DELETE", url+"/"+del.id);
  xhr.send();
};

var todoWrite = function(url, text) {
  var xhr   = new XMLHttpRequest;
  var data  = "todo="+text
            + "&isdone=false";

  xhr.open("POST", url);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(data);
};

var todoDisplay = function(block, todoList) {
  block.innerHTML = "";

  todoList.forEach(function(i) {
    block.innerHTML +=  "<div class='todo-entry' id='"+i.id+"'>\n"
                    +   "  <input type='checkbox' class='todo-comp' id='"+i.id+"' "+(i.isdone != "false" ? "checked" : "")+">\n"
                    +   "  <span class='todo-text'>"+i.todo+"</span>\n"
                    +   "  <button class='todo-delete' id='"+i.id+"'>Delete</button>\n"
                    +   "</div>\n";
  });

  var comps     = document.getElementsByClassName("todo-comp");
  var dels      = document.getElementsByClassName("todo-delete");

  for (var i = 0; i < comps.length; i++) {
    comps[i].addEventListener("change", function(event) {
      todoComplete(jsonUrl, event.target);
    });
  };

  for (var i = 0; i < dels.length; i++) {
    dels[i].addEventListener("click", function(event) {
      todoDelete(jsonUrl, event.target);

      todoRead(jsonUrl, function(todoList) {
        todoDisplay(block, todoList);
      });
    });
  };
};

window.onload = function() {
  var submit    = document.getElementById("submit-btn");
  var todoTable = document.getElementById("todo-table");

  todoRead(jsonUrl, function(todoList) {
    todoDisplay(todoTable, todoList);
  });

  submit.addEventListener("click", function() {
    var inputTodo = document.getElementById("input-form");

    todoWrite(jsonUrl, inputTodo.value);
    inputTodo.value = "";

    todoRead(jsonUrl, function(todoList) {
      todoDisplay(todoTable, todoList);
    });
  });
};
