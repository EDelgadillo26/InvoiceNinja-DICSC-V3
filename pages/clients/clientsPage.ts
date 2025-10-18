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
    private readonly lifecycleDropdown = 'div:has(span:has-text("Lifecycle:"))';
    private readonly lifecycleValue = 'span:has-text("Active")';
    private readonly lifecycleArrow = 'div:has(span:has-text("Active")) svg[viewBox="0 0 20 20"]';
    private readonly columnsButton = 'button:has(span:has-text("Columns"))';
    private readonly columnsIcon = 'button:has(svg[viewBox="0 0 12 12"]:has(line[x1="6"][y1="1.25"]))';
    private readonly importButton = 'a[href="#/clients/import"]';
    private readonly importIcon = 'svg[viewBox="0 0 18 18"]:has(path[d*="M12.28,8.97"])';
    private readonly newClientButton = 'a[href="#/clients/create"]:has-text("New Client")';

    // ========== DATA TABLE SELECTORS ==========
    private readonly dataTable = '[data-cy="dataTable"]';
    private readonly tableContainer = 'div.overflow-auto.min-w-full.rounded-md.shadow-sm';
    private readonly table = 'table.min-w-full.table-fixed';
    private readonly tableHeader = 'thead';
    private readonly tableBody = 'tbody';

    // ========== TABLE HEADER COLUMN SELECTORS ==========
    private readonly headerCheckbox = 'thead input[type="checkbox"]';
    private readonly headerName = 'th:has(span:has-text("Name"))';
    private readonly headerContactEmail = 'th:has(span:has-text("Contact Email"))';
    private readonly headerIdNumber = 'th:has(span:has-text("ID Number"))';
    private readonly headerBalance = 'th:has(span:has-text("Balance"))';
    private readonly headerPaidToDate = 'th:has(span:has-text("Paid to Date"))';
    private readonly headerDateCreated = 'th:has(span:has-text("Date Created"))';
    private readonly headerLastLogin = 'th:has(span:has-text("Last Login"))';
    private readonly headerWebsite = 'th:has(span:has-text("Website"))';
    private readonly headerActions = 'th:last-child';

    // ========== TABLE ROW SELECTORS ==========
    private readonly tableRows = 'tbody tr.table-row';
    private readonly firstClientRow = 'tbody tr:first-child';
    private readonly clientCheckboxes = 'tbody input[type="checkbox"][data-cy="dataTableCheckbox"]';
    private readonly clientNames = 'tbody td a[href*="/clients/"]';
    private readonly clientEmails = 'tbody td:nth-child(3)';
    private readonly clientIdNumbers = 'tbody td:nth-child(4)';
    private readonly clientBalances = 'tbody td:nth-child(5)';
    private readonly clientPaidToDates = 'tbody td:nth-child(6)';
    private readonly clientDateCreated = 'tbody td:nth-child(7)';
    private readonly clientLastLogin = 'tbody td:nth-child(8)';
    private readonly clientWebsites = 'tbody td:nth-child(9)';
    private readonly clientActionButtons = 'tbody button[data-cy="chevronDownButton"]';

    // ========== SPECIFIC CLIENT DATA SELECTORS ==========
    private readonly pabloClientLink = 'a[href="#/clients/MvbmQzyEbY"]:has-text("Pablo")';
    private readonly cristinaClientLink = 'a[href="#/clients/JxboQByAeg"]:has-text("Cristina Steuber")';
    private readonly websiteLinks = 'a[href^="https://"][target="_blank"]';
    private readonly websiteIcons = 'svg[viewBox="0 0 20 20"]:has(polyline[points="17 8 17 3 12 3"])';

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

    // ========== PAGE HEADER METHODS ==========

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
        await this.page.locator(this.filterInput).fill(text);
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
     * Gets the current lifecycle value
     */
    async getLifecycleValue(): Promise<string> {
        return await this.page.locator(this.lifecycleValue).textContent() || '';
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
        return await this.page.locator(this.tableRows).count();
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
    async clickNameHeader(): Promise<void> {
        await this.page.locator(this.headerName).click();
    }

    /**
     * Clicks the Balance column header
     */
    async clickBalanceHeader(): Promise<void> {
        await this.page.locator(this.headerBalance).click();
    }

    /**
     * Checks if all table headers are visible
     * @returns {Promise<boolean>} True if all headers are visible, false otherwise
     */
    async areTableHeadersVisible(): Promise<boolean> {
        console.log('Validating all table headers visibility', new Date());
        const headers = [
            this.headerName,
            this.headerContactEmail,
            this.headerIdNumber,
            this.headerBalance,
            this.headerPaidToDate,
            this.headerDateCreated,
            this.headerLastLogin,
            this.headerWebsite
        ];

        for (const header of headers) {
            await this.page.locator(header).waitFor({ state: 'visible', timeout: 10000 });
            if (!await this.page.locator(header).isVisible()) {
                return false;
            }
        }
        return true;
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
     * Clicks the action button for the first client
     */
    async clickFirstClientActionButton(): Promise<void> {
        await this.page.locator(this.clientActionButtons).first().click();
    }

    /**
     * Checks if client action buttons are visible
     * @returns {Promise<boolean>} True if client action buttons are visible, false otherwise
     */
    async areClientActionButtonsVisible(): Promise<boolean> {
        console.log('Validating client action buttons visibility', new Date());
        await this.page.locator(this.clientActionButtons).first().waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.clientActionButtons).first().isVisible();
    }

    // ========== SPECIFIC CLIENT METHODS ==========

    /**
     * Clicks the Pablo client link
     */
    async clickPabloClient(): Promise<void> {
        await this.page.locator(this.pabloClientLink).click();
    }

    /**
     * Checks if the Pablo client is visible
     * @returns {Promise<boolean>} True if Pablo client is visible, false otherwise
     */
    async isPabloClientVisible(): Promise<boolean> {
        console.log('Validating Pablo client visibility', new Date());
        await this.page.locator(this.pabloClientLink).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.pabloClientLink).isVisible();
    }

    /**
     * Clicks the Cristina client link
     */
    async clickCristinaClient(): Promise<void> {
        await this.page.locator(this.cristinaClientLink).click();
    }

    /**
     * Checks if the Cristina client is visible
     * @returns {Promise<boolean>} True if Cristina client is visible, false otherwise
     */
    async isCristinaClientVisible(): Promise<boolean> {
        console.log('Validating Cristina client visibility', new Date());
        await this.page.locator(this.cristinaClientLink).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.cristinaClientLink).isVisible();
    }

    /**
     * Gets the count of website links
     */
    async getWebsiteLinksCount(): Promise<number> {
        return await this.page.locator(this.websiteLinks).count();
    }

    /**
     * Checks if website icons are visible
     * @returns {Promise<boolean>} True if website icons are visible, false otherwise
     */
    async areWebsiteIconsVisible(): Promise<boolean> {
        console.log('Validating website icons visibility', new Date());
        await this.page.locator(this.websiteIcons).first().waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.websiteIcons).first().isVisible();
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
        await this.page.locator(this.tableRows).first().waitFor({ state: 'visible', timeout: 10000 });
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
        const row = this.page.locator(this.tableRows).nth(rowIndex);
        
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
}