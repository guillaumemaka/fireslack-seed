angular.module('angularfireSlackApp')
.factory('Users', Users);

Users.$inject = ['$firebaseArray', '$firebaseObject', 'FirebaseUrl'];

function Users($firebaseArray, $firebaseObject, FirebaseUrl){
    var usersRef = new Firebase(FirebaseUrl + 'users');
    var users = $firebaseArray(usersRef);
    var connectedRef = new Firebase(FirebaseUrl+'.info/connected');

    var Users = {
        getProfile: getProfile,
        getDisplayName: getDisplayName,
        all: users,
        getGravatar: getGravatar,
        setOnline: setOnline
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

    function setOnline (uid) {
        var connected = $firebaseObject(connectedRef);
        var online = $firebaseArray(usersRef.child(uid+'/online'));

        connected.$watch(function (){
            if(connected.$value === true){
                online.$add(true).then(function(connectedRef){
                    connectedRef.onDisconnect().remove();
                });
            }
        });
    }
}
