import { v4 as uuidv4 } from "uuid";

class Category {
  id?: string;
  name: string;
  description: string;
  createdAt: Date;

  constructor() {
    if (this.id == null) {
      this.id = uuidv4();
    }
  }
}

export { Category };
