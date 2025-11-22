import {expect, test} from "@playwright/test";
import {checkNombreTache, creerTache, init} from "./utils";

test('Annuler une modification', async ({page}) => {
    await init(page);

    // Ajouter deux taches pour le test
    await creerTache(page, "Text");
    await creerTache(page, "Text2");

    // Annuler la modification
    await page.getByRole('button', { name: 'Annuler' }).click();

    await checkNombreTache(page, 1);
});

test('Refaire une modification', async ({page}) => {
    await init(page);

    // Ajouter deux taches pour le test
    await creerTache(page, "Text");
    await creerTache(page, "Text2");

    // Annuler la modification
    await page.getByRole('button', { name: 'Annuler' }).click();

    // Refaire la modification
    await page.getByRole('button', { name: 'Refaire' }).click();

    await checkNombreTache(page, 2);
});