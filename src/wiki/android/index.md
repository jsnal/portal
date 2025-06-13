---
title: Android
description:
---

## Returning ArrayList from Android JNI

This is some example code that can be used to return an `ArrayList<String>` from
C++ to Kotlin. Since there isn't a `jarraylist` in JNI, we have to use `jobject`
and manually invoke the constructor. In this case, we are going from a
`std::vector<const char*>` to `ArrayList<String>` so we will have to invoke the
`ArrayList` contructor and then start appending `jstring`s to it.

```cpp
extern "C"
JNIEXPORT jobject JNICALL
Java_com_example_jni_JNITest_testing(JNIEnv *env, jobject)
    // Setup a sample vector
    std::vector<std::string> my_strings;
    my_strings.push_back("A");
    my_strings.push_back("B");
    my_strings.push_back("C");
    my_strings.push_back("D");

    // Kotlin ArrayList Class
    jclass array_class = (*env).FindClass("java/util/ArrayList");
    jmethodID array_class_init = (*env).GetMethodID(array_class, "<init>", "(I)V");
    jmethodID array_class_add = (*env).GetMethodID(array_class, "add", "(Ljava/lang/Object;)Z");

    // Create the ArrayList
    jobject string_array_list = (*env).NewObject(array_class, array_class_init, (int) my_strings.size());

    for (const auto &string : my_strings) {
        jstring j_string = (*env).NewStringUTF(string);

        (*env).CallBooleanMethod(packet_information_array_list, array_class_add, j_string);

        (*env).DeleteLocalRef(j_string);
    }

    return string_array_list;
}
```

> Note that when creating `string_array_list`, we cast the `size_t` to an `int`.
> If your vector is huge, you may want to cast to a `long`.

## Get APK Data Path

You can get the data path for a specific APK on your phone using adb.

```
$ adb shell pm list packages -f -3
```

For example, I can get the data path for some app.

```bash
$ adb shell pm list packages -f -3 | grep <APP_NAME>
package:/data/app/<APP_NAME>-7MStonnG3kpngakuEmnwEw==/...
$ cd /data/app/<APP_NAME>-7MStonnG3kpngakuEmnwEw==
$ ls
base.apk lib
```
## Make regular Kotlin objects Lifecycle aware

I've found myself trying to bind a plain old Java object (POJO) to an Android
lifecycle so many times. It's really common to have an object that keeps up with
the device battery life and posts changes to a `LiveData` object. The problem
is, you have to observe the battery life on an Android broadcast which means you
need to have a context instance. Of course, this can result in a memory leak if
the context is destroyed but the this object still references it, thus it's
never garbage collected. Then, the next time the view is created, a new context
is passed into a new object.

To deal with this, Android gives us `LifecycleObserver` which allows a regular
object to observe the lifecycle changes of an Android view. For example, say we
have a `MainActivity` and a helper class that checks the time every second (bad
example, I know). Our helper class may look something like this:

```kotlin
class TimeHelper
{
    private var time = MutableLiveData(0)

    fun getTime(): LiveData<Long> = time

    private val timeTrackingScope = CoroutineScope(Dispatchers.Default)

    private var timeTrackingJob: Job? = null

    fun startTrackingTime() {
        stopTrackingTime()

        timeTrackingJob = timeTrackingScope.launch {
            while (isActive) {
                time = System.currentTimeMillis()
                delay(Duration.ofSeconds(1).toMillis())
            }
        }
    }

    fun stopTrackingTime() {
        timeTrackingJob?.cancel()
    }
}
```

This simple Kotlin class just tracks the current time in milliseconds every
second. Not the greatest implementation but it's common to do something like
this. The problem is, when do we start and stop tracking the time? Well, we can
observe the lifecycle state of the `MainActivity` so the `TimerHelper` class
knows when to start and stop. We can use the `DefaultLifecycleObserver` for
this.

