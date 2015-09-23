var Message = Backbone.Model.extend({
  url: "/board/msgs/" + $('#boardname').text()
});

var Messages = Backbone.Collection.extend({

  model: Message,
  url: "/board/msgs/" + $('#boardname').text(),

  loadMessages: function() {
    console.log(this.url);
    this.fetch({data: {order: '-created_At'}});
  }
});

var MessageView = Backbone.View.extend({

  initialize: function() {
    this.listenTo(this.model, "change", this.render);
  },

  template: _.template('<div class="message"><%=User.username %>: <%=text %>'),

  render: function() {
    console.log(this.model.attributes);
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }
});

var MessagesView = Backbone.View.extend({

  el: '.messages',

  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
    this.onscreenMessages = {};
  },

  render: function() {
    this.collection.forEach(this.renderMessage, this);
  },

  renderMessage: function(message) {
    if (!this.onscreenMessages[message.get('id')]) {
      var messageView = new MessageView({model: message});
      this.$el.prepend(messageView.render());
      this.onscreenMessages[message.get('id')] = true;
    }
  }
});

$(function() {
  var messages = new Messages();
  var messagesView = new MessagesView({collection: messages});
  setInterval(messages.loadMessages.bind(messages), 1000);
  messages.loadMessages();
});
