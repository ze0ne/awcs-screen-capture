const puppeteer = require("puppeteer");
const fs = require('fs');

const website = "https://awcsdz.com";
const date = new Date();
const currentDate = `${date.getDate()}_${date.getMonth()}_${date.getFullYear()}_${date.getHours()}_${date.getMinutes()}`;
const rootPath = `screenshots/${currentDate}`;
fs.mkdirSync(`${rootPath}/all`, {recursive: true});


const pages = [
  {
    url: '',
    name: 'home'
  },
  {
    url: 'services',
    name: 'services'
  }
];
const devices = [
  {
    name: 'Desktop',
    width: 1920,
    height: 1080
  },
  {
    name: 'Laptop',
    width: 1366,
    height: 768
  },
  {
    name: 'Laptop 2',
    width: 1536,
    height: 864
  },
  {
    name: 'Mobile',
    width: 360,
    height: 800,
  },
  {
    name: 'Mobile 2',
    width: 390,
    height: 844,
  },
  {
    name: 'Mobile 3',
    width: 414,
    height: 896,
  },
];
const languages = ['en', 'fr', 'zh'];

const captureWithDevice = async (device) => {
  const deviceName = `${device.width}x${device.height}`
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  //await page.emulate(puppeteer.devices[device]);
  await page.setViewport({ width: device.width, height: device.height });

  for(let i = 0; i < languages.length; i++) {
    let url;
    const lang = languages[i];
    const path = `${rootPath}/${lang.toUpperCase()}/${deviceName}`;
    fs.mkdirSync(path, {recursive: true});
    for(let y = 0; y < pages.length; y++) {
      const currentPage = pages[y];
      if(lang === 'en') {
        url = `${website}/${currentPage.url}`;
      } else {
        url = `${website}/${lang}/${currentPage.url}`;
      }
      const imageName = `${currentPage.name}-${lang}-${deviceName}-${currentDate}.png`;
      await page.goto(url);
      await page.screenshot({path: `${path}/${imageName}`, fullPage: true});
      await page.screenshot({path: `${rootPath}/all/${imageName}`, fullPage: true});

      console.log(`[${deviceName}] (${lang.toUpperCase()}) ${currentPage.name} captured !`);
    }
  }

  await browser.close();
}

devices.forEach(device => {
  captureWithDevice(device);
});










