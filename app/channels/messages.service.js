angular.module('angularfireSlackApp')
.factory('Messages', Messages);

Messages.$inject = ['$firebaseArray', 'FirebaseUrl'];

function Messages($firebaseArray, FirebaseUrl) {
    var channelMessagesRef = new Firebase(FirebaseUrl + 'channelMessages');
    var userMessagesRef = new Firebase(FirebaseUrl + 'userMessages');
    return {
        forChannel: forChannel,
        forUsers: forUsers
    }

    function forChannel(channelId) {
        return $firebaseArray(channelMessagesRef.child(channelId));
    }

    function forUsers (uid1, uid2) {
        var path = uid1 < uid2 ? uid1 + '/' + uid2 : uid2 + '/' + uid1;
        return $firebaseArray(userMessagesRef.child(path));
    }
}
