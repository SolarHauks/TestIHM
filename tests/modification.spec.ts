import {expect, Page, test} from "@playwright/test";
import {checkNombreTache, creerTache, init, modifierTache} from "./utils";

test('Modifier une tache', async ({page}) => {
    await init(page);

    // Ajouter une tache pour le test
    await creerTache(page, "Text");

    // Modifier la tache
    await modifierTache(page, "Text", "New Text");

    await expect(page.getByText('New Text', { exact: true })).toBeVisible();
});