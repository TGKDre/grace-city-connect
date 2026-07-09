# Grace City Connect — Lovable Prompt History

## Initial Prompt (Jul 9, 2:11 PM)

I want to redesign BLWGraceCity.org as a multi-campus church website for BLW Grace City in the United States.

**Design references (visual only, not content):**
- https://www.myalivechurch.org/
- https://www.blwoasis.com/
- https://socialdallas.com/
- https://lwcanada.org/fellowships/

**Content source of truth:**
- https://www.blwgracecity.org/

## Strategy Lock (Jul 9, 2:18 PM)

1. **Positioning:** One church, many cities. Language: "campuses," never branches or HQ.
2. **Campus order:** Houston (main) > Dallas (2nd) > Los Angeles (3rd) > Boca Raton > College Station
3. **Sitemap:** Home · Campuses · Campus detail (x5) · About · Messages · Events · Next Steps · Contact
4. **Campus data:** Placeholders for now. Reminder to fill in real service times, addresses, pastors before shipping.
5. **Voice:** Loveworld Campus Ministry / Believers Loveworld register — grace, the Word, fellowship, ministry, the Spirit, testimonies. No generic-church or startup phrasing.

## Homepage Build Direction (Jul 9, 2:24 PM)

**Design direction locked:**
- Cinematic-bold, editorial aesthetic
- Deep midnight base (#0b0d12) with warm luminous gold accent
- Instrument Serif display + DM Sans body
- Large-format imagery, generous negative space, confident type scale
- Premium, youthful, spiritually alive — not corporate, not startup-y

**Homepage section order:**
1. Sticky header (logo · nav · campus switcher · "Plan a visit" CTA)
2. Hero — one-line movement statement, dual CTA (Plan a visit / Watch latest)
3. Campuses band — 5 cards: Houston, Dallas, LA, Boca Raton, College Station
4. Plan Your Visit — 3-step primer
5. About / Mission — Grace City identity + BLW voice
6. Messages / Livestream — featured message + livestream tile
7. Events — upcoming rail
8. Leadership — Pastor + campus pastors
9. Next Steps — Salvation · Foundation School · Cell · Give
10. Footer

**Campus discovery:** Persistent campus switcher in header (desktop: dropdown, mobile: sheet). Homepage surfaces all 5 as equal-weight cards. Each card → /campuses/$slug with service times, address, pastor, directions, plan-a-visit form.

## Campus Ministry Finder (Jul 9, 3:38 PM)

Added /fellowships finder: ZIP / city / school search over Loveworld Campus Ministry fellowships.
- Initial list: UH, Rice, TSU, TAMU, Blinn, UTD, SMU, UNT, UCLA, USC, CSULA, FAU, Lynn
- Each linked to its nearest Grace City campus
- "Plant a fellowship" CTA
- Nav links in header + footer
- All meeting locations/contacts are [Add…] placeholders

## Watch Page & Instagram Links (Jul 9, 3:47 PM)

- Added /watch page streaming every campus's services (Sunday + midweek by default)
- Each campus detail page has own Watch section with embedded stream tiles + Instagram link
- Each fellowship on /fellowships shows Instagram handle
- All stream URLs and IG handles are [Add…] placeholders
