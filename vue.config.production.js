module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Qtorial';
        args[0].googleAnalyticsScript = '';
        args[0].qTorialScript = `<script>(function(w,d,s,o,i,c){if(!w[o]){var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='https://storage.googleapis.com/client-000-b49aa.appspot.com/js/q-torial.js';j.onload=function(){w[o].init(i,c);};f.parentNode.insertBefore(j,f);}})(window,document,'script','Qtorial')</script>`;
        return args;
      });
  },
};
