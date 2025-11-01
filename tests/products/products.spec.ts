import test, { BrowserContext, expect } from '@playwright/test';
import { BrowserContextConstructor } from '../../utils/browserContextConstructor';
import { PageManager } from '../../pages/pageManager.page';
import { DataGenerator } from '../../utils/dataGenerator';
import users from '../../data/users.json';

test.describe('Products Principal Page Tests', () => {

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

    // if (!staticDataExist) {
    //   await userTab.BaseNavigationPage().clickClients();
    //   const existsClientStatic = await userTab.Clients().isSpecificClientVisible('EnriqueCompany');
    //   if (!existsClientStatic) {
    //     await userTab.Clients().clickNewClientButton();
    //     await userTab.CreateClients().fillNameField('EnriqueCompany');
    //     await userTab.CreateClients().fillFirstNameField('Enrique');
    //     await userTab.CreateClients().fillLastNameField('Delgadillo');
    //     await userTab.CreateClients().clickSaveButton();
    //     expect (userTab.CreateClients().isCreateConfirmationTextVisible()).toBeTruthy();
    //     await userTab.BaseNavigationPage().clickClients();
    //     await userTab.page.reload();
    //     staticDataExist = true;
    //   }
    // }
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

    test('IN-193: Admin > Products > Crear Producto con los campos mínimos requeridos', {
      tag: ['@smoke', '@products']
    }, async () => {
        let productData = DataGenerator.generateProductData();
        await test.step('Ir al modulo Products y hacer clic en "Nuevo Producto"', async () => {
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.Products().clickNewProductButton();
        });
        await test.step('Llenar los campos del nuevo producto', async () => {
          await userTab.CreateProducts().fillItemField(productData.name);
          await userTab.CreateProducts().fillDescriptionField(productData.description);
          await userTab.CreateProducts().fillGenericNumberField('Price',productData.price);
          await userTab.CreateProducts().fillGenericNumberField('Default Quantity',productData.defaultQuantity);
          await userTab.CreateProducts().fillGenericNumberField('Max Quantity',productData.maxQuantity);
          await userTab.CreateProducts().selectTaxCategoryOption('Services');
          await userTab.CreateProducts().clickSaveButton();
          expect (userTab.CreateProducts().isCreateConfirmationTextVisible()).toBeTruthy();
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.page.reload();
          const existsProduct = await userTab.Products().isProductVisible(productData.name);
            if (!existsProduct) {
              console.log(`Product ${productData.name} was not found after creation.`, new Date());
              expect(existsProduct).toBeTruthy();

            }else{
              expect(existsProduct).toBeTruthy();
            }
        });
        await test.step('TearDown - Eliminar Producto', async () => {
          await userTab.Products().clickProductActionButton(productData.name);
          await userTab.Products().clickProductDeleteOrArchiveOption('Delete');
          expect (userTab.CreateProducts().isCreateConfirmationTextVisible()).toBeTruthy();
        });
      }
    );

    test('IN-195: Admin > Products > Verificar que edite un nombre del producto', {
      tag: ['@smoke', '@products']
    }, async () => {
        let productData = DataGenerator.generateProductData();
        let productData2 = DataGenerator.generateProductData();
        await test.step('Ir al modulo Products y hacer clic en "Nuevo Producto"', async () => {
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.Products().clickNewProductButton();
        });
        await test.step('Crear el nuevo producto', async () => {
          await userTab.CreateProducts().fillItemField(productData.name);
          await userTab.CreateProducts().fillDescriptionField(productData.description);
          await userTab.CreateProducts().fillGenericNumberField('Price',productData.price);
          await userTab.CreateProducts().fillGenericNumberField('Default Quantity',productData.defaultQuantity);
          await userTab.CreateProducts().fillGenericNumberField('Max Quantity',productData.maxQuantity);
          await userTab.CreateProducts().selectTaxCategoryOption('Services');
          await userTab.CreateProducts().clickSaveButton();
          expect (userTab.CreateProducts().isCreateConfirmationTextVisible()).toBeTruthy();
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.page.reload();
          const existsProduct = await userTab.Products().isProductVisible(productData.name);
            if (!existsProduct) {
              console.log(`Product ${productData.name} was not found after creation.`, new Date());
              expect(existsProduct).toBeTruthy();

            }else{
              expect(existsProduct).toBeTruthy();
            }
        });
        await test.step('Editar el nombre del producto', async () => {
          await userTab.Products().clickProductActionButton(productData.name);
          await userTab.Products().clickProductEditOption();
          await userTab.CreateProducts().fillItemField(productData2.name);
          await userTab.CreateProducts().clickSaveButton();
          expect (userTab.CreateProducts().isEditConfirmationTextVisible()).toBeTruthy();
          await userTab.page.reload();
          await userTab.BaseNavigationPage().clickProducts();
        });
        
        await test.step('TearDown - Eliminar Producto', async () => {
          await userTab.Products().clickProductActionButton(productData2.name);
          await userTab.Products().clickProductDeleteOrArchiveOption('Delete');
          expect (userTab.CreateProducts().isCreateConfirmationTextVisible()).toBeTruthy();
        });
      }
    );

    test('IN-198: Admin > Products > Verificar que elimine un producto archivado', {
      tag: ['@sanity', '@products']
    }, async () => {
        let productData = DataGenerator.generateProductData();
        await test.step('Ir al modulo Products y hacer clic en "Nuevo Producto"', async () => {
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.Products().clickNewProductButton();
        });
        await test.step('Llenar los campos del nuevo producto', async () => {
          await userTab.CreateProducts().fillItemField(productData.name);
          await userTab.CreateProducts().fillDescriptionField(productData.description);
          await userTab.CreateProducts().fillGenericNumberField('Price',productData.price);
          await userTab.CreateProducts().fillGenericNumberField('Default Quantity',productData.defaultQuantity);
          await userTab.CreateProducts().fillGenericNumberField('Max Quantity',productData.maxQuantity);
          await userTab.CreateProducts().selectTaxCategoryOption('Services');
          await userTab.CreateProducts().clickSaveButton();
          expect (userTab.CreateProducts().isCreateConfirmationTextVisible()).toBeTruthy();
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.page.reload();
          await userTab.Products().clickLifecycleDropdownAndSelectAllOptions();
          await userTab.Products().typeInFilterInput(productData.name);
          const existsProduct = await userTab.Products().isProductVisible(productData.name);
            if (!existsProduct) {
              console.log(`Product ${productData.name} was not found after creation.`, new Date());
              expect(existsProduct).toBeTruthy();

            }else{
              expect(existsProduct).toBeTruthy();
            }
        });
        await test.step('Archivar Producto', async () => {
          await userTab.Products().clickProductActionButton(productData.name);
          await userTab.Products().clickProductDeleteOrArchiveOption('Archive');
          expect (userTab.CreateProducts().isArchiveConfirmationTextVisible()).toBeTruthy();
        });
        await test.step('TearDown - Eliminar Producto', async () => {
          await userTab.Products().clickProductActionButton(productData.name);
          await userTab.Products().clickProductDeleteOrArchiveOption('Delete');
          expect (userTab.CreateProducts().isCreateConfirmationTextVisible()).toBeTruthy();
        });
      }
    );

    test('IN-187: Admin > Products > Verificar que se muestre la Tabla de Productos con las columnas por defecto', {
      tag: ['@smoke', '@products']
    }, async () => {
        await test.step('Ir al modulo Products', async () => {
          await userTab.BaseNavigationPage().clickProducts();
        });
        await test.step('Validar las columnas por defecto', async () => {
          const expectedHeaders = [
            '',
            'Product',
            'Notes',
            'Price',
            'Default Quantity',
            ''
          ];
          const visibleColumns = await userTab.Products().getAllColumnsName();
          expect(visibleColumns).toEqual(expect.arrayContaining(expectedHeaders));
        });
      }
    );

    test('IN-206: Admin > Products > Actions > Verificar que elimine un producto activo', {
      tag: ['@smoke', '@products']
    }, async () => {
        let productData = DataGenerator.generateProductData();
        await test.step('Ir al modulo Products y hacer clic en "Nuevo Producto"', async () => {
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.Products().clickNewProductButton();
        });
        await test.step('Llenar los campos del nuevo producto', async () => {
          await userTab.CreateProducts().fillItemField(productData.name);
          await userTab.CreateProducts().fillDescriptionField(productData.description);
          await userTab.CreateProducts().fillGenericNumberField('Price',productData.price);
          await userTab.CreateProducts().fillGenericNumberField('Default Quantity',productData.defaultQuantity);
          await userTab.CreateProducts().fillGenericNumberField('Max Quantity',productData.maxQuantity);
          await userTab.CreateProducts().selectTaxCategoryOption('Services');
          await userTab.CreateProducts().clickSaveButton();
          expect (userTab.CreateProducts().isCreateConfirmationTextVisible()).toBeTruthy();
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.page.reload();
          await userTab.Products().clickLifecycleDropdownAndSelectAllOptions();
          await userTab.Products().typeInFilterInput(productData.name);
          const existsProduct = await userTab.Products().isProductVisible(productData.name);
            if (!existsProduct) {
              console.log(`Product ${productData.name} was not found after creation.`, new Date());
              expect(existsProduct).toBeTruthy();

            }else{
              expect(existsProduct).toBeTruthy();
            }
        });
        await test.step('TearDown - Eliminar Producto', async () => {
          await userTab.Products().clickProductActionButton(productData.name);
          await userTab.Products().clickProductDeleteOrArchiveOption('Delete');
          expect (userTab.CreateProducts().isCreateConfirmationTextVisible()).toBeTruthy();
        });
      }
    );

    test('IN-207: Admin > Products > Verificar que restaure un producto eliminado', {
      tag: ['@sanity', '@products']
    }, async () => {
        let productData = DataGenerator.generateProductData();
        await test.step('Ir al modulo Products y hacer clic en "Nuevo Producto"', async () => {
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.Products().clickNewProductButton();
        });
        await test.step('Llenar los campos del nuevo producto', async () => {
          await userTab.CreateProducts().fillItemField(productData.name);
          await userTab.CreateProducts().fillDescriptionField(productData.description);
          await userTab.CreateProducts().fillGenericNumberField('Price',productData.price);
          await userTab.CreateProducts().fillGenericNumberField('Default Quantity',productData.defaultQuantity);
          await userTab.CreateProducts().fillGenericNumberField('Max Quantity',productData.maxQuantity);
          await userTab.CreateProducts().selectTaxCategoryOption('Services');
          await userTab.CreateProducts().clickSaveButton();
          expect (userTab.CreateProducts().isCreateConfirmationTextVisible()).toBeTruthy();
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.page.reload();
          await userTab.Products().clickLifecycleDropdownAndSelectAllOptions();
          await userTab.Products().typeInFilterInput(productData.name);
          const existsProduct = await userTab.Products().isProductVisible(productData.name);
            if (!existsProduct) {
              console.log(`Product ${productData.name} was not found after creation.`, new Date());
              expect(existsProduct).toBeTruthy();

            }else{
              expect(existsProduct).toBeTruthy();
            }
        });
        await test.step('Eliminar Producto', async () => {
          await userTab.Products().clickProductActionButton(productData.name);
          await userTab.Products().clickProductDeleteOrArchiveOption('Delete');
          expect (userTab.CreateProducts().isArchiveConfirmationTextVisible()).toBeTruthy();
        });
        await test.step('Restaurar Producto', async () => {
          await userTab.Products().clickProductActionButton(productData.name);
          await userTab.Products().clickProductDeleteOrArchiveOption('Restore');
          expect (userTab.CreateProducts().isArchiveConfirmationTextVisible()).toBeTruthy();
        });        
        await test.step('TearDown - Eliminar Producto', async () => {
          await userTab.Products().clickProductActionButton(productData.name);
          await userTab.Products().clickProductDeleteOrArchiveOption('Delete');
          expect (userTab.CreateProducts().isCreateConfirmationTextVisible()).toBeTruthy();
        });
      }
    );

    test('IN-196: Admin > Products > Actions > Verificar que archive un producto', {
      tag: ['@sanity', '@products']
    }, async () => {
        let productData = DataGenerator.generateProductData();
        await test.step('Ir al modulo Products y hacer clic en "Nuevo Producto"', async () => {
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.Products().clickNewProductButton();
        });
        await test.step('Llenar los campos del nuevo producto', async () => {
          await userTab.CreateProducts().fillItemField(productData.name);
          await userTab.CreateProducts().fillDescriptionField(productData.description);
          await userTab.CreateProducts().fillGenericNumberField('Price',productData.price);
          await userTab.CreateProducts().fillGenericNumberField('Default Quantity',productData.defaultQuantity);
          await userTab.CreateProducts().fillGenericNumberField('Max Quantity',productData.maxQuantity);
          await userTab.CreateProducts().selectTaxCategoryOption('Services');
          await userTab.CreateProducts().clickSaveButton();
          expect (userTab.CreateProducts().isCreateConfirmationTextVisible()).toBeTruthy();
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.page.reload();
          await userTab.Products().clickLifecycleDropdownAndSelectAllOptions();
          await userTab.Products().typeInFilterInput(productData.name);
          const existsProduct = await userTab.Products().isProductVisible(productData.name);
            if (!existsProduct) {
              console.log(`Product ${productData.name} was not found after creation.`, new Date());
              expect(existsProduct).toBeTruthy();

            }else{
              expect(existsProduct).toBeTruthy();
            }
        });
        await test.step('Archivar Producto', async () => {
          await userTab.Products().clickProductActionButton(productData.name);
          await userTab.Products().clickProductDeleteOrArchiveOption('Archive');
          expect (userTab.CreateProducts().isArchiveConfirmationTextVisible()).toBeTruthy();
        });     
        await test.step('TearDown - Eliminar Producto', async () => {
          await userTab.Products().clickProductActionButton(productData.name);
          await userTab.Products().clickProductDeleteOrArchiveOption('Delete');
          expect (userTab.CreateProducts().isCreateConfirmationTextVisible()).toBeTruthy();
        });
      }
    );

    test('IN-197: Admin > Products > Verificar que restaure un producto archivado', {
      tag: ['@sanity', '@products']
    }, async () => {
        let productData = DataGenerator.generateProductData();
        await test.step('Ir al modulo Products y hacer clic en "Nuevo Producto"', async () => {
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.Products().clickNewProductButton();
        });
        await test.step('Llenar los campos del nuevo producto', async () => {
          await userTab.CreateProducts().fillItemField(productData.name);
          await userTab.CreateProducts().fillDescriptionField(productData.description);
          await userTab.CreateProducts().fillGenericNumberField('Price',productData.price);
          await userTab.CreateProducts().fillGenericNumberField('Default Quantity',productData.defaultQuantity);
          await userTab.CreateProducts().fillGenericNumberField('Max Quantity',productData.maxQuantity);
          await userTab.CreateProducts().selectTaxCategoryOption('Services');
          await userTab.CreateProducts().clickSaveButton();
          expect (userTab.CreateProducts().isCreateConfirmationTextVisible()).toBeTruthy();
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.page.reload();
          await userTab.Products().clickLifecycleDropdownAndSelectAllOptions();
          await userTab.Products().typeInFilterInput(productData.name);
          const existsProduct = await userTab.Products().isProductVisible(productData.name);
            if (!existsProduct) {
              console.log(`Product ${productData.name} was not found after creation.`, new Date());
              expect(existsProduct).toBeTruthy();

            }else{
              expect(existsProduct).toBeTruthy();
            }
        });
        await test.step('Archivar Producto', async () => {
          await userTab.Products().clickProductActionButton(productData.name);
          await userTab.Products().clickProductDeleteOrArchiveOption('Archive');
          expect (userTab.CreateProducts().isArchiveConfirmationTextVisible()).toBeTruthy();
        });
        await test.step('Restaurar Producto', async () => {
          await userTab.Products().clickProductActionButton(productData.name);
          await userTab.Products().clickProductDeleteOrArchiveOption('Restore');
          expect (userTab.CreateProducts().isArchiveConfirmationTextVisible()).toBeTruthy();
        });        
        await test.step('TearDown - Eliminar Producto', async () => {
          await userTab.Products().clickProductActionButton(productData.name);
          await userTab.Products().clickProductDeleteOrArchiveOption('Delete');
          expect (userTab.CreateProducts().isCreateConfirmationTextVisible()).toBeTruthy();
        });
      }
    );
    
});