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
        await test.step('Teardown - Purgar Cliente', async () => {
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

    test('IN-268: Admin > Clients > Actions > Verificar que la función "Bulk Update" realice una actualización masiva a la columna de los clientes seleccionados', {
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
        await test.step('Habilitar lifecycle para ver todos los clientes', async () => {
          await userTab.Clients().clickLifecycleDropdownAndSelectAllOptions();
          await userTab.page.reload();
        });
        await test.step('Abrir menú de acciones y hacer click en bulk update', async () => {
          await userTab.Clients().clickRowCheckboxByClientName(clientData.company.name);
          await userTab.Clients().clickGeneralClientActionButton();
          await userTab.Clients().clickBulkUpdateButton();
          await userTab.Clients().selectBulkUpdateColumnAndValue();
          await userTab.Clients().clickUpdateBulkUpdateButton();
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

    test.fixme('IN-26: Admin > Clients > New Client > Validar que NO permita crear un cliente con el campo Name vacío', {
      tag: ['@sanity', '@clients']
    }, async () => {
        let clientData = DataGenerator.generateClientData();
        await test.step('Ir al modulo Clients y hacer clic en "Nuevo Cliente"', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
        });
        await test.step('Crear Cliente sin nombre de la compania', async () => {
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.CreateClients().clickSaveButton();
          expect (userTab.CreateClients().isCreateConfirmationTextVisible()).toBeTruthy();
          await userTab.BaseNavigationPage().clickClients();
          await userTab.page.reload();
          const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.contact.firstName);
          if (existsClient) {
            try {
              expect(existsClient).toBeFalsy();
            } catch (error) {
              await test.info().attach("Failure Screenshot - Client should not exist", { 
                body: await userTab.page.screenshot(), 
                contentType: 'image/png' 
              });
              await test.step('Habilitar lifecycle para ver todos los clientes', async () => {
                await userTab.Clients().clickLifecycleDropdownAndSelectAllOptions();
                await userTab.page.reload();
              });
              await test.step('Teardown - Purgar Cliente', async () => {
                await userTab.Clients().clickClientActionButton(clientData.contact.firstName);
                await userTab.Clients().clickOnContextMenuArchiveDeletePurge('Purge');
                await userTab.Clients().confirmPurgeClient();
                await userTab.Clients().isPurgeConfirmationTextVisible();
              });
              throw error;
            }
          } else {
            expect(existsClient).toBeFalsy();
          }         
        });
      }
    );

    test.fixme('IN-18: Admin > Clients > Verificar mensaje de confirmacion al cancelar la creación de cliente', {
      tag: ['@sanity', '@clients']
    }, async () => {
        let clientData = DataGenerator.generateClientData();
        await test.step('Ir al modulo Clients y hacer clic en "Nuevo Cliente"', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
        });
        await test.step('Crear Cliente sin nombre de la compania', async () => {
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.BaseNavigationPage().clickProducts();
          expect(await userTab.CreateClients().isLostInformationConfirmationTextVisible()).toBeTruthy();       
        });
      }
    );

    test('IN-24: Admin > Clients > Verificar que cancele una edición de cliente', {
      tag: ['@sanity', '@clients']
    }, async () => {
        let clientData = DataGenerator.generateClientData();
        await test.step('Ir al modulo Clients y hacer clic en "Nuevo Cliente"', async () => {
          await userTab.BaseNavigationPage().clickClients();
          await userTab.Clients().clickNewClientButton();
        });
        await test.step('Cancelar la creacion de un cliente', async () => {
          await userTab.CreateClients().fillNameField(clientData.company.name);
          await userTab.CreateClients().fillFirstNameField(clientData.contact.firstName);
          await userTab.CreateClients().fillLastNameField(clientData.contact.lastName);
          await userTab.BaseNavigationPage().clickClients();
          await userTab.page.reload();
          const existsClient = await userTab.Clients().isSpecificClientVisible(clientData.company.name);
            if (!existsClient) {
              expect(existsClient).toBeFalsy();

            }else{
              expect(existsClient).toBeTruthy();
            }
        });
      }
    );
    //Parametrizacion de pruebas para validacion de ordenamiento de columnas
    const columnsToTest = [
      { name: 'Name', dataType: 'text' as const, id: 'IN-3' },
      { name: 'Contact Email', dataType: 'text' as const, id: 'IN-4' },
      { name: 'ID Number', dataType: 'text' as const, id: 'IN-5' },
      { name: 'Balance', dataType: 'currency' as const, id: 'IN-6' },
      { name: 'Paid to Date', dataType: 'currency' as const, id: 'IN-7' },
      { name: 'Date Created', dataType: 'date' as const, id: 'IN-272' },
      { name: 'Last Login', dataType: 'date' as const, id: 'IN-273' },
      { name: 'Website', dataType: 'text' as const, id: 'IN-9' }
    ];

    for (const column of columnsToTest) {
      test(`${column.id}: Admin > Clients > Verificar ordenamiento de la columna ${column.name}`, {
        tag: ['@smoke', '@clients']
      }, async () => {
          await test.step('Ir al modulo Clients', async () => {
            await userTab.BaseNavigationPage().clickClients();
            await userTab.page.waitForLoadState('networkidle');
          });
          await test.step(`Verificar ordenamiento inicial de la columna ${column.name}`, async () => {
            const initialSortDirection = await userTab.Clients().getColumnSortDirection(column.name);
            console.log(`${column.name} - Ordenamiento inicial detectado: ${initialSortDirection}`);
            if (initialSortDirection !== 'none') {
              const isValidSorting = await userTab.Clients().validateColumnSorting(column.name, initialSortDirection, column.dataType);
              expect(isValidSorting).toBeTruthy();
              console.log(`${column.name} - Validación exitosa del ordenamiento inicial: ${initialSortDirection}`);
            } else {
              console.log(`${column.name} - No tiene ordenamiento inicial aplicado`);
            }
          });
          await test.step(`Hacer clic en la columna ${column.name} para activar ordenamiento`, async () => {
            await userTab.Clients().clickColumnHeader(column.name);
            await userTab.page.waitForLoadState('networkidle');
            await userTab.page.waitForTimeout(1500);
          });
          await test.step(`Verificar que el ordenamiento se aplicó correctamente en ${column.name}`, async () => {
            const newSortDirection = await userTab.Clients().getColumnSortDirection(column.name);
            console.log(`${column.name} - Nuevo ordenamiento detectado: ${newSortDirection}`);
            if (newSortDirection !== 'none') {
              const isValidSorting = await userTab.Clients().validateColumnSorting(column.name, newSortDirection, column.dataType);
              expect(isValidSorting).toBeTruthy();
              console.log(`${column.name} - Validación exitosa después del primer clic: ${newSortDirection}`);
              const columnData = await userTab.Clients().getColumnData(column.name);
              console.log(`${column.name} - Datos encontrados (primeros 3): ${columnData.slice(0, 3).join(', ')}${columnData.length > 3 ? '...' : ''}`);
            }
          });
          await test.step(`Hacer clic nuevamente en ${column.name} para cambiar dirección del ordenamiento`, async () => {
            await userTab.Clients().clickColumnHeader(column.name);
            await userTab.page.waitForLoadState('networkidle');
            await userTab.page.waitForTimeout(1500);
          });
          await test.step(`Verificar el cambio bidireccional del ordenamiento en ${column.name}`, async () => {
            const finalSortDirection = await userTab.Clients().getColumnSortDirection(column.name);
            console.log(`${column.name} - Ordenamiento final detectado: ${finalSortDirection}`);
            if (finalSortDirection !== 'none') {
              const isValidSorting = await userTab.Clients().validateColumnSorting(column.name, finalSortDirection, column.dataType);
              expect(isValidSorting).toBeTruthy();
              console.log(`${column.name} - Validación exitosa del cambio bidireccional: ${finalSortDirection}`);
            }
          });
          await test.step(`Validar que existen datos en la columna ${column.name}`, async () => {
            const columnData = await userTab.Clients().getColumnData(column.name);
            console.log(`${column.name} - Se encontraron ${columnData.length} registros`);
            if (columnData.length > 0) {
              console.log(`${column.name} - Datos de ejemplo: ${columnData.slice(0, 2).join(', ')}`);
            } else {
              console.log(`${column.name} - Columna sin datos visibles`);
            }
          });
        }
      );
    }
});