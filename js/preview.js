const S3_URL = `https://storage.waw.cloud.ovh.net/v1/AUTH_75018805baac4043a4941c0320cba1ba/kki`;
const previews = [
  { 
    id: 'MusicPreview',
    callback: () => {
      Swal.fire({
        title: 'Music preview',
        html: `
          <div class="audio-container">
            <div class="audio">
              <span>Electronic #1</span>
              <audio controls src="${S3_URL}/music/crusing_through_tokyo.wav" />
            </div>

            <div class="audio">
              <span>Electronic #2</span>
              <audio controls src="${S3_URL}/music/anxiety.wav" />
            </div>

            <div class="audio">
              <span>Electronic #3</span>
              <audio controls src="${S3_URL}/music/zona.wav" />
            </div>

            <div class="audio">
              <span>Piano #1</span>
              <audio controls src="${S3_URL}/music/piano.wav" />
            </div>
          </div>
        `
      });
    }
  }
];

window.svgCustomLoadCallback = (svg) => {
  for (const preview of previews) {
    const el = svg.querySelector(`#${preview.id}`);
    if (el) {
      el.classList.add('preview-hover');
      el.querySelector('rect').classList.add('preview-hover-rect');
      el.querySelector('text').classList.add('preview-hover-text');
      el.onclick = () => {
        preview.callback();
      };
    }
  }
};