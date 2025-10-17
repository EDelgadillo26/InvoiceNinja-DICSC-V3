import { Page, Locator, expect } from '@playwright/test';

export class baseNavigationPage {

  private page: Page;

  constructor(page: Page) {
    this.page = page;

  }
    // ========== MAIN NAVIGATION CONTAINER ==========
    protected readonly sidebarContainer = 'div.flex.flex-col.flex-grow.overflow-y-auto.border-r.px-3';
    
    // ========== COMPANY HEADER SECTION ==========
    protected readonly companyHeader = 'div.flex.items-center.flex-shrink-0.h-16.border-b.py-3';
    protected readonly companyDropdown = '[data-cy="companyDropdown"]';
    protected readonly companyDropdownButton = '#headlessui-menu-button-\\:r2r\\:';
    protected readonly companyLogo = 'img[src="/logo180.png"]';
    protected readonly companyName = 'span.text-sm.text-start.w-36.truncate.text-gray-200';
    protected readonly companyDropdownIcon = 'svg[viewBox="0 0 20 20"]';

    // ========== MAIN NAVIGATION BAR ==========
    protected readonly navigationBar = '[data-cy="navigationBar"]';
    
    // Dashboard
    protected readonly dashboardLink = 'a[href="#/dashboard"]';
    protected readonly dashboardIcon = 'svg[viewBox="0 0 18 18"]:has(path[d*="M3.145,6.2l5.25"])';
    protected readonly dashboardText = 'span:has-text("Dashboard")';

    // Clients
    protected readonly clientsLink = 'a[href="#/clients"]';
    protected readonly clientsCreateLink = 'a[href="#/clients/create"]';
    protected readonly clientsIcon = 'svg[viewBox="0 0 18 18"]:has(circle[cx="6.5"])';
    protected readonly clientsText = 'span:has-text("Clients")';
    protected readonly clientsAddButton = 'a[href="#/clients/create"] svg[viewBox="0 0 20 20"]';

    // Products
    protected readonly productsLink = 'a[href="#/products"]';
    protected readonly productsCreateLink = 'a[href="#/products/create"]';
    protected readonly productsIcon = 'svg[viewBox="0 0 18 18"]:has(polyline[points="14.983 5.53"])';
    protected readonly productsText = 'span:has-text("Products")';
    protected readonly productsAddButton = 'a[href="#/products/create"] svg[viewBox="0 0 20 20"]';

    // Invoices
    protected readonly invoicesLink = 'a[href="#/invoices"]';
    protected readonly invoicesCreateLink = 'a[href="#/invoices/create"]';
    protected readonly invoicesIcon = 'svg[viewBox="0 0 18 18"]:has(path[d*="M14.75,3.75v12.5"])';
    protected readonly invoicesText = 'span:has-text("Invoices")';
    protected readonly invoicesAddButton = 'a[href="#/invoices/create"] svg[viewBox="0 0 20 20"]';

    // Recurring Invoices
    protected readonly recurringInvoicesLink = 'a[href="#/recurring_invoices"]';
    protected readonly recurringInvoicesCreateLink = 'a[href="#/recurring_invoices/create"]';
    protected readonly recurringInvoicesIcon = 'svg[viewBox="0 0 18 18"]:has(path[d*="M9,1c-2.48"])';
    protected readonly recurringInvoicesText = 'span:has-text("Recurring Invoices")';
    protected readonly recurringInvoicesAddButton = 'a[href="#/recurring_invoices/create"] svg[viewBox="0 0 20 20"]';

    // Payments
    protected readonly paymentsLink = 'a[href="#/payments"]';
    protected readonly paymentsCreateLink = 'a[href="#/payments/create"]';
    protected readonly paymentsIcon = 'svg[viewBox="0 0 18 18"]:has(line[x1="1.75"][y1="7.25"])';
    protected readonly paymentsText = 'span:has-text("Payments")';
    protected readonly paymentsAddButton = 'a[href="#/payments/create"] svg[viewBox="0 0 20 20"]';

    // Quotes
    protected readonly quotesLink = 'a[href="#/quotes"]';
    protected readonly quotesCreateLink = 'a[href="#/quotes/create"]';
    protected readonly quotesIcon = 'svg[viewBox="0 0 18 18"]:has(path[d*="M5.25,13.25h-1"])';
    protected readonly quotesText = 'span:has-text("Quotes")';
    protected readonly quotesAddButton = 'a[href="#/quotes/create"] svg[viewBox="0 0 20 20"]';

