import { Page } from "@playwright/test";
import { BaseNavigationPage } from "./baseNavigationPage";
import { LoginPage } from "./login/loginPage";
import { ClientsPage } from "./clients/clientsPage";
import { SettingsClientsPage } from "./clients/settingsClientsPage";
import { CreateClientsPage } from "./clients/createClientsPage";
import { LocationsClientsPage } from "./clients/locationsClientsPage";
import { DocumentsClientsPage } from "./clients/documentsClientsPage";
import { ProductsPage } from "./products/productsPage";
import { CreateProductsPage } from "./products/CreateProductsPage";

export class PageManager {
    readonly page: Page;
    private readonly loginPage: LoginPage;
    private readonly clientsPage: ClientsPage;
    private readonly baseNavigationPage: BaseNavigationPage;
    private readonly settingsClientsPage: SettingsClientsPage;
    private readonly createClientsPage: CreateClientsPage;
    private readonly locationsClientsPage: LocationsClientsPage;
    private readonly documentsClientsPage: DocumentsClientsPage;
    private readonly productsPage: ProductsPage;
    private readonly createProductsPage: CreateProductsPage;

  /**   
   * Constructor for Playwright PageManager class
   * @param page Playwright Page object
   */
  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.clientsPage = new ClientsPage(page);
    this.baseNavigationPage = new BaseNavigationPage(page);
    this.settingsClientsPage = new SettingsClientsPage(page);
    this.createClientsPage = new CreateClientsPage(page);
    this.locationsClientsPage = new LocationsClientsPage(page);
    this.documentsClientsPage = new DocumentsClientsPage(page);
    this.productsPage = new ProductsPage(page);
    this.createProductsPage = new CreateProductsPage(page);
  }



  /**
   * Get the LoginPage object
   * @returns LoginPage instance
   */
  Login(): LoginPage {
    return this.loginPage;
  }

  /**
   * Get the BaseNavigationPage object
   * @returns BaseNavigationPage instance
   */
  BaseNavigationPage(): BaseNavigationPage {
    return this.baseNavigationPage;
  }

  /**
   * Get the ClientsPage object
   * @returns ClientsPage instance
   */
  Clients(): ClientsPage {
    return this.clientsPage;
  }

  /**
   * Get the SettingsClientsPage object
   * @returns SettingsClientsPage instance
   */
  SettingsClients(): SettingsClientsPage {
    return this.settingsClientsPage;
  }
  
  /**
   * Get the CreateClientsPage object
   * @returns CreateClientsPage instance
   */
  CreateClients(): CreateClientsPage {
    return this.createClientsPage;
  }

  /**
   * Get the LocationsClientsPage object
   * @returns LocationsClientsPage instance
   */
  LocationsClients(): LocationsClientsPage {
    return this.locationsClientsPage;
  }

  /**
   * Get the DocumentsClientsPage object
   * @returns DocumentsClientsPage instance
   */
  DocumentsClients(): DocumentsClientsPage {
    return this.documentsClientsPage;
  }  

  /**
   * Get the ProductsPage object
   * @returns ProductsPage instance
   */
  Products(): ProductsPage {
    return this.productsPage;
  }  

  /**
   * Get the CreateProductsPage object
   * @returns CreateProductsPage instance
   */
  CreateProducts(): CreateProductsPage {
    return this.createProductsPage;
  }
}