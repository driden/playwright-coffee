import { Locator } from "@playwright/test";

export class CoffeeCup {
    constructor(private readonly locator: Locator) { }

    static of(locator: Locator): CoffeeCup {
        return new CoffeeCup(locator);
    }

    async getName() {
        // TODO: figure out a better way to handle loadinf the timeout from config
        // It could be stored in another file and load the playwright config reading
        // those values
        const inner = await this.locator.innerText({ timeout: 10_000 });
        // This is also probably not a good idea
        return inner.split("\n")[0];
    }

    async getIngredients(): Promise<string[]> {
        const locators = await this.locator.locator("div.ingredient").all();
        return Promise.all(locators.map(elem => elem.innerText()))
    }

    async getPrice() {
        const small = this.locator.locator("small");
        const text = await small.innerText();

        return parseFloat(text.slice(1));
    }
}
