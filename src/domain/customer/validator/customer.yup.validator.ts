import ValidatorInterface from "../../@shared/validator/validator.interface";
import Customer from "../entity/customer";
import * as yup from "yup";

export default class CustomerYupValidator
  implements ValidatorInterface<Customer>
{
  validate(entity: Customer): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().uuid().required("Id is required"),
          name: yup.string().required("Name is required"),
          email: yup
            .string()
            .email("Email is invalid")
            .required("Email is required"),
          address: yup.object().nullable(),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
            email: entity.email,
          },
          { abortEarly: false }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((error) => {
        entity.notification.addError({
          context: "customer",
          message: error,
        });
      });
    }
  }
}
