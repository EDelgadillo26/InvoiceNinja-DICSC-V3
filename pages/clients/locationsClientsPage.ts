import { Page, Locator, expect } from '@playwright/test';

export class LocationsClientsPage {

  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

    // ========== PAGE HEADER SELECTORS ==========
    private readonly pageTitle = 'h3:has-text("Locations")';
    private readonly formTitle = 'h3.leading-6.font-medium.text-lg';
    private readonly saveButton = 'button:has-text("Save")';

    // ========== BREADCRUMB SELECTORS ==========
    private readonly breadcrumbContainer = 'nav[aria-label="Breadcrumb"]';
    private readonly breadcrumbHome = 'a[href="#/dashboard"]';
    private readonly breadcrumbClients = 'a[href="#/clients"]';
    private readonly breadcrumbClientName = 'a[href*="/clients/"][href*="/edit"]';
    private readonly breadcrumbEdit = 'a:has-text("Edit")';

    // ========== NAVIGATION CONTROLS SELECTORS ==========
    private readonly previousButton = '.cursor-not-allowed.opacity-50, .cursor-pointer';
    private readonly nextButton = '.cursor-pointer';
    private readonly navigationContainer = '.relative.flex.flex-1.space-x-2.items-center.justify-end';

    // ========== TAB NAVIGATION SELECTORS ==========
    private readonly tabsContainer = 'nav[aria-label="Tabs"]';
    private readonly editTab = 'a[href*="/edit"]:has-text("Edit")';
    private readonly settingsTab = 'a[href*="/settings"]:has-text("Settings")';
    private readonly documentsTab = 'a[href*="/documents"]:has-text("Documents")';
    private readonly locationsTab = 'a[href*="/locations"]:has-text("Locations")';
    private readonly tabsSelect = '.css-b62m3t-container';

    // ========== MAIN CONTENT SELECTORS ==========
    private readonly mainContainer = '.border.rounded-md.overflow-visible.shadow-sm';
    private readonly formContainer = 'form';
    private readonly formHeader = '.px-4.sm\\:px-6.py-5.border-b';
    private readonly formHeaderContainer = '.flex.items-center.justify-between';

    // ========== LOCATIONS GRID SELECTORS ==========
    private readonly locationsSection = '.py-4';
    private readonly locationsGrid = '.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3.xl\\:grid-cols-4.gap-4';
    private readonly gridContainer = '.px-4.sm\\:px-6.py-2';

    // ========== ADD LOCATION CARD SELECTORS ==========
    private readonly addLocationCard = '.flex.flex-col.space-y-2.items-center.justify-center.border-dashed.border.p-6.rounded-md.cursor-pointer.h-48';
    private readonly addLocationIcon = '.flex.flex-col.space-y-2.items-center.justify-center svg';
    private readonly addLocationText = 'span:has-text("Add Location")';

    // ========== LOCATION CARDS SELECTORS ==========
    private readonly locationCards = '.location-card, .border:not(.border-dashed)';
    private readonly locationName = '.location-name, .font-semibold';
    private readonly locationAddress = '.location-address, .text-gray-500';
    private readonly locationActions = '.location-actions, .card-actions';
    private readonly editLocationButton = 'button:has-text("Edit"), .edit-location';
    private readonly deleteLocationButton = 'button:has-text("Delete"), .delete-location';

    // ========== LOCATION FORM SELECTORS ==========
    private readonly locationForm = '.location-form, form[data-form="location"]';
    private readonly locationNameInput = 'input[name="name"], input[placeholder*="name"]';
    private readonly locationAddressInput = 'input[name="address"], textarea[name="address"]';
    private readonly locationCityInput = 'input[name="city"]';
    private readonly locationStateInput = 'input[name="state"], select[name="state"]';
    private readonly locationPostalCodeInput = 'input[name="postal_code"], input[name="zip"]';
    private readonly locationCountrySelect = 'select[name="country"]';
    private readonly locationNotesTextarea = 'textarea[name="notes"]';

