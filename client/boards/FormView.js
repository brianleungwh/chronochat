var FormView = Backbone.View.extend({

  el: "#newBoardForm",

  events: {
    'submit': 'handleSubmit'
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var newBoardName = this.$('input[name=boardname]').val();
    this.$('input[name=boardname]').val('');

    $.post("/api/boards", 
    {
      boardname: newBoardName
    }, function(data) {
      console.log(data + " posted");
    });
  }
});



// init after the DOM is finished loading
$(function() {
  var formView = new FormView();
});
