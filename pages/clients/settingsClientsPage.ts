import { Page, Locator, expect } from '@playwright/test';

export class SettingsClientsPage {

  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

    // ========== PAGE HEADER SELECTORS ==========
    private readonly pageTitle = 'h2:has-text("New Client")';
    private readonly saveButton = 'button:has-text("Save")';
    private readonly unlockProButton = 'button:has-text("Unlock Pro"), button:has-text("Upgrade")';

    // ========== BREADCRUMB SELECTORS ==========
    private readonly breadcrumbHome = 'nav[aria-label="Breadcrumb"] a[href="#/dashboard"]';
    private readonly breadcrumbClients = 'nav[aria-label="Breadcrumb"] a[href="#/clients"]';
    private readonly breadcrumbNewClient = 'nav[aria-label="Breadcrumb"] a[href="#/clients/create"]';

    // ========== TAB NAVIGATION SELECTORS ==========
    private readonly tabSelector = '[data-cy="tabs"]';
    private readonly tabCreate = 'a[href="#/clients/create"]:has-text("Create")';
    private readonly tabSettings = 'a[href="#/clients/create/settings"]:has-text("Settings")';
    private readonly tabDocuments = 'a[href="#/clients/create/documents"]:has-text("Documents")';
    private readonly tabLocations = 'a[href="#/clients/create/locations"]:has-text("Locations")';
    private readonly tabContainer = 'nav[aria-label="Tabs"]';

    // ========== SETTINGS SECTION SELECTORS ==========
    private readonly settingsForm = 'form';
    private readonly settingsHeader = 'h3:has-text("Settings")';
    private readonly settingsTitle = 'h3:has-text("Settings")';

    // ========== SETTINGS FORM FIELD SELECTORS ==========
    private readonly currencyDropdown = '#react-select-14-input';
    private readonly currencyInput = '#react-select-14-input';
    private readonly currencyPlaceholder = '#react-select-14-placeholder';
    private readonly currencyChevron = '#react-select-14-input >> .. >> svg >> nth=-1';

    private readonly languageDropdown = '#react-select-15-input';
    private readonly languageInput = '#react-select-15-input';
    private readonly languagePlaceholder = '#react-select-15-placeholder';
    private readonly languageChevron = '#react-select-15-input >> .. >> svg >> nth=-1';

    private readonly paymentTermsDropdown = '#react-select-16-input';
    private readonly paymentTermsInput = '#react-select-16-input';
    private readonly paymentTermsValue = '#react-select-16-input >> .. >> .css-ood9ll-singleValue';
    private readonly paymentTermsChevron = '#react-select-16-input >> .. >> svg >> nth=-1';

    private readonly quoteValidUntilDropdown = '#react-select-17-input';
    private readonly quoteValidUntilInput = '#react-select-17-input';
    private readonly quoteValidUntilValue = '#react-select-17-input >> .. >> .css-ood9ll-singleValue';
    private readonly quoteValidUntilChevron = '#react-select-17-input >> .. >> svg >> nth=-1';

    private readonly taskRateInput = 'input[inputmode="numeric"]';

    private readonly sendRemindersDropdown = '#react-select-11-input';
    private readonly sendRemindersInput = '#react-select-11-input';
    private readonly sendRemindersValue = '#react-select-11-input >> .. >> .css-ood9ll-singleValue';
    private readonly sendRemindersChevron = '#react-select-11-input >> .. >> svg >> nth=-1';

    // ========== CLASSIFY SECTION SELECTORS ==========
    private readonly classifyForm = 'form >> nth=1';
    private readonly classifyHeader = 'h3:has-text("Classify")';
    private readonly classifyTitle = 'h3:has-text("Classify")';

    private readonly companySizeDropdown = '#react-select-12-input';
    private readonly companySizeInput = '#react-select-12-input';
    private readonly companySizeValue = '#react-select-12-input >> .. >> .css-ood9ll-singleValue';
    private readonly companySizeChevron = '#react-select-12-input >> .. >> svg >> nth=-1';

    private readonly industryDropdown = '#react-select-13-input';
    private readonly industryInput = '#react-select-13-input';
    private readonly industryValue = '#react-select-13-input >> .. >> .css-ood9ll-singleValue';
    private readonly industryChevron = '#react-select-13-input >> .. >> svg >> nth=-1';

