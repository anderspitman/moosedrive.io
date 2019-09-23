const config = {
  rootPath: '/',
  entriesLocation: 'http://localhost:9001/entries',
  //entriesLocation: 'https://anderspitman.net/entries',
};

const postMap = {
  'dependencies': '11',
  'rust': '10',
};

const HomeView = () => {
  const dom = document.createElement('div');
  dom.innerText = "Hi there";
  return dom;
};


const PostView = (postUrl) => {
  const dom = document.createElement('div');

  const contentPromise = fetch(postUrl + '/entry.md')
    .then(result => result.text());
  const manfsPromise = fetch(postUrl + '/manfs.json')
    .then(result => result.json());

  const promise = Promise.all([contentPromise, manfsPromise])
    .then(([content, manfs]) => {
      console.log(manfs);

      const meta = manfs.appData;

      const title = document.createElement('div');
      title.classList.add('post__title');
      title.innerText = meta.title;
      dom.appendChild(title);

      const postContent = document.createElement('div');
      postContent.innerHTML = marked(content);
      dom.appendChild(postContent);

      dom.appendChild(MooseDriveAdView());
    });

  return dom;
};


const MooseDriveAdView = () => {
  const dom = document.createElement('div');
  dom.classList.add('moosedrive-ad');

  const adHtml = `
    <p class='moosedrive-ad__text'>
      MooseDrive is rethinking data storage, sharing, and publishing. We're
      planning to launch our closed beta soon. Join the newsletter to reserve
      your spot.  <a href='https://moosedrive.io/' target='_blank'>Learn
      more.</a>
    </p>
  `;

  const adText = document.createElement('div');
  adText.innerHTML = adHtml;
  dom.appendChild(adText);

  dom.appendChild(NewsletterSignupView());
  return dom;
};


const NewsletterSignupView = () => {
  const dom = document.createElement('div');
  dom.innerHTML = `
    <!-- Begin Mailchimp Signup Form -->
    <link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css">
    <style type="text/css">
    	#mc_embed_signup{background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif; }
    	/* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.
    	   We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
    </style>
    <div id="mc_embed_signup">
    <form action="https://gmail.us20.list-manage.com/subscribe/post?u=0c3ecbf40cf99a4c67c9e9659&amp;id=fa94738cc3" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
        <div id="mc_embed_signup_scroll">
    	<h2>Subscribe</h2>
    <div class="indicates-required"><span class="asterisk">*</span> indicates required</div>
    <div class="mc-field-group">
    	<label for="mce-EMAIL">Email Address  <span class="asterisk">*</span>
    </label>
    	<input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL">
    </div>
    	<div id="mce-responses" class="clear">
    		<div class="response" id="mce-error-response" style="display:none"></div>
    		<div class="response" id="mce-success-response" style="display:none"></div>
    	</div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
        <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_0c3ecbf40cf99a4c67c9e9659_fa94738cc3" tabindex="-1" value=""></div>
        <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
        </div>
    </form>
    </div>
    <script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script><script type='text/javascript'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';}(jQuery));var $mcj = jQuery.noConflict(true);</script>
    <!--End mc_embed_signup-->
  `;
  return dom;
};

async function navigate() {
  const root = document.body;
  
  const oldContent = root.querySelector('.content');
  if (oldContent) {
    root.removeChild(oldContent);
  }

  const content = document.createElement('div');
  content.classList.add('content');
  root.appendChild(content);

  const pathName = window.location.pathname;

  if (window.location.pathname === config.rootPath) {
    content.appendChild(HomeView());
  }
  else if (window.location.pathname === config.rootPath + 'blog/') {
    content.innerText = "blog";
  }
  else if (pathName.startsWith(config.rootPath + 'blog/')) {
    const postName = pathName.split('/')[2];
    const postUrl = config.entriesLocation + '/' + postMap[postName];
    content.appendChild(PostView(postUrl));
  }
}

marked.setOptions({
  highlight: function(code, lang) {
    const highlighted = hljs.highlightAuto(code);
    //console.log(highlighted);
    return highlighted.value;
  },
});

navigate();
