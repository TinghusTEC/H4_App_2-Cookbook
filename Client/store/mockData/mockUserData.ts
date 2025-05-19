import { IAuthUser } from "../../interfaces/IAuthUser";
import { mockDataUtils } from "../../utils/mockDataUtils";

export const mockUsers: IAuthUser[] = [
    {
        id: "1",
        email: "test@example.com",
        name: "Test User",
    },
    {
        id: "2",
        email: "superuser@example.com",
        name: "Super User",
    },
]