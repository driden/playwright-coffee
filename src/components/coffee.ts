import { Locator } from "@playwright/test";

export class CoffeeCup {
    constructor(private readonly locator: Locator) { }

    async getName() {
        // TODO: figure out a better way to handle loadinf the timeout from config
        // It could be stored in another file and load the playwright config reading
        // those values
        const inner = await this.locator.innerText({ timeout: 10_000 });
        // This is also probably not a good idea
        return inner.split("\n")[0];
    }
}
