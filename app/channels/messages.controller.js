angular.module('angularfireSlackApp')
.controller('MessagesController', MessagesController);

MessagesController.$inject = ['profile', 'channelName', 'messages'];

function MessagesController (profile, channelName, messages) {
    var messagesCtrl = this;
    messagesCtrl.messages = messages;
    messagesCtrl.channelName = channelName;
    messagesCtrl.message = '';
    messagesCtrl.sendMessage = sendMessage;

    function sendMessage () {
        if (messagesCtrl.message.length > 0){
            messagesCtrl.messages.$add({
                uid: profile.$id,
                body: messagesCtrl.message,
                timestamp: Firebase.ServerValue.TIMESTAMP
            }).then(function(){
                messagesCtrl.message = '';
            });
        }
    }
}
