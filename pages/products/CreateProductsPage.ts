import { Page, Locator, expect } from '@playwright/test';

export class CreateProductsPage {

  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

    // ========== PAGE HEADER SELECTORS ==========
    private readonly pageTitle = 'h3:has-text("New Product")';
    private readonly formContainer = 'form';
    private readonly containerWrapper = 'div.container.max-w-3xl.space-y-6';
    private readonly saveButton = '//button[contains(text(),"Save")]';

    // ========== FORM FIELD SELECTORS ==========
    private readonly itemField = '//dt[span[contains(text(),"Item")]]/following-sibling::dd//input[@type="text" and @required]';
    private readonly descriptionField = '//dt[span[contains(text(),"Description")]]/following-sibling::dd//textarea';
        //Price DefaultQuantity, MaxQuantity
    private readonly priceDefaultQuantityField =  (clientName: string) => `//dt[span[contains(text(),"${clientName}")]]/following-sibling::dd//input[@type="text" and @inputmode="numeric"]`;
    private readonly imageUrlField = '//dt[span[contains(text(),"Image URL")]]/following-sibling::dd//input[@type="text" and @required]';

    // ========== DROPDOWN SELECTORS ==========
    private readonly taxCategoryDropdown = '//dt[span[contains(text(),"Tax Category")]]/following-sibling::dd//input[@role="combobox"]';
    private readonly taxCategoryValue = 'div.css-ood9ll-singleValue:has-text("Physical Goods")';
    private readonly taxCategoryContainer = 'div:has(input#react-select-7-input)';

    // ========== LABEL SELECTORS ==========
    private readonly itemLabel = 'dt span:has-text("Item")';
    private readonly descriptionLabel = 'dt span:has-text("Description")';
    private readonly priceLabel = 'dt span:has-text("Price")';
    private readonly defaultQuantityLabel = 'dt span:has-text("Default Quantity")';
    private readonly maxQuantityLabel = 'dt span:has-text("Max Quantity")';
    private readonly taxCategoryLabel = 'dt span:has-text("Tax Category")';
    private readonly imageUrlLabel = 'dt span:has-text("Image URL")';
    private readonly requiredFieldIndicator = 'span.text-red-600:has-text("*")';

