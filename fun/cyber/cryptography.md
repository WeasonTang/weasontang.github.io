---
title: "Cryptography"
quote: tryhackme
categories:
  - 技术
  - 教程
tags: [Markdown, Cryptography]
description: Cryptography
draft: false
sidebar: false
outline: deep
---

# Cryptography

Explore various symmetric and asymmetric encryption algorithms. Discover the usage of hashing algorithms in everyday systems.

## introduction

The terms are listed below:

- **Plaintext** is the original, readable message or data before it’s encrypted. It can be a document, an image, a multimedia file, or any other binary data.
- **Ciphertext** is the scrambled, unreadable version of the message after encryption. Ideally, we cannot get any information about the original plaintext except its approximate size.
- **Cipher** is an **algorithm** or **method** to convert plaintext into ciphertext and back again. A cipher is usually developed by a mathematician.
- **Key** is a string of bits the cipher uses to encrypt or decrypt data. In general, the used cipher is public knowledge; however, the key must remain secret unless it is the public key in asymmetric encryption. We will visit asymmetric encryption in a later task.
- **Encryption** is the process of converting plaintext into ciphertext using a cipher and a key. Unlike the key, the choice of the cipher is disclosed.
- **Decryption** is the reverse process of encryption, converting ciphertext back into plaintext using a cipher and a key. Although the cipher would be public knowledge, recovering the plaintext without knowledge of the key should be impossible (infeasible).

The **plaintext** is passed through the **encryption function** along with a proper **key**; the **encryption function** returns a **ciphertext**. The **encryption function** is part of the **cipher**; a **cipher** is an **algorithm** to convert a plaintext into a ciphertext and vice versa.

![encrypt](assets/encrypt.svg)

To recover the plaintext, we must pass the ciphertext along with the proper key via the d**ecryption function**, which would give us the original plaintext. This is shown in the illustration below.

![decrypt](assets/decrypt.svg)

<span style="font-size: 23px;">**Symmetric Encryption**</span>

**Symmetric encryption**, also known as **symmetric cryptography**, uses the same key to encrypt and decrypt the data, as shown in the figure below. Keeping the key secret is a must; it is also called **private key cryptography**. Furthermore, communicating the key to the intended parties can be challenging as it requires a secure communication channel. Maintaining the secrecy of the key can be a significant challenge, especially if there are many recipients. The problem becomes more severe in the presence of a powerful adversary.

![Symmetric Encryption](<assets/Symmetric Encryption.svg>)

**Advanced Encryption Standard (AES)** is a symmetric block encryption algorithm. It can use cryptographic keys of sizes 128, 192, and 256 bits.

### Basic Math

<span style="font-size: 23px;">**XOR Operation**</span>

**XOR**, short for “**exclusive OR**”, is a logical operation in binary arithmetic that plays a crucial role in various computing and cryptographic applications. In binary, XOR compares two bits and returns 1 if the bits are different and 0 if they are the same, as shown in the truth table below. This operation is often represented by the symbol ⊕ or ^.

**XOR** Is a binary operation that is commonly used for encryption and decryption of data. XOR operates on binary data (bits) and is based on the principles of Boolean algebra. The operation involves two bits. The result of the operation is "1" if the two bits are different, and "0" if they are the same.

| A | B | A ⊕ B |
|:--:|:--:|:--:|
| 0  | 0  | 0  |
| 0  | 1  | 1  |
| 1  | 0  | 1  |
| 1  | 1  | 0  |

XOR has several interesting properties that make it useful in cryptography and error detection. One key property is that applying XOR to a value with itself results in 0, and applying XOR to any value with 0 leaves it unchanged. This means A ⊕ A = 0, and A ⊕ 0 = A for any binary value A. Additionally, XOR is commutative, i.e., A ⊕ B = B ⊕ A. And it is associative, i.e., (A ⊕ B) ⊕ C = A ⊕ (B ⊕ C).

Let’s see how we can make use of the above in cryptography. We will demonstrate how XOR can be used as a basic symmetric encryption algorithm. Consider the binary values P and K, where P is the plaintext, and K is the secret key. The ciphertext is C = P ⊕ K.

Now, if we know C and K, we can recover P. We start with C ⊕ K = (P ⊕ K) ⊕ K. But we know that (P ⊕ K) ⊕ K = P ⊕ (K ⊕ K) because XOR is associative. Furthermore, we know that K ⊕ K = 0; consequently, (P ⊕ K) ⊕ K = P ⊕ (K ⊕ K) = P ⊕ 0 = P. In other words, XOR served as a simple symmetric encryption algorithm. In practice, it is more complicated as we need a secret key as long as the plaintext.

<span style="font-size: 23px;">**Modulo Operation**</span>

Another mathematical operation we often encounter in cryptography is the modulo operator, commonly written as % or as mod. The modulo operator, X%Y, is the **remainder** when X is divided by Y. 

