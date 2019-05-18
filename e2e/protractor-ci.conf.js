const config = require('./protractor.conf').config;
const puppeteer = require('puppeteer');

config.capabilities = {
  allScriptsTimeout: 11000,
  browserName: 'chrome',
  'chromeOptions': {
    args: [
      '--no-sandbox',
      '--headless',
      '--disable-gpu'
    ]
  },
  binary: puppeteer.executablePath()
};

config.baseUrl = 'http://testserver:4200';
config.directConnect = true;
config.useAllAngular2AppRoots = true;
exports.config = config;

