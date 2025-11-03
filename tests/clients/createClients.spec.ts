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

    test('IN-25: Admin > Clients > Verificar que permita crear cliente con 1 carácter en el campo Name', {
      tag: ['@clients', '@regression']
    }, async () => {
        let clientData = DataGenerator.generateClientData();
        const singleCharName = 'A';
        await test.step('Ir al modulo Clients y hacer clic en "Nuevo Cliente"', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
        });
        await test.step('Crear cliente con 1 carácter en el campo Name', async () => {
          await userTab.CreateClients().fillNameField(singleCharName);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().clickSaveButton();
        });
        await test.step('Verificar que el cliente se creó exitosamente', async () => {
          expect(await userTab.CreateClients().isCreateConfirmationTextVisible()).toBeTruthy();
          console.log(`Cliente creado exitosamente con 1 carácter: "${singleCharName}"`);
        });
        await test.step('Validar que el cliente aparece en la lista', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.page.reload();
          const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.contact.firstName);
          expect(existsClient).toBeTruthy();
        });
        await test.step('TearDown - Eliminar Cliente', async () => {
          await userTab.Clients().clickClientActionButton(clientData.contact.firstName);
          await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
          await userTab.Clients().confirmPurgeClient();
          await userTab.Clients().isPurgeConfirmationTextVisible();
        });
      }
    );

    test('IN-27: Admin > Clients > Verificar que permita crear cliente con 255 caracteres en el campo Name', {
      tag: ['@clients', '@regression']
    }, async () => {
        let clientData = DataGenerator.generateClientData();
        const maxCharName = 'A'.repeat(255);
        await test.step('Ir al modulo Clients y hacer clic en "Nuevo Cliente"', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
        });
        await test.step('Crear cliente con 255 caracteres en el campo Name', async () => {
          await userTab.CreateClients().fillNameField(maxCharName);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().clickSaveButton();
        });
        await test.step('Verificar que el cliente se creó exitosamente', async () => {
          expect(await userTab.CreateClients().isCreateConfirmationTextVisible()).toBeTruthy();
          console.log(`Cliente creado exitosamente con 255 caracteres: "${maxCharName.substring(0, 50)}..."`);
        });
        await test.step('Validar que el cliente aparece en la lista', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.page.reload();
          const existsClient = await userTab.Clients().isSpecificClientVisible('AAAAAAAAAAAAAAAAAAAAAAA');
          expect(existsClient).toBeTruthy();
        });
        await test.step('TearDown - Eliminar Cliente', async () => {
          await userTab.Clients().clickClientActionButton('AAAAAAAAAAAAAAAAAAAAAAA');
          await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
          await userTab.Clients().confirmPurgeClient();
          await userTab.Clients().isPurgeConfirmationTextVisible();
        });
      }
    );

    test('IN-28: Admin > Clients > Verificar que NO permita crear cliente con 256 caracteres en el campo Name', {
      tag: ['@regression', '@clients', '@negative']
    }, async () => {
        const clientData = DataGenerator.generateClientData();
        const exceedCharName = 'B'.repeat(256);
        let clientWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
          await userTab.CreateClients().fillNameField(exceedCharName);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().clickSaveButton();
          const wasCreated = await userTab.CreateClients().isCreateConfirmationTextVisible();
          if (wasCreated) {
            clientWasCreated = true;
            console.log('FALLO: El sistema permitió crear cliente con 256 caracteres');
          } else {
            console.log('CORRECTO: El sistema NO permitió crear cliente con 256 caracteres');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          // Limpieza - siempre ejecutar
          if (clientWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickClients();
              await userTab.page.reload();
              const existsClient = await userTab.Clients().isSpecificClientVisible('BBBBBBBBBBBBBBB');
              if (existsClient) {
                await userTab.Clients().clickClientActionButton('BBBBBBBBBBBBBBB');
                await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
                await userTab.Clients().confirmPurgeClient();
                await userTab.Clients().isPurgeConfirmationTextVisible();
                console.log('Cliente eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );

    test('IN-48: Admin > Clients > Verificar que permita crear cliente con 1 carácter en el campo Number', {
      tag: ['@clients', '@regression']
    }, async () => {
        let clientData = DataGenerator.generateClientData();
        const singleCharName = '1';
        await test.step('Ir al modulo Clients y hacer clic en "Nuevo Cliente"', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
        });
        await test.step('Crear cliente con 1 carácter en el campo Name', async () => {
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillNumberField(singleCharName);
          await userTab.CreateClients().clickSaveButton();
        });
        await test.step('Verificar que el cliente se creó exitosamente', async () => {
          expect(await userTab.CreateClients().isCreateConfirmationTextVisible()).toBeTruthy();
          console.log(`Cliente creado exitosamente con 1 carácter: "${singleCharName}"`);
        });
        await test.step('Validar que el cliente aparece en la lista', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.page.reload();
          const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
          expect(existsClient).toBeTruthy();
        });
        await test.step('TearDown - Eliminar Cliente', async () => {
          await userTab.Clients().clickClientActionButton(clientData.company.name);
          await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
          await userTab.Clients().confirmPurgeClient();
          await userTab.Clients().isPurgeConfirmationTextVisible();
        });
      });

    test('IN-49: Admin > Clients > Verificar que permita crear cliente con 20 caracteres en el campo Number', {
      tag: ['@regression', '@clients']
    }, async () => {
        let clientData = DataGenerator.generateClientData();
        const maxCharName = '1'.repeat(20);
        await test.step('Ir al modulo Clients y hacer clic en "Nuevo Cliente"', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
        });
        await test.step('Crear cliente con 255 caracteres en el campo Number', async () => {
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillNumberField(maxCharName);
          await userTab.CreateClients().clickSaveButton();
        });
        await test.step('Validar que el cliente aparece en la lista', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.page.reload();
          const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
          expect(existsClient).toBeTruthy();
        });
        await test.step('TearDown - Eliminar Cliente', async () => {
          await userTab.Clients().clickClientActionButton(clientData.company.name);
          await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
          await userTab.Clients().confirmPurgeClient();
          await userTab.Clients().isPurgeConfirmationTextVisible();
        });
      });

    test('IN-50: Admin > Clients > Verificar que NO permita crear cliente con 21 caracteres en el campo Number', {
      tag: ['@regression', '@clients', '@negative']
    }, async () => {
        const clientData = DataGenerator.generateClientData();
        const exceedCharName = '5'.repeat(21);
        let clientWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillNumberField(exceedCharName);
          await userTab.CreateClients().clickSaveButton();
          const wasCreated = await userTab.CreateClients().isCreateConfirmationTextVisible();
          if (wasCreated) {
            clientWasCreated = true;
            console.log('FALLO: El sistema permitió crear cliente con 21 caracteres');
          } else {
            console.log('CORRECTO: El sistema NO permitió crear cliente con 21 caracteres');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          if (clientWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickClients();
              await userTab.page.reload();
              const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
              if (existsClient) {
                await userTab.Clients().clickClientActionButton(clientData.company.name);
                await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
                await userTab.Clients().confirmPurgeClient();
                await userTab.Clients().isPurgeConfirmationTextVisible();
                console.log('Cliente eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );

    test('IN-51: Admin > Clients > Verificar que NO permita crear cliente con caracteres especiales en el campo Number', {
      tag: ['@regression', '@clients', '@negative']
    }, async () => {
         const clientData = DataGenerator.generateClientData();
        const exceedCharName = '!@#1';
        let clientWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillNumberField(exceedCharName);
          await userTab.CreateClients().clickSaveButton();
          const wasCreated = await userTab.CreateClients().isCreateConfirmationTextVisible();
          if (wasCreated) {
            clientWasCreated = true;
            console.log('FALLO: El sistema permitió crear cliente con caracteres especiales');
          } else {
            console.log('CORRECTO: El sistema NO permitió crear cliente con caracteres especiales');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          if (clientWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickClients();
              await userTab.page.reload();
              const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
              if (existsClient) {
                await userTab.Clients().clickClientActionButton(clientData.company.name);
                await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
                await userTab.Clients().confirmPurgeClient();
                await userTab.Clients().isPurgeConfirmationTextVisible();
                console.log('Cliente eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );

    test('IN-274: Admin > Clients > Verificar que NO permita crear cliente con caracteres alfabeticos en el campo Number', {
      tag: ['@regression', '@clients', '@negative']
    }, async () => {
         const clientData = DataGenerator.generateClientData();
        const exceedCharName = 'textoprueba';
        let clientWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillNumberField(exceedCharName);
          await userTab.CreateClients().clickSaveButton();
          const wasCreated = await userTab.CreateClients().isCreateConfirmationTextVisible();
          if (wasCreated) {
            clientWasCreated = true;
            console.log('FALLO: El sistema permitió crear cliente con caracteres especiales');
          } else {
            console.log('CORRECTO: El sistema NO permitió crear cliente con caracteres especiales');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          if (clientWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickClients();
              await userTab.page.reload();
              const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
              if (existsClient) {
                await userTab.Clients().clickClientActionButton(clientData.company.name);
                await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
                await userTab.Clients().confirmPurgeClient();
                await userTab.Clients().isPurgeConfirmationTextVisible();
                console.log('Cliente eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );

    test('IN-54: Admin > Clients > New Client > Validar que permita un campo ID Number con 1 carácter numerico', {
      tag: ['@clients', '@regression']
    }, async () => {
        let clientData = DataGenerator.generateClientData();
        const singleCharName = '1';
        await test.step('Ir al modulo Clients y hacer clic en "Nuevo Cliente"', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
        });
        await test.step('Crear cliente con 1 carácter en el campo IDNumber', async () => {
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillIdNumberField(singleCharName);
          await userTab.CreateClients().clickSaveButton();
        });
        await test.step('Verificar que el cliente se creó exitosamente', async () => {
          expect(await userTab.CreateClients().isCreateConfirmationTextVisible()).toBeTruthy();
          console.log(`Cliente creado exitosamente con 1 carácter: "${singleCharName}"`);
        });
        await test.step('Validar que el cliente aparece en la lista', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.page.reload();
          const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
          expect(existsClient).toBeTruthy();
        });
        await test.step('TearDown - Eliminar Cliente', async () => {
          await userTab.Clients().clickClientActionButton(clientData.company.name);
          await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
          await userTab.Clients().confirmPurgeClient();
          await userTab.Clients().isPurgeConfirmationTextVisible();
        });
      });

    test('IN-55: Admin > Clients > New Client > Validar que permita un campo ID Number con 20 caracteres numericos', {
      tag: ['@regression', '@clients']
    }, async () => {
        let clientData = DataGenerator.generateClientData();
        const maxCharName = '1'.repeat(20);
        await test.step('Ir al modulo Clients y hacer clic en "Nuevo Cliente"', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
        });
        await test.step('Crear cliente con 20 caracteres en el campo ID Number', async () => {
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillIdNumberField(maxCharName);
          await userTab.CreateClients().clickSaveButton();
        });
        await test.step('Validar que el cliente aparece en la lista', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.page.reload();
          const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
          expect(existsClient).toBeTruthy();
        });
        await test.step('TearDown - Eliminar Cliente', async () => {
          await userTab.Clients().clickClientActionButton(clientData.company.name);
          await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
          await userTab.Clients().confirmPurgeClient();
          await userTab.Clients().isPurgeConfirmationTextVisible();
        });
      });

    test('IN-56: Admin > Clients > New Client > Validar que NO permita un campo ID Number con 21 caracteres numericos', {
      tag: ['@regression', '@clients', '@negative']
    }, async () => {
        const clientData = DataGenerator.generateClientData();
        const exceedCharName = '5'.repeat(21);
        let clientWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillIdNumberField(exceedCharName);
          await userTab.CreateClients().clickSaveButton();
          const wasCreated = await userTab.CreateClients().isCreateConfirmationTextVisible();
          if (wasCreated) {
            clientWasCreated = true;
            console.log('FALLO: El sistema permitió crear cliente con 21 caracteres');
          } else {
            console.log('CORRECTO: El sistema NO permitió crear cliente con 21 caracteres');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          if (clientWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickClients();
              await userTab.page.reload();
              const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
              if (existsClient) {
                await userTab.Clients().clickClientActionButton(clientData.company.name);
                await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
                await userTab.Clients().confirmPurgeClient();
                await userTab.Clients().isPurgeConfirmationTextVisible();
                console.log('Cliente eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );

    test('IN-276: Admin > Clients > New Client > Validar que NO permita un campo ID Number con caracteres especiales', {
      tag: ['@regression', '@clients', '@negative']
    }, async () => {
         const clientData = DataGenerator.generateClientData();
        const exceedCharName = '!@#1';
        let clientWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillIdNumberField(exceedCharName);
          await userTab.CreateClients().clickSaveButton();
          const wasCreated = await userTab.CreateClients().isCreateConfirmationTextVisible();
          if (wasCreated) {
            clientWasCreated = true;
            console.log('FALLO: El sistema permitió crear cliente con caracteres especiales');
          } else {
            console.log('CORRECTO: El sistema NO permitió crear cliente con caracteres especiales');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          if (clientWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickClients();
              await userTab.page.reload();
              const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
              if (existsClient) {
                await userTab.Clients().clickClientActionButton(clientData.company.name);
                await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
                await userTab.Clients().confirmPurgeClient();
                await userTab.Clients().isPurgeConfirmationTextVisible();
                console.log('Cliente eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );

    test('IN-275: Admin > Clients > New Client > Validar que NO permita un campo ID Number con caracteres alfabeticos', {
      tag: ['@regression', '@clients', '@negative']
    }, async () => {
         const clientData = DataGenerator.generateClientData();
        const exceedCharName = 'textoprueba';
        let clientWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillIdNumberField(exceedCharName);
          await userTab.CreateClients().clickSaveButton();
          const wasCreated = await userTab.CreateClients().isCreateConfirmationTextVisible();
          if (wasCreated) {
            clientWasCreated = true;
            console.log('FALLO: El sistema permitió crear cliente con caracteres especiales');
          } else {
            console.log('CORRECTO: El sistema NO permitió crear cliente con caracteres especiales');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          if (clientWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickClients();
              await userTab.page.reload();
              const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
              if (existsClient) {
                await userTab.Clients().clickClientActionButton(clientData.company.name);
                await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
                await userTab.Clients().confirmPurgeClient();
                await userTab.Clients().isPurgeConfirmationTextVisible();
                console.log('Cliente eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );

    test('IN-57: Admin > Admin > Clients > New Client > Validar que permita un campo VAT Number con 1 carácter numerico', {
      tag: ['@clients', '@regression']
    }, async () => {
        let clientData = DataGenerator.generateClientData();
        const singleCharName = '1';
        await test.step('Ir al modulo Clients y hacer clic en "Nuevo Cliente"', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
        });
        await test.step('Crear cliente con 1 carácter en el campo VAT Number', async () => {
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillVatNumberField(singleCharName);
          await userTab.CreateClients().clickSaveButton();
        });
        await test.step('Verificar que el cliente se creó exitosamente', async () => {
          expect(await userTab.CreateClients().isCreateConfirmationTextVisible()).toBeTruthy();
          console.log(`Cliente creado exitosamente con 1 carácter: "${singleCharName}"`);
        });
        await test.step('Validar que el cliente aparece en la lista', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.page.reload();
          const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
          expect(existsClient).toBeTruthy();
        });
        await test.step('TearDown - Eliminar Cliente', async () => {
          await userTab.Clients().clickClientActionButton(clientData.company.name);
          await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
          await userTab.Clients().confirmPurgeClient();
          await userTab.Clients().isPurgeConfirmationTextVisible();
        });
      });

    test('IN-58: Admin > Clients > New Client > Validar que permita un campo VAT Number con 20 caracteres numericos', {
      tag: ['@regression', '@clients']
    }, async () => {
        let clientData = DataGenerator.generateClientData();
        const maxCharName = '1'.repeat(20);
        await test.step('Ir al modulo Clients y hacer clic en "Nuevo Cliente"', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
        });
        await test.step('Crear cliente con 20 caracteres en el campo VAT Number', async () => {
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillVatNumberField(maxCharName);
          await userTab.CreateClients().clickSaveButton();
        });
        await test.step('Validar que el cliente aparece en la lista', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.page.reload();
          const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
          expect(existsClient).toBeTruthy();
        });
        await test.step('TearDown - Eliminar Cliente', async () => {
          await userTab.Clients().clickClientActionButton(clientData.company.name);
          await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
          await userTab.Clients().confirmPurgeClient();
          await userTab.Clients().isPurgeConfirmationTextVisible();
        });
      });

    test('IN-59: Admin > Clients > New Client > Validar que NO permita un campo VAT Number con 21 caracteres numericos', {
      tag: ['@regression', '@clients', '@negative']
    }, async () => {
        const clientData = DataGenerator.generateClientData();
        const exceedCharName = '5'.repeat(21);
        let clientWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillVatNumberField(exceedCharName);
          await userTab.CreateClients().clickSaveButton();
          const wasCreated = await userTab.CreateClients().isCreateConfirmationTextVisible();
          if (wasCreated) {
            clientWasCreated = true;
            console.log('FALLO: El sistema permitió crear cliente con 21 caracteres');
          } else {
            console.log('CORRECTO: El sistema NO permitió crear cliente con 21 caracteres');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          if (clientWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickClients();
              await userTab.page.reload();
              const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
              if (existsClient) {
                await userTab.Clients().clickClientActionButton(clientData.company.name);
                await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
                await userTab.Clients().confirmPurgeClient();
                await userTab.Clients().isPurgeConfirmationTextVisible();
                console.log('Cliente eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );

    test('IN-277: Admin > Clients > New Client > Validar que NO permita un campo VAT Number con caracteres especiales', {
      tag: ['@regression', '@clients', '@negative']
    }, async () => {
         const clientData = DataGenerator.generateClientData();
        const exceedCharName = '!@#1';
        let clientWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillVatNumberField(exceedCharName);
          await userTab.CreateClients().clickSaveButton();
          const wasCreated = await userTab.CreateClients().isCreateConfirmationTextVisible();
          if (wasCreated) {
            clientWasCreated = true;
            console.log('FALLO: El sistema permitió crear cliente con caracteres especiales');
          } else {
            console.log('CORRECTO: El sistema NO permitió crear cliente con caracteres especiales');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          if (clientWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickClients();
              await userTab.page.reload();
              const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
              if (existsClient) {
                await userTab.Clients().clickClientActionButton(clientData.company.name);
                await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
                await userTab.Clients().confirmPurgeClient();
                await userTab.Clients().isPurgeConfirmationTextVisible();
                console.log('Cliente eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );

    test('IN-278: Admin > Clients > New Client > Validar que NO permita un campo VAT Number con caracteres alfabeticos', {
      tag: ['@regression', '@clients', '@negative']
    }, async () => {
         const clientData = DataGenerator.generateClientData();
        const exceedCharName = 'textoprueba';
        let clientWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillVatNumberField(exceedCharName);
          await userTab.CreateClients().clickSaveButton();
          const wasCreated = await userTab.CreateClients().isCreateConfirmationTextVisible();
          if (wasCreated) {
            clientWasCreated = true;
            console.log('FALLO: El sistema permitió crear cliente con caracteres especiales');
          } else {
            console.log('CORRECTO: El sistema NO permitió crear cliente con caracteres especiales');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          if (clientWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickClients();
              await userTab.page.reload();
              const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
              if (existsClient) {
                await userTab.Clients().clickClientActionButton(clientData.company.name);
                await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
                await userTab.Clients().confirmPurgeClient();
                await userTab.Clients().isPurgeConfirmationTextVisible();
                console.log('Cliente eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );

    test('IN-279: Admin > Clients > New Client > Validar que permita un campo Website con 1 carácter alfanumerico', {
      tag: ['@clients', '@regression']
    }, async () => {
        let clientData = DataGenerator.generateClientData();
        const singleCharName = 'i';
        await test.step('Ir al modulo Clients y hacer clic en "Nuevo Cliente"', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
        });
        await test.step('Crear cliente con 1 carácter en el campo Website', async () => {
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillWebsiteField(singleCharName);
          await userTab.CreateClients().clickSaveButton();
        });
        await test.step('Verificar que el cliente se creó exitosamente', async () => {
          expect(await userTab.CreateClients().isCreateConfirmationTextVisible()).toBeTruthy();
          console.log(`Cliente creado exitosamente con 1 carácter: "${singleCharName}"`);
        });
        await test.step('Validar que el cliente aparece en la lista', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.page.reload();
          const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
          expect(existsClient).toBeTruthy();
        });
        await test.step('TearDown - Eliminar Cliente', async () => {
          await userTab.Clients().clickClientActionButton(clientData.company.name);
          await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
          await userTab.Clients().confirmPurgeClient();
          await userTab.Clients().isPurgeConfirmationTextVisible();
        });
      });

    test('IN-280: Admin > Clients > New Client > Validar que permita un campo Website con 255 carácter alfanumerico', {
      tag: ['@regression', '@clients']
    }, async () => {
        let clientData = DataGenerator.generateClientData();
        const maxCharName = '1'.repeat(255);
        await test.step('Ir al modulo Clients y hacer clic en "Nuevo Cliente"', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
        });
        await test.step('Crear cliente con 255 caracteres en el campo Website', async () => {
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillWebsiteField(maxCharName);
          await userTab.CreateClients().clickSaveButton();
        });
        await test.step('Validar que el cliente aparece en la lista', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.page.reload();
          const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
          expect(existsClient).toBeTruthy();
        });
        await test.step('TearDown - Eliminar Cliente', async () => {
          await userTab.Clients().clickClientActionButton(clientData.company.name);
          await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
          await userTab.Clients().confirmPurgeClient();
          await userTab.Clients().isPurgeConfirmationTextVisible();
        });
      });

    test('IN-281: Admin > Clients > New Client > Validar que NO permita un campo Website con 256 caracteres numericos', {
      tag: ['@regression', '@clients', '@negative']
    }, async () => {
        const clientData = DataGenerator.generateClientData();
        const exceedCharName = '5'.repeat(256);
        let clientWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillWebsiteField(exceedCharName);
          await userTab.CreateClients().clickSaveButton();
          const wasCreated = await userTab.CreateClients().isCreateConfirmationTextVisible();
          if (wasCreated) {
            clientWasCreated = true;
            console.log('FALLO: El sistema permitió crear cliente con 256 caracteres');
          } else {
            console.log('CORRECTO: El sistema NO permitió crear cliente con 256 caracteres');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          if (clientWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickClients();
              await userTab.page.reload();
              const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
              if (existsClient) {
                await userTab.Clients().clickClientActionButton(clientData.company.name);
                await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
                await userTab.Clients().confirmPurgeClient();
                await userTab.Clients().isPurgeConfirmationTextVisible();
                console.log('Cliente eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );

    test('IN-282: Admin > Clients > New Client > Validar que NO permita un campo Website sin "www"', {
      tag: ['@regression', '@clients', '@negative']
    }, async () => {
         const clientData = DataGenerator.generateClientData();
        const exceedCharName = 'companyTest.com';
        let clientWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillWebsiteField(exceedCharName);
          await userTab.CreateClients().clickSaveButton();
          const wasCreated = await userTab.CreateClients().isCreateConfirmationTextVisible();
          if (wasCreated) {
            clientWasCreated = true;
            console.log('FALLO: El sistema permitió crear cliente con caracteres especiales');
          } else {
            console.log('CORRECTO: El sistema NO permitió crear cliente con caracteres especiales');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          if (clientWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickClients();
              await userTab.page.reload();
              const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
              if (existsClient) {
                await userTab.Clients().clickClientActionButton(clientData.company.name);
                await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
                await userTab.Clients().confirmPurgeClient();
                await userTab.Clients().isPurgeConfirmationTextVisible();
                console.log('Cliente eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );

    test('IN-64: Admin > Clients > New Client > Company Details > Validar que permita un campo Phone con 1 dígito', {
      tag: ['@clients', '@regression']
    }, async () => {
        let clientData = DataGenerator.generateClientData();
        const singleCharName = '1';
        await test.step('Ir al modulo Clients y hacer clic en "Nuevo Cliente"', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
        });
        await test.step('Crear cliente con 1 carácter en el campo Phone', async () => {
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillPhoneField(singleCharName);
          await userTab.CreateClients().clickSaveButton();
        });
        await test.step('Verificar que el cliente se creó exitosamente', async () => {
          expect(await userTab.CreateClients().isCreateConfirmationTextVisible()).toBeTruthy();
          console.log(`Cliente creado exitosamente con 1 carácter: "${singleCharName}"`);
        });
        await test.step('Validar que el cliente aparece en la lista', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.page.reload();
          const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
          expect(existsClient).toBeTruthy();
        });
        await test.step('TearDown - Eliminar Cliente', async () => {
          await userTab.Clients().clickClientActionButton(clientData.company.name);
          await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
          await userTab.Clients().confirmPurgeClient();
          await userTab.Clients().isPurgeConfirmationTextVisible();
        });
      });

    test('IN-65: Admin > Clients > New Client > Company Details > Validar que permita un campo Phone con 20 dígitos', {
      tag: ['@regression', '@clients']
    }, async () => {
        let clientData = DataGenerator.generateClientData();
        const maxCharName = '1'.repeat(20);
        await test.step('Ir al modulo Clients y hacer clic en "Nuevo Cliente"', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
        });
        await test.step('Crear cliente con 20 caracteres en el campo Phone', async () => {
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillPhoneField(maxCharName);
          await userTab.CreateClients().clickSaveButton();
        });
        await test.step('Validar que el cliente aparece en la lista', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.page.reload();
          const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
          expect(existsClient).toBeTruthy();
        });
        await test.step('TearDown - Eliminar Cliente', async () => {
          await userTab.Clients().clickClientActionButton(clientData.company.name);
          await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
          await userTab.Clients().confirmPurgeClient();
          await userTab.Clients().isPurgeConfirmationTextVisible();
        });
      });

    test('IN-66: Admin > Clients > New Client > Company Details > Validar que NO permita un campo Phone con 21 dígitos', {
      tag: ['@regression', '@clients', '@negative']
    }, async () => {
        const clientData = DataGenerator.generateClientData();
        const exceedCharName = '5'.repeat(21);
        let clientWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillPhoneField(exceedCharName);
          await userTab.CreateClients().clickSaveButton();
          const wasCreated = await userTab.CreateClients().isCreateConfirmationTextVisible();
          if (wasCreated) {
            clientWasCreated = true;
            console.log('FALLO: El sistema permitió crear cliente con 21 caracteres');
          } else {
            console.log('CORRECTO: El sistema NO permitió crear cliente con 21 caracteres');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          if (clientWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickClients();
              await userTab.page.reload();
              const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
              if (existsClient) {
                await userTab.Clients().clickClientActionButton(clientData.company.name);
                await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
                await userTab.Clients().confirmPurgeClient();
                await userTab.Clients().isPurgeConfirmationTextVisible();
                console.log('Cliente eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );

    test('IN-283: Admin > Clients > New Client > Validar que NO permita un campo Phone con caracteres especiales', {
      tag: ['@regression', '@clients', '@negative']
    }, async () => {
         const clientData = DataGenerator.generateClientData();
        const exceedCharName = '!@#1';
        let clientWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillPhoneField(exceedCharName);
          await userTab.CreateClients().clickSaveButton();
          const wasCreated = await userTab.CreateClients().isCreateConfirmationTextVisible();
          if (wasCreated) {
            clientWasCreated = true;
            console.log('FALLO: El sistema permitió crear cliente con caracteres especiales');
          } else {
            console.log('CORRECTO: El sistema NO permitió crear cliente con caracteres especiales');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          if (clientWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickClients();
              await userTab.page.reload();
              const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
              if (existsClient) {
                await userTab.Clients().clickClientActionButton(clientData.company.name);
                await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
                await userTab.Clients().confirmPurgeClient();
                await userTab.Clients().isPurgeConfirmationTextVisible();
                console.log('Cliente eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );

    test('IN-284: Admin > Clients > New Client > Validar que NO permita un campo Phone con caracteres alfabeticos', {
      tag: ['@regression', '@clients', '@negative']
    }, async () => {
         const clientData = DataGenerator.generateClientData();
        const exceedCharName = 'textoprueba';
        let clientWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillPhoneField(exceedCharName);
          await userTab.CreateClients().clickSaveButton();
          const wasCreated = await userTab.CreateClients().isCreateConfirmationTextVisible();
          if (wasCreated) {
            clientWasCreated = true;
            console.log('FALLO: El sistema permitió crear cliente con caracteres especiales');
          } else {
            console.log('CORRECTO: El sistema NO permitió crear cliente con caracteres especiales');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          if (clientWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickClients();
              await userTab.page.reload();
              const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
              if (existsClient) {
                await userTab.Clients().clickClientActionButton(clientData.company.name);
                await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
                await userTab.Clients().confirmPurgeClient();
                await userTab.Clients().isPurgeConfirmationTextVisible();
                console.log('Cliente eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );

    test('IN-66: Admin > Clients > New Client > Validar que permita un campo Routing ID con 1 digito', {
      tag: ['@clients', '@regression']
    }, async () => {
        let clientData = DataGenerator.generateClientData();
        const singleCharName = '1';
        await test.step('Ir al modulo Clients y hacer clic en "Nuevo Cliente"', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
        });
        await test.step('Crear cliente con 1 carácter en el campo Routing ID', async () => {
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillRoutingIdField(singleCharName);
          await userTab.CreateClients().clickSaveButton();
        });
        await test.step('Verificar que el cliente se creó exitosamente', async () => {
          expect(await userTab.CreateClients().isCreateConfirmationTextVisible()).toBeTruthy();
          console.log(`Cliente creado exitosamente con 1 carácter: "${singleCharName}"`);
        });
        await test.step('Validar que el cliente aparece en la lista', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.page.reload();
          const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
          expect(existsClient).toBeTruthy();
        });
        await test.step('TearDown - Eliminar Cliente', async () => {
          await userTab.Clients().clickClientActionButton(clientData.company.name);
          await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
          await userTab.Clients().confirmPurgeClient();
          await userTab.Clients().isPurgeConfirmationTextVisible();
        });
      });

    test('IN-69: Admin > Clients > New Client > Validar que permita un campo Routing ID con 20 dígitos', {
      tag: ['@regression', '@clients']
    }, async () => {
        let clientData = DataGenerator.generateClientData();
        const maxCharName = '1'.repeat(20);
        await test.step('Ir al modulo Clients y hacer clic en "Nuevo Cliente"', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
        });
        await test.step('Crear cliente con 20 caracteres en el campo Routing ID', async () => {
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillRoutingIdField(maxCharName);
          await userTab.CreateClients().clickSaveButton();
        });
        await test.step('Validar que el cliente aparece en la lista', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.page.reload();
          const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
          expect(existsClient).toBeTruthy();
        });
        await test.step('TearDown - Eliminar Cliente', async () => {
          await userTab.Clients().clickClientActionButton(clientData.company.name);
          await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
          await userTab.Clients().confirmPurgeClient();
          await userTab.Clients().isPurgeConfirmationTextVisible();
        });
      });

    test('IN-70: Admin > Clients > New Client > Validar que NO permita un campo Routing ID con 21 digitos', {
      tag: ['@regression', '@clients', '@negative']
    }, async () => {
        const clientData = DataGenerator.generateClientData();
        const exceedCharName = '5'.repeat(21);
        let clientWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillRoutingIdField(exceedCharName);
          await userTab.CreateClients().clickSaveButton();
          const wasCreated = await userTab.CreateClients().isCreateConfirmationTextVisible();
          if (wasCreated) {
            clientWasCreated = true;
            console.log('FALLO: El sistema permitió crear cliente con 21 caracteres');
          } else {
            console.log('CORRECTO: El sistema NO permitió crear cliente con 21 caracteres');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          if (clientWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickClients();
              await userTab.page.reload();
              const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
              if (existsClient) {
                await userTab.Clients().clickClientActionButton(clientData.company.name);
                await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
                await userTab.Clients().confirmPurgeClient();
                await userTab.Clients().isPurgeConfirmationTextVisible();
                console.log('Cliente eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );

    test('IN-71: Admin > Clients > New Client > Validar que NO permita un campo Routing ID con caracteres especiales', {
      tag: ['@regression', '@clients', '@negative']
    }, async () => {
         const clientData = DataGenerator.generateClientData();
        const exceedCharName = '!@#1';
        let clientWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillRoutingIdField(exceedCharName);
          await userTab.CreateClients().clickSaveButton();
          const wasCreated = await userTab.CreateClients().isCreateConfirmationTextVisible();
          if (wasCreated) {
            clientWasCreated = true;
            console.log('FALLO: El sistema permitió crear cliente con caracteres especiales');
          } else {
            console.log('CORRECTO: El sistema NO permitió crear cliente con caracteres especiales');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          if (clientWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickClients();
              await userTab.page.reload();
              const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
              if (existsClient) {
                await userTab.Clients().clickClientActionButton(clientData.company.name);
                await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
                await userTab.Clients().confirmPurgeClient();
                await userTab.Clients().isPurgeConfirmationTextVisible();
                console.log('Cliente eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );

    test('IN-285: Admin > Clients > New Client > Validar que NO permita un campo Routing ID con caracteres alfabeticos', {
      tag: ['@regression', '@clients', '@negative']
    }, async () => {
         const clientData = DataGenerator.generateClientData();
        const exceedCharName = 'textoprueba';
        let clientWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillRoutingIdField(exceedCharName);
          await userTab.CreateClients().clickSaveButton();
          const wasCreated = await userTab.CreateClients().isCreateConfirmationTextVisible();
          if (wasCreated) {
            clientWasCreated = true;
            console.log('FALLO: El sistema permitió crear cliente con caracteres especiales');
          } else {
            console.log('CORRECTO: El sistema NO permitió crear cliente con caracteres especiales');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          if (clientWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickClients();
              await userTab.page.reload();
              const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
              if (existsClient) {
                await userTab.Clients().clickClientActionButton(clientData.company.name);
                await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
                await userTab.Clients().confirmPurgeClient();
                await userTab.Clients().isPurgeConfirmationTextVisible();
                console.log('Cliente eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );

    test('IN-76: Admin > Clients > New Client > Validar que permita el campo Email con formato válido', {
      tag: ['@clients', '@regression']
    }, async () => {
        let clientData = DataGenerator.generateClientData();
        const singleCharName = 'pedroGad@gmail.com';
        await test.step('Ir al modulo Clients y hacer clic en "Nuevo Cliente"', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
        });
        await test.step('Crear cliente con 1 carácter en el campo Routing ID', async () => {
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillEmailField(singleCharName);
          await userTab.CreateClients().clickSaveButton();
        });
        await test.step('Verificar que el cliente se creó exitosamente', async () => {
          expect(await userTab.CreateClients().isCreateConfirmationTextVisible()).toBeTruthy();
          console.log(`Cliente creado exitosamente con 1 carácter: "${singleCharName}"`);
        });
        await test.step('Validar que el cliente aparece en la lista', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.page.reload();
          const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
          expect(existsClient).toBeTruthy();
        });
        await test.step('TearDown - Eliminar Cliente', async () => {
          await userTab.Clients().clickClientActionButton(clientData.company.name);
          await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
          await userTab.Clients().confirmPurgeClient();
          await userTab.Clients().isPurgeConfirmationTextVisible();
        });
      });

    test('IN-77: Admin > Clients > New Client > Validar que NO permita el campo Email con un correo sin "@"', {
      tag: ['@regression', '@clients', '@negative']
    }, async () => {
        const clientData = DataGenerator.generateClientData();
        const invalidEmail = 'pedroGadgmail.com';
        let clientWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillEmailField(invalidEmail);
          await userTab.CreateClients().clickSaveButton();
          const wasCreated = await userTab.CreateClients().isCreateConfirmationTextVisible();
          if (wasCreated) {
            clientWasCreated = true;
            console.log('FALLO: El sistema permitió crear cliente con un correo sin "@"');
          } else {
            console.log('CORRECTO: El sistema NO permitió crear cliente con un correo sin "@"');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          if (clientWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickClients();
              await userTab.page.reload();
              const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
              if (existsClient) {
                await userTab.Clients().clickClientActionButton(clientData.company.name);
                await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
                await userTab.Clients().confirmPurgeClient();
                await userTab.Clients().isPurgeConfirmationTextVisible();
                console.log('Cliente eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );

    test('IN-78: Admin > Clients > New Client > Validar que NO permita el campo Email con más de 255 caracteres', {
      tag: ['@regression', '@clients', '@negative']
    }, async () => {
         const clientData = DataGenerator.generateClientData();
        const exceedCharEmail = 'a'.repeat(256) + '@gmail.com';
        let clientWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillEmailField(exceedCharEmail);
          await userTab.CreateClients().clickSaveButton();
          const wasCreated = await userTab.CreateClients().isCreateConfirmationTextVisible();
          if (wasCreated) {
            clientWasCreated = true;
            console.log('FALLO: El sistema permitió crear cliente con mas de 255 caracteres');
          } else {
            console.log('CORRECTO: El sistema NO permitió crear cliente con mas de 255 caracteres');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          if (clientWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickClients();
              await userTab.page.reload();
              const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
              if (existsClient) {
                await userTab.Clients().clickClientActionButton(clientData.company.name);
                await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
                await userTab.Clients().confirmPurgeClient();
                await userTab.Clients().isPurgeConfirmationTextVisible();
                console.log('Cliente eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );

    test('IN-79: Admin > Clients > New Client > Validar que NO permita el campo Email con un correo con espacios', {
      tag: ['@regression', '@clients', '@negative']
    }, async () => {
         const clientData = DataGenerator.generateClientData();
        const invalidEmail = 'test email@gmail.com';
        let clientWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillEmailField(invalidEmail);
          await userTab.CreateClients().clickSaveButton();
          const wasCreated = await userTab.CreateClients().isCreateConfirmationTextVisible();
          if (wasCreated) {
            clientWasCreated = true;
            console.log('FALLO: El sistema permitió crear cliente con un correo con espacios');
          } else {
            console.log('CORRECTO: El sistema NO permitió crear cliente con un correo con espacios');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          if (clientWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickClients();
              await userTab.page.reload();
              const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
              if (existsClient) {
                await userTab.Clients().clickClientActionButton(clientData.company.name);
                await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
                await userTab.Clients().confirmPurgeClient();
                await userTab.Clients().isPurgeConfirmationTextVisible();
                console.log('Cliente eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );

    test('IN-80: Admin > Clients > New Client > Contacts > Validar que permita el campo Phone con 1 dígito', {
      tag: ['@clients', '@regression']
    }, async () => {
        let clientData = DataGenerator.generateClientData();
        const singleCharName = '1';
        await test.step('Ir al modulo Clients y hacer clic en "Nuevo Cliente"', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
        });
        await test.step('Crear cliente con 1 carácter en el campo Phone', async () => {
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillContactPhoneField(singleCharName);
          await userTab.CreateClients().clickSaveButton();
        });
        await test.step('Verificar que el cliente se creó exitosamente', async () => {
          expect(await userTab.CreateClients().isCreateConfirmationTextVisible()).toBeTruthy();
          console.log(`Cliente creado exitosamente con 1 carácter: "${singleCharName}"`);
        });
        await test.step('Validar que el cliente aparece en la lista', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.page.reload();
          const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
          expect(existsClient).toBeTruthy();
        });
        await test.step('TearDown - Eliminar Cliente', async () => {
          await userTab.Clients().clickClientActionButton(clientData.company.name);
          await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
          await userTab.Clients().confirmPurgeClient();
          await userTab.Clients().isPurgeConfirmationTextVisible();
        });
      });

    test('IN-81: Admin > Clients > New Client > Contacts > Validar que permita el campo Phone con 20 dígitos', {
      tag: ['@regression', '@clients']
    }, async () => {
        let clientData = DataGenerator.generateClientData();
        const maxCharName = '1'.repeat(20);
        await test.step('Ir al modulo Clients y hacer clic en "Nuevo Cliente"', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
        });
        await test.step('Crear cliente con 20 caracteres en el campo Phone', async () => {
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillContactPhoneField(maxCharName);
          await userTab.CreateClients().clickSaveButton();
        });
        await test.step('Validar que el cliente aparece en la lista', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.page.reload();
          const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
          expect(existsClient).toBeTruthy();
        });
        await test.step('TearDown - Eliminar Cliente', async () => {
          await userTab.Clients().clickClientActionButton(clientData.company.name);
          await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
          await userTab.Clients().confirmPurgeClient();
          await userTab.Clients().isPurgeConfirmationTextVisible();
        });
      });

    test('IN-82: Admin > Clients > New Client > Contacts > Validar que NO permita el campo Phone con 21 dígitos', {
      tag: ['@regression', '@clients', '@negative']
    }, async () => {
        const clientData = DataGenerator.generateClientData();
        const exceedCharName = '5'.repeat(21);
        let clientWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillContactPhoneField(exceedCharName);
          await userTab.CreateClients().clickSaveButton();
          const wasCreated = await userTab.CreateClients().isCreateConfirmationTextVisible();
          if (wasCreated) {
            clientWasCreated = true;
            console.log('FALLO: El sistema permitió crear cliente con 21 caracteres');
          } else {
            console.log('CORRECTO: El sistema NO permitió crear cliente con 21 caracteres');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          if (clientWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickClients();
              await userTab.page.reload();
              const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
              if (existsClient) {
                await userTab.Clients().clickClientActionButton(clientData.company.name);
                await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
                await userTab.Clients().confirmPurgeClient();
                await userTab.Clients().isPurgeConfirmationTextVisible();
                console.log('Cliente eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );

    test('IN-83: Admin > Clients > New Client > Contacts > Validar que NO permita el campo Phone con caracteres especiales', {
      tag: ['@regression', '@clients', '@negative']
    }, async () => {
         const clientData = DataGenerator.generateClientData();
        const exceedCharName = '!@#1';
        let clientWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillContactPhoneField(exceedCharName);
          await userTab.CreateClients().clickSaveButton();
          const wasCreated = await userTab.CreateClients().isCreateConfirmationTextVisible();
          if (wasCreated) {
            clientWasCreated = true;
            console.log('FALLO: El sistema permitió crear cliente con caracteres especiales');
          } else {
            console.log('CORRECTO: El sistema NO permitió crear cliente con caracteres especiales');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          if (clientWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickClients();
              await userTab.page.reload();
              const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
              if (existsClient) {
                await userTab.Clients().clickClientActionButton(clientData.company.name);
                await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
                await userTab.Clients().confirmPurgeClient();
                await userTab.Clients().isPurgeConfirmationTextVisible();
                console.log('Cliente eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );

    test('IN-286: Admin > Clients > New Client > Contacts > Validar que NO permita el campo Phone con caracteres alfabeticos', {
      tag: ['@regression', '@clients', '@negative']
    }, async () => {
         const clientData = DataGenerator.generateClientData();
        const exceedCharName = 'textoprueba';
        let clientWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillContactPhoneField(exceedCharName);
          await userTab.CreateClients().clickSaveButton();
          const wasCreated = await userTab.CreateClients().isCreateConfirmationTextVisible();
          if (wasCreated) {
            clientWasCreated = true;
            console.log('FALLO: El sistema permitió crear cliente con caracteres especiales');
          } else {
            console.log('CORRECTO: El sistema NO permitió crear cliente con caracteres especiales');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          if (clientWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickClients();
              await userTab.page.reload();
              const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
              if (existsClient) {
                await userTab.Clients().clickClientActionButton(clientData.company.name);
                await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
                await userTab.Clients().confirmPurgeClient();
                await userTab.Clients().isPurgeConfirmationTextVisible();
                console.log('Cliente eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );

    test('IN-84: Admin > Clients > New Client > Billing Address > Validar que permita el campo Billing Street con 1 carácter', {
      tag: ['@clients', '@regression']
    }, async () => {
        let clientData = DataGenerator.generateClientData();
        const singleCharName = 'i';
        await test.step('Ir al modulo Clients y hacer clic en "Nuevo Cliente"', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
        });
        await test.step('Crear cliente con 1 carácter en el campo Billing Street', async () => {
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillBillingStreetField(singleCharName);
          await userTab.CreateClients().clickSaveButton();
        });
        await test.step('Verificar que el cliente se creó exitosamente', async () => {
          expect(await userTab.CreateClients().isCreateConfirmationTextVisible()).toBeTruthy();
          console.log(`Cliente creado exitosamente con 1 carácter: "${singleCharName}"`);
        });
        await test.step('Validar que el cliente aparece en la lista', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.page.reload();
          const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
          expect(existsClient).toBeTruthy();
        });
        await test.step('TearDown - Eliminar Cliente', async () => {
          await userTab.Clients().clickClientActionButton(clientData.company.name);
          await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
          await userTab.Clients().confirmPurgeClient();
          await userTab.Clients().isPurgeConfirmationTextVisible();
        });
      });

    test('IN-85: Admin > Clients > New Client > Billing Address > Validar que permita el campo Billing Street con 255 caracteres', {
      tag: ['@regression', '@clients']
    }, async () => {
        let clientData = DataGenerator.generateClientData();
        const maxCharName = '1'.repeat(255);
        await test.step('Ir al modulo Clients y hacer clic en "Nuevo Cliente"', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
        });
        await test.step('Crear cliente con 255 caracteres en el campo Billing Street', async () => {
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillBillingStreetField(maxCharName);
          await userTab.CreateClients().clickSaveButton();
        });
        await test.step('Validar que el cliente aparece en la lista', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.page.reload();
          const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
          expect(existsClient).toBeTruthy();
        });
        await test.step('TearDown - Eliminar Cliente', async () => {
          await userTab.Clients().clickClientActionButton(clientData.company.name);
          await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
          await userTab.Clients().confirmPurgeClient();
          await userTab.Clients().isPurgeConfirmationTextVisible();
        });
      });

    test('IN-86: Admin > Clients > New Client > Billing Address > Validar que NO permita el campo Billing Street con 256 caracteres', {
      tag: ['@regression', '@clients', '@negative']
    }, async () => {
        const clientData = DataGenerator.generateClientData();
        const exceedCharName = '5'.repeat(256);
        let clientWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillBillingStreetField(exceedCharName);
          await userTab.CreateClients().clickSaveButton();
          const wasCreated = await userTab.CreateClients().isCreateConfirmationTextVisible();
          if (wasCreated) {
            clientWasCreated = true;
            console.log('FALLO: El sistema permitió crear cliente con 256 caracteres');
          } else {
            console.log('CORRECTO: El sistema NO permitió crear cliente con 256 caracteres');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          if (clientWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickClients();
              await userTab.page.reload();
              const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
              if (existsClient) {
                await userTab.Clients().clickClientActionButton(clientData.company.name);
                await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
                await userTab.Clients().confirmPurgeClient();
                await userTab.Clients().isPurgeConfirmationTextVisible();
                console.log('Cliente eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );

    test('IN-287: Admin > Clients > New Client > Billing Address > Validar que NO permita el campo Billing Street con SOLO caracteres especiales', {
      tag: ['@regression', '@clients', '@negative']
    }, async () => {
         const clientData = DataGenerator.generateClientData();
        const exceedCharName = '!@#$%^&*()_+';
        let clientWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillBillingStreetField(exceedCharName);
          await userTab.CreateClients().clickSaveButton();
          const wasCreated = await userTab.CreateClients().isCreateConfirmationTextVisible();
          if (wasCreated) {
            clientWasCreated = true;
            console.log('FALLO: El sistema permitió crear cliente con solo caracteres especiales');
          } else {
            console.log('CORRECTO: El sistema NO permitió crear cliente con solo caracteres especiales');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          if (clientWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickClients();
              await userTab.page.reload();
              const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
              if (existsClient) {
                await userTab.Clients().clickClientActionButton(clientData.company.name);
                await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
                await userTab.Clients().confirmPurgeClient();
                await userTab.Clients().isPurgeConfirmationTextVisible();
                console.log('Cliente eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );

    test('IN-87: Admin > Clients > New Client > Billing Address > Validar que permita el campo Apt/Suite con 1 carácter numerico', {
      tag: ['@clients', '@regression']
    }, async () => {
        let clientData = DataGenerator.generateClientData();
        const singleCharName = '1';
        await test.step('Ir al modulo Clients y hacer clic en "Nuevo Cliente"', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
        });
        await test.step('Crear cliente con 1 carácter en el campo Apt/Suite', async () => {
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillBillingAptField(singleCharName);
          await userTab.CreateClients().clickSaveButton();
        });
        await test.step('Verificar que el cliente se creó exitosamente', async () => {
          expect(await userTab.CreateClients().isCreateConfirmationTextVisible()).toBeTruthy();
          console.log(`Cliente creado exitosamente con 1 carácter: "${singleCharName}"`);
        });
        await test.step('Validar que el cliente aparece en la lista', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.page.reload();
          const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
          expect(existsClient).toBeTruthy();
        });
        await test.step('TearDown - Eliminar Cliente', async () => {
          await userTab.Clients().clickClientActionButton(clientData.company.name);
          await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
          await userTab.Clients().confirmPurgeClient();
          await userTab.Clients().isPurgeConfirmationTextVisible();
        });
      });

    test('IN-88: Admin > Clients > New Client > Billing Address > Validar que permita el campo Apt/Suite con 20 caracteres numéricos', {
      tag: ['@regression', '@clients']
    }, async () => {
        let clientData = DataGenerator.generateClientData();
        const maxCharName = '1'.repeat(20);
        await test.step('Ir al modulo Clients y hacer clic en "Nuevo Cliente"', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
        });
        await test.step('Crear cliente con 20 caracteres en el campo Apt/Suite', async () => {
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillBillingAptField(maxCharName);
          await userTab.CreateClients().clickSaveButton();
        });
        await test.step('Validar que el cliente aparece en la lista', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.page.reload();
          const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
          expect(existsClient).toBeTruthy();
        });
        await test.step('TearDown - Eliminar Cliente', async () => {
          await userTab.Clients().clickClientActionButton(clientData.company.name);
          await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
          await userTab.Clients().confirmPurgeClient();
          await userTab.Clients().isPurgeConfirmationTextVisible();
        });
      });

    test('IN-89: Admin > Clients > New Client > Billing Address > Validar que NO permita el campo Apt/Suite con 21 caracteres numéricos', {
      tag: ['@regression', '@clients', '@negative']
    }, async () => {
        const clientData = DataGenerator.generateClientData();
        const exceedCharName = '5'.repeat(21);
        let clientWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillBillingAptField(exceedCharName);
          await userTab.CreateClients().clickSaveButton();
          const wasCreated = await userTab.CreateClients().isCreateConfirmationTextVisible();
          if (wasCreated) {
            clientWasCreated = true;
            console.log('FALLO: El sistema permitió crear cliente con 21 caracteres');
          } else {
            console.log('CORRECTO: El sistema NO permitió crear cliente con 21 caracteres');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          if (clientWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickClients();
              await userTab.page.reload();
              const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
              if (existsClient) {
                await userTab.Clients().clickClientActionButton(clientData.company.name);
                await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
                await userTab.Clients().confirmPurgeClient();
                await userTab.Clients().isPurgeConfirmationTextVisible();
                console.log('Cliente eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );

    test('IN-90: Admin > Clients > New Client > Billing Address > Validar que NO permita el campo Apt/Suite con caracteres especiales', {
      tag: ['@regression', '@clients', '@negative']
    }, async () => {
         const clientData = DataGenerator.generateClientData();
        const exceedCharName = '!@#1';
        let clientWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillBillingAptField(exceedCharName);
          await userTab.CreateClients().clickSaveButton();
          const wasCreated = await userTab.CreateClients().isCreateConfirmationTextVisible();
          if (wasCreated) {
            clientWasCreated = true;
            console.log('FALLO: El sistema permitió crear cliente con caracteres especiales');
          } else {
            console.log('CORRECTO: El sistema NO permitió crear cliente con caracteres especiales');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          if (clientWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickClients();
              await userTab.page.reload();
              const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
              if (existsClient) {
                await userTab.Clients().clickClientActionButton(clientData.company.name);
                await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
                await userTab.Clients().confirmPurgeClient();
                await userTab.Clients().isPurgeConfirmationTextVisible();
                console.log('Cliente eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );

    test('IN-288: Admin > Clients > New Client > Validar que NO permita un campo Apt/Suite con caracteres alfabeticos', {
      tag: ['@regression', '@clients', '@negative']
    }, async () => {
         const clientData = DataGenerator.generateClientData();
        const exceedCharName = 'textoprueba';
        let clientWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillBillingAptField(exceedCharName);
          await userTab.CreateClients().clickSaveButton();
          const wasCreated = await userTab.CreateClients().isCreateConfirmationTextVisible();
          if (wasCreated) {
            clientWasCreated = true;
            console.log('FALLO: El sistema permitió crear cliente con caracteres alfabeticos');
          } else {
            console.log('CORRECTO: El sistema NO permitió crear cliente con caracteres alfabeticos');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          if (clientWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickClients();
              await userTab.page.reload();
              const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
              if (existsClient) {
                await userTab.Clients().clickClientActionButton(clientData.company.name);
                await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
                await userTab.Clients().confirmPurgeClient();
                await userTab.Clients().isPurgeConfirmationTextVisible();
                console.log('Cliente eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );

    test('IN-91: Admin > Clients > New Client > Billing Address > Validar que permita el campo City con 1 carácter', {
      tag: ['@clients', '@regression']
    }, async () => {
        let clientData = DataGenerator.generateClientData();
        const singleCharName = 'a';
        await test.step('Ir al modulo Clients y hacer clic en "Nuevo Cliente"', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
        });
        await test.step('Crear cliente con 1 carácter en el campo City', async () => {
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillBillingCityField(singleCharName);
          await userTab.CreateClients().clickSaveButton();
        });
        await test.step('Verificar que el cliente se creó exitosamente', async () => {
          expect(await userTab.CreateClients().isCreateConfirmationTextVisible()).toBeTruthy();
          console.log(`Cliente creado exitosamente con 1 carácter: "${singleCharName}"`);
        });
        await test.step('Validar que el cliente aparece en la lista', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.page.reload();
          const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
          expect(existsClient).toBeTruthy();
        });
        await test.step('TearDown - Eliminar Cliente', async () => {
          await userTab.Clients().clickClientActionButton(clientData.company.name);
          await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
          await userTab.Clients().confirmPurgeClient();
          await userTab.Clients().isPurgeConfirmationTextVisible();
        });
      });

    test('IN-92: Admin > Clients > New Client > Billing Address > Validar que permita el campo City con 255 caracteres', {
      tag: ['@regression', '@clients']
    }, async () => {
        let clientData = DataGenerator.generateClientData();
        const maxCharName = 'a'.repeat(255);
        await test.step('Ir al modulo Clients y hacer clic en "Nuevo Cliente"', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
        });
        await test.step('Crear cliente con 255 caracteres en el campo City', async () => {
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillBillingCityField(maxCharName);
          await userTab.CreateClients().clickSaveButton();
        });
        await test.step('Validar que el cliente aparece en la lista', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.page.reload();
          const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
          expect(existsClient).toBeTruthy();
        });
        await test.step('TearDown - Eliminar Cliente', async () => {
          await userTab.Clients().clickClientActionButton(clientData.company.name);
          await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
          await userTab.Clients().confirmPurgeClient();
          await userTab.Clients().isPurgeConfirmationTextVisible();
        });
      });

    test('IN-93: Admin > Clients > New Client > Billing Address > Validar que NO permita el campo City con 256 caracteres', {
      tag: ['@regression', '@clients', '@negative']
    }, async () => {
        const clientData = DataGenerator.generateClientData();
        const exceedCharName = 'a'.repeat(256);
        let clientWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillBillingStreetField(exceedCharName);
          await userTab.CreateClients().clickSaveButton();
          const wasCreated = await userTab.CreateClients().isCreateConfirmationTextVisible();
          if (wasCreated) {
            clientWasCreated = true;
            console.log('FALLO: El sistema permitió crear cliente con 256 caracteres');
          } else {
            console.log('CORRECTO: El sistema NO permitió crear cliente con 256 caracteres');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          if (clientWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickClients();
              await userTab.page.reload();
              const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
              if (existsClient) {
                await userTab.Clients().clickClientActionButton(clientData.company.name);
                await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
                await userTab.Clients().confirmPurgeClient();
                await userTab.Clients().isPurgeConfirmationTextVisible();
                console.log('Cliente eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );

    test('IN-289: Admin > Clients > New Client > Billing Address > Validar que NO permita el campo City con SOLO caracteres especiales', {
      tag: ['@regression', '@clients', '@negative']
    }, async () => {
         const clientData = DataGenerator.generateClientData();
        const exceedCharName = '!@#$%^&*()_+';
        let clientWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().fillBillingCityField(exceedCharName);
          await userTab.CreateClients().clickSaveButton();
          const wasCreated = await userTab.CreateClients().isCreateConfirmationTextVisible();
          if (wasCreated) {
            clientWasCreated = true;
            console.log('FALLO: El sistema permitió crear cliente con solo caracteres especiales');
          } else {
            console.log('CORRECTO: El sistema NO permitió crear cliente con solo caracteres especiales');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          if (clientWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickClients();
              await userTab.page.reload();
              const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
              if (existsClient) {
                await userTab.Clients().clickClientActionButton(clientData.company.name);
                await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
                await userTab.Clients().confirmPurgeClient();
                await userTab.Clients().isPurgeConfirmationTextVisible();
                console.log('Cliente eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );
});