const config = {
  rootPath: '/',
  entriesLocation: 'http://localhost:9001/entries',
  //entriesLocation: 'https://anderspitman.net/entries',
};

const routes = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Blog',
    path: '/blog/',
  },
];

const postConfig = [
  {
    routeName: 'dependencies',
    entryId: '11',
  },
];

const posts = [
];


const HomeView = () => {
  const dom = document.createElement('div');
  dom.classList.add('home');

  dom.innerHTML = `
    <p>
      MooseDrive is a <strong>data ownership</strong> company. Owning your data
      is about more than legal definitions of property. Ownership is about
      being able store, organize, view, listen to, stream, download, share,
      publish, move, back up, and delete your data in ways that are simple,
      intuitive, fast, flexible, and affordable.
    </p>

    <ul>
      <li>
        What if you could stream video from your Google Drive?
      </li>
      <li>
        What if you could easily take any file from your Google Drive or
        Dropbox, and host it on your website without ever having to copy it
        to your CMS?
      </li>
      <li>
        What if Google Drive WAS your CMS?
      </li>
      <li>
        What if you could store those files on a USB drive or extra smartphone
        plugged in at home, and still have them available publicly on the
        web for sharing and streaming?
      </li>
      <li>
        What if you could share private photo albums, notes, and even full web
        sites with specific people and groups, without them needing to sign up
        for yet another account?
      </li>
    </ul>

    <p>
      This is what we're building. There's a lot of work still left to do, but
      we're close to a useful beta product. Join the newsletter to stay in the
      loop. Exciting things are coming.
    </p>
  `;

  dom.appendChild(NewsletterSignupView());

  return dom;
};


const NavbarView = (routes) => {
  const dom = document.createElement('div');
  dom.classList.add('navbar');

  for (const route of routes) {
    dom.appendChild(NavbarLinkView(route));
  }

  return dom;
};


const NavbarLinkView = (route) => {
  const dom = document.createElement('span');
  dom.classList.add('navbar-link');

  const link = document.createElement('a');
  link.classList.add('navbar-link__link');

  link.setAttribute('href', route.path);
  link.addEventListener('click', (e) => {
    e.preventDefault();

    dom.dispatchEvent(new CustomEvent('route-clicked', {
      bubbles: true,
      detail: {
        route,
      },
    }));

  });
  link.innerText = route.name;
  dom.appendChild(link);

  return dom;
};


const BlogView = (posts) => {
  const dom = document.createElement('div');
  dom.classList.add('blog');

  const header = document.createElement('h1');
  header.innerText = "Posts";
  dom.appendChild(header);

  const list = document.createElement('ul');
  dom.appendChild(list);

  for (const post of posts) {
    const postEl = document.createElement('li');
    postEl.classList.add('post');
    const link = document.createElement('a');
    link.setAttribute('href', post.routeName + '/');
    link.innerText = `${post.title} | ${post.date}`;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      dom.dispatchEvent(new CustomEvent('route-clicked', {
        bubbles: true,
        detail: {
          route: {
            path: `/blog/${post.routeName}/`,
          },
        },
      }));
    });
    postEl.appendChild(link);
    list.appendChild(postEl);
  }

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

const root = document.createElement('div');
root.classList.add('root');
document.body.appendChild(root);



(async () => {

  const entriesResult = await fetch(config.entriesLocation + '/');
  const entries = await entriesResult.json();

  for (const post of postConfig) {
    const entry = entries.children[post.entryId];

    posts.push({
      routeName: post.routeName,
      title: entry.metadata.title,
      date: entry.metadata.date,
    });
  }

  const navbar = NavbarView(routes);
  root.appendChild(navbar);
  root.addEventListener('route-clicked', (e) => {
    window.history.pushState({}, "", e.detail.route.path);
    navigate();
  });

  marked.setOptions({
    highlight: function(code, lang) {
      const highlighted = hljs.highlightAuto(code);
      return highlighted.value;
    },
  });

  navigate();

  window.addEventListener('popstate', (e) => {
    navigate();
  });

})();


async function navigate() {
  
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
    content.appendChild(BlogView(posts));
  }
  else if (pathName.startsWith(config.rootPath + 'blog/')) {
    const postName = pathName.split('/')[2];

    let post;
    for (const conf of postConfig) {
      if (conf.routeName === postName) {
        post = conf;
      }
    }

    const postUrl = config.entriesLocation + '/' + post.entryId;
    content.appendChild(PostView(postUrl));
  }
}
