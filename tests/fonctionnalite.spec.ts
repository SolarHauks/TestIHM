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

test('Annuler une modification avec Ctrl+Z', async ({page}) => {
    await init(page);

    await creerTache(page, "Text");
    await creerTache(page, "Text2");

    // Annuler la modification avec Ctrl+Z
    await page.getByRole('textbox', { name: 'Que faire?' }).press('ControlOrMeta+z');

    await checkNombreTache(page, 1);
});

test('Refaire une modification avec Ctrl+Y', async ({page}) => {
    await init(page);

    await creerTache(page, "Text");
    await creerTache(page, "Text2");

    // Annuler la modification avec Ctrl+Z
    const raccourcieLocator = page.getByRole('textbox', { name: 'Que faire?' });
    await raccourcieLocator.press('ControlOrMeta+z');

    // Refaire la modification avec Ctrl+Y
    await raccourcieLocator.press('ControlOrMeta+y');

    await checkNombreTache(page, 2);
});
