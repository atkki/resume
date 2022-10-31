const loadSVGStyles = () => {
  document.querySelectorAll('object').forEach(async (object) => {
    const { contentDocument } = object;
    const svg = contentDocument.querySelector('svg');
    if (svg && !contentDocument.querySelector('style')) {
      const style = contentDocument.createElementNS('http://www.w3.org/2000/svg', 'style');
      style.innerHTML = '@import url("../css/svg.css")';
      svg.prepend(style);

      svg.querySelectorAll('tspan').forEach((tspan) => {
        tspan.innerHTML = tspan.innerHTML.replace('\u2028', ''); // new line from figma
      });

      if (typeof window.svgCustomLoadCallback === 'function') {
        window.svgCustomLoadCallback(svg, contentDocument);
      }
    }
  });
};
setInterval(loadSVGStyles, 100); // no better way to do this while svg reloading

window.onload = () => loadSVGStyles();

let previousState = isMobile();
window.onresize = async () => {
  if (isMobile() !== previousState) {
    previousState = isMobile();

    aside.data = `templates/Aside${getMobileFlag()}.svg`;
    content.data = `templates/Content${getMobileFlag()}.svg`; 
    loadSVGStyles();
  }
};

const aside = document.createElement('object');
aside.type = 'image/svg+xml';
aside.data = `templates/Aside${getMobileFlag()}.svg`;
document.querySelector('.aside').appendChild(aside);

const content = document.createElement('object');
content.type = 'image/svg+xml';
content.data = `templates/Content${getMobileFlag()}.svg`;
document.querySelector('.content').appendChild(content);