    // ========== NOTES SECTION SELECTORS ==========
    private readonly notesForm = 'form >> nth=2';
    private readonly notesHeader = 'h3:has-text("Notes")';
    private readonly notesTitle = 'h3:has-text("Notes")';

    private readonly publicNotesEditor = '#tiny-react_62670473011760496429674_ifr >> ..';
    private readonly publicNotesTextarea = '#tiny-react_62670473011760496429674';
    private readonly publicNotesToolbar = '#tiny-react_62670473011760496429674_ifr >> .. >> .tox-toolbar';
    private readonly publicNotesIframe = '#tiny-react_62670473011760496429674_ifr';

    private readonly privateNotesEditor = '#tiny-react_1643960821760496429675_ifr >> ..';
    private readonly privateNotesTextarea = '#tiny-react_1643960821760496429675';
    private readonly privateNotesToolbar = '#tiny-react_1643960821760496429675_ifr >> .. >> .tox-toolbar';
    private readonly privateNotesIframe = '#tiny-react_1643960821760496429675_ifr';

    // ========== TINYMCE EDITOR SELECTORS ==========
    private readonly tinyMceContainer = '.tox-tinymce';
    private readonly tinyMceToolbar = '.tox-toolbar';
    private readonly tinyMceStatusbar = '.tox-statusbar';

    // ========== NAVIGATION METHODS ==========
    
    /**
     * Hace clic en la pestaña "Create"
     */
    async clickTabCreate(): Promise<void> {
        await this.page.locator(this.tabCreate).click();
    }

    /**
     * Hace clic en la pestaña "Settings"
     */
    async clickTabSettings(): Promise<void> {
        await this.page.locator(this.tabSettings).click();
    }

    /**
     * Hace clic en la pestaña "Documents"
     */
    async clickTabDocuments(): Promise<void> {
        await this.page.locator(this.tabDocuments).click();
    }

    /**
     * Hace clic en la pestaña "Locations"
     */
    async clickTabLocations(): Promise<void> {
        await this.page.locator(this.tabLocations).click();
    }

    /**
     * Hace clic en el botón "Save"
     */
    async clickSaveButton(): Promise<void> {
        await this.page.locator(this.saveButton).click();
    }

    /**
     * Hace clic en el botón "Unlock Pro"
     */
    async clickUnlockProButton(): Promise<void> {
        await this.page.locator(this.unlockProButton).click();
    }

    // ========== BREADCRUMB METHODS ==========
    
    /**
     * Hace clic en el breadcrumb "Home"
     */
    async clickBreadcrumbHome(): Promise<void> {
        await this.page.locator(this.breadcrumbHome).click();
    }

    /**
     * Hace clic en el breadcrumb "Clients"
     */
    async clickBreadcrumbClients(): Promise<void> {
        await this.page.locator(this.breadcrumbClients).click();
    }

    /**
     * Hace clic en el breadcrumb "New Client"
     */
    async clickBreadcrumbNewClient(): Promise<void> {
        await this.page.locator(this.breadcrumbNewClient).click();
    }

    // ========== SETTINGS FORM METHODS ==========
    
    /**
     * Selecciona una moneda del dropdown
     * @param {string} currency - Moneda a seleccionar
     */
    async selectCurrency(currency: string): Promise<void> {
        await this.page.locator(this.currencyDropdown).click();
        await this.page.locator(`[role="option"]:has-text("${currency}")`).click();
    }

    /**
     * Selecciona un idioma del dropdown
     * @param {string} language - Idioma a seleccionar
     */
    async selectLanguage(language: string): Promise<void> {
        await this.page.locator(this.languageDropdown).click();
        await this.page.locator(`[role="option"]:has-text("${language}")`).click();
    }

    /**
     * Selecciona términos de pago del dropdown
     * @param {string} terms - Términos a seleccionar
     */
    async selectPaymentTerms(terms: string): Promise<void> {
        await this.page.locator(this.paymentTermsDropdown).click();
        await this.page.locator(`[role="option"]:has-text("${terms}")`).click();
    }

