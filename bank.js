const Discord = require('discord.js');
const client = new Discord.Client();
const priv = require('./priv.json');
const chalk = require('chalk');
const fs = require('fs');
const ms = require('ms');
const moment = require('moment');
const Jimp = require('jimp');
const db = require('quick.db');
const { promisify } = require("util");
require('./util/eventLoader')(client);




client.elevation = message => {
    if (!message.guild) {
      return;
    }
  
    let permlvl = 0;
    if (message.member.hasPermission("KICK_MEMBERS")) permlvl = 1;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === priv.sahip) permlvl = 4;
    return permlvl;
  };
  
  var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
  
  client.on("warn", e => {
    console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
  });
  
  client.on("error", e => {
    console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
  });
client.login(priv.token)



client.on("guildCreate", guild => {

  let defaultChannel = "";
  guild.channels.cache.forEach((channel) => {
  if(channel.type == "text" && defaultChannel == "") {
  if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
  defaultChannel = channel;
  }
  }
  })
  
  defaultChannel.send(embed)
  
  });


    client.on('ready', () => {
      client.user.setActivity(`vader`);
     })

const log = message => {
    console.log(`${message}`);
  };
  
  client.commands = new Discord.Collection();
  client.aliases = new Discord.Collection();
  fs.readdir("./komutlar/", (err, files) => {
    if (err) console.error(err);
    log(`${chalk.red(files.length)} ${chalk.green("komut yüklenecek.")}`);
    files.forEach(f => {
      let props = require(`./komutlar/${f}`);
      log(`${chalk.green("Yüklenen komut:")} ${chalk.blue(props.help.name)}.`);
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
    });
  });
  
  client.english = new Discord.Collection();
  fs.readdir("./komutlar/", (err, files) => {
    if (err) console.error(err);
    //log(`${chalk.red(files.length)} ${chalk.green("komut yüklenecek.")}`);
    files.forEach(f => {
      let props = require(`./komutlar/${f}`);
      //log(`${chalk.green("Yüklenen komut:")} ${chalk.blue(props.help.name)}.`);
      client.english.set(props.help.enname, props);
    });
  });
  
  client.reload = command => {
    return new Promise((resolve, reject) => {
      try {
        delete require.cache[require.resolve(`./komutlar/${command}`)];
        let cmd = require(`./komutlar/${command}`);
        client.commands.delete(command);
        client.aliases.forEach((cmd, alias) => {
          if (cmd === command) client.aliases.delete(alias);
        });
        client.commands.set(command, cmd);
        cmd.conf.aliases.forEach(alias => {
          client.aliases.set(alias, cmd.help.name);
        });
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  };
  
  client.load = command => {
    return new Promise((resolve, reject) => {
      try {
        let cmd = require(`./komutlar/${command}`);
  
        client.commands.set(command, cmd);
        cmd.conf.aliases.forEach(alias => {
          client.aliases.set(alias, cmd.help.name);
        });
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  };
  
  client.unload = command => {
    return new Promise((resolve, reject) => {
      try {
        delete require.cache[require.resolve(`./komutlar/${command}`)];
        let cmd = require(`./komutlar/${command}`);
        client.commands.delete(command);
        client.aliases.forEach((cmd, alias) => {
          if (cmd === command) client.aliases.delete(alias);
        });
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  };
  


 







  
   