    // ========== LOST INFORMATION MESSAGE ==========
    private readonly lostInformationMessage = 'span:has-text("Are You Sure To Lost Information?")';

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
     * Checks if the form container is visible
     * @returns {Promise<boolean>} True if form is visible, false otherwise
     */
    async isFormVisible(): Promise<boolean> {
        console.log('Validating form visibility', new Date());
        await this.page.locator(this.formContainer).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.formContainer).isVisible();
    }

    /**
     * Clicks the save Button
     */
    async clickSaveButton(): Promise<void> {
        console.log('Clicking save button', new Date());
        await this.page.locator(this.saveButton).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.saveButton).click();
    }

    // ========== ITEM FIELD METHODS ==========

    /**
     * Fills the item field
     */
    async fillItemField(item: string): Promise<void> {
        console.log('Filling item field', new Date());
        await this.page.locator(this.itemField).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.itemField).fill(item);
    }

    /**
     * Gets the item field value
     */
    async getItemFieldValue(): Promise<string> {
        console.log('Getting item field value', new Date());
        await this.page.locator(this.itemField).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.itemField).inputValue();
    }

    /**
     * Checks if the item field is visible
     * @returns {Promise<boolean>} True if item field is visible, false otherwise
     */
    async isItemFieldVisible(): Promise<boolean> {
        console.log('Validating item field visibility', new Date());
        await this.page.locator(this.itemField).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.itemField).isVisible();
    }

    // ========== DESCRIPTION FIELD METHODS ==========

    /**
     * Fills the description field
     */
    async fillDescriptionField(description: string): Promise<void> {
        console.log('Filling description field', new Date());
        await this.page.locator(this.descriptionField).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.descriptionField).fill(description);
    }

    /**
     * Gets the description field value
     */
    async getDescriptionFieldValue(): Promise<string> {
        console.log('Getting description field value', new Date());
        await this.page.locator(this.descriptionField).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.descriptionField).inputValue();
    }

    /**
     * Checks if the description field is visible
     * @returns {Promise<boolean>} True if description field is visible, false otherwise
     */
    async isDescriptionFieldVisible(): Promise<boolean> {
        console.log('Validating description field visibility', new Date());
        await this.page.locator(this.descriptionField).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.descriptionField).isVisible();
    }

    // ========== GENERIC NUMBER FIELDs METHODS ==========

    /**
     * Fills the generic number fields
     */
    async fillGenericNumberField(name: string, quantity: string): Promise<void> {
        console.log('Filling generic number field', new Date());
        await this.page.locator(this.priceDefaultQuantityField(name)).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.priceDefaultQuantityField(name)).fill(quantity);
    }

    /**
     * Gets the generic number field value
     */
    async getGenericNumberFieldValue(name: string): Promise<string> {
        console.log('Getting generic number field value', new Date());
        await this.page.locator(this.priceDefaultQuantityField(name)).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.priceDefaultQuantityField(name)).inputValue();
    }

    /**
     * Checks if the generic number field is visible
     * @returns {Promise<boolean>} True if generic number field is visible, false otherwise
     */
    async isGenericNumberFieldVisible(name: string): Promise<boolean> {
        console.log('Validating generic number field visibility', new Date());
        await this.page.locator(this.priceDefaultQuantityField(name)).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.priceDefaultQuantityField(name)).isVisible();
    }

    // ========== IMAGE URL FIELD METHODS ==========

    /**
     * Fills the image URL field
     */
    async fillImageUrlField(url: string): Promise<void> {
        console.log('Filling image URL field', new Date());
        await this.page.locator(this.imageUrlField).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.imageUrlField).fill(url);
    }

    /**
     * Gets the image URL field value
     */
    async getImageUrlFieldValue(): Promise<string> {
        console.log('Getting image URL field value', new Date());
        await this.page.locator(this.imageUrlField).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.imageUrlField).inputValue();
    }

    /**
     * Checks if the image URL field is visible
     * @returns {Promise<boolean>} True if image URL field is visible, false otherwise
     */
    async isImageUrlFieldVisible(): Promise<boolean> {
        console.log('Validating image URL field visibility', new Date());
        await this.page.locator(this.imageUrlField).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.imageUrlField).isVisible();
    }

    // ========== TAX CATEGORY DROPDOWN METHODS ==========

    /**
     * Clicks the tax category dropdown
     */
    async clickTaxCategoryDropdown(): Promise<void> {
        console.log('Clicking tax category dropdown', new Date());
        await this.page.locator(this.taxCategoryDropdown).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.taxCategoryDropdown).click();
    }

    /**
     * Selects tax category option
     */
    async selectTaxCategoryOption(option: string): Promise<void> {
        console.log('Selecting tax category option', new Date());
        await this.page.locator('.css-1y9i3r8').click();
        // await this.clickTaxCategoryDropdown();
        await this.page.waitForTimeout(1000);
        await this.page.getByRole('option', { name: 'Services' }).click();
    }

    /**
     * Gets the selected tax category value
     */
    async getTaxCategoryValue(): Promise<string> {
        console.log('Getting tax category value', new Date());
        await this.page.locator(this.taxCategoryValue).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.taxCategoryValue).textContent() || '';
    }

    /**
     * Checks if the tax category dropdown is visible
     * @returns {Promise<boolean>} True if tax category dropdown is visible, false otherwise
     */
    async isTaxCategoryDropdownVisible(): Promise<boolean> {
        console.log('Validating tax category dropdown visibility', new Date());
        await this.page.locator(this.taxCategoryContainer).waitFor({ state: 'visible', timeout: 10000 });
        return await this.page.locator(this.taxCategoryContainer).isVisible();
    }

    // ========== UTILITY METHODS ==========

    /**
     * Waits for the page to be fully loaded
     */
    async waitForPageToLoad(): Promise<void> {
        await this.page.waitForSelector(this.formContainer);
        await this.page.waitForSelector(this.pageTitle);
    }

    /**
     * Validates that the create products page is loaded correctly
     */
    async validateCreateProductsPageIsLoaded(): Promise<void> {
        await expect(this.page.locator(this.pageTitle)).toBeVisible();
        await expect(this.page.locator(this.formContainer)).toBeVisible();
        await expect(this.page.locator(this.itemField)).toBeVisible();
    }

    /**
     * Fills complete product data
     */
    async fillCompleteProductData(data: {
        item: string;
        description?: string;
        price?: string;
        defaultQuantity?: string;
        maxQuantity?: string;
        imageUrl?: string;
        taxCategory?: string;
    }): Promise<void> {
        console.log('Filling complete product data', new Date());
        
        await this.fillItemField(data.item);
        
        if (data.description) {
            await this.fillDescriptionField(data.description);
        }
        
        if (data.price) {
            await this.fillGenericNumberField('Price',data.price);
        }
        
        if (data.defaultQuantity) {
            await this.fillGenericNumberField('Default Quantity',data.defaultQuantity);
        }
        
        if (data.maxQuantity) {
            await this.fillGenericNumberField('Max Quantity',data.maxQuantity);
        }
        
        if (data.imageUrl) {
            await this.fillImageUrlField(data.imageUrl);
        }
        
        if (data.taxCategory) {
            await this.selectTaxCategoryOption(data.taxCategory);
        }
    }

    /**
     * Clears all form fields
     */
    async clearAllFields(): Promise<void> {
        console.log('Clearing all form fields', new Date());
        await this.page.locator(this.itemField).clear();
        await this.page.locator(this.descriptionField).clear();
        await this.page.locator(this.priceDefaultQuantityField('Price')).clear();
        await this.page.locator(this.priceDefaultQuantityField('Default Quantity')).clear();
        await this.page.locator(this.imageUrlField).clear();
    }

    /**
     * Checks if required field indicator is visible for item field
     * @returns {Promise<boolean>} True if required indicator is visible, false otherwise
     */
    async isItemFieldRequired(): Promise<boolean> {
        console.log('Checking if item field is required', new Date());
        return await this.page.locator('dt:has(span:has-text("Item")) span.text-red-600').isVisible();
    }

    /**
     * Gets the Create Confirmation text
     */
    async isCreateConfirmationTextVisible(): Promise<boolean> {
        console.log('Getting create confirmation text', new Date());
        try {
            await this.page.getByText('Successfully created product').waitFor({ state: 'visible', timeout: 2000 });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Gets the archive Confirmation text
     */
    async isArchiveConfirmationTextVisible(): Promise<boolean> {
        console.log('Getting archive confirmation text', new Date());
        try {
            await this.page.getByText('Successfully archived product').waitFor({ state: 'visible', timeout: 2000 });
            return true;
        } catch {
            return false;
        }
    }    

    /**
     * Gets the Edit Confirmation text
     */
    async isEditConfirmationTextVisible(): Promise<boolean> {
        console.log('Getting edit confirmation text', new Date());
        try {
            await this.page.getByText('Successfully edited product').waitFor({ state: 'visible', timeout: 2000 });
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
            await this.page.getByText('Successfully deleted product').waitFor({ state: 'visible', timeout: 2000 });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Gets the Lost Information Confirmation text
     */
    async isLostInformationConfirmationTextVisible(): Promise<boolean> {
        console.log('Getting lost information confirmation text', new Date());
        return await this.page.locator(this.lostInformationMessage).isVisible();
    }

}