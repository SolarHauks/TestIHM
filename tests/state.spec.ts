import {test, expect} from '@playwright/test';

test('completer une tache', async ({page}) => {
    await page.goto('');

    // Ajouter une tache pour le test
    const todoInput = page.getByRole('textbox', { name: 'Que faire?' });
    await todoInput.fill('Test');
    await todoInput.press('Enter');

    // Compléter la tache
    await page.locator('input[name="done"]').check()

    await expect(page.getByText(/0\s+restantes?/i)).toBeVisible();
});

test('repasser une tache en actif', async ({page}) => {
    await page.goto('');

    // Ajouter une tache pour le test
    const todoInput = page.getByRole('textbox', { name: 'Que faire?' });
    await todoInput.fill('Test');
    await todoInput.press('Enter');

    // Compléter la tache
    const check = page.locator('input[name="done"]')
    await check.check()

    // Repasser la tache en actif
    await check.uncheck();

    await expect(page.getByText(/1\s+restantes?/i)).toBeVisible();
});