    /**
     * Selecciona período de validez de cotización
     * @param {string} period - Período a seleccionar
     */
    async selectQuoteValidUntil(period: string): Promise<void> {
        await this.page.locator(this.quoteValidUntilDropdown).click();
        await this.page.locator(`[role="option"]:has-text("${period}")`).click();
    }

    /**
     * Llena la tarifa de tarea
     * @param {string} rate - Tarifa a ingresar
     */
    async fillTaskRate(rate: string): Promise<void> {
        await this.page.locator(this.taskRateInput).fill(rate);
    }

    /**
     * Selecciona opción de envío de recordatorios
     * @param {string} option - Opción a seleccionar
     */
    async selectSendReminders(option: string): Promise<void> {
        await this.page.locator(this.sendRemindersDropdown).click();
        await this.page.locator(`[role="option"]:has-text("${option}")`).click();
    }

    // ========== CLASSIFY FORM METHODS ==========
    
    /**
     * Selecciona el tamaño de empresa
     * @param {string} size - Tamaño a seleccionar
     */
    async selectCompanySize(size: string): Promise<void> {
        await this.page.locator(this.companySizeDropdown).click();
        await this.page.locator(`[role="option"]:has-text("${size}")`).click();
    }

    /**
     * Selecciona la industria
     * @param {string} industry - Industria a seleccionar
     */
    async selectIndustry(industry: string): Promise<void> {
        await this.page.locator(this.industryDropdown).click();
        await this.page.locator(`[role="option"]:has-text("${industry}")`).click();
    }

    // ========== NOTES METHODS ==========
    
    /**
     * Llena las notas públicas
     * @param {string} notes - Notas a ingresar
     */
    async fillPublicNotes(notes: string): Promise<void> {
        await this.page.locator(this.publicNotesIframe).locator('body').fill(notes);
    }

    /**
     * Llena las notas privadas
     * @param {string} notes - Notas a ingresar
     */
    async fillPrivateNotes(notes: string): Promise<void> {
        await this.page.locator(this.privateNotesIframe).locator('body').fill(notes);
    }

    // ========== UTILITY METHODS FOR GETTING TEXT ==========
    
    /**
     * Obtiene el título de la página
     * @returns {Promise<string>} El título de la página
     */
    async getPageTitle(): Promise<string> {
        return await this.page.locator(this.pageTitle).textContent() || '';
    }

    /**
     * Obtiene el placeholder de moneda
     * @returns {Promise<string>} El placeholder de moneda
     */
    async getCurrencyPlaceholder(): Promise<string> {
        return await this.page.locator(this.currencyPlaceholder).textContent() || '';
    }

    /**
     * Obtiene el placeholder de idioma
     * @returns {Promise<string>} El placeholder de idioma
     */
    async getLanguagePlaceholder(): Promise<string> {
        return await this.page.locator(this.languagePlaceholder).textContent() || '';
    }

    /**
     * Obtiene el valor de términos de pago
     * @returns {Promise<string>} El valor de términos de pago
     */
    async getPaymentTermsValue(): Promise<string> {
        return await this.page.locator(this.paymentTermsValue).textContent() || '';
    }

    /**
     * Obtiene el valor de validez de cotización
     * @returns {Promise<string>} El valor de validez de cotización
     */
    async getQuoteValidUntilValue(): Promise<string> {
        return await this.page.locator(this.quoteValidUntilValue).textContent() || '';
    }

    /**
     * Obtiene el valor de tarifa de tarea
     * @returns {Promise<string>} El valor de tarifa de tarea
     */
    async getTaskRateValue(): Promise<string> {
        return await this.page.locator(this.taskRateInput).inputValue();
    }

    /**
     * Obtiene el valor de envío de recordatorios
     * @returns {Promise<string>} El valor de envío de recordatorios
     */
    async getSendRemindersValue(): Promise<string> {
        return await this.page.locator(this.sendRemindersValue).textContent() || '';
    }

    /**
     * Obtiene el valor de tamaño de empresa
     * @returns {Promise<string>} El valor de tamaño de empresa
     */
    async getCompanySizeValue(): Promise<string> {
        return await this.page.locator(this.companySizeValue).textContent() || '';
    }

    /**
     * Obtiene el valor de industria
     * @returns {Promise<string>} El valor de industria
     */
    async getIndustryValue(): Promise<string> {
        return await this.page.locator(this.industryValue).textContent() || '';
    }

