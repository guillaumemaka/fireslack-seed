angular.module('angularfireSlackApp')
.controller('ProfileController', ProfileController);

ProfileController.$inject = ['$state', 'md5', 'auth', 'profile'];

function ProfileController ($state, md5, auth, profile) {
    var profileCtrl = this;

    profileCtrl.profile = profile;
    profileCtrl.updateProfile = updateProfile;

    function updateProfile() {
        profileCtrl.profile.emailHash = md5.createHash(auth.password.email);
        profileCtrl.profile.$save().then(function(){
            $state.go('channels');
        });
    }
}
