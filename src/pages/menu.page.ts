import { expect, Locator, type Page } from "@playwright/test"

import { CoffeeCup } from "../components/coffee";
export class MenuPage {
    private readonly coffeCups: Locator;

    constructor(private readonly page: Page) {
        console.log("In MenuPage ctor");
        this.coffeCups = page.getByRole('listitem')
            .filter({ has: page.getByRole('heading', { level: 4 }) });
    }

    async getCoffeeCups() {
        return this.coffeCups
            .all()
            .then(cupLocators => cupLocators.map(loc => new CoffeeCup(loc)))
    }

    // It's a good idea to have a method like this you can await when loading the page
    async visit() {
        await this.page.goto('/');
        expect(this.coffeCups).toHaveCount(9);
    }
}

