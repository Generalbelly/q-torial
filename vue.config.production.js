module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Qtorial';
        args[0].googleAnalyticsScript = `<!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-162755793-1"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-162755793-1');
        </script>`;
        args[0].qTorialScript = `<script>(function(w,d,s,o,i,c){if(!w[o]){var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='https://storage.googleapis.com/client-000-b49aa.appspot.com/js/q-torial.js';j.onload=function(){w[o].init(i,c);};f.parentNode.insertBefore(j,f);}})(window,document,'script','Qtorial','HQaRn777j0SA7pmR61j0f74YwzJ3')</script>`;
        return args;
      });
  },
};
