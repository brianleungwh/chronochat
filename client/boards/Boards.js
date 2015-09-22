var Board = Backbone.Model.extend({
  url: "/boards/allboards",
  defaults: {
    boardname: ""
  }
});

var Boards = Backbone.Collection.extend({
  model: Board,

  url: "/boards/allboards",

  loadBoards: function() {
    this.fetch({data: {order: '-created_At' }});
  }

});

var BoardView = Backbone.View.extend({

  initialize: function() {
    this.listenTo(this.model, "change", this.render);
  },

  template: _.template('<div class="board"><%= boardname %></div>'),

  // el here is an empty div
  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }
});


var BoardsView = Backbone.View.extend({

  el: '.boards',

  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
    this.onscreenBoards = {};
    console.log(this.el);
  },

  render: function() {
    this.collection.forEach(this.renderBoard, this);
  },

  renderBoard: function(board) {
    if (!this.onscreenBoards[board.get('id')]) {
      var boardView = new BoardView({model: board});
      this.$el.prepend(boardView.render());
      this.onscreenBoards[board.get('id')] = true;
    }
  }
});

$(function() {
  console.log('called');
  var boards = new Boards();
  var boardsView = new BoardsView({collection: boards});
  boards.loadBoards();
});




