export class Constants {
    public static URL_API: string = 'https://pokeapi.co/api/v2/pokemon/';
    public static URL_DATABASE: string = 'https://pokemon-app-4b3e8-default-rtdb.europe-west1.firebasedatabase.app/';
    public static SIGNUP_URL: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDdZUp4XOVlRMv6NzWbpqMMpMfvgHXELWw';
    public static SIGNIN_URL: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDdZUp4XOVlRMv6NzWbpqMMpMfvgHXELWw';
    public static DATABASE_URL: string = 'https://pokemon-app-4b3e8-default-rtdb.europe-west1.firebasedatabase.app/';
    public static UNKNOWN_ERR: string = 'An unknown error has occured!';
    public static POKEMON_NOT_FOUND: string = 'This pokemon was not found in the database!';
    public static NOT_FOUND: string = 'Not Found!';
    public static INCORRECT_PWD: string = 'Incorrect password, please try again.';
    public static EMAIL_NOT_FOUND: string = 'No registered user found with this email.';
    public static TOO_MANY_LOGIN_ATTEMPTS: string = 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.';
    public static LOGIN_SUCCESS: string = 'You have logged in successfully!';
}