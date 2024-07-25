export class AuthRequest {
    private userEmail!: string;
    private userPassword!: string;

    constructor(userEmail: string, userPassword: string) {
        this.userEmail = userEmail;
        this.userPassword = userPassword;
    }

    public get getUserEmail(): string {
        return this.userEmail;
    }

    public set setUserEmail(value: string) {
        this.userEmail = value;
    }

    public get getUserPassword(): string {
        return this.userPassword;
    }

    public set setUserPassword(value: string) {
        this.userPassword = value;
    }
}
