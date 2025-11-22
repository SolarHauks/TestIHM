import {expect, Page, test} from "@playwright/test";
import {creerTache, init, modifierTache} from "./utils";

export async function getParsedJson(page: Page): Promise<any> {
    const text = await page.getByText('{ "uid": 0, "title": "Liste').innerText();
    const jsonStart = text.indexOf('{');
    return JSON.parse(jsonStart >= 0 ? text.slice(jsonStart) : text);
}

test("cohérence lors de l'ajout", async ({page}) => {
    await init(page);

    // Ajouter une tache pour le test
    await creerTache(page, "Text");

    // Vérifier le JSON
    expect(await getParsedJson(page)).toEqual({
        uid: 0,
        title: "Liste Miage",
        items: [
            {
                label: "Text",
                done: false,
                uid: 1
            }
        ]
    });
});

test("cohérence lors de la modification", async ({page}) => {
    await init(page);

    // Ajouter une tache pour le test
    await creerTache(page, "Text");

    // Modifier la tache
    await modifierTache(page, "Text", "New Text");

    // Vérifier le JSON
    expect(await getParsedJson(page)).toEqual({
        uid: 0,
        title: "Liste Miage",
        items: [
            {
                label: "New Text",
                done: false,
                uid: 1
            }
        ]
    });
});

test("cohérence lors de la suppression", async ({page}) => {
    await init(page);

    // Ajouter une tache pour le test
    await creerTache(page, "Text");

    // Supprimer la tache
    await page.getByRole('button', { name: 'X' }).first().click();

    // Vérifier le JSON
    expect(await getParsedJson(page)).toEqual({
        uid: 0,
        title: "Liste Miage",
        items: []
    });
});