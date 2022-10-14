import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "any_name",
      description: "any_description",
      daily_rate: 100,
      license_plate: "AAA-1111",
      fine_amount: 50,
      brand: "any_brand",
      category_id: "any_category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "any_name",
      description: "any_description",
      daily_rate: 100,
      license_plate: "AAA-1111",
      fine_amount: 50,
      brand: "specific_brand",
      category_id: "any_category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "specific_brand",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "specific_name",
      description: "any_description",
      daily_rate: 100,
      license_plate: "AAA-1111",
      fine_amount: 50,
      brand: "any_brand",
      category_id: "any_category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "specific_name",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category_id", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "any_name",
      description: "any_description",
      daily_rate: 100,
      license_plate: "AAA-1111",
      fine_amount: 50,
      brand: "any_brand",
      category_id: "specific_category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "specific_category_id",
    });

    expect(cars).toEqual([car]);
  });
});
