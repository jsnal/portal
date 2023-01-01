---
title: Get APK Data Path
tags: [android, wiki]
---
You can get the data path for a specific APK on your phone using adb.

```
$ adb shell pm list packages -f -3
```

For example, I can get the data path from `lora_app`.

```bash
$ adb shell pm list packages -f -3 | grep lora_app
package:/data/app/com.signalscape.lora_app-7MStonnG3kpngakuEmnwEw==/base.apk=com.signalscape.lora_app
$ cd /data/app/com.signalscape.lora_app-7MStonnG3kpngakuEmnwEw==
$ ls
base.apk lib
```
