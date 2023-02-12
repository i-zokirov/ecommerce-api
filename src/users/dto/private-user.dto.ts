import { Expose } from "class-transformer";
export default class UserPrivateDto {
    @Expose()
    id: number;
    @Expose()
    email: string;
    @Expose()
    firstname: string;
    @Expose()
    lastname: string;
    @Expose()
    role: string;
    @Expose()
    createdAt: Date;
    @Expose()
    updatedAt: Date;
}
