import joi from "joi";

import { regexConstant } from "../constans";
import { EUserStatus } from "../enums";

export class UserValidator {
  static status = joi.valid(...Object.values(EUserStatus));
  static password = joi.string().trim().regex(regexConstant.PASSWORD);
  static email = joi.string().trim().lowercase().regex(regexConstant.EMAIL);
  static firstName = joi.string().min(2).max(25).trim().lowercase();
  static phone = joi.string().trim().regex(regexConstant.PHONE);
  static premium = joi.boolean();

  static register = joi.object({
    name: this.firstName.required(),
    email: this.email.required(),
    password: this.password.required(),
    phone: this.phone.required(),
  });

  static login = joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });

  static create = joi.object({
    name: this.firstName.required(),
    email: this.email.required(),
    password: this.password.required(),
    phone: this.phone.required(),
    premium: this.premium,
  });

  static update = joi.object({
    name: this.firstName.required(),
    email: this.email.required(),
    phone: this.phone.required(),
    premium: this.premium.required(),
  });

  static updateStatus = joi.object({
    status: this.status.required(),
  });
}
