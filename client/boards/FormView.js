var FormView = Backbone.View.extend({

  el: "#newBoardForm",

  events: {
    'submit': 'handleSubmit'
  },

  initialize: function() {
    console.log('init');
    console.log(this.el);
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var newBoardName = this.$('input[name=boardname]').val();
    this.$('input[name=boardname]').val('');
  }
});



// init after the DOM is finished loading
$(function() {
  var formView = new FormView();
});
