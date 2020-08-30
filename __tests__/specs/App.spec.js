var expect = require('chai').expect;

describe('Fleetpanda login test', () => {
  beforeEach(() => {
    $('~app-root').waitForDisplayed(11000, false);
  });

  it('Valid Login Test', (async) => {
    $('~username').setValue('fleetpanda');
    $('~password').setValue('password');

    $('~login').click();

    $('~loginStatus').waitForDisplayed(11000);
    const status = $('~loginStatus').getText();
    expect(status).to.equal('success');
  });

  it('Invalid Login Test', (async) => {
    $('~username').setValue('facebook');
    $('~password').setValue('12345');

    $('~login').click();

    $('~loginStatus').waitForDisplayed(11000);
    const status = $('~loginStatus').getText();
    expect(status).to.equal('failure');
  });
});
