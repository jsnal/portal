# Introduction

Notes taken while working through various readings on DSP and SDR.

* Digital Signal Processing (DSP): The processing of digital signals in various
  ways. May be used for many signals such as voice, audio, video temperature,
  pressure, etc. The goal of DSP may vary depending on the application.
* Software-Defined Radio (SDR): Software performing signal processing tasks that
  were traditionally performed by hardware, specific to RF/radio application.
* Below are the list of resources used to write these notes:
  * [PySDR](https://pysdr.org)
  
# Frequency Domain

* Time domain represnts how a signal changes over time, usually showing its
  amplitude at each point in time.
* Frequency domain represents the signal's constituent frequencies and their
  magnitudes.
* Signals are always sampled in the time domain because there is no way to
  directly sample a signal in the frequency domain.

## Fourier Series

* Any signal can be represented by sine waves summed together. 
* When a single signal is broken down into its composite sine waves, this is
  called a Fourier series.

![](Images/fourier_series.svg)

* Some signals will require more sine waves than others, and some may even
  require and infinite amount. A signal can always be approximated with a
  limited number.
* Below are the attributes of a sine wave
  * Amplitude: How strong the wave is
  * Frequency: The number of waves per second. Measured in Hertz.
  * Phase: How the wave is shifted in time, anywhere from 0 to 360 degrees (or 0
    to 2\Pi). It must be relative to something to have meaning, such as two
    signals being 30 degrees out of phase with each other.
  * Period: The amount of time, in seconds, for the wave to finish one cycle. It
    is the inverse of frequency or (1 / Frequency).

## Time-Frequency Pairs

* While the time domain show how a signal changes over time, the frequency
  domain shows how much of a signal rests in which frequencies.
* The x-axis will be frequency instead of time.
* A signal can easily be plotted and compared in both domains.

![](Images/time_frequency_pair.svg)

* A signal with a single oscillating frequency will have a single peak in the
  frequency domain.
* The mathematical name for the peak is called an *impulse*
* An impulse in the time domain is completely flat in the frequency domain and
  theoretically contains every frequency.
* Of course, this is not possible in nature as an impulse in the time domain
  would need to be infinitely short. The take away is that quick changes in the
  time domain result in many frequencies in the frequency domain.
  
## Fourier Transform

* The operation used to go from the time domain to the frequency domain and back
  is called a Fourier transform.
* Below are the continuous and discrete equations

![](Images/fourier_transform.png)

* The `j` is simply the imaginary unit, used instead of `i`.
* The continuous form is used in Mathematics, while the discrete form is close
  to what is implemented in code.
  
## Time-Frequency Properties

* There are five properties that tell us what happens in the frequency domain
  when a change is made in the time domain.
* Linearity: If we add two signals in time, then the frequency domain version
  will also be the two frequency domain signals added together. It also tells us
  that multiplying by a scaling factor will scale both signals by the same
  amount.
* Frequency shift: If a time domain signal is multiplied by a sine wave, then
  the frequency domain is shifted by that frequency. This property is used in
  DSP to shift signals up and down in frequency.
* Scaling in time: Scaling in the time domain causes inverse scaling in the
  frequency domain, meaning more bandwidth. In other words, when we transmit
  bits faster we have to use more bandwidth.
* Convolution in time: When time domain signals are convolved, it's equivalent
  to multiplying the frequency domain versions of those two signals. Convolution
  is essentially creating a new signal from input signals. It is used
  extensively in DSP for filters.
* Convolution in frequency: The convolution property also works in reverse
  although it's far less common.

## Fast Fourier Transform (FFT)

* Fast Fourier transform is an algorithm used to compute discrete Fourier
  transform developed decades ago.
* An FFT will have one input, a vector of samples, and one output, a vector of
  the samples in the frequency domain.
* The size of the output is always the same as the size of the input.
* The output will always span the entire x-axis since it's in the frequency
  domain and is separate from the time the signal happened or the number of
  samples.
* The more samples in the input vector, the better resolution in the frequency
  domain. It may also be faster depending on the implementation.
* We cannot see more frequencies by having a larger input, the only way to do
  that is to increase the sample rate.
* The output of an FFT will always be from `-f / 2` to `f / 2` for `f` is the
  sample rate in Hz.
* If the input is complex, the negative and positive portions will be different,
  but if it's real then they will be identical.
* Changing the order things happen in the time domain does not change the
  frequency components that exist in the signal. This is because the order in
  time does not matter.

## Negative Frequencies

* There is no such thing as a negative frequency when it comes to transmitting
  or receiving a RF signal.
* It is a representation we use that is based on complex numbers.
* If an SDR is tuned for 100 MHz with a sample rate of 10 MHz, the SDR may
  returns results from -5 MHz to 5 MHz. We would know that it is tuned for 100
  Mhz and can map the output to 95 MHz to 105 MHz.

## Windowing

* An FFT mathematically assumes that the input signal is periodic. It treats the
  final sample as if it connects directly back to the first sample, creating an
  infinite, repeating loop.
* When the value of the first sample and the last sample are significantly
  different, this will create a sudden transition at the start and end of the
  repeating signal.
* This introduces high-frequency components into the signals spectrum, called
  spectral leakage.
* The solution is to multiple the signal by a window function that tapers to
  zero on both ends. This ensure the signal smoothly starts and ends at zero.
* Popular window functions: Hamming, Hanning, Blackman, and Kaiser.
* Applying no window is often referred to as using a rectangular window.

## FFT Sizing

* The best FFT size is always a power of 2 due to the algorithm used.
* Other sizes may be used but the computation will be noticeably slower.
* The most common sizes range from 128 to 4096.
* For signals with millions or billions of samples, the signals can be broken up
  into blocks where each one gets an FFT computed.

## Spectrogram

* A spectrogram is a plot that shows the frequency over time.
* It can be thought of as stacking a bunch of FFTs together vertically.
* We can also display how the FFT responds in real-time, which is referred to as
  a waterfall.

![](Images/waterfall.png)

# IQ Sampling

* IQ sampling is the form of sampling that an SDR performs, as will as many
  other digital receivers and transmitters.
  
## Basics

* Sampling is the process of periodically taking the value of a continuous,
  analog signal at a specific moment in time.
* An analog to digital converter (ADC) is used to sample and covert the analog
  electrical voltage into a digital number.
* The values of the continuous signal are recorded in regular intervals called
  the sample period.
* The frequency at which samples are taken, number per second, is the sample
  rate measured in Hz.
* The sample rate is the inverse of the sample period.

## Nyquist Sampling

* We must sample at twice the frequency of the signal in order to remove
  false data.
* This is simple when the signal is a simple sine wave, but most signals will
  have many frequency components to them.
* In these cases, the sample rate must be twice the maximum frequency component.
* The minimum rate at which we can sample and still retain all information in
  the signal is known as the Nyquist rate.
* Many SDRs filter out everything above the sample rate / 2 right before the
  sampling is performed to reduce aliasing.
* Because the SDR anti-aliasing filter doesn't go from passband to stopband
  instantly, the rule of thumb is to assume only the center 4/5 of the sample
  rate is usable bandwidth, known as Sean's 4/5 rule.

## Quadrature Sampling

* Quadrature is a term that refers to two waves that are 90 degrees out of
  phase, making them orthogonal to each other.
* Usually `I` is used for cos and `Q` for sin.
* The cosine component is said to be in phase, hence the `I`, and the sine
  component is 90 degrees out of phase or quadrature, hence the `Q`.
* Using an IQ approach allows us to transmit any magnitude and phase we want
  using simple circuitry.
* The important takeaway is when cosine and sine are added, another pure sine
  wave is generated with the same frequency but a different phase and amplitude.
* By adjusting just I or Q, we can control the magnitude and phase which is much
  easier than directly trying to change the attributes.

## Receiver Side

* A real signal is received by an antenna that must be transformed into IQ
  values.
* We happens is we sample the I and Q value individually using two separate
  ADCs, and then combine the pairs and store them as a complex number.
* All of these operations happen inside the hardware of the SDR itself, not in
  the software. The signal has already been converted by the point it gets to a
  program.
* The output of is a 1D array of complex numbers.

## Carrier and Downconversion

* The carrier frequency is the high frequency wave that is used to transmit the
  signal through the air. It's called the carrier because it physically
  transports the signal.
* Modern radio technologies use carrier frequencies between 100 MHz and 6 GHz.
* The problem is, if an SDR tried to sample a high-frequency carrier directly
  with a single ADC, it would require an extremely high sample rate.
  * For a 2.4 GHz carrier it would require a sample rate of 4.8 GHz
* The solution is to downconvert the center frequency of the signal to be 0 Hz
  or DC before any sampling happens.
* Because of this, when an SDR receives a signal and produces IQ values, the
  carrier frequency does not appear in the values itself.
* The process of downconversion, and upconversion on transmit, is done by a
  component called a mixer.

![](Images/receiver_arch_diagram.svg)

## Speed of Signals

* Radio waves are just electromagnetic waves at low frequencies, between roughly
  3 kHz to 80 GHz.
* Visible light and even higher frequencies waves are also part of the spectrum.
* All electromagnietic waves travel at the speed of light, which is about 3e8
  m/s through air.
* The distance the wave travels in one full oscillation, a single cycle of the
  sine wave, depends on its frequency.
* This distance is known as the wavelength and is denoted as lambda.

## Baseband and Bandpass Signals

* A signal centered around 0 Hz is referred to as baseband.
* A signal that exists at some RF frequency nowhere near 0 Hz, that has been
  shifted for wireless transmissions, is referred to as bandpass.
* It's not possible to make a baseband transmission because you can't transmit
  something imaginary. Baseband signals are always complex while bandpass
  signals are also real.
* There is also intermediate frequency, IF, which is the intermediate conversion
  step with in the radio between baseband and bandpass.

## DC Spike and Offset Tuning

* Oftentimes there is a large spike in the center of an FFT.
* This is called a DC offset or DC spike or LO (local oscillator) leakage.
* This happens because SDRs tune to a center frequency, usually around 0 Hz,
  which internally use an oscillator to convert the signal. The oscillator may
  leak additional energy into the signal.
* Removing the extra noise is difficult because it's so close the desired output
  signal.
* Many RF integrated circuits have built-in DC offset removal but will typically
  only work when a signal is already present.
* One quick way to handle this is to over sample the signal and off-tune it, a
  technique called offset tuning.
* For example, say we want to view 5 MHz of the spectrum at 100 MHz. We may
  sample 20 MHz at 95 MHz which will shift the DC spike away from our desired
  signal.
* This does require the signal to be frequency shifted, filtered, and
  downsampled ourselves after the SDR.

# Digital Modulation

* The goal of modulation is to squeeze as much data into the least amount of
  spectrum as possible.
* Transmitting faster will increase the bandwidth, which means more spectrum is
  used.

## Symbols

* The transmit signal is made up of symbols, where each symbol will carry some
  number of bits of information.
* For example, A binary symbol has two values, 0 or 1. Each bit can be
  represented on cable using different voltage levels. This is common in
  technologies like Ethernet.
* However, in wireless technology this isn't feasible because square waves take
  a lot of spectrum according to Fourier. In addition, it would require huge
  antennas that transmit at baseband, which isn't possible.
* Instead, wireless signals are modulated in some way to encode data.

## Modulation Techniques

* Amplitude shift keying (ASK): The amplitude of the carrier wave is modulated
  between two or more discrete signal levels.
* Frequency shift keying (FSK): The frequency of the carrier wave is modulated
  between two or more discrete frequencies.
* Phase shift keying (PSK): The phase of the carrier wave is modulated between
  two or more phase angles.
* Amplitude phase shift keying (APSK): Combines ASK and PSK by modulating both
  the amplitude and phase of the carrier wave. It has a lower error rate than
  ASK or PSK but a high complexity.
* Quadrature amplitude modulation (QAM): Combines ASK with two separate carries
  waves out of phase with one another by 90 degrees. The amplitude of each
  carrier wave is modulated between two or more signal levels.

![](Images/modulation_techniques.png)

## Differential Coding

* Differential coding is technique to provide unambiguous signal reception when
  using PSK or QAM modulation.
* Usually this step occurs right before bits are modulated or right after
  demodulation.
* When a signal travels, it experiences a random phase shift. When using BPSK,
  the receiver has no way of knowing if the received symbols are correctly
  mapped.
* One way to solve this is to add a pilot symbol at mixed into the data stream
  that the receiver can use to correct its phase but this will lower the overall
  data rate.
* Differential encoding avoids this by encoding the change in bits instead of
  the actual value of it.
  * The output bit is 0 if the current input bit is the same as the previous
    encoded output bit.
  * The output bit is 1 if the current input bit is the different as the
    previous encoded output bit.

![](Images/differential_coding.svg)

* The downside of using differential coding is if there is a one bit error, it
  will lead to two bit errors.
* Differential coding happens at the symbol level, so to apply it to QPSK you
  work with pairs of bits at a time.
