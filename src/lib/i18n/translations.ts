export type Locale = "en" | "zh";

export const translations = {
  en: {
    nav: {
      instagram: "Instagram",
      about: "About Rugby",
      parents: "Parents & Coaches",
      schedule: "Schedule",
      joining: "Joining Process",
      mission: "Our Mission",
      registerFreeTrial: "Register Free Trial",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      faq: "FAQ",
    },
    common: {
      registerFreeTrial: "Register Free Trial",
      registerForFreeTrial: "Register for a Free Trial",
      miniRugby: "Mini Rugby",
      readMore: "Read more",
      viewOnInstagram: "View on Instagram",
      openInInstagram: "Open in Instagram",
      likes: "likes",
      comments: "comments",
      switchToChinese: "Switch to Traditional Chinese",
      switchToEnglish: "Switch to English",
    },
    hero: {
      badge: "Ages 4Ã¢ÂÂ12 ÃÂ· All Welcome",
      title: "Unleash Their",
      titleHighlight: "Inner Tiger",
      subtitle: "Fun-first mini rugby at King's Park Ã¢ÂÂ safe, inclusive, and skill-building. The perfect start on the pathway to USRC Tigers youth & senior teams.",
      watchVideo: "Watch Our Minis in Action",
      imageAlt: "USRC Tigers mini rugby players in action at King's Park",
      trustSignals: [
          "Part of USRC Tigers RFC",
          "King's Park, Hong Kong",
          "Youth & Senior Pathway",
        ],
      stats: {
        miniPlayers: "Mini Players",
        ageGroups: "Age Groups",
        parentCoaches: "Parent Coaches",
        yearsHeritage: "Years of Heritage",
      },
    },
    about: {
      eyebrow: "The Mini Experience",
      title: "More Than a Game",
      description: "USRC Tigers Mini Rugby is where Hong Kong children discover the joy of rugby Ã¢ÂÂ through laughter, friendship, and gradual skill development in a safe, welcoming environment.",
      body: "We believe every child deserves a brilliant start in sport Ã¢ÂÂ regardless of ability, gender, or background. Our sessions blend structured coaching with free play, so kids build confidence naturally.",
      bullets: [
          "Inclusive for all abilities and genders",
          "Character building through teamwork & respect",
          "Friendships that extend beyond the pitch",
          "Clear touch Ã¢ÂÂ contact progression by age",
        ],
      tryFree: "Try a Free Session",
      ageGroupsTitle: "Age Groups",
      ageGroupsNote: "PLACEHOLDER Ã¢ÂÂ confirm exact groupings for 2026/27 season",
      agesRange: "Ages 4Ã¢ÂÂ12",
      imageAlt: "USRC Tigers mini rugby players running with the ball",
      benefits: [
          {
          title: "Fun First, Always",
          description: "Every session is designed so kids fall in love with rugby Ã¢ÂÂ smiles before scrums.",
          },
          {
          title: "Safe & Inclusive",
          description: "All abilities and genders welcome. Qualified coaches, age-appropriate training, and a supportive culture.",
          },
          {
          title: "Skills That Last",
          description: "Coordination, teamwork, resilience, and respect Ã¢ÂÂ on and off the pitch.",
          },
          {
          title: "Clear Pathway",
          description: "From minis through USRC Tigers youth teams to senior rugby in Hong Kong.",
          },
        ],
      ageGroups: [
          {
          name: "U5 Ã¢ÂÂ U6",
          tag: "Touch Rugby",
          description: "Non-contact fun with tag games, running, and basic ball skills. Perfect first taste of rugby.",
          },
          {
          name: "U7 Ã¢ÂÂ U8",
          tag: "Mini Touch",
          description: "Introduction to teamwork, passing, and spatial awareness through structured games and drills.",
          },
          {
          name: "U9 Ã¢ÂÂ U10",
          tag: "Development",
          description: "Building core skills, confidence, and game understanding with gradual contact introduction.",
          },
          {
          name: "U11 Ã¢ÂÂ U12",
          tag: "Contact Ready",
          description: "Safe, coached contact rugby preparing players for youth rugby and HK competitions.",
          },
        ],
    },
    parents: {
      eyebrow: "Parents & Coaches",
      title: "You're Part of the Team",
      description: "No experience needed Ã¢ÂÂ for kids or parents. USRC Tigers Mini Rugby is built on a supportive parent-coach model where families grow together.",
      highlights: [
          {
          title: "Parent-Coach Model",
          description: "Many sessions are led by trained parent-coaches who know your child by name. It's a community, not just a club.",
          },
          {
          title: "Clear Communication",
          description: "WhatsApp groups, session updates, and friendly faces at every training. You'll always know what's happening.",
          },
          {
          title: "Professional Standards",
          description: "HKRU-aligned coaching, safeguarding policies, and ongoing training for all volunteers.",
          },
        ],
      testimonialsNote: "Real stories from families in our community Ã¢ÂÂ PLACEHOLDER testimonials to be replaced with actual parent quotes.",
      testimonials: [
          {
          name: "Sarah L.",
          role: "Parent of U7 player",
          quote: "My son was nervous on day one Ã¢ÂÂ by week three he couldn't wait for Sunday. The coaches make every child feel seen and celebrated.",
          },
          {
          name: "James & Mei C.",
          role: "Parents of U9 twins",
          quote: "We love the parent-coach community. Clear WhatsApp updates, friendly faces, and zero pressure. It's the highlight of our week.",
          },
          {
          name: "Priya K.",
          role: "Parent of U6 player",
          quote: "No rugby experience needed Ã¢ÂÂ they walked us through everything. Our daughter has made friends across schools and gained so much confidence.",
          },
          {
          name: "David W.",
          role: "Parent-coach, U10",
          quote: "Coaching alongside my daughter has been incredible. The club supports parents every step Ã¢ÂÂ templates, guidance, and a real team spirit.",
          },
        ],
      ctaTitle: "No Experience? No Problem.",
      ctaBody: "Whether your child is picking up a rugby ball for the first time or you're considering coaching alongside them Ã¢ÂÂ we provide everything you need. Templates, mentoring, and a welcoming community that celebrates every small win.",
      ctaButton: "Join Our Community",
      imageAlt: "USRC Tigers parent-coach leading a safe tackle drill",
    },
    schedule: {
      eyebrow: "Training & Competitions",
      title: "When We Play",
      description: "Regular Sunday sessions at King's Park, plus fun HK Mini Rugby festivals throughout the season. Exact 2026/27 timings confirmed after registration.",
      table: {
        group: "Group",
        day: "Day",
        time: "Time",
        location: "Location",
      },
      rows: [
          {
          group: "All Age Groups",
          day: "Sunday",
          time: "9:00 AM Ã¢ÂÂ 11:00 AM",
          location: "King's Park Sports Ground, Ho Man Tin",
          note: "Exact session times by age group TBC for 2026/27 season",
          },
          {
          group: "Competition Days",
          day: "Selected Sundays",
          time: "Varies",
          location: "HK Mini Rugby venues",
          note: "Fun, development-focused HK Mini Rugby festivals & tournaments",
          },
        ],
      locationTitle: "King's Park Sports Ground",
      locationBody: "Ho Man Tin, Hong Kong. Spacious pitches perfect for safe mini rugby. Easy access via MTR and bus routes.",
      mapLive: "Live",
      mapExpandHint: "Click to expand",
      mapDirections: "Get directions",
      competitionTitle: "HK Mini Rugby Competitions",
      competitionBody: "Selected Sundays feature Hong Kong Mini Rugby festivals and tournaments Ã¢ÂÂ development-focused, fun, and a brilliant experience for the whole family.",
      cta: "Register & Get Schedule Updates",
    },
    joining: {
      eyebrow: "Getting Started",
      title: "Join in 4 Easy Steps",
      description: "Super simple Ã¢ÂÂ register via our official GameDay link and we handle everything else. No payment processing on this website.",
      steps: [
          {
          title: "Click Register",
          description: "Hit any yellow Register button Ã¢ÂÂ you'll go straight to our official GameDay form.",
          },
          {
          title: "Complete GameDay",
          description: "Fill in player details, emergency contacts, and consent. No payment on this website.",
          },
          {
          title: "We Welcome You",
          description: "Our team confirms your registration and sends everything you need for the first session.",
          },
          {
          title: "Show Up & Play",
          description: "Bring boots, water, and a smile. First trial session is free Ã¢ÂÂ come see if Tigers is the right fit.",
          },
        ],
      badge: "Official registration via GameDay Ã¢ÂÂ secure & simple",
      ctaTitle: "Ready to Register?",
      ctaBody: "Just click, complete the GameDay form, and we'll take care of the rest. First trial session is completely free.",
      ctaButton: "Register on GameDay",
      ctaNote: "No payment processing on this site Ã¢ÂÂ everything goes through official GameDay",
    },
    mission: {
      eyebrow: "Our Purpose",
      title: "Why We Exist",
      description: "USRC Tigers Mini Rugby exists to give every child the chance to discover rugby — and themselves — in a safe, joyful, and ambitious environment.",
      imageCaption: "Building Tigers for Life",
      pillars: [
          {
          title: "Joy Beyond Academics",
          description: "Hong Kong children deserve space to run, laugh, and compete Ã¢ÂÂ rugby gives them that freedom and belonging.",
          },
          {
          title: "Confidence & Life Skills",
          description: "Resilience, teamwork, discipline, and respect Ã¢ÂÂ lessons that shape character far beyond the try line.",
          },
          {
          title: "Mini Ã¢ÂÂ Youth Ã¢ÂÂ Senior",
          description: "A clear, supported pathway from first touch rugby through USRC Tigers youth teams to senior Hong Kong rugby.",
          },
        ],
      quote: "We're not just building rugby players Ã¢ÂÂ we're building confident, kind, resilient young people who carry the Tiger spirit wherever they go.",
      quoteAuthor: "Ã¢ÂÂ USRC Tigers Mini Rugby Committee",
      cta: "Start Their Journey",
      imageAlt: "USRC Tigers mini rugby players in tiger-stripe kit",
    },
    instagram: {
      eyebrow: "Social Proof",
      title: "Real Moments from Our Minis",
      description: "Training days, festival wins, kit handouts, and Sunday smiles Ã¢ÂÂ see why families love being part of the Tiger community.",
      followNote: "Follow along for weekly updates from King's Park Ã¢ÂÂ new sessions, festival days, and registration reminders.",
      followButton: "Follow @usrctigers_minis on Instagram",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Parent Questions",
      description: "Everything you need to know before the first session. Still unsure? Register for a free trial and see for yourself.",
      items: [
          {
          question: "Does my child need rugby experience?",
          answer: "Not at all. We welcome complete beginners and children who've played other sports. Coaches adapt sessions so every child progresses at their own pace.",
          },
          {
          question: "What should we bring to the first session?",
          answer: "Rugby boots or trainers with studs (if you have them), comfortable sports clothes, a water bottle, and sun protection. We'll send a full kit list after registration.",
          },
          {
          question: "How safe is mini rugby?",
          answer: "Safety is our top priority. Sessions are age-appropriate, coached by qualified volunteers, and follow HK Rugby Union mini rugby guidelines. Contact is introduced gradually with proper technique.",
          },
          {
          question: "What are the fees?",
          answer: "Season fees are confirmed each year and processed through GameDay. PLACEHOLDER: expect approximately HK$2,500Ã¢ÂÂ3,500 per season depending on age group. Trial sessions are free.",
          },
          {
          question: "Can parents get involved?",
          answer: "Absolutely! Many of our coaches are parents. No experience required Ã¢ÂÂ we provide training, resources, and support. You're part of a welcoming community.",
          },
          {
          question: "Where do you train?",
          answer: "King's Park Sports Ground, Ho Man Tin, Hong Kong. Easy MTR access and plenty of space for safe, energetic sessions.",
          },
        ],
    },
    finalCta: {
      eyebrow: "Your Child's Adventure Starts Here",
      title: "Give Them the Gift of",
      titleHighlight: "Rugby",
      description: "One free trial session. No commitment. Just click, register on GameDay, and watch them fall in love with the game Ã¢ÂÂ and a community that feels like family.",
      followInstagram: "Follow on Instagram",
      footer: "Part of USRC Tigers RFC ÃÂ· King's Park, Hong Kong ÃÂ· HK Rugby Pathway",
    },
    footer: {
      tagline: "Hong Kong's premier mini rugby programme Ã¢ÂÂ fun, safe, and built for every child aged 4Ã¢ÂÂ12.",
      quickLinks: "Quick Links",
      registerConnect: "Register & Connect",
      gamedayLink: "GameDay Registration Ã¢ÂÂ",
      location: "King's Park Sports Ground, Ho Man Tin, HK",
      readyTitle: "Ready to Join?",
      readyBody: "First trial session is free. Register in minutes via GameDay.",
      copyright: "USRC Tigers Mini Rugby. Part of USRC Tigers RFC.",
      legal: "Child protection and safeguarding policies apply. All coaches are vetted volunteers. No payment processing on this website Ã¢ÂÂ all registrations and fees via official GameDay.",
    },
    videoModal: {
      title: "Minis in Action",
      subtitle: "Watch our community on Instagram",
      placeholder: "PLACEHOLDER Ã¢ÂÂ embed a YouTube highlight reel or link directly to recent Instagram Reels from",
      viewOnInstagram: "View on Instagram",
      close: "Close",
    },
  },
  zh: {
    nav: {
      instagram: "Instagram",
      about: "Ã©ÂÂÃ¦ÂÂ¼Ã¦Â¬ÂÃ§ÂÂ",
      parents: "Ã¥Â®Â¶Ã©ÂÂ·Ã¨ÂÂÃ¦ÂÂÃ§Â·Â´",
      schedule: "Ã¨Â¨ÂÃ§Â·Â´Ã¦ÂÂÃ©ÂÂ",
      joining: "Ã¥Â Â±Ã¥ÂÂÃ¦ÂµÂÃ§Â¨Â",
      mission: "Ã¦ÂÂÃ¥ÂÂÃ§ÂÂÃ¤Â½Â¿Ã¥ÂÂ½",
      registerFreeTrial: "Ã¥ÂÂÃ¨Â²Â»Ã¨Â©Â¦Ã§ÂÂ©Ã¥Â Â±Ã¥ÂÂ",
      openMenu: "Ã©ÂÂÃ¥ÂÂÃ©ÂÂ¸Ã¥ÂÂ®",
      closeMenu: "Ã©ÂÂÃ©ÂÂÃ©ÂÂ¸Ã¥ÂÂ®",
      faq: "Ã¥Â¸Â¸Ã¨Â¦ÂÃ¥ÂÂÃ©Â¡Â",
    },
    common: {
      registerFreeTrial: "Ã¥ÂÂÃ¨Â²Â»Ã¨Â©Â¦Ã§ÂÂ©Ã¥Â Â±Ã¥ÂÂ",
      registerForFreeTrial: "Ã¥ÂÂÃ¨Â²Â»Ã¨Â©Â¦Ã§ÂÂ©Ã¥Â Â±Ã¥ÂÂ",
      miniRugby: "Ã¥Â¹Â¼Ã¥ÂÂÃ¦Â¬ÂÃ§ÂÂ",
      readMore: "Ã¦ÂÂ¥Ã§ÂÂÃ¦ÂÂ´Ã¥Â¤Â",
      viewOnInstagram: "Ã¥ÂÂ¨ Instagram Ã¦ÂÂ¥Ã§ÂÂ",
      openInInstagram: "Ã¥ÂÂ¨ Instagram Ã©ÂÂÃ¥ÂÂ",
      likes: "Ã¨Â®ÂÃ¥Â¥Â½",
      comments: "Ã§ÂÂÃ¨Â¨Â",
      switchToChinese: "Ã¥ÂÂÃ¦ÂÂÃ¨ÂÂ³Ã§Â¹ÂÃ©Â«ÂÃ¤Â¸Â­Ã¦ÂÂ",
      switchToEnglish: "Ã¥ÂÂÃ¦ÂÂÃ¨ÂÂ³Ã¨ÂÂ±Ã¦ÂÂ",
    },
    hero: {
      badge: "4Ã¢ÂÂ12 Ã¦Â­Â² ÃÂ· Ã¦Â­Â¡Ã¨Â¿ÂÃ¦ÂÂÃ¦ÂÂÃ¥Â°ÂÃ¦ÂÂÃ¥ÂÂ",
      title: "Ã©ÂÂÃ¦ÂÂ¾Ã¤Â»ÂÃ¥ÂÂÃ§ÂÂ",
      titleHighlight: "Ã§ÂÂÃ¨ÂÂÃ§Â²Â¾Ã§Â¥Â",
      subtitle: "Ã¥ÂÂ¨Ã¤ÂºÂ¬Ã¥Â£Â«Ã¦ÂÂÃ¤ÂºÂ«Ã¥ÂÂÃ¤Â»Â¥Ã¥Â¿Â«Ã¦Â¨ÂÃ§ÂÂºÃ¥ÂÂÃ§ÂÂÃ¥Â¹Â¼Ã¥ÂÂÃ¦Â¬ÂÃ§ÂÂÃ¢ÂÂÃ¢ÂÂÃ¥Â®ÂÃ¥ÂÂ¨Ã£ÂÂÃ¥ÂÂ±Ã¨ÂÂÃ£ÂÂÃ¥Â¾ÂªÃ¥ÂºÂÃ¦Â¼Â¸Ã©ÂÂ²Ã¥ÂÂ°Ã¥ÂÂ¹Ã©Â¤ÂÃ¦ÂÂÃ¨ÂÂ½Ã£ÂÂÃ¨Â¸ÂÃ¤Â¸Â USRC Tigers Ã©ÂÂÃ¥Â¹Â´Ã¥ÂÂÃ¦ÂÂÃ¤ÂºÂºÃ©ÂÂÃ§ÂÂÃ¦Â¸ÂÃ¦ÂÂ°Ã§ÂÂ¼Ã¥Â±ÂÃ¤Â¹ÂÃ¨Â·Â¯Ã£ÂÂ",
      watchVideo: "Ã¨Â§ÂÃ§ÂÂÃ¦ÂÂÃ¥ÂÂÃ§ÂÂÃ¥Â¹Â¼Ã¥ÂÂÃ¨Â¨ÂÃ§Â·Â´",
      imageAlt: "Ã¤Â¸ÂÃ¨Â»ÂÃ¦ÂÂÃ§ÂÂÃ¨ÂÂÃ¦Â¬ÂÃ§ÂÂÃ¦ÂÂÃ¥Â¹Â¼Ã¥ÂÂÃ¦Â¬ÂÃ§ÂÂÃ¨Â¨ÂÃ§Â·Â´",
      trustSignals: [
          "USRC Tigers RFC Ã¦ÂÂÃ¤Â¸Â",
          "Ã©Â¦ÂÃ¦Â¸Â¯Ã¤ÂºÂ¬Ã¥Â£Â«Ã¦ÂÂ",
          "Ã©ÂÂÃ¥Â¹Â´Ã¥ÂÂÃ¦ÂÂÃ¤ÂºÂºÃ§ÂÂ¼Ã¥Â±ÂÃ©ÂÂÃ©ÂÂ",
        ],
      stats: {
        miniPlayers: "Ã¥Â¹Â¼Ã¥ÂÂÃ§ÂÂÃ¥ÂÂ¡",
        ageGroups: "Ã¥Â¹Â´Ã©Â½Â¡Ã§ÂµÂÃ¥ÂÂ¥",
        parentCoaches: "Ã¥Â®Â¶Ã©ÂÂ·Ã¦ÂÂÃ§Â·Â´",
        yearsHeritage: "Ã¥Â¹Â´Ã¥ÂÂ³Ã§ÂµÂ±",
      },
    },
    about: {
      eyebrow: "Ã¥Â¹Â¼Ã¥ÂÂÃ¦Â¬ÂÃ§ÂÂÃ©Â«ÂÃ©Â©Â",
      title: "Ã¤Â¸ÂÃ¥ÂÂªÃ¦ÂÂ¯Ã©ÂÂÃ¥ÂÂ",
      description: "USRC Tigers Ã¥Â¹Â¼Ã¥ÂÂÃ¦Â¬ÂÃ§ÂÂÃ¨Â®ÂÃ©Â¦ÂÃ¦Â¸Â¯Ã¥Â°ÂÃ¦ÂÂÃ¥ÂÂÃ¥ÂÂ¨Ã¦Â­Â¡Ã§Â¬ÂÃ£ÂÂÃ¥ÂÂÃ¨ÂªÂ¼Ã¥ÂÂÃ¥Â¾ÂªÃ¥ÂºÂÃ¦Â¼Â¸Ã©ÂÂ²Ã§ÂÂÃ¦ÂÂÃ¨Â¡ÂÃ¥ÂÂ¹Ã©Â¤ÂÃ¤Â¸Â­Ã¯Â¼ÂÃ§ÂÂ¼Ã§ÂÂ¾Ã¦Â¬ÂÃ§ÂÂÃ§ÂÂÃ¦Â¨ÂÃ¨Â¶Â£Ã¢ÂÂÃ¢ÂÂÃ¥Â®ÂÃ¥ÂÂ¨Ã¨ÂÂÃ¦ÂºÂ«Ã©Â¦Â¨Ã§ÂÂÃ§ÂÂ°Ã¥Â¢ÂÃ£ÂÂ",
      body: "Ã¦ÂÂÃ¥ÂÂÃ§ÂÂ¸Ã¤Â¿Â¡Ã¦Â¯ÂÃ¥ÂÂÃ¥Â­Â©Ã¥Â­ÂÃ©ÂÂ½Ã¥ÂÂ¼Ã¥Â¾ÂÃ¦ÂÂÃ¦ÂÂÃ§Â²Â¾Ã¥Â½Â©Ã§ÂÂÃ©ÂÂÃ¥ÂÂÃ¨ÂµÂ·Ã¦Â­Â¥Ã¢ÂÂÃ¢ÂÂÃ¤Â¸ÂÃ¨Â«ÂÃ¨ÂÂ½Ã¥ÂÂÃ£ÂÂÃ¦ÂÂ§Ã¥ÂÂ¥Ã¦ÂÂÃ¨ÂÂÃ¦ÂÂ¯Ã£ÂÂÃ¨Â¨ÂÃ§Â·Â´Ã§ÂµÂÃ¥ÂÂÃ¦ÂÂÃ§Â³Â»Ã§ÂµÂ±Ã§ÂÂÃ¦ÂÂÃ¥Â°ÂÃ¨ÂÂÃ¨ÂÂªÃ§ÂÂ±Ã§ÂÂ©Ã¨ÂÂÃ¯Â¼ÂÃ¨Â®ÂÃ¥Â­Â©Ã¥Â­ÂÃ¨ÂÂªÃ§ÂÂ¶Ã¥Â»ÂºÃ§Â«ÂÃ¨ÂÂªÃ¤Â¿Â¡Ã£ÂÂ",
      bullets: [
          "Ã¦Â­Â¡Ã¨Â¿ÂÃ¦ÂÂÃ¦ÂÂÃ¨ÂÂ½Ã¥ÂÂÃ¨ÂÂÃ¦ÂÂ§Ã¥ÂÂ¥",
          "Ã©ÂÂÃ©ÂÂÃ¥ÂÂÃ©ÂÂÃ¥ÂÂÃ¤Â½ÂÃ¨ÂÂÃ¥Â°ÂÃ©ÂÂÃ¥ÂÂ¹Ã©Â¤ÂÃ¥ÂÂÃ¦Â Â¼",
          "Ã¥Â»ÂºÃ§Â«ÂÃ¨Â¶ÂÃ¨Â¶ÂÃ§ÂÂÃ¥Â Â´Ã§ÂÂÃ¥ÂÂÃ¨ÂªÂ¼",
          "Ã¦ÂÂÃ¥Â¹Â´Ã©Â½Â¡Ã¥Â¾ÂªÃ¥ÂºÂÃ¦Â¼Â¸Ã©ÂÂ²Ã¯Â¼ÂÃ©ÂÂÃ¥Â°ÂÃ¦ÂÂ Ã¢ÂÂ Ã¥Â°ÂÃ¦ÂÂ",
        ],
      tryFree: "Ã¥ÂÂÃ¨Â²Â»Ã¨Â©Â¦Ã§ÂÂ©Ã¤Â¸ÂÃ¨ÂªÂ²",
      ageGroupsTitle: "Ã¥Â¹Â´Ã©Â½Â¡Ã§ÂµÂÃ¥ÂÂ¥",
      ageGroupsNote: "Ã¤Â½ÂÃ¤Â½ÂÃ§Â¬Â¦ Ã¢ÂÂ 2026/27 Ã¨Â³Â½Ã¥Â­Â£Ã§Â¢ÂºÃ¥ÂÂÃ¥ÂÂÃ§ÂµÂÃ¥Â¾ÂÃ§Â¢ÂºÃ¨ÂªÂ",
      agesRange: "4Ã¢ÂÂ12 Ã¦Â­Â²",
      imageAlt: "Ã¤Â¸ÂÃ¨Â»ÂÃ¦ÂÂÃ§ÂÂÃ¨ÂÂÃ¦Â¬ÂÃ§ÂÂÃ¦ÂÂÃ¥Â¹Â¼Ã¥ÂÂÃ¦Â¬ÂÃ§ÂÂÃ¥ÂÂ¡Ã¥Â¸Â¶Ã§ÂÂÃ¥Â¥ÂÃ¨Â·Â",
      benefits: [
          {
          title: "Ã¥Â¿Â«Ã¦Â¨ÂÃ¨ÂÂ³Ã¤Â¸Â",
          description: "Ã¦Â¯ÂÃ¥Â ÂÃ¨Â¨ÂÃ§Â·Â´Ã©ÂÂ½Ã¨Â®ÂÃ¥Â­Â©Ã¥Â­ÂÃ¦ÂÂÃ¤Â¸ÂÃ¦Â¬ÂÃ§ÂÂÃ¢ÂÂÃ¢ÂÂÃ§Â¬ÂÃ¥Â®Â¹Ã¦Â¯Â scrum Ã¦ÂÂ´Ã©ÂÂÃ¨Â¦ÂÃ£ÂÂ",
          },
          {
          title: "Ã¥Â®ÂÃ¥ÂÂ¨Ã¥ÂÂ±Ã¨ÂÂ",
          description: "Ã¦Â­Â¡Ã¨Â¿ÂÃ¦ÂÂÃ¦ÂÂÃ¨ÂÂ½Ã¥ÂÂÃ¨ÂÂÃ¦ÂÂ§Ã¥ÂÂ¥Ã£ÂÂÃ¥ÂÂÃ¨Â³ÂÃ¦Â Â¼Ã¦ÂÂÃ§Â·Â´Ã£ÂÂÃ©ÂÂ©Ã©Â½Â¡Ã¨Â¨ÂÃ§Â·Â´Ã£ÂÂÃ¦ÂÂ¯Ã¦ÂÂ´Ã¦ÂÂ§Ã¦ÂÂÃ¥ÂÂÃ£ÂÂ",
          },
          {
          title: "Ã§ÂµÂÃ¨ÂºÂ«Ã¥ÂÂÃ§ÂÂ¨Ã§ÂÂÃ¦ÂÂÃ¨ÂÂ½",
          description: "Ã¥ÂÂÃ¨ÂªÂ¿Ã£ÂÂÃ¥ÂÂÃ©ÂÂÃ£ÂÂÃ©ÂÂÃ¦ÂÂ§Ã¨ÂÂÃ¥Â°ÂÃ©ÂÂÃ¢ÂÂÃ¢ÂÂÃ¥Â Â´Ã¥ÂÂ§Ã¥Â Â´Ã¥Â¤ÂÃ§ÂÂÃ¥ÂÂÃ§ÂÂÃ£ÂÂ",
          },
          {
          title: "Ã¦Â¸ÂÃ¦ÂÂ°Ã§ÂÂ¼Ã¥Â±ÂÃ©ÂÂÃ©ÂÂ",
          description: "Ã¥Â¾ÂÃ¥Â¹Â¼Ã¥ÂÂÃ¥ÂÂ° USRC Tigers Ã©ÂÂÃ¥Â¹Â´Ã©ÂÂÃ¯Â¼ÂÃ¤Â»Â¥Ã¨ÂÂ³Ã©Â¦ÂÃ¦Â¸Â¯Ã¦ÂÂÃ¤ÂºÂºÃ¦Â¬ÂÃ§ÂÂÃ£ÂÂ",
          },
        ],
      ageGroups: [
          {
          name: "U5 Ã¢ÂÂ U6",
          tag: "Ã©ÂÂÃ¥Â°ÂÃ¦ÂÂÃ¦Â¬ÂÃ§ÂÂ",
          description: "Ã©ÂÂÃ¥Â°ÂÃ¦ÂÂÃ§ÂÂÃ¨Â¿Â½Ã©ÂÂÃ©ÂÂÃ¦ÂÂ²Ã£ÂÂÃ¨Â·ÂÃ¦Â­Â¥Ã¥ÂÂÃ¥ÂÂºÃ¦ÂÂ¬Ã¦ÂÂ§Ã§ÂÂÃ¢ÂÂÃ¢ÂÂÃ¥Â®ÂÃ§Â¾ÂÃ§ÂÂÃ¦Â¬ÂÃ§ÂÂÃ¥ÂÂÃ©Â«ÂÃ©Â©ÂÃ£ÂÂ",
          },
          {
          name: "U7 Ã¢ÂÂ U8",
          tag: "Ã¨Â¿Â·Ã¤Â½Â Ã©ÂÂÃ¥Â°ÂÃ¦ÂÂ",
          description: "Ã©ÂÂÃ©ÂÂÃ¦ÂÂÃ§Â³Â»Ã§ÂµÂ±Ã§ÂÂÃ©ÂÂÃ¦ÂÂ²Ã¥ÂÂÃ§Â·Â´Ã§Â¿ÂÃ¯Â¼ÂÃ¨ÂªÂÃ¨Â­ÂÃ¥ÂÂÃ©ÂÂÃ¥ÂÂÃ¤Â½ÂÃ£ÂÂÃ¥ÂÂ³Ã§ÂÂÃ¥ÂÂÃ§Â©ÂºÃ©ÂÂÃ¦ÂÂÃ¨Â­ÂÃ£ÂÂ",
          },
          {
          name: "U9 Ã¢ÂÂ U10",
          tag: "Ã§ÂÂ¼Ã¥Â±ÂÃ©ÂÂÃ¦Â®Âµ",
          description: "Ã¥Â»ÂºÃ§Â«ÂÃ¦Â Â¸Ã¥Â¿ÂÃ¦ÂÂÃ¨ÂÂ½Ã£ÂÂÃ¤Â¿Â¡Ã¥Â¿ÂÃ¥ÂÂÃ¦Â¯ÂÃ¨Â³Â½Ã§ÂÂÃ¨Â§Â£Ã¯Â¼ÂÃ©ÂÂÃ¦Â­Â¥Ã¥Â¼ÂÃ¥ÂÂ¥Ã¥Â°ÂÃ¦ÂÂÃ¥ÂÂÃ§Â´Â Ã£ÂÂ",
          },
          {
          name: "U11 Ã¢ÂÂ U12",
          tag: "Ã¥Â°ÂÃ¦ÂÂÃ¦ÂºÂÃ¥ÂÂ",
          description: "Ã¥Â®ÂÃ¥ÂÂ¨Ã£ÂÂÃ¦ÂÂÃ¦ÂÂÃ¥Â°ÂÃ§ÂÂÃ¥Â°ÂÃ¦ÂÂÃ¦Â¬ÂÃ§ÂÂÃ¯Â¼ÂÃ§ÂÂºÃ©ÂÂÃ¥Â¹Â´Ã¦Â¬ÂÃ§ÂÂÃ¥ÂÂÃ©Â¦ÂÃ¦Â¸Â¯Ã¦Â¯ÂÃ¨Â³Â½Ã¥ÂÂÃ¥Â¥Â½Ã¦ÂºÂÃ¥ÂÂÃ£ÂÂ",
          },
        ],
    },
    parents: {
      eyebrow: "Ã¥Â®Â¶Ã©ÂÂ·Ã¨ÂÂÃ¦ÂÂÃ§Â·Â´",
      title: "Ã¦ÂÂ¨Ã¤Â¹ÂÃ¦ÂÂ¯Ã¥ÂÂÃ©ÂÂÃ¤Â¸ÂÃ¥ÂÂ¡",
      description: "Ã¥Â°ÂÃ¦ÂÂÃ¥ÂÂÃ¥ÂÂÃ¥Â®Â¶Ã©ÂÂ·Ã©ÂÂ½Ã§ÂÂ¡Ã©ÂÂÃ§Â¶ÂÃ©Â©ÂÃ£ÂÂUSRC Tigers Ã¥Â¹Â¼Ã¥ÂÂÃ¦Â¬ÂÃ§ÂÂÃ¤Â»Â¥Ã¥Â®Â¶Ã©ÂÂ·Ã¦ÂÂÃ§Â·Â´Ã¦Â¨Â¡Ã¥Â¼ÂÃ§ÂÂºÃ¦ÂÂ¬Ã¯Â¼ÂÃ¨Â®ÂÃ¥Â®Â¶Ã¥ÂºÂ­Ã¤Â¸ÂÃ¨ÂµÂ·Ã¦ÂÂÃ©ÂÂ·Ã£ÂÂ",
      highlights: [
          {
          title: "Ã¥Â®Â¶Ã©ÂÂ·Ã¦ÂÂÃ§Â·Â´Ã¦Â¨Â¡Ã¥Â¼Â",
          description: "Ã¨Â¨Â±Ã¥Â¤ÂÃ¨Â¨ÂÃ§Â·Â´Ã§ÂÂ±Ã¥ÂÂÃ¨Â¨ÂÃ§ÂÂÃ¥Â®Â¶Ã©ÂÂ·Ã¦ÂÂÃ§Â·Â´Ã¥Â¸Â¶Ã©Â ÂÃ¯Â¼ÂÃ¨ÂªÂÃ¨Â­ÂÃ¦Â¯ÂÃ¥ÂÂÃ¥Â­Â©Ã¥Â­ÂÃ§ÂÂÃ¥ÂÂÃ¥Â­ÂÃ¢ÂÂÃ¢ÂÂÃ©ÂÂÃ¦ÂÂ¯Ã§Â¤Â¾Ã¥ÂÂÃ¯Â¼ÂÃ¤Â¸ÂÃ¥ÂÂªÃ¦ÂÂ¯Ã§ÂÂÃ¦ÂÂÃ£ÂÂ",
          },
          {
          title: "Ã¦Â¸ÂÃ¦ÂÂ°Ã¦ÂºÂÃ©ÂÂ",
          description: "WhatsApp Ã§Â¾Â¤Ã§ÂµÂÃ£ÂÂÃ¨Â¨ÂÃ§Â·Â´Ã¦ÂÂ´Ã¦ÂÂ°Ã£ÂÂÃ¦Â¯ÂÃ¦Â¬Â¡Ã¨Â¨ÂÃ§Â·Â´Ã§ÂÂÃ§ÂÂÃ¦ÂÂÃ©ÂÂ¢Ã¥Â­ÂÃ¢ÂÂÃ¢ÂÂÃ¦ÂÂ¨Ã¦Â°Â¸Ã©ÂÂ Ã§ÂÂ¥Ã©ÂÂÃ§ÂÂ¼Ã§ÂÂÃ¤Â»ÂÃ©ÂºÂ¼Ã¤ÂºÂÃ£ÂÂ",
          },
          {
          title: "Ã¥Â°ÂÃ¦Â¥Â­Ã¦Â¨ÂÃ¦ÂºÂ",
          description: "Ã§Â¬Â¦Ã¥ÂÂ HKRU Ã§ÂÂÃ¦ÂÂÃ¥Â°ÂÃ£ÂÂÃ¥ÂÂÃ§Â«Â¥Ã¤Â¿ÂÃ¨Â­Â·Ã¦ÂÂ¿Ã§Â­ÂÃ¯Â¼ÂÃ¤Â»Â¥Ã¥ÂÂÃ¦ÂÂÃ§ÂºÂÃ§ÂÂÃ§Â¾Â©Ã¥Â·Â¥Ã¥ÂÂ¹Ã¨Â¨ÂÃ£ÂÂ",
          },
        ],
      testimonialsNote: "Ã¤Â¾ÂÃ¨ÂÂªÃ¦ÂÂÃ¥ÂÂÃ§Â¤Â¾Ã¥ÂÂÃ¥Â®Â¶Ã¥ÂºÂ­Ã§ÂÂÃ§ÂÂÃ¥Â¯Â¦Ã¦ÂÂÃ¤ÂºÂÃ¢ÂÂÃ¢ÂÂÃ¤Â½ÂÃ¤Â½ÂÃ§Â¬Â¦Ã¨Â©ÂÃ¥ÂÂ¹Ã¯Â¼ÂÃ¦ÂÂ¥Ã¥Â¾ÂÃ¦ÂÂ¿Ã¦ÂÂÃ§ÂÂºÃ§ÂÂÃ¥Â¯Â¦Ã¥Â®Â¶Ã©ÂÂ·Ã¥ÂÂÃ¤ÂºÂ«Ã£ÂÂ",
      testimonials: [
          {
          name: "Sarah L.",
          role: "U7 Ã§ÂÂÃ¥ÂÂ¡Ã¥Â®Â¶Ã©ÂÂ·",
          quote: "Ã¥ÂÂÃ¥Â­ÂÃ§Â¬Â¬Ã¤Â¸ÂÃ¦ÂÂ¥Ã¥Â¾ÂÃ§Â·ÂÃ¥Â¼ÂµÃ¢ÂÂÃ¢ÂÂÃ¥ÂÂ°Ã§Â¬Â¬Ã¤Â¸ÂÃ¥ÂÂÃ¦ÂÂÃ¦ÂÂÃ¥Â·Â²Ã§Â­ÂÃ¤Â¸ÂÃ¥ÂÂÃ¦ÂÂÃ¦ÂÂÃ¦ÂÂ¥Ã£ÂÂÃ¦ÂÂÃ§Â·Â´Ã¨Â®ÂÃ¦Â¯ÂÃ¥ÂÂÃ¥Â­Â©Ã¥Â­ÂÃ©ÂÂ½Ã¦ÂÂÃ¥ÂÂ°Ã¨Â¢Â«Ã§ÂÂÃ¨Â¦ÂÃ¥ÂÂÃ¨Â®ÂÃ¨Â³ÂÃ£ÂÂ",
          },
          {
          name: "James & Mei C.",
          role: "U9 Ã©ÂÂÃ¨ÂÂÃ¨ÂÂÃ¥Â®Â¶Ã©ÂÂ·",
          quote: "Ã¦ÂÂÃ¥ÂÂÃ¥Â¾ÂÃ¥ÂÂÃ¦Â­Â¡Ã¥Â®Â¶Ã©ÂÂ·Ã¦ÂÂÃ§Â·Â´Ã§Â¤Â¾Ã¥ÂÂÃ£ÂÂÃ¦Â¸ÂÃ¦ÂÂ°Ã§ÂÂ WhatsApp Ã¦ÂÂ´Ã¦ÂÂ°Ã£ÂÂÃ¥ÂÂÃ¥ÂÂÃ§ÂÂÃ©ÂÂ¢Ã¥Â­ÂÃ£ÂÂÃ©ÂÂ¶Ã¥Â£ÂÃ¥ÂÂÃ¢ÂÂÃ¢ÂÂÃ¦ÂÂ¯Ã¤Â¸ÂÃ©ÂÂ±Ã§ÂÂÃ¤ÂºÂ®Ã©Â»ÂÃ£ÂÂ",
          },
          {
          name: "Priya K.",
          role: "U6 Ã§ÂÂÃ¥ÂÂ¡Ã¥Â®Â¶Ã©ÂÂ·",
          quote: "Ã¥Â®ÂÃ¥ÂÂ¨Ã¤Â¸ÂÃ©ÂÂÃ¨Â¦ÂÃ¦Â¬ÂÃ§ÂÂÃ§Â¶ÂÃ©Â©ÂÃ¢ÂÂÃ¢ÂÂÃ¤Â»ÂÃ¥ÂÂÃ¤Â¸ÂÃ¦Â­Â¥Ã¦Â­Â¥Ã¥Â¸Â¶Ã©Â ÂÃ¦ÂÂÃ¥ÂÂÃ£ÂÂÃ¥Â¥Â³Ã¥ÂÂÃ§ÂµÂÃ¨Â­ÂÃ¤ÂºÂÃ¨Â·Â¨Ã¦Â Â¡Ã¦ÂÂÃ¥ÂÂÃ¯Â¼ÂÃ¤Â¿Â¡Ã¥Â¿ÂÃ¥Â¤Â§Ã¥Â¢ÂÃ£ÂÂ",
          },
          {
          name: "David W.",
          role: "U10 Ã¥Â®Â¶Ã©ÂÂ·Ã¦ÂÂÃ§Â·Â´",
          quote: "Ã¨ÂÂÃ¥Â¥Â³Ã¥ÂÂÃ¤Â¸ÂÃ¨ÂµÂ·Ã¥ÂÂ·Ã¦ÂÂÃ©ÂÂÃ¥Â¸Â¸Ã©ÂÂ£Ã¥Â¿ÂÃ£ÂÂÃ§ÂÂÃ¦ÂÂÃ¥ÂÂ¨Ã¦Â¯ÂÃ¤Â¸ÂÃ¦Â­Â¥Ã©ÂÂ½Ã¦ÂÂ¯Ã¦ÂÂÃ¥Â®Â¶Ã©ÂÂ·Ã¢ÂÂÃ¢ÂÂÃ§Â¯ÂÃ¦ÂÂ¬Ã£ÂÂÃ¦ÂÂÃ¥Â°ÂÃ¥ÂÂÃ§ÂÂÃ¦Â­Â£Ã§ÂÂÃ¥ÂÂÃ©ÂÂÃ§Â²Â¾Ã§Â¥ÂÃ£ÂÂ",
          },
        ],
      ctaTitle: "Ã¦Â²ÂÃ¦ÂÂÃ§Â¶ÂÃ©Â©ÂÃ¯Â¼ÂÃ¦Â²ÂÃ¥ÂÂÃ©Â¡ÂÃ£ÂÂ",
      ctaBody: "Ã§ÂÂ¡Ã¨Â«ÂÃ¦ÂÂ¯Ã¥Â­Â©Ã¥Â­ÂÃ§Â¬Â¬Ã¤Â¸ÂÃ¦Â¬Â¡Ã¦ÂÂ¿Ã¨ÂµÂ·Ã¦Â¬ÂÃ§ÂÂÃ¯Â¼ÂÃ©ÂÂÃ¦ÂÂ¯Ã¦ÂÂ¨Ã¨ÂÂÃ¦ÂÂ®Ã¨ÂÂÃ¤Â»ÂÃ¥ÂÂÃ¤Â¸ÂÃ¨ÂµÂ·Ã¥ÂÂ·Ã¦ÂÂÃ¢ÂÂÃ¢ÂÂÃ¦ÂÂÃ¥ÂÂÃ¦ÂÂÃ¤Â¾ÂÃ¦ÂÂÃ©ÂÂÃ§ÂÂÃ¤Â¸ÂÃ¥ÂÂÃ¯Â¼ÂÃ§Â¯ÂÃ¦ÂÂ¬Ã£ÂÂÃ¦ÂÂÃ¥Â°ÂÃ¥ÂÂÃ¦ÂÂ¶Ã§Â¥ÂÃ¦Â¯ÂÃ¥ÂÂÃ¥Â°ÂÃ¦ÂÂÃ¥Â°Â±Ã§ÂÂÃ¦ÂºÂ«Ã©Â¦Â¨Ã§Â¤Â¾Ã¥ÂÂÃ£ÂÂ",
      ctaButton: "Ã¥ÂÂ Ã¥ÂÂ¥Ã¦ÂÂÃ¥ÂÂÃ§ÂÂÃ§Â¤Â¾Ã¥ÂÂ",
      imageAlt: "Ã¤Â¸ÂÃ¨Â»ÂÃ¦ÂÂÃ§ÂÂÃ¨ÂÂÃ¦Â¬ÂÃ§ÂÂÃ¦ÂÂÃ¥Â®Â¶Ã©ÂÂ·Ã¦ÂÂÃ§Â·Â´Ã¥Â¸Â¶Ã©Â ÂÃ¥Â®ÂÃ¥ÂÂ¨Ã¦ÂÂÃ¦ÂÂ±Ã¨Â¨ÂÃ§Â·Â´",
    },
    schedule: {
      eyebrow: "Ã¨Â¨ÂÃ§Â·Â´Ã¨ÂÂÃ¦Â¯ÂÃ¨Â³Â½",
      title: "Ã¨Â¨ÂÃ§Â·Â´Ã¦ÂÂÃ©ÂÂ",
      description: "Ã¦Â¯ÂÃ©ÂÂ±Ã¦ÂÂ¥Ã¦ÂÂ¼Ã¤ÂºÂ¬Ã¥Â£Â«Ã¦ÂÂÃ¨Â¨ÂÃ§Â·Â´Ã¯Â¼ÂÃ¨Â³Â½Ã¥Â­Â£Ã¦ÂÂÃ©ÂÂÃ©ÂÂÃ¦ÂÂÃ©Â¦ÂÃ¦Â¸Â¯Ã¥Â¹Â¼Ã¥ÂÂÃ¦Â¬ÂÃ§ÂÂÃ¥ÂÂÃ¥Â¹Â´Ã¨ÂÂ¯Ã£ÂÂ2026/27 Ã§Â¢ÂºÃ¥ÂÂÃ¦ÂÂÃ©ÂÂÃ¦ÂÂ¼Ã¥Â Â±Ã¥ÂÂÃ¥Â¾ÂÃ§Â¢ÂºÃ¨ÂªÂÃ£ÂÂ",
      table: {
        group: "Ã§ÂµÂÃ¥ÂÂ¥",
        day: "Ã¦ÂÂ¥Ã¥Â­Â",
        time: "Ã¦ÂÂÃ©ÂÂ",
        location: "Ã¥ÂÂ°Ã©Â»Â",
      },
      rows: [
          {
          group: "Ã¦ÂÂÃ¦ÂÂÃ¥Â¹Â´Ã©Â½Â¡Ã§ÂµÂ",
          day: "Ã¦ÂÂÃ¦ÂÂÃ¦ÂÂ¥",
          time: "Ã¤Â¸ÂÃ¥ÂÂ 9:00 Ã¢ÂÂ 11:00",
          location: "Ã¤ÂºÂ¬Ã¥Â£Â«Ã¦ÂÂÃ©ÂÂÃ¥ÂÂÃ¥Â Â´Ã¯Â¼ÂÃ¤Â½ÂÃ¦ÂÂÃ§ÂÂ°",
          note: "2026/27 Ã¨Â³Â½Ã¥Â­Â£Ã¥ÂÂÃ¥Â¹Â´Ã©Â½Â¡Ã§ÂµÂÃ§Â¢ÂºÃ¥ÂÂÃ¦ÂÂÃ©ÂÂÃ¥Â¾ÂÃ¥Â®Â",
          },
          {
          group: "Ã¦Â¯ÂÃ¨Â³Â½Ã¦ÂÂ¥",
          day: "Ã¦ÂÂÃ¥Â®ÂÃ¦ÂÂÃ¦ÂÂÃ¦ÂÂ¥",
          time: "Ã¨Â¦ÂÃ¤Â¹ÂÃ¥Â®ÂÃ¦ÂÂ",
          location: "Ã©Â¦ÂÃ¦Â¸Â¯Ã¥Â¹Â¼Ã¥ÂÂÃ¦Â¬ÂÃ§ÂÂÃ¥Â Â´Ã¥ÂÂ°",
          note: "Ã¤Â»Â¥Ã§ÂÂ¼Ã¥Â±ÂÃ§ÂÂºÃ¦ÂÂ¬Ã§ÂÂÃ©Â¦ÂÃ¦Â¸Â¯Ã¥Â¹Â¼Ã¥ÂÂÃ¦Â¬ÂÃ§ÂÂÃ¥ÂÂÃ¥Â¹Â´Ã¨ÂÂ¯Ã¥ÂÂÃ©ÂÂ¦Ã¦Â¨ÂÃ¨Â³Â½",
          },
        ],
      locationTitle: "Ã¤ÂºÂ¬Ã¥Â£Â«Ã¦ÂÂÃ©ÂÂÃ¥ÂÂÃ¥Â Â´",
      locationBody: "Ã¤Â½ÂÃ¦ÂÂÃ§ÂÂ°Ã¯Â¼ÂÃ©Â¦ÂÃ¦Â¸Â¯Ã£ÂÂÃ¥Â¯Â¬Ã¦ÂÂÃ§ÂÂÃ¥Â Â´Ã©ÂÂ©Ã¥ÂÂÃ¥Â®ÂÃ¥ÂÂ¨Ã§ÂÂÃ¥Â¹Â¼Ã¥ÂÂÃ¦Â¬ÂÃ§ÂÂÃ¯Â¼ÂÃ¦Â¸Â¯Ã©ÂÂµÃ¥ÂÂÃ¥Â·Â´Ã¥Â£Â«Ã¦ÂÂ¹Ã¤Â¾Â¿Ã¥ÂÂ°Ã©ÂÂÃ£ÂÂ",
      mapLive: "Ã¥ÂÂ³Ã¦ÂÂ",
      mapExpandHint: "Ã©Â»ÂÃ¦ÂÂÃ¥Â±ÂÃ©ÂÂ",
      mapDirections: "Ã©ÂÂÃ¥ÂÂÃ¥ÂÂ°Ã¥ÂÂÃ¥Â°ÂÃ¨ÂÂª",
      competitionTitle: "Ã©Â¦ÂÃ¦Â¸Â¯Ã¥Â¹Â¼Ã¥ÂÂÃ¦Â¬ÂÃ§ÂÂÃ¦Â¯ÂÃ¨Â³Â½",
      competitionBody: "Ã¦ÂÂÃ¥Â®ÂÃ¦ÂÂÃ¦ÂÂÃ¦ÂÂ¥Ã¨ÂÂÃ¨Â¾Â¦Ã©Â¦ÂÃ¦Â¸Â¯Ã¥Â¹Â¼Ã¥ÂÂÃ¦Â¬ÂÃ§ÂÂÃ¥ÂÂÃ¥Â¹Â´Ã¨ÂÂ¯Ã¥ÂÂÃ©ÂÂ¦Ã¦Â¨ÂÃ¨Â³Â½Ã¢ÂÂÃ¢ÂÂÃ¤Â»Â¥Ã§ÂÂ¼Ã¥Â±ÂÃ§ÂÂºÃ¦ÂÂ¬Ã£ÂÂÃ¥ÂÂÃ¦Â»Â¿Ã¦Â¨ÂÃ¨Â¶Â£Ã¯Â¼ÂÃ¦ÂÂ¯Ã¥ÂÂ¨Ã¥Â®Â¶Ã¤ÂºÂºÃ§ÂÂÃ§Â²Â¾Ã¥Â½Â©Ã©Â«ÂÃ©Â©ÂÃ£ÂÂ",
      cta: "Ã¥Â Â±Ã¥ÂÂÃ¤Â¸Â¦Ã§ÂÂ²Ã¥ÂÂÃ¦ÂÂÃ©ÂÂÃ¨Â¡Â¨Ã¦ÂÂ´Ã¦ÂÂ°",
    },
    joining: {
      eyebrow: "Ã©ÂÂÃ¥Â§ÂÃ¥Â Â±Ã¥ÂÂ",
      title: "Ã¥ÂÂÃ¦Â­Â¥Ã¨Â¼ÂÃ©Â¬ÂÃ¥ÂÂ Ã¥ÂÂ¥",
      description: "Ã©ÂÂÃ¥Â¸Â¸Ã§Â°Â¡Ã¥ÂÂ®Ã¢ÂÂÃ¢ÂÂÃ©ÂÂÃ©ÂÂÃ¥Â®ÂÃ¦ÂÂ¹ GameDay Ã©ÂÂ£Ã§ÂµÂÃ¥Â Â±Ã¥ÂÂÃ¯Â¼ÂÃ¥ÂÂ¶Ã©Â¤ÂÃ¤ÂºÂ¤Ã§ÂµÂ¦Ã¦ÂÂÃ¥ÂÂÃ£ÂÂÃ¦ÂÂ¬Ã§Â¶Â²Ã§Â«ÂÃ¤Â¸ÂÃ¨ÂÂÃ§ÂÂÃ¤Â»ÂÃ¦Â¬Â¾Ã£ÂÂ",
      steps: [
          {
          title: "Ã¦ÂÂÃ¥Â Â±Ã¥ÂÂ",
          description: "Ã¦ÂÂÃ¤Â»Â»Ã¤Â½ÂÃ©Â»ÂÃ¨ÂÂ²Ã¥Â Â±Ã¥ÂÂÃ¦ÂÂÃ©ÂÂÃ¢ÂÂÃ¢ÂÂÃ§ÂÂ´Ã¦ÂÂ¥Ã¥ÂÂÃ¥Â¾ÂÃ¥Â®ÂÃ¦ÂÂ¹ GameDay Ã¨Â¡Â¨Ã¦Â Â¼Ã£ÂÂ",
          },
          {
          title: "Ã¥Â¡Â«Ã¥Â¯Â« GameDay",
          description: "Ã¥Â¡Â«Ã¥Â¯Â«Ã§ÂÂÃ¥ÂÂ¡Ã¨Â³ÂÃ¦ÂÂÃ£ÂÂÃ§Â·ÂÃ¦ÂÂ¥Ã¨ÂÂ¯Ã§ÂµÂ¡Ã¤ÂºÂºÃ¥ÂÂÃ¥ÂÂÃ¦ÂÂÃ¦ÂÂ¸Ã£ÂÂÃ¦ÂÂ¬Ã§Â¶Â²Ã§Â«ÂÃ¤Â¸ÂÃ¦ÂÂ¶Ã¨Â²Â»Ã£ÂÂ",
          },
          {
          title: "Ã¦ÂÂÃ¥ÂÂÃ¦Â­Â¡Ã¨Â¿ÂÃ¦ÂÂ¨",
          description: "Ã¥ÂÂÃ©ÂÂÃ§Â¢ÂºÃ¨ÂªÂÃ¥Â Â±Ã¥ÂÂÃ¤Â¸Â¦Ã§ÂÂ¼Ã©ÂÂÃ§Â¬Â¬Ã¤Â¸ÂÃ¥Â ÂÃ¨Â¨ÂÃ§Â·Â´Ã¦ÂÂÃ©ÂÂÃ§ÂÂÃ¤Â¸ÂÃ¥ÂÂÃ£ÂÂ",
          },
          {
          title: "Ã¥ÂÂºÃ¥Â¸Â­Ã¤Â¸Â¦Ã©ÂÂÃ¦Â³Â¢",
          description: "Ã¥Â¸Â¶Ã§ÂÂÃ©ÂÂÃ£ÂÂÃ¦Â°Â´Ã¥ÂÂÃ§Â¬ÂÃ¥Â®Â¹Ã£ÂÂÃ©Â¦ÂÃ¦Â¬Â¡Ã¨Â©Â¦Ã§ÂÂ©Ã¥ÂÂÃ¨Â²Â»Ã¢ÂÂÃ¢ÂÂÃ§ÂÂÃ§ÂÂ Tigers Ã¦ÂÂ¯Ã¥ÂÂ¦Ã©ÂÂ©Ã¥ÂÂÃ¦ÂÂ¨Ã§ÂÂÃ¥Â­Â©Ã¥Â­ÂÃ£ÂÂ",
          },
        ],
      badge: "Ã©ÂÂÃ©ÂÂ GameDay Ã¥Â®ÂÃ¦ÂÂ¹Ã¥Â Â±Ã¥ÂÂÃ¢ÂÂÃ¢ÂÂÃ¥Â®ÂÃ¥ÂÂ¨Ã§Â°Â¡Ã¤Â¾Â¿",
      ctaTitle: "Ã¦ÂºÂÃ¥ÂÂÃ¥Â¥Â½Ã¥Â Â±Ã¥ÂÂÃ¯Â¼Â",
      ctaBody: "Ã¥ÂÂªÃ©ÂÂÃ©Â»ÂÃ¦ÂÂÃ£ÂÂÃ¥Â¡Â«Ã¥Â¯Â« GameDay Ã¨Â¡Â¨Ã¦Â Â¼Ã¯Â¼ÂÃ¥ÂÂ¶Ã©Â¤ÂÃ¤ÂºÂ¤Ã§ÂµÂ¦Ã¦ÂÂÃ¥ÂÂÃ£ÂÂÃ©Â¦ÂÃ¦Â¬Â¡Ã¨Â©Â¦Ã§ÂÂ©Ã¥Â®ÂÃ¥ÂÂ¨Ã¥ÂÂÃ¨Â²Â»Ã£ÂÂ",
      ctaButton: "Ã¥ÂÂ¨ GameDay Ã¥Â Â±Ã¥ÂÂ",
      ctaNote: "Ã¦ÂÂ¬Ã§Â¶Â²Ã§Â«ÂÃ¤Â¸ÂÃ¨ÂÂÃ§ÂÂÃ¤Â»ÂÃ¦Â¬Â¾Ã¢ÂÂÃ¢ÂÂÃ¤Â¸ÂÃ¥ÂÂÃ§Â¶ÂÃ¥Â®ÂÃ¦ÂÂ¹ GameDay",
    },
    mission: {
      eyebrow: "Ã¦ÂÂÃ¥ÂÂÃ§ÂÂÃ¥Â®ÂÃ¦ÂÂ¨",
      title: "Ã§ÂÂºÃ¤Â½ÂÃ¨ÂÂÃ¥Â­ÂÃ¥ÂÂ¨",
      description: "USRC Tigers Ã¥Â¹Â¼Ã¥ÂÂÃ¦Â¬ÂÃ§ÂÂÃ¨Â®ÂÃ¦Â¯ÂÃ¥ÂÂÃ¥Â­Â©Ã¥Â­ÂÃ¥ÂÂ¨Ã¥Â®ÂÃ¥ÂÂ¨Ã£ÂÂÃ¥Â¿Â«Ã¦Â¨ÂÃ£ÂÂÃ¦ÂÂÃ¦ÂÂ±Ã¨Â²Â Ã§ÂÂÃ§ÂÂ°Ã¥Â¢ÂÃ¤Â¸Â­Ã¯Â¼ÂÃ§ÂÂ¼Ã§ÂÂ¾Ã¦Â¬ÂÃ§ÂÂÃ¢ÂÂÃ¢ÂÂÃ¤Â¹ÂÃ§ÂÂ¼Ã§ÂÂ¾Ã¨ÂÂªÃ¥Â·Â±Ã£ÂÂ",
      imageCaption: "Ã§ÂµÂÃ¨ÂºÂ«Ã§ÂÂÃ¨ÂÂ",
      pillars: [
          {
          title: "Ã¥Â­Â¸Ã¦Â¥Â­Ã¤Â»Â¥Ã¥Â¤ÂÃ§ÂÂÃ¥Â¿Â«Ã¦Â¨Â",
          description: "Ã©Â¦ÂÃ¦Â¸Â¯Ã¥Â­Â©Ã¥Â­ÂÃ¥ÂÂ¼Ã¥Â¾ÂÃ¦ÂÂÃ§Â©ÂºÃ©ÂÂÃ¥Â¥ÂÃ¨Â·ÂÃ£ÂÂÃ¦Â­Â¡Ã§Â¬ÂÃ¥ÂÂÃ§Â«Â¶Ã§ÂÂ­Ã¢ÂÂÃ¢ÂÂÃ¦Â¬ÂÃ§ÂÂÃ§ÂµÂ¦Ã¤Â»ÂÃ¥ÂÂÃ¨ÂÂªÃ§ÂÂ±Ã¨ÂÂÃ¦Â­Â¸Ã¥Â±Â¬Ã¦ÂÂÃ£ÂÂ",
          },
          {
          title: "Ã¨ÂÂªÃ¤Â¿Â¡Ã¨ÂÂÃ¤ÂºÂºÃ§ÂÂÃ¦ÂÂÃ¨ÂÂ½",
          description: "Ã©ÂÂÃ¦ÂÂ§Ã£ÂÂÃ¥ÂÂÃ©ÂÂÃ£ÂÂÃ§Â´ÂÃ¥Â¾ÂÃ¨ÂÂÃ¥Â°ÂÃ©ÂÂÃ¢ÂÂÃ¢ÂÂÃ¥Â¡ÂÃ©ÂÂ Ã¨Â¶ÂÃ¨Â¶ÂÃ©ÂÂÃ©ÂÂ£Ã§Â·ÂÃ§ÂÂÃ¥ÂÂÃ¦Â Â¼Ã£ÂÂ",
          },
          {
          title: "Ã¥Â¹Â¼Ã¥ÂÂ Ã¢ÂÂ Ã©ÂÂÃ¥Â¹Â´ Ã¢ÂÂ Ã¦ÂÂÃ¤ÂºÂº",
          description: "Ã¥Â¾ÂÃ©Â¦ÂÃ¦Â¬Â¡Ã©ÂÂÃ¥Â°ÂÃ¦ÂÂÃ¦Â¬ÂÃ§ÂÂÃ¯Â¼ÂÃ¥ÂÂ° USRC Tigers Ã©ÂÂÃ¥Â¹Â´Ã©ÂÂÃ¯Â¼ÂÃ¤Â»Â¥Ã¨ÂÂ³Ã©Â¦ÂÃ¦Â¸Â¯Ã¦ÂÂÃ¤ÂºÂºÃ¦Â¬ÂÃ§ÂÂÃ¢ÂÂÃ¢ÂÂÃ¦Â¸ÂÃ¦ÂÂ°Ã¦ÂÂ¯Ã¦ÂÂ´Ã§ÂÂÃ©ÂÂÃ©ÂÂÃ£ÂÂ",
          },
        ],
      quote: "Ã¦ÂÂÃ¥ÂÂÃ¤Â¸ÂÃ¥ÂÂªÃ¥ÂÂ¹Ã©Â¤ÂÃ¦Â¬ÂÃ§ÂÂÃ¥ÂÂ¡Ã¢ÂÂÃ¢ÂÂÃ¦ÂÂ´Ã¥ÂÂ¹Ã©Â¤ÂÃ¨ÂÂªÃ¤Â¿Â¡Ã£ÂÂÃ¥ÂÂÃ¨ÂÂ¯Ã£ÂÂÃ¦ÂÂÃ©ÂÂÃ¦ÂÂ§Ã§ÂÂÃ¥Â¹Â´Ã¨Â¼ÂÃ¤ÂºÂºÃ¯Â¼ÂÃ§ÂÂ¡Ã¨Â«ÂÃ¨ÂµÂ°Ã¥ÂÂ°Ã¥ÂÂªÃ¨Â£Â¡Ã©ÂÂ½Ã¥Â¸Â¶Ã¨ÂÂÃ§ÂÂÃ¨ÂÂÃ§Â²Â¾Ã§Â¥ÂÃ£ÂÂ",
      quoteAuthor: "Ã¢ÂÂ USRC Tigers Ã¥Â¹Â¼Ã¥ÂÂÃ¦Â¬ÂÃ§ÂÂÃ¥Â§ÂÃ¥ÂÂ¡Ã¦ÂÂ",
      cta: "Ã©ÂÂÃ¥Â§ÂÃ¤Â»ÂÃ¥ÂÂÃ§ÂÂÃ¦ÂÂÃ§Â¨Â",
      imageAlt: "Ã¤Â¸ÂÃ¨Â»ÂÃ¦ÂÂÃ§ÂÂÃ¨ÂÂÃ¦Â¬ÂÃ§ÂÂÃ¦ÂÂÃ¥Â¹Â¼Ã¥ÂÂÃ¦Â¬ÂÃ§ÂÂÃ¥ÂÂ¡Ã¨ÂÂÃ§Â´ÂÃ§ÂÂÃ¨Â¡Â£Ã¨Â¨ÂÃ§Â·Â´",
    },
    instagram: {
      eyebrow: "Ã§Â¤Â¾Ã¥ÂÂÃ¥ÂÂÃ¤ÂºÂ«",
      title: "Ã¥Â¹Â¼Ã¥ÂÂÃ§ÂÂÃ§ÂÂÃ¥Â¯Â¦Ã¦ÂÂÃ¥ÂÂ»",
      description: "Ã¨Â¨ÂÃ§Â·Â´Ã¦ÂÂ¥Ã£ÂÂÃ¥ÂÂÃ¥Â¹Â´Ã¨ÂÂ¯Ã£ÂÂÃ§ÂÂÃ¨Â¡Â£Ã¦Â´Â¾Ã§ÂÂ¼Ã£ÂÂÃ¦ÂÂÃ¦ÂÂÃ¦ÂÂ¥Ã§Â¬ÂÃ¥Â®Â¹Ã¢ÂÂÃ¢ÂÂÃ§ÂÂÃ§ÂÂÃ§ÂÂºÃ¤Â½ÂÃ¥Â®Â¶Ã¥ÂºÂ­Ã¥ÂÂÃ¦ÂÂÃ¥ÂÂ Ã¥ÂÂ¥ Tiger Ã§Â¤Â¾Ã¥ÂÂÃ£ÂÂ",
      followNote: "Ã¨Â¿Â½Ã¨Â¹Â¤Ã¤ÂºÂ¬Ã¥Â£Â«Ã¦ÂÂÃ¦Â¯ÂÃ©ÂÂ±Ã¦ÂÂ´Ã¦ÂÂ°Ã¢ÂÂÃ¢ÂÂÃ¦ÂÂ°Ã¨Â¨ÂÃ§Â·Â´Ã£ÂÂÃ¥ÂÂÃ¥Â¹Â´Ã¨ÂÂ¯Ã¦ÂÂ¥Ã¥ÂÂÃ¥Â Â±Ã¥ÂÂÃ¦ÂÂÃ©ÂÂÃ£ÂÂ",
      followButton: "Ã¥ÂÂ¨ Instagram Ã¨Â¿Â½Ã¨Â¹Â¤ @usrctigers_minis",
    },
    faq: {
      eyebrow: "Ã¥Â¸Â¸Ã¨Â¦ÂÃ¥ÂÂÃ©Â¡Â",
      title: "Ã¥Â®Â¶Ã©ÂÂ·Ã¥Â¸Â¸Ã¥ÂÂ",
      description: "Ã§Â¬Â¬Ã¤Â¸ÂÃ¥Â ÂÃ¨Â¨ÂÃ§Â·Â´Ã¥ÂÂÃ¦ÂÂ¨Ã©ÂÂÃ¨Â¦ÂÃ§ÂÂ¥Ã©ÂÂÃ§ÂÂÃ¤Â¸ÂÃ¥ÂÂÃ£ÂÂÃ¤Â»ÂÃ¦ÂÂÃ§ÂÂÃ¥ÂÂÃ¯Â¼ÂÃ¥ÂÂÃ¨Â²Â»Ã¨Â©Â¦Ã§ÂÂ©Ã¯Â¼ÂÃ¨Â¦ÂªÃ¨ÂºÂ«Ã©Â«ÂÃ©Â©ÂÃ£ÂÂ",
      items: [
          {
          question: "Ã¥Â­Â©Ã¥Â­ÂÃ©ÂÂÃ¨Â¦ÂÃ¦Â¬ÂÃ§ÂÂÃ§Â¶ÂÃ©Â©ÂÃ¥ÂÂÃ¯Â¼Â",
          answer: "Ã¥Â®ÂÃ¥ÂÂ¨Ã¤Â¸ÂÃ©ÂÂÃ¨Â¦ÂÃ£ÂÂÃ¦ÂÂÃ¥ÂÂÃ¦Â­Â¡Ã¨Â¿ÂÃ©ÂÂ¶Ã¥ÂÂºÃ§Â¤ÂÃ¥ÂÂÃ¦ÂÂ¾Ã§ÂÂ©Ã¥ÂÂ¶Ã¤Â»ÂÃ©ÂÂÃ¥ÂÂÃ§ÂÂÃ¥Â­Â©Ã¥Â­ÂÃ£ÂÂÃ¦ÂÂÃ§Â·Â´Ã¦ÂÂÃ¥ÂÂÃ¤ÂºÂºÃ©ÂÂ²Ã¥ÂºÂ¦Ã¨ÂªÂ¿Ã¦ÂÂ´Ã¨Â¨ÂÃ§Â·Â´Ã£ÂÂ",
          },
          {
          question: "Ã§Â¬Â¬Ã¤Â¸ÂÃ¥Â ÂÃ¨Â¦ÂÃ¥Â¸Â¶Ã¤Â»ÂÃ©ÂºÂ¼Ã¯Â¼Â",
          answer: "Ã¦Â¬ÂÃ§ÂÂÃ©ÂÂÃ¦ÂÂÃ©ÂÂÃ©ÂÂÃ¯Â¼ÂÃ¥Â¦ÂÃ¦ÂÂÃ¯Â¼ÂÃ£ÂÂÃ¨ÂÂÃ©ÂÂ©Ã©ÂÂÃ¥ÂÂÃ¦ÂÂÃ£ÂÂÃ¦Â°Â´Ã¥Â£ÂºÃ¥ÂÂÃ©ÂÂ²Ã¦ÂÂ¬Ã£ÂÂÃ¥Â Â±Ã¥ÂÂÃ¥Â¾ÂÃ¦ÂÂÃ¥ÂÂÃ¦ÂÂÃ§ÂÂ¼Ã©ÂÂÃ¥Â®ÂÃ¦ÂÂ´Ã¨Â£ÂÃ¥ÂÂÃ¦Â¸ÂÃ¥ÂÂ®Ã£ÂÂ",
          },
          {
          question: "Ã¥Â¹Â¼Ã¥ÂÂÃ¦Â¬ÂÃ§ÂÂÃ¥Â®ÂÃ¥ÂÂ¨Ã¥ÂÂÃ¯Â¼Â",
          answer: "Ã¥Â®ÂÃ¥ÂÂ¨Ã¦ÂÂ¯Ã©Â¦ÂÃ¨Â¦ÂÃ£ÂÂÃ¨Â¨ÂÃ§Â·Â´Ã©ÂÂ©Ã©Â½Â¡Ã£ÂÂÃ§ÂÂ±Ã¥ÂÂÃ¨Â³ÂÃ¦Â Â¼Ã§Â¾Â©Ã¥Â·Â¥Ã¥ÂÂ·Ã¦ÂÂÃ¯Â¼ÂÃ¤Â¸Â¦Ã©ÂÂµÃ¥Â¾Âª HKRU Ã¥Â¹Â¼Ã¥ÂÂÃ¦Â¬ÂÃ§ÂÂÃ¦ÂÂÃ¥Â¼ÂÃ£ÂÂÃ¥Â°ÂÃ¦ÂÂÃ¥ÂÂÃ§Â´Â Ã©ÂÂÃ¦Â­Â¥Ã£ÂÂÃ¦ÂÂÃ¦ÂÂÃ¥Â·Â§Ã¥ÂÂ°Ã¥Â¼ÂÃ¥ÂÂ¥Ã£ÂÂ",
          },
          {
          question: "Ã¨Â²Â»Ã§ÂÂ¨Ã¦ÂÂ¯Ã¥Â¤ÂÃ¥Â°ÂÃ¯Â¼Â",
          answer: "Ã¨Â³Â½Ã¥Â­Â£Ã¨Â²Â»Ã§ÂÂ¨Ã¦Â¯ÂÃ¥Â¹Â´Ã§Â¢ÂºÃ¨ÂªÂÃ¯Â¼ÂÃ§Â¶Â GameDay Ã¨ÂÂÃ§ÂÂÃ£ÂÂÃ¤Â½ÂÃ¤Â½ÂÃ§Â¬Â¦Ã¯Â¼ÂÃ¨Â¦ÂÃ¥Â¹Â´Ã©Â½Â¡Ã§ÂµÂÃ§Â´Â HK$2,500Ã¢ÂÂ3,500/Ã¥Â­Â£Ã£ÂÂÃ¨Â©Â¦Ã§ÂÂ©Ã¥ÂÂÃ¨Â²Â»Ã£ÂÂ",
          },
          {
          question: "Ã¥Â®Â¶Ã©ÂÂ·Ã¥ÂÂ¯Ã¤Â»Â¥Ã¥ÂÂÃ¨ÂÂÃ¥ÂÂÃ¯Â¼Â",
          answer: "Ã§ÂÂ¶Ã§ÂÂ¶Ã¯Â¼ÂÃ¨Â¨Â±Ã¥Â¤ÂÃ¦ÂÂÃ§Â·Â´Ã©ÂÂ½Ã¦ÂÂ¯Ã¥Â®Â¶Ã©ÂÂ·Ã£ÂÂÃ§ÂÂ¡Ã©ÂÂÃ§Â¶ÂÃ©Â©ÂÃ¢ÂÂÃ¢ÂÂÃ¦ÂÂÃ¥ÂÂÃ¦ÂÂÃ¤Â¾ÂÃ¥ÂÂ¹Ã¨Â¨ÂÃ£ÂÂÃ¨Â³ÂÃ¦ÂºÂÃ¥ÂÂÃ¦ÂÂ¯Ã¦ÂÂ´Ã£ÂÂÃ¦ÂÂ¨Ã¦ÂÂÃ¥ÂÂ Ã¥ÂÂ¥Ã¤Â¸ÂÃ¥ÂÂÃ¦ÂºÂ«Ã©Â¦Â¨Ã§ÂÂÃ§Â¤Â¾Ã¥ÂÂÃ£ÂÂ",
          },
          {
          question: "Ã¥ÂÂ¨Ã¥ÂÂªÃ¨Â£Â¡Ã¨Â¨ÂÃ§Â·Â´Ã¯Â¼Â",
          answer: "Ã¤ÂºÂ¬Ã¥Â£Â«Ã¦ÂÂÃ©ÂÂÃ¥ÂÂÃ¥Â Â´Ã¯Â¼ÂÃ¤Â½ÂÃ¦ÂÂÃ§ÂÂ°Ã¯Â¼ÂÃ©Â¦ÂÃ¦Â¸Â¯Ã£ÂÂÃ¦Â¸Â¯Ã©ÂÂµÃ¦ÂÂ¹Ã¤Â¾Â¿Ã¯Â¼ÂÃ§Â©ÂºÃ©ÂÂÃ¥ÂÂÃ¨Â¶Â³Ã¯Â¼ÂÃ©ÂÂ©Ã¥ÂÂÃ¥Â®ÂÃ¥ÂÂ¨Ã¦Â´Â»Ã¦Â½ÂÃ§ÂÂÃ¨Â¨ÂÃ§Â·Â´Ã£ÂÂ",
          },
        ],
    },
    finalCta: {
      eyebrow: "Ã¦ÂÂ¨Ã¥Â­Â©Ã¥Â­ÂÃ§ÂÂÃ¥ÂÂÃ©ÂÂªÃ¥Â¾ÂÃ©ÂÂÃ¨Â£Â¡Ã©ÂÂÃ¥Â§Â",
      title: "Ã§ÂµÂ¦Ã¤Â»ÂÃ¥ÂÂ",
      titleHighlight: "Ã¦Â¬ÂÃ§ÂÂÃ§ÂÂÃ§Â¦Â®Ã§ÂÂ©",
      description: "Ã¤Â¸ÂÃ¦Â¬Â¡Ã¥ÂÂÃ¨Â²Â»Ã¨Â©Â¦Ã§ÂÂ©Ã¯Â¼ÂÃ§ÂÂ¡Ã©ÂÂÃ¦ÂÂ¿Ã¨Â«Â¾Ã£ÂÂÃ©Â»ÂÃ¦ÂÂÃ£ÂÂÃ¥ÂÂ¨ GameDay Ã¥Â Â±Ã¥ÂÂÃ¯Â¼ÂÃ§ÂÂÃ¨ÂÂÃ¤Â»ÂÃ¥ÂÂÃ¦ÂÂÃ¤Â¸ÂÃ©ÂÂÃ©Â ÂÃ©ÂÂÃ¥ÂÂÃ¢ÂÂÃ¢ÂÂÃ¥ÂÂÃ¤Â¸ÂÃ¥ÂÂÃ¥ÂÂÃ¥Â®Â¶Ã¤ÂºÂºÃ¤Â¸ÂÃ¦Â¨Â£Ã§ÂÂÃ§Â¤Â¾Ã¥ÂÂÃ£ÂÂ",
      followInstagram: "Ã¥ÂÂ¨ Instagram Ã¨Â¿Â½Ã¨Â¹Â¤",
      footer: "USRC Tigers RFC Ã¦ÂÂÃ¤Â¸Â ÃÂ· Ã©Â¦ÂÃ¦Â¸Â¯Ã¤ÂºÂ¬Ã¥Â£Â«Ã¦ÂÂ ÃÂ· Ã©Â¦ÂÃ¦Â¸Â¯Ã¦Â¬ÂÃ§ÂÂÃ§ÂÂ¼Ã¥Â±ÂÃ©ÂÂÃ©ÂÂ",
    },
    footer: {
      tagline: "Ã©Â¦ÂÃ¦Â¸Â¯Ã©Â ÂÃ¥Â°ÂÃ¥Â¹Â¼Ã¥ÂÂÃ¦Â¬ÂÃ§ÂÂÃ¨Â¨ÂÃ¥ÂÂÃ¢ÂÂÃ¢ÂÂÃ§ÂÂº 4Ã¢ÂÂ12 Ã¦Â­Â²Ã¥Â­Â©Ã¥Â­ÂÃ¨ÂÂÃ¨Â¨Â­Ã¯Â¼ÂÃ¥Â®ÂÃ¥ÂÂ¨Ã£ÂÂÃ¥Â¿Â«Ã¦Â¨ÂÃ£ÂÂÃ¥ÂÂ±Ã¨ÂÂÃ£ÂÂ",
      quickLinks: "Ã¥Â¿Â«Ã©ÂÂÃ©ÂÂ£Ã§ÂµÂ",
      registerConnect: "Ã¥Â Â±Ã¥ÂÂÃ¨ÂÂÃ¨ÂÂ¯Ã§ÂµÂ¡",
      gamedayLink: "GameDay Ã¥Â Â±Ã¥ÂÂ Ã¢ÂÂ",
      location: "Ã¤ÂºÂ¬Ã¥Â£Â«Ã¦ÂÂÃ©ÂÂÃ¥ÂÂÃ¥Â Â´Ã¯Â¼ÂÃ¤Â½ÂÃ¦ÂÂÃ§ÂÂ°Ã¯Â¼ÂÃ©Â¦ÂÃ¦Â¸Â¯",
      readyTitle: "Ã¦ÂºÂÃ¥ÂÂÃ¥ÂÂ Ã¥ÂÂ¥Ã¯Â¼Â",
      readyBody: "Ã©Â¦ÂÃ¦Â¬Â¡Ã¨Â©Â¦Ã§ÂÂ©Ã¥ÂÂÃ¨Â²Â»Ã£ÂÂÃ¦ÂÂ¸Ã¥ÂÂÃ©ÂÂÃ¥ÂÂ§Ã§Â¶Â GameDay Ã¥Â®ÂÃ¦ÂÂÃ¥Â Â±Ã¥ÂÂÃ£ÂÂ",
      copyright: "USRC Tigers Ã¥Â¹Â¼Ã¥ÂÂÃ¦Â¬ÂÃ§ÂÂÃ£ÂÂUSRC Tigers RFC Ã¦ÂÂÃ¤Â¸ÂÃ£ÂÂ",
      legal: "Ã¥ÂÂÃ§Â«Â¥Ã¤Â¿ÂÃ¨Â­Â·Ã¥ÂÂÃ¥Â®ÂÃ¥ÂÂ¨Ã¦ÂÂ¿Ã§Â­ÂÃ©ÂÂ©Ã§ÂÂ¨Ã£ÂÂÃ¦ÂÂÃ¦ÂÂÃ¦ÂÂÃ§Â·Â´Ã¥ÂÂÃ§ÂÂºÃ¥Â¯Â©Ã¦Â Â¸Ã§Â¾Â©Ã¥Â·Â¥Ã£ÂÂÃ¦ÂÂ¬Ã§Â¶Â²Ã§Â«ÂÃ¤Â¸ÂÃ¨ÂÂÃ§ÂÂÃ¤Â»ÂÃ¦Â¬Â¾Ã¢ÂÂÃ¢ÂÂÃ¦ÂÂÃ¦ÂÂÃ¥Â Â±Ã¥ÂÂÃ¥ÂÂÃ¨Â²Â»Ã§ÂÂ¨Ã§Â¶ÂÃ¥Â®ÂÃ¦ÂÂ¹ GameDayÃ£ÂÂ",
    },
    videoModal: {
      title: "Ã¥Â¹Â¼Ã¥ÂÂÃ©Â¢Â¨Ã©ÂÂ",
      subtitle: "Ã¥ÂÂ¨ Instagram Ã¨Â§ÂÃ§ÂÂÃ¦ÂÂÃ¥ÂÂÃ§ÂÂÃ§Â¤Â¾Ã¥ÂÂ",
      placeholder: "Ã¤Â½ÂÃ¤Â½ÂÃ§Â¬Â¦ Ã¢ÂÂ Ã¥ÂµÂÃ¥ÂÂ¥ YouTube Ã§Â²Â¾Ã¨ÂÂ¯Ã¦ÂÂÃ©ÂÂ£Ã§ÂµÂÃ¨ÂÂ³",
      viewOnInstagram: "Ã¥ÂÂ¨ Instagram Ã¦ÂÂ¥Ã§ÂÂ",
      close: "Ã©ÂÂÃ©ÂÂ",
    },
  },
} as const;

export type TranslationKeys = (typeof translations)[Locale];
