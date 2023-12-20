const Handlebars = require('handlebars');

module.exports = {
  format_date: date => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  },
  debug: function (context) {
    return new Handlebars.SafeString('<pre>' + JSON.stringify(context, null, 2) + '</pre>');
  },
  isCommentOwner: function (commentUserId, sessionUserId) {
    return commentUserId === sessionUserId;
  },
  isCommentOwner: function (commentUser, sessionUser) {
    console.log('commentUser:', commentUser);
    console.log('sessionUser:', sessionUser);
    return commentUser === sessionUser;
  },
};