## Asymmetric Encryption

Unlike symmetric encryption, which uses the same key for encryption and decryption, **asymmetric encryption** uses a pair of keys, one to encrypt and the other to decrypt, as shown in the illustration below. To protect confidentiality, asymmetric encryption or **asymmetric cryptography** encrypts the data using the public key; hence, it is also called **public key cryptography**.

![Asymmetric Encryption](<assets/Asymmetric Encryption.svg>)

Examples are RSA, Diffie-Hellman, and Elliptic Curve cryptography (ECC). The two keys involved in the process are referred to as a **public key** and a **private key**. Data encrypted with the public key can be decrypted with the private key. Your private key needs to be kept private, hence the name.

- **RSA** is a method for encrypting data using two keys: one to lock (encrypt) and another to unlock (decrypt) it, relying on the difficulty of factoring large number.
- **ECC** is a way to encrypt data using smaller keys while still providing strong security. It is based on the math of elliptic curves.

Asymmetric encryption tends to be slower, and many asymmetric encryption ciphers use larger keys than symmetric encryption. For example, RSA uses 2048-bit, 3072-bit, and 4096-bit keys; 2048-bit is the recommended minimum key size. Diffie-Hellman also has a recommended minimum key size of 2048 bits but uses 3072-bit and 4096-bit keys for enhanced security. On the other hand, ECC can achieve equivalent security with shorter keys. For example, with a 256-bit key, ECC provides a level of security comparable to a 3072-bit RSA key.

Asymmetric encryption is based on a particular group of mathematical problems that are easy to compute in one direction but extremely difficult to reverse. In this context, extremely difficult means practically infeasible. For example, we can rely on a mathematical problem that would take a very long time, for example, millions of years, to solve using today’s technology.

### RSA

RSA is a public-key encryption algorithm that enables secure data transmission over insecure channels. With an insecure channel, we expect adversaries to eavesdrop on it.

RSA is a method for encrypting data using two keys: one to lock (encrypt) and another to unlock (decrypt) it, relying on the difficulty of factoring large number.

RSA is based on the mathematically difficult problem of factoring a large number. Multiplying two large prime numbers is a straightforward operation; however, finding the factors of a huge number takes much more computing power.

In the following simplified numerical example, we see the RSA algorithm in action:

1. Bob chooses two prime numbers: p = 157 and q = 199. He calculates n = p × q = 31243.
2. With ϕ(n) = n − p − q + 1 = 31243 − 157 − 199 + 1 = 30888, Bob selects e = 163 such that e is relatively prime to ϕ(n); moreover, he selects d = 379, where e × d = 1 mod ϕ(n), i.e., e × d = 163 × 379 = 61777 and 61777 mod 30888 = 1. The public key is (n,e), i.e., (31243,163) and the private key is $(n,d), i.e., (31243,379).
3. Let’s say that the value they want to encrypt is x = 13, then Alice would calculate and send y = *x<sup>e</sup>* mod n = 13<sup>163</sup> mod 31243 = 16341.
4. Bob will decrypt the received value by calculating x = *y<sup>d</sup>* mod n = 16341<sup>379</sup> mod 31243 = 13. This way, Bob recovers the value that Alice sent.

