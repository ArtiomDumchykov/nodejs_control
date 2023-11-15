import Filter from "bad-words";

class BadWordsService {
  public filter;

  constructor() {
    this.filter = new Filter();
  }

  public isObsceneWords<T>(body: T): boolean {
    const bodyValue = Object.values(body).join();

    return this.filter.isProfane(bodyValue);
  }
}

export const badWordsService = new BadWordsService();
