---
title: Networking
description: bleh bleh bleh
---

## Parsing RadioTap Headers

RadioTap is a small header placed at the beginning of every 802.11 network
frame. It provides information about the the packet and the radio that sent the
packet. Not all packets come with a RadioTap header so it's important to check
that the packet capture actually contains RadioTap header. Using `libpcap`, that
can be done like by checking the data-link type.

```c
int link_type;
if ((link_type = pcap_datalink(fp)) == DLT_IEEE802_11_RADIO) {
    printf("Has RadioTap!");
} else {
    printf("No RadioTap :(");
}
```

Once we know that the packet capture contains RadioTap headers, we can get to
parsing out the header. The specification guarantees the following structure.

```c
struct ieee80211_radiotap_header {
        u_int8_t version;
        u_int8_t pad;
        u_int16_t len;
        u_int32_t present;
} __attribute__((__packed__));
```

> Note that the version field will always be 0.

All other fields may or may not be present in the header. In order to know, you
have to check the 32-bit long present value sent with that frame. This is a
rough outline of how that can be done:

1. Check bit 31 of the present field. If this bit is set, then there is another
   32-bit present field before the data section of the header. This can be
   chaining multiple times. So, if there is a second present field, we would
   check bit 63 for a 3rd present field.
2. After all present fields have been read in, bitmasks can be used to figure
   out what data is present. A list of all the available defined fields can be
   found [here](https://www.radiotap.org/fields/defined).
3. Based on what is present, read the data section one field at a time


## Network Security

Notes taken for CSC 474 - Network Security with Dr. Enck.

### Cloud Security

* The cloud is an on-demand network access to shared resources
* Traditional cloud types
    * Infrastructure as a Service (IaaS): Provides computer but not
        software
    * Platform as a Service (PaaS): Provides tools and libraries to
        work
    * Software as a Service (SaaS): On-demand software
    * Storage as a Service (STaaS): Provides storage
* Benefits of cloud computer: efficiency, on-demand, **security**
* Makes security hard: data confidentiality/integrity, trust,
    availability
* Private clouds are managed within a company
* Public cloud platforms pool resources across many different users

##### Virtualized Execution

* Protection domain is extended to operating systems on one physical
    platform
* Possible security benefit due to isolation between host and guest
* Types of virtual machines
    * Full system simulation/emulation (QEMU)
    * Paravirtualization (Xen)
    * Native virtualization (VMWare)
    * Application virtualization (JVM)
* Improve with VMM (hypervisor) for better performance
* Types of hypervisors
    * Software installed directly on hardware (KVM)
    * Hypervisor process running on host OS (VirtualBox)
* Multi-tenants of the cloud makes it possible for certain attacks
* Hypervisors do not provide absolute isolation
* Side channels
    * Anytime two processes share resources, there is a potential side
        channel
    * For example, shared cache between two servers
    * Now public clouds have dedicated hosts
* Spectre attack in 2018
    * Modern microprocessors commonly speculate execution of
        performance
    * Data is saved into cache while doing speculative execution
    * Can infer information from this
* Containers (Docker)
    * Isolated process or group of processes in an OS
    * Namespaces isolate containers from each other
    * Host kernel enables system calls for each container
* Function-as-a-Service (FaaS)
    * FaaS is the most popular type of serverless computing
    * Processes don't run and wait for new connections
    * Code that runs for a short amount of time than it goes away
* Secure Enclaves
    * Software Guard Extensions (SGX) provide trusted execution
        environment
    * Enclave code and data reside in protected physical memory (EPC)
    * Involves some amount of overhead
    * Specifically does not handle address side-channel attacks

##### Cloud Storage Security

* VM OS and Container images are read-only
* Performance: enables elasticity (on-demand)
* Security: malicious changes can easily be reverted
* Developers often public images with secrets in them
* Persistent storage: how to define access control to storage
    * Access keys?
* Homomorphic encryption: cryptosystem in which algebraic operation on
    the ciphertext is equivalent to some algebraic operation
    * Way too slow

### DNS Security

* Maps a domain name to an IP address
* Old way:
    * Each host stores a mapping between hostnames and IP addresses
    * This doesn't scale for a larger internet
* Domain Name System (DNS)
    * Created in 1983
    * Distributed translation service between hostnames and IP
        addresses
    * Organized as a tree, with a root nameserver at the top
    * Each **top-level domain (TLD)** served by separate root
        nameserver
    * Domain information is stored as a **zone record**
    * **Authoritative name server:** gives authoritative results for
        hostnames that have been configured via zone records
    * **Domains** are registered with a domain name register
    * DNS records:
        * A records: maps a hostname to IPv4 address
        * AAAA records: maps a hostname to IPv6 address
        * CNAME records: specifies alias for hostname
        * MX records: maps hostname to list of mail transfer agents
        * SOA records: specifies authoritative info about zone
        * TXT records: originally notes, now also machine data

##### Attacking DNS

* Nothing is authenticated
* Spoofing DNS becomes a dangerous problem
* Relies heavily on caching for efficiency, can be abused
* Cache poisoning attack
    * All DNS requests have a unique query ID, 16-bit query IDs
    * Nameserver/resolver uses this to match up requests and responses
    * An adversary can guess the query ID, then it can forge responses
    * Send the correct query ID before the real request is returned
* Attack limitations
    * Victim hostname must not already be cached
    * Randomizing the query ID makes the race condition way harder
* Kaminsky attack
    * DNS response can update the IP address of the nameservre for a
        domain
    * Try resolving hostname that is not cached by the resolver
    * Repeat on different hostnames until successful (shouldn't be
        cached)
    * Changes the nameserver directly instead of poisoning it
* Solutions to Kaminsky attack
    * Make sure the randomness is good
    * Issue requests from random source ports
    * 0x20 encoding, so ncsu.edu becomes NCsU.edU
* Side channel attacked (SAD)
    * Guess the random source port by probing UDP connections
* DNSsec
    * A standard to secure DNS
    * Prevents data spoofing and corruption
    * Public key based solution to verifying DNS
    * Problems: Not everyone deploys the solution, can't afford it
* DNS privacy
    * DNS over TLS provides confidentiality
    * Firefox and Chrome enabled by default
    * ISPs want DNS data, so it hasn't happened

### Firewalls and Tunnels

##### Firewalls

* Firewalls filter traffic based on policy
    * Determines acceptable traffic
    * Access control over traffic
    * Accept or deny connections
* May perform other duties: logging, flagging: quality
* IP Firewall Policy:
    * Maps attributes to address and ports
    * Rules typically refer to IP addresses, not hostnames
    * Protocol is transport not application
* Default accept vs. Default deny
    * Default policies specifies what to do if no other policy applies
    * Default accept (blocklist or denylist)
        * Specifies connectivity that is explicitly disallowed
        * Less secure
    * Default deny (allowlist)
        * Specifies connectivity that is explicitly allowed
        * More secure but breaks functionality
        * Most organizations default
* Rules order
    * Firewall rule order matters
    * Can optimize firewall performance
    * Most common rules on the top
* Stateless vs. Stateful
    * Stateless: each packet considered in isolation
        * Much faster
        * More complex rules, less secure, difficult handling
    * Stateful: allow historical context consideration
        * Simpler, more secure, can handle FTP
        * Slower processing of packets
* DMZ (De-militarized Zone)
    * Sometimes called a "screened subnet" or "perimeter network"
    * Internal network is "trusted" whereas the DMZ is "semi-trusted"
    * Public facing servers are often placed in the DMZ
* Many issues with firewalls
    * Most network traffic now transmitted over HTTP
    * Does not help once the attacker is inside the network
* Basics of `iptables`
    * INPUT: packets destined for the host
    * OUTPUT: packets leaving from local processes
    * FORWARD: used when host is a gateway
    * Firewall policies are typically a script with iptables commands
    * Rules are then added (using -A)

##### Tunnels

* Virtual Private Networks (VPNs)
    * Provides secure access to private network over public links
    * Often, goal is to provide access to intranet from outside
    * Achieves confidentiality, integrity, mutual authentication

###### Building a VPN

* Cannot change the underlying protocol
* Mostly uses IPsec
    * Used for gateway to gateway tunnels
    * IP-layer security
    * 3 different parts
        * Policy management
        * Key management
        * Packet processing

###### IPsec: Packet Processing

* Two modes: Transport and Tunnel
    * Transport
        * Keep the original IP header
        * Insert the AH or ESP header after and data
    * Tunnel
        * New IP header
        * AH or ESP header after and the data
        * Totally encrypted tunnel between gateways
* Two protocols: AH and ESP
    * Authentication Header (AH):
        * Provides authenticity and integrity with HMAC
        * Over immutable IP headers and data
        * Authenticity of data and IP header is protected
        * Mutable fields aren't checked (e.g. TTL)
        * Confidentiality of data is not preserved
        * Does not work with NAT
    * Encapsulating Security Payload (ESP):
        * Confidentiality, authenticity, and integrity with HMAC
        * Over IP payload (data)
        * The whole packet is fully secured
        * TCP/UDP ports are hidden when encrypted

###### Configuration and Policy

* Security Associations (SAs): keys, cipher suites
* Security Policy (SP): what SAs to apply
* Security Parameters Index (SPI): carried in AH and ESP headers to
    enable to the receiving system to select the SA under which packet
    will be processed
* SA Database (SAD): holds parameters for each SA
* SA Bundle: more than 1 SA can apply to a packet
* SA Policy Database (SPD): decide which traffic to protect, has
    incoming traffic been properly secured
    * Discard, bypass, protect

### Intrusion Detection Systems

* Authorized eavesdropper that listens in on network traffic
* Makes determination if traffic contains malware
* If malware is detected, an alert is raised
* Intrusion detection is a **classification problem**
* Detection via Signatures
    * Does packet match some signature (suspicious headers or
        payloads)
    * Great at matching known signatures
* Detection via Machine Learning
    * Assumption is malware will look different from non-malware
    * If malware looks like the training data, it can miss it
    * Training data could be incorrect, false learning
* Confusion Matrix
    * What constitutes an intrusion is a matter of definition
    * Quality determined by the consistency with a given definition
    * Remember this for the exam
* Recall (sensitivity): fraction of correct instances among all
    instances that are actually positive
* Precision: fraction of correct instances that algorithm believes are
    positive
* Base rate fallacy
    * Occurs when we assess P(X\|Y) without considering prior
        probability of X and the total probability of Y
    * What is the "true alarm rate", or the rate that the raised alarm
        is true
    * There is a high percentage that network administrators shouldn't
        care
* Receiver Operating Characteristic (ROC) curve
    * Curve shows that detection/false positive ration
* Problems with IDSes
    * Very difficult to get both good recall and precision
    * Malware comes in small packages
* Software defined networking (SDN)
    * Get more flexibility within your network stack (especially
        routing)

### Malware

* **Malware** is a generic term for 'malicious software'
* It can target any type of computer system
* Types of malware:
    * Virus: malicious code that is spread through infected
        programs/files
    * Worm: directly uses a network service to spread itself
    * Trojan horse: malicious software embedded in a 'useful' program
* Hides using a rootkit, software that provides privileged access
    while hiding
    * Persistent: stored on disk
    * Non-persistent: only in memory, not stored on disk
* Bots and Botnets
    * Malware that accepts remote commands from an attacker is a
        **bot**
    * A large collection of these systems is called a **botnet**
    * Botnet operators use command and control systems to manage their
        bots
        * Historically, IRC. More recently HTTP
* Goals
    * Passwords, credit cards, corporate records
    * Cause mayhem on a company or person
    * Ransomware to extort someone for money
    * Gain computing resources
* Distributed Denial of Service (DDoS) is a network oriented aimed to
    prevent access to host or service
* Drive-by download is when a browser is exploited to install malware
    withot the victim's knowledge

##### Ransomware

* Designed to extort the user in exchange for access to something of
    value
* Crypto-ransomware is the most common form of attack
    * Encrypts data file-by-file but the attacker keeps a secret from
        a victim
* Best to use a hybrid symmetric and asymmetric crypto
    * Symmetric so that it is fast
    * Asymmetric so the binary can't be reverse-engineered for the key
* Attackers want to be trustworthy in general, and they want money
* Paying the ransom is the only time the victim and attacker interact
    * Visa or MasterCard would be to easy to find
    * Cryptocurrency is the most popular way (still trackable)
* Ransomware developers face the same problems as normal developers
* Good ransomware has the following
    * ransomware uses command and control
    * generates unique public/private keypair for each victim
    * encrypts each file with public key
* Don't pay to get the data back so it doesn't motivate the developers
    more

##### Malware Defense

* Run updated software from trusted sources
* Be wary of removable media from untrusted sources
* Static detection
    * Examine file for similarity to known malware
    * Keep hashes of all important files on disk to detect
        modifications
* Dynamic detection
    * Monitor what happens to programs as it runs
    * Sequence of system calls made by a program

### Network Security

##### Basics of Web Development

* Uniform Resource Identifier (URI)
    * More generic form of resource access
    * URL is a type of URI
    * `<scheme>:<authority>/<path>?<query>#<fragment>`
    * Some characters are reserved so use percent encodings
    * Can also be relative to current network-path
* JavaScript
    * Supported by all browsers
    * Code can be embedded into HTML pages using `script` tags
    * Run locally on the browser process
* Document Object Model (DOM)
    * JavaScript interface to manipulate client-side content
    * Accessed using the `document` object
    * Allowed to handle events and traverse tree
    * Cross browser DOM programming is really difficult (jQuery)
* Browser Object Model (BOM)
    * Interface to everything outside the document
    * Not a real standard but supported by most browsers

##### Browser Security

* Same Origin Policy
    * Document or script cannot access data from another origin
    * Two pages have the same origin if:
        * same protocol, port, and hostname
    * Helps to restrict JavaScript access DOM or cookies maliciously
    * Does not apply to every HTML tag (`<img>`, `<script>`)
    * Many limitations: domain not precise enough, undefined behavior
* Cross-Origin Resource Sharing (CORS)
    * Allows the server to inform browsers that SOP violations are
        okay
    * Enforced on the return packet
* Drive-by download
    * Web based exploits that target browsers and their plugins
    * Usually based on JavaScript
* Browser extensions
    * Malicious extensions can do anything within the browser
    * Inject advertisements, keylogger, steal credentials
* Browsers should separate privilege between tabs

##### Server Security

* Common Gateway Interface (CGI)
    * Generic way to call external applications on the server
    * Passes URL to external program
    * Result is captured and returned to requestor
* Cross-Site Scripting
    * Injecting runnable code into a dynamic webpage
    * Persistent: `<script>` tag is stored somewhere on the web server
    * Reflected: `<script>` tag not stored but in URL the user click
* Injection Attacks
    * An attacker can inject arbitrary inputs into the system to
        control
    * Shell inject: run code on the shell of the server
    * Code inject: run controlled code to manipulate environment
    * SQL inject: inserts escaped code into the input to read from
        database

### Routing

##### Primer on Routing

* Each host knows the prefix of the local network
* All nodes within a local network are reachable within 1 hop
* Classless notation: BaseAdress/Prefix
    * 10.0.0.0/24 is 10.0.0 with 256 host addresses
    * 10.0.0.1 is the gateway
    * 10.0.0.255 is the broadcast
* Routing outside local subnet
    * Specifies receiver's IP address in IP header
    * Specifies router's MAC address in ethernet header
    * Router relays message

##### Routing Attacks

* Attacker can change path of traffic to: see, modify, or drop traffic
* Routers exchange topology and cost information
* Calculates the shortest path to each destination
* Attackers can lie to other routers
    * Each router has no knowledge of real connectivity
    * They just look at the packet they receive and send it to the
        next hop
* Two flavors of routing
    * Internal (Intradomain): Open Shortest Path First (OSPF)
        * Each node announces its own connectivity
        * Each node re-announces all information received from peers
        * Every node learns the full map of the network
        * Uses Dijkstra's algorithm to calculate shortest path
        * Can't scale to large network topologies
    * External (Interdomain): Border Gateway Protocol (BGP)
        * Mostly a path vector protocol
        * Routes information at the autonomous system level
        * BGP routes between border routers or AS
        * Origin announcements: claim ownership of address space
        * Route advertisements: claim to know how to get to another AS
        * Route withdrawal: remove self
* BGP attacks
    * Prefix hijacking
        * An attacker can claim to own a known prefix
        * Could easily impersonate AT&T, for example
    * Sub-prefix hijacking
        * Send all traffic towards you
        * Longest-prefix matching: more specific prefix's will be
            preferred
    * Path forgery:
        * An AS_PATH attribute is completely forged, attacker controls
            traffic
        * Allows for traffic analysis
    * Other attacks: link cutting, controlling the router, physical
        destruction
* Solving BGP security
    * Most techniques are deployed on a local level: filtering, secure
        peering
    * Complex protocols have been proposed
    * Filtering
        * Drops BGP message as they are passed between ASes
        * Ingress (received) or egress (sent) filtering
        * Filter by prefix, path, policy
        * Simple and effective but can be unfair
    * Resource public key infrastructure (RPKI)
        * Establishes a hierarchy based on the allocation of CIDR
            addresses
        * Benefits: offline cryptography, protection from hijacks
        * Challenges: offline RPKI, does not work for route leaks or
            shortening
    * BGPsec
        * Seek to cryptographically protect the AS path in
            announcements
        * Challenges: validating signatures is expensive, all routers
            must change

### Net Background

* Structure of the internet (OSI layers):
    1.  Physical layer
    2.  Link layer
    3.  Network layer
    4.  Transport layer
    5.  Application layer
* Physical communication goes down the physical layer then up the
    relevant layer
* The **internet** is a collection of independently operated
    autonomous systems (ASes)
* Switched networks are end-hosts connected to switches
    * Forwarding nodes
    * At least two links
    * Also known as bridges or routers
* **Packets** are discrete blocks of data
    * Each packet is independently switched
    * Endpoint handles putting them back together
* Networking is fundamentally about transmitting information between
    two devices
    * Lots of abstractions and components
    * Standard protocols (IP, TCP, UDP)
* Since the internet is so large, it is extremely vulnerable to
    attacks
* Person in the middle and denial of service attacks are the largest
    areas of attacks

##### Layer 4 Attacks

* Transport layer is the last layer before the application, think
    process-to-process communication
* Reliability and flow control are implemented in this layer
* Ports are for **multiplexing**
    * Tells the OS where the incoming message should be sent
    * Servers have a static port, clients choose a random source port
* User Datagram Protocol (UDP)
    * Unreliable transport
    * Provides integrity protection
    * Doesn't handle: out of order delivery, lost packets, duplication
* Transmission Control Protocol (TCP)
    * Handles the shortcomings of UDP
    * Relies on ACKs or acknowledgements
    * Provides flow control to prevent congestion
    * Provides congestion control to handle congestion
    * TCP initializes the connection with a three-way handshake

###### SYN Flooding

* Attacker sends many TCP SYN packets without responding with SYN-ACK
* A type of denial of service attacks
* Solutions: filtering, recycle oldest half-open TCP connection, SYN
    cookies

###### TCP Reset (RST) Attacks

* RST header flag is set, the TCP connection is dropped
* Attacker can forge TCP packets from sender with RST header set, but
    they must get the sequence number correct
* Used to stop traffic

###### Port Scanning

* A port scan is a method to determine
    * what hosts are on a network
    * what services they run (usually by port)
* Often first step of attacker reconnaissance and defender penetration
    testing
* Types of port scanning:
    * TCP scanning: unprivileged using connect() system calls
    * SYN scanning: privileged, monitors the response but does not
        open full connection
    * UDP scanning: checks if UDP port is reachable
    * ACK scanning: determines if a port is filtered or unfiltered by
        a firewall
    * FIN scanning: closed ports reply to a FIN packet with the
        appropriate RST packet
    * X-mas scan: similar to FIN scan but sends packets with FIN, URG,
        and PUSH flags

##### Layer 3 Attacks

* Deliver a packet to a network destination
* Perform segmentation and reassembly
* Internet protocol (IP)
    * IP allows networks to interoperate
    * Allows applications to function on all networks
* All of the network header is unencrypted

###### IP Spoofing

* Set your IP to something else to appear as someone else
* Used for firewall allowlists and possibly authentication
* Easier to perform DoS attacks if it's from different IPs

###### TCP Sequence Numbers

* ISN are predictable based on the TCP implementation
* Possible solutions:
    * Rapidly change the ISNs
    * Randomize ISNs using the port numbers: ISN = Timer +
        F(localhost, localport, remotehost, remoteport)

###### Source Routing

* Can specify the route that the packet takes
* Problems: Access control and denial of service
* Block packets with a source-routing flag enabled

###### Network Address Translation (NAT)

* Take a single public IP addresses and map it to many private IP
    addresses
* UPnP can tunnel traffic from a private IP directly

##### Layer 2 Attacks

* Combine a stream of bits into frames
* Send data frames between peers
* MAC address is a hardware address of a device
* Use a MAC address to send datagram

### Wireless Security

* Everybody is broadcasts as load as possible
* Easier to eavesdrop
* Finding wireless networks is easy
* High-level overview of wireless networking
    * Protocols defined in IEEE 802.11 standards
    * Access pointers (AP) periodically broadcast beacon frames to
        advertise presence
    * Client sends authentication frame to AP
    * If successful, client sends association request frame to AP,
        requesting resources
    * Data sent via data frames
    * Session may terminate by AP
* Problems with wireless
    * Everyone can hear what you're saying (sniffing)
    * Anyone can join a network
* Filter data frames by MAC address
    * Too easy to spoof a MAC address (BSSID)
* Service Set Identifiers (SSID) hiding
    * Anyone could still join the network if they could guess the SSID

##### Solving with Cryptography

* Wired Equivalent Privacy (WEP)
    * Part of 802.11 standard, used a stream cipher
    * Uses RC4: supports seed up to 256-bits (24-bit IV + WEP key)
    * Seed was too small, later increased
    * Authentication modes:
        * Open system: anyone can join but can only send/receive with
            correct key
        * Shared key: must have key to join but data sent is in
            plaintext
    * Shared key vulnerability:
        * Challenge with random string
        * Response is {IV, random string xor RC4(K, IV)}
        * Eavesdropper can intercept the challenge and response
        * challenge xor response = RC4(K, IV)
    * IVs are too small and will result in collisions
        * When IVs are the same, and xor of the plaintexts can be
            produced
* Wi-Fi Protected Access (WPA)
    * PSK (Pre-shared key): shared secret manually entered into all
        devices
    * 802.1x mode: authentication handled by backend service via
        extensible authentication protocol (EAP)
    * Temporal key integrity protocol (TKIP):
        * Uses RC4 but designed to improve upon WEP's shortcomings
        * Increases size of IV to 48 bits
    * AES:
        * Supported by newer WPA2 protocol
        * Runs AES in stream-cipher like way
    * Eduroam based WiFi
        * Based on the 802.1x protocol
        * Better than MAC address-based authentication
        * Make leak credentials if attached to a rogue AP
    * Most attacks rely on weak passwords
    * KRACK attack: trick victim into using already-in-use key
* WPA3
    * Replaces WPA2-PSK with SAE protocol
    * Based on DH key exchange
    * Easy connect for setting up devices without a display
    * Encryption even on open WiFI
* WiFi jamming
    * Wireless signals are subject to jamming
    * Analog jamming: decrease signal-to-noise ratio by flooding with
        radio waves
    * Digital jamming: exploit multiplexing scheme to consume all
        channel bandwidth
* Spread spectrum transmission
    * Spread the signal across the whole spectrum