    // ========== MODAL SELECTORS ==========
    private readonly modal = '.modal, .dialog, [role="dialog"]';
    private readonly modalOverlay = '.modal-overlay, .backdrop';
    private readonly modalContent = '.modal-content, .dialog-content';
    private readonly modalHeader = '.modal-header';
    private readonly modalTitle = '.modal-title, .dialog-title';
    private readonly modalBody = '.modal-body';
    private readonly modalFooter = '.modal-footer';
    private readonly modalCloseButton = '.modal-close, .close-button, button[aria-label="Close"]';
    private readonly saveLocationButton = 'button:has-text("Save"), button:has-text("Add Location")';
    private readonly cancelLocationButton = 'button:has-text("Cancel")';

    // ========== MESSAGE SELECTORS ==========
    private readonly errorMessage = '.alert-error, .error-message, .text-red-500';
    private readonly successMessage = '.alert-success, .success-message, .text-green-500';
    private readonly alertContainer = '.alert, .notification';

    // ========== LOADING SELECTORS ==========
    private readonly loadingSpinner = '.spinner, .loading';
    private readonly loadingContainer = '.loading-container';

    // ========== PAGE HEADER METHODS ==========

    /**
     * Gets the page title text
     */
    async getPageTitle(): Promise<string> {
        return await this.page.locator(this.pageTitle).textContent() || '';
    }

    /**
     * Checks if the page title is visible
     */
    async isPageTitleVisible(): Promise<boolean> {
        return await this.page.locator(this.pageTitle).isVisible();
    }

    /**
     * Gets the form title text
     */
    async getFormTitle(): Promise<string> {
        return await this.page.locator(this.formTitle).textContent() || '';
    }

    /**
     * Checks if the form title is visible
     */
    async isFormTitleVisible(): Promise<boolean> {
        return await this.page.locator(this.formTitle).isVisible();
    }

    // ========== BREADCRUMB METHODS ==========

    /**
     * Checks if the breadcrumb container is visible
     */
    async isBreadcrumbsVisible(): Promise<boolean> {
        return await this.page.locator(this.breadcrumbContainer).isVisible();
    }

    /**
     * Clicks the home breadcrumb
     */
    async clickHomeBreadcrumb(): Promise<void> {
        await this.page.locator(this.breadcrumbHome).click();
    }

    /**
     * Clicks the clients breadcrumb
     */
    async clickClientsBreadcrumb(): Promise<void> {
        await this.page.locator(this.breadcrumbClients).click();
    }

    /**
     * Clicks the client name breadcrumb
     */
    async clickClientNameBreadcrumb(): Promise<void> {
        await this.page.locator(this.breadcrumbClientName).first().click();
    }

    /**
     * Clicks the edit breadcrumb
     */
    async clickEditBreadcrumb(): Promise<void> {
        await this.page.locator(this.breadcrumbEdit).last().click();
    }

    // ========== NAVIGATION METHODS ==========

    /**
     * Checks if the previous button is enabled
     */
    async isPreviousButtonEnabled(): Promise<boolean> {
        const classAttribute = await this.page.locator(this.previousButton).first().getAttribute('class');
        return !classAttribute?.includes('cursor-not-allowed');
    }

    /**
     * Checks if the next button is enabled
     */
    async isNextButtonEnabled(): Promise<boolean> {
        const classAttribute = await this.page.locator(this.nextButton).last().getAttribute('class');
        return !classAttribute?.includes('cursor-not-allowed');
    }

    /**
     * Clicks the previous button if enabled
     */
    async clickPreviousButton(): Promise<void> {
        if (await this.isPreviousButtonEnabled()) {
            await this.page.locator(this.previousButton).first().click();
        }
    }

    /**
     * Clicks the next button if enabled
     */
    async clickNextButton(): Promise<void> {
        if (await this.isNextButtonEnabled()) {
            await this.page.locator(this.nextButton).last().click();
        }
    }

