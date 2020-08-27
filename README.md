# react-native-appiumtest

A test project for testing the app using `Appium`.


## Run on local server
- clone the project and go to the project's dir.
- Install and start the appium server `appium`
- Checkout to the `localTest` branch
- `yarn`
- `yarn prepare-test`
- `yarn teste2e:android`

## Run on Saucelabs
- clone the project and go to the project's dir.
- Install and start the appium server `appium`
- On master branch, add `username` and `accessKey` from your saucelabs account to .env file
- `yarn`
- `yarn prepare-test`
- `yarn teste2e:android`
- Go to saucelabs dashboard to see the running test

### NOTE: you can change the test configuration from wdio.config file
