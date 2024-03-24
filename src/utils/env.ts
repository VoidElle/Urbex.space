export default class Env {

    static configureEnvironment = function(): void {
        require('dotenv').config();
    };

}