    // ========== TAB NAVIGATION METHODS ==========

    /**
     * Checks if the tabs container is visible
     */
    async isTabsVisible(): Promise<boolean> {
        return await this.page.locator(this.tabsContainer).isVisible();
    }

    /**
     * Clicks the edit tab
     */
    async clickEditTab(): Promise<void> {
        await this.page.locator(this.editTab).click();
    }

    /**
     * Clicks the settings tab
     */
    async clickSettingsTab(): Promise<void> {
        await this.page.locator(this.settingsTab).click();
    }

    /**
     * Clicks the documents tab
     */
    async clickDocumentsTab(): Promise<void> {
        await this.page.locator(this.documentsTab).click();
    }

    /**
     * Clicks the locations tab
     */
    async clickLocationsTab(): Promise<void> {
        await this.page.locator(this.locationsTab).click();
    }

    /**
     * Checks if the edit tab is active
     */
    async isEditTabActive(): Promise<boolean> {
        const classAttribute = await this.page.locator(this.editTab).getAttribute('class');
        return classAttribute?.includes('active') || false;
    }

    /**
     * Checks if the settings tab is active
     */
    async isSettingsTabActive(): Promise<boolean> {
        const classAttribute = await this.page.locator(this.settingsTab).getAttribute('class');
        return classAttribute?.includes('active') || false;
    }

    /**
     * Checks if the documents tab is active
     */
    async isDocumentsTabActive(): Promise<boolean> {
        const classAttribute = await this.page.locator(this.documentsTab).getAttribute('class');
        return classAttribute?.includes('active') || false;
    }

    /**
     * Checks if the locations tab is active
     */
    async isLocationsTabActive(): Promise<boolean> {
        const classAttribute = await this.page.locator(this.locationsTab).getAttribute('class');
        return classAttribute?.includes('active') || false;
    }

    // ========== LOCATIONS GRID METHODS ==========

    /**
     * Checks if the locations grid is visible
     */
    async isLocationsGridVisible(): Promise<boolean> {
        return await this.page.locator(this.locationsGrid).isVisible();
    }

    /**
     * Checks if the add location card is visible
     */
    async isAddLocationCardVisible(): Promise<boolean> {
        return await this.page.locator(this.addLocationCard).isVisible();
    }

    /**
     * Gets the add location text
     */
    async getAddLocationText(): Promise<string> {
        return await this.page.locator(this.addLocationText).textContent() || '';
    }

    /**
     * Clicks the add location card
     */
    async clickAddLocationCard(): Promise<void> {
        await this.page.locator(this.addLocationCard).click();
    }

    /**
     * Checks if the add location icon is visible
     */
    async isAddLocationIconVisible(): Promise<boolean> {
        return await this.page.locator(this.addLocationIcon).isVisible();
    }

    // ========== LOCATION CARDS METHODS ==========

    /**
     * Gets the count of location cards
     */
    async getLocationCardsCount(): Promise<number> {
        return await this.page.locator(this.locationCards).count();
    }

    /**
     * Gets the location name at the specified index
     */
    async getLocationName(index: number): Promise<string> {
        const card = this.page.locator(this.locationCards).nth(index);
        return await card.locator(this.locationName).textContent() || '';
    }

    /**
     * Gets the location address at the specified index
     */
    async getLocationAddress(index: number): Promise<string> {
        const card = this.page.locator(this.locationCards).nth(index);
        return await card.locator(this.locationAddress).textContent() || '';
    }

    /**
     * Clicks the edit button for the location at the specified index
     */
    async clickEditLocation(index: number): Promise<void> {
        const card = this.page.locator(this.locationCards).nth(index);
        await card.locator(this.editLocationButton).click();
    }

    /**
     * Clicks the delete button for the location at the specified index
     */
    async clickDeleteLocation(index: number): Promise<void> {
        const card = this.page.locator(this.locationCards).nth(index);
        await card.locator(this.deleteLocationButton).click();
    }

