import { Page, Locator, expect } from '@playwright/test';

export class CreateClientsPage {

  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }


    // ========== PAGE HEADER SELECTORS ==========
    private readonly pageTitle = 'h2:has-text("New Client")';
    private readonly quickAddButton = '[data-cy="quickPopoverButton"]';
    private readonly searchButtonMobile = 'button:has(svg[viewBox="0 0 24 24"]:has(path[d*="M10 18a7.952"]))';
    private readonly searchBarDesktop = 'div:has(p:has-text("Find invoices, clients, and more"))';
    private readonly searchShortcut = 'p:has-text("Ctrl+K")';
    private readonly notificationButton = 'button:has(svg[viewBox="0 0 24 24"]:has(path[d="M18 8A6 6 0"]))';
    private readonly upgradeButton = 'button:has-text("Unlock Pro"), button:has-text("Upgrade")';
    private readonly saveButton = '//button[contains(@class,"sc-gjcoXW") and contains(text(),"Save")]';

    // ========== BREADCRUMB SELECTORS ==========
    private readonly breadcrumbContainer = 'nav[aria-label="Breadcrumb"]';
    private readonly breadcrumbHome = 'a[href="#/dashboard"]:has(svg[viewBox="0 0 18 18"])';
    private readonly breadcrumbClients = 'a[href="#/clients"]:has-text("Clients")';
    private readonly breadcrumbNewClient = 'a[href="#/clients/create"]:has-text("New Client")';

    // ========== TAB NAVIGATION SELECTORS ==========
    private readonly tabsContainer = '[data-cy="tabs"]';
    private readonly mobileTabSelect = 'div:has(#react-select-5-placeholder)';
    private readonly createTab = 'a[href="#/clients/create"]:has-text("Create")';
    private readonly settingsTab = 'a[href="#/clients/create/settings"]:has-text("Settings")';
    private readonly documentsTab = 'a[href="#/clients/create/documents"]:has-text("Documents")';
    private readonly locationsTab = 'a[href="#/clients/create/locations"]:has-text("Locations")';

    // ========== COMPANY DETAILS FORM SELECTORS ==========
    private readonly companyDetailsSection = 'div:has(h3:has-text("Company Details"))';
    private readonly companyDetailsTitle = 'h3:has-text("Company Details")';
    
    // Company Details Form Fields
    private readonly nameField = '//dt[span[text()="Name"]]/following-sibling::dd//input[@type="text"]';
    private readonly numberField = 'input[type="text"]:near(span:has-text("Number"))';
    private readonly groupDropdown = 'div:has(#react-select-9-input)';
    private readonly assignedUserDropdown = 'div:has(#react-select-10-input)';
    private readonly idNumberField = 'input[type="text"]:near(span:has-text("ID Number"))';
    private readonly vatNumberField = 'input[type="text"]:near(span:has-text("VAT Number"))';
    private readonly websiteField = 'input[type="text"]:near(span:has-text("Website"))';
    private readonly phoneField = 'input[type="text"]:near(span:has-text("Phone"))';
    private readonly routingIdField = 'input[type="text"]:near(span:has-text("Routing ID"))';
    private readonly validVatToggle = 'button[id*="headlessui-switch"]:near(span:has-text("Valid VAT Number"))';
    private readonly taxExemptToggle = 'button[id*="headlessui-switch"]:near(span:has-text("Tax Exempt"))';
    private readonly classificationDropdown = 'div:has(#react-select-6-input)';

    // ========== CONTACTS FORM SELECTORS ==========
    private readonly contactsSection = 'div:has(h3:has-text("Contacts"))';
    private readonly contactsTitle = 'h3:has-text("Contacts")';
    private readonly addContactButton = 'button:has-text("Add contact")';
    
    // Contact Form Fields
    private readonly firstNameField = 'input#first_name_0';
    private readonly lastNameField = 'input#last_name_0';
    private readonly emailField = 'input#email_0';
    private readonly contactPhoneField = 'input#phone_0';
    private readonly addToInvoicesToggle = 'button[id*="headlessui-switch"]:near(span:has-text("Add to Invoices"))';

    // ========== ADDRESS FORM SELECTORS ==========
    private readonly addressSection = 'div:has(h3:has-text("Address"))';
    private readonly addressTitle = 'h3:has-text("Address")';
    
    // Address Tabs
    private readonly AddressTab = (tabName: string) => `//button[contains(text(),"${tabName}")]`;

    // Billing Address Fields
    private readonly billingStreetField = 'input#address1';
    private readonly billingAptField = 'input#address2';
    private readonly billingCityField = 'input#city';
    private readonly billingStateField = 'input#state';
    private readonly billingPostalCodeField = 'input#postal_code';
    private readonly billingCountryDropdown = 'input[role="combobox"][id="react-select-5-input"]';
    
    // Shipping Address Fields
    private readonly copyBillingButton = '//button[contains(text(),"Copy Billing")]';
    private readonly shippingStreetField = 'input#shipping_address1';
    private readonly shippingAptField = 'input#shipping_address2';
    private readonly shippingCityField = 'input#shipping_city';
    private readonly shippingStateField = 'input#shipping_state';
    private readonly shippingPostalCodeField = 'input#shipping_postal_code';
    private readonly shippingCountryDropdown = 'dd:has(input#react-select-6-input) .css-ood9ll-singleValue';

    // ========== FORM CONTAINERS ==========
    private readonly leftColumn = 'div.w-full.xl\\:w-1\\/2:first-child';
    private readonly rightColumn = 'div.w-full.xl\\:w-1\\/2:last-child';
    private readonly formContainer = 'div.flex.flex-col.xl\\:flex-row';

    // ========== PAGE HEADER METHODS ==========

    /**
     * Gets the page title text
     */
    async getPageTitle(): Promise<string> {
        console.log('Getting page title', new Date());
        await this.page.locator(this.pageTitle).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.pageTitle).textContent() || '';
    }

    /**
     * Checks if the page title is visible
     */
    async isPageTitleVisible(): Promise<boolean> {
        console.log('Validating page title visibility', new Date());
        await this.page.locator(this.pageTitle).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.pageTitle).isVisible();
    }

    /**
     * Clicks the quick add button
     */
    async clickQuickAddButton(): Promise<void> {
        console.log('Clicking quick add button', new Date());
        await this.page.locator(this.quickAddButton).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.quickAddButton).click();
    }

    /**
     * Clicks the save button
     */
    async clickSaveButton(): Promise<void> {
        console.log('Clicking save button', new Date());
        await this.page.locator(this.saveButton).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.saveButton).click();
    }

    /**
     * Checks if the save button is visible
     */
    async isSaveButtonVisible(): Promise<boolean> {
        console.log('Validating save button visibility', new Date());
        await this.page.locator(this.saveButton).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.saveButton).isVisible();
    }

    /**
     * Gets the save button text
     */
    async getSaveButtonText(): Promise<string> {
        console.log('Getting save button text', new Date());
        await this.page.locator(this.saveButton).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.saveButton).textContent() || '';
    }

    /**
     * Gets the Create Confirmation text
     */
    async isCreateConfirmationTextVisible(): Promise<boolean> {
    console.log('Getting create confirmation text', new Date());
        try {
            await this.page.getByText('Successfully created client').waitFor({ state: 'visible', timeout: 2000 });
            return true;
        } catch {
            return false;
        }
    }
    
    // ========== BREADCRUMB METHODS ==========

    /**            
     * Checks if the breadcrumb container is visible
     */
    async isBreadcrumbVisible(): Promise<boolean> {
        console.log('Validating breadcrumb visibility', new Date());
        await this.page.locator(this.breadcrumbContainer).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.breadcrumbContainer).isVisible();
    }

    /**
     * Clicks the home breadcrumb
     */
    async clickBreadcrumbHome(): Promise<void> {
        console.log('Clicking home breadcrumb', new Date());
        await this.page.locator(this.breadcrumbHome).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.breadcrumbHome).click();
    }

    /**
     * Clicks the clients breadcrumb
     */
    async clickBreadcrumbClients(): Promise<void> {
        console.log('Clicking clients breadcrumb', new Date());
        await this.page.locator(this.breadcrumbClients).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.breadcrumbClients).click();
    }

    /**
     * Checks if the new client breadcrumb is visible
     */
    async isBreadcrumbNewClientVisible(): Promise<boolean> {
        console.log('Validating new client breadcrumb visibility', new Date());
        await this.page.locator(this.breadcrumbNewClient).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.breadcrumbNewClient).isVisible();
    }

    // ========== TAB NAVIGATION METHODS ==========

    /**
     * Checks if the tabs container is visible
     */
    async isTabsContainerVisible(): Promise<boolean> {
        console.log('Validating tabs container visibility', new Date());
        await this.page.locator(this.tabsContainer).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.tabsContainer).isVisible();
    }

    /**
     * Clicks the Create tab
     */
    async clickCreateTab(): Promise<void> {
        console.log('Clicking create tab', new Date());
        await this.page.locator(this.createTab).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.createTab).click();
    }

    /**
     * Clicks the Settings tab
     */
    async clickSettingsTab(): Promise<void> {
        console.log('Clicking settings tab', new Date());
        await this.page.locator(this.settingsTab).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.settingsTab).click();
    }

    /**
     * Clicks the Documents tab
     */
    async clickDocumentsTab(): Promise<void> {
        console.log('Clicking documents tab', new Date());
        await this.page.locator(this.documentsTab).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.documentsTab).click();
    }

    /**
     * Clicks the Locations tab
     */
    async clickLocationsTab(): Promise<void> {
        console.log('Clicking locations tab', new Date());
        await this.page.locator(this.locationsTab).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.locationsTab).click();
    }

    /**
     * Checks if the Create tab is active
     */
    async isCreateTabActive(): Promise<boolean> {
        console.log('Validating create tab active state', new Date());
        await this.page.locator(this.createTab).waitFor({ state: 'visible', timeout: 10000 });
        const tab = this.page.locator(this.createTab);
        const style = await tab.getAttribute('style');
        return style?.includes('border-bottom: 1px solid rgb(42, 48, 61)') || false;
    }

    // ========== COMPANY DETAILS FORM METHODS ==========

    /**
     * Checks if the company details section is visible
     */
    async isCompanyDetailsSectionVisible(): Promise<boolean> {
        console.log('Validating company details section visibility', new Date());
        await this.page.locator(this.companyDetailsSection).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.companyDetailsSection).isVisible();
    }

    /**
     * Gets the company details title text
     */
    async getCompanyDetailsTitle(): Promise<string> {
        console.log('Getting company details title', new Date());
        await this.page.locator(this.companyDetailsTitle).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.companyDetailsTitle).textContent() || '';
    }

    /**
     * Fills the name field
     */
    async fillNameField(name: string): Promise<void> {
        console.log('Filling name field', new Date());
        await this.page.locator(this.nameField).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.nameField).fill(name);
    }

    /**
     * Gets the name field value
     */
    async getNameFieldValue(): Promise<string> {
        console.log('Getting name field value', new Date());
        await this.page.locator(this.nameField).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.nameField).inputValue();
    }

    /**
     * Fills the number field
     */
    async fillNumberField(number: string): Promise<void> {
        console.log('Filling number field', new Date());
        await this.page.locator(this.numberField).fill(number);
    }

    /**
     * Gets the number field value
     */
    async getNumberFieldValue(): Promise<string> {
        console.log('Getting number field value', new Date());
        await this.page.locator(this.numberField).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.numberField).inputValue();
    }

    /**
     * Clicks the group dropdown
     */
    async clickGroupDropdown(): Promise<void> {
        console.log('Clicking group dropdown', new Date());
        await this.page.locator(this.groupDropdown).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.groupDropdown).click();
    }

    /**
     * Clicks the assigned user dropdown
     */
    async clickAssignedUserDropdown(): Promise<void> {
        console.log('Clicking assigned user dropdown', new Date());
        await this.page.locator(this.assignedUserDropdown).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.assignedUserDropdown).click();
    }

    /**
     * Fills the ID number field
     */
    async fillIdNumberField(idNumber: string): Promise<void> {
        console.log('Filling ID number field', new Date());
        await this.page.locator(this.idNumberField).fill(idNumber);
    }

    /**
     * Gets the ID number field value
     */
    async getIdNumberFieldValue(): Promise<string> {
        console.log('Getting ID number field value', new Date());
        await this.page.locator(this.idNumberField).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.idNumberField).inputValue();
    }

    /**
     * Fills the VAT number field
     */
    async fillVatNumberField(vatNumber: string): Promise<void> {
        console.log('Filling VAT number field', new Date());
        await this.page.locator(this.vatNumberField).fill(vatNumber);
    }

    /**
     * Gets the VAT number field value
     */
    async getVatNumberFieldValue(): Promise<string> {
        console.log('Getting VAT number field value', new Date());
        await this.page.locator(this.vatNumberField).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.vatNumberField).inputValue();
    }

    /**
     * Fills the website field
     */
    async fillWebsiteField(website: string): Promise<void> {
        console.log('Filling website field', new Date());
        await this.page.locator(this.websiteField).fill(website);
    }

    /**
     * Gets the website field value
     */
    async getWebsiteFieldValue(): Promise<string> {
        console.log('Getting website field value', new Date());
        await this.page.locator(this.websiteField).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.websiteField).inputValue();
    }

    /**
     * Fills the phone field
     */
    async fillPhoneField(phone: string): Promise<void> {
        console.log('Filling phone field', new Date());
        await this.page.locator(this.phoneField).fill(phone);
    }

    /**
     * Gets the phone field value
     */
    async getPhoneFieldValue(): Promise<string> {
        console.log('Getting phone field value', new Date());
        await this.page.locator(this.phoneField).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.phoneField).inputValue();
    }

    /**
     * Fills the routing ID field
     */
    async fillRoutingIdField(routingId: string): Promise<void> {
        console.log('Filling routing ID field', new Date());
        await this.page.locator(this.routingIdField).fill(routingId);
    }

    /**
     * Gets the routing ID field value
     */
    async getRoutingIdFieldValue(): Promise<string> {
        console.log('Getting routing ID field value', new Date());
        await this.page.locator(this.routingIdField).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.routingIdField).inputValue();
    }

    /**
     * Toggles the valid VAT number switch
     */
    async toggleValidVatNumber(): Promise<void> {
        console.log('Toggling valid VAT number switch', new Date());
        await this.page.locator(this.validVatToggle).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.validVatToggle).click();
    }

    /**
     * Checks if valid VAT number is enabled
     */
    async isValidVatNumberEnabled(): Promise<boolean> {
        console.log('Validating VAT number enabled state', new Date());
        await this.page.locator(this.validVatToggle).waitFor({ state: 'visible', timeout: 10000 });
        const ariaChecked = await this.page.locator(this.validVatToggle).getAttribute('aria-checked');
        return ariaChecked === 'true';
    }

    /**
     * Toggles the tax exempt switch
     */
    async toggleTaxExempt(): Promise<void> {
        console.log('Toggling tax exempt switch', new Date());
        await this.page.locator(this.taxExemptToggle).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.taxExemptToggle).click();
    }

    /**
     * Checks if tax exempt is enabled
     */
    async isTaxExemptEnabled(): Promise<boolean> {
        console.log('Validating tax exempt enabled state', new Date());
        await this.page.locator(this.taxExemptToggle).waitFor({ state: 'visible', timeout: 10000 });
        const ariaChecked = await this.page.locator(this.taxExemptToggle).getAttribute('aria-checked');
        return ariaChecked === 'true';
    }

    /**
     * Clicks the classification dropdown
     */
    async clickClassificationDropdown(): Promise<void> {
        console.log('Clicking classification dropdown', new Date());
        await this.page.locator(this.classificationDropdown).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.classificationDropdown).click();
    }

    // ========== CONTACTS FORM METHODS ==========

    /**
     * Checks if the contacts section is visible
     */
    async isContactsSectionVisible(): Promise<boolean> {
        console.log('Validating contacts section visibility', new Date());
        await this.page.locator(this.contactsSection).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.contactsSection).isVisible();
    }

    /**
     * Gets the contacts title text
     */
    async getContactsTitle(): Promise<string> {
        console.log('Getting contacts title', new Date());
        await this.page.locator(this.contactsTitle).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.contactsTitle).textContent() || '';
    }

    /**
     * Clicks the add contact button
     */
    async clickAddContactButton(): Promise<void> {
        console.log('Clicking add contact button', new Date());
        await this.page.locator(this.addContactButton).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.addContactButton).click();
    }

    /**
     * Checks if the add contact button is visible
     */
    async isAddContactButtonVisible(): Promise<boolean> {
        console.log('Validating add contact button visibility', new Date());
        await this.page.locator(this.addContactButton).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.addContactButton).isVisible();
    }

    /**
     * Fills the first name field
     */
    async fillFirstNameField(firstName: string): Promise<void> {
        console.log('Filling first name field', new Date());
        await this.page.locator(this.firstNameField).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.firstNameField).fill(firstName);
    }

    /**
     * Gets the first name field value
     */
    async getFirstNameFieldValue(): Promise<string> {
        console.log('Getting first name field value', new Date());
        await this.page.locator(this.firstNameField).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.firstNameField).inputValue();
    }

    /**
     * Fills the last name field
     */
    async fillLastNameField(lastName: string): Promise<void> {
        console.log('Filling last name field', new Date());
        await this.page.locator(this.lastNameField).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.lastNameField).fill(lastName);
    }

    /**
     * Gets the last name field value
     */
    async getLastNameFieldValue(): Promise<string> {
        console.log('Getting last name field value', new Date());
        await this.page.locator(this.lastNameField).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.lastNameField).inputValue();
    }

    /**
     * Fills the email field
     */
    async fillEmailField(email: string): Promise<void> {
        console.log('Filling email field', new Date());
        await this.page.locator(this.emailField).fill(email);
    }

    /**
     * Gets the email field value
     */
    async getEmailFieldValue(): Promise<string> {
        console.log('Getting email field value', new Date());
        await this.page.locator(this.emailField).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.emailField).inputValue();
    }

    /**
     * Fills the contact phone field
     */
    async fillContactPhoneField(phone: string): Promise<void> {
        console.log('Filling contact phone field', new Date());
        await this.page.locator(this.contactPhoneField).fill(phone);
    }

    /**
     * Gets the contact phone field value
     */
    async getContactPhoneFieldValue(): Promise<string> {
        console.log('Getting contact phone field value', new Date());
        await this.page.locator(this.contactPhoneField).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.contactPhoneField).inputValue();
    }

    /**
     * Toggles the add to invoices switch
     */
    async toggleAddToInvoices(): Promise<void> {
        console.log('Toggling add to invoices switch', new Date());
        await this.page.locator(this.addToInvoicesToggle).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.addToInvoicesToggle).click();
    }

    /**
     * Checks if add to invoices is enabled
     */
    async isAddToInvoicesEnabled(): Promise<boolean> {
        console.log('Validating add to invoices enabled state', new Date());
        await this.page.locator(this.addToInvoicesToggle).waitFor({ state: 'visible', timeout: 10000 });
        const ariaChecked = await this.page.locator(this.addToInvoicesToggle).getAttribute('aria-checked');
        return ariaChecked === 'true';
    }

    // ========== ADDRESS FORM METHODS ==========

    /**
     * Checks if the address section is visible
     */
    async isAddressSectionVisible(): Promise<boolean> {
        console.log('Validating address section visibility', new Date());
        await this.page.locator(this.addressSection).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.addressSection).isVisible();
    }

    /**
     * Gets the address title text
     */
    async getAddressTitle(): Promise<string> {
        console.log('Getting address title', new Date());
        await this.page.locator(this.addressTitle).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.addressTitle).textContent() || '';
    }

    /**
     * Clicks the address tab
     */
    async clickAddressTab(tabName : string): Promise<void> {
        console.log(`Clicking ${tabName} address tab`, new Date());
        await this.page.locator(this.AddressTab(tabName)).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.AddressTab(tabName)).click();
    }

    /**
     * Clicks the Copy button
     */
    async clickCopyBillingButton(): Promise<void> {
        console.log('Clicking Copy button', new Date());
        await this.page.locator(this.copyBillingButton).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.copyBillingButton).click();
    }

    /**
     * Checks if address tab is active
     */
    async isAddressTabActive(tabName : string): Promise<boolean> {
        console.log('Validating billing address tab active state', new Date());
        await this.page.locator(this.AddressTab(tabName)).waitFor({ state: 'visible', timeout: 10000 });
        const style = await this.page.locator(this.AddressTab(tabName)).getAttribute('style');
        return style?.includes('border-bottom: 1px solid rgb(42, 48, 61)') || false;
    }

    /**
     * Fills the billing street field
     */
    async fillBillingStreetField(street: string): Promise<void> {
        console.log('Filling billing street field', new Date());
        await this.page.locator(this.billingStreetField).fill(street);
    }

    /**
     * Gets the billing street field value
     */
    async getBillingStreetFieldValue(): Promise<string> {
        console.log('Getting billing street field value', new Date());
        await this.page.locator(this.billingStreetField).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.billingStreetField).inputValue();
    }

    /**
     * Fills the billing apt field
     */
    async fillBillingAptField(apt: string): Promise<void> {
        console.log('Filling billing apt field', new Date());
        await this.page.locator(this.billingAptField).fill(apt);
    }

    /**
     * Gets the billing apt field value
     */
    async getBillingAptFieldValue(): Promise<string> {
        console.log('Getting billing apt field value', new Date());
        await this.page.locator(this.billingAptField).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.billingAptField).inputValue();
    }

    /**
     * Fills the billing city field
     */
    async fillBillingCityField(city: string): Promise<void> {
        console.log('Filling billing city field', new Date());
        await this.page.locator(this.billingCityField).fill(city);
    }

    /**
     * Gets the billing city field value
     */
    async getBillingCityFieldValue(): Promise<string> {
        console.log('Getting billing city field value', new Date());
        await this.page.locator(this.billingCityField).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.billingCityField).inputValue();
    }

    /**
     * Fills the billing state field
     */
    async fillBillingStateField(state: string): Promise<void> {
        console.log('Filling billing state field', new Date());
        await this.page.locator(this.billingStateField).fill(state);
    }

    /**
     * Gets the billing state field value
     */
    async getBillingStateFieldValue(): Promise<string> {
        console.log('Getting billing state field value', new Date());
        await this.page.locator(this.billingStateField).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.billingStateField).inputValue();
    }

    /**
     * Fills the billing postal code field
     */
    async fillBillingPostalCodeField(postalCode: string): Promise<void> {
        console.log('Filling billing postal code field', new Date());
        await this.page.locator(this.billingPostalCodeField).fill(postalCode);
    }

    /**
     * Gets the billing postal code field value
     */
    async getBillingPostalCodeFieldValue(): Promise<string> {
        console.log('Getting billing postal code field value', new Date());
        await this.page.locator(this.billingPostalCodeField).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.billingPostalCodeField).inputValue();
    }

    /**
     * Clicks the billing country dropdown
     */
    async clickBillingCountryDropdown(): Promise<void> {
        console.log('Clicking billing country dropdown', new Date());
        await this.page.locator(this.billingCountryDropdown).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.billingCountryDropdown).click();
    }

    /**
     * Search and select country inside dropdown
     */
    async searchAndSelectBillingCountry(country: string): Promise<void> {
        console.log('Searching and selecting billing country:', country, new Date());
        await this.page.locator(this.billingCountryDropdown).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.billingCountryDropdown).click();
    }

    /**
     * Selects "Country" in the billing country dropdown
     */
    async selectBillingCountry(country: string): Promise<void> {
        console.log(`Selecting ${country} in billing country dropdown`, new Date());
        await this.page.locator(this.billingCountryDropdown).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.billingCountryDropdown).click();
        await this.page.locator(this.billingCountryDropdown).pressSequentially(country);
        await this.page.waitForTimeout(1000);
        await this.page.locator(this.billingCountryDropdown).press('Enter');
    }

    /**
     * Fills the shipping street field
     */
    async fillShippingStreetField(street: string): Promise<void> {
        console.log('Filling shipping street field', new Date());
        await this.page.locator(this.shippingStreetField).fill(street);
    }

    /**
     * Gets the shipping street field value
     */
    async getShippingStreetFieldValue(): Promise<string> {
        console.log('Getting shipping street field value', new Date());
        await this.page.locator(this.shippingStreetField).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.shippingStreetField).inputValue();
    }

    /**
     * Gets the shipping apt/suite field value
     */
    async getShippingAptFieldValue(): Promise<string> {
        console.log('Getting shipping apt/suite field value', new Date());
        await this.page.locator(this.shippingAptField).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.shippingAptField).inputValue();
    }

    /**
     * Fills the shipping city field
     */
    async fillShippingCityField(city: string): Promise<void> {
        console.log('Filling shipping city field', new Date());
        await this.page.locator(this.shippingCityField).fill(city);
    }

    /**
     * Gets the shipping city field value
     */
    async getShippingCityFieldValue(): Promise<string> {
        console.log('Getting shipping city field value', new Date());
        await this.page.locator(this.shippingCityField).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.shippingCityField).inputValue();
    }

    /**
     * Gets the shipping state field value
     */
    async getShippingStateFieldValue(): Promise<string> {
        console.log('Getting shipping state field value', new Date());
        await this.page.locator(this.shippingStateField).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.shippingStateField).inputValue();
    }

    /**
     * Gets the shipping postal code field value
     */
    async getShippingPostalCodeFieldValue(): Promise<string> {
        console.log('Getting shipping postal code field value', new Date());
        await this.page.locator(this.shippingPostalCodeField).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.shippingPostalCodeField).inputValue();
    }

    /**
     * Clicks the shipping country dropdown
     */
    async clickShippingCountryDropdown(): Promise<void> {
        console.log('Clicking shipping country dropdown', new Date());
        await this.page.locator(this.shippingCountryDropdown).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.shippingCountryDropdown).click();
    }

    /**
     * Gets the shipping country dropdown
     */
    async getShippingCountryDropdown(): Promise<string> {
        console.log('Getting shipping country dropdown', new Date());
        await this.page.locator(this.shippingCountryDropdown).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.shippingCountryDropdown).innerText();
    }

    // ========== UTILITY METHODS ==========

    /**
     * Waits for the page to be fully loaded
     */
    async waitForPageToLoad(): Promise<void> {
        console.log('Waiting for page to load', new Date());
        await this.page.waitForSelector(this.pageTitle);
        await this.page.waitForSelector(this.companyDetailsSection);
        await this.page.waitForSelector(this.contactsSection);
        await this.page.waitForSelector(this.addressSection);
    }

    /**
     * Validates that the create clients page is loaded correctly
     */
    async validateCreateClientsPageIsLoaded(): Promise<void> {
        console.log('Validating create clients page is loaded', new Date());
        await expect(this.page.locator(this.pageTitle)).toBeVisible();
        await expect(this.page.locator(this.companyDetailsSection)).toBeVisible();
        await expect(this.page.locator(this.contactsSection)).toBeVisible();
        await expect(this.page.locator(this.addressSection)).toBeVisible();
        await expect(this.page.locator(this.saveButton)).toBeVisible();
        await expect(this.page.locator(this.breadcrumbNewClient)).toBeVisible();
    }

    /**
     * Fills basic company information
     */
    async fillBasicCompanyInfo(data: {
        name: string;
        number?: string;
        idNumber?: string;
        website?: string;
        phone?: string;
    }): Promise<void> {
        console.log('Filling basic company info', new Date());
        await this.fillNameField(data.name);
        
        if (data.number) {
            await this.fillNumberField(data.number);
        }
        
        if (data.idNumber) {
            await this.fillIdNumberField(data.idNumber);
        }
        
        if (data.website) {
            await this.fillWebsiteField(data.website);
        }
        
        if (data.phone) {
            await this.fillPhoneField(data.phone);
        }
    }

    /**
     * Fills contact information
     */
    async fillContactInfo(data: {
        firstName: string;
        lastName: string;
        email: string;
        phone?: string;
        addToInvoices?: boolean;
    }): Promise<void> {
        console.log('Filling contact info', new Date());
        await this.fillFirstNameField(data.firstName);
        await this.fillLastNameField(data.lastName);
        await this.fillEmailField(data.email);
        
        if (data.phone) {
            await this.fillContactPhoneField(data.phone);
        }
        
        if (data.addToInvoices) {
            await this.toggleAddToInvoices();
        }
    }

    /**
     * Fills billing address information
     */
    async fillBillingAddress(data: {
        street: string;
        apt: string;
        city: string;
        state: string;
        postalCode: string;
    }): Promise<void> {
        console.log('Filling billing address', new Date());
        await this.page.locator(this.billingStreetField).waitFor({ state: 'visible', timeout: 10000 });
        await this.clickAddressTab('Billing Address');
        await this.fillBillingStreetField(data.street);
        await this.fillBillingAptField(data.apt);
        await this.fillBillingCityField(data.city);
        await this.fillBillingStateField(data.state);
        await this.fillBillingPostalCodeField(data.postalCode);
    }

    /**
     * Fills complete client form
     */
    async fillCompleteClientForm(data: {
        company: {
            name: string;
            number?: string;
            idNumber?: string;
            website?: string;
            phone?: string;
        };
        contact: {
            firstName: string;
            lastName: string;
            email: string;
            phone?: string;
            addToInvoices?: boolean;
        };
        billing: {
            street: string;
            apt: string;
            city: string;
            state: string;
            postalCode: string;
        };
    }): Promise<void> {
        console.log('Filling complete client form', new Date());
        await this.fillBasicCompanyInfo(data.company);
        await this.fillContactInfo(data.contact);
        await this.fillBillingAddress(data.billing);
    }

    /**
     * Creates a new client with provided data
     */
    async createNewClient(data: {
        company: {
            name: string;
            number?: string;
            idNumber?: string;
            website?: string;
            phone?: string;
        };
        contact: {
            firstName: string;
            lastName: string;
            email: string;
            phone?: string;
            addToInvoices?: boolean;
        };
        billing: {
            street: string;
            apt: string;
            city: string;
            state: string;
            postalCode: string;
        };
    }): Promise<void> {
        console.log('Creating new client', new Date());
        await this.waitForPageToLoad();
        await this.validateCreateClientsPageIsLoaded();
        await this.fillCompleteClientForm(data);
        await this.clickSaveButton();
    }

    /**
     * Checks if all required fields are filled
     */
    async areRequiredFieldsFilled(): Promise<boolean> {
        console.log('Checking if required fields are filled', new Date());
        const nameValue = await this.getNameFieldValue();
        const firstNameValue = await this.getFirstNameFieldValue();
        const lastNameValue = await this.getLastNameFieldValue();
        const emailValue = await this.getEmailFieldValue();
        
        return nameValue !== '' && firstNameValue !== '' && 
               lastNameValue !== '' && emailValue !== '';
    }

    /**
     * Gets all form data for validation
     */
    async getAllFormData(): Promise<{
        company: {
            name: string;
            number: string;
            idNumber: string;
            website: string;
            phone: string;
        };
        contact: {
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
        };
        billing: {
            street: string;
            apt: string;
            city: string;
            state: string;
            postalCode: string;
        };
    }> {
        console.log('Getting all form data', new Date());
        return {
            company: {
                name: await this.getNameFieldValue(),
                number: await this.getNumberFieldValue(),
                idNumber: await this.getIdNumberFieldValue(),
                website: await this.getWebsiteFieldValue(),
                phone: await this.getPhoneFieldValue(),
            },
            contact: {
                firstName: await this.getFirstNameFieldValue(),
                lastName: await this.getLastNameFieldValue(),
                email: await this.getEmailFieldValue(),
                phone: await this.getContactPhoneFieldValue(),
            },
            billing: {
                street: await this.getBillingStreetFieldValue(),
                apt: await this.getBillingAptFieldValue(),
                city: await this.getBillingCityFieldValue(),
                state: await this.getBillingStateFieldValue(),
                postalCode: await this.getBillingPostalCodeFieldValue(),
            }
        };
    }  
}