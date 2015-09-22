var MessageFormView = Backbone.View.extend({

  el: '#newMessageForm',

  events: {
    'submit': 'submitMsg'
  },

  submitMsg: function() {
    var msg = this.$el('input[name=message]').val();
    this.$el('input[name=message]').val('');
    $.post("/board", 
    {
      message: msg
    }, function(data) {
      console.log(data + ' posted');
    });
  }
});

$(function() {
  var messageFormView = new MessageFormView();
});
