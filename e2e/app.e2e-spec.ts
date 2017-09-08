import { AngularStatePage } from './app.po';

describe('angular-state App', () => {
  let page: AngularStatePage;

  beforeEach(() => {
    page = new AngularStatePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
