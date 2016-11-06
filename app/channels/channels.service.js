angular.module('angularfireSlackApp')
.factory('Channels', Channels);

Channels.$inject = ['$firebaseArray', 'FirebaseUrl'];

function Channels ($firebaseArray, FirebaseUrl) {
    var ref = new Firebase(FirebaseUrl + 'channels');
    var channels = $firebaseArray(ref);
    return channels;
}
