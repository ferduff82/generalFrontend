var PlayerService = {
    getPlayerTeamId: function(playerId) {
        return $.post("/player/" + playerId + "/team")}
            .pipe(function(team){
                return team.id;
            });
    },
    getPlayers: function(teamId) {
        return $.post("/team/" + teamId + "/player")}
            .pipe(function(p){
                return p;
            });
    },
    renderPlayerList: function(id) {
        return getPlayerTeamId(id)
            .pipe(getPlayers);  
    }
};

var PlayerDetailsController = {
    playerId: 8,
    showTeammatesClick: function() {
        PlayerService.renderPlayerList(this.playerId)
            .done(function(p){
                // Render playerList 
            });
    }
};