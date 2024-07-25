export class ErrorInfo {
    private errorMessage?: string;
    private errorCode?: number;
    private timestamp?: Date;

    constructor(errorMessage?: string, errorCode?: number, timestamp?: Date) {
        this.errorMessage = errorMessage;
        this.errorCode = errorCode;
        this.timestamp = timestamp;
    }

    public get getErrorMessage(): string | undefined {
        return this.errorMessage;
    }

    public set setErrorMessage(value: string | undefined) {
        this.errorMessage = value;
    }

    public get getErrorCode(): number | undefined {
        return this.errorCode;
    }

    public set setErrorCode(value: number | undefined) {
        this.errorCode = value;
    }

    public get getTimestamp(): Date | undefined {
        return this.timestamp;
    }

    public set setTimestamp(value: Date | undefined) {
        this.timestamp = value;
    }
}
