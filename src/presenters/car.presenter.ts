import { configs } from "../configs";
import { ECurrency } from "../enums";
import { ICar } from "../interfaces";
import { privateBankService } from "../services";

class CarPresenter {
  public async present(data: ICar): Promise<Partial<ICar>> {
    const exchangeRates = await privateBankService.getExchangeRates();

    const currencyRates = exchangeRates.find(
      ({ ccy }) => ccy === data.currency,
    );

    const buy = currencyRates?.buy ? +currencyRates.buy : 1;

    return {
      currency: ECurrency.UAH,
      price: data.price * buy,
      manufacture: data.manufacture,
      year: data.year,
      _id: data._id,
      _userId: data._userId,
      model: data.model,
      photo: data.photo ? configs.AWS_S3_BUKET_URL + data.photo : null,
      city: data.city,
    };
  }

  public presents(data: ICar[]): Partial<ICar[]> {
    const cars = data.map((item) => ({
      currency: item.currency,
      _id: item._id,
      _userId: item._userId,
      model: item.model,
      city: item.city,
      price: item.price,
      year: item.year,
      manufacture: item.manufacture,
      photo: item.photo ? configs.AWS_S3_BUKET_URL + item.photo : null,
    }));

    return cars as Partial<ICar[]>;
  }
}

export const carPresenter = new CarPresenter();
