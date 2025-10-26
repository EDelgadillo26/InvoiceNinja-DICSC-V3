import test, { BrowserContext, expect } from '@playwright/test';
import { BrowserContextConstructor } from '../../utils/browserContextConstructor';
import { PageManager } from '../../pages/pageManager.page';
import { DataGenerator } from '../../utils/dataGenerator';
import users from '../../data/users.json';

test.describe('Clientes Principal Page Tests', () => {

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

    test('IN-16: Admin > Clients > Crear Cliente con los campos minimos requeridos', {
      tag: ['@smoke', '@clients']
    }, async () => {
        let clientData = DataGenerator.generateClientData();
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
        await test.step('TearDown - Eliminar Cliente', async () => {
          await userTab.Clients().clickClientActionButton(clientData.company.name);
          await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
          await userTab.Clients().confirmPurgeClient();
          await userTab.Clients().isPurgeConfirmationTextVisible();
        });
      }
    );

    test('IN-23: Admin > Clients > Verificar que elimine un cliente archivado', {
      tag: ['@sanity', '@clients']
    }, async () => {
        let clientData = DataGenerator.generateClientData();
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
        await test.step('Archivar Cliente', async () => {
          await userTab.Clients().clickClientActionButton(clientData.company.name);
          await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Archive');
          await userTab.Clients().isArchiveConfirmationTextVisible();
          await userTab.page.reload();
        });
        await test.step('Habilitar lifecycle para ver todos los clientes', async () => {
          await userTab.Clients().clickLifecycleDropdownAndSelectAllOptions();
          await userTab.page.reload();
        });
        await test.step('Eliminar Cliente', async () => {
          await userTab.Clients().clickClientActionButton(clientData.company.name);
          await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
          await userTab.Clients().confirmPurgeClient();
          await userTab.Clients().isPurgeConfirmationTextVisible();
        });
      }
    );

    test('IN-10: Admin > Clients > Buscar Cliente por Nombre de Compañía', {
      tag: ['@smoke', '@clients']
    }, async () => {
        await test.step('Ir al modulo Clients', async () => {
          await userTab.BaseNavigationPage().clickClients();
        });
        await test.step('Filtrar por Nombre de Compañía', async () => {
          await userTab.Clients().typeInFilterInput('EnriqueCompany');
          expect(await userTab.Clients().isSpecificClientVisible('EnriqueCompany')).toBeTruthy();
        });
      }
    );

    test('IN-11: Admin > Clients > Verificar que busque un Cliente por Nombre de Cliente', {
      tag: ['@sanity', '@clients']
    }, async () => {
        await test.step('Ir al modulo Clients', async () => {
          await userTab.BaseNavigationPage().clickClients();
        });
        await test.step('Filtrar por Nombre/Apellido de Cliente', async () => {
          await userTab.Clients().typeInFilterInput('Delgadillo');
          expect(await userTab.Clients().isSpecificClientVisible('EnriqueCompany')).toBeTruthy();
        });
      }
    );

    test('IN-12: Admin > Clients > Verificar que busque un Cliente por Contact Email', {
      tag: ['@sanity', '@clients']
    }, async () => {
        await test.step('Ir al modulo Clients', async () => {
          await userTab.BaseNavigationPage().clickClients();
        });
        await test.step('Filtrar por Nombre de Compañía', async () => {
          await userTab.Clients().typeInFilterInput('EDelgadillo2002@gmail.com');
          expect(await userTab.Clients().isSpecificClientVisible('EnriqueCompany')).toBeTruthy();
        });
      }
    );
  
    test('IN-2: Admin > Clients > Verificar que se muestren las columnas por defecto en la Tabla de Clientes', {
      tag: ['@smoke', '@clients']
    }, async () => {
        await test.step('Ir al modulo Clients', async () => {
          await userTab.BaseNavigationPage().clickClients();
        });
        await test.step('Validar las columnas por defecto', async () => {
          const expectedHeaders = [
            '',
            'Name',
            'Contact Email',
            'ID Number',
            'Balance',
            'Paid to Date',
            'Date Created',
            'Last Login',
            'Website',
            ''
          ];
          const visibleColumns = await userTab.Clients().getAllColumnsName();
          expect(visibleColumns).toEqual(expect.arrayContaining(expectedHeaders));
        });
      }
    );

    test('IN-21: Admin > Clients > Actions > Verificar que archive un cliente', {
      tag: ['@smoke', '@clients']
    }, async () => {
        let clientData = DataGenerator.generateClientData();
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
        await test.step('Archivar Cliente', async () => {
          await userTab.Clients().clickClientActionButton(clientData.company.name);
          await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Archive');
          await userTab.Clients().isArchiveConfirmationTextVisible();
          await userTab.page.reload();
        });
        await test.step('Habilitar lifecycle para ver todos los clientes', async () => {
          await userTab.Clients().clickLifecycleDropdownAndSelectAllOptions();
          await userTab.page.reload();
        });
        await test.step('Eliminar Cliente', async () => {
          await userTab.Clients().clickClientActionButton(clientData.company.name);
          await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
          await userTab.Clients().confirmPurgeClient();
          await userTab.Clients().isPurgeConfirmationTextVisible();
        });
      }
    );

    test('IN-22: Admin > Clients > Verificar que restaure un cliente archivado', {
      tag: ['@sanity', '@clients']
    }, async () => {
        let clientData = DataGenerator.generateClientData();
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
        await test.step('Archivar Cliente', async () => {
          await userTab.Clients().clickClientActionButton(clientData.company.name);
          await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Archive');
          await userTab.Clients().isArchiveConfirmationTextVisible();
          await userTab.page.reload();
        });
        await test.step('Habilitar lifecycle para ver todos los clientes', async () => {
          await userTab.Clients().clickLifecycleDropdownAndSelectAllOptions();
          await userTab.page.reload();
        });
        await test.step('Restaurar el cliente archivado', async () => {
          await userTab.Clients().clickClientActionButton(clientData.company.name);
          await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Restore');
          await userTab.Clients().isRestoreConfirmationTextVisible();
        });
        await test.step('Eliminar Cliente', async () => {
          await userTab.Clients().clickClientActionButton(clientData.company.name);
          await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
          await userTab.Clients().confirmPurgeClient();
          await userTab.Clients().isPurgeConfirmationTextVisible();
        });
      }
    );

    test('IN-145: Admin > Clients > Actions > Verificar que elimine un cliente activo', {
      tag: ['@smoke', '@clients']
    }, async () => {
        let clientData = DataGenerator.generateClientData();
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
        await test.step('Archivar Cliente', async () => {
          await userTab.Clients().clickClientActionButton(clientData.company.name);
          await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Delete');
          await userTab.Clients().isArchiveConfirmationTextVisible();
          await userTab.page.reload();
        });
        await test.step('Habilitar lifecycle para ver todos los clientes', async () => {
          await userTab.Clients().clickLifecycleDropdownAndSelectAllOptions();
          await userTab.page.reload();
        });
        await test.step('Tierdown - Purgar Cliente', async () => {
          await userTab.Clients().clickClientActionButton(clientData.company.name);
          await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
          await userTab.Clients().confirmPurgeClient();
          await userTab.Clients().isPurgeConfirmationTextVisible();
        });
      }
    );
    test('IN-147: Admin > Clients > Verificar que restaure un cliente eliminado', {
      tag: ['@sanity', '@clients']
    }, async () => {
        let clientData = DataGenerator.generateClientData();
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
        await test.step('Archivar Cliente', async () => {
          await userTab.Clients().clickClientActionButton(clientData.company.name);
          await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Delete');
          await userTab.Clients().isDeleteConfirmationTextVisible();
          await userTab.page.reload();
        });
        await test.step('Habilitar lifecycle para ver todos los clientes', async () => {
          await userTab.Clients().clickLifecycleDropdownAndSelectAllOptions();
          await userTab.page.reload();
        });
        await test.step('Restaurar el cliente archivado', async () => {
          await userTab.Clients().clickClientActionButton(clientData.company.name);
          await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Restore');
          await userTab.Clients().isRestoreConfirmationTextVisible();
        });
        await test.step('Eliminar Cliente', async () => {
          await userTab.Clients().clickClientActionButton(clientData.company.name);
          await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
          await userTab.Clients().confirmPurgeClient();
          await userTab.Clients().isPurgeConfirmationTextVisible();
        });
      }
    );

    test('IN-146: Admin > Clients > Actions > Verificar que purge un cliente', {
      tag: ['@sanity', '@clients']
    }, async () => {
        let clientData = DataGenerator.generateClientData();
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
        await test.step('Habilitar lifecycle para ver todos los clientes', async () => {
          await userTab.Clients().clickLifecycleDropdownAndSelectAllOptions();
          await userTab.page.reload();
        });
        await test.step('Teardown - Purgar Cliente', async () => {
          await userTab.Clients().clickClientActionButton(clientData.company.name);
          await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
          await userTab.Clients().confirmPurgeClient();
          await userTab.Clients().isPurgeConfirmationTextVisible();
        });
      }
    );
});