import { Page, Locator, expect } from '@playwright/test';
import { USER_CREDENTIALS, URLS} from '../../utils/envUtils';

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
  private accountMenuButton = '//button[contains(@class,"flex") and .//span[contains(text(),"DelgadilloPED")]]';
  private logoutButton = '//span[contains(text(), "Log Out")]';


  /**
   * Navigate to login page with verification
   * @param url The URL to navigate to
   * @returns {Promise<boolean>} True if navigation was successful, false otherwise
   */
  async gotoLogin(url: string): Promise<boolean> {
    try {
      console.log(`Navigating to login page: ${url}`, new Date());
      await this.page.goto(url, { timeout: 45000 });
      await this.page.waitForLoadState('domcontentloaded');
      return true;
    } catch (error) {
      console.log('Navigation to login page failed:', error);
      return false;
    }
  }

  /**
   * Login to the application with optional credentials
   * If no credentials provided, uses default from environment
   * @param email Optional email to use for login
   * @param password Optional password to use for login
   * @returns {Promise<boolean>} True if login was successful, false otherwise
   */
  async loginToInvoiceNinja(email?: string, password?: string): Promise<boolean> {
    try {
      const loginEmail = email || USER_CREDENTIALS.email;
      const loginPassword = password || USER_CREDENTIALS.password;
      
      console.log(`Logging in with email: ${loginEmail}`, new Date());
      await this.page.goto(URLS.login, { timeout: 45000 });
      await this.page.waitForSelector(this.inputEmail, { state: 'visible', timeout: 10000 });
      await this.page.fill(this.inputEmail, loginEmail);
      await this.page.fill(this.inputPassword, loginPassword);
      await this.page.click(this.loginButton);
      
      // Wait for navigation after login
      await this.page.waitForLoadState('networkidle');
      return true;
    } catch (error) {
      console.log('Login failed:', error);
      return false;
    }
  }

  /**
   * Logout from the application
   * @returns {Promise<boolean>} True if logout was successful, false otherwise
   */
  async logOutUser() {
    try {
      console.log(`Logging out user`, new Date());
      await this.page.waitForTimeout(1000);
      await this.page.waitForSelector(this.accountMenuButton, { state: 'visible', timeout: 10000 });
      await this.page.locator(this.accountMenu).click();
      await this.page.waitForSelector(this.logoutButton, { state: 'visible', timeout: 10000 });
      await this.page.locator(this.logoutButton).click();
    } catch (error) {
      console.log('Logout failed:', error);
    }
  }

  // ========== VALIDATION METHODS ==========

  /**
   * Validates that the login form is visible and accessible
   * @returns {Promise<boolean>} True if login form is visible, false otherwise
   */
  async isLoginFormVisible(): Promise<boolean> {
    try {
      console.log('Validating login form visibility', new Date());
      await this.page.locator(this.inputEmail).waitFor({ state: 'visible', timeout: 10000 });
      const emailVisible = await this.page.locator(this.inputEmail).isVisible();
      const passwordVisible = await this.page.locator(this.inputPassword).isVisible();
      const buttonVisible = await this.page.locator(this.loginButton).isVisible();
      return emailVisible && passwordVisible && buttonVisible;
    } catch (error) {
      console.log('Login form is not visible:', error);
      return false;
    }
  }

  /**
   * Validates that the account menu is visible
   * @returns {Promise<boolean>} True if account menu is visible, false otherwise
   */
  async isAccountMenuVisible(): Promise<boolean> {
    try {
      console.log('Validating account menu visibility', new Date());
      await this.page.locator(this.accountMenu).waitFor({ state: 'visible', timeout: 10000 });
      return await this.page.locator(this.accountMenu).isVisible();
    } catch (error) {
      console.log('Account menu is not visible:', error);
      return false;
    }
  }

  /**
   * Validates that the logout button is visible
   * @returns {Promise<boolean>} True if logout button is visible, false otherwise
   */
  async isLogoutButtonVisible(): Promise<boolean> {
    try {
      console.log('Validating logout button visibility', new Date());
      await this.page.locator(this.logoutButton).waitFor({ state: 'visible', timeout: 10000 });
      return await this.page.locator(this.logoutButton).isVisible();
    } catch (error) {
      console.log('Logout button is not visible:', error);
      return false;
    }
  }

  // ========== GET METHODS ==========

  /**
   * Gets the current value of the email input field
   * @returns {Promise<string>} The email input value
   */
  async getEmailValue(): Promise<string> {
    try {
      console.log('Getting email input value', new Date());
      await this.page.locator(this.inputEmail).waitFor({ state: 'visible', timeout: 10000 });
      return await this.page.locator(this.inputEmail).inputValue() || '';
    } catch (error) {
      console.log('Could not get email value:', error);
      return '';
    }
  }

  /**
   * Gets the current value of the password input field
   * @returns {Promise<string>} The password input value
   */
  async getPasswordValue(): Promise<string> {
    try {
      console.log('Getting password input value', new Date());
      await this.page.locator(this.inputPassword).waitFor({ state: 'visible', timeout: 10000 });
      return await this.page.locator(this.inputPassword).inputValue() || '';
    } catch (error) {
      console.log('Could not get password value:', error);
      return '';
    }
  }

  /**
   * Gets the text of the login button
   * @returns {Promise<string>} The login button text
   */
  async getLoginButtonText(): Promise<string> {
    try {
      console.log('Getting login button text', new Date());
      await this.page.locator(this.loginButton).waitFor({ state: 'visible', timeout: 10000 });
      return await this.page.locator(this.loginButton).textContent() || '';
    } catch (error) {
      console.log('Could not get login button text:', error);
      return '';
    }
  }

  // ========== CLICK METHODS ==========

  /**
   * Clicks the email input field
   * @returns {Promise<void>}
   */
  async clickEmailInput(): Promise<void> {
    try {
      console.log('Clicking email input', new Date());
      await this.page.locator(this.inputEmail).waitFor({ state: 'visible', timeout: 10000 });
      await this.page.locator(this.inputEmail).click();
    } catch (error) {
      console.log('Could not click email input:', error);
    }
  }

  /**
   * Clicks the password input field
   * @returns {Promise<void>}
   */
  async clickPasswordInput(): Promise<void> {
    try {
      console.log('Clicking password input', new Date());
      await this.page.locator(this.inputPassword).waitFor({ state: 'visible', timeout: 10000 });
      await this.page.locator(this.inputPassword).click();
    } catch (error) {
      console.log('Could not click password input:', error);
    }
  }

  /**
   * Clicks the login button
   * @returns {Promise<void>}
   */
  async clickLoginButton(): Promise<void> {
    try {
      console.log('Clicking login button', new Date());
      await this.page.locator(this.loginButton).waitFor({ state: 'visible', timeout: 10000 });
      await this.page.locator(this.loginButton).click();
    } catch (error) {
      console.log('Could not click login button:', error);
    }
  }

  /**
   * Clicks the account menu
   * @returns {Promise<void>}
   */
  async clickAccountMenu(): Promise<void> {
    try {
      console.log('Clicking account menu', new Date());
      await this.page.locator(this.accountMenu).waitFor({ state: 'visible', timeout: 10000 });
      await this.page.locator(this.accountMenu).click();
    } catch (error) {
      console.log('Could not click account menu:', error);
    }
  }

  // ========== FILL METHODS ==========

  /**
   * Fills the email input field
   * @param email The email to fill
   * @returns {Promise<void>}
   */
  async fillEmail(email: string): Promise<void> {
    try {
      console.log(`Filling email input with: ${email}`, new Date());
      await this.page.locator(this.inputEmail).waitFor({ state: 'visible', timeout: 10000 });
      await this.page.locator(this.inputEmail).fill(email);
    } catch (error) {
      console.log('Could not fill email input:', error);
    }
  }

  /**
   * Fills the password input field
   * @param password The password to fill
   * @returns {Promise<void>}
   */
  async fillPassword(password: string): Promise<void> {
    try {
      console.log('Filling password input', new Date());
      await this.page.locator(this.inputPassword).waitFor({ state: 'visible', timeout: 10000 });
      await this.page.locator(this.inputPassword).fill(password);
    } catch (error) {
      console.log('Could not fill password input:', error);
    }
  }
}