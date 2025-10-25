import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {

  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

    // ========== BREADCRUMB SELECTORS ==========
    private readonly breadcrumbContainer = 'nav[aria-label="Breadcrumb"]';
    private readonly breadcrumbHome = 'a[href="#/dashboard"]:has(svg[viewBox="0 0 18 18"])';
    private readonly breadcrumbSeparator = 'span:has-text("/")';
    private readonly breadcrumbProducts = 'a[href="#/products"]:has-text("Products")';

    // ========== FILTER AND CONTROL SELECTORS ==========
    private readonly filterInput = 'input#filter[placeholder="Filter"]';
    private readonly lifecycleDropdown = '//div[.//span[contains(text(),"Lifecycle")]]//div[@class="sm:w-auto w-full css-b62m3t-container"]';
    private readonly lifecycleValue = (columnName: string) => `//div[@role="option" and .//span[text()="${columnName}"]]//input[@type="checkbox"]`;
    private readonly applylifecycleButton = 'div.flex.w-full.px-3.space-x-2 > button:nth-child(2)';

    // ========== ACTION BUTTONS SELECTORS ==========
    private readonly columnsButton = 'button:has(span:has-text("Columns"))';
    private readonly importButton = 'a[href="#/products/import"]';
    private readonly newProductButton = '//a[contains(text(),"New Product")]';

    // ========== DATA TABLE SELECTORS ==========
    private readonly dataTable = '[data-cy="dataTable"]';
    private readonly tableContainer = 'div.overflow-auto.min-w-full.rounded-md.shadow-sm';
    private readonly table = 'table.min-w-full.table-fixed';
    private readonly tableHeader = 'thead';
    private readonly tableBody = 'tbody';

    // ========== TABLE HEADER COLUMN SELECTORS ==========
    private readonly headerCheckbox = 'thead input[type="checkbox"]';
    private readonly headerProduct = 'th:has(span:has-text("Product"))';
    private readonly headerNotes = 'th:has(span:has-text("Notes"))';
    private readonly headerPrice = 'th:has(span:has-text("Price"))';
    private readonly headerDefaultQuantity = 'th:has(span:has-text("Default Quantity"))';
    private readonly headerActions = 'th:last-child';

    // ========== TABLE  SELECTORS ==========
    private readonly tableRowsAll = 'tbody tr';
    private readonly noRecordsMessage = 'span:has-text("No records found")';
    private readonly productName = (name: string) => `//td//a[contains(@href, "/products/") and contains(@href, "/edit") and text()="${name}"]`;
    private readonly actionsButtonSelector = (productName: string) => `//tr[td[2]//a[text()="${productName}"]]//button[@data-cy="chevronDownButton"]`;
    private readonly actionsButtonDeleteOrArchiveOption = (productName: string) => `//button[div[contains(text(),"${productName}")]]`;
    private readonly actionsEditOption = `//a[contains(@href,"/edit") and .//div[text()="Edit"]]`;
    // ========== PAGINATION SELECTORS ==========
    private readonly totalResults = 'span:has-text("Total results:")';
    private readonly paginationInfo = 'span:has-text("1 / 1")';
    private readonly firstPageButton = 'div:has(svg[viewBox="0 0 12 12"]:has(polyline[points="5.75 2 1.75 6 5.75 10"]))';
    private readonly previousPageButton = 'div:has(svg[viewBox="0 0 12 12"]:has(path[d*="m7.75,11c-.192,0-.384-.073-.53-.22L2.97"]))';
    private readonly nextPageButton = 'div:has(svg[viewBox="0 0 12 12"]:has(path[d*="m4.25,11c-.192,0-.384-.073-.53-.22"]))';
    private readonly lastPageButton = 'div:has(svg[viewBox="0 0 12 12"]:has(path[d*="m6.25,10.75c-.192,0-.384-.073-.53-.22"]))';
    private readonly rowsPerPageDropdown = 'div:has(span:has-text("rows:"))';
    private readonly rowsPerPageValue = 'div.css-ood9ll-singleValue:has-text("10")';

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
     * Checks if the products breadcrumb is visible
     * @returns {Promise<boolean>} True if products breadcrumb is visible, false otherwise
     */
    async isBreadcrumbProductsVisible(): Promise<boolean> {
        console.log('Validating breadcrumb products visibility', new Date());
        await this.page.locator(this.breadcrumbProducts).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.breadcrumbProducts).isVisible();
    }

    // ========== FILTER AND CONTROL METHODS ==========

    /**
     * Types in the filter input
     */
    async typeInFilterInput(text: string): Promise<void> {
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
     * Checks if the lifecycle dropdown is visible
     * @returns {Promise<boolean>} True if lifecycle dropdown is visible, false otherwise
     */
    async isLifecycleDropdownVisible(): Promise<boolean> {
        console.log('Validating lifecycle dropdown visibility', new Date());
        await this.page.locator(this.lifecycleDropdown).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.lifecycleDropdown).isVisible();
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
     * Clicks the lifecycle dropdown and select specific option
     */
    async clickLifecycleDropdownAndSelectSpecificOptions(options: string[]): Promise<void> {
        await this.page.locator(this.lifecycleDropdown).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.lifecycleDropdown).click();
        for (const option of options) {
            await this.page.locator(this.lifecycleValue(option)).check();
        }
        await this.page.locator(this.applylifecycleButton).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.applylifecycleButton).click();
    } 

    // ========== ACTION BUTTONS METHODS ==========

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
     * Clicks the new product button
     */
    async clickNewProductButton(): Promise<void> {
        await this.page.locator(this.newProductButton).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.newProductButton).click();
    }

    /**
     * Checks if the new product button is visible
     * @returns {Promise<boolean>} True if new product button is visible, false otherwise
     */
    async isNewProductButtonVisible(): Promise<boolean> {
        console.log('Validating new product button visibility', new Date());
        await this.page.locator(this.newProductButton).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.newProductButton).isVisible();
    }

    /**
     * Gets the new product button text
     */
    async getNewProductButtonText(): Promise<string> {
        return await this.page.locator(this.newProductButton).textContent() || '';
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
     * Checks if "No records found" message is visible
     * @returns {Promise<boolean>} True if no records message is visible, false otherwise
     */
    async isNoRecordsMessageVisible(): Promise<boolean> {
        console.log('Validating no records message visibility', new Date());
        return await this.page.locator(this.noRecordsMessage).isVisible();
    }

    /**
     * Checks if the product within table is visible
     * @returns {Promise<boolean>} True if product is visible, false otherwise
     */
    async isProductVisible(product: string): Promise<boolean> {
        console.log(`Validating visibility of product: ${product}`, new Date());
        await this.page.locator(this.productName(product)).waitFor({ state: 'visible', timeout: 15000 });
        return await this.page.locator(this.productName(product)).isVisible();
    }

    /**
     * Clicks the action button for the specific product
     */
    async clickProductActionButton(name: string): Promise<void> {
        await this.page.locator(this.actionsButtonSelector(name)).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.actionsButtonSelector(name)).click();
    }    

    /**
     * Clicks the delete or archive option for the specific product
     */
    async clickProductDeleteOrArchiveOption(option: string): Promise<void> {
        await this.page.locator(this.actionsButtonDeleteOrArchiveOption(option)).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.actionsButtonDeleteOrArchiveOption(option)).click();
    }

    /**
     * Clicks the edit option for the specific product
     */
    async clickProductEditOption(): Promise<void> {
        await this.page.locator(this.actionsEditOption).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.actionsEditOption).click();
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
     * Clicks the Product column header
     */
    async clickProductHeader(): Promise<void> {
        await this.page.locator(this.headerProduct).click();
    }

    /**
     * Clicks the Notes column header
     */
    async clickNotesHeader(): Promise<void> {
        await this.page.locator(this.headerNotes).click();
    }

    /**
     * Clicks the Price column header
     */
    async clickPriceHeader(): Promise<void> {
        await this.page.locator(this.headerPrice).click();
    }

    /**
     * Clicks the Default Quantity column header
     */
    async clickDefaultQuantityHeader(): Promise<void> {
        await this.page.locator(this.headerDefaultQuantity).click();
    }

    /**
     * Checks if all table headers are visible
     * @returns {Promise<boolean>} True if all headers are visible, false otherwise
     */
    async areTableHeadersVisible(): Promise<boolean> {
        console.log('Validating all table headers visibility', new Date());
        const headers = [
            this.headerProduct,
            this.headerNotes,
            this.headerPrice,
            this.headerDefaultQuantity,
            this.headerActions
        ];

        for (const header of headers) {
            await this.page.locator(header).waitFor({ state: 'visible', timeout: 10000 });
            if (!await this.page.locator(header).isVisible()) {
                return false;
            }
        }
        return true;
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
        await this.page.locator(this.totalResults).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.totalResults).isVisible();
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
    }

    /**
     * Validates that the products page is loaded correctly
     */
    async validateProductsPageIsLoaded(): Promise<void> {
        await expect(this.page.locator(this.dataTable)).toBeVisible();
        await expect(this.page.locator(this.newProductButton)).toBeVisible();
        await expect(this.page.locator(this.breadcrumbProducts)).toBeVisible();
    }

    /**
     * Searches for a product using the filter
     */
    async searchProduct(productName: string): Promise<void> {
        await this.typeInFilterInput(productName);
        await this.page.waitForTimeout(1000);
    }

    /**
     * Clears the filter input
     */
    async clearFilter(): Promise<void> {
        await this.page.locator(this.filterInput).clear();
    }

    /**
     * Checks if any products are displayed in the table
     * @returns {Promise<boolean>} True if there are products in table, false otherwise
     */
    async hasProductsInTable(): Promise<boolean> {
        console.log('Validating products in table', new Date());
        const rowCount = await this.getTableRowCount();
        const noRecordsVisible = await this.isNoRecordsMessageVisible();
        return rowCount > 0 && !noRecordsVisible;
    }


  
}