const API_KEY = "RGAPI-d6e62b97-f15e-4023-b683-c1e2d36cc2e8";

async function getAllInformation() {
  var inputNick = document.querySelector("#inputSummoner");
  var inputText = inputNick.value;
  var URL = `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${inputText}?api_key=${API_KEY}`;
  //API para capturar informações da partida
  var startAmericanURL = `https://americas.api.riotgames.com/lol/match/v5/matches/`;

  const allInformationResponse = await fetch(URL);

  allInformationResponse
    .json()
    .then(async ({ name, summonerLevel, profileIconId, puuid }) => {
      //Capturando informações do player e adicionando no HTML
      const nameContainer = document.querySelector("#name");
      nameContainer.innerHTML = name;
      const levelSummoner = document.querySelector("#levelSummoner");
      levelSummoner.innerHTML = summonerLevel;
      const imageSummoner = document.querySelector("#imageSummoner");
      const imageURL = `http://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/${profileIconId}.png`;
      imageSummoner.src = imageURL;

      //Capturando array das 20 últimas partidas
      const urlAllMatch = `${startAmericanURL}by-puuid/${puuid}/ids?start=0&count=20&api_key=${API_KEY}`;
      const matchResponse = await fetch(urlAllMatch);
      const matchArray = await matchResponse.json();
      console.log(matchArray);

      //Capturando informações de uma unica partida
      const urlLastMatch = `${startAmericanURL}${matchArray[0]}?api_key=${API_KEY}`;
      const lastMatchResponse = await fetch(urlLastMatch);
      lastMatchResponse.json().then(async ({ info }) => {
        const imageURL = `http://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/`;
        console.log(info);

        //Calculo tempo da partida
        //Dividindo minuto e segundo em uma array
        var arrGameDuration = (info.gameDuration / 60)
          .toFixed(2)
          .toString()
          .split(".");
        var convertDecimal = (
          parseInt(arrGameDuration[1] || 0) * 0.6
        ).toFixed();
        var seconds =
          convertDecimal < 10 ? "0" + convertDecimal : convertDecimal;
        var gameDurationContent = document.querySelector("#gameDuration");
        gameDurationContent.innerHTML = `Duração da Partida: ${arrGameDuration[0]}:${seconds}`;

        //Capturando game info
        var team = 0;
        while (team <= 1) {
          const teamObjectives = info.teams[team].objectives;
          const dragons = teamObjectives.dragon.kills;
          const barons = teamObjectives.baron.kills;
          const herald = teamObjectives.riftHerald.kills;
          const totalTeamKills = teamObjectives.champion.kills;
          const totalTowersDestroyed = teamObjectives.tower.kills;
          const totalInhibitorDestroyed = teamObjectives.inhibitor.kills;
          const win = info.teams[team].win;

          //Selecionando elementos HTML para game info
          const baronContent = document.querySelector(`#baronTeam${team}`);
          baronContent.innerHTML = `Barons: ${barons}`;
          const dragonContent = document.querySelector(`#dragonTeam${team}`);
          dragonContent.innerHTML = `Dragons: ${dragons}`;
          const heraldContent = document.querySelector(`#heraldTeam${team}`);
          heraldContent.innerHTML = `Arautos: ${herald}`;
          const towerContent = document.querySelector(`#towerTeam${team}`);
          towerContent.innerHTML = `Torres Destruidas: ${totalTowersDestroyed}`;
          const inhibitorContent = document.querySelector(
            `#inhibitorTeam${team}`
          );
          inhibitorContent.innerHTML = `Inibidores Destruidos: ${totalInhibitorDestroyed}`;
          const totalTeamKillsContent = document.querySelector(
            `#totalTeamKillsTeam${team}`
          );
          totalTeamKillsContent.innerHTML = `Kills do time: ${totalTeamKills}`;
          const winContent = document.querySelector(`#winTeam${team}`);
          winContent.innerHTML = `Vitória: ${win}`;
          team++;
        }

        // console.log(
        //   `Dragons: ${dragons}, Barons: ${barons}, Arautos: ${herald}, Total de Kills do time: ${totalTeamKills}, Total de torres Destruidas: ${totalTowersDestroyed}, Total de Inibidores Destruidos ${totalInhibitorDestroyed}, Vitória: ${win}`
        // );
        var gameMode = info.gameMode;
        const gameModeContent = document.querySelector("#gameMode");
        gameModeContent.innerHTML = `Mode de Jogo: ${gameMode}`;
        var i = 0;
        //Your Team
        while (i >= 0 && i <= 4) {
          //Armazenando infomações
          const allParticipants = info.participants[i];
          const championLVL = allParticipants.champLevel;
          const teamPosition = allParticipants.teamPosition;
          const junglelMinionsKilled = allParticipants.neutralMinionsKilled;
          const laneMinionsKilled = allParticipants.totalMinionsKilled;
          const totalMinionsKilled = junglelMinionsKilled + laneMinionsKilled;
          const kills = allParticipants.kills;
          const deaths = allParticipants.deaths;
          const assists = allParticipants.assists;
          const playerName = allParticipants.summonerName;
          const champion = allParticipants.championName;
          //Selecionando Elementos HTML
          const teamPlayer = document.querySelector(`#teamPlayer${i}`);
          teamPlayer.setAttribute("src", `${imageURL}${champion}.png`);
          const playerNameContent = document.querySelector(`#playerName${i}`);
          playerNameContent.innerHTML = `${playerName}`;
          const championLevelContent = document.querySelector(
            `#championLevel${i}`
          );
          championLevelContent.innerHTML = `Level: ${championLVL}`;
          const teamKDA = document.querySelector(`#teamKDA${i}`);
          const totalMinionsContent = document.querySelector(
            `#totalMinions${i}`
          );
          totalMinionsContent.innerHTML = `Farm: ${totalMinionsKilled}`;
          teamKDA.innerHTML = ` ${kills}/${deaths}/${assists}`;
          const teamPositionContent = document.querySelector(
            `#teamPosition${i}`
          );
          teamPositionContent.innerHTML = `Lane: ${teamPosition}`;
          i++;
        }
        //Enemy Team
        while (i >= 5 && i <= 9) {
          //Armazenando infomações
          const allParticipants = info.participants[i];
          const championLVL = allParticipants.champLevel;
          const teamPosition = allParticipants.teamPosition;
          const junglelMinionsKilled = allParticipants.neutralMinionsKilled;
          const laneMinionsKilled = allParticipants.totalMinionsKilled;
          const totalMinionsKilled = junglelMinionsKilled + laneMinionsKilled;
          const kills = allParticipants.kills;
          const deaths = allParticipants.deaths;
          const assists = allParticipants.assists;
          const playerName = allParticipants.summonerName;
          const champion = allParticipants.championName;
          //Selecionando Elementos HTML
          const teamPlayer = document.querySelector(`#enemyPlayer${i}`);
          teamPlayer.setAttribute("src", `${imageURL}${champion}.png`);
          const playerNameContent = document.querySelector(`#playerName${i}`);
          playerNameContent.innerHTML = `${playerName}`;
          const championLevelContent = document.querySelector(
            `#championLevel${i}`
          );
          championLevelContent.innerHTML = `Level: ${championLVL}`;
          const teamKDA = document.querySelector(`#enemyKDA${i}`);
          teamKDA.innerHTML = `${kills}/${deaths}/${assists}`;
          const totalMinionsContent = document.querySelector(
            `#totalMinions${i}`
          );
          totalMinionsContent.innerHTML = `Farm: ${totalMinionsKilled}`;
          const teamPositionContent = document.querySelector(
            `#teamPosition${i}`
          );
          teamPositionContent.innerHTML = `Lane: ${teamPosition}`;
          i++;
        }
      });
    });
}
