import { UserDTO } from "./UserDTO";

export class AuthResponse {
    private message?: string;
    private userDTO?: UserDTO;
    private jwtToken?: string;

    constructor(message?: string, userDTO?: UserDTO, jwtToken?: string) {
        this.message = message;
        this.userDTO = userDTO;
        this.jwtToken = jwtToken;
    }

    public get getMessage(): string | undefined {
        return this.message;
    }

    public set setMessage(value: string | undefined) {
        this.message = value;
    }

    public get getUserDTO(): UserDTO | undefined {
        return this.userDTO;
    }

    public set setUserDTO(value: UserDTO | undefined) {
        this.userDTO = value;
    }

    public get getJwtToken(): string | undefined {
        return this.jwtToken;
    }

    public set setJwtToken(value: string | undefined) {
        this.jwtToken = value;
    }
}