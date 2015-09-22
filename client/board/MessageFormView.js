var MessageFormView = Backbone.View.extend({

  el: '#newMessageForm',

  events: {
    'submit': 'submitMsg'
  },

  submitMsg: function(e) {
    e.preventDefault();
    var msg = this.$('input[name=message]').val();
    this.$('input[name=message]').val('');
    var boardname = $('#boardname').text();
    $.post("/board/" + boardname, 
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
