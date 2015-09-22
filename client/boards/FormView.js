var FormView = Backbone.View.extend({

  el: '#boardForm',

  events: {
    'submit #boardForm': 'handleSubmit'
  },

  handleSubmit: function(e) {
    e.preventDefault;
    console.log('called');
    console.log(this.$("#boardname"));
  }
});