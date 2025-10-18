import test, { BrowserContext, expect } from '@playwright/test';
import { BrowserContextConstructor } from '../../utils/browserContextConstructor';
import { PageManager } from '../../pages/pageManager.page';
import { DataGenerator } from '../../utils/dataGenerator';
import users from '../../data/users.json';

test.describe('Login Tests', () => {

    let browserContextConstructor: BrowserContextConstructor;
    let userBrowser: BrowserContext;
    let userTab: PageManager;
    let clientData = DataGenerator.generateClientData();

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
        await test.step('Ir al modulo Clients y hacer clic en "Nuevo Cliente"', async () => {
            await userTab.BaseNavigationPage().clickClients();
            await userTab.Clients().clickNewClientButton();
        });
        await test.step('Crear cliente con los datos mínimos requeridos', async () => {
            // const clientData = DataGenerator.generateClientData();            
            await userTab.CreateClients().fillNameField(clientData.company.name);
            await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
            await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
            await userTab.CreateClients().clickSaveButton();
            expect (userTab.CreateClients().isCreateConfirmationTextVisible()).toBeTruthy();
            await userTab.BaseNavigationPage().clickClients();
            await userTab.page.reload();
            const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
            if (!existsClient) {
              console.log(`Client ${clientData.company.name} was not found after creation.`, new Date());
              expect(existsClient).toBeTruthy();

            }else{
              expect(existsClient).toBeTruthy();
              await userTab.Clients().clickClientActionButton(clientData.company.name);
              await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
              await userTab.Clients().confirmPurgeClient();
              await userTab.Clients().isPurgeConfirmationTextVisible();
              console.log(`Client ${clientData.company.name} created and deleted successfully.`, new Date());
            }
        });
      }
    );

      test('IN-270: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', {
      tag: ['@smoke', '@clients']
    }, async () => {
        await test.step('Validar login con usuario admin', async () => {
            await expect(userTab.page).not.toHaveURL(/.*dashboard/);
        });
      }
    );
});