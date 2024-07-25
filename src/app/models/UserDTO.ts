import { Roles } from "./Roles";

export class UserDTO {
    constructor(
        private userId: string,
        private userFirstName: string,
        private userLastName: string,
        private phoneNumber: number,
        private userEmail: string,
        private userPassword: string,
        private roles: Set<Roles>,
        private creationTime: string,
        private lastUpdateTime: string
      ) {
        this.userId = userId;
        this.userFirstName = userFirstName;
        this.userLastName = userLastName;
        this.phoneNumber = phoneNumber;
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.roles = roles;
        this.creationTime = creationTime;
        this.lastUpdateTime = lastUpdateTime;
      }
    
    public get getUserId(): string {
        return this.userId;
    }

    public set setUserId(value: string) {
        this.userId = value;
    }

    public get getUserFirstName(): string {
        return this.userFirstName;
    }

    public set setUserFirstName(value: string) {
        this.userFirstName = value;
    }

    public get getUserLastName(): string {
        return this.userLastName;
    }

    public set setUserLastName(value: string){
        this.userLastName = value;
    }

    public get getPhoneNumber(): number {
        return this.phoneNumber;
    }

    public set setPhoneNumber(value: number) {
        this.phoneNumber = value;
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

    public get getRoles(): Set<Roles> {
        return this.roles;
    }

    public set setRoles(value: Set<Roles>) {
        this.roles = value;
    }

    public get getCreationTime(): string {
        return this.creationTime;
    }

    public set setCreationTime(value: string) {
        this.creationTime = value;
    }

    public get getLastUpdateTime(): string {
        return this.lastUpdateTime;
    }

    public set setLastUpdateTime(value: string) {
        this.lastUpdateTime = value;
    }
}