The proof that the above algorithm works can be found in [modular arithmetic](https://www.britannica.com/science/modular-arithmetic) . It is worth repeating that in this example, we picked a three-digit prime number, while in an actual application, p and q would be at least a 300-digit prime number each.

### Diffie-Hellman Key Exchange

**Key exchange** aims to establish a shared secret between two parties. It is a method that allows two parties to establish a shared secret over an insecure communication channel without requiring a pre-existing shared secret and without an observer being able to get this key. Consequently, this shared key can be used for symmetric encryption in subsequent communications.

<span style="font-size: 23px;">**simplified exact process**</span>

1. Alice and Bob agree on the **public variables**: a large prime number p and a generator g, where 0 < g < p. These values will be disclosed publicly over the communication channel. Although insecurely small, we will choose p = 29 and g = 3 to simplify our calculations.
2. Each party chooses a private integer. As a numerical example, Alice chooses a = 13, and Bob chooses b = 15. Each of these values represents a **private key** and must not be disclosed.
3. It is time for each party to calculate their **public key** using their private key from step 2 and the agreed-upon public variables from step 1. Alice calculates A = g<sup>a</sup> mod p = 3<sup>13</sup> mod 29 = 19 and Bob calculates B = g<sup>b</sup> mod p = 3<sup>15</sup> mod 29 = 26. These are the public keys.
4. Alice and Bob send the keys to each other. Bob receives A = g<sup>a</sup> mod p = 19, i.e., Alice’s public key. And Alice receives B = g<sup>b</sup> mod p = 26, i.e., Bob’s public key. This step is called the key exchange.
5. Alice and Bob can finally calculate the shared secret using the received public key and their own private key. Alice calculates B<sup>a</sup> mod p = 26<sup>13</sup> mod 29 = 10 and Bob calculates A<sup>b</sup> mod p = 19<sup>15</sup> mod 29 = 10. Both calculations yield the same result, g<sup>ab</sup> mod p = 10, the shared secret key.

![Diffie-Hellman Key Exchange](<assets/Diffie-Hellman Key Exchange.svg>)

The chosen numbers are too small to provide any security, and in real-life applications, we would consider much bigger numbers.

Diffie-Hellman Key Exchange is often used alongside RSA public key cryptography. Diffie-Hellman is used for key agreement, while RSA is used for digital signatures, key transport, and authentication, among many others. For instance, RSA helps prove the identity of the person you’re talking to via digital signing, as you can confirm based on their public key. This would prevent someone from attacking the connection with a man-in-the-middle attack against Alice by pretending to be Bob. In brief, Diffie-Hellman and RSA are incorporated into many security protocols and standards to provide a comprehensive security solution.

### SSH

<span style="font-size: 23px;">**Authenticating the Server**</span>

If you have used an [SSH](../linux/LinuxFundamentals.md#ssh) client before, you would know the confirmation prompt in the terminal output below.

```bash
root@TryHackMe# ssh 10.10.244.173
The authenticity of host '10.10.244.173 (10.10.244.173)' can't be established.
ED25519 key fingerprint is SHA256:lLzhZc7YzRBDchm02qTX0qsLqeeiTCJg5ipOT0E/YM8.
This key is not known by any other name.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '10.10.244.173' (ED25519) to the list of known hosts.
```
In the above interaction, the SSH client confirms whether we recognise the server’s public key fingerprint. **ED25519** is the public-key algorithm used for digital signature generation and verification in this example. Our SSH client didn’t recognise this key and is asking us to confirm whether we want to continue with the connection. This warning is because a man-in-the-middle attack is probable; a malicious server might have intercepted the connection and replied, pretending to be the target server.

In this case, the user must authenticate the server, i.e., confirm the server’s identity by checking the public key signature. Once you answer with “yes”, the SSH client will record this public key signature for this host. In the future, it will connect you silently unless this host replies with a different public key.

<span style="font-size: 23px;">**Authenticating the Client**</span>

Now that we have confirmed that we are talking with the correct server, we need to identify ourselves and get authenticated. In many cases, SSH users are authenticated using usernames and passwords like you would log in to a physical machine. However, considering the inherent issues with passwords, this does not fall within the best security practices.

At some point, one will surely hit a machine with SSH configured with key authentication instead. This authentication uses public and private keys to prove the client is a valid and authorised user on the server. By default, [SSH keys](../linux/archlinuxApp.md#ssh) are [RSA](#rsa) keys. You can choose which algorithm to generate and add a passphrase to encrypt the SSH key.

**ssh-keygen** is the program usually used to generate key pairs. It supports various algorithms, as shown on its manual page below.

- **DSA (Digital Signature Algorithm)** is a public-key cryptography algorithm specifically designed for digital signatures.
- **ECDSA (Elliptic Curve Digital Signature Algorithm)** is a variant of DSA that uses elliptic curve cryptography to provide smaller key sizes for equivalent security.
- **ECDSA-SK (ECDSA with Security Key)** is an extension of ECDSA. It incorporates hardware-based security keys for enhanced private key protection.
- **Ed25519** is a public-key signature system using EdDSA (Edwards-curve Digital Signature Algorithm) with Curve25519.
- **Ed25519-SK (Ed25519 with Security Key)** is a variant of Ed25519. Similar to ECDSA-SK, it uses a hardware-based security key for improved private key protection.

<span style="font-size: 23px;">**SSH Private Keys**</span>

you should treat your private SSH keys like passwords. Never share them under any circumstances; they’re called private keys for a reason. Someone with your private key can log in to servers that accept it, i.e., include it among the authorised keys, unless the key is encrypted with a passphrase.

It’s very important to mention that the passphrase used to decrypt the private key doesn’t identify you to the server at all; it only decrypts the SSH private key. The passphrase is never transmitted and never leaves your system.

When generating an SSH key to log in to a remote machine, you should generate the keys on your machine and then copy the public key over, as this means the private key never exists on the target machine using `ssh-copy-id`. However, this doesn’t matter as much for temporary keys generated to access CTF boxes.

The permissions must be set up correctly to use a private SSH key; otherwise, your SSH client will ignore the file with a warning. Only the owner should be able to read or write to the private key (`600` or stricter). `ssh -i privateKeyFileName user@host` is how you specify a key for the standard Linux OpenSSH client.

### Digital Signatures and Certificates

Digital signatures provide a way to verify the authenticity and integrity of a digital message or document. Proving the authenticity of files means we know who created or modified them. Using asymmetric cryptography, you produce a signature with your private key, which can be verified using your public key. Only you should have access to your private key, which proves you signed the file. In many modern countries, digital and physical signatures have the same legal value.

The simplest form of digital signature is encrypting the document with your private key. If someone wants to verify this signature, they would decrypt it with your public key and check if the files match. This process is shown in the image below.

![Digital Signatures](<assets/Digital Signatures.svg>)

<span style="font-size: 23px;">**Certificates: Prove Who You Are!**</span>

Certificates are an essential application of public key cryptography, and they are also linked to digital signatures. A common place where they’re used is for HTTPS. How does your web browser know that the server you’re talking to is the real tryhackme.com?

The answer lies in certificates. The web server has a certificate that says it is the real tryhackme.com. The certificates have a chain of trust, starting with a root CA (Certificate Authority). From install time, your device, operating system, and web browser automatically trust various root CAs. Certificates are trusted only when the Root CAs say they trust the organisation that signed them. In a way, it is a chain; for example, the certificate is signed by an organisation, the organisation is trusted by a CA, and the CA is trusted by your browser. Therefore, your browser trusts the certificate. In general, there are long chains of trust. You can take a look at the certificate authorities trusted by Mozilla Firefox [here](https://wiki.mozilla.org/CA/Included_Certificates) and by Google Chrome [here](https://chromium.googlesource.com/chromium/src/+/main/net/data/ssl/chrome_root_store/root_store.md).

### PGP and GPG

**PGP** stands for Pretty Good Privacy. It’s software that implements encryption for encrypting files, performing digital signing, and more. [GnuPG or GPG](https://gnupg.org/) is an open-source implementation of the OpenPGP standard.

**GPG** stands for GNU Privacy Guard. It is a free and open-source encryption software that uses public-key cryptography. GPG can be used to encrypt files and messages, and to sign files and messages. Encryption makes it so that only the intended recipient can decrypt the file or message while signing makes it so that the recipient can verify that the file or message was sent by the person it claims to be from.

GPG is commonly used in email to protect the confidentiality of the email messages. Furthermore, it can be used to sign an email message and confirm its integrity.

You may need to use GPG to decrypt files in CTFs. With PGP/GPG, private keys can be protected with passphrases in a similar way that we protect SSH private keys. If the key is passphrase protected, you can attempt to crack it using John the Ripper and `gpg2john`. The key provided in this task is not protected with a passphrase. The man page for GPG can be found online [here](https://www.gnupg.org/gph/de/manual/r1023.html).

Let’s say you got a new computer. All you need to do is import your key, and you can start decrypting your received messages again:

- You would use `gpg --import backup.key` to import your key from backup.key
- To decrypt your messages, you need to issue `gpg --decrypt confidential_message.gpg`

## Hashing

A **hash value** is a fixed-size string or characters that is computed by a hash function. A **hash function** takes an input of an arbitrary size and returns an output of fixed length, i.e., a hash value.  

<span style="font-size: 23px;">**Objectives**</span>

- Hash functions and collisions
- The role of hashing in authentication systems
- Recognizing stored hash values
- Cracking hash values
- The use of hashing for integrity protection

### Hash Functions

<span style="font-size: 23px;">**What is a Hash Function?**</span>

Hash functions are different from encryption. There is no key, and it’s meant to be impossible (or computationally impractical) to go from the output back to the input.

A hash function takes some input data of any size and creates a summary or digest of that data. The output has a fixed size. It’s hard to predict the output for any input and vice versa. Good hashing algorithms will be relatively fast to compute and prohibitively slow to reverse, i.e., go from the output and determine the input. Any slight change in the input data, even a single bit, should cause a significant change in the output.

Let’s check an example. In the terminal below, we can see two files; the first contains the letter T, while the second contains the letter U. If you check T and U in an ASCII table or using hexdump, you will notice that the two letters differ by a single bit.

Consequently, the following two files differ by a single bit. However, if we compare their MD5 (Message-Digest Algorithm 5) hashes, their SHA1 (Secure Hash Algorithm 1) hashes, or their SHA-256 (Secure Hash Algorithm 256) hashes, we will notice that they are entirely different. We recommend that you try the commands below yourself

```bash
user@ip-10-10-14-120:~/Hashing-Basics/Task-2$ cat file1.txt && echo
T
user@ip-10-10-14-120:~/Hashing-Basics/Task-2$ cat file2.txt && echo
U
user@ip-10-10-14-120:~/Hashing-Basics/Task-2$ hexdump -C file1.txt 
00000000  54                                                |T|
00000001
user@ip-10-10-14-120:~/Hashing-Basics/Task-2$ hexdump -C file2.txt 
00000000  55                                                |U|
00000001
user@ip-10-10-14-120:~/Hashing-Basics/Task-2$ md5sum *.txt
b9ece18c950afbfa6b0fdbfa4ff731d3  file1.txt
4c614360da93c0a041b22e537de151eb  file2.txt
user@ip-10-10-14-120:~/Hashing-Basics/Task-2$ sha1sum *.txt
c2c53d66948214258a26ca9ca845d7ac0c17f8e7  file1.txt
b2c7c0caa10a0cca5ea7d69e54018ae0c0389dd6  file2.txt
user@ip-10-10-14-120:~/Hashing-Basics/Task-2$ sha256sum *.txt
e632b7095b0bf32c260fa4c539e9fd7b852d0de454e9be26f24d0d6f91d069d3  file1.txt
a25513c7e0f6eaa80a3337ee18081b9e2ed09e00af8531c8f7bb2542764027e7  file2.txt
```
The output of a hash function is typically raw bytes, which are then encoded. Common encodings are base64 or hexadecimal. `md5sum`, `sha1sum`, `sha256sum`, and `sha512sum` produce their outputs in hexadecimal format. Remember that hexadecimal format prints each raw byte as two hexadecimal digits.

<span style="font-size: 23px;">**Why is Hashing Important?**</span>

Hashing plays a vital role in our daily use of the Internet. Like other cryptographic functions, hashing remains hidden from the user. Hashing helps protect data’s integrity and ensure password confidentiality.

When you log into TryHackMe, the server uses hashing to verify your password. In fact, as per good security practices, a server does not record your password; it records the hash value of your password. Whenever you want to log in, it will calculate the hash value of the password you submitted with the recorded hash value. Similarly, when you log into your computer, hashing plays a role in verifying your password. You interact more indirectly with hashing than you would think, and almost daily in the context of passwords.

<span style="font-size: 23px;">**What’s a Hash Collision?**</span>

A hash collision is when two different inputs give the same output. Hash functions are designed to avoid collisions as best as possible. Furthermore, hash functions are designed to prevent an attacker from being able to create, i.e., engineer, a collision intentionally. However, because the number of inputs is practically unlimited and the number of possible outputs is limited, this leads to a pigeonhole effect.

As a numeric example, if a hash function produces a 4-bit hash value, we only have 16 different hash values. The total number of possible hash values is 2<sup>number_of_bits</sup> = 2<sup>4</sup> = 16. The probability of a collision is relatively very high.

The **pigeonhole effect** states that the number of items (pigeons) is more than the number of containers (pigeonholes); some containers must hold more than one item. In other words, in this context, there are a fixed number of different output values for the hash function, but you can give it any size input. As there are more inputs than outputs, some inputs must inevitably give the same output. If you have 21 pigeons and 16 pigeonholes, some of the pigeons are going to share the pigeonholes. Consequently, collisions are unavoidable. However, a good hash function ensures that the probability of a collision is negligible.

MD5 and SHA1 have been attacked and are now considered insecure due to the ability to engineer hash collisions. However, no attack has yet given a collision in both algorithms simultaneously, so if you compare the MD5 and SHA1 hash, you will see that they’re different. You can view the MD5 collision example on the [MD5 Collision Demo](https://www.mscs.dal.ca/~selinger/md5collision/) page; furthermore, you can read the details of the SHA1 collision attack at [Shattered](https://shattered.io/). Due to these, you shouldn’t trust either algorithm for hashing passwords or data.

### Insecure Password Storage for Authentication

<span style="font-size: 23px;">**Stories of Insecure Password Storage for Authentication**</span>

**There is three insecure practices when it comes to passwords:**

- Storing passwords in plaintext
- Storing passwords using a deprecated encryption
- Storing passwords using an insecure hashing algorithm

### password storage

<span style="font-size: 23px;">**Using Hashing to Store Passwords**</span>

What if, instead of storing the password, you just stored its hash value using a secure hashing function? This process means you never have to store the user’s password, and if your database is leaked, an attacker will have to crack each password to find out what the password was.

There’s just one problem with this. What if two users have the same password? As a hash function will always turn the same input into the same output, you will store the same password hash for each user. That means if someone cracks that hash, they gain access to more than one account. It also means someone can create a Rainbow Table to break the hashes.

A **Rainbow Table** is a lookup table of hashes to plaintexts, so you can quickly find out what password a user had just from the hash. A rainbow table trades the time to crack a hash for hard disk space, but it takes time to create. Here’s a quick example to get an idea of what a rainbow table looks like.

| Hash                                             | Password       |
| :----------------------------------------------- | :------------- |
| 02c75fb22c75b23dc363c7eb91a062cc                 | zxcvbnm        |
| b0baee9d279d34fa1dfd71aadbcb908c3f                 | 11111          |
| c44a471bd78cc6c2fea32b9fe028d30a                 | asdfghjkl      |
| d0199f51d2728db6011945145a1b607a                 | basketball     |
| dcddb75469b4b4875094e14561e573d8                 | 000000         |
| e10adc3949ba59abbe56e057f20f883e                 | 123456         |
| e19d5cd5af0378da05f63f891c7467af                 | abcd1234       |
| e99a18c428cb38d5f260853678922e03                 | abc123         |
| fcea920f7412b5da7be0cf42b8c93759                 | 1234567        |
| 4c5923b6afac7b7355f53bfe2b8f8c1                 | inS3cyourP4$$  |

Websites like [CrackStation](https://crackstation.net/) and [Hashes.com](https://hashes.com/en/decrypt/hash) internally use massive rainbow tables to provide fast password cracking for **hashes without salts**. Doing a lookup in a sorted list of hashes is quicker than trying to crack the hash.

<span style="font-size: 23px;">**Protecting Against Rainbow Tables**</span>

To protect against rainbow tables, we add a salt to the passwords. The salt is a randomly generated value stored in the database and should be unique to each user. In theory, you could use the same salt for all users, but duplicate passwords would still have the same hash and a rainbow table could still be created for passwords with that salt.

The salt is added to either the start or the end of the password before it’s hashed, and this means that every user will have a different password hash even if they have the same password. Hash functions like Bcrypt and Scrypt handle this automatically. Salts don’t need to be kept private.

You can find many good guides online that promote best security practices when storing passwords. Please check if there are any standards you need to follow when storing passwords before adopting one. Consider this example following good security practices when storing user passwords:

1. We select a secure hashing function, such as Argon2, Scrypt, Bcrypt, or PBKDF2.
2. We add a unique salt to the password, such as `Y4UV*^(=go_!`.
3. Concatenate the password with the unique salt. For example, if the password is `AL4RMc10k`, the result string would be `AL4RMc10kY4UV*^(=go_!`.
4. Calculate the hash value of the combined password and salt. In this example, using the chosen algorithm, you need to calculate the hash value of `AL4RMc10kY4UV*^(=go_!`.
5. Store the hash value and the unique salt used (`Y4UV*^(=go_!`).

<span style="font-size: 23px;">**Using Encryption to Store Password**</span>

Considering the problem of saving passwords for authentication, why don’t we encrypt passwords instead of all these cumbersome steps? The reason is that even if we select a secure hashing algorithm to encrypt the passwords before storing them, we still need to store the used key. Consequently, if someone gets the key, they can easily decrypt all the passwords.

### Recognising Password Hashes

From the cyber defensive security perspective, we covered how to store passwords securely for authentication systems. Let’s tackle this from the offensive security perspective; if we start with a hash, how can we recognise its type, eventually crack it, and recover the original password?

Automated hash recognition tools such as [hashID](https://pypi.org/project/hashID/) exist but are unreliable for many formats. For hashes that have a prefix, the tools are reliable. Use a healthy combination of context and tools.  If you find the hash in a web application database, it’s more likely to be MD5 than NTLM (NT LAN Manager). Automated hash recognition tools often get these hash types mixed up, highlighting the importance of learning yourself.

<span style="font-size: 23px;">**Linux Passwords**</span>

On Linux, password hashes are stored in `/etc/shadow`, which is normally only readable by root. They used to be stored in `/etc/passwd`, which was readable by everyone.

The `shadow` file contains the password information. Each line contains nine fields, separated by colons (`:`). The first two fields are the login name and the encrypted password. More information about the other fields can be found by executing `man 5 shadow` on a Linux system.

The encrypted password field contains the hashed passphrase with four components: prefix (algorithm id), options (parameters), salt, and hash. It is saved in the format `$prefix$options$salt$hash`. The prefix makes it easy to recognise Unix and Linux-style passwords; it specifies the hashing algorithm used to generate the hash.

Here’s a quick table of some of the most common Unix-style password prefixes you might encounter. They are listed in the order of decreasing strength. You can read more about them by checking the man page with `man 5 crypt`.

好的，这是根据您提供的图片内容转换成的 Markdown 表格：

| Prefix            | Algorithm                                                                                                                               |
| :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| `$y$`             | yescrypt is a scalable hashing scheme and is the default and recommended choice in new systems                                            |
| `$gy$`            | gost-yescrypt uses the GOST R 34.11-2012 hash function and the yescrypt hashing method                                                   |
| `$7$`             | scrypt is a password-based key derivation function                                                                                      |
| `$2b$` `$2y$` `$2a$` `$2x$` | bcrypt is a hash based on the Blowfish block cipher originally developed for OpenBSD but supported on a recent version of FreeBSD, NetBSD, Solaris 10 and newer, and several Linux distributions |
| `$6$`             | sha512crypt is a hash based on SHA-2 with 512-bit output originally developed for GNU libc and commonly used on (older) Linux systems    |
| `$md5$`           | SunMD5 is a hash based on the MD5 algorithm originally developed for Solaris                                                            |
| `$1$`             | md5crypt is a hash based on the MD5 algorithm originally developed for FreeBSD                                                          |

<span style="font-size: 23px;">**Modern Linux Example**</span>

Consider the following line from a modern Linux system’s `shadow` password file.

```bash
root@TryHackMe# sudo cat /etc/shadow | grep strategos
strategos:$y$j9T$76UzfgEM5PnymhQ7TlJey1$/OOSg64dhfF.TigVPdzqiFang6uZA4QA1pzzegKdVm4:19965:0:99999:7:::
```
The fields are separated by colons. The important ones are the username and the hash algorithm, salt, and hash value. The second field has the format `$prefix$options$salt$hash`.

In the example above, we have four parts separated by `$`:

- `y` indicates the hash algorithm used, yescrypt
- `j9T` is a parameter passed to the algorithm
- `76UzfgEM5PnymhQ7TlJey1` is the salt used
- `/OOSg64dhfF.TigVPdzqiFang6uZA4QA1pzzegKdVm4` is the hash value

<span style="font-size: 23px;">**MS Windows Passwords**</span>

MS Windows passwords are hashed using NTLM, a variant of MD4. They’re visually identical to MD4 and MD5 hashes, so it’s very important to use context to determine the hash type.

On MS Windows, password hashes are stored in the SAM (Security Accounts Manager). MS Windows tries to prevent normal users from dumping them, but tools like mimikatz exist to circumvent MS Windows security. Notably, the hashes found there are split into NT hashes and LM hashes.

A great place to find more hash formats and password prefixes is the [Hashcat Example Hashes](https://hashcat.net/wiki/doku.php?id=example_hashes) page. For other hash types, you’ll typically need to check the length or encoding or even conduct some research into the application that generated them. Never underestimate the power of research.

### Password Cracking

We’ve already mentioned rainbow tables as a method to crack hashes that don’t use a salt, but what if there’s a salt involved?

You can’t “decrypt” password hashes. They’re not encrypted. You have to crack the hashes by hashing many different inputs (such as `rockyou.txt` as it covers many possible passwords), potentially adding the salt if there is one and comparing it to the target hash. Once it matches, you know what the password was. Tools like [Hashcat](https://hashcat.net/hashcat/) and [John the Ripper](https://www.openwall.com/john/) are commonly used for these purposes.

<span style="font-size: 23px;">**Cracking Passwords with GPUs**</span>

Modern GPUs (Graphics Processing Units) have thousands of cores. They are specialised in digital image processing and accelerating computer graphics. Although they can’t do the same sort of work that a CPU can, they are very good at some mathematical calculations involved in hash functions. You can use a graphics card to crack many hash types quickly. Some hashing algorithms, such as Bcrypt, are designed so that hashing on a GPU does not provide any speed improvement over using a CPU; this helps them resist cracking.

<span style="font-size: 23px;">**Cracking on VMs?**</span>

It’s worth mentioning that VMs (Virtual Machines) normally don’t have access to the host’s graphics card(s). Depending on the virtualisation software you are using, you can set this up, but it is cumbersome. Furthermore, performance degradation occurs as you use the CPU from a virtualised OS, and when your purpose is to crack a hash, you need every extra CPU cycle.

If you want to run [Hashcat](https://hashcat.net/hashcat/), it’s best to run it on your host to make the most of your GPU, if available. If you prefer MS Windows, you are in luck; MS Windows builds are available on the website, and you can run it from PowerShell. You can get Hashcat working with OpenCL in a VM, but the speeds will likely be worse than cracking on your host.

[John the Ripper](https://www.openwall.com/john/) uses CPU by default and works in a VM out of the box, although you may get better speeds running it on the host OS to avoid any virtualisation overhead and make the most of your CPU cores and threads.

<span style="font-size: 23px;">**Time to Crack Some Hashes**</span>

I’ll provide the hashes. Crack them. You can choose how. You’ll need to use online tools, Hashcat, or John the Ripper. Although you can use [online rainbow tables](https://hashes.com/en/decrypt/hash) to solve the following, we strongly advise against doing that as this will restrict your learning experience. For the first three questions, using `hashcat` along with `rockyou.txt` is enough to find the answers.

Hashcat uses the following basic syntax: `hashcat -m <hash_type> -a <attack_mode> hashfile wordlist`, where:

- `-m <hash_type>` specifies the hash-type in numeric format. For example, `-m 1000` is for NTLM. Check the official documentation (`man hashcat`) and [example page](https://hashcat.net/wiki/doku.php?id=example_hashes) to find the hash type code to use.
- `-a <attack_mode>` specifies the attack-mode. For example, `-a 0` is for straight, i.e., trying one password from the wordlist after the other.
- `hashfile` is the file containing the hash you want to crack.
- `wordlist` is the security word list you want to use in your attack.

For example, `hashcat -m 3200 -a 0 hash.txt /usr/share/wordlists/rockyou.txt` will treat the hash as Bcrypt and try the passwords in the `rockyou.txt` file.

<span style="font-size: 23px;">**Question&&Answer**</span>

```bash
# 1.Use hashcat to crack the hash, $2a$06$7yoU3Ng8dHTXphAg913cyO6Bjs3K5lBnwq5FJyA6d01pMSrddr1ZG, saved in ~/Hashing-Basics/Task-6/hash1.txt.
hashcat -m 3200 -a 0 hash1.txt /usr/share/wordlists/rockyou.txt
hashcat -m 3200 hash1.txt --show

$2a$06$7yoU3Ng8dHTXphAg913cyO6Bjs3K5lBnwq5FJyA6d01pMSrddr1ZG:85208520

# 2.Use hashcat to crack the SHA2-256 hash, 9eb7ee7f551d2f0ac684981bd1f1e2fa4a37590199636753efe614d4db30e8e1, saved in saved in ~/Hashing-Basics/Task-6/hash2.txt.
hashcat -m 1400 -a 0 hash2.txt /usr/share/wordlists/rockyou.txt
9eb7ee7f551d2f0ac684981bd1f1e2fa4a37590199636753efe614d4db30e8e1:halloween

# 3.Use hashcat to crack the hash, $6$GQXVvW4EuM$ehD6jWiMsfNorxy5SINsgdlxmAEl3.yif0/c3NqzGLa0P.S7KRDYjycw5bnYkF5ZtB8wQy8KnskuWQS3Yr1wQ0, saved in ~/Hashing-Basics/Task-6/hash3.txt.
hashcat -m 1800 -a 0 hash3.txt /usr/share/wordlists/rockyou.txt
$6$GQXVvW4EuM$ehD6jWiMsfNorxy5SINsgdlxmAEl3.yif0/c3NqzGLa0P.S7KRDYjycw5bnYkF5ZtB8wQy8KnskuWQS3Yr1wQ0:spaceman

# 4.Crack the hash, b6b0d451bbf6fed658659a9e7e5598fe, saved in ~/Hashing-Basics/Task-6/hash4.txt.
hashcat -m 0 -a 0 hash4.txt /usr/share/wordlists/rockyou.txt
b6b0d451bbf6fed658659a9e7e5598fe:funforyou

```

### data integrity 

<span style="font-size: 23px;">**Hashing for Integrity Checking**</span>

Hashing can be used to check that files haven’t been changed. If you put the same data in, you always get the same data out. Even if a single bit changes, the hash will change significantly. This means you can use it to check that files haven’t been modified or to ensure that the file you downloaded is identical to the file on the web server. 

<span style="font-size: 23px;">**HMACs  HMAC**</span>

**HMAC (Keyed-Hash Message Authentication Code)** is a type of message authentication code (MAC) that uses a cryptographic hash function in combination with a secret key to verify the authenticity and integrity of data.

An HMAC can be used to ensure that the person who created the HMAC is who they say they are, i.e., authenticity is confirmed; moreover, it proves that the message hasn’t been modified or corrupted, i.e., integrity is maintained. This is achieved through the use of a secret key to prove authenticity and a hashing algorithm to produce a hash and prove integrity.

The following steps give you a fair idea of how HMAC works.

1. The secret key is padded to the block size of the hash function.
2. The padded key is XORed with a constant (usually a block of zeros or ones).
3. The message is hashed using the hash function with the XORed key.
4. The result from Step 3 is then hashed again with the same hash function but using the padded key XORed with another constant.
5. The final output is the HMAC value, typically a fixed-size string.

The illustration below should clarify the above steps.

![hmac](assets/hmac.svg)

Technically speaking, the HMAC function is calculated using the following expression:

*HMAC(K,M)* = *H*((*K*⊕*opad*)||*H*((*K*⊕*ipad*)||*M*))

Note that M and K represent the message and the key, respectively.

### Conclusion

Distinguish between **hashing**, **encoding**, and **encryption**.

**Hashing**, as already stated, is a process that takes input data and produces a hash value, a fixed-size string of characters, also referred to as digest. This hash value uniquely represents the data, and any change in the data, no matter how small, should lead to a change in the hash value. Hashing should not be confused with encryption or encoding; hashing is one-way, and you can’t reverse the process to get the original data.

**Encoding** converts data from one form to another to make it compatible with a specific system. ASCII, UTF-8, UTF-16, UTF-32, ISO-8859-1, and Windows-1252 are valid encoding methods for the English language. Note that UTF-8, UTF-16, and UTF-32 are Unicode encodings, and they can represent characters from other languages, such as Arabic and Japanese.

Another type of encoding commonly used when sending or saving data is not for any specific language. Examples include Base32 and Base64 encoding.

Encoding should not be confused with encryption, as using a specific encoding does not protect the confidentiality of the message. Encoding is reversible; anyone can change the data encoding with the right tools.

Only **encryption**, which we covered in the previous sections, protects data confidentiality using a cryptographic cipher and a key. Encryption is reversible, provided we know the cipher and can access the key.