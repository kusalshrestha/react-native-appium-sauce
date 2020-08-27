/**UNUSED */
const dotenv = require('dotenv');
dotenv.config();

console.log("=====", process.env)
const wdio = require('webdriverio');
const wd = require('wd');

const assert = require('assert');

const opts = {
  path: '/wd/hub',
  port: 4723,
  capabilities: {
    platformName: 'Android',
    deviceName: 'Android Emulator',
    app: '/Users/kusalshrestha/Desktop/app-release.apk',
  },
};

// const opts = {
//   path: '/wd/hub',
//   port: 4723,
//   capabilities: {
//     platformName: "ios",
//     deviceName: "iPhone 11 Pro",
//     app: "/Users/kusalshrestha/Desktop/appium.ipa"
//   }
// };

async function main() {
  // const driver = wd.promiseChainRemote('localhost', 4723);
  // const x = await driver.init(opts.capabilities).setImplicitWaitTimeout(2000);

  const client = await wdio.remote(opts);

  const field = await client.$('android.view.ViewGroup'); //android.widget.EditText");android.widget.TextView
  const value = await field.getText();
  assert.equal(value, 'Hello World!');

  await client.deleteSession();
}

try {
  main();
} catch (err) {
  console.log('error', err);
}
