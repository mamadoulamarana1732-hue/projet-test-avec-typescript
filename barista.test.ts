import { describe, expect, it } from "vitest";
import { Barista, Coffee, Ingredient } from "./barista.js";


describe("Coffee", () => {

  it("crée un café avec un nom et un prix", () => {

    const coffee = new Coffee("Cappuccino", 4);
    expect(coffee.name).toBe("Cappuccino");
    expect(coffee.price).toBe(4);
  });
 

  it("ajoute un ingrédient à la recette", () => {
    const ingredient = new Ingredient ("Sucre", 8);
    expect(ingredient.name).toBe("Sucre");
    expect(ingredient.quantity).toEqual(8);

  });
});

describe("Ingredient", () => {
  it("ajoute une quantité au stock", () => {
    const stock = new Ingredient("Sucre", 8);
    stock.addQuantity(1)
    expect(stock.name).toBe("Sucre");
    expect(stock.quantity).toEqual(9);
  });

  it("retire une quantité du stock", () => {
     const stock = new Ingredient("Sucre", 8);
     stock.removeQuantity(4);
    expect(stock.name).toBe("Sucre");
    expect(stock.quantity).toEqual(4);
  });

  it("refuse de retirer une quantité supérieure au stock", () => {
    const stock = new Ingredient("Sucre", 10);
     expect(() => stock.removeQuantity(12)).toThrow();
     expect(stock.quantity).toBe(10);
  });
});

describe("Barista", () => {
  it("ajoute un café à sa liste de cafés", () => {
    const barista = new Barista("Gabi");
    const coffee = new Coffee("Cappuccino", 5);
    barista.addCoffee(coffee);
    expect(barista.coffees).toEqual([{ name: "Cappuccino", price: 5, ingredients: [] }]);
  });

  it("retourne undefined lorsqu'un café n'existe pas", () => {
    const barista = new Barista("Gabi");

    expect(barista.getCoffee("Cappuccino")).toBeUndefined();
  });

  it("peut préparer un café lorsque tous les ingrédients sont disponibles", () => {
    const barista = new Barista("Gabi");
    const coffee = new Coffee("Cappuccino", 5);

    coffee.addIngredient("café", 2);
    coffee.addIngredient("lait", 1);

    barista.addIngredient("café", 2);
    barista.addIngredient("lait", 1);

    expect(barista.canMakeCoffee(coffee)).toBe(true);
  });

  it("ne peut pas préparer un café lorsqu'un ingrédient est manquant", () => {
    const barista = new Barista("Gabi");
    const coffee = new Coffee("Cappuccino", 5);

    coffee.addIngredient("café", 2);
    coffee.addIngredient("lait", 1);
    barista.addIngredient("café", 2);

    expect(barista.canMakeCoffee(coffee)).toBe(false);
  });

  it("ne peut pas préparer un café lorsque la quantité est insuffisante", () => {
  const barista = new Barista("Gabi");
  const coffee = new Coffee("cafe au lait", 7);
  barista.addIngredient("lait", 2);
  coffee.addIngredient("lait", 3);

  expect(barista.canMakeCoffee(coffee)).toBe(false);
});
});

  it("consomme les ingrédients lorsqu'il prépare un café", () => {
    const barista = new Barista("Gabi");
    const coffee = new Coffee("cafe au lait", 7);
    barista.addIngredient("lait", 2);
    coffee.addIngredient("lait", 3);
  });

  it("ne consomme rien lorsqu'il ne peut pas préparer le café", () => {});

  it("retourne le prix lorsqu'un café est commandé", () => {});
