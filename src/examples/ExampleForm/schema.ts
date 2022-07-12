import { setupYup } from "@/config/yup";
import { parseMaskedNumber } from "@/utils/parse";
import { isValidPhoneNumber } from "react-phone-number-input";
import { isValid as isValidCreditCard } from "creditcard.js";
import numeral from "numeral";

const Yup = setupYup();

const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png",
  "image/webp",
];

const schema = Yup.object({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  birthdate: Yup.date().required(),
  documents: Yup.array()
    .of(
      Yup.mixed()
        .required("A file is required")
        .test(
          "fileSize",
          "File too large",
          (value) => value && value.size <= (numeral("5 MB")?.value() ?? false)
        )
        .test(
          "fileFormat",
          "Unsupported Format (you can change this rule in Yup schema)",
          (value) => value && SUPPORTED_FORMATS.includes(value.type)
        )
    )
    .min(1)
    .required(),
  profile_id: Yup.number().nullable().required(),
  user: Yup.object().nullable().required(),
  dollar: Yup.number()
    .transform((value) => (isNaN(value) ? undefined : parseMaskedNumber(value)))
    .min(0.01)
    .required(),
  creditCard: Yup.mixed().test(
    "creditCard",
    "Credit card is invalid",
    (value) => value && isValidCreditCard(value)
  ),
  phone: Yup.string()
    .required()
    .test("phone", "Phone is invalid", function (value) {
      if (!value) return false;
      return isValidPhoneNumber(value);
    }),
  description: Yup.string().required(),
});

export default schema;
