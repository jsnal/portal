---
tags: android guide
created: 06/18/20
---
Follow these steps to cross compile the LoRa and all of its dependencies for Android.

## Preparation

### Get the Android NDK

Grab the latest Standalone Android NDK toolchain. At the time of writing this the latest version is 21 but it may different by the time you're reading this.

```bash
$ wget http://dl.google.com/android/repository/android-ndk-r<VERSION>b-linux-x86_64.zip
$ unzip android-ndk-r<VERSION>b-linux-x86_64.zip
```

### Create a standalone toolchain

You then need to make your own standalone toolchain. The command below will build the toolchain for `arm64` and put it in `~/android/arm64`. If you need 32-bit `arm` you can do change the `--arch` flag to `arm`.

Since Android also has an API, you may want to specify the API version to build for. To do this use the `--api` flag. If you don't specify, like in my example command, it will assume version 21 for `arm64` and 16 for `arm`

```bash
$ cd android-ndk-r<VERSION>b/build/tools
$ ./make_standalone_toolchain.py --arch arm64 --install-dir=/home/jason.long/android/arm64
```

### Add it your PATH

Next we want to add the new toolchain you just generated to your PATH and other build variables. To do this, I just wrote a simple script to source the variables into my current shell.

```bash
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

```bash
$ chmod +x env.sh
$ source env.sh
```

### Dependencies

These are some dependencies that you are going to need to compile one or more of the libraries below.

```bash
# apt install cmake make autoconf automake binutils python3-distutils
```

### LoRa Code

Finally, grab the latest version of the LoRa android app code from the Gitlab. You will need to recursively clone the app because it has a submodule to the underlying LoRa code itself that you will need.

```bash
$ git clone --recurse-submodules git@githost.raleigh.signalscape.com:SS_SDR/lora_android/lora_app.git
```

## FFTW

Now it's time to build [FFTW](http://www.fftw.org/). Assuming you have sourced the NDK into your PATH, these are the steps you should follow.

```bash
$ wget http://www.fftw.org/fftw-3.3.2.tar.gz
$ tar xf fftw-3.3.2.tar.gz
$ cd fftw-3.3.2
$ ./configure --prefix=/home/jason.long/SS_SDR/Libraries/ARM/Android/fftw3/ --host=$target_host --enable-single --enable-static
$ make -j
$ make install
```

## Liquid-dsp

You can find liquid-dsp [here](https://github.com/jgaeddert/liquid-dsp.git). Liquid-dsp **requires** Android API 23 or higher to build. Make sure `api_version` is 23 or higher. See [here](https://android.googlesource.com/platform/bionic/+/master/docs/status.md#libm) for more details. See below for an example.

```bash
api_version=23
```

Get started by cloning down the repository and running the `bootstrap.sh` script.

```bash
$ git clone https://github.com/jgaeddert/liquid-dsp.git
$ cd liquid-dsp
$ ./bootstrap.sh
```

Before you run the configuration, you need to comment out some library checks in the `configure.ac` file. Specifically you need to remove the `AC_FUNC_MALLOC` and `AC_FUNC_REALLOC`. Edit the `configure.ac` file and see the changes below.

```txt
AC_FUNC_ERROR_AT_LINE
# AC_FUNC_MALLOC
# AC_FUNC_REALLOC
```

From this point, the build is pretty typical.

```bash
$ ./configure --prefix=/home/jason.long/SS_SDR/Libraries/ARM/Android/liquid/
$ make -j
$ make install
```

## Boost

Cross compiling Boost takes some configuration in the build files so pay attention closely. To begin grab the latest release and untar it.

```bash
$ wget http://dl.bintray.com/boostorg/release/1.65.1/source/boost_1_65_1.tar.bz
$ tar xf boost_1_65_1.tar.bz2
$ cd boost_1_65_1
```

Next we are going to configure Boost. We only want to install three of the Boost libraries (system, filesystem, thread).

```bash
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

```bash
$ ./b2 architecture=arm toolset=clang-android target-os=android link=static install

# Run again without link=static so it builds shared objects
$ ./b2 architecture=arm toolset=clang-android target-os=android install
```

