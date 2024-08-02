export default class UserEntity {
    public id: string;
    public username: string;
    public email: string;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(id: string, username: string, email: string, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    /**
     * Handles the mapping of data from JSON to UserEntity object
     * @param json 
     */
    static fromJSON(json: any): UserEntity {
        return new UserEntity(
            json.id,
            json.username,
            json.email,
            json.created_at,
            json.updated_at
        );
    }
}
