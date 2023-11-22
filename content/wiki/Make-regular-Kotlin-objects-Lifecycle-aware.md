---
title: Make regular Kotlin objects Lifecycle aware
tags: [kotlin, android, wiki]
updated: July 16 2023
---

I've found myself trying to bind a plain old Java object (POJO) to an Android lifecycle so many times. It's really common to have an object that keeps up with the device battery life and posts changes to a `LiveData` object. The problem is, you have to observe the battery life on an Android broadcast which means you need to have a context instance. Of course, this can result in a memory leak if the context is destroyed but the this object still references it, thus it's never garbage collected. Then, the next time the view is created, a new context is passed into a new object.

To deal with this, Android gives us `LifecycleObserver` which allows a regular object to observe the lifecycle changes of an Android view. For example, say we have a `MainActivity` and a helper class that checks the time every second (bad example, I know). Our helper class may look something like this:

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

This simple Kotlin class just tracks the current time in milliseconds every second. Not the greatest implementation but it's common to do something like this. The problem is, when do we start and stop tracking the time? Well, we can observe the lifecycle state of the `MainActivity` so the `TimerHelper` class knows when to start and stop. We can use the `DefaultLifecycleObserver` for this.

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

Now, based on the state of some lifecycle the `TimerHelper` will start and stop. However, we still haven't hooked up this object to the `MainActivity`. The last step is to register the observer with the `MainActivity`'s lifecycle owner.

```kotlin
class MainActivity : AppCompatActivity
{
    override onStart() {
        super.onStart()

        getLifecycle().addObserver(TimeHelper())
    }
}
```

With that change, the `TimeHelper` object will start and stop with the lifecycle of the `MainActivity`. So if the `MainActivity` were to be destroyed, the `TimeHelper` object would eventually be garbage collected. Pretty cool!

Learn more about the [Android lifecycle](https://developer.android.com/topic/libraries/architecture/lifecycle)

