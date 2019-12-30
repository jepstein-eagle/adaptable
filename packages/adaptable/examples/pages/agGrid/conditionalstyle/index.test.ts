const click = async el => await page.evaluate(el => el.click(), el);

const openConditionalStyles = async page => {
  const conditionalStyleButton = await page.evaluateHandle(
    () => document.querySelectorAll('.glyphicon.glyphicon-tint')[1].parentElement
  );

  await click(conditionalStyleButton);
  await page.waitFor(200);
};

describe('Conditional styling', () => {
  beforeAll(async () => {
    await page.goto(`${PREFIX_URL}/agGrid/conditionalstyle`);
  });

  it('should add a new style', async () => {
    await openConditionalStyles(page);

    let screen;
    // = await page.screenshot();
    // expect(screen).toMatchImageSnapshot();

    // click the new button
    await click(await page.$('.ab-style__modal-body__conditionalstyle__btn-new'));

    screen = await page.screenshot();
    expect(screen).toMatchImageSnapshot();

    // click the next button
    await click(await page.$('.ab-style__btn-wizardaction.btn-info'));

    // set the font to bold
    await click(await page.$('.ab-style__wizard-base input[value="Normal"]'));

    screen = await page.screenshot();
    expect(screen).toMatchImageSnapshot();

    // click the next button
    await click(await page.$('.ab-style__btn-wizardaction.btn-info'));

    // type something into the input

    let input = await page.evaluateHandle(() =>
      document.querySelector('input[placeholder="Select a column"]')
    );

    await input.focus();

    await page.keyboard.type('Employ');
    screen = await page.screenshot();
    expect(screen).toMatchImageSnapshot();

    // click the option to select the employee column
    await page.click(
      '.ab-style__wizard__conditionalstyle__querybuilder__conditionselector__columnselector li'
    );

    screen = await page.screenshot();
    expect(screen).toMatchImageSnapshot();

    input = await page.evaluateHandle(() => document.querySelector('input[placeholder="Search"]'));

    await input.focus();

    await page.keyboard.type('Michael');

    // click the first option
    await page.click(
      '.ab-style__wizard__conditionalstyle__querybuilder__conditionselector__querycolumnvalues__singlelistbox .list-group button'
    );

    screen = await page.screenshot();
    expect(screen).toMatchImageSnapshot();

    // click the next button
    await click(await page.$('.ab-style__btn-wizardaction.btn-info'));

    screen = await page.screenshot();
    expect(screen).toMatchImageSnapshot();

    // click the finish button
    await click(await page.$('.ab-style__btn-wizardaction.btn-primary'));

    screen = await page.screenshot();
    expect(screen).toMatchImageSnapshot();
  });

  it('should show predefined config and remove it when clicking delete', async () => {
    await page.reload();

    let screen = await page.screenshot();

    expect(screen).toMatchImageSnapshot();

    await openConditionalStyles(page);

    screen = await page.screenshot();
    expect(screen).toMatchImageSnapshot();

    await page.waitFor(200);

    // click the delete button
    await page.click('.ab-style__modal-body__conditionalstyle__btn-delete');
    await page.waitFor(100);

    // click on confirm delete button
    await page.click('.ab-style__popup-prompt__modal-footer__btn-confirm');
    await page.waitFor(100);

    screen = await page.screenshot();
    expect(screen).toMatchImageSnapshot();
  });
});
