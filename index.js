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
    });

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