    /**
     * Checks if the location card at the specified index is visible
     */
    async isLocationCardVisible(index: number): Promise<boolean> {
        return await this.page.locator(this.locationCards).nth(index).isVisible();
    }

    // ========== LOCATION FORM METHODS ==========

    /**
     * Fills the location name field
     */
    async fillLocationName(name: string): Promise<void> {
        await this.page.locator(this.locationNameInput).fill(name);
    }

    /**
     * Fills the location address field
     */
    async fillLocationAddress(address: string): Promise<void> {
        await this.page.locator(this.locationAddressInput).fill(address);
    }

    /**
     * Fills the location city field
     */
    async fillLocationCity(city: string): Promise<void> {
        await this.page.locator(this.locationCityInput).fill(city);
    }

    /**
     * Fills the location state field
     */
    async fillLocationState(state: string): Promise<void> {
        await this.page.locator(this.locationStateInput).fill(state);
    }

    /**
     * Fills the location postal code field
     */
    async fillLocationPostalCode(postalCode: string): Promise<void> {
        await this.page.locator(this.locationPostalCodeInput).fill(postalCode);
    }

    /**
     * Selects the location country
     */
    async selectLocationCountry(country: string): Promise<void> {
        await this.page.locator(this.locationCountrySelect).selectOption(country);
    }

    /**
     * Fills the location notes field
     */
    async fillLocationNotes(notes: string): Promise<void> {
        await this.page.locator(this.locationNotesTextarea).fill(notes);
    }

    /**
     * Gets the location name input value
     */
    async getLocationNameValue(): Promise<string> {
        return await this.page.locator(this.locationNameInput).inputValue();
    }

    /**
     * Gets the location address input value
     */
    async getLocationAddressValue(): Promise<string> {
        return await this.page.locator(this.locationAddressInput).inputValue();
    }

    /**
     * Gets the location city input value
     */
    async getLocationCityValue(): Promise<string> {
        return await this.page.locator(this.locationCityInput).inputValue();
    }

    /**
     * Gets the location state input value
     */
    async getLocationStateValue(): Promise<string> {
        return await this.page.locator(this.locationStateInput).inputValue();
    }

    /**
     * Gets the location postal code input value
     */
    async getLocationPostalCodeValue(): Promise<string> {
        return await this.page.locator(this.locationPostalCodeInput).inputValue();
    }

    /**
     * Gets the location notes input value
     */
    async getLocationNotesValue(): Promise<string> {
        return await this.page.locator(this.locationNotesTextarea).inputValue();
    }

    // ========== MODAL METHODS ==========

    /**
     * Checks if the modal is visible
     */
    async isModalVisible(): Promise<boolean> {
        return await this.page.locator(this.modal).isVisible();
    }

    /**
     * Gets the modal title text
     */
    async getModalTitle(): Promise<string> {
        return await this.page.locator(this.modalTitle).textContent() || '';
    }

    /**
     * Clicks the modal close button
     */
    async clickModalCloseButton(): Promise<void> {
        await this.page.locator(this.modalCloseButton).click();
    }

    /**
     * Clicks the save location button
     */
    async clickSaveLocationButton(): Promise<void> {
        await this.page.locator(this.saveLocationButton).click();
    }

    /**
     * Clicks the cancel location button
     */
    async clickCancelLocationButton(): Promise<void> {
        await this.page.locator(this.cancelLocationButton).click();
    }

    /**
     * Checks if the save location button is visible
     */
    async isSaveLocationButtonVisible(): Promise<boolean> {
        return await this.page.locator(this.saveLocationButton).isVisible();
    }

    /**
     * Checks if the cancel location button is visible
     */
    async isCancelLocationButtonVisible(): Promise<boolean> {
        return await this.page.locator(this.cancelLocationButton).isVisible();
    }

    /**
     * Checks if the modal close button is visible
     */
    async isModalCloseButtonVisible(): Promise<boolean> {
        return await this.page.locator(this.modalCloseButton).isVisible();
    }

