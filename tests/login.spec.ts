import test, { BrowserContext, expect } from '@playwright/test';
import { BrowserContextConstructor } from '../utils/browserContextConstructor';
import { PageManager } from '../pages/pageManager.page';
import { USER_CREDENTIALS } from '../utils/envUtils';
import users from '../data/users.json';

test.describe('Login Tests', () => {

    let browserContextConstructor: BrowserContextConstructor;
    let userBrowser: BrowserContext;
    let userTab: PageManager;

  test.beforeAll(async ({ browser }) => {
    browserContextConstructor = new BrowserContextConstructor(browser);
    userBrowser = await browserContextConstructor.createUserBrowserWindow();
    userTab = await browserContextConstructor.createNewTabInBrowserWindow(userBrowser);
  });    

  test.beforeEach(async ({  }) => {
    await userTab.Login().loginToInvoiceNinja();
  });

test.afterEach(async () => {
  if (test.info().status === 'failed') {
      if (userBrowser) {
          for (const page of userBrowser.pages()) {
             await test.info().attach("Failure Screenshot", { body: await page.screenshot(), contentType: 'image/png' });
          }
      }
   }
    await userTab.Login().logOutUser();
});

  test.afterAll(async ({  }) => {
    if (userBrowser) {
      await userBrowser.close();
    }
  });

  test.only('Validar login con usuario admin', {
    tag: ['@smoke', '@login', '@admin']
  }, async () => {
      await test.step('Validar login con usuario admin', async () => {
          await expect(userTab.page).toHaveURL(/.*dashboard/);
      });
      await test.step('asdsadsad', async () => {

      });
    }
  );
});