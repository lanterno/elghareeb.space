---
title: Selective disclosure, from SD-JWT to zero-knowledge proofs
description: How a digital ID can prove you're over 18 without showing your birthday, the two ways verifiable credentials do it today, and why the second one is so hard to ship.
published: 2026-11-24
tags: [identity]
draft: true
---

Show a bartender your ID card to prove you're over 18 and you've also shown them your name, your
address, your exact birthday and your document number. Paper can't help it: the card is one
object, and you hand over all of it. A digital ID can do better, and doing better is most of what
makes one worth building. The property has a name, selective disclosure, and I spent three years
at EPFL's Center for Digital Trust working around it while Switzerland built its E-ID.

This post is the explanation I wish I'd had on the first day: what selective disclosure is, the
two ways verifiable credentials do it today, and why the better of the two is so hard to ship.

## Three roles and one credential

Every verifiable credential system has the same three parties. An **issuer** (a passport office,
a university) signs a set of claims about you. A **holder** (you, with a wallet app) keeps the
signed credential. A **verifier** (the bar, a website) asks for some of those claims and checks the
issuer's signature.

The trouble is the signature. An ordinary digital signature covers the whole document: change
or remove one byte and it no longer verifies. So if the issuer signs your name, birthday and
address together, you can't show the birthday alone. You're back to handing over the whole card.

Selective disclosure is the set of tricks that let the holder show part of a signed credential
and still have the verifier trust it.

## The hash trick: SD-JWT

The approach most wallets ship today is SD-JWT, Selective Disclosure for JSON Web Tokens, an IETF
standard. Its idea is simple enough to fit in a paragraph.

Instead of signing your claims, the issuer signs their hashes. For each claim it makes a small
array of a random salt, the claim's name and its value, encodes it, and hashes the encoding. The
credential it signs contains only the list of hashes:

```json
{
  "iss": "https://id.example.ch",
  "_sd_alg": "sha-256",
  "_sd": [
    "09vKrJMOlyTWM0sjpu_pdOBVBQ2M1y3KhpH515nXkpY",
    "2rsjGbaC0ky8mT0pJrPioWTq0_daw1sX76poUlgCwbI",
    "JzYjH4svliH0R3PyEMfeZu6Jt69u5qehZo7F7EPYlSE"
  ],
  "cnf": { "jwk": { "kty": "EC", "crv": "P-256", "x": "…", "y": "…" } }
}
```

The holder receives the signed hashes and, separately, the salted claims behind them, called
disclosures. To prove their age, the wallet sends the signed credential plus one disclosure: the
one for `birthdate`, or better, for an `age_over_18` claim the issuer added for this purpose. The
verifier hashes that disclosure, finds the result in the signed list, and knows the issuer vouched
for it. The other hashes reveal nothing, because the salts make them impossible to guess, even for
a claim with few possible values.

The `cnf` key is the other half. It binds the credential to a key in the holder's phone, and every
presentation ends with a short proof signed by that key, over a fresh challenge from the verifier.
A copied credential is useless without the phone.

SD-JWT is built from parts every platform already has: SHA-256, JSON, and the P-256 signatures that
phones keep in their secure hardware. That is why it won.

## What hashes can't hide

SD-JWT hides the claims you don't show. It doesn't hide that it's you.

Every presentation of the same credential carries the same issuer signature and the same list of
hashes. Two verifiers who compare notes, a bar and an online shop, or one website on two visits,
can see they were shown the same credential. They never learn your name, but they learn that the
person who bought the wine is the person who opened the account. That is linkability, and for a
national ID used everywhere it is the privacy problem that matters most.

The usual mitigation is to issue many copies of the credential, each with fresh salts and its own
signature, and use each copy once. It works, but it turns the wallet into a stock of single-use
credentials that has to be refilled, and it does nothing about an issuer who logs which copy went
to whom.

## The proof trick: BBS signatures

The second approach changes the signature itself. BBS signatures, being standardised at the IETF,
sign a list of messages rather than one document, and they let the holder do something no ordinary
signature allows: derive a new proof from the signature, for any subset of the messages, without
the issuer's help.

That proof is a zero-knowledge proof. It convinces the verifier that the holder knows a valid
issuer signature over a list containing these revealed values, and reveals nothing else, not even
the signature. Each proof is freshly randomised, so two presentations of the same credential look
unrelated. Unlinkability comes for free, from one credential, without a stock of copies.

The same machinery goes further than hiding. With range proofs on top, a holder can prove
`birthdate < 2008-11-24` without revealing the date at all, and the issuer never had to add an
`age_over_18` claim in advance. This is the cryptography in Dock's
[crypto-wasm](/projects/crypto-wasm/) and [crypto-wasm-ts](/projects/crypto-wasm-ts/) libraries,
which I contributed to, and it is a joy to work with once it runs.

## Why the better trick is hard to ship

If BBS is better, why does almost everyone ship SD-JWT? Three reasons, and none of them is about
the mathematics.

**The hardware doesn't speak it.** BBS works over a pairing-friendly curve, BLS12-381. The secure
chips in phones (Apple's Secure Enclave, Android's StrongBox) sign with P-256 and nothing else. So
the key that binds a credential to a device can't live in the chip that was built to protect it.
Teams work around this by splitting the proof, a BBS part and a P-256 part tied together, which is
possible but subtle, and subtle is a bad property for a national ID.

**The standards are younger.** SD-JWT is finished and every major wallet library speaks it. BBS is
still a draft, and the formats that carry it in credentials are drafts on top of a draft.
Governments certify against finished standards.

**Auditors have to understand it.** A hash list can be reviewed by any security team. A
zero-knowledge proof system needs reviewers who can read the paper behind it, and there are few of
them.

## Where Switzerland landed

Switzerland's E-ID, approved in the referendum of September 2025, started with SD-JWT: the format
the ecosystem can verify today, with device binding through the phone's secure hardware.
Unlinkability is the part of the roadmap that is still open, and the federal government has said
so in public, which is more than most national programmes do.

I think that was the right order. A credential nobody can verify protects nobody, and the
privacy SD-JWT does give, showing only what is asked, is already a large step from the plastic
card. But the bartender problem isn't solved until two verifiers can't tell they've met the same
person, and that needs proofs, not hashes.

If you want to see both approaches run, C4DT's [E-ID workshop](/projects/eid-workshop/) walks
through a wallet, an issuer and a verifier, hands on. And if you're building a wallet, an issuer or
a verifier yourself and want a second pair of eyes on it, [I take on that kind of
work](/work-with-me/).