    // Credits
    protected readonly creditsLink = 'a[href="#/credits"]';
    protected readonly creditsCreateLink = 'a[href="#/credits/create"]';
    protected readonly creditsIcon = 'svg[viewBox="0 0 18 18"]:has(path[d*="M2.25,5.5h0"])';
    protected readonly creditsText = 'span:has-text("Credits")';
    protected readonly creditsAddButton = 'a[href="#/credits/create"] svg[viewBox="0 0 20 20"]';

    // Projects
    protected readonly projectsLink = 'a[href="#/projects"]';
    protected readonly projectsCreateLink = 'a[href="#/projects/create"]';
    protected readonly projectsIcon = 'svg[viewBox="0 0 18 18"]:has(path[d*="M1.75,8.75c1.421"])';
    protected readonly projectsText = 'span:has-text("Projects")';
    protected readonly projectsAddButton = 'a[href="#/projects/create"] svg[viewBox="0 0 20 20"]';

    // Tasks
    protected readonly tasksLink = 'a[href="#/tasks"]';
    protected readonly tasksCreateLink = 'a[href="#/tasks/create"]';
    protected readonly tasksIcon = 'svg[viewBox="0 0 12 12"]:has(path[d*="m7.75,1.75h.5"])';
    protected readonly tasksText = 'span:has-text("Tasks")';
    protected readonly tasksAddButton = 'a[href="#/tasks/create"] svg[viewBox="0 0 20 20"]';

    // Vendors
    protected readonly vendorsLink = 'a[href="#/vendors"]';
    protected readonly vendorsCreateLink = 'a[href="#/vendors/create"]';
    protected readonly vendorsIcon = 'svg[viewBox="0 0 18 18"]:has(path[d*="M7.75,16.25V7.75"])';
    protected readonly vendorsText = 'span:has-text("Vendors")';
    protected readonly vendorsAddButton = 'a[href="#/vendors/create"] svg[viewBox="0 0 20 20"]';

    // Purchase Orders
    protected readonly purchaseOrdersLink = 'a[href="#/purchase_orders"]';
    protected readonly purchaseOrdersCreateLink = 'a[href="#/purchase_orders/create"]';
    protected readonly purchaseOrdersIcon = 'svg[viewBox="0 0 18 18"]:has(line[x1="5.75"][y1="6.75"])';
    protected readonly purchaseOrdersText = 'span:has-text("Purchase Orders")';
    protected readonly purchaseOrdersAddButton = 'a[href="#/purchase_orders/create"] svg[viewBox="0 0 20 20"]';

    // Expenses
    protected readonly expensesLink = 'a[href="#/expenses"]';
    protected readonly expensesCreateLink = 'a[href="#/expenses/create"]';
    protected readonly expensesIcon = 'svg[viewBox="0 0 18 18"]:has(path[d*="M9.5,4.75l2-3"])';
    protected readonly expensesText = 'span:has-text("Expenses")';
    protected readonly expensesAddButton = 'a[href="#/expenses/create"] svg[viewBox="0 0 20 20"]';

    // Recurring Expenses
    protected readonly recurringExpensesLink = 'a[href="#/recurring_expenses"]';
    protected readonly recurringExpensesCreateLink = 'a[href="#/recurring_expenses/create"]';
    protected readonly recurringExpensesIcon = 'svg[viewBox="0 0 18 18"]:has(path[d*="m16.12,14.695"])';
    protected readonly recurringExpensesText = 'span:has-text("Recurring Expenses")';
    protected readonly recurringExpensesAddButton = 'a[href="#/recurring_expenses/create"] svg[viewBox="0 0 20 20"]';

    // Transactions
    protected readonly transactionsLink = 'a[href="#/transactions"]';
    protected readonly transactionsCreateLink = 'a[href="#/transactions/create"]';
    protected readonly transactionsIcon = 'svg[viewBox="0 0 18 18"]:has(polyline[points="4.25 6.75"])';
    protected readonly transactionsText = 'span:has-text("Transactions")';
    protected readonly transactionsAddButton = 'a[href="#/transactions/create"] svg[viewBox="0 0 20 20"]';

    // Reports
    protected readonly reportsLink = 'a[href="#/reports"]';
    protected readonly reportsIcon = 'svg[viewBox="0 0 12 12"]:has(polyline[points="1.25 7.75"])';
    protected readonly reportsText = 'span:has-text("Reports")';

    // Settings
    protected readonly settingsLink = 'a[href="#/settings/company_details"]';
    protected readonly settingsIcon = 'svg[viewBox="0 0 18 18"]:has(circle[cx="9"][cy="8.999"])';
    protected readonly settingsText = 'span:has-text("Settings")';

