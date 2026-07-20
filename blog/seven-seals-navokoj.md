# The Seven Seals of Navokoj

*Enterprise security architecture · Reference document*

---

> Enterprise security isn't a checklist. **It's an architecture.** Here's how we protect the Spectral Flow.

The combination of privacy-first infrastructure (Njalla / Keybase) with cryptographic supply chain integrity (Harbor / Cosign) and multi-layer obfuscation (Nuitka / LuaJIT) is rare — most companies stop at one or two of these. We do not. This is the depth of our commitment to delivering world-class solutions to your hardest constraints.

---

## Seal 1: FOKS (The Hidden Origin)

End-to-end encrypted Git. The source of truth never touches a public server. Even a compromised host yields only high-entropy noise.

## Seal 2: NJALLA (The Sovereign Shield)

Privacy-first domain orchestration. Our infrastructure operates outside standard WHOIS snooping and domain-level censorship — an untouchable anchor.

## Seal 3: KEYBASE (The Identity Bridge)

PGP-verified identity and E2EE distribution. Licenses are delivered via exploding messages in encrypted team folders. No paper trail.

## Seal 4: HARBOR (The Enterprise Gate)

Private, air-gapped Docker registry. We ship signed, scanned tarballs with **Cosign signatures** and **Trivy vulnerability reports**. Your binary never touches our cloud.

## Seal 5: CHACHA20-POLY1305 (The Heartbeat)

256-bit AEAD offline licensing via sidecar pattern. **The solver never phones home.** It checks a local status file decrypted with ChaCha20-Poly1305. Air-gap compatible. Cryptographically mandatory.

## Seal 6: NUITKA (The Steel Wrapper)

Python-to-C++ native compilation. Every wrapper and API route is compiled to `.so` binaries. Source code is deleted from the build context. To a reverse-engineer, the container is **granite**.

## Seal 7: LUAJIT (The Spectral Core)

Stripped LuaJIT bytecode. The core solver ships as `.ljbc` with no function names, no variable names, no comments. Just raw, machine-executable logic.

---

## The Zero Attack Surface

Combined, the Seven Seals create a product that:

- **Cannot be seen** — privacy-first infrastructure.
- **Cannot be tracked** — encrypted identity and supply chain.
- **Cannot be intercepted** — air-gapped delivery.
- **Cannot be reverse-engineered** — multi-layer obfuscation.
- **Cannot leak data** — offline licensing and AEAD.

The depth of this stack is rare. Most products stop at one or two of these layers. We do not. This is the depth of our commitment to delivering world-class solutions to your hardest constraints.

— *Sethurathienam Iyer, CEO, ShunyaBar Labs*
*Contact: `contact@shunyabar.foo`*

---

## See Also

- [Navokoj Developer Guide](../navokoj/index.md)
- [The Road to Enterprise](navokoj-road-to-enterprise.md)
- [Navokoj project page](../projects/navokoj.md)
- [Launch post](navokoj-launch.md)
