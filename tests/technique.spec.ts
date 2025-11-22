import {test} from "@playwright/test";
import {checkNombreTache, creerTache, init} from "./utils";

test('Tester la persistence des données à la réactualisation', async ({page}) => {
    await init(page);

    await creerTache(page, "Text");
    await creerTache(page, "Text2");

    // Rechargement de la page
    await page.reload();

    await checkNombreTache(page, 2);
});