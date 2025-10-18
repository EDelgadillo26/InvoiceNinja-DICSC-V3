import { Page } from "@playwright/test";
import { LoginPage } from "./login/loginPage";
import { ClientsPage } from "./clients/clientsPage";
import { BaseNavigationPage } from "./baseNavigationPage";

export class PageManager {
    readonly page: Page;
    private readonly loginPage: LoginPage;
    private readonly clientsPage: ClientsPage;
    private readonly baseNavigationPage: BaseNavigationPage;


  /**   
   * Constructor for Playwright PageManager class
   * @param page Playwright Page object
   */
  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.clientsPage = new ClientsPage(page);
    this.baseNavigationPage = new BaseNavigationPage(page);
  }



  /**
   * Get the LoginPage object
   * @returns LoginPage instance
   */
  Login(): LoginPage {
    return this.loginPage;
  }

  /**
   * Get the ClientsPage object
   * @returns ClientsPage instance
   */
  Clients(): ClientsPage {
    return this.clientsPage;
  }

  /**
   * Get the BaseNavigationPage object
   * @returns BaseNavigationPage instance
   */
  BaseNavigationPage(): BaseNavigationPage {
    return this.baseNavigationPage;
  }
}