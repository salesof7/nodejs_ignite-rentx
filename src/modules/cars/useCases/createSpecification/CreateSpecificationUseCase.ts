import { SpecificationRepository } from "../../repositories/implementations/SpecificationRepository";

class CreateSpecificationUseCase {
  constructor(private specificationRepository: SpecificationRepository) {}
  7;

  execute({ name, description }): void {
    const specificationAlreadyExists =
      this.specificationRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error("Specification already exists!");
    }

    this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