    /**
     * Obtiene el título de la sección Settings
     * @returns {Promise<string>} El título de Settings
     */
    async getSettingsTitle(): Promise<string> {
        return await this.page.locator(this.settingsTitle).textContent() || '';
    }

    /**
     * Obtiene el título de la sección Classify
     * @returns {Promise<string>} El título de Classify
     */
    async getClassifyTitle(): Promise<string> {
        return await this.page.locator(this.classifyTitle).textContent() || '';
    }

    /**
     * Obtiene el título de la sección Notes
     * @returns {Promise<string>} El título de Notes
     */
    async getNotesTitle(): Promise<string> {
        return await this.page.locator(this.notesTitle).textContent() || '';
    }

    // ========== VISIBILITY METHODS ==========
    
    /**
     * Verifica si el título de la página es visible
     * @returns {Promise<boolean>} true si es visible, false en caso contrario
     */
    async isPageTitleVisible(): Promise<boolean> {
        return await this.page.locator(this.pageTitle).isVisible();
    }

    /**
     * Verifica si el botón "Save" es visible
     * @returns {Promise<boolean>} true si es visible, false en caso contrario
     */
    async isSaveButtonVisible(): Promise<boolean> {
        return await this.page.locator(this.saveButton).isVisible();
    }

    /**
     * Verifica si el botón "Unlock Pro" es visible
     * @returns {Promise<boolean>} true si es visible, false en caso contrario
     */
    async isUnlockProButtonVisible(): Promise<boolean> {
        return await this.page.locator(this.unlockProButton).isVisible();
    }

    /**
     * Verifica si la pestaña "Create" es visible
     * @returns {Promise<boolean>} true si es visible, false en caso contrario
     */
    async isTabCreateVisible(): Promise<boolean> {
        return await this.page.locator(this.tabCreate).isVisible();
    }

    /**
     * Verifica si la pestaña "Settings" es visible
     * @returns {Promise<boolean>} true si es visible, false en caso contrario
     */
    async isTabSettingsVisible(): Promise<boolean> {
        return await this.page.locator(this.tabSettings).isVisible();
    }

    /**
     * Verifica si la pestaña "Documents" es visible
     * @returns {Promise<boolean>} true si es visible, false en caso contrario
     */
    async isTabDocumentsVisible(): Promise<boolean> {
        return await this.page.locator(this.tabDocuments).isVisible();
    }

    /**
     * Verifica si la pestaña "Locations" es visible
     * @returns {Promise<boolean>} true si es visible, false en caso contrario
     */
    async isTabLocationsVisible(): Promise<boolean> {
        return await this.page.locator(this.tabLocations).isVisible();
    }

    /**
     * Verifica si el dropdown de moneda es visible
     * @returns {Promise<boolean>} true si es visible, false en caso contrario
     */
    async isCurrencyDropdownVisible(): Promise<boolean> {
        return await this.page.locator(this.currencyDropdown).isVisible();
    }

    /**
     * Verifica si el dropdown de idioma es visible
     * @returns {Promise<boolean>} true si es visible, false en caso contrario
     */
    async isLanguageDropdownVisible(): Promise<boolean> {
        return await this.page.locator(this.languageDropdown).isVisible();
    }

    /**
     * Verifica si el dropdown de términos de pago es visible
     * @returns {Promise<boolean>} true si es visible, false en caso contrario
     */
    async isPaymentTermsDropdownVisible(): Promise<boolean> {
        return await this.page.locator(this.paymentTermsDropdown).isVisible();
    }

    /**
     * Verifica si el dropdown de validez de cotización es visible
     * @returns {Promise<boolean>} true si es visible, false en caso contrario
     */
    async isQuoteValidUntilDropdownVisible(): Promise<boolean> {
        return await this.page.locator(this.quoteValidUntilDropdown).isVisible();
    }

    /**
     * Verifica si el input de tarifa de tarea es visible
     * @returns {Promise<boolean>} true si es visible, false en caso contrario
     */
    async isTaskRateInputVisible(): Promise<boolean> {
        return await this.page.locator(this.taskRateInput).isVisible();
    }

