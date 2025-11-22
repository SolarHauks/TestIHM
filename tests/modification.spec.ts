import {expect, test} from "@playwright/test";
import {checkNombreTache, creerTache, init} from "./utils";

test('Modifier une tache', async ({page}) => {
    await init(page);

    // Ajouter une tache pour le test
    await creerTache(page, "Text");

    // Modifier la tache
    await page.getByText('Text', { exact: true }).dblclick();
    const editInput = page.locator('input.edit');
    await editInput.fill('Nouveau texte');
    await editInput.press('Enter');

    await expect(page.getByText('Nouveau texte', { exact: true })).toBeVisible();
});