angular.module('angularfireSlackApp')
.factory('Users', Users);

Users.$inject = ['$firebaseArray', '$firebaseObject', 'FirebaseUrl'];

function Users($firebaseArray, $firebaseObject, FirebaseUrl){
    var usersRef = new Firebase(FirebaseUrl + 'users');
    var users = $firebaseArray(usersRef);

    var Users = {
        getProfile: getProfile,
        getDisplayName: getDisplayName,
        all: users,
        getGravatar: getGravatar
    };
    return Users;

    function getProfile (uid) {
        return $firebaseObject(usersRef.child(uid));
    }

    function getDisplayName (uid) {
        return users.$getRecord(uid).displayName;
    }

    function getGravatar (uid) {
        return '//www.gravatar.com/avatar/' + users.$getRecord(uid).emailHash;
    }
}
