class User{
    constructor(handle, name, email, rating, joinDate, lastLogin, country, institution) {
        this.name = name;
        this.handle = handle;
        this.email = email;
        this.rating = rating;
        this.joinDate = joinDate;
        this.lastLogin = lastLogin;
        this.country = country;
        this.institution = institution;
    }
    getAsJson(){
        return {
            handle: this.handle,
            name: this.name,
            email: this.email,
            rating: this.rating,
            joinDate: this.joinDate,
            lastLogin: this.lastLogin,
            country: this.country,
            institution: this.institution
        }
    }
}
export default User;