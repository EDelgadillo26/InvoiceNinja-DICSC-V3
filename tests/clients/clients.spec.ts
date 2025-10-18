import test, { BrowserContext, expect } from '@playwright/test';
import { BrowserContextConstructor } from '../../utils/browserContextConstructor';
import { PageManager } from '../../pages/pageManager.page';
import users from '../../data/users.json';

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

    test.only('IN-16: Admin > Clients > Crear Cliente con los compos minimos requeridos', {
      tag: ['@smoke', '@clients']
    }, async () => {
        await test.step('Ir al modulo Clients', async () => {
            test.expect(await userTab.BaseNavigationPage().isSidebarVisible()).toBeTruthy();
            await userTab.BaseNavigationPage().clickClients();
            
        });
      }
    );
      test('IN-270: Verificar login con usuario incorrecto', {
      tag: ['@smoke', '@clients']
    }, async () => {
        await test.step('Validar login con usuario admin', async () => {
            await expect(userTab.page).not.toHaveURL(/.*dashboard/);
        });
      }
    );
});