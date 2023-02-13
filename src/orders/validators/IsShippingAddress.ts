import {
    ValidationOptions,
    ValidationArguments,
    registerDecorator,
    buildMessage,
} from "class-validator";

export default function IsShippingAddress(
    prop?: string,
    validationOptions?: ValidationOptions
) {
    return function (object: Object, propName: string) {
        registerDecorator({
            name: "isShippingAddress",
            target: object.constructor,
            propertyName: propName,
            constraints: [prop],
            options: validationOptions,
            validator: {
                validate(value: Object, arg: ValidationArguments) {
                    return (
                        value.hasOwnProperty("street") &&
                        typeof value["street"] === "string" &&
                        value.hasOwnProperty("city") &&
                        typeof value["city"] === "string" &&
                        value.hasOwnProperty("postalCode") &&
                        typeof value["postalCode"] === "string" &&
                        value.hasOwnProperty("country") &&
                        typeof value["country"] === "string"
                    );
                },
                defaultMessage: buildMessage(
                    (eachPrefix) =>
                        `$property must be an object with properties: street, postalCode, city, country`,
                    validationOptions
                ),
            },
        });
    };
}