```kotlin
class TimeHelper : DefaultLifecycleObserver
{
    private var time = MutableLiveData(0)

    fun getTime(): LiveData<Long> = time

    private val timeTrackingScope = CoroutineScope(Dispatchers.Default)

    private var timeTrackingJob: Job? = null

    private fun startTrackingTime() {
        stopTrackingTime()

        timeTrackingJob = timeTrackingScope.launch {
            while (isActive) {
                time = System.currentTimeMillis()
                delay(Duration.ofSeconds(1).toMillis())
            }
        }
    }

    private fun stopTrackingTime() {
        timeTrackingJob?.cancel()
    }

    override fun onResume(owner: LifecycleOwner) {
        startTrackingTime()
    }

    override fun onPause(owner: LifecycleOwner) {
        stopTrackingTime()
    }
}
```

Now, based on the state of some lifecycle the `TimerHelper` will start and stop.
However, we still haven't hooked up this object to the `MainActivity`. The last
step is to register the observer with the `MainActivity`'s lifecycle owner.

```kotlin
class MainActivity : AppCompatActivity
{
    override onStart() {
        super.onStart()

        getLifecycle().addObserver(TimeHelper())
    }
}
```

With that change, the `TimeHelper` object will start and stop with the lifecycle
of the `MainActivity`. So if the `MainActivity` were to be destroyed, the
`TimeHelper` object would eventually be garbage collected. Pretty cool!

