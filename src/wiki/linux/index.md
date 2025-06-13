---
title: Linux
description:
---

## FFmpeg GIF

Here is a way to record an FFmpeg video and covert it to a GIF

1. Record the video

```sh
$ ffmpeg \
   -f x11grab \
   -y \
   -framerate 20 \
   -s "$(xdpyinfo | grep dimensions | awk '{ print $2 }' )" \
   -i :0.0 \
   -c:v libx264 \
   -preset superfast \
   -crf 21 \
   "Recording.mp4"
```

2. Convert the video

```sh
$ ffmpeg -i Recording.mp4 \
    -vf "fps=10,scale=640:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" \
    -loop 0 Recording.gif
```

I also found this script to record just a single window with FFmpeg:

```bash
#!/usr/bin/env bash

echo "Please select the window that you want to record."

win_info="$(xwininfo)"
x="$(echo "$win_info" | grep -i 'absolute upper-left x' | sed 's/^[^0-9]*\([0-9]\+\)$/\1/g' )"
y="$(echo "$win_info" | grep -i 'absolute upper-left y' | sed 's/^[^0-9]*\([0-9]\+\)$/\1/g' )"
width="$(echo "$win_info" | grep -Ei '^\W+width:' | sed 's/^[^0-9]*\([0-9]\+\)$/\1/g' )"
height="$(echo "$win_info" | grep -Ei '\W+height:' | sed 's/^[^0-9]*\([0-9]\+\)$/\1/g' )"
now="$(date +%Y-%m-%d_%H-%M_%S)"

echo "
executing:

> ffmpeg -f x11grab -framerate 25 -video_size ${width}x${height} -i +${x},${y} "window_recording_${now}.mp4"

[press ctrl+c in this terminal to stop the recording]

"

ffmpeg -f x11grab -framerate 25 -video_size ${width}x${height} -i +${x},${y} "window_recording_${now}.mp4"
```

