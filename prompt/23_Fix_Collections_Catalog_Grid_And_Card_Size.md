# Prompt 23: Fix Collections Catalog Grid and Card Size

**User Prompt:**
> these are too big

---

### Diagnosis & Deliverables:
1. **Root Cause**: app/collections/page.jsx used class collections-catalog-grid which lacked multi-column CSS grid rules, resulting in 100% full-width stretched watch cards.
2. **Responsive Multi-Column Grid**: Set .collections-catalog-grid and .catalog-grid to 4 columns on desktop, 3 columns on medium screens, 2 on tablet/mobile.
3. **Card Dimension Parity**: Refined .catalog-card, .catalog-card-media (1:1 square ratio), .catalog-card-body, and all child elements to match the homepage collection cards.