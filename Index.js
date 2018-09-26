const Discord = require('discord.js');
var client = new Discord.Client();
const prefix = "/";
var test = 0;
var lastTime;
var key = 1;
var int1;
var NOTIFY_CHANNEL;

function msToTime(timeMS) {
      var timeString;
      var seconds = parseInt((timeMS/1000)%60)
          ,minutes = parseInt((timeMS/(1000*60))%60)
          ,hours = parseInt((timeMS/(1000*60*60))%24);
      if(hours > 0){
        timeString = hours + " hours"
      }else if (minutes > 0) {
        timeString = minutes + " minutes"
      }else if (seconds > 0) {
        timeString = seconds + " seconds"
      }
      return timeString;
}
//starts bot
client.on('ready', () => {
    console.log('Successfully started bot.');
    client.user.setActivity("(!) Reminding Your Asses (!) | Bot loaded on " + client.guilds.array().length + " Server");
    NOTIFY_CHANNEL = client.channels.find("name", "skyblock-bot"); // finds channel to send alerts in

//sets alert intveral
    int1 = setInterval(function steaming(){
    if(test == 1 && (key != 0)){
      const embed = new Discord.RichEmbed()
      .setColor(0xFF0000)
      .setTimestamp()
      .setTitle('Skyblock Util')
      .addField('Minions Havent been checked in', "5 Hours")
      NOTIFY_CHANNEL.send(embed)
        NOTIFY_CHANNEL.send('@here @here check/feed the Minions', {tts: false});
        NOTIFY_CHANNEL.send('@here @here check/feed the Minions', {tts: false});

    }
    else{
        key = 1
        test = 1}
    }, 18000000);
//1200000 = 20 mins 900000 = 15 mins  1500000 = 25 mins 1800000 = 30 mins https://www.timecalculator.net/seconds-to-milliseconds
} //1 second = 1000 ms
);
//.clear command
client.on('message', message => {
  if (message.content == prefix + 'fed') {
    lastSender = message.guild.lastSender = message.author
    lastTime = new Date()
    const embed = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setTitle('Skyblock Util')
    .addField('Minions fed to 150,000 by ', '<@' +  message.guild.lastSender.id + '>')
    .addField('Check/Feed again in', msToTime(350*60*1000 - Math.abs(new Date() - lastTime)))
    NOTIFY_CHANNEL.send(embed)
    key = 0 }
});

//.minions command
client.on ('message', message => {
  if (message.content === prefix + 'minions') {
    if (message.guild.lastSender) {
    const embed = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setTitle('Skyblock Util')
    .addField('Minions Status:', 'Last fed by ' + '<@' + message.guild.lastSender.id  + '>')
    .addField('Last  Fed:', msToTime(Math.abs(new Date() - lastTime)) + " ago.")
    .addField('Check/Feed again in:', msToTime(350*60*1000 - Math.abs(new Date() - lastTime)))
      NOTIFY_CHANNEL.send(embed)
    }
    else {
      NOTIFY_CHANNEL.send("```SkyblockUtils has restarted! Please execute /fed for /minions to update again.```")
    }
  }
});
// .help command
client.on ('message', message => {
  if (message.content === prefix + "help") {
    const embed = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setTitle('Skyblock Utils Help')
    .addField('Command Help')
      NOTIFY_CHANNEL.send(embed)
  }
})


//token
client.login('');
