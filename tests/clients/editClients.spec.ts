import test, { BrowserContext, expect } from '@playwright/test';
import { BrowserContextConstructor } from '../../utils/browserContextConstructor';
import { PageManager } from '../../pages/pageManager.page';
import { DataGenerator } from '../../utils/dataGenerator';
import users from '../../data/users.json';

test.describe('Clients Edit Tests', () => {

    let browserContextConstructor: BrowserContextConstructor;
    let userBrowser: BrowserContext;
    let userTab: PageManager;
    let staticDataExist : boolean = false;

  test.beforeAll(async ({ browser }) => {
    browserContextConstructor = new BrowserContextConstructor(browser);
    userBrowser = await browserContextConstructor.createUserBrowserWindow();
    userTab = await browserContextConstructor.createNewTabInBrowserWindow(userBrowser);
  });

  test.beforeEach(async ({  }) => {
    await userTab.Login().loginToInvoiceNinja();

    if (!staticDataExist) {
      await userTab.BaseNavigationPage().clickClients();
      const existsClientStatic = await userTab.Clients().isSpecificClientVisible('EnriqueCompany');
      if (!existsClientStatic) {
        await userTab.Clients().clickNewClientButton();
        await userTab.CreateClients().fillNameField('EnriqueCompany');
        await userTab.CreateClients().fillFirstNameField('Enrique');
        await userTab.CreateClients().fillLastNameField('Delgadillo');
        await userTab.CreateClients().clickSaveButton();
        expect (userTab.CreateClients().isCreateConfirmationTextVisible()).toBeTruthy();
        await userTab.BaseNavigationPage().clickClients();
        await userTab.page.reload();
        staticDataExist = true;
      }
    }
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

    test('IN-31: Admin > Clients > New Client > Shipping Address > Verificar que el botón "Copy Billing" copie los datos de Billing Address a Shipping Address', {
      tag: ['@smoke', '@clients']
    }, async () => {
          let clientData = DataGenerator.generateClientData();
        await test.step('Ir al modulo Clients y hacer clic en "Nuevo Cliente"', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
        });
        await test.step('Ingresar datos en Address > Billing Address', async () => {
          await userTab.CreateClients().fillBillingAddress({
            street: clientData.billing.street,
            apt: clientData.billing.apt,
            city: clientData.billing.city,
            state: clientData.billing.state,
            postalCode: clientData.billing.postalCode
          });
        });
        await test.step('Copiar datos de Billing Address a Shipping Address', async () => {
          await userTab.CreateClients().clickAddressTab('Shipping Address');
          await userTab.CreateClients().clickCopyBillingButton();
        });
        await test.step('Validar que los Campos de Shipping Address se hayan copiado correctamente', async () => {
          expect(await userTab.CreateClients().getShippingStreetFieldValue()).toBe(clientData.billing.street);
          expect(await userTab.CreateClients().getShippingAptFieldValue()).toBe(clientData.billing.apt);
          expect(await userTab.CreateClients().getShippingCityFieldValue()).toBe(clientData.billing.city);
          expect(await userTab.CreateClients().getShippingStateFieldValue()).toBe(clientData.billing.state);
          expect(await userTab.CreateClients().getShippingPostalCodeFieldValue()).toBe(clientData.billing.postalCode);
        });
      }
    );

    test('IN-19: Admin > Clients > Verificar que edite un nombre del cliente', {
      tag: ['@smoke', '@clients']
    }, async () => {
          let clientData = DataGenerator.generateClientData();
          let clientData2 = DataGenerator.generateClientData();

        await test.step('Ir al modulo Clients y hacer clic en "Nuevo Cliente"', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
        });
        await test.step('Crear cliente con los datos mínimos requeridos', async () => {
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
            }
        });
        await test.step('Editar Cliente', async () => {
          await userTab.Clients().clickClientActionButton(clientData.company.name);
          await userTab.Clients().clickOnContextMenuEdit();
          await userTab.CreateClients().fillNameField(clientData2.company.name);
          expect(await userTab.CreateClients().getNameFieldValue()).toBe(clientData2.company.name);
          await userTab.CreateClients().clickSaveButton();
          expect (userTab.CreateClients().isEditConfirmationTextVisible()).toBeTruthy();
        });
        await test.step('Eliminar Cliente', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.page.reload();
          await userTab.Clients().clickClientActionButton(clientData2.company.name);
          await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
          await userTab.Clients().confirmPurgeClient();
          await userTab.Clients().isPurgeConfirmationTextVisible();
        });
      }
    );
});