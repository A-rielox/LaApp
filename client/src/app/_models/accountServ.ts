export interface RegisterModel {
   username: string;
   knownAs: string;
   city: string;
   country: string;
   password: string;
   confirmPassword: string;
}

export interface LoginModel {
   username: string;
   password: string;
}
