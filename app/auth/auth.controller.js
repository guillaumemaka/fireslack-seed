angular.module('angularfireSlackApp')
.controller('AuthController', AuthController);


AuthController.$inject = ['Auth', '$state'];

function AuthController(Auth, $state){
    var authCtrl = this;

    authCtrl.user = {
        email: '',
        password: ''
    };

    authCtrl.login = login;
    authCtrl.register = register;

    function login(){
        Auth.$authWithPassword(authCtrl.user).then(loginSuccess, loginFailed);
    }

    function loginSuccess(auth){
        $state.go('home');
    }

    function loginFailed(error) {
        authCtrl.error = error;
    }

    function register() {
        Auth.$createUser(authCtrl.user).then(registerSuccess, registerFailed);
    }

    function registerSuccess (user) {
        authCtrl.login();
    }

    function registerFailed (error) {
        authCtrl.error = error;
    }
}
