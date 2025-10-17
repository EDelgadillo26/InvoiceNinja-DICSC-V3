import { Browser, BrowserContext, Page } from "@playwright/test";
import { PageManager } from "../pages/pageManager.page";

export class BrowserContextConstructor {
    private browser: Browser;

    constructor(browser: Browser) {
        this.browser = browser;
    }

    /**
     * Create a new context which represents a new browser window
     * @param width Width of the browser window (default is 1920)
     * @param height Height of the browser window (default is 1080)
     * @returns BrowserContext instance
     */
    async createUserBrowserWindow(width: number = 1920, height: number = 1080) {
        return await this.browser.newContext({
            screen: { width, height }
        });
    }
    
    /** 
     * Close context which represents a close of a browser window
     * @param context BrowserContext instance to close
     */
    async closeUserBrowserWindow(context: BrowserContext) {
        await context.close();
    }

     /** 
      *Create a new page in the same context which represents a new tab in the same browser window. Returns a PageManager instance for page object management.
        * @param context BrowserContext instance where the new tab will be created
        * @param width Width of the new tab (default is 1920)
        * @param height Height of the new tab (default is 1080)
        * @return PageManager instance for managing page objects 
     */
    async createNewTabInBrowserWindow(context: BrowserContext, width: number = 1920, height: number = 1080): Promise<PageManager> {
        const newpage = await context.newPage();
        await newpage.setViewportSize({ width, height });
        return new PageManager(newpage);
    }

    /**
     * Reload a tab in the browser window
     * @param page Page instance to reload
     */
    async realoadTab(page: Page) {
        await page.reload();
        await page.waitForLoadState('networkidle');
    }
}