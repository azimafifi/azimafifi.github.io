/* Case-study registry: the ONLY place case-study cards are defined.
   assets/js/main.js renders this array into #case-study-grid on index.html.

   To add a case study, append ONE object matching this exact schema:
   {
     slug:       kebab-case id, must match the detail page filename
     status:     short label shown in the badge ("Published" | "In progress" | "Concept")
     statusTone: "live" | "planned" | "concept"  (picks the badge color, see site.css)
     eyebrow:    small-caps kicker above the title
     title:      card headline (serif)
     summary:    1-2 sentence description, plain text, no HTML
     tags:       2-4 short strings
     href:       "./case-studies/<slug>.html" (relative to index.html)
   }
   Then create the detail page from case-studies/case-study-template.html. */

export const CASE_STUDIES = [
  {
    slug: 'ai-in-education',
    status: 'Published',
    statusTone: 'live',
    eyebrow: 'Published article',
    title: 'AI in Education',
    summary:
      'Teaching design in the age of the thinking machines: what a first-day icebreaker revealed about outsourced thinking, and what design educators must protect. Written for MIID.',
    tags: ['Design pedagogy', 'AI & authorship', 'Higher education'],
    href: './case-studies/ai-in-education.html'
  },
  {
    slug: 'module-transformation',
    status: 'In progress',
    statusTone: 'planned',
    eyebrow: 'Planned study',
    title: 'Module Transformation',
    summary:
      'Converting a semester-long curriculum into a comprehensive year-long learning program: the plan, the pedagogy, and what gets documented along the way.',
    tags: ['Curriculum design', 'Program architecture', 'Retention'],
    href: './case-studies/module-transformation.html'
  },
  {
    slug: 'the-learning-floorplan',
    status: 'Concept',
    statusTone: 'concept',
    eyebrow: 'Framework concept',
    title: 'The Learning Floorplan',
    summary:
      'What happens when you plan a corporate training program the way an interior architect plans a floor: sightlines, circulation, thresholds, and dwell points, applied to an onboarding journey.',
    tags: ['Corporate L&D', 'Spatial design', 'Experiential learning'],
    href: './case-studies/the-learning-floorplan.html'
  }
];
