const S3_URL = `https://s3.kki.ovh`;
const previews = [
  { 
    id: 'MusicPreview',
    callback: () => {
      const music = [
        [0, 'Electronic #1', `${S3_URL}/music/crusing_through_tokyo.wav`],
        [1, 'Electronic #2', `${S3_URL}/music/anxiety.wav`],
        [2, 'Electronic #3', `${S3_URL}/music/zona.wav`],
        [3, 'Piano #1', `${S3_URL}/music/piano.wav`],
      ]

      for (const track of music) {
        const [id, title, url] = track;
        if (!document.querySelector(`#music${id}`)) {
          const div = document.createElement('div');
          div.id = `music${id}`
          div.innerHTML = `<span>${title}</span><audio controls src='${url}' />`;
          document.querySelector('.previews').appendChild(div);
          
          const a = document.createElement('a');
          a.setAttribute('data-fslightbox', 'music');
          a.setAttribute('data-class', 'fslightbox-audio');
          a.setAttribute('href', `#music${id}`);
          div.appendChild(a);
        }
      }
      
      refreshFsLightbox();
      fsLightboxInstances['music'].open();

      // disable audio on slide change
      document.querySelectorAll('.fslightbox-slide-btn').forEach((b) => b.addEventListener('click', () => {
        document.querySelectorAll('audio').forEach((a) => a.pause());
      }));
    }
  },

  { 
    id: 'RacetrackPreview',
    callback: () => {
      const lightbox = new FsLightbox();
      lightbox.props.sources = [
        `${S3_URL}/previews/Racetrack1.png`, 
        `${S3_URL}/previews/Racetrack2.png`,
        `${S3_URL}/previews/Racetrack3.mp4`,
        `${S3_URL}/previews/Racetrack4.mp4`,
      ];
      lightbox.open();
    }
  },

  { 
    id: 'PdfPreview',
    callback: () => {
      window.open('https://resume.kki.ovh/templates/Resume.pdf', '_blank');
    }
  }
];

const redirectors = [
  {
    id: 'EmailRow',
    url: 'mailto:k.n.piskorski@gmail.com'
  },

  {
    id: 'PhoneRow',
    url: 'tel:+48666723089'
  },

  {
    id: 'GithubRow',
    url: 'https://github.com/atkki'
  },

  {
    id: 'ResumeRow',
    url: 'https://resume.kki.ovh'
  }
];

window.svgCustomLoadCallback = (svg, doc) => {
  for (const preview of previews) {
    const el = svg.querySelector(`#${preview.id}`);
    if (el) {
      el.classList.add('pointer');
      el.classList.add('preview-hover');

      el.querySelector('rect').classList.add('preview-hover-rect');
      el.querySelector('text').classList.add('preview-hover-text');
      el.onclick = () => {
        preview.callback();
      };

      if (preview.init)
        preview.init();
    }
  }

  for (const redirector of redirectors) {
    const el = svg.querySelector(`#${redirector.id}`);
    if (el) {
      el.classList.add('pointer');
      
      const a = doc.createElementNS('http://www.w3.org/2000/svg', 'a');
      a.setAttribute('href', redirector.url);
      a.setAttribute('target', '_blank');
      a.append(...el.childNodes);

      el.prepend(a);
    }
  }
};