import { Page, Locator, expect } from '@playwright/test';

export class ClientsPage {

  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

    // ========== PAGE HEADER SELECTORS ==========
    private readonly pageTitle = 'h2:has-text("Clients")';
    private readonly quickAddButton = '[data-cy="quickPopoverButton"]';
    private readonly searchButtonMobile = 'button:has(svg[viewBox="0 0 24 24"]:has(path[d*="M10 18a7.952"]))';
    private readonly searchBarDesktop = 'div:has(p:has-text("Find invoices, clients, and more"))';
    private readonly searchInput = 'input[placeholder*="Find invoices, clients, and more"]';
    private readonly searchShortcut = 'p:has-text("Ctrl+K")';
    private readonly notificationButton = 'button:has(svg[viewBox="0 0 24 24"]:has(path[d="M18 8A6 6 0"]))';
    private readonly upgradeButton = 'button:has-text("Unlock Pro"), button:has-text("Upgrade")';

    // ========== BREADCRUMB SELECTORS ==========
    private readonly breadcrumbContainer = 'nav[aria-label="Breadcrumb"]';
    private readonly breadcrumbHome = 'a[href="#/dashboard"]:has(svg[viewBox="0 0 18 18"])';
    private readonly breadcrumbSeparator = 'span:has-text("/")';
    private readonly breadcrumbClients = 'a[href="#/clients"]:has-text("Clients")';

    // ========== FILTER AND CONTROL SELECTORS ==========
    private readonly filterInput = 'input#filter[placeholder="Filter"]';
    private readonly lifecycleDropdown = '//div[.//span[contains(text(),"Lifecycle")]]//div[@class="sm:w-auto w-full css-b62m3t-container"]';
    private readonly lifecycleValue = (columnName: string) => `//span[text()="${columnName}"]/preceding::input[@type="checkbox"][1]`;
    private readonly applylifecycleButton = 'div.flex.w-full.px-3.space-x-2 > button:nth-child(2)';
    private readonly columnsButton = 'button:has(span:has-text("Columns"))';
    private readonly columnsIcon = 'button:has(svg[viewBox="0 0 12 12"]:has(line[x1="6"][y1="1.25"]))';
    private readonly importButton = 'a[href="#/clients/import"]';
    private readonly importIcon = 'svg[viewBox="0 0 18 18"]:has(path[d*="M12.28,8.97"])';
    private readonly newClientButton = '//a[contains(@href, "#/clients/create") and contains(text(), "New Client")]';
    private readonly generalActionsButton = '//*[@id="root"]/div/div[2]/div[3]/main/div[2]/div/div[1]/div[1]/div[1]/button';
    private readonly bulkUpdateOption = '//button[div[text()="Bulk Update"]]'
    private readonly bulkUpdateColumnsDropdown = '//*[@id="headlessui-dialog-:r1a:"]/div/div[2]/div[2]/div/div[1]/div/div/div[1]';
    private readonly bulkUpdateColumnsOption = (option: string) => `//*[@id="react-select-18-option-${option}"]`;
    private readonly bulkUpdateValueDropdown = '//*[@id="headlessui-dialog-:r1a:"]/div/div[2]/div[2]/div/div[2]/div/select';
    private readonly bulkUpdateValueInput = (value: string) =>  `select option:has-text("${value}")`;
    private readonly bulkUpdateOptionUpdateButton = '//button[div[text()="Update"] or text()="Update"]'

    // ========== DATA TABLE SELECTORS ==========
    private readonly dataTable = '[data-cy="dataTable"]';
    private readonly tableContainer = 'div.overflow-auto.min-w-full.rounded-md.shadow-sm';
    private readonly table = 'table.min-w-full.table-fixed';
    private readonly tableHeader = 'thead';
    private readonly tableBody = 'tbody';
    private readonly tableColumnsName = 'thead th';
    private readonly selectClientCheckbox = (client: string) => `//tr[td[2]//a[text()="${client}"]]//input[@type="checkbox"]`;

    // ========== TABLE HEADER COLUMN SELECTORS ==========
    private readonly headerCheckbox = 'thead input[type="checkbox"]';
    private readonly headerName = (columnName: string) => `th:has(span:has-text("${columnName}"))`; 
    private readonly headerActions = 'th:last-child';

    // ========== SORTING SELECTORS ==========
    private readonly nameHeaderContainer = 'th:has(span:has-text("Name"))';
    private readonly sortArrowAscending = 'svg polyline[points="16.5 12.5 10 6 3.5 12.5"][stroke="#2a303d"]';
    private readonly sortArrowDescending = 'svg polyline[points="3.5 7.5 10 14 16.5 7.5"][stroke="#2a303d"]';
    
