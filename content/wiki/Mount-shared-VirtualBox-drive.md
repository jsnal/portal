---
title: Mount VirtualBox shared folder
tags: [linux, wiki]
updated: Mar 18 2024
---

These instructions have been tested on a host of Windows 10 and a guest of Ubuntu 20.04 LTS. Make sure that Guest Additions are installed on the guest machine or else folder sharing will never work.

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

If you want to the folder to be automatically mounted when the system reboots, you can edit the fstab.

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
