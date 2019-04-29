
describe('Image snapshotting', () => {
  beforeAll(async () => {
    await page.goto(`${PREFIX_URL}`);
  });

  it('image snapshoting should work fine', async () => {
    await page.reload();
    
    expect(PREFIX_URL).toEqual('http://localhost:8081')

    expect(await page.screenshot()).toMatchImageSnapshot();

    const btn = await page.$('button')

    await btn.click()

    expect(await page.screenshot()).toMatchImageSnapshot();
  });
});
