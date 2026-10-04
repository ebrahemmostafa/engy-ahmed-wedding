# Lail - Wedding Invitation Template

**Source:** https://www.farha-invitations.com/templates/lail/preview/

## File Structure

```
+-- index.html              # Main invitation page
+-- css/
|   +-- invite.css          # Beautified invitation styles
|   +-- google-fonts.css    # Google Fonts with local references
+-- js/
|   +-- invite.js           # Beautified invitation script
+-- assets/
    +-- fonts/              # All font files (Google woff2 + custom TTF/OTF)
    +-- images/             # All images (WebP, JPEG, JPG)
    +-- videos/             # Video files (MP4)
    +-- audio/              # Audio files (MP3)
```

## Fonts Used

**Google Fonts:** Amiri, Aref Ruqaa, Cairo, Cormorant Garamond, Gelasio, Great Vibes, Marcellus, Montserrat, Playfair Display, Reem Kufi, Tajawal

**Custom Fonts:** GreatVibes-Regular, Diwani_Letter, Daustley, DTHULUTH-II-1

## Notes

- All external URLs replaced with local file references
- CSS and JS beautified for readability
- Font URLs in google-fonts.css point to local woff2 files
- Background music: assets/audio/background-music.mp3

## Color Theme — White & Olive

- Envelope intro video and poster recolored from royal blue to olive (`goldleaf-olive-open.*`); the gold leaf seal is unchanged
- Navy sections → deep olive, cream sections → white, gold/navy accents → olive tones
- Hero titles are white with a soft olive shadow so they read over both the day and night frames of the hero video

## Guest Messages

The RSVP form sends each message to Supabase via `js/rsvp-supabase.js`. Messages from this site and the Arabic one are read on the passcode-protected `ahmed-engy-wedding-responses.html` page in the Arabic repo: https://github.com/ebrahemmostafa/ahmed-engy-wedding