## Volk

You should have built and installed Boost in the last step. This is important because Volk heavily depends on Boost. Get started by cloning Volk.

```bash
$ git clone https://github.com/gnuradio/volk.git
$ cd volk
$ mkdir build
```

Currently, there is an issue with Volk static library linking for `arm` and `arm64` that causes the Volk profiler build to fail. To get around this, you must disable the `/apps` subdirectory. Open up the root `CMakeLists.txt` and comment out these two lines.

```cmake
# add_subdirectory(apps)
# add_subdirectory(python/volk_modtool)
```

Next, you need to add a cmake toolchain. Create and edit a file in `cmake/Toolchains/aarch64-linux-android.cmake`

```cmake
set(CMAKE_SYSTEM_NAME Linux)
set(CMAKE_SYSTEM_PROCESSOR ARM)

if(MINGW OR CYGWIN OR WIN32)
  set(UTIL_SEARCH_CMD where)
elseif(UNIX OR APPLE)
  set(UTIL_SEARCH_CMD which)
endif()

set(TOOLCHAIN_PREFIX aarch64-linux-android)
set(TOOLCHAIN_API_VERSION 23)

execute_process(
  COMMAND ${UTIL_SEARCH_CMD} ${TOOLCHAIN_PREFIX}${TOOLCHAIN_API_VERSION}-clang
  OUTPUT_VARIABLE BINUTILS_PATH
  OUTPUT_STRIP_TRAILING_WHITESPACE)

get_filename_component(ARM_TOOLCHAIN_DIR ${BINUTILS_PATH} DIRECTORY)

set(CMAKE_C_COMPILER ${TOOLCHAIN_PREFIX}${TOOLCHAIN_API_VERSION}-clang)
set(CMAKE_ASM_COMPILER ${CMAKE_C_COMPILER})
set(CMAKE_CXX_COMPILER ${TOOLCHAIN_PREFIX}${TOOLCHAIN_API_VERSION}-clang++)

set(CMAKE_C_FLAGS "-fPIE -fPIC -mfpu=neon" CACHE STRING "" FORCE)
set(CMAKE_ASM_FLAGS "${CMAKE_C_FLAGS}" CACHE STRING "" FORCE)

set(CMAKE_OBJCOPY ${ARM_TOOLCHAIN_DIR}/${TOOLCHAIN_PREFIX}-objcopy CACHE INTERNAL "objcopy tool")
set(CMAKE_SIZE_UTIL ${ARM_TOOLCHAIN_DIR}/${TOOLCHAIN_PREFIX}-size CACHE INTERNAL "size tool")
set(CMAKE_AR ${ARM_TOOLCHAIN_DIR}/${TOOLCHAIN_PREFIX}-ar CACHE FILEPATH "" FORCE)

set(CMAKE_FIND_ROOT_PATH ${BINUTILS_PATH})
```

Before you can build Volk, you need to restart your shell so you don't have the sourced environment variables in your path. Do this by either closing and reopening your terminal or just run `bash`.Then you need to manually add the NDK to your path **without** running the environment script we made above. Do that by running the following.

```bash
$ export PATH="$PATH:/home/jsnal-lora/android/arm64/bin"
```

Once you've made that important change, you can build Volk with the following commands.

```bash
$ cd build
$ cmake .. -DCMAKE_INSTALL_PREFIX=/home/jason.long/SS_SDR/Libraries/ARM/Android/volk/ -DBOOST_ROOT=/home/jason.long/SS_SDR/Libraries/ARM/Android/boost/ -DCMAKE_TOOLCHAIN_FILE=../cmake/Toolchains/aarch64-linux-android.cmake -DENABLE_STATIC_LIBS=TRUE -DENABLE_TESTING=OFF
$ make -j
$ make install
```

## LoRa Android App

Now it's time to finally compile the LoRa codebase. By this point you should have all four of the libraries compiled for the proper architecture and in the proper location. If everything has been done properly, just open Android Studio and click the play button to compile and deploy the code. Alternatively, you click the hammer to just compile the code without attempting to deploy it.
