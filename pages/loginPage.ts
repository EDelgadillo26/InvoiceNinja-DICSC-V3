import { Page, Locator, expect } from '@playwright/test';
import { USER_CREDENTIALS, URLS} from '../utils/envUtils';

export class LoginPage {

  private page: Page;

  constructor(page: Page) {
    this.page = page;

  }

  // Selectores principales login
  private inputEmail = 'input[name="email"]';
  private inputPassword = '#password';
  private loginButton  = 'button[type="submit"]';

  //Selector para logOut
  private accountMenu = 'div.flex.items-center.space-x-3 > span.text-sm';
  private logoutButton = '//span[contains(text(), "Log Out")]';


  /**
   * Navigate to login page with verification
   */
  async gotoLogin(url: string) {
    console.log(`Navigating to login page: ${url}`);
    await this.page.goto(url, { timeout: 45000 });  
  }

  /**
   * Login to the application with optional credentials
   * If no credentials provided, uses default from environment
   */
  async loginToInvoiceNinja(email?: string, password?: string) {
    const loginEmail = email || USER_CREDENTIALS.email;
    const loginPassword = password || USER_CREDENTIALS.password;
    
    console.log(`Logging in with email: ${loginEmail}`);
    await this.page.goto(URLS.login, { timeout: 45000 });
    await this.page.fill(this.inputEmail, loginEmail);
    await this.page.fill(this.inputPassword, loginPassword);
    await this.page.click(this.loginButton);
  }

  /**
   * Login to the application with optional credentials
   * If no credentials provided, uses default from environment
   */
  async logOutUser() {
    console.log(`Logging out user`);
    await this.page.locator(this.accountMenu).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.locator(this.accountMenu).click();
    await this.page.locator(this.logoutButton).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.locator(this.logoutButton).click();
  }
}