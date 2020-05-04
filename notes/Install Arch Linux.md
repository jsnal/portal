# Installing Arch Linux on UEFI Enabled Machines

## Step 1: Create bootable disk

Download an iso from https://www.archlinux.org/download and flash it to a usb stick.

```
# lsblk
# sudo dd bs=4M if=arch.iso of=/dev/sd<?> conv=fdatasync
```

## Step 2: Connect to the internet

If you connect via ethernet just be sure you can ping a website.

```
# ping -c2 google.com
```

Connect via wifi... First try wifi-menu

```
# wifi-menu
```

If that doesn't work try making a profile manually

```
# ip addr
# cp /etc/netctl/examples/wireless-wpa /etc/netctl/<interface>
# netctl start <interface>
```

## Step 3: Partitioning

The general outline of partition table on UEFI systems are as follows

```
EFI System partition   /dev/sda1  300M  FAT32
Swap partition         /dev/sda2  1-2G  Swap On
Root partition         /dev/sda3  REST  ext4
```

```
# cfdisk /dev/sda
```

Pick GPT label type

Verify partitions are right

```
# fdisk -l
```

Format the filesystem for each partition

```
# mkfs.fat -F32 /dev/sda1
# mkfs.ext4 /dev/sda3
# mkswap /dev/sda2
```

## Step 4: Install Base Arch

Mount the root partition to /mnt to work on

```
# mount /dev/sda3 /mnt
# swapon /dev/sda2
```

Enable multilib pacman support

```
# vi /etc/pacman.d/mirrorlist
```

Uncomment

```
[multilib]
Include = /etc/pacman.d/mirrorlist
```

Start the base package install

```
# pacstrap /mnt base base-devel
```

Generate fstab file

```
# genfstab -U -p /mnt >> /mnt/etc/fstab
# cat /mnt/etc/fstab
```

## Step 5: System Configuration

```
# arch-chroot /mnt
# vi /etc/hostname
```

Set system language

```
# vi /etc/locale.gen
```

Uncomment your personal system language

```
# locale-gen
# echo LANG=en_US.UTF-8 > /etc/locale.conf
# export LANG=en_US.UTF-8
```

Set the timezone

```
# ls /usr/share/zoneinfo
# ln -s /usr/share/zoneinfo/<zone> /etc/localtime
# hwclock --systohc --utc
```

Set a root password and add your first user

```
# passwd
# useradd -mg users -G wheel,storage,power -s /bin/bash <user>
# passwd <user>
```

Enable root control for your new user

```
# pacman -S sudo
# visudo
```

Uncomment

```
%wheel ALL=(ALL) ALL
```

## Step 6: Install Bootloader

```
# pacman -S grub efibootmgr dosfstools os-prober mtools
# mkdir /boot/EFI
# mount /dev/sda1 /boot/EFI
# grub-install --target=x86_64-efi --bootloader-id=grub_uefi --recheck
# grub-mkconfig -o /boot/grub/grub.cfg
```

## Step 7: Reboot

```
# exit
# umount -a
# telinit 6
```

## Step 7: Installing X11

```
$ sudo pacman -S xorg-server xorg-xinit
$ sudo pacman -S xf86-input-keyboard xorg-xkbcomp xbindkeys
```

Setup a window manager to startup with X.

```
$ sudo pacman -S i3
$ echo "exec i3" >> ~/.xinitrc
# startx
```

## Step 8: Fonts

```
$ sudo pacman -S ttf-dejavu terminus-font fontconfig
```

Extras

```
$ sudo pacman -S noto-fonts-cjk noto-fonts-emoji noto-fonts-extra libx11 libxft
```

---

**Posted:** 05/05/19
