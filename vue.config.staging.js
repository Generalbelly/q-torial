module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Qtorial',
      googleAnalyticsScript: `<!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-71759040-1"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-71759040-1');
        </script>`,
      qTorialScript: '',
    },
  },
};
