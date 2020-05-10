---
tags: virtualbox guide
created: 05/10/19
---
# Installing up Virtualbox in Arch Linux

```
$ sudo pacman -S linux-headers
$ sudo pacman -S virtualbox virtualbox-guest-iso
$ sudo modprobe vboxdrv
```

Avoid doing this at every startup:

```
$ sudo vim /etc/modules-load.d/virtualbox.conf
```

Add to the current file:

```
vboxnetadp
vboxnetflt
vboxpci
vboxdrv
```

Add your user to the vboxusers group

```
$ sudo gpasswd -a $USER vboxusers
```

Install guest additions:

```
$ sudo pacman -S virtualbox-guest-utils virtualbox-guest-iso
$ sudo rcvboxdrv
```

[Useful post](https://unix.stackexchange.com/a/303118)
[Arch wiki](https://wiki.archlinux.org/index.php/VirtualBox#Install_the_Guest_Additions)
