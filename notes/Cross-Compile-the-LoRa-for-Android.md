---
tags: android lora wiki
created: 06/18/20
---
## Preparation

### Get the Android NDK

Grab the latest Standalone Android NDK toolchain. At the time of writing this the latest version is 21 but it may different by the time you're reading this.

```sh
$ wget http://dl.google.com/android/repository/android-ndk-r<VERSION>b-linux-x86_64.zip
$ unzip android-ndk-r<VERSION>b-linux-x86_64.zip
```

### Create a standalone toolchain

You then need to make your own standalone toolchain. The command below will build the toolchain for `arm64` and put it in `~/android/arm64`. If you need 32-bit `arm` you can do change the `--arch` flag to `arm`.

Since Android also has an API, you may want to specify the API version to build for. To do this use the `--api` flag. If you don't specify, like in my example command, it will assume version 21 for `arm64` and 16 for `arm`

```sh
$ cd android-ndk-r<VERSION>b/build/tools
$ ./make_standalone_toolchain.py --arch arm64 --install-dir=/home/jason.long/android/arm64
```

### Add it your PATH

Next we want to add the new toolchain you just generated to your PATH and other build variables. To do this, I just wrote a simple script to source the variables into my current shell.

```sh
#!/bin/bash

export PATH="$PATH:/home/jsnal-lora/android/arm64/bin"

target_host=aarch64-linux-android
api_version=23
export AR=$target_host-ar
export AS=$target_host$api_version-clang
export CC=$target_host$api_version-clang
export CXX=$target_host$api_version-clang++
export LD=$target_host-ld
export STRIP=$target_host-strip

export CFLAGS="-fPIE -fPIC"
export LDFLAGS="-pie"
```

It is assumed for the rest of the steps that you sourced this file into your environment. I just called this script `env.sh` and can source it with the following commands.

```sh
$ chmod +x env.sh
$ source env.sh
```

## FFTW

Now it's time to build [FFTW](http://www.fftw.org/). Assuming you have sourced the NDK into your PATH, these are the steps you should follow.

```
$ wget http://www.fftw.org/fftw-3.3.2.tar.gz
$ tar xf fftw-3.3.2.tar.gz
$ cd fftw-3.3.2
$ ./configure --prefix=/home/jason.long/SS_SDR/Libraries/ARM/Android/fftw3/ --host=$target_host --enable-single --enable-static
$ make -j
$ make install
```

Troubles with `--enable-neon`

## Liquid-dsp

You can find liquid-dsp [here](https://github.com/jgaeddert/liquid-dsp.git). Liquid-dsp **requires** Android API 23 or higher to build. Make sure `api_version` is 23 or higher. See [here](https://android.googlesource.com/platform/bionic/+/master/docs/status.md#libm) for more details. See below for an example.

```sh
api_version=23
```

The build from that point is really similar to fftw3.

```sh
$ git clone https://github.com/jgaeddert/liquid-dsp.git
$ cd liquid-dsp
$ ./bootstrap.sh
$ ./configure --prefix=/home/jason.long/SS_SDR/Libraries/ARM/Android/liquid/
```

## Boost

Cross compiling Boost takes some configuration in the build files so pay attention closely. To begin grab the latest release and untar it.

```sh
$ wget http://dl.bintray.com/boostorg/release/1.65.1/source/boost_1_65_1.tar.bz
$ tar xf boost_1_65_1.tar.bz
$ cd boost_1_65_1
```

Next we are going to configure Boost. We only want to install three of the Boost libraries (system, filesystem, thread).

```
$ ./bootstrap.sh --prefix=/home/jason.long/SS_SDR/Libraries/ARM/Android/boost/ --with-libraries=system,filesystem,thread
```

This should generate a `project-config.jam` file in the root of the project. Open this in a text editor and make the following edits.

```jam
if ! gcc in [ feature.values <toolset> ]
{
  using clang : android
  :
  /home/jason.long/android/arm64/bin/aarch64-linux-android23-clang++
  :
  <archiver>/home/jason.long/android/arm64/bin/aarch64-linux-android-ar
  ;
}
```

Once you've changed those, you can build and install the Boost library.

```sh
$ ./b2 architecture=arm toolset=clang-android target-os=android link=static install

# Run again without link=static so it builds shared objects
$ ./b2 architecture=arm toolset=clang-android target-os=android install
```
