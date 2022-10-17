import { AppError } from "../../../../shared/errors/AppError";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import dayjs from "dayjs";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it("should to be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "any_user_id",
      car_id: "any_car_id",
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "same_user_id",
        car_id: "valid_car_id1",
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: "same_user_id",
        car_id: "valid_car_id2",
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there is another open to the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "valid_user_id1",
        car_id: "same_car_id",
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: "valid_user_id2",
        car_id: "same_car_id",
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "any_user_id",
        car_id: "any_car_id",
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
