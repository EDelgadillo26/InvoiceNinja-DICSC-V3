import { Page, Locator, expect } from '@playwright/test';

export class DocumentsClientsPage {

  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }


    // ========== PAGE HEADER SELECTORS ==========
    private readonly pageHeaderLink = 'a[href*="/documents"]';
    private readonly pageHeaderText = 'h1, .page-title';
    private readonly pageTitle = 'h3:has-text("Documents")';

    // ========== BREADCRUMB SELECTORS ==========
    private readonly breadcrumbContainer = 'nav[aria-label="breadcrumb"], .breadcrumb';
    private readonly breadcrumbItems = '.breadcrumb-item';
    private readonly breadcrumbLinks = '.breadcrumb-item a';

    // ========== ACTION SELECTORS ==========
    private readonly actionNewButton = 'button:has-text("New"), a:has-text("New")';

    // ========== WARNING MESSAGE SELECTORS ==========
    private readonly warningMessage = '.alert-warning, .warning-message';
    private readonly warningIcon = '.fa-exclamation-triangle, .warning-icon';
    private readonly warningText = '.alert-warning p, .warning-text';
    private readonly upgradeLink = 'a:has-text("upgrade")';

    // ========== DOCUMENT UPLOAD SELECTORS ==========
    private readonly documentUploadContainer = '.document-upload, .upload-container';
    private readonly dropzoneArea = '.dropzone, [data-testid="dropzone"]';
    private readonly dropzoneIcon = '.dropzone .fa-cloud-upload, .upload-icon';
    private readonly dropzoneText = '.dropzone-text, .upload-text';
    private readonly dropzoneSubtext = '.dropzone-subtext, .upload-subtext';
    private readonly dropzoneInstruction = '.dropzone-instruction, .upload-instruction';
    private readonly fileInput = 'input[type="file"]';

    // ========== DOCUMENT TABLE SELECTORS ==========
    private readonly tableContainer = '.table-container, .documents-table';
    private readonly table = 'table';
    private readonly tableHeader = 'thead';
    private readonly tableHeaderCells = 'thead th';
    private readonly tableBody = 'tbody';
    private readonly tableRows = 'tbody tr';
    private readonly tableCells = 'tbody td';
    private readonly noDataRow = 'tr:has-text("No data available")';
    private readonly noDataText = 'td:has-text("No data available")';

    // ========== PAGINATION SELECTORS ==========
    private readonly paginationContainer = '.pagination';
    private readonly paginationItems = '.pagination li';
    private readonly paginationNumbers = '.pagination a[href*="page"]';
    private readonly paginationPrevious = '.pagination .previous';
    private readonly paginationNext = '.pagination .next';

    // ========== DOCUMENT ACTION SELECTORS ==========
    private readonly documentActions = '.document-actions, .table-actions';
    private readonly downloadButton = 'button:has-text("Download"), a:has-text("Download")';
    private readonly deleteButton = 'button:has-text("Delete"), .delete-button';
    private readonly editButton = 'button:has-text("Edit"), .edit-button';

    // ========== MODAL SELECTORS ==========
    private readonly modal = '.modal, .dialog';
    private readonly modalHeader = '.modal-header';
    private readonly modalBody = '.modal-body';
    private readonly modalFooter = '.modal-footer';
    private readonly modalCloseButton = '.modal .close, .dialog .close';
    private readonly confirmButton = 'button:has-text("Confirm"), button:has-text("Yes")';
    private readonly cancelButton = 'button:has-text("Cancel"), button:has-text("No")';

    // ========== PAGE HEADER METHODS ==========
    
    /**
     * Obtiene el texto del encabezado de la página
     * @returns {Promise<string>} El texto del encabezado
     */
    async getPageHeaderText(): Promise<string> {
        return await this.page.locator(this.pageHeaderText).textContent() || '';
    }

    /**
     * Verifica si el encabezado de la página es visible
     * @returns {Promise<boolean>} true si es visible, false en caso contrario
     */
    async isPageHeaderVisible(): Promise<boolean> {
        return await this.page.locator(this.pageHeaderText).isVisible();
    }

    /**
     * Hace clic en el enlace del encabezado de la página
     */
    async clickPageHeaderLink(): Promise<void> {
        await this.page.locator(this.pageHeaderLink).click();
    }

    // ========== BREADCRUMB METHODS ==========
    
    /**
     * Obtiene los textos de los elementos del breadcrumb
     * @returns {Promise<string[]>} Array con los textos de los elementos
     */
    async getBreadcrumbsText(): Promise<string[]> {
        const items = await this.page.locator(this.breadcrumbItems).allTextContents();
        return items;
    }

    /**
     * Verifica si el contenedor de breadcrumbs es visible
     * @returns {Promise<boolean>} true si es visible, false en caso contrario
     */
    async isBreadcrumbsVisible(): Promise<boolean> {
        return await this.page.locator(this.breadcrumbContainer).isVisible();
    }

    /**
     * Hace clic en un enlace específico del breadcrumb
     * @param {number} index - Índice del enlace a hacer clic
     */
    async clickBreadcrumbLink(index: number): Promise<void> {
        await this.page.locator(this.breadcrumbLinks).nth(index).click();
    }

    // ========== ACTION METHODS ==========
    
    /**
     * Verifica si el botón "Nuevo" es visible
     * @returns {Promise<boolean>} true si es visible, false en caso contrario
     */
    async isNewButtonVisible(): Promise<boolean> {
        return await this.page.locator(this.actionNewButton).isVisible();
    }

    /**
     * Hace clic en el botón "Nuevo"
     */
    async clickNewButton(): Promise<void> {
        await this.page.locator(this.actionNewButton).click();
    }

    // ========== WARNING MESSAGE METHODS ==========
    
    /**
     * Verifica si el mensaje de advertencia es visible
     * @returns {Promise<boolean>} true si es visible, false en caso contrario
     */
    async isWarningMessageVisible(): Promise<boolean> {
        return await this.page.locator(this.warningMessage).isVisible();
    }

    /**
     * Obtiene el texto del mensaje de advertencia
     * @returns {Promise<string>} El texto del mensaje de advertencia
     */
    async getWarningMessageText(): Promise<string> {
        return await this.page.locator(this.warningText).textContent() || '';
    }

    /**
     * Verifica si el ícono de advertencia es visible
     * @returns {Promise<boolean>} true si es visible, false en caso contrario
     */
    async isWarningIconVisible(): Promise<boolean> {
        return await this.page.locator(this.warningIcon).isVisible();
    }

    /**
     * Hace clic en el enlace de actualización
     */
    async clickUpgradeLink(): Promise<void> {
        await this.page.locator(this.upgradeLink).click();
    }

    /**
     * Verifica si el enlace de actualización es visible
     * @returns {Promise<boolean>} true si es visible, false en caso contrario
     */
    async isUpgradeLinkVisible(): Promise<boolean> {
        return await this.page.locator(this.upgradeLink).isVisible();
    }

    // ========== DOCUMENT UPLOAD METHODS ==========
    
    /**
     * Verifica si la zona de arrastre es visible
     * @returns {Promise<boolean>} true si es visible, false en caso contrario
     */
    async isDropzoneVisible(): Promise<boolean> {
        return await this.page.locator(this.dropzoneArea).isVisible();
    }

    /**
     * Obtiene el texto de la zona de arrastre
     * @returns {Promise<string>} El texto de la zona de arrastre
     */
    async getDropzoneText(): Promise<string> {
        return await this.page.locator(this.dropzoneText).textContent() || '';
    }

    /**
     * Obtiene el subtexto de la zona de arrastre
     * @returns {Promise<string>} El subtexto de la zona de arrastre
     */
    async getDropzoneSubtext(): Promise<string> {
        return await this.page.locator(this.dropzoneSubtext).textContent() || '';
    }

    /**
     * Obtiene el texto de instrucciones de la zona de arrastre
     * @returns {Promise<string>} El texto de instrucciones
     */
    async getDropzoneInstructionText(): Promise<string> {
        return await this.page.locator(this.dropzoneInstruction).textContent() || '';
    }

    /**
     * Verifica si el ícono de la zona de arrastre es visible
     * @returns {Promise<boolean>} true si es visible, false en caso contrario
     */
    async isDropzoneIconVisible(): Promise<boolean> {
        return await this.page.locator(this.dropzoneIcon).isVisible();
    }

    /**
     * Carga un archivo en el input de archivos
     * @param {string} filePath - Ruta del archivo a cargar
     */
    async uploadFile(filePath: string): Promise<void> {
        await this.page.locator(this.fileInput).setInputFiles(filePath);
    }

    /**
     * Hace clic en la zona de arrastre
     */
    async clickDropzone(): Promise<void> {
        await this.page.locator(this.dropzoneArea).click();
    }

    // ========== DOCUMENT TABLE METHODS ==========
    
    /**
     * Verifica si la tabla es visible
     * @returns {Promise<boolean>} true si es visible, false en caso contrario
     */
    async isTableVisible(): Promise<boolean> {
        return await this.page.locator(this.table).isVisible();
    }

    /**
     * Obtiene los textos del encabezado de la tabla
     * @returns {Promise<string[]>} Array con los textos del encabezado
     */
    async getTableHeaderText(): Promise<string[]> {
        const headers = await this.page.locator(this.tableHeaderCells).allTextContents();
        return headers;
    }

    /**
     * Obtiene el número de filas de la tabla
     * @returns {Promise<number>} Número de filas
     */
    async getTableRowsCount(): Promise<number> {
        return await this.page.locator(this.tableRows).count();
    }

    /**
     * Obtiene el texto de una celda específica
     * @param {number} row - Índice de la fila
     * @param {number} column - Índice de la columna
     * @returns {Promise<string>} El texto de la celda
     */
    async getTableCellText(row: number, column: number): Promise<string> {
        const cell = this.page.locator(this.tableRows).nth(row).locator('td').nth(column);
        return await cell.textContent() || '';
    }

    /**
     * Verifica si el mensaje "No data available" es visible
     * @returns {Promise<boolean>} true si es visible, false en caso contrario
     */
    async isNoDataVisible(): Promise<boolean> {
        return await this.page.locator(this.noDataRow).isVisible();
    }

    /**
     * Obtiene el texto del mensaje "No data available"
     * @returns {Promise<string>} El texto del mensaje
     */
    async getNoDataText(): Promise<string> {
        return await this.page.locator(this.noDataText).textContent() || '';
    }

    /**
     * Obtiene el nombre del documento en una fila específica
     * @param {number} rowIndex - Índice de la fila
     * @returns {Promise<string>} El nombre del documento
     */
    async getDocumentName(rowIndex: number): Promise<string> {
        return await this.getTableCellText(rowIndex, 0);
    }

    /**
     * Obtiene el tamaño del documento en una fila específica
     * @param {number} rowIndex - Índice de la fila
     * @returns {Promise<string>} El tamaño del documento
     */
    async getDocumentSize(rowIndex: number): Promise<string> {
        return await this.getTableCellText(rowIndex, 1);
    }

    /**
     * Obtiene el tipo del documento en una fila específica
     * @param {number} rowIndex - Índice de la fila
     * @returns {Promise<string>} El tipo del documento
     */
    async getDocumentType(rowIndex: number): Promise<string> {
        return await this.getTableCellText(rowIndex, 2);
    }

    /**
     * Obtiene la fecha del documento en una fila específica
     * @param {number} rowIndex - Índice de la fila
     * @returns {Promise<string>} La fecha del documento
     */
    async getDocumentDate(rowIndex: number): Promise<string> {
        return await this.getTableCellText(rowIndex, 3);
    }

    // ========== DOCUMENT ACTIONS METHODS ==========
    
    /**
     * Hace clic en el botón de descarga de una fila específica
     * @param {number} rowIndex - Índice de la fila
     */
    async clickDownloadButton(rowIndex: number): Promise<void> {
        const row = this.page.locator(this.tableRows).nth(rowIndex);
        await row.locator(this.downloadButton).click();
    }

    /**
     * Hace clic en el botón de eliminar de una fila específica
     * @param {number} rowIndex - Índice de la fila
     */
    async clickDeleteButton(rowIndex: number): Promise<void> {
        const row = this.page.locator(this.tableRows).nth(rowIndex);
        await row.locator(this.deleteButton).click();
    }

    /**
     * Hace clic en el botón de editar de una fila específica
     * @param {number} rowIndex - Índice de la fila
     */
    async clickEditButton(rowIndex: number): Promise<void> {
        const row = this.page.locator(this.tableRows).nth(rowIndex);
        await row.locator(this.editButton).click();
    }

    /**
     * Verifica si el botón de descarga es visible en una fila específica
     * @param {number} rowIndex - Índice de la fila
     * @returns {Promise<boolean>} true si es visible, false en caso contrario
     */
    async isDownloadButtonVisible(rowIndex: number): Promise<boolean> {
        const row = this.page.locator(this.tableRows).nth(rowIndex);
        return await row.locator(this.downloadButton).isVisible();
    }

    /**
     * Verifica si el botón de eliminar es visible en una fila específica
     * @param {number} rowIndex - Índice de la fila
     * @returns {Promise<boolean>} true si es visible, false en caso contrario
     */
    async isDeleteButtonVisible(rowIndex: number): Promise<boolean> {
        const row = this.page.locator(this.tableRows).nth(rowIndex);
        return await row.locator(this.deleteButton).isVisible();
    }

    /**
     * Verifica si el botón de editar es visible en una fila específica
     * @param {number} rowIndex - Índice de la fila
     * @returns {Promise<boolean>} true si es visible, false en caso contrario
     */
    async isEditButtonVisible(rowIndex: number): Promise<boolean> {
        const row = this.page.locator(this.tableRows).nth(rowIndex);
        return await row.locator(this.editButton).isVisible();
    }

    // ========== PAGINATION METHODS ==========
    
    /**
     * Verifica si el contenedor de paginación es visible
     * @returns {Promise<boolean>} true si es visible, false en caso contrario
     */
    async isPaginationVisible(): Promise<boolean> {
        return await this.page.locator(this.paginationContainer).isVisible();
    }

    /**
     * Obtiene el número de elementos de paginación
     * @returns {Promise<number>} Número de elementos de paginación
     */
    async getPaginationItemsCount(): Promise<number> {
        return await this.page.locator(this.paginationItems).count();
    }

    /**
     * Hace clic en un número de página específico
     * @param {number} pageNumber - Número de página a hacer clic
     */
    async clickPaginationNumber(pageNumber: number): Promise<void> {
        const pageLink = this.page.locator(this.paginationNumbers).filter({ hasText: pageNumber.toString() });
        await pageLink.click();
    }

    /**
     * Hace clic en el botón "Anterior"
     */
    async clickPreviousPage(): Promise<void> {
        await this.page.locator(this.paginationPrevious).click();
    }

    /**
     * Hace clic en el botón "Siguiente"
     */
    async clickNextPage(): Promise<void> {
        await this.page.locator(this.paginationNext).click();
    }

    /**
     * Verifica si el botón "Anterior" está habilitado
     * @returns {Promise<boolean>} true si está habilitado, false en caso contrario
     */
    async isPreviousPageEnabled(): Promise<boolean> {
        const classAttribute = await this.page.locator(this.paginationPrevious).getAttribute('class');
        return !classAttribute?.includes('disabled');
    }

    /**
     * Verifica si el botón "Siguiente" está habilitado
     * @returns {Promise<boolean>} true si está habilitado, false en caso contrario
     */
    async isNextPageEnabled(): Promise<boolean> {
        const classAttribute = await this.page.locator(this.paginationNext).getAttribute('class');
        return !classAttribute?.includes('disabled');
    }

    // ========== MODAL/DIALOG METHODS ==========
    
    /**
     * Verifica si el modal es visible
     * @returns {Promise<boolean>} true si es visible, false en caso contrario
     */
    async isModalVisible(): Promise<boolean> {
        return await this.page.locator(this.modal).isVisible();
    }

    /**
     * Obtiene el texto del encabezado del modal
     * @returns {Promise<string>} El texto del encabezado
     */
    async getModalHeaderText(): Promise<string> {
        return await this.page.locator(this.modalHeader).textContent() || '';
    }

    /**
     * Obtiene el texto del cuerpo del modal
     * @returns {Promise<string>} El texto del cuerpo
     */
    async getModalBodyText(): Promise<string> {
        return await this.page.locator(this.modalBody).textContent() || '';
    }

    /**
     * Hace clic en el botón de cerrar del modal
     */
    async clickModalCloseButton(): Promise<void> {
        await this.page.locator(this.modalCloseButton).click();
    }

    /**
     * Hace clic en el botón de confirmar
     */
    async clickConfirmButton(): Promise<void> {
        await this.page.locator(this.confirmButton).click();
    }

    /**
     * Hace clic en el botón de cancelar
     */
    async clickCancelButton(): Promise<void> {
        await this.page.locator(this.cancelButton).click();
    }

    /**
     * Verifica si el botón de confirmar es visible
     * @returns {Promise<boolean>} true si es visible, false en caso contrario
     */
    async isConfirmButtonVisible(): Promise<boolean> {
        return await this.page.locator(this.confirmButton).isVisible();
    }

    /**
     * Verifica si el botón de cancelar es visible
     * @returns {Promise<boolean>} true si es visible, false en caso contrario
     */
    async isCancelButtonVisible(): Promise<boolean> {
        return await this.page.locator(this.cancelButton).isVisible();
    }

    // ========== UTILITY METHODS ==========
    
    /**
     * Espera a que la página se cargue completamente
     */
    async waitForPageLoad(): Promise<void> {
        await this.page.locator(this.pageHeaderText).waitFor({ state: 'visible' });
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Espera a que la tabla se cargue
     */
    async waitForTableLoad(): Promise<void> {
        await this.page.locator(this.table).waitFor({ state: 'visible' });
    }

    /**
     * Espera a que la zona de arrastre se cargue
     */
    async waitForDropzoneLoad(): Promise<void> {
        await this.page.locator(this.dropzoneArea).waitFor({ state: 'visible' });
    }

    /**
     * Recarga la página y espera a que se cargue
     */
    async refreshPage(): Promise<void> {
        await this.page.reload();
        await this.waitForPageLoad();
    }

    // ========== VALIDATION METHODS ==========
    
    /**
     * Valida que los elementos principales de la página sean visibles
     */
    async validatePageElements(): Promise<void> {
        await expect(this.page.locator(this.pageHeaderText)).toBeVisible();
        await expect(this.page.locator(this.dropzoneArea)).toBeVisible();
        await expect(this.page.locator(this.table)).toBeVisible();
    }

    /**
     * Valida el mensaje de advertencia si es visible
     */
    async validateWarningMessage(): Promise<void> {
        if (await this.isWarningMessageVisible()) {
            await expect(this.page.locator(this.warningIcon)).toBeVisible();
            await expect(this.page.locator(this.warningText)).toBeVisible();
            await expect(this.page.locator(this.upgradeLink)).toBeVisible();
        }
    }

    /**
     * Valida el estado vacío de la tabla
     */
    async validateEmptyState(): Promise<void> {
        await expect(this.page.locator(this.noDataRow)).toBeVisible();
        await expect(this.page.locator(this.noDataText)).toContainText('No data available');
    }

    /**
     * Valida una fila específica de documentos
     * @param {number} rowIndex - Índice de la fila a validar
     */
    async validateDocumentRow(rowIndex: number): Promise<void> {
        const row = this.page.locator(this.tableRows).nth(rowIndex);
        await expect(row).toBeVisible();
    
    // Validate document actions are present
        await expect(row.locator(this.downloadButton)).toBeVisible();
        await expect(row.locator(this.deleteButton)).toBeVisible();
    }

    // ========== SEARCH AND FILTER METHODS ==========
    
    /**
     * Busca un documento por nombre
     * @param {string} documentName - Nombre del documento a buscar
     * @returns {Promise<boolean>} true si se encuentra el documento, false en caso contrario
     */
    async searchDocument(documentName: string): Promise<boolean> {
        const rows = await this.page.locator(this.tableRows).count();
        for (let i = 0; i < rows; i++) {
            const name = await this.getDocumentName(i);
            if (name.includes(documentName)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Obtiene documentos por tipo
     * @param {string} type - Tipo de documento a buscar
     * @returns {Promise<number[]>} Array con los índices de las filas que coinciden
     */
    async getDocumentsByType(type: string): Promise<number[]> {
        const rows = await this.page.locator(this.tableRows).count();
        const matchingRows: number[] = [];
        
        for (let i = 0; i < rows; i++) {
            const documentType = await this.getDocumentType(i);
            if (documentType.toLowerCase().includes(type.toLowerCase())) {
                matchingRows.push(i);
            }
        }
        
        return matchingRows;
    }

    // ========== UPLOAD VALIDATION METHODS ==========
    
    /**
     * Valida que un archivo se haya subido correctamente
     * @param {string} fileName - Nombre del archivo subido
     * @returns {Promise<boolean>} true si el archivo se subió correctamente, false en caso contrario
     */
    async validateFileUpload(fileName: string): Promise<boolean> {
        // Wait for potential page refresh or update after upload
        await this.page.waitForTimeout(2000);
        await this.waitForTableLoad();
        
        return await this.searchDocument(fileName);
    }

    /**
     * Obtiene el mensaje de error de subida si existe
     * @returns {Promise<string>} El mensaje de error o cadena vacía si no hay error
     */
    async getUploadErrorMessage(): Promise<string> {
        const errorSelector = '.alert-danger, .error-message';
        const errorElement = this.page.locator(errorSelector);
        
        if (await errorElement.isVisible()) {
            return await errorElement.textContent() || '';
        }
        
        return '';
    }
}