    // ========== MESSAGE METHODS ==========

    /**
     * Checks if an error message is visible
     */
    async isErrorMessageVisible(): Promise<boolean> {
        return await this.page.locator(this.errorMessage).isVisible();
    }

    /**
     * Checks if a success message is visible
     */
    async isSuccessMessageVisible(): Promise<boolean> {
        return await this.page.locator(this.successMessage).isVisible();
    }

    /**
     * Gets the error message text
     */
    async getErrorMessageText(): Promise<string> {
        return await this.page.locator(this.errorMessage).textContent() || '';
    }

    /**
     * Gets the success message text
     */
    async getSuccessMessageText(): Promise<string> {
        return await this.page.locator(this.successMessage).textContent() || '';
    }

    // ========== LOADING METHODS ==========

    /**
     * Checks if the loading spinner is visible
     */
    async isLoadingSpinnerVisible(): Promise<boolean> {
        return await this.page.locator(this.loadingSpinner).isVisible();
    }

    /**
     * Waits for loading to complete
     */
    async waitForLoadingToComplete(): Promise<void> {
        await this.page.locator(this.loadingSpinner).waitFor({ state: 'hidden', timeout: 10000 });
    }

    // ========== UTILITY METHODS ==========

    /**
     * Waits for the page to load
     */
    async waitForPageLoad(): Promise<void> {
        await this.page.locator(this.pageTitle).waitFor({ state: 'visible' });
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Waits for the grid to load
     */
    async waitForGridLoad(): Promise<void> {
        await this.page.locator(this.locationsGrid).waitFor({ state: 'visible' });
    }

    /**
     * Refreshes the page
     */
    async refreshPage(): Promise<void> {
        await this.page.reload();
        await this.waitForPageLoad();
    }

    // ========== VALIDATION METHODS ==========

    /**
     * Validates that the main page elements are visible
     */
    async validatePageElements(): Promise<void> {
        await expect(this.page.locator(this.pageTitle)).toBeVisible();
        await expect(this.page.locator(this.locationsGrid)).toBeVisible();
        await expect(this.page.locator(this.addLocationCard)).toBeVisible();
    }

    /**
     * Validates that the breadcrumbs are visible
     */
    async validateBreadcrumbs(): Promise<void> {
        await expect(this.page.locator(this.breadcrumbContainer)).toBeVisible();
        await expect(this.page.locator(this.breadcrumbHome)).toBeVisible();
        await expect(this.page.locator(this.breadcrumbClients)).toBeVisible();
    }

    /**
     * Validates that the tabs are visible
     */
    async validateTabs(): Promise<void> {
        await expect(this.page.locator(this.tabsContainer)).toBeVisible();
        await expect(this.page.locator(this.editTab)).toBeVisible();
        await expect(this.page.locator(this.settingsTab)).toBeVisible();
        await expect(this.page.locator(this.documentsTab)).toBeVisible();
        await expect(this.page.locator(this.locationsTab)).toBeVisible();
    }

    /**
     * Validates that the add location card is properly displayed
     */
    async validateAddLocationCard(): Promise<void> {
        await expect(this.page.locator(this.addLocationCard)).toBeVisible();
        await expect(this.page.locator(this.addLocationIcon)).toBeVisible();
        await expect(this.page.locator(this.addLocationText)).toBeVisible();
        await expect(this.page.locator(this.addLocationText)).toContainText('Add Location');
    }

    /**
     * Validates that a location card at the specified index is properly displayed
     */
    async validateLocationCard(index: number): Promise<void> {
        const card = this.page.locator(this.locationCards).nth(index);
        await expect(card).toBeVisible();
        
        const nameElement = card.locator(this.locationName);
        const addressElement = card.locator(this.locationAddress);
        
        await expect(nameElement).toBeVisible();
        await expect(addressElement).toBeVisible();
    }

    /**
     * Validates that the location form is properly displayed
     */
    async validateLocationForm(): Promise<void> {
        await expect(this.page.locator(this.locationNameInput)).toBeVisible();
        await expect(this.page.locator(this.locationAddressInput)).toBeVisible();
        await expect(this.page.locator(this.saveLocationButton)).toBeVisible();
        await expect(this.page.locator(this.cancelLocationButton)).toBeVisible();
    }

    // ========== SEARCH AND FILTER METHODS ==========

    /**
     * Searches for a location by name
     */
    async searchLocationByName(name: string): Promise<boolean> {
        const count = await this.getLocationCardsCount();
        for (let i = 0; i < count; i++) {
            const locationName = await this.getLocationName(i);
            if (locationName.toLowerCase().includes(name.toLowerCase())) {
                return true;
            }
        }
        return false;
    }

    /**
     * Gets locations that match a partial address
     */
    async getLocationsByPartialAddress(addressPart: string): Promise<number[]> {
        const count = await this.getLocationCardsCount();
        const matchingLocations: number[] = [];
        
        for (let i = 0; i < count; i++) {
            const address = await this.getLocationAddress(i);
            if (address.toLowerCase().includes(addressPart.toLowerCase())) {
                matchingLocations.push(i);
            }
        }
        
        return matchingLocations;
    }

    // ========== COMPLETE WORKFLOW METHODS ==========

    /**
     * Adds a new location with the provided data
     */
    async addNewLocation(locationData: {
        name: string;
        address: string;
        city?: string;
        state?: string;
        postalCode?: string;
        country?: string;
        notes?: string;
    }): Promise<void> {
        await this.clickAddLocationCard();
        await this.waitForLoadingToComplete();
        
        await this.fillLocationName(locationData.name);
        await this.fillLocationAddress(locationData.address);
        
        if (locationData.city) {
            await this.fillLocationCity(locationData.city);
        }
        
        if (locationData.state) {
            await this.fillLocationState(locationData.state);
        }
        
        if (locationData.postalCode) {
            await this.fillLocationPostalCode(locationData.postalCode);
        }
        
        if (locationData.country) {
            await this.selectLocationCountry(locationData.country);
        }
        
        if (locationData.notes) {
            await this.fillLocationNotes(locationData.notes);
        }
        
        await this.clickSaveLocationButton();
        await this.waitForLoadingToComplete();
    }

    /**
     * Edits an existing location at the specified index
     */
    async editLocation(index: number, locationData: {
        name?: string;
        address?: string;
        city?: string;
        state?: string;
        postalCode?: string;
        country?: string;
        notes?: string;
    }): Promise<void> {
        await this.clickEditLocation(index);
        await this.waitForLoadingToComplete();
        
        if (locationData.name) {
            await this.fillLocationName(locationData.name);
        }
        
        if (locationData.address) {
            await this.fillLocationAddress(locationData.address);
        }
        
        if (locationData.city) {
            await this.fillLocationCity(locationData.city);
        }
        
        if (locationData.state) {
            await this.fillLocationState(locationData.state);
        }
        
        if (locationData.postalCode) {
            await this.fillLocationPostalCode(locationData.postalCode);
        }
        
        if (locationData.country) {
            await this.selectLocationCountry(locationData.country);
        }
        
        if (locationData.notes) {
            await this.fillLocationNotes(locationData.notes);
        }
        
        await this.clickSaveLocationButton();
        await this.waitForLoadingToComplete();
    }

    /**
     * Deletes a location at the specified index with confirmation
     */
    async deleteLocationWithConfirmation(index: number): Promise<void> {
        await this.clickDeleteLocation(index);
        
        // Wait for confirmation modal/dialog
        await this.page.waitForTimeout(1000);
        
        // Look for confirmation button in modal
        const confirmButton = this.page.locator('button:has-text("Confirm"), button:has-text("Delete"), button:has-text("Yes")');
        if (await confirmButton.isVisible()) {
            await confirmButton.click();
        }
        
        await this.waitForLoadingToComplete();
    }
}