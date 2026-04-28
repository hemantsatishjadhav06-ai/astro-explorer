# Graph Report - .  (2026-04-28)

## Corpus Check
- Corpus is ~11,619 words - fits in a single context window. You may not need a graph.

## Summary
- 52 nodes · 76 edges · 11 communities detected
- Extraction: 89% EXTRACTED · 11% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Test Suite|Test Suite]]
- [[_COMMUNITY_Core Astronomy Pipeline|Core Astronomy Pipeline]]
- [[_COMMUNITY_Save & Share System|Save & Share System]]
- [[_COMMUNITY_Recommendations Engine|Recommendations Engine]]
- [[_COMMUNITY_Project Identity & Rationale|Project Identity & Rationale]]
- [[_COMMUNITY_KP & Vedic Sub-Lord|KP & Vedic Sub-Lord]]
- [[_COMMUNITY_Chart Variants Grid|Chart Variants Grid]]
- [[_COMMUNITY_Lahiri Ayanamsa|Lahiri Ayanamsa]]
- [[_COMMUNITY_Navamsa D9|Navamsa D9]]
- [[_COMMUNITY_Western Aspects|Western Aspects]]
- [[_COMMUNITY_City Database|City Database]]

## God Nodes (most connected - your core abstractions)
1. `Astro Explorer (project)` - 12 edges
2. `computeChart() core pipeline` - 9 edges
3. `Lahiri Ayanamsa` - 8 edges
4. `Six Chart Variant Grid` - 8 edges
5. `KP Chart (Krishnamurti Paddhati)` - 6 edges
6. `Recommendations Engine` - 6 edges
7. `Lagan (Rasi) Chart` - 5 edges
8. `Bhav Chalit Chart` - 5 edges
9. `Nirayan Table` - 4 edges
10. `Navamsa D9 Chart` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Astro Explorer (project)` --references--> `Western Wheel`  [EXTRACTED]
  README.md → index.html
- `Astro Explorer (project)` --references--> `North Indian Kundli`  [EXTRACTED]
  README.md → index.html
- `Astro Explorer (project)` --references--> `Lagan (Rasi) Chart`  [EXTRACTED]
  README.md → index.html
- `Astro Explorer (project)` --references--> `KP Chart (Krishnamurti Paddhati)`  [EXTRACTED]
  README.md → index.html
- `Astro Explorer (project)` --references--> `Nirayan Table`  [EXTRACTED]
  README.md → index.html

## Hyperedges (group relationships)
- **Vedic Sidereal Stack** —  [INFERRED 0.90]
- **Save Targets** —  [EXTRACTED 1.00]
- **Six Chart Variant Grid** —  [EXTRACTED 1.00]

## Communities

### Community 0 - "Test Suite"
Cohesion: 0.22
Nodes (4): getEclipticLongitude(), getMeanLunarNode(), getNakshatra(), getSubLord()

### Community 1 - "Core Astronomy Pipeline"
Cohesion: 0.25
Nodes (9): Ascendant (Lagna), astronomy-engine library, computeChart() core pipeline, Equal House System, North Indian Kundli, Time Scrubber, Western Wheel, Whole-Sign House System (+1 more)

### Community 2 - "Save & Share System"
Cohesion: 0.52
Nodes (7): JSON Export, localStorage Auto-Save, PDF Print Layout, Save Bar (PDF, Share, Export), Share Link (URL hash), Rationale: no accounts, no backend, Save / Share / Restore Triad

### Community 3 - "Recommendations Engine"
Cohesion: 0.29
Nodes (7): Big-Three Readout (Sun/Moon/Asc), Your Context Textarea, Mean Lunar Node Formula (Rahu/Ketu), Nodal Axis Rule (Rahu-Ketu), Recommendations Engine, Saturn Return Window Rule, Stellium Detection (3+ planets in sign)

### Community 4 - "Project Identity & Rationale"
Cohesion: 0.4
Nodes (5): Sayana (Tropical) Chart, Astro Explorer (project), Rationale: outer planets omitted for legibility, Rationale: play tool not professional reading, Rationale: pure static single-file

### Community 5 - "KP & Vedic Sub-Lord"
Cohesion: 1.0
Nodes (3): KP Chart (Krishnamurti Paddhati), 27 Nakshatras, Vimshottari Sub-Lord

### Community 6 - "Chart Variants Grid"
Cohesion: 1.0
Nodes (3): Bhav Chalit Chart, Six Chart Variant Grid, Lagan (Rasi) Chart

### Community 7 - "Lahiri Ayanamsa"
Cohesion: 0.67
Nodes (3): Lahiri Ayanamsa, Nirayan Table, Lahiri anchor: 23.85 deg J2000, drift 50.27 arcsec/yr

### Community 8 - "Navamsa D9"
Cohesion: 1.0
Nodes (2): Navamsa D9 Chart, Navamsa D9 Mapping

### Community 9 - "Western Aspects"
Cohesion: 1.0
Nodes (1): Aspect Lines

### Community 10 - "City Database"
Cohesion: 1.0
Nodes (1): CITIES array (curated locations)

## Knowledge Gaps
- **14 isolated node(s):** `Navamsa D9 Mapping`, `Aspect Lines`, `PDF Print Layout`, `Saturn Return Window Rule`, `Stellium Detection (3+ planets in sign)` (+9 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Navamsa D9`** (2 nodes): `Navamsa D9 Chart`, `Navamsa D9 Mapping`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Western Aspects`** (1 nodes): `Aspect Lines`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `City Database`** (1 nodes): `CITIES array (curated locations)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `computeChart() core pipeline` connect `Core Astronomy Pipeline` to `Recommendations Engine`, `Lahiri Ayanamsa`?**
  _High betweenness centrality (0.166) - this node is a cross-community bridge._
- **Why does `Astro Explorer (project)` connect `Project Identity & Rationale` to `Core Astronomy Pipeline`, `KP & Vedic Sub-Lord`, `Chart Variants Grid`, `Lahiri Ayanamsa`, `Navamsa D9`?**
  _High betweenness centrality (0.112) - this node is a cross-community bridge._
- **Why does `Recommendations Engine` connect `Recommendations Engine` to `Core Astronomy Pipeline`?**
  _High betweenness centrality (0.099) - this node is a cross-community bridge._
- **What connects `Navamsa D9 Mapping`, `Aspect Lines`, `PDF Print Layout` to the rest of the system?**
  _14 weakly-connected nodes found - possible documentation gaps or missing edges._