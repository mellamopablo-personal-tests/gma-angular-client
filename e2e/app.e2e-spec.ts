import { GmaClientPage } from './app.po';

describe('gma-client App', function() {
  let page: GmaClientPage;

  beforeEach(() => {
    page = new GmaClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
