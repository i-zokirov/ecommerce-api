import { Expose } from "class-transformer";
export default class UserPublicDto {
    @Expose()
    id: number;
    @Expose()
    email: string;
    @Expose()
    firstname: string;
    @Expose()
    lastname: string;
}
