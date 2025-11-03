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

    test('IN-193: Admin > Pasdroducts > Crear Producto con los campos mínimos requeridos', {
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

    test.fixme('IN-265: Admin > Products > Verificar que muestre mensaje de alerta antes de salir del formulario de creación de producto cuando este contiene información', {
      tag: ['@sanity', '@products']
    }, async () => {
        let productData = DataGenerator.generateProductData();
        await test.step('Ir al modulo Products y hacer clic en "Nuevo Producto"', async () => {
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.Products().clickNewProductButton();
        });
        await test.step('Crear Producto sin nombre', async () => {
          await userTab.CreateProducts().fillDescriptionField(productData.description);
          await userTab.CreateProducts().fillGenericNumberField('Price', productData.price);
          await userTab.CreateProducts().fillGenericNumberField('Default Quantity', productData.defaultQuantity);
          await userTab.CreateProducts().fillGenericNumberField('Max Quantity', productData.maxQuantity);
          await userTab.CreateProducts().selectTaxCategoryOption('Services');
          await userTab.BaseNavigationPage().clickClients();
          expect(await userTab.CreateProducts().isLostInformationConfirmationTextVisible()).toBeTruthy();
        });
      }
    );

    test('IN-212: Admin > Products > New Product > Validar que permita un campo Item con 1 carácter', {
      tag: ['@products', '@regression']
    }, async () => {
        let productData = DataGenerator.generateProductData();
        const singleCharName = 'a';
        await test.step('Ir al modulo Products y hacer clic en "Nuevo Producto"', async () => {
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.Products().clickNewProductButton();
        });
        await test.step('Crear producto con 1 carácter en el campo Item', async () => {
          await userTab.CreateProducts().fillItemField(singleCharName);
          await userTab.CreateProducts().clickSaveButton();
        });
        await test.step('Verificar que el producto se creó exitosamente', async () => {
          expect(await userTab.CreateProducts().isCreateConfirmationTextVisible()).toBeTruthy();
          console.log(`Producto creado exitosamente con 1 carácter: "${singleCharName}"`);
        });
        await test.step('Validar que el producto aparece en la lista', async () => {
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.page.reload();
          await userTab.Products().clickLifecycleDropdownAndSelectSpecificOptions(['Active']);
          await userTab.Products().typeInFilterInput(singleCharName);
          const existsProduct = await userTab.Products().isProductVisible(singleCharName);
          expect(existsProduct).toBeTruthy();
        });
        await test.step('TearDown - Eliminar Producto', async () => {
          await userTab.Products().clickProductActionButton(singleCharName);
          await userTab.Products().clickProductDeleteOrArchiveOption('Delete');
          expect (userTab.CreateProducts().isCreateConfirmationTextVisible()).toBeTruthy();
        });
      });

    test('IN-213: Admin > Products > New Product > Validar que permita un campo Item con 255 caracteres', {
      tag: ['@regression', '@products']
    }, async () => {
        let productData = DataGenerator.generateProductData();
        const maxCharName = 'a'.repeat(255);
        await test.step('Ir al modulo Products y hacer clic en "Nuevo Producto"', async () => {
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.Products().clickNewProductButton();
        });
        await test.step('Crear producto con 255 caracteres en el campo Item', async () => {
          await userTab.CreateProducts().fillItemField(maxCharName);
          await userTab.CreateProducts().clickSaveButton();
        });
        await test.step('Validar que el producto aparece en la lista', async () => {
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.page.reload();
          await userTab.Products().clickLifecycleDropdownAndSelectSpecificOptions(['Active']);
          await userTab.Products().typeInFilterInput('aaaaaaaaaaaaa');
          const existsProduct = await userTab.Products().isProductVisible('aaaaaaaaaaaaa');
          expect(existsProduct).toBeTruthy();
        });
        await test.step('TearDown - Eliminar Producto', async () => {
          await userTab.Products().clickProductActionButton('aaaaaaaaaaaaa');
          await userTab.Products().clickProductDeleteOrArchiveOption('Delete');
          expect (userTab.CreateProducts().isCreateConfirmationTextVisible()).toBeTruthy();
        });
      });

    test('IN-214: Admin > Products > New Product > Validar que NO permita un campo Item con 256 caracteres', {
      tag: ['@regression', '@products', '@negative']
    }, async () => {
        let productData = DataGenerator.generateProductData();
        const exceedCharName = 'z'.repeat(256);
        let productWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.Products().clickNewProductButton();
          await userTab.CreateProducts().fillItemField(exceedCharName);
          await userTab.CreateProducts().clickSaveButton();
          const wasCreated = await userTab.CreateProducts().isCreateConfirmationTextVisible();
          if (wasCreated) {
            productWasCreated = true;
            console.log('CORRECTO: El sistema NO permitió crear producto con 256 caracteres');
          } else {
            console.log('FALLO: El sistema permitió crear producto con 256 caracteres');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          if (productWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickProducts();
              await userTab.page.reload();
              await userTab.Products().clickLifecycleDropdownAndSelectSpecificOptions(['Active']);
              await userTab.Products().typeInFilterInput('zzzzzzzzzzzz');
              const existsProduct = await userTab.Products().isProductVisible('zzzzzzzzzzzz');
              if (existsProduct) {
                await userTab.Products().clickProductActionButton('zzzzzzzzzzzz');
                await userTab.Products().clickProductDeleteOrArchiveOption('Delete');
                console.log('Producto eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );

    test('IN-293: Admin > Clients > New Client > Validar que NO permita un campo Item con caracteres especiales', {
      tag: ['@regression', '@products', '@negative']
    }, async () => {
        let productData = DataGenerator.generateProductData();
        const specialCharName = '*&@!';
        let productWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.Products().clickNewProductButton();
          await userTab.CreateProducts().fillItemField(specialCharName);
          await userTab.CreateProducts().clickSaveButton();
          const wasCreated = await userTab.CreateProducts().isCreateConfirmationTextVisible();
          if (wasCreated) {
            productWasCreated = true;
            console.log('CORRECTO: El sistema NO permitió crear producto con caracteres especiales');
          } else {
            console.log('FALLO: El sistema permitió crear producto con caracteres especiales');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          if (productWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickProducts();
              await userTab.page.reload();
              await userTab.Products().clickLifecycleDropdownAndSelectSpecificOptions(['Active']);
              await userTab.Products().typeInFilterInput(specialCharName);
              const existsProduct = await userTab.Products().isProductVisible(specialCharName);
              if (existsProduct) {
                await userTab.Products().clickProductActionButton(specialCharName);
                await userTab.Products().clickProductDeleteOrArchiveOption('Delete');
                console.log('Producto eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );

    test('IN-223: Admin > Products > New Product > Validar que permita un campo Description con 1 carácter', {
      tag: ['@products', '@regression']
    }, async () => {
        let productData = DataGenerator.generateProductData();
        const singleCharName = 'a';
        await test.step('Ir al modulo Products y hacer clic en "Nuevo Producto"', async () => {
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.Products().clickNewProductButton();
        });
        await test.step('Crear producto con 1 carácter en el campo Description', async () => {
          await userTab.CreateProducts().fillItemField(productData.name);
          await userTab.CreateProducts().fillDescriptionField(singleCharName);
          await userTab.CreateProducts().clickSaveButton();
        });
        await test.step('Verificar que el producto se creó exitosamente', async () => {
          expect(await userTab.CreateProducts().isCreateConfirmationTextVisible()).toBeTruthy();
          console.log(`Producto creado exitosamente con 1 carácter: "${productData.name}"`);
        });
        await test.step('Validar que el producto aparece en la lista', async () => {
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.page.reload();
          await userTab.Products().clickLifecycleDropdownAndSelectSpecificOptions(['Active']);
          await userTab.Products().typeInFilterInput(productData.name);
          const existsProduct = await userTab.Products().isProductVisible(productData.name);
          expect(existsProduct).toBeTruthy();
        });
        await test.step('TearDown - Eliminar Producto', async () => {
          await userTab.Products().clickProductActionButton(productData.name);
          await userTab.Products().clickProductDeleteOrArchiveOption('Delete');
          expect (userTab.CreateProducts().isCreateConfirmationTextVisible()).toBeTruthy();
        });
      });

    test('IN-224: Admin > Products > New Product > Validar que permita un campo Description con 255 caracteres', {
      tag: ['@regression', '@products']
    }, async () => {
        let productData = DataGenerator.generateProductData();
        const maxCharName = 'a'.repeat(255);
        await test.step('Ir al modulo Products y hacer clic en "Nuevo Producto"', async () => {
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.Products().clickNewProductButton();
        });
        await test.step('Crear producto con 255 caracteres en el campo Description', async () => {
          await userTab.CreateProducts().fillItemField(productData.name);
          await userTab.CreateProducts().fillDescriptionField(maxCharName);
          await userTab.CreateProducts().clickSaveButton();
        });
        await test.step('Validar que el producto aparece en la lista', async () => {
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.page.reload();
          await userTab.Products().clickLifecycleDropdownAndSelectSpecificOptions(['Active']);
          await userTab.Products().typeInFilterInput(productData.name);
          const existsProduct = await userTab.Products().isProductVisible(productData.name);
          expect(existsProduct).toBeTruthy();
        });
        await test.step('TearDown - Eliminar Producto', async () => {
          await userTab.Products().clickProductActionButton(productData.name);
          await userTab.Products().clickProductDeleteOrArchiveOption('Delete');
          expect (userTab.CreateProducts().isCreateConfirmationTextVisible()).toBeTruthy();
        });
      });

    test('IN-225: Admin > Products > New Product > Validar que NO permita un campo Description con 256 caracteres', {
      tag: ['@regression', '@products', '@negative']
    }, async () => {
        let productData = DataGenerator.generateProductData();
        const exceedCharName = 'z'.repeat(256);
        let productWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.Products().clickNewProductButton();
          await userTab.CreateProducts().fillItemField(productData.name);
          await userTab.CreateProducts().fillDescriptionField(exceedCharName);
          await userTab.CreateProducts().clickSaveButton();
          const wasCreated = await userTab.CreateProducts().isCreateConfirmationTextVisible();
          if (wasCreated) {
            productWasCreated = true;
            console.log('CORRECTO: El sistema NO permitió crear producto con 256 caracteres');
          } else {
            console.log('FALLO: El sistema permitió crear producto con 256 caracteres');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          if (productWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickProducts();
              await userTab.page.reload();
              await userTab.Products().clickLifecycleDropdownAndSelectSpecificOptions(['Active']);
              await userTab.Products().typeInFilterInput(productData.name);
              const existsProduct = await userTab.Products().isProductVisible(productData.name);
              if (existsProduct) {
                await userTab.Products().clickProductActionButton(productData.name);
                await userTab.Products().clickProductDeleteOrArchiveOption('Delete');
                console.log('Producto eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );

    test('IN-294: Admin > Clients > New Client > Validar que NO permita un campo Description con SOLO caracteres especiales', {
      tag: ['@regression', '@products', '@negative']
    }, async () => {
        let productData = DataGenerator.generateProductData();
        const specialCharName = '*&@!';
        let productWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.Products().clickNewProductButton();
          await userTab.CreateProducts().fillItemField(productData.name);
          await userTab.CreateProducts().fillDescriptionField(specialCharName);
          await userTab.CreateProducts().clickSaveButton();
          const wasCreated = await userTab.CreateProducts().isCreateConfirmationTextVisible();
          if (wasCreated) {
            productWasCreated = true;
            console.log('CORRECTO: El sistema NO permitió crear producto con caracteres especiales');
          } else {
            console.log('FALLO: El sistema permitió crear producto con caracteres especiales');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          if (productWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickProducts();
              await userTab.page.reload();
              await userTab.Products().clickLifecycleDropdownAndSelectSpecificOptions(['Active']);
              await userTab.Products().typeInFilterInput(productData.name);
              const existsProduct = await userTab.Products().isProductVisible(productData.name);
              if (existsProduct) {
                await userTab.Products().clickProductActionButton(productData.name);
                await userTab.Products().clickProductDeleteOrArchiveOption('Delete');
                console.log('Producto eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );

    test('IN-219: Admin > Products > New Product > Validar que permita el campo Price con 1 dígito', {
      tag: ['@products', '@regression']
    }, async () => {
        let productData = DataGenerator.generateProductData();
        const singleChar = '1';
        await test.step('Ir al modulo Products y hacer clic en "Nuevo Producto"', async () => {
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.Products().clickNewProductButton();
        });
        await test.step('Crear producto con 1 digito en el campo Price', async () => {
          await userTab.CreateProducts().fillItemField(productData.name);
          await userTab.CreateProducts().fillGenericNumberField('Price', singleChar);
          await userTab.CreateProducts().clickSaveButton();
        });
        await test.step('Verificar que el producto se creó exitosamente', async () => {
          expect(await userTab.CreateProducts().isCreateConfirmationTextVisible()).toBeTruthy();
          console.log(`Producto creado exitosamente con 1 carácter: "${productData.name}"`);
        });
        await test.step('Validar que el producto aparece en la lista', async () => {
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.page.reload();
          await userTab.Products().clickLifecycleDropdownAndSelectSpecificOptions(['Active']);
          await userTab.Products().typeInFilterInput(productData.name);
          const existsProduct = await userTab.Products().isProductVisible(productData.name);
          expect(existsProduct).toBeTruthy();
        });
        await test.step('TearDown - Eliminar Producto', async () => {
          await userTab.Products().clickProductActionButton(productData.name);
          await userTab.Products().clickProductDeleteOrArchiveOption('Delete');
          expect (userTab.CreateProducts().isCreateConfirmationTextVisible()).toBeTruthy();
        });
      });

    test('IN-220: Admin > Products > New Product > Validar que permita el campo Price con 20 dígitos', {
      tag: ['@regression', '@products']
    }, async () => {
        let productData = DataGenerator.generateProductData();
        const maxCharName = '1'.repeat(20);
        await test.step('Ir al modulo Products y hacer clic en "Nuevo Producto"', async () => {
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.Products().clickNewProductButton();
        });
        await test.step('Crear producto con 20 caracteres en el campo Price', async () => {
          await userTab.CreateProducts().fillItemField(productData.name);
          await userTab.CreateProducts().fillGenericNumberField('Price', maxCharName);
          await userTab.CreateProducts().clickSaveButton();
        });
        await test.step('Validar que el producto aparece en la lista', async () => {
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.page.reload();
          await userTab.Products().clickLifecycleDropdownAndSelectSpecificOptions(['Active']);
          await userTab.Products().typeInFilterInput(productData.name);
          const existsProduct = await userTab.Products().isProductVisible(productData.name);
          expect(existsProduct).toBeTruthy();
        });
        await test.step('TearDown - Eliminar Producto', async () => {
          await userTab.Products().clickProductActionButton(productData.name);
          await userTab.Products().clickProductDeleteOrArchiveOption('Delete');
          expect (userTab.CreateProducts().isCreateConfirmationTextVisible()).toBeTruthy();
        });
      });

    test('IN-221: Admin > Products > New Product > Validar que NO permita el campo Price con 21 dígitos', {
      tag: ['@regression', '@products', '@negative']
    }, async () => {
        let productData = DataGenerator.generateProductData();
        const exceedCharName = '1'.repeat(21);
        let productWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.Products().clickNewProductButton();
          await userTab.CreateProducts().fillItemField(productData.name);
          await userTab.CreateProducts().fillGenericNumberField('Price', exceedCharName)
          await userTab.CreateProducts().clickSaveButton();
          const wasCreated = await userTab.CreateProducts().isCreateConfirmationTextVisible();
          if (wasCreated) {
            productWasCreated = true;
            console.log('CORRECTO: El sistema NO permitió crear producto con 21 caracteres');
          } else {
            console.log('FALLO: El sistema permitió crear producto con 21 caracteres');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          if (productWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickProducts();
              await userTab.page.reload();
              await userTab.Products().clickLifecycleDropdownAndSelectSpecificOptions(['Active']);
              await userTab.Products().typeInFilterInput(productData.name);
              const existsProduct = await userTab.Products().isProductVisible(productData.name);
              if (existsProduct) {
                await userTab.Products().clickProductActionButton(productData.name);
                await userTab.Products().clickProductDeleteOrArchiveOption('Delete');
                console.log('Producto eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );

    test('IN-222: Admin > Products > New Product > Validar que NO permita el campo Price con caracteres especiales', {
      tag: ['@regression', '@products', '@negative']
    }, async () => {
        let productData = DataGenerator.generateProductData();
        const specialCharName = '*&@!';
        let productWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.Products().clickNewProductButton();
          await userTab.CreateProducts().fillItemField(productData.name);
          await userTab.CreateProducts().fillGenericNumberField('Price', specialCharName)
          await userTab.CreateProducts().clickSaveButton();
          const wasCreated = await userTab.CreateProducts().isCreateConfirmationTextVisible();
          if (wasCreated) {
            productWasCreated = true;
            console.log('CORRECTO: El sistema NO permitió crear producto con caracteres especiales');
          } else {
            console.log('FALLO: El sistema permitió crear producto con caracteres especiales');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          if (productWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickProducts();
              await userTab.page.reload();
              await userTab.Products().clickLifecycleDropdownAndSelectSpecificOptions(['Active']);
              await userTab.Products().typeInFilterInput(productData.name);
              const existsProduct = await userTab.Products().isProductVisible(productData.name);
              if (existsProduct) {
                await userTab.Products().clickProductActionButton(productData.name);
                await userTab.Products().clickProductDeleteOrArchiveOption('Delete');
                console.log('Producto eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );

    test('IN-295: Admin > Products > New Product > Validar que NO permita el campo Price con caracteres alfabeticos', {
      tag: ['@regression', '@products', '@negative']
    }, async () => {
        let productData = DataGenerator.generateProductData();
        const specialCharName = 'abc';
        let productWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.Products().clickNewProductButton();
          await userTab.CreateProducts().fillItemField(productData.name);
          await userTab.CreateProducts().fillGenericNumberField('Price', specialCharName)
          await userTab.CreateProducts().clickSaveButton();
          const wasCreated = await userTab.CreateProducts().isCreateConfirmationTextVisible();
          if (wasCreated) {
            productWasCreated = true;
            console.log('CORRECTO: El sistema NO permitió crear producto con caracteres alfabeticos');
          } else {
            console.log('FALLO: El sistema permitió crear producto con caracteres alfabeticos');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          if (productWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickProducts();
              await userTab.page.reload();
              await userTab.Products().clickLifecycleDropdownAndSelectSpecificOptions(['Active']);
              await userTab.Products().typeInFilterInput(productData.name);
              const existsProduct = await userTab.Products().isProductVisible(productData.name);
              if (existsProduct) {
                await userTab.Products().clickProductActionButton(productData.name);
                await userTab.Products().clickProductDeleteOrArchiveOption('Delete');
                console.log('Producto eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );

    test('IN-226: Admin > Products > New Product > Validar que permita el campo Default Quantity con 1 dígito', {
      tag: ['@products', '@regression']
    }, async () => {
        let productData = DataGenerator.generateProductData();
        const singleChar = '1';
        await test.step('Ir al modulo Products y hacer clic en "Nuevo Producto"', async () => {
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.Products().clickNewProductButton();
        });
        await test.step('Crear producto con 1 digito en el campo Default Quantity', async () => {
          await userTab.CreateProducts().fillItemField(productData.name);
          await userTab.CreateProducts().fillGenericNumberField('Default Quantity', singleChar);
          await userTab.CreateProducts().clickSaveButton();
        });
        await test.step('Verificar que el producto se creó exitosamente', async () => {
          expect(await userTab.CreateProducts().isCreateConfirmationTextVisible()).toBeTruthy();
          console.log(`Producto creado exitosamente con 1 carácter: "${productData.name}"`);
        });
        await test.step('Validar que el producto aparece en la lista', async () => {
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.page.reload();
          await userTab.Products().clickLifecycleDropdownAndSelectSpecificOptions(['Active']);
          await userTab.Products().typeInFilterInput(productData.name);
          const existsProduct = await userTab.Products().isProductVisible(productData.name);
          expect(existsProduct).toBeTruthy();
        });
        await test.step('TearDown - Eliminar Producto', async () => {
          await userTab.Products().clickProductActionButton(productData.name);
          await userTab.Products().clickProductDeleteOrArchiveOption('Delete');
          expect (userTab.CreateProducts().isCreateConfirmationTextVisible()).toBeTruthy();
        });
      });

    test('IN-227: Admin > Products > New Product > Validar que permita el campo Default Quantity con 20 dígitos', {
      tag: ['@regression', '@products']
    }, async () => {
        let productData = DataGenerator.generateProductData();
        const maxCharName = '1'.repeat(20);
        await test.step('Ir al modulo Products y hacer clic en "Nuevo Producto"', async () => {
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.Products().clickNewProductButton();
        });
        await test.step('Crear producto con 20 caracteres en el campo Default Quantity', async () => {
          await userTab.CreateProducts().fillItemField(productData.name);
          await userTab.CreateProducts().fillGenericNumberField('Default Quantity', maxCharName);
          await userTab.CreateProducts().clickSaveButton();
        });
        await test.step('Validar que el producto aparece en la lista', async () => {
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.page.reload();
          await userTab.Products().clickLifecycleDropdownAndSelectSpecificOptions(['Active']);
          await userTab.Products().typeInFilterInput(productData.name);
          const existsProduct = await userTab.Products().isProductVisible(productData.name);
          expect(existsProduct).toBeTruthy();
        });
        await test.step('TearDown - Eliminar Producto', async () => {
          await userTab.Products().clickProductActionButton(productData.name);
          await userTab.Products().clickProductDeleteOrArchiveOption('Delete');
          expect (userTab.CreateProducts().isCreateConfirmationTextVisible()).toBeTruthy();
        });
      });

    test('IN-228: Admin > Products > New Product > Validar que NO permita el campo Default Quantity con 21 dígitos', {
      tag: ['@regression', '@products', '@negative']
    }, async () => {
        let productData = DataGenerator.generateProductData();
        const exceedCharName = '1'.repeat(21);
        let productWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.Products().clickNewProductButton();
          await userTab.CreateProducts().fillItemField(productData.name);
          await userTab.CreateProducts().fillGenericNumberField('Default Quantity', exceedCharName)
          await userTab.CreateProducts().clickSaveButton();
          const wasCreated = await userTab.CreateProducts().isCreateConfirmationTextVisible();
          if (wasCreated) {
            productWasCreated = true;
            console.log('CORRECTO: El sistema NO permitió crear producto con 21 caracteres');
          } else {
            console.log('FALLO: El sistema permitió crear producto con 21 caracteres');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          if (productWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickProducts();
              await userTab.page.reload();
              await userTab.Products().clickLifecycleDropdownAndSelectSpecificOptions(['Active']);
              await userTab.Products().typeInFilterInput(productData.name);
              const existsProduct = await userTab.Products().isProductVisible(productData.name);
              if (existsProduct) {
                await userTab.Products().clickProductActionButton(productData.name);
                await userTab.Products().clickProductDeleteOrArchiveOption('Delete');
                console.log('Producto eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );

    test('IN-229: Admin > Products > New Product > Validar que NO permita el campo Default Quantity con caracteres especiales', {
      tag: ['@regression', '@products', '@negative']
    }, async () => {
        let productData = DataGenerator.generateProductData();
        const specialCharName = '*&@!';
        let productWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.Products().clickNewProductButton();
          await userTab.CreateProducts().fillItemField(productData.name);
          await userTab.CreateProducts().fillGenericNumberField('Default Quantity', specialCharName)
          await userTab.CreateProducts().clickSaveButton();
          const wasCreated = await userTab.CreateProducts().isCreateConfirmationTextVisible();
          if (wasCreated) {
            productWasCreated = true;
            console.log('CORRECTO: El sistema NO permitió crear producto con caracteres especiales');
          } else {
            console.log('FALLO: El sistema permitió crear producto con caracteres especiales');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          if (productWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickProducts();
              await userTab.page.reload();
              await userTab.Products().clickLifecycleDropdownAndSelectSpecificOptions(['Active']);
              await userTab.Products().typeInFilterInput(productData.name);
              const existsProduct = await userTab.Products().isProductVisible(productData.name);
              if (existsProduct) {
                await userTab.Products().clickProductActionButton(productData.name);
                await userTab.Products().clickProductDeleteOrArchiveOption('Delete');
                console.log('Producto eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );

    test('IN-296: Admin > Products > New Product > Validar que NO permita el campo Default Quantity con caracteres alfabeticos', {
      tag: ['@regression', '@products', '@negative']
    }, async () => {
        let productData = DataGenerator.generateProductData();
        const specialCharName = 'abc';
        let productWasCreated = false;
        try {
          await userTab.BaseNavigationPage().clickProducts();
          await userTab.Products().clickNewProductButton();
          await userTab.CreateProducts().fillItemField(productData.name);
          await userTab.CreateProducts().fillGenericNumberField('Default Quantity', specialCharName)
          await userTab.CreateProducts().clickSaveButton();
          const wasCreated = await userTab.CreateProducts().isCreateConfirmationTextVisible();
          if (wasCreated) {
            productWasCreated = true;
            console.log('CORRECTO: El sistema NO permitió crear producto con caracteres alfabeticos');
          } else {
            console.log('FALLO: El sistema permitió crear producto con caracteres alfabeticos');
          }
          expect(wasCreated).toBeFalsy();
        } finally {
          if (productWasCreated) {
            try {
              await userTab.BaseNavigationPage().clickProducts();
              await userTab.page.reload();
              await userTab.Products().clickLifecycleDropdownAndSelectSpecificOptions(['Active']);
              await userTab.Products().typeInFilterInput(productData.name);
              const existsProduct = await userTab.Products().isProductVisible(productData.name);
              if (existsProduct) {
                await userTab.Products().clickProductActionButton(productData.name);
                await userTab.Products().clickProductDeleteOrArchiveOption('Delete');
                console.log('Producto eliminado exitosamente');
              }
            } catch (cleanupError) {
              console.log(`Error en limpieza: ${cleanupError}`);
            }
          }
        }
      }
    );
});