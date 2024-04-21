---
title: FFmpeg GIF
tags: [linux, wiki]
updated: Apr 21 2024
---
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
