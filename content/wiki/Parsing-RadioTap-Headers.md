---
title: Parsing RadioTap Headers
tags: [c++, wiki]
---

RadioTap is a small header placed at the beginning of every 802.11 network frame. It provides information about the the packet and the radio that sent the packet. Not all packets come with a RadioTap header so it's important to check that the packet capture actually contains RadioTap header. Using `libpcap`, that can be done like by checking the data-link type.

```c
int link_type;
if ((link_type = pcap_datalink(fp)) == DLT_IEEE802_11_RADIO) {
    printf("Has RadioTap!");
} else {
    printf("No RadioTap :(");
}
```

Once we know that the packet capture contains RadioTap headers, we can get to parsing out the header. The specification guarantees the following structure.

```c
struct ieee80211_radiotap_header {
        u_int8_t version;
        u_int8_t pad;
        u_int16_t len;
        u_int32_t present;
} __attribute__((__packed__));
```

> Note that the version field will always be 0.

All other fields may or may not be present in the header. In order to know, you have to check the 32-bit long present value sent with that frame. This is a rough outline of how that can be done:

1. Check bit 31 of the present field. If this bit is set, then there is another 32-bit present field before the data section of the header. This can be chaining multiple times. So, if there is a second present field, we would check bit 63 for a 3rd present field.
2. After all present fields have been read in, bitmasks can be used to figure out what data is present. A list of all the available defined fields can be found (here)[https://www.radiotap.org/fields/defined].
3. Based on what is present, read the data section one field at a time
