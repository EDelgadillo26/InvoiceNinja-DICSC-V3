import { Page } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { ClientsPage } from "../pages/clientsPage";

export class PageManager {
    readonly page: Page;
    private readonly loginPage: LoginPage;
    private readonly clientsPage: ClientsPage;


  /**   
   * Constructor for Playwright PageManager class
   * @param page Playwright Page object
   */
  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.clientsPage = new ClientsPage(page);
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
}