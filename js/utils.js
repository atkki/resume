sleep = ms => new Promise(r => setTimeout(r, ms));
isMobile = () => document.documentElement.clientWidth <= 1000;
getMobileFlag = () => isMobile() ? 'Mobile' : '';