Source: [StackOverflow](https://stackoverflow.com/a/75453458)

## Enable st Bell in PulseAudio

Edit `/etc/pulse/default.pa` and add the following lines

```
# audible bell
load-sample-lazy x11-bell /usr/share/sounds/freedesktop/stereo/bell.oga
load-module module-x11-bell sample=x11-bell
```

Restart pulseaudio

```sh
$ pulseaudio -k
```

If that doesn't work check volume and see if there is something specific you
have to do for your window manager or desktop environment.

## Zsh Command not Found Hook

Getting output on commands in the arch repositories

For Example:

```
$ htop
htop may be found in the following packages:
extra/htop
```

Install pkgfile:

```
$ sudo pacman -S pkgfile
```

Creates a directory in `/usr/share/doc/pkgfile` that contains bash, zsh and fish

```
$ source /usr/share/doc/pkgfile/command-not-found.zsh
```

You can also just put the source code straight into your `.zshrc`

Make sure the function name is the same.

```
command_not_found_handler() {
  local pkgs cmd="$1"

  pkgs=(${(f)"$(pkgfile -i -b -- "$cmd" 2>/dev/null)"})
  if [[ -n "$pkgs"  ]]; then
    printf '%s may be found in the following packages:\n' "$cmd"
    printf '  %s\n' $pkgs[@]
    return 0
  fi

  printf 'zsh: command not found: %s\n' "$cmd" 1>&2
  return 127

}
```

## ZSH ZLE command line editor

Using the built-in zsh zle functionality

### Keymaps:

Set zsh to emacs keybinds

```
bindkey -e
```

Create a simple function

```
function edit-zshrc() {
  vim $HOME/.zshrc

}
```

Create a new zle widget

```
zle -N edit-zshrc
```

Call the widget

```
bindkey '^e' edit-zshrc
```

### Standard Widgets:

```
forward-word           Go forward by one word
backward-word          Go backward by one word
kill-whole-line        Remove all text on the current line
backward-kill-word     Kill one word backwards
kill-word              Kill one word forwards

See zshzle(1) line 855
```

### Loading Built-in Widgets:

```
autoload -U edit-command-line
zle -N edit-command-line

bindkey '^x^x' edit-command-line
```

### Other commands:

Delete widget

```
zle -D [widget]
```

Alias a widget to another widget

```
zle -A [old-widget] [new-widget]
```

See zshzle(1) for more info

## Install VirtualBox on Arch Linux

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


## Mount VirtualBox shared folder

These instructions have been tested on a host of Windows 10 and a guest of
Ubuntu 20.04 LTS. Make sure that Guest Additions are installed on the guest
machine or else folder sharing will never work.

1. Open VirtualBox settings
2. Go to **Shared Folders** section
3. Add a new shared folder
4. **Folder path** should be a path to the folder on the host machine
5. **Folder name** can be anything, just remember it for later
6. Check **Make Permanent**
7. Start the VM
8. Create a shared directory somwhere

```sh
mkdir ~/shared
```

9. Mount the shared directory as a `vboxsf`

```sh
sudo mount -t vboxsf <FOLDER NAME FROM STEP 5> ~/shared
```

If you want to the folder to be automatically mounted when the system reboots,
you can edit the fstab.

1. Find user's UID and GID

```sh
echo $UID
echo $GID
```

2. Open the system fstab file

```sh
sudo vim /etc/fstab
```

3. Add an entry for the shared directory

```sh
<FOLDER NAME FROM STEP 5> /home/<USER>/shared vboxsf defaults,uid=<UID>,gid=<GID>,umask=0022 0 0
```

4. Reboot

## Startup Applications in Xfce

Set startup applications to run on Login or other times during the Xfce
lifecycle. This could be useful for sourcing keybindings like `Xmodmap` for
example.

* Find Session and Startup preferences.
* Application Startup and add a new Application
* Change the trigger for when you want it to run at

Quick menu path

`Session and Startup > Application Startup > New`


## Using Xephyr

[Xephyr](https://freedesktop.org/wiki/Software/Xephyr) is a nested X server that
runs as an X application. You can start a basic nested X window by running the
following.

```sh
$ Xephyr -br -ac -noreset -screen 800x600 :1
```

This will put a new "nested" X window on DISPLAY `:1`. You can then launch an
application on that window by running the following.

```sh
$ DISPLAY=:1 st
```

You can unlock the pointer by pressing `Ctrl + Shift`. The same keys will lock
the pointer. Sometimes the keyboard configuration on the opened display may be
wrong. This happens especially often in a window manager or desktop environment.
To solve this you can copy the keyboard configure of display `:0` to display
`:1`.

```sh
$ setxkbmap -display :0 -print | xkbcomp - :1
```

## X11 autorepeat rate

You can change the rate at which a key repeats if your holding is using the
following command.

```sh
$ xset r rate 200 20
```

This command could be perfect in an `.xinitrc`


## QEMU Monitor

QEMU Monitor is a tool to inspect the running instance of QEMU, similar to GDB.

1. Add the following to the QEMU command

```
-monitor tcp:127.0.0.1:55555,server,nowait
```

2. Connect to it using netcat

```
nc localhost 55555
```

3. List some memory

```
x/80hx 0x000100a8
```

More information [here](https://qemu-project.gitlab.io/qemu/system/monitor.html)

QEMU can also take advantage of GDB using the following commands.

1. Enable GDB server in QEMU

```
-S -s
```

2. Connect to it with GDB

```
$ gdb kernel.bin

(gdb) target remote localhost:1234
```

3. Start execution

```
(gdb) continue
```

4. Normal GDB commands should work

I like to use GDB with the following commands:

```
db Kernel -ex 'target remote localhost:1234' -ex 'layout asm' -ex 'layout regs'
```

## Vim defaults

The location to default vim configuration is in `/usr/share/vim/vim<VERSION>`.
You can also find the default vimrc in `/etc/vim/vimrc` which is often symlinked
to other locations on the system. This sources a file called `vimrc.local` and
then the whole vim bootstrapping process starts.