    // Generic column selectors
    private readonly columnHeaderContainer = (columnName: string) => `th:has(span:has-text("${columnName}"))`;
    private readonly columnDataSelector = (columnIndex: number) => `tbody td:nth-child(${columnIndex})`;
    
    // Specific column data selectors
    private readonly contactEmailData = 'tbody td:nth-child(3)';
    private readonly idNumberData = 'tbody td:nth-child(4)';
    private readonly balanceData = 'tbody td:nth-child(5)';
    private readonly paidToDateData = 'tbody td:nth-child(6)';
    private readonly dateCreatedData = 'tbody td:nth-child(7)';
    private readonly lastLoginData = 'tbody td:nth-child(8)';
    private readonly websiteData = 'tbody td:nth-child(9)';

    // ========== Context Menu  (Actions Button) ==========
    private readonly contextMenu = 'div[role="menu"]';
    private readonly contextMenuEdit = 'button:has-text("Edit")';
    private readonly contextMenuArchiveDeletePurgeOption = (option: 'Archive' | 'Delete' | 'Purge' | 'Restore') => `//button[div[contains(text(),"${option}")]]`;
    private readonly editContextMenuOption = '//a[contains(@href,"/edit") and .//div[text()="Edit"]]'
    private readonly confirmationContinueButton = '//button[contains(text(),"Continue")]';
   
    // ========== TABLE ROW SELECTORS ==========
    private readonly tableRowsAll = 'tbody tr.table-row';
    private readonly clientCheckboxes = 'tbody input[type="checkbox"][data-cy="dataTableCheckbox"]';
    private readonly clientNames = 'tbody td a[href*="/clients/"]';
    private readonly clientBalances = 'tbody td:nth-child(5)';
    private readonly clientDateCreated = 'tbody td:nth-child(7)';
    private readonly actionsButtonSelector = (clientName: string) => `//tbody//tr[td[2]/a[contains(text(),"${clientName}")]]//button[@data-cy="chevronDownButton"]`;

    // ========== SPECIFIC CLIENT DATA SELECTORS ==========
    private readonly clientNameGeneric = (name: string) => `//tbody//td/a[contains(@href, "/clients/") and contains(text(), "${name}")]`;

    // ========== PAGINATION SELECTORS ==========
    private readonly paginationContainer = 'div:has(span:has-text("Total results:"))';
    private readonly totalResults = 'span:has-text("Total results:")';
    private readonly paginationInfo = 'span:has-text("1 / 1")';
    private readonly firstPageButton = 'div:has(svg[viewBox="0 0 12 12"]:has(polyline[points="5.75 2 1.75 6 5.75 10"]))';
    private readonly previousPageButton = 'div:has(svg[viewBox="0 0 12 12"]:has(path[d*="m7.75,11c-.192,0-.384-.073-.53-.22L2.97"]))';
    private readonly nextPageButton = 'div:has(svg[viewBox="0 0 12 12"]:has(path[d*="m4.25,11c-.192,0-.384-.073-.53-.22"]))';
    private readonly lastPageButton = 'div:has(svg[viewBox="0 0 12 12"]:has(path[d*="m6.25,10.75c-.192,0-.384-.073-.53-.22"]))';
    private readonly rowsPerPageDropdown = 'div:has(span:has-text("rows:"))';
    private readonly rowsPerPageValue = 'div.css-ood9ll-singleValue:has-text("10")';

    /**
     * Gets the page title text
     */
    async getPageTitle(): Promise<string> {
        return await this.page.locator(this.pageTitle).textContent() || '';
    }

