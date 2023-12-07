module.exports = {
    format_date: date => {
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }
  };

  Handlebars.registerHelper('ifNotLoginPage', function(options) {
    if (!options.data.root.isLoginPage) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});