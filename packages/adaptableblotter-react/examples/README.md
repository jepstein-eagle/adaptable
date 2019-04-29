# What is this?

This is a test app, based on nextjs, with multiple pages.

## Usage

 * start the `dev` server, using `npm run dev`
 * start the Jest tests, using `npm run test-browser-w`


The browser tests are basically jest test scripts, which test the actual UI being rendered, and also use image snapshotting. When a new run of the test detects a difference in the pixels that have been rendered, it fails the test.
The tests run against the pages in this nextjs app. The pages of the app are found in the `/pages` folder. Each page should export a React component. Each page file should have a corresponding `.test.tsx` file, which tests the functionality of the page.