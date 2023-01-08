---
title: Returning ArrayList from Android JNI
tags: [c++, android, wiki]
---

This is some example code that can be used to return an `ArrayList<String>` from C++ to Kotlin. Since there isn't a `jarraylist` in JNI, we have to use `jobject` and manually invoke the constructor. In this case, we are going from a `std::vector<const char*>` to `ArrayList<String>` so we will have to invoke the `ArrayList` contructor and then start appending `jstring`s to it.

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

> Note that when creating `string_array_list`, we cast the `size_t` to an `int`. If your vector is huge, you may want to cast to a `long`.