    /**
     * Checks if the page title is visible
     * @returns {Promise<boolean>} True if page title is visible, false otherwise
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
        await this.page.locator(this.quickAddButton).click();
    }

    /**
     * Checks if the quick add button is visible
     * @returns {Promise<boolean>} True if quick add button is visible, false otherwise
     */
    async isQuickAddButtonVisible(): Promise<boolean> {
        console.log('Validating quick add button visibility', new Date());
        await this.page.locator(this.quickAddButton).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.quickAddButton).isVisible();
    }

    /**
     * Clicks the search button (mobile)
     */
    async clickSearchButtonMobile(): Promise<void> {
        await this.page.locator(this.searchButtonMobile).click();
    }

    /**
     * Checks if the desktop search bar is visible
     * @returns {Promise<boolean>} True if search bar is visible, false otherwise
     */
    async isSearchBarDesktopVisible(): Promise<boolean> {
        console.log('Validating search bar desktop visibility', new Date());
        await this.page.locator(this.searchBarDesktop).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.searchBarDesktop).isVisible();
    }

    /**
     * Gets the search shortcut text
     */
    async getSearchShortcutText(): Promise<string> {
        return await this.page.locator(this.searchShortcut).textContent() || '';
    }

    /**
     * Clicks the notification button
     */
    async clickNotificationButton(): Promise<void> {
        await this.page.locator(this.notificationButton).click();
    }

    /**
     * Checks if the notification button is visible
     * @returns {Promise<boolean>} True if notification button is visible, false otherwise
     */
    async isNotificationButtonVisible(): Promise<boolean> {
        console.log('Validating notification button visibility', new Date());
        await this.page.locator(this.notificationButton).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.notificationButton).isVisible();
    }

    /**
     * Clicks the upgrade button
     */
    async clickUpgradeButton(): Promise<void> {
        await this.page.locator(this.upgradeButton).click();
    }

    /**
     * Gets the upgrade button text
     */
    async getUpgradeButtonText(): Promise<string> {
        return await this.page.locator(this.upgradeButton).textContent() || '';
    }

    // ========== BREADCRUMB METHODS ==========

    /**
     * Checks if the breadcrumb container is visible
     * @returns {Promise<boolean>} True if breadcrumb is visible, false otherwise
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
        await this.page.locator(this.breadcrumbHome).click();
    }

    /**
     * Checks if the clients breadcrumb is visible
     * @returns {Promise<boolean>} True if clients breadcrumb is visible, false otherwise
     */
    async isBreadcrumbClientsVisible(): Promise<boolean> {
        console.log('Validating breadcrumb clients visibility', new Date());
        await this.page.locator(this.breadcrumbClients).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.breadcrumbClients).isVisible();
    }

    // ========== FILTER AND CONTROL METHODS ==========

    /**
     * Types in the filter input
     */
    async typeInFilterInput(text: string): Promise<void> {
        await this.page.locator(this.filterInput).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.filterInput).pressSequentially(text);
    }

    /**
     * Gets the filter input value
     */
    async getFilterInputValue(): Promise<string> {
        return await this.page.locator(this.filterInput).inputValue();
    }

    /**
     * Clicks the lifecycle dropdown
     */
    async clickLifecycleDropdown(): Promise<void> {
        await this.page.locator(this.lifecycleDropdown).click();
    }

    /**
     * Clicks the lifecycle dropdown and select option
     */
    async clickLifecycleDropdownAndSelectOption(option: string): Promise<void> {
        await this.page.locator(this.lifecycleDropdown).click();
        await this.page.locator(this.lifecycleValue(option)).check();
    }

    /**
     * Clicks the lifecycle dropdown and select all options
     */
    async clickLifecycleDropdownAndSelectAllOptions(): Promise<void> {
        await this.page.locator(this.lifecycleDropdown).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.lifecycleDropdown).click();
        await this.page.locator(this.lifecycleValue('Active')).check();
        await this.page.locator(this.lifecycleValue('Archived')).check();
        await this.page.locator(this.lifecycleValue('Deleted')).check();
        await this.page.locator(this.applylifecycleButton).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.applylifecycleButton).click();
    }

    /**
     * Gets the current lifecycle value
     */
    async getLifecycleValue(option:string): Promise<string> {
        return await this.page.locator(this.lifecycleValue(option)).textContent() || '';
    }

    /**
     * Checks if the lifecycle dropdown is visible
     * @returns {Promise<boolean>} True if lifecycle dropdown is visible, false otherwise
     */
    async isLifecycleDropdownVisible(): Promise<boolean> {
        console.log('Validating lifecycle dropdown visibility', new Date());
        await this.page.locator(this.lifecycleDropdown).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.lifecycleDropdown).isVisible();
    }

    /**
     * Clicks the columns button
     */
    async clickColumnsButton(): Promise<void> {
        await this.page.locator(this.columnsButton).click();
    }

    /**
     * Checks if the columns button is visible
     * @returns {Promise<boolean>} True if columns button is visible, false otherwise
     */
    async isColumnsButtonVisible(): Promise<boolean> {
        console.log('Validating columns button visibility', new Date());
        await this.page.locator(this.columnsButton).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.columnsButton).isVisible();
    }

    /**
     * Clicks the import button
     */
    async clickImportButton(): Promise<void> {
        await this.page.locator(this.importButton).click();
    }

    /**
     * Checks if the import button is visible
     * @returns {Promise<boolean>} True if import button is visible, false otherwise
     */
    async isImportButtonVisible(): Promise<boolean> {
        console.log('Validating import button visibility', new Date());
        await this.page.locator(this.importButton).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.importButton).isVisible();
    }

    /**
     * Clicks the new client button
     */
    async clickNewClientButton(): Promise<void> {
        await this.page.locator(this.newClientButton).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.newClientButton).click();
    }

    /**
     * Checks if the new client button is visible
     * @returns {Promise<boolean>} True if new client button is visible, false otherwise
     */
    async isNewClientButtonVisible(): Promise<boolean> {
        console.log('Validating new client button visibility', new Date());
        await this.page.locator(this.newClientButton).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.newClientButton).isVisible();
    }

    /**
     * Gets the new client button text
     */
    async getNewClientButtonText(): Promise<string> {
        return await this.page.locator(this.newClientButton).textContent() || '';
    }

    /**
     * Clicks the general action button
     */
    async clickGeneralClientActionButton(): Promise<void> {
        await this.page.locator(this.generalActionsButton).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.generalActionsButton).click();
    }

    /**
     * Clicks the bulk update button
     */
    async clickBulkUpdateButton(): Promise<void> {
        await this.page.locator(this.bulkUpdateOption).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.bulkUpdateOption).click();
    }

    /**
     * Select Column to update and Value for bulk update
     * @param value - The value to set
     * @param column - The column to update
     */
    async selectBulkUpdateColumnAndValue(): Promise<void> {
        await this.page.locator('.css-1y9i3r8').click();
        await this.page.getByRole('option', { name: 'Industry' }).click();
        await this.page.locator('select').selectOption('14');
    }

    /**
     * Clicks the Update for Bulk Update button
     */
    async clickUpdateBulkUpdateButton(): Promise<void> {
        await this.page.locator(this.bulkUpdateOptionUpdateButton).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.bulkUpdateOptionUpdateButton).click();
    }

    // ========== DATA TABLE METHODS ==========

    /**
     * Checks if the data table is visible
     * @returns {Promise<boolean>} True if data table is visible, false otherwise
     */
    async isDataTableVisible(): Promise<boolean> {
        console.log('Validating data table visibility', new Date());
        await this.page.locator(this.dataTable).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.dataTable).isVisible();
    }

    /**
     * Checks if the table is visible
     * @returns {Promise<boolean>} True if table is visible, false otherwise
     */
    async isTableVisible(): Promise<boolean> {
        console.log('Validating table visibility', new Date());
        await this.page.locator(this.table).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.table).isVisible();
    }

    /**
     * Gets the number of table rows
     */
    async getTableRowCount(): Promise<number> {
        return await this.page.locator(this.tableRowsAll).count();
    }

    /**
     * Clicks the row checkbox for a specific client by name
     */
    async clickRowCheckboxByClientName(clientName: string): Promise<void> {
        await this.page.locator(this.selectClientCheckbox(clientName)).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.selectClientCheckbox(clientName)).click();
    }

    // ========== TABLE HEADER METHODS ==========

    /**
     * Clicks the header checkbox to select/deselect all
     */
    async clickHeaderCheckbox(): Promise<void> {
        await this.page.locator(this.headerCheckbox).click();
    }

    /**
     * Checks if the header checkbox is checked
     * @returns {Promise<boolean>} True if header checkbox is checked, false otherwise
     */
    async isHeaderCheckboxChecked(): Promise<boolean> {
        console.log('Validating header checkbox state', new Date());
        await this.page.locator(this.headerCheckbox).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.headerCheckbox).isChecked();
    }

    /**
     * Clicks the Name column header
     */
    async clickNameHeader(columnName: string): Promise<void> {
        await this.page.locator(this.headerName(columnName)).click();
    }

    /**
     * Checks if all table headers are visible
     * @returns {Promise<boolean>} True if all headers are visible, false otherwise
     */
    async areTableHeadersVisible(columnName: string): Promise<boolean> {
        console.log('Validating all table headers visibility', new Date());
        const headers = [
            this.headerName(columnName),
        ];

        for (const header of headers) {
            await this.page.locator(header).waitFor({ state: 'visible', timeout: 10000 });
            if (!await this.page.locator(header).isVisible()) {
                return false;
            }
        }
        return true;
    }

    /**
     * Gets all column names in the table
     * @returns {Promise<string[]>} Array of all column names in the table
     */
    async getAllColumnsName(): Promise<string[]> {
      await this.page.locator(this.tableColumnsName).first().waitFor({ state: 'visible', timeout: 5000 });
      const columnHeaders = await this.page.locator(this.tableColumnsName).allInnerTexts();
      // const cleanedHeaders = columnHeaders.map(h => h.trim()).filter(Boolean);
      return columnHeaders;
    }

    // ========== CLIENT ROW METHODS ==========

    /**
     * Gets all client names from the table
     */
    async getAllClientNames(): Promise<string[]> {
        const nameElements = await this.page.locator(this.clientNames).all();
        const names: string[] = [];
        for (const element of nameElements) {
            const name = await element.textContent();
            if (name) names.push(name);
        }
        return names;
    }

    /**
     * Clicks a client by name
     */
    async clickClientByName(clientName: string): Promise<void> {
        await this.page.locator(`a:has-text("${clientName}")`).click();
    }

    /**
     * Gets the first client name
     */
    async getFirstClientName(): Promise<string> {
        return await this.page.locator(this.clientNames).first().textContent() || '';
    }

    /**
     * Clicks the first client checkbox
     */
    async clickFirstClientCheckbox(): Promise<void> {
        await this.page.locator(this.clientCheckboxes).first().click();
    }

    /**
     * Checks if the first client checkbox is checked
     * @returns {Promise<boolean>} True if first client checkbox is checked, false otherwise
     */
    async isFirstClientCheckboxChecked(): Promise<boolean> {
        console.log('Validating first client checkbox state', new Date());
        await this.page.locator(this.clientCheckboxes).first().waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.clientCheckboxes).first().isChecked();
    }

    /**
     * Gets all client balances
     */
    async getAllClientBalances(): Promise<string[]> {
        const balanceElements = await this.page.locator(this.clientBalances).all();
        const balances: string[] = [];
        for (const element of balanceElements) {
            const balance = await element.textContent();
            if (balance) balances.push(balance.trim());
        }
        return balances;
    }

    /**
     * Gets all client creation dates
     */
    async getAllClientCreationDates(): Promise<string[]> {
        const dateElements = await this.page.locator(this.clientDateCreated).all();
        const dates: string[] = [];
        for (const element of dateElements) {
            const date = await element.textContent();
            if (date) dates.push(date.trim());
        }
        return dates;
    }

    /**
     * Clicks the action button for the specific client
     */
    async clickClientActionButton(name: string): Promise<void> {
        await this.page.locator(this.actionsButtonSelector(name)).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.actionsButtonSelector(name)).click();
    }

    /**
     * Clicks the action button for the specific client
     */
    async confirmPurgeClient(): Promise<void> {
        await this.page.locator(this.confirmationContinueButton).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.confirmationContinueButton).click();
    }

    /**
     * Gets the Purge Confirmation text
     */
    async isPurgeConfirmationTextVisible(): Promise<boolean> {
      console.log('Getting purge confirmation text', new Date());
      try {
          await this.page.getByText('Successfully purged Client').waitFor({ state: 'visible', timeout: 2000 });
          return true;
      } catch {
          return false;
      }
    }

    /**
     * Gets the Restore Confirmation text
     */
    async isRestoreConfirmationTextVisible(): Promise<boolean> {
      console.log('Getting restore confirmation text', new Date());
      try {
          await this.page.getByText('Successfully restored Client').waitFor({ state: 'visible', timeout: 2000 });
          return true;
      } catch {
          return false;
      }
    }

   /**
     * Gets the Archive Confirmation text
     */
    async isArchiveConfirmationTextVisible(): Promise<boolean> {
      console.log('Getting archive confirmation text', new Date());
      try {
          await this.page.getByText('Successfully archived Client').waitFor({ state: 'visible', timeout: 2000 });
          return true;
      } catch {
          return false;
      }
    }

   /**
     * Gets the Delete Confirmation text
     */
    async isDeleteConfirmationTextVisible(): Promise<boolean> {
      console.log('Getting delete confirmation text', new Date());
      try {
          await this.page.getByText('Successfully deleted Client').waitFor({ state: 'visible', timeout: 2000 });
          return true;
      } catch {
          return false;
      }
    }

    /**
     * Checks if client action buttons are visible
     * @returns {Promise<boolean>} True if client action buttons are visible, false otherwise
     */
    async areClientActionButtonsVisible(name: string): Promise<boolean> {
        console.log('Validating client action buttons visibility', new Date());
        await this.page.locator(this.actionsButtonSelector(name)).first().waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.actionsButtonSelector(name)).first().isVisible();
    }

    // ========== SPECIFIC CLIENT METHODS ==========

    /**
     * Clicks the Specific client link
     */
    async clickSpecificClient(clientName: string): Promise<void> {
        await this.page.locator(this.clientNameGeneric(clientName)).click();
    }

    /**
     * Checks if the Specific client is visible
     * @returns {Promise<boolean>} True if Specific client is visible, false otherwise
     */
    async isSpecificClientVisible(clientName: string): Promise<boolean> {
        console.log(`Validating ${clientName} client visibility`, new Date());
        await this.page.waitForTimeout(2000);
        return await this.page.locator(this.clientNameGeneric(clientName)).isVisible();
    }

    // ========== PAGINATION METHODS ==========

    /**
     * Gets the total results text
     */
    async getTotalResultsText(): Promise<string> {
        return await this.page.locator(this.totalResults).textContent() || '';
    }

    /**
     * Gets the pagination info text
     */
    async getPaginationInfo(): Promise<string> {
        return await this.page.locator(this.paginationInfo).textContent() || '';
    }

    /**
     * Clicks the first page button
     */
    async clickFirstPageButton(): Promise<void> {
        await this.page.locator(this.firstPageButton).click();
    }

    /**
     * Clicks the previous page button
     */
    async clickPreviousPageButton(): Promise<void> {
        await this.page.locator(this.previousPageButton).click();
    }

    /**
     * Clicks the next page button
     */
    async clickNextPageButton(): Promise<void> {
        await this.page.locator(this.nextPageButton).click();
    }

    /**
     * Clicks the last page button
     */
    async clickLastPageButton(): Promise<void> {
        await this.page.locator(this.lastPageButton).click();
    }

    /**
     * Checks if pagination container is visible
     * @returns {Promise<boolean>} True if pagination is visible, false otherwise
     */
    async isPaginationVisible(): Promise<boolean> {
        console.log('Validating pagination visibility', new Date());
        await this.page.locator(this.paginationContainer).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.paginationContainer).isVisible();
    }

    /**
     * Gets the rows per page value
     */
    async getRowsPerPageValue(): Promise<string> {
        return await this.page.locator(this.rowsPerPageValue).textContent() || '';
    }

    /**
     * Clicks the rows per page dropdown
     */
    async clickRowsPerPageDropdown(): Promise<void> {
        await this.page.locator(this.rowsPerPageDropdown).click();
    }

    /**
     * Clicks the contextMenuArchiveDeletePurge per page dropdown
     */
    async clickOnContextMenuArchiveDeletePurge(option: 'Archive' | 'Delete' | 'Purge' | 'Restore'): Promise<void> {
        await this.page.locator(this.contextMenuArchiveDeletePurgeOption(option)).click();
    }

    /**
     * Clicks the edit option in context menu dropdown
     */
    async clickOnContextMenuEdit(): Promise<void> {
        await this.page.locator(this.editContextMenuOption).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.editContextMenuOption).click();
        await this.page.waitForLoadState('load');
    }
    
    // ========== UTILITY METHODS ==========

    /**
     * Waits for the page to be fully loaded
     */
    async waitForPageToLoad(): Promise<void> {
        await this.page.waitForSelector(this.dataTable);
        await this.page.waitForSelector(this.table);
        await this.page.waitForSelector(this.pageTitle);
    }

    /**
     * Validates that the clients page is loaded correctly
     */
    async validateClientsPageIsLoaded(): Promise<void> {
        await expect(this.page.locator(this.pageTitle)).toBeVisible();
        await expect(this.page.locator(this.dataTable)).toBeVisible();
        await expect(this.page.locator(this.newClientButton)).toBeVisible();
        await expect(this.page.locator(this.breadcrumbClients)).toBeVisible();
    }

    /**
     * Searches for a client using the filter
     */
    async searchClient(clientName: string): Promise<void> {
        await this.typeInFilterInput(clientName);
        await this.page.waitForTimeout(1000); // Wait for filter to apply
    }

    /**
     * Clears the filter input
     */
    async clearFilter(): Promise<void> {
        await this.page.locator(this.filterInput).clear();
    }

    /**
     * Checks if any clients are displayed in the table
     * @returns {Promise<boolean>} True if there are clients in table, false otherwise
     */
    async hasClientsInTable(): Promise<boolean> {
        console.log('Validating clients in table', new Date());
        await this.page.locator(this.tableRowsAll).first().waitFor({ state: 'visible', timeout: 10000 });
        const rowCount = await this.getTableRowCount();
        return rowCount > 0;
    }

    /**
     * Gets client data from a specific row
     */
    async getClientDataFromRow(rowIndex: number): Promise<{
        name: string;
        email: string;
        idNumber: string;
        balance: string;
        paidToDate: string;
        dateCreated: string;
        lastLogin: string;
    }> {
        const row = this.page.locator(this.tableRowsAll).nth(rowIndex);
        
        return {
            name: await row.locator('td:nth-child(2) a').textContent() || '',
            email: await row.locator('td:nth-child(3)').textContent() || '',
            idNumber: await row.locator('td:nth-child(4)').textContent() || '',
            balance: await row.locator('td:nth-child(5)').textContent() || '',
            paidToDate: await row.locator('td:nth-child(6)').textContent() || '',
            dateCreated: await row.locator('td:nth-child(7)').textContent() || '',
            lastLogin: await row.locator('td:nth-child(8)').textContent() || '',
        };
    }

    /**
     * Validates that all expected clients are present
     */
    async validateExpectedClientsArePresent(expectedClients: string[]): Promise<void> {
        const actualClients = await this.getAllClientNames();
        
        for (const expectedClient of expectedClients) {
            expect(actualClients).toContain(expectedClient);
        }
    }

    // ========== SORTING METHODS ==========

    /**
     * Gets the current sort direction for the Name column
     * @returns {Promise<'asc' | 'desc' | 'none'>} Current sort direction
     */
    async getNameColumnSortDirection(): Promise<'asc' | 'desc' | 'none'> {
        const nameHeader = this.page.locator(this.nameHeaderContainer);
        
        // Look for ascending arrow (darker color indicates active)
        const ascArrow = nameHeader.locator(this.sortArrowAscending);
        const descArrow = nameHeader.locator(this.sortArrowDescending);
        
        if (await ascArrow.isVisible()) {
            return 'asc';
        } else if (await descArrow.isVisible()) {
            return 'desc';
        } else {
            return 'none';
        }
    }

    /**
     * Validates if client names are sorted in ascending order
     * @returns {Promise<boolean>} True if names are sorted ascending, false otherwise
     */
    async areClientNamesSortedAscending(): Promise<boolean> {
        const clientNames = await this.getAllClientNames();
        
        if (clientNames.length <= 1) return true;
        
        for (let i = 0; i < clientNames.length - 1; i++) {
            if (clientNames[i].toLowerCase() > clientNames[i + 1].toLowerCase()) {
                return false;
            }
        }
        return true;
    }

    /**
     * Validates if client names are sorted in descending order
     * @returns {Promise<boolean>} True if names are sorted descending, false otherwise
     */
    async areClientNamesSortedDescending(): Promise<boolean> {
        const clientNames = await this.getAllClientNames();
        
        if (clientNames.length <= 1) return true;
        
        for (let i = 0; i < clientNames.length - 1; i++) {
            if (clientNames[i].toLowerCase() < clientNames[i + 1].toLowerCase()) {
                return false;
            }
        }
        return true;
    }

    /**
     * Validates if the Name column sorting matches the expected order
     * @param expectedOrder The expected sort direction ('asc' or 'desc')
     * @returns {Promise<boolean>} True if sorting matches expected order
     */
    async validateNameColumnSorting(expectedOrder: 'asc' | 'desc'): Promise<boolean> {
        const actualSortDirection = await this.getNameColumnSortDirection();
        
        if (actualSortDirection !== expectedOrder) {
            console.log(`Expected sort direction: ${expectedOrder}, but found: ${actualSortDirection}`);
            return false;
        }

        if (expectedOrder === 'asc') {
            return await this.areClientNamesSortedAscending();
        } else {
            return await this.areClientNamesSortedDescending();
        }
    }

    // ========== GENERIC SORTING METHODS ==========

    /**
     * Gets the current sort direction for any column
     * @param columnName The name of the column to check
     * @returns {Promise<'asc' | 'desc' | 'none'>} Current sort direction
     */
    async getColumnSortDirection(columnName: string): Promise<'asc' | 'desc' | 'none'> {
        const columnHeader = this.page.locator(this.columnHeaderContainer(columnName));
        
        // Look for ascending arrow (darker color indicates active)
        const ascArrow = columnHeader.locator(this.sortArrowAscending);
        const descArrow = columnHeader.locator(this.sortArrowDescending);
        
        if (await ascArrow.isVisible()) {
            return 'asc';
        } else if (await descArrow.isVisible()) {
            return 'desc';
        } else {
            return 'none';
        }
    }

    /**
     * Gets all data from a specific column
     * @param columnName The name of the column
     * @returns {Promise<string[]>} Array of column data
     */
    async getColumnData(columnName: string): Promise<string[]> {
        let selector: string;
        
        // Map column names to their specific selectors
        switch (columnName.toLowerCase()) {
            case 'name':
                selector = this.clientNames;
                break;
            case 'contact email':
                selector = this.contactEmailData;
                break;
            case 'id number':
                selector = this.idNumberData;
                break;
            case 'balance':
                selector = this.balanceData;
                break;
            case 'paid to date':
                selector = this.paidToDateData;
                break;
            case 'date created':
                selector = this.dateCreatedData;
                break;
            case 'last login':
                selector = this.lastLoginData;
                break;
            case 'website':
                selector = this.websiteData;
                break;
            default:
                throw new Error(`Unknown column: ${columnName}`);
        }

        const dataElements = await this.page.locator(selector).all();
        const data: string[] = [];
        
        for (const element of dataElements) {
            const text = await element.textContent();
            if (text) data.push(text.trim());
        }
        
        return data;
    }

    /**
     * Validates if column data is sorted in ascending order based on data type
     * @param columnData Array of column data
     * @param dataType Type of data: 'text', 'number', 'date', 'currency'
     * @returns {Promise<boolean>} True if data is sorted ascending
     */
    async isDataSortedAscending(columnData: string[], dataType: 'text' | 'number' | 'date' | 'currency'): Promise<boolean> {
        if (columnData.length <= 1) return true;
        
        for (let i = 0; i < columnData.length - 1; i++) {
            const current = columnData[i];
            const next = columnData[i + 1];
            
            let comparison: boolean;
            
            switch (dataType) {
                case 'text':
                    comparison = current.toLowerCase() <= next.toLowerCase();
                    break;
                case 'number':
                    const currentNum = parseFloat(current.replace(/[^0-9.-]/g, '')) || 0;
                    const nextNum = parseFloat(next.replace(/[^0-9.-]/g, '')) || 0;
                    comparison = currentNum <= nextNum;
                    break;
                case 'currency':
                    const currentCurrency = parseFloat(current.replace(/[$,\s]/g, '')) || 0;
                    const nextCurrency = parseFloat(next.replace(/[$,\s]/g, '')) || 0;
                    comparison = currentCurrency <= nextCurrency;
                    break;
                case 'date':
                    const currentDate = new Date(current);
                    const nextDate = new Date(next);
                    comparison = currentDate <= nextDate;
                    break;
                default:
                    comparison = current.toLowerCase() <= next.toLowerCase();
            }
            
            if (!comparison) {
                return false;
            }
        }
        
        return true;
    }

    /**
     * Validates if column data is sorted in descending order based on data type
     * @param columnData Array of column data
     * @param dataType Type of data: 'text', 'number', 'date', 'currency'
     * @returns {Promise<boolean>} True if data is sorted descending
     */
    async isDataSortedDescending(columnData: string[], dataType: 'text' | 'number' | 'date' | 'currency'): Promise<boolean> {
        if (columnData.length <= 1) return true;
        
        for (let i = 0; i < columnData.length - 1; i++) {
            const current = columnData[i];
            const next = columnData[i + 1];
            
            let comparison: boolean;
            
            switch (dataType) {
                case 'text':
                    comparison = current.toLowerCase() >= next.toLowerCase();
                    break;
                case 'number':
                    const currentNum = parseFloat(current.replace(/[^0-9.-]/g, '')) || 0;
                    const nextNum = parseFloat(next.replace(/[^0-9.-]/g, '')) || 0;
                    comparison = currentNum >= nextNum;
                    break;
                case 'currency':
                    const currentCurrency = parseFloat(current.replace(/[$,\s]/g, '')) || 0;
                    const nextCurrency = parseFloat(next.replace(/[$,\s]/g, '')) || 0;
                    comparison = currentCurrency >= nextCurrency;
                    break;
                case 'date':
                    const currentDate = new Date(current);
                    const nextDate = new Date(next);
                    comparison = currentDate >= nextDate;
                    break;
                default:
                    comparison = current.toLowerCase() >= next.toLowerCase();
            }
            
            if (!comparison) {
                return false;
            }
        }
        
        return true;
    }

    /**
     * Validates if any column sorting matches the expected order
     * @param columnName The name of the column to validate
     * @param expectedOrder The expected sort direction ('asc' or 'desc')
     * @param dataType Type of data in the column
     * @returns {Promise<boolean>} True if sorting matches expected order
     */
    async validateColumnSorting(columnName: string, expectedOrder: 'asc' | 'desc', dataType: 'text' | 'number' | 'date' | 'currency'): Promise<boolean> {
        const actualSortDirection = await this.getColumnSortDirection(columnName);
        
        if (actualSortDirection !== expectedOrder) {
            console.log(`Column ${columnName}: Expected sort direction: ${expectedOrder}, but found: ${actualSortDirection}`);
            return false;
        }

        const columnData = await this.getColumnData(columnName);
        
        if (expectedOrder === 'asc') {
            return await this.isDataSortedAscending(columnData, dataType);
        } else {
            return await this.isDataSortedDescending(columnData, dataType);
        }
    }

    /**
     * Clicks on any column header to change sorting
     * @param columnName The name of the column header to click
     */
    async clickColumnHeader(columnName: string): Promise<void> {
        await this.page.locator(this.columnHeaderContainer(columnName)).click();
    }
}