# What is this?

This is a test app, based on nextjs, with multiple pages.

## Usage

 * start the `dev` server, using `npm run dev` - starts a server running at `http://localhost:8081`
 * start the Jest tests, using `npm run test-browser-w`


The browser tests are basically jest test scripts, which test the actual UI being rendered, and also use image snapshotting. When a new run of the test detects a difference in the pixels that have been rendered, it fails the test.

The tests run against the pages in this nextjs app. The pages of the app are found in the `/pages` folder. Each page should export a React component. Each page file should have a corresponding `.test.tsx` file, which tests the functionality of the page.

When running the `next` server via `npm run dev`, it starts the webserver at port `8081`. This is configured in the `"dev"` script - `"dev": "next -p 8081"`. If you want to change this, make sure you change it here, and also update the `PREFIX_URL` global variable in `jest.config.js`.

Each test file navigates to the corresponding page by doing `page.goto(PREFIX_URL)` - so the url is not hard-coded in tests, but can be changed at any time, as described above, without doing lots of changes.