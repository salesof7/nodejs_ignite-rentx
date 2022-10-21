import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../shared/infra/typeorm";
import { ICreateRentalDTO } from "../../../dtos/ICreateRentalDTO";
import { IRentalsRepository } from "../../../repositories/IRentalsRepository";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = AppDataSource.getRepository(Rental);
  }

  async create({
    user_id,
    car_id,
    expected_return_date,
    id,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      user_id,
      car_id,
      expected_return_date,
      id,
      end_date,
      total,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const OpenByCar = this.repository.findOneBy({
      car_id,
      end_date: null,
    });
    return OpenByCar;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const OpenByUser = this.repository.findOneBy({
      user_id,
      end_date: null,
    });
    return OpenByUser;
  }

  async findById(id: string): Promise<Rental> {
    return this.repository.findOneBy({ id });
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    return this.repository.find({
      where: { user_id },
      relations: ["car"],
    });
  }
}

export { RentalsRepository };