    // ========== BOTTOM NAVIGATION BAR ==========
    protected readonly bottomNavbar = 'nav.flex.space-x-2\\.5.py-4.text-white.border-t.justify-around.px-2';
    protected readonly mailIcon = 'svg[viewBox="0 0 24 24"]:has(path[d*="M4 4h16"])';
    protected readonly chatIcon = 'svg[viewBox="0 0 18 18"]:has(path[d*="M14.25,2.25H3.75"])';
    protected readonly helpIcon = 'svg[viewBox="0 0 18 18"]:has(circle[cx="9"][cy="9"][r="7.25"])';
    protected readonly infoIcon = 'svg[viewBox="0 0 12 12"]:has(circle[cx="6"][cy="6"][r="5.25"])';
    protected readonly darkModeIcon = 'svg[viewBox="0 0 18 18"]:has(path[d*="M13,11.75c-3.452"])';
    protected readonly sidebarToggleIcon = 'svg[viewBox="0 0 18 18"]:has(line[x1="6.25"][y1="2.75"])';

    // ========== BASIC NAVIGATION METHODS ==========
    
    /**
     * Validates that the sidebar navigation is visible and accessible
     */
    async validateSidebarIsVisible(): Promise<void> {
        await expect(this.page.locator(this.sidebarContainer)).toBeVisible();
        await expect(this.page.locator(this.navigationBar)).toBeVisible();
    }

    /**
     * Validates that the company header section is visible
     */
    async validateCompanyHeaderIsVisible(): Promise<void> {
        await expect(this.page.locator(this.companyHeader)).toBeVisible();
        await expect(this.page.locator(this.companyLogo)).toBeVisible();
        await expect(this.page.locator(this.companyName)).toBeVisible();
    }

    // ========== NAVIGATION CLICK METHODS ==========

    async clickDashboard(): Promise<void> {
        await this.page.locator(this.dashboardLink).click();
    }

    async clickClients(): Promise<void> {
        await this.page.locator(this.clientsLink).click();
    }

    async clickCreateClient(): Promise<void> {
        await this.page.locator(this.clientsCreateLink).click();
    }

    async clickProducts(): Promise<void> {
        await this.page.locator(this.productsLink).click();
    }

    async clickCreateProduct(): Promise<void> {
        await this.page.locator(this.productsCreateLink).click();
    }

    async clickInvoices(): Promise<void> {
        await this.page.locator(this.invoicesLink).click();
    }

    async clickCreateInvoice(): Promise<void> {
        await this.page.locator(this.invoicesCreateLink).click();
    }

    async clickRecurringInvoices(): Promise<void> {
        await this.page.locator(this.recurringInvoicesLink).click();
    }

    async clickCreateRecurringInvoice(): Promise<void> {
        await this.page.locator(this.recurringInvoicesCreateLink).click();
    }

    async clickPayments(): Promise<void> {
        await this.page.locator(this.paymentsLink).click();
    }

    async clickCreatePayment(): Promise<void> {
        await this.page.locator(this.paymentsCreateLink).click();
    }

    async clickQuotes(): Promise<void> {
        await this.page.locator(this.quotesLink).click();
    }

    async clickCreateQuote(): Promise<void> {
        await this.page.locator(this.quotesCreateLink).click();
    }

    async clickCredits(): Promise<void> {
        await this.page.locator(this.creditsLink).click();
    }

    async clickCreateCredit(): Promise<void> {
        await this.page.locator(this.creditsCreateLink).click();
    }

    async clickProjects(): Promise<void> {
        await this.page.locator(this.projectsLink).click();
    }

    async clickCreateProject(): Promise<void> {
        await this.page.locator(this.projectsCreateLink).click();
    }

    async clickTasks(): Promise<void> {
        await this.page.locator(this.tasksLink).click();
    }

    async clickCreateTask(): Promise<void> {
        await this.page.locator(this.tasksCreateLink).click();
    }

    async clickVendors(): Promise<void> {
        await this.page.locator(this.vendorsLink).click();
    }

    async clickCreateVendor(): Promise<void> {
        await this.page.locator(this.vendorsCreateLink).click();
    }

    async clickPurchaseOrders(): Promise<void> {
        await this.page.locator(this.purchaseOrdersLink).click();
    }

    async clickCreatePurchaseOrder(): Promise<void> {
        await this.page.locator(this.purchaseOrdersCreateLink).click();
    }

    async clickExpenses(): Promise<void> {
        await this.page.locator(this.expensesLink).click();
    }

