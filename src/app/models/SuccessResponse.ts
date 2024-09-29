export class SuccessReponse{
    private id!: string;
    private message!: string;

    public get getId():string{
        return this.id;
    }

    public set setId(id:string){
        this.id = id;
    }

    public get getMessage():string{
        return this.message;
    }

    public set setMessage(message:string){
        this.message = message;
    }
}