    /**
     * Verifica si el dropdown de envío de recordatorios es visible
     * @returns {Promise<boolean>} true si es visible, false en caso contrario
     */
    async isSendRemindersDropdownVisible(): Promise<boolean> {
        return await this.page.locator(this.sendRemindersDropdown).isVisible();
    }

    /**
     * Verifica si el dropdown de tamaño de empresa es visible
     * @returns {Promise<boolean>} true si es visible, false en caso contrario
     */
    async isCompanySizeDropdownVisible(): Promise<boolean> {
        return await this.page.locator(this.companySizeDropdown).isVisible();
    }

    /**
     * Verifica si el dropdown de industria es visible
     * @returns {Promise<boolean>} true si es visible, false en caso contrario
     */
    async isIndustryDropdownVisible(): Promise<boolean> {
        return await this.page.locator(this.industryDropdown).isVisible();
    }

    /**
     * Verifica si el editor de notas públicas es visible
     * @returns {Promise<boolean>} true si es visible, false en caso contrario
     */
    async isPublicNotesEditorVisible(): Promise<boolean> {
        return await this.page.locator(this.publicNotesEditor).isVisible();
    }

    /**
     * Verifica si el editor de notas privadas es visible
     * @returns {Promise<boolean>} true si es visible, false en caso contrario
     */
    async isPrivateNotesEditorVisible(): Promise<boolean> {
        return await this.page.locator(this.privateNotesEditor).isVisible();
    }

    /**
     * Verifica si el formulario de configuración es visible
     * @returns {Promise<boolean>} true si es visible, false en caso contrario
     */
    async isSettingsFormVisible(): Promise<boolean> {
        return await this.page.locator(this.settingsForm).isVisible();
    }

    /**
     * Verifica si el formulario de clasificación es visible
     * @returns {Promise<boolean>} true si es visible, false en caso contrario
     */
    async isClassifyFormVisible(): Promise<boolean> {
        return await this.page.locator(this.classifyForm).isVisible();
    }

    /**
     * Verifica si el formulario de notas es visible
     * @returns {Promise<boolean>} true si es visible, false en caso contrario
     */
    async isNotesFormVisible(): Promise<boolean> {
        return await this.page.locator(this.notesForm).isVisible();
    }

    // Advanced Interaction Methods
    async fillCompleteSettingsForm(data: {
        currency?: string;
        language?: string;
        paymentTerms?: string;
        quoteValidUntil?: string;
        taskRate?: string;
        sendReminders?: string;
    }): Promise<void> {
        if (data.currency) await this.selectCurrency(data.currency);
        if (data.language) await this.selectLanguage(data.language);
        if (data.paymentTerms) await this.selectPaymentTerms(data.paymentTerms);
        if (data.quoteValidUntil) await this.selectQuoteValidUntil(data.quoteValidUntil);
        if (data.taskRate) await this.fillTaskRate(data.taskRate);
        if (data.sendReminders) await this.selectSendReminders(data.sendReminders);
    }

    async fillCompleteClassifyForm(data: {
        companySize?: string;
        industry?: string;
    }): Promise<void> {
        if (data.companySize) await this.selectCompanySize(data.companySize);
        if (data.industry) await this.selectIndustry(data.industry);
    }

    async fillCompleteNotesForm(data: {
        publicNotes?: string;
        privateNotes?: string;
    }): Promise<void> {
        if (data.publicNotes) await this.fillPublicNotes(data.publicNotes);
        if (data.privateNotes) await this.fillPrivateNotes(data.privateNotes);
    }

    async fillAllForms(data: {
        settings?: {
            currency?: string;
            language?: string;
            paymentTerms?: string;
            quoteValidUntil?: string;
            taskRate?: string;
            sendReminders?: string;
        };
        classify?: {
            companySize?: string;
            industry?: string;
        };
        notes?: {
            publicNotes?: string;
            privateNotes?: string;
        };
    }): Promise<void> {
        if (data.settings) await this.fillCompleteSettingsForm(data.settings);
        if (data.classify) await this.fillCompleteClassifyForm(data.classify);
        if (data.notes) await this.fillCompleteNotesForm(data.notes);
    }

    // ========== VALIDATION METHODS ==========
    
