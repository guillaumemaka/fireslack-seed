angular.module('angularfireSlackApp')
.controller('ChannelsController', ChannelsController);

ChannelsController.$inject = ['$state', 'Auth', 'Users', 'profile', 'channels'];

function ChannelsController ($state, Auth, Users, profile, channels) {
    var channelsCtrl = this;

    Users.setOnline(profile.$id);

    channelsCtrl.profile = profile;
    channelsCtrl.channels = channels;
    channelsCtrl.getDisplayName = Users.getDisplayName;
    channelsCtrl.getGravatar = Users.getGravatar;
    channelsCtrl.logout = logout;
    channelsCtrl.users = Users.all;

    channelsCtrl.newChannel = {
        name: ''
    };

    channelsCtrl.createChannel = createChannel;

    function createChannel () {
        channelsCtrl.channels.$add(channelsCtrl.newChannel).then(function(ref){
            channelsCtrl.newChannel = {
              name: ''
            };
            $state.go('channels.messages', {channelId: ref.key()});
        });
    }

    function logout() {
        channelsCtrl.profile.online = null;
        channelsCtrl.profile.$save().then(function(){
            Auth.$unauth();
            $state.go('home');
        });
    }
}
