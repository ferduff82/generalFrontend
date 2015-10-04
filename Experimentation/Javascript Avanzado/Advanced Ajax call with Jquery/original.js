var PlayerService = {
getPlayerTeamId: function(playerId, callback) {
$.ajax({
url: "/player/" + playerId + "/team",
success: function(team) {
callback(team.id)
}
});
},
getPlayers: function(teamId, callback) {
$.ajax({
url: "/team/" + teamId + "/player",
success: callback
});
}
};

var PlayerDetailsController = {
playerId: 8,
showTeammatesClick: function() {
PlayerService.getPlayerTeamId(this.playerId, function(teamId) {
PlayerService.getPlayers(teamId, function(playerList) {
// Render playerList
});
});
}
};