    async clickCreateExpense(): Promise<void> {
        await this.page.locator(this.expensesCreateLink).click();
    }

    async clickRecurringExpenses(): Promise<void> {
        await this.page.locator(this.recurringExpensesLink).click();
    }

    async clickCreateRecurringExpense(): Promise<void> {
        await this.page.locator(this.recurringExpensesCreateLink).click();
    }

    async clickTransactions(): Promise<void> {
        await this.page.locator(this.transactionsLink).click();
    }

    async clickCreateTransaction(): Promise<void> {
        await this.page.locator(this.transactionsCreateLink).click();
    }

    async clickReports(): Promise<void> {
        await this.page.locator(this.reportsLink).click();
    }

    async clickSettings(): Promise<void> {
        await this.page.locator(this.settingsLink).click();
    }

    // ========== COMPANY DROPDOWN METHODS ==========

    async clickCompanyDropdown(): Promise<void> {
        await this.page.locator(this.companyDropdownButton).click();
    }

    async validateCompanyName(expectedName: string): Promise<void> {
        await expect(this.page.locator(this.companyName)).toHaveText(expectedName);
    }

    // ========== BOTTOM NAVIGATION METHODS ==========

    async validateBottomNavigationIsVisible(): Promise<void> {
        await expect(this.page.locator(this.bottomNavbar)).toBeVisible();
    }

    async clickMailIcon(): Promise<void> {
        await this.page.locator(this.mailIcon).click();
    }

    async clickChatIcon(): Promise<void> {
        await this.page.locator(this.chatIcon).click();
    }

    async clickHelpIcon(): Promise<void> {
        await this.page.locator(this.helpIcon).click();
    }

    async clickInfoIcon(): Promise<void> {
        await this.page.locator(this.infoIcon).click();
    }

    async clickDarkModeToggle(): Promise<void> {
        await this.page.locator(this.darkModeIcon).click();
    }

    async clickSidebarToggle(): Promise<void> {
        await this.page.locator(this.sidebarToggleIcon).click();
    }

    // ========== VALIDATION METHODS ==========

    /**
     * Validates that a specific navigation item is highlighted/active
     */
    async validateNavigationItemIsActive(itemSelector: string): Promise<void> {
        const item = this.page.locator(itemSelector).locator('..');
        await expect(item).toHaveClass(/border-l-4/);
    }

    /**
     * Validates that all main navigation items are visible
     */
    async validateAllNavigationItemsAreVisible(): Promise<void> {
        const navigationItems = [
            this.dashboardLink,
            this.clientsLink,
            this.productsLink,
            this.invoicesLink,
            this.recurringInvoicesLink,
            this.paymentsLink,
            this.quotesLink,
            this.creditsLink,
            this.projectsLink,
            this.tasksLink,
            this.vendorsLink,
            this.purchaseOrdersLink,
            this.expensesLink,
            this.recurringExpensesLink,
            this.transactionsLink,
            this.reportsLink,
            this.settingsLink
        ];

        for (const item of navigationItems) {
            await expect(this.page.locator(item)).toBeVisible();
        }
    }

    /**
     * Validates that all add buttons (+) are visible for entities that support creation
     */
    async validateAllAddButtonsAreVisible(): Promise<void> {
        const addButtons = [
            this.clientsAddButton,
            this.productsAddButton,
            this.invoicesAddButton,
            this.recurringInvoicesAddButton,
            this.paymentsAddButton,
            this.quotesAddButton,
            this.creditsAddButton,
            this.projectsAddButton,
            this.tasksAddButton,
            this.vendorsAddButton,
            this.purchaseOrdersAddButton,
            this.expensesAddButton,
            this.recurringExpensesAddButton,
            this.transactionsAddButton
        ];

        for (const button of addButtons) {
            await expect(this.page.locator(button)).toBeVisible();
        }
    }

    // ========== UTILITY METHODS ==========

    /**
     * Gets the current page URL
     */
    async getCurrentUrl(): Promise<string> {
        return await this.page.url();
    }

    /**
     * Waits for the navigation to be fully loaded
     */
    async waitForNavigationToLoad(): Promise<void> {
        await this.page.waitForSelector(this.navigationBar);
        await this.page.waitForSelector(this.companyHeader);
    }

    /**
     * Validates that the page is ready for interaction
     */
    async validatePageIsReady(): Promise<void> {
        await this.waitForNavigationToLoad();
        await this.validateSidebarIsVisible();
        await this.validateCompanyHeaderIsVisible();
    }
}