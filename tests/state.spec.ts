import {test, expect} from '@playwright/test';
import {checkNombreTache, creerTache, init} from "./utils";

test('completer une tache', async ({page}) => {
    await init(page);

    // Ajouter une tache pour le test
    await creerTache(page, "test");

    // Compléter la tache
    await page.locator('input[name="done"]').check()

    await checkNombreTache(page, 0);
});

test('repasser une tache en actif', async ({page}) => {
    await init(page);

    // Ajouter une tache pour le test
    await creerTache(page, "test");

    // Compléter la tache
    const check = page.locator('input[name="done"]')
    await check.check()

    // Repasser la tache en actif
    await check.uncheck();

    await checkNombreTache(page, 1);

});