import {test} from "@playwright/test";
import {checkNombreTache, creerTache, init} from "./utils";

test('supprimer une tache', async ({page}) => {
    await init(page);

    // Ajouter une tache pour le test
    await creerTache(page, "Test");
    await creerTache(page, "Test2");

    // Supprimer la tache
    await page.getByText('Test', { exact: true }).hover();
    await page.getByRole('button', { name: '×' }).click();

    await checkNombreTache(page, 1);
});

test('supprimer les taches cochées', async ({page}) => {
    await init(page);

    // Ajouter une tache pour le test
    await creerTache(page, "Test");

    // Compléter la tache
    await page.locator('input[name="done"]').check()

    // Ajouter une autre tache
    await creerTache(page, "Test2");

    // Supprimer les taches cochées
    await page.getByText('Supprimer cochées').click();

    await checkNombreTache(page, 1);
});

test('supprimer une tache dans la partie 2', async ({page}) => {
    await init(page);

    // Ajouter deux taches pour le test
    await creerTache(page, "Test");
    await creerTache(page, "Test2");

    // Supprimer une des taches
    await page.getByRole('button', { name: 'X' }).first().click();

    await checkNombreTache(page, 1);
});