    /**
     * Valida que el formulario de configuración sea visible
     */
    async validateSettingsFormVisible(): Promise<void> {
        await expect(this.page.locator(this.settingsForm)).toBeVisible();
        await expect(this.page.locator(this.settingsTitle)).toHaveText('Settings');
    }

    /**
     * Valida que el formulario de clasificación sea visible
     */
    async validateClassifyFormVisible(): Promise<void> {
        await expect(this.page.locator(this.classifyForm)).toBeVisible();
        await expect(this.page.locator(this.classifyTitle)).toHaveText('Classify');
    }

    /**
     * Valida que el formulario de notas sea visible
     */
    async validateNotesFormVisible(): Promise<void> {
        await expect(this.page.locator(this.notesForm)).toBeVisible();
        await expect(this.page.locator(this.notesTitle)).toHaveText('Notes');
    }

    /**
     * Valida que la página se haya cargado completamente
     */
    async validatePageLoaded(): Promise<void> {
        await expect(this.page.locator(this.pageTitle)).toBeVisible();
        await expect(this.page.locator(this.saveButton)).toBeVisible();
        await expect(this.page.locator(this.tabSettings)).toHaveAttribute('aria-current', 'page');
        await this.validateSettingsFormVisible();
        await this.validateClassifyFormVisible();
        await this.validateNotesFormVisible();
    }

    /**
     * Valida que una pestaña específica esté activa
     * @param {string} tabName - Nombre de la pestaña a validar
     */
    async validateTabActive(tabName: 'create' | 'settings' | 'documents' | 'locations'): Promise<void> {
        const tabMap = {
            create: this.tabCreate,
            settings: this.tabSettings,
            documents: this.tabDocuments,
            locations: this.tabLocations
        };
        
        const activeTab = tabMap[tabName];
        await expect(this.page.locator(activeTab)).toHaveAttribute('aria-current', 'page');
    }

    // ========== WAIT METHODS ==========
    
    /**
     * Espera a que la página se cargue completamente
     */
    async waitForPageLoad(): Promise<void> {
        await this.page.locator(this.pageTitle).waitFor({ state: 'visible' });
        await this.page.locator(this.settingsForm).waitFor({ state: 'visible' });
        await this.page.locator(this.classifyForm).waitFor({ state: 'visible' });
        await this.page.locator(this.notesForm).waitFor({ state: 'visible' });
    }

    /**
     * Espera a que un dropdown se cargue
     * @param {string} dropdownSelector - Selector del dropdown
     */
    async waitForDropdownToLoad(dropdownSelector: string): Promise<void> {
        await this.page.locator(dropdownSelector).waitFor({ state: 'visible' });
    }

    /**
     * Espera a que TinyMCE se cargue
     */
    async waitForTinyMceToLoad(): Promise<void> {
        await this.page.locator(this.tinyMceContainer).waitFor({ state: 'visible' });
        await this.page.locator(this.publicNotesEditor).waitFor({ state: 'visible' });
        await this.page.locator(this.privateNotesEditor).waitFor({ state: 'visible' });
    }

    // ========== HELPER METHODS FOR COMPLEX INTERACTIONS ==========
    
    /**
     * Guarda la configuración
     */
    async saveSettings(): Promise<void> {
        await this.clickSaveButton();
        // Wait for save confirmation or page navigation
        await this.page.waitForTimeout(1000);
    }

    /**
     * Navega a una pestaña específica
     * @param {string} tabName - Nombre de la pestaña
     */
    async navigateToTab(tabName: 'create' | 'settings' | 'documents' | 'locations'): Promise<void> {
        const tabMethods = {
            create: () => this.clickTabCreate(),
            settings: () => this.clickTabSettings(),
            documents: () => this.clickTabDocuments(),
            locations: () => this.clickTabLocations()
        };
        
        await tabMethods[tabName]();
        await this.validateTabActive(tabName);
    }

    /**
     * Hace scroll a una sección específica
     * @param {string} section - Sección a la que hacer scroll
     */
    async scrollToSection(section: 'settings' | 'classify' | 'notes'): Promise<void> {
        const sectionMap = {
            settings: this.settingsHeader,
            classify: this.classifyHeader,
            notes: this.notesHeader
        };
        
        await this.page.locator(sectionMap[section]).scrollIntoViewIfNeeded();
    }
}