<!-- Please do not edit this file. Edit the `blah` field in the `package.json` instead. If in doubt, open an issue. -->


# `$ machine-ip`

 [![Support me on Patreon][badge_patreon]][patreon] [![Buy me a book][badge_amazon]][amazon] [![PayPal][badge_paypal_donate]][paypal-donations] [![Ask me anything](https://img.shields.io/badge/ask%20me-anything-1abc9c.svg)](https://github.com/IonicaBizau/ama) [![Version](https://img.shields.io/npm/v/machine-ip.svg)](https://www.npmjs.com/package/machine-ip) [![Downloads](https://img.shields.io/npm/dt/machine-ip.svg)](https://www.npmjs.com/package/machine-ip)

> Update your public ip information in a git repository.

## How to use


 1. Create a GitHub repository
 2. Clone it locally
 3. `cd` into that directory
 4. Run `machine-ip`
 5. If it works, you should see some IP information in the GitHub repository.
 6. Run automatically as a cron job (e.g. every hour).

## Why?


When traveling, I do not have access to my home computer. It is a powerful machine with a fast internet connection.

Also, I do not have a static public ip assigned to that network. The machine does get a static ip from the router. The router does port forwarding on a specific range.

SSH is running on it and it listens on a specific port, exposed in the router.

Whereever I am, I can now `ssh` to my home computer and do tasks that require more performance (e.g. AI training etc).

Just in case the public ip is going to change, I will see it in my GitHub repository.

## Getting a static ip from the router


For posterity, this is my `/etc/network/interfaces` file:

```
auto lo
iface lo inet loopback

auto enp5s0
iface enp5s0 inet static
address 192.168.2.xxx
netmask 255.255.255.0
gateway 192.168.2.1
dns-nameservers 8.8.8.8 192.168.1.1
```
```

## Listening for ssh connections


In `/etc/ssh/sshd_config`, change the `Port` value to whatever value you want

```
Port 4242
```


**Do use SSH keys for authentication, instead of passwords.**

## Connecting

```sh
ssh -A <username>@<public-ip> -p <port>
```

## Cron job


I added the cron job by running `crontab -e` and writing in that file:

```cron
SHELL=/bin/sh
PATH=/home/testing/.nvm/versions/node/v6.7.0/bin:/home/testing/bin:/home/testing/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bi

# Min Hour Day Month Weekday Command
*/10  *    *   *     *       /johnnysapps/ip
```


The `/johnnysapps/ip` script contains. This is executed every 10 minutes. In case the electricity goes down, I assume the laptop battery will resist for an hour or so until the electricity is back.

```sh
echo "Adding the ssh key"
ssh-add /home/testing/.ssh/id_rsa
echo "Changing directory"
cd /johnnysapps/notebook
ls
echo "Getting the ip"
date > last_updated.txt
machine-ip
```


## :cloud: Installation

You can install the package globally and use it as command line tool:


```sh
# Using npm
npm install --global machine-ip

# Using yarn
yarn global add machine-ip
```


Then, run `machine-ip --help` and see what the CLI tool can do.


```
$ machine-ip --help
Usage: machine-ip [options]

Update your public ip information in a git repository.

Options:
  -v, --version  Displays version information.
  -h, --help     Displays this help.

Documentation can be found at https://github.com/IonicaBizau/machine-ip#readme.
```

## :memo: Documentation

For full API reference, see the [DOCUMENTATION.md][docs] file.

## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].


## :sparkling_heart: Support my projects

I open-source almost everything I can, and I try to reply everyone needing help using these projects. Obviously,
this takes time. You can integrate and use these projects in your applications *for free*! You can even change the source code and redistribute (even resell it).

However, if you get some profit from this or just want to encourage me to continue creating stuff, there are few ways you can do it:

 - Starring and sharing the projects you like :rocket:
 - [![Buy me a book][badge_amazon]][amazon]—I love books! I will remember you after years if you buy me one. :grin: :book:
 - [![PayPal][badge_paypal]][paypal-donations]—You can make one-time donations via PayPal. I'll probably buy a ~~coffee~~ tea. :tea:
 - [![Support me on Patreon][badge_patreon]][patreon]—Set up a recurring monthly donation and you will get interesting news about what I'm doing (things that I don't share with everyone).
 - **Bitcoin**—You can send me bitcoins at this address (or scanning the code below): `1P9BRsmazNQcuyTxEqveUsnf5CERdq35V6`

    ![](https://i.imgur.com/z6OQI95.png)

Thanks! :heart:



## :sparkles: Related

 - [`ipinfo`](https://github.com/IonicaBizau/node-ipinfo)—An http://ipinfo.io NodeJS wrapper.



## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[badge_patreon]: http://ionicabizau.github.io/badges/patreon.svg
[badge_amazon]: http://ionicabizau.github.io/badges/amazon.svg
[badge_paypal]: http://ionicabizau.github.io/badges/paypal.svg
[badge_paypal_donate]: http://ionicabizau.github.io/badges/paypal_donate.svg
[patreon]: https://www.patreon.com/ionicabizau
[amazon]: http://amzn.eu/hRo9sIZ
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(https%3A%2F%2Fionicabizau.net)&year=2017#license-mit
[website]: https://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