Learn more about the [Android
lifecycle](https://developer.android.com/topic/libraries/architecture/lifecycle)

## Cross Compile GNU Radio for Android

Follow these steps to cross compile the GNU radio applications and all of its
dependencies for Android.

### Preparation

#### Get the Android NDK

Grab the latest Standalone Android NDK toolchain. At the time of writing this
the latest version is 21 but it may different by the time you're reading this.

```bash
$ wget http://dl.google.com/android/repository/android-ndk-r<VERSION>b-linux-x86_64.zip
$ unzip android-ndk-r<VERSION>b-linux-x86_64.zip
```

#### Create a standalone toolchain

You then need to make your own standalone toolchain. The command below will
build the toolchain for `arm64` and put it in `~/android/arm64`. If you need
32-bit `arm` you can do change the `--arch` flag to `arm`.

Since Android also has an API, you may want to specify the API version to build
for. To do this use the `--api` flag. If you don't specify, like in my example
command, it will assume version 21 for `arm64` and 16 for `arm`

```bash
$ cd android-ndk-r<VERSION>b/build/tools
$ ./make_standalone_toolchain.py --arch arm64 --install-dir=/path/to/android/arm64
```

#### Add it your PATH

Next we want to add the new toolchain you just generated to your PATH and other
build variables. To do this, I just wrote a simple script to source the
variables into my current shell.

```bash
#!/bin/bash

export PATH="$PATH:/path/to/android/arm64/bin"

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

It is assumed for the rest of the steps that you sourced this file into your
environment. I just called this script `env.sh` and can source it with the
following commands.

```bash
$ chmod +x env.sh
$ source env.sh
```

#### Dependencies

These are some dependencies that you are going to need to compile one or more of
the libraries below.

```bash
$ sudo apt install cmake make autoconf automake binutils python3-distutils
```

### FFTW

Now it's time to build [FFTW](http://www.fftw.org/). Assuming you have sourced
the NDK into your PATH, these are the steps you should follow.

```bash
$ wget http://www.fftw.org/fftw-3.3.2.tar.gz
$ tar xf fftw-3.3.2.tar.gz
$ cd fftw-3.3.2
$ ./configure --prefix=/path/to//fftw3/ --host=$target_host --enable-single --enable-static
$ make -j
$ make install
```

### Liquid-dsp

You can find liquid-dsp [here](https://github.com/jgaeddert/liquid-dsp.git).
Liquid-dsp **requires** Android API 23 or higher to build. Make sure
`api_version` is 23 or higher. See
[here](https://android.googlesource.com/platform/bionic/+/master/docs/status.md#libm)
for more details. See below for an example.

```bash
api_version=23
```

Get started by cloning down the repository and running the `bootstrap.sh` script.

```bash
$ git clone https://github.com/jgaeddert/liquid-dsp.git
$ cd liquid-dsp
$ ./bootstrap.sh
```

Before you run the configuration, you need to comment out some library checks in
the `configure.ac` file. Specifically you need to remove the `AC_FUNC_MALLOC`
and `AC_FUNC_REALLOC`. Edit the `configure.ac` file and see the changes below.

```txt
AC_FUNC_ERROR_AT_LINE
# AC_FUNC_MALLOC
# AC_FUNC_REALLOC
```

From this point, the build is pretty typical.

```bash
$ ./configure --prefix=/path/to/liquid/
$ make -j
$ make install
```

### Boost

Cross compiling Boost takes some configuration in the build files so pay
attention closely. To begin grab the latest release and untar it.

```bash
$ wget http://dl.bintray.com/boostorg/release/1.65.1/source/boost_1_65_1.tar.bz
$ tar xf boost_1_65_1.tar.bz2
$ cd boost_1_65_1
```

Next we are going to configure Boost. We only want to install three of the Boost
libraries (system, filesystem, thread).

```bash
$ ./bootstrap.sh --prefix=/path/to/boost/ --with-libraries=system,filesystem,thread
```

This should generate a `project-config.jam` file in the root of the project.
Open this in a text editor and make the following edits.

```jam
if ! gcc in [ feature.values <toolset> ]
{
  using clang : android
  :
  /path/to/arm64/bin/aarch64-linux-android23-clang++
  :
  <archiver>/path/to/android/arm64/bin/aarch64-linux-android-ar
  ;
}
```

Once you've changed those, you can build and install the Boost library.

```bash
$ ./b2 architecture=arm toolset=clang-android target-os=android link=static install

# Run again without link=static so it builds shared objects
$ ./b2 architecture=arm toolset=clang-android target-os=android install
```

### Volk

You should have built and installed Boost in the last step. This is important
because Volk heavily depends on Boost. Get started by cloning Volk.

```bash
$ git clone https://github.com/gnuradio/volk.git
$ cd volk
$ mkdir build
```

Currently, there is an issue with Volk static library linking for `arm` and
`arm64` that causes the Volk profiler build to fail. To get around this, you
must disable the `/apps` subdirectory. Open up the root `CMakeLists.txt` and
comment out these two lines.

```cmake
# add_subdirectory(apps)
# add_subdirectory(python/volk_modtool)
```

Next, you need to add a cmake toolchain. Create and edit a file in
`cmake/Toolchains/aarch64-linux-android.cmake`

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

Before you can build Volk, you need to restart your shell so you don't have the
sourced environment variables in your path. Do this by either closing and
reopening your terminal or just run `bash`. Then you need to manually add the
NDK to your path **without** running the environment script we made above. Do
that by running the following.

```bash
$ export PATH="$PATH:/path/to/android/arm64/bin"
```

Once you've made those important changes, you can build Volk with the following
commands.

```bash
$ cd build
$ cmake .. -DCMAKE_INSTALL_PREFIX=/path/to/volk/ -DBOOST_ROOT=/path/to/boost/ -DCMAKE_TOOLCHAIN_FILE=../cmake/Toolchains/aarch64-linux-android.cmake -DENABLE_STATIC_LIBS=TRUE -DENABLE_TESTING=OFF
$ make -j
$ make install
```

## Source and Destination must be different error

When building native NDK cpp code I frequently get an error that looks something
like this...

```
Source path/to/libfoo.so and destination path/to/libfoo.so must be different
```

After looking into it I found that the root cause was that the model generation
task was broken if ran from a non-clean build. It seems the temporary fix for
now is to run clean, refresh the linked C++ projects, and then finally build the
project. If this doesn't work, it'll likely something in the build is causing
the project to regenerate. The best solution in that case is to downgrade gradle
from plugin 4.0.0 to 3.6.2.

There is a issue thread
[here](https://issuetracker.google.com/issues/158317988). A fix has been
scheduled to be released with gradle plugin 4.0.1.
