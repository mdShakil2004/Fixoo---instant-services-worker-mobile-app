






export const services = [
    {
      id: "plumbing",
      name: "Plumbing",
      icon: "tint",
      providers: [
        { id: "p1", name: "Elite Plumbing Solutions" },
        { id: "p2", name: "Pipe Masters" },
        
      ],
      specifications: ["Leak Fix", "Pipe Installation", "Drain Cleaning", "General Work"],
    },
    {
      id: "electrical",
      name: "Electrical",
      icon: "bolt",
      providers: [
        { id: "e1", name: "PowerPro Electrical" },
        { id: "e2", name: "Watt Wizards" },
      ],
      specifications: ["Wiring", "Circuit Repair", "Lighting Installation","General Work"],
    },
    {
      id: "cleaning",
      name: "Cleaner",
      icon: "trash",
      providers: [
        { id: "c1", name: "Sparkling Home Cleaners" },
        { id: "c2", name: "Clean Sweep Co." },
        { id: "c3", name: "Washroom cleaner." },
      ],
      specifications: ["Home Cleaning","kitchen cleaning", "Office Cleaning", "Deep Cleaning","General Work"],
    },
    {
      id: "painting",
      name: "Painting",
      icon: "paint-brush",
      providers: [{ id: "pt1", name: "Fresh Paint Masters" },
        { id: "pt2", name: "GlowUp Painters" },
        { id: "pt3", name: "RapidBrush" },
        { id: "pt4", name: "QuickCoat Painters" },
      ],
      specifications: [
        "Interior Painting",
        "Exterior Painting",
        "Wallpaper Removal",
        "Wall Textures & Designs",
        "General Work",
        "Commercial Painting",
        "Spray Painting",
        "Residential Painting",
      ],
    },
    {
      id: "masonry",
      name: "Masonry",
      icon: "bricks",
      providers: [{ id: "m1", name: "BrickWorks Co." }, { id: "lab1", name: "General Laborer" }],
      specifications: ["Brickwork", "Concrete Repairs", "Tiling","General Work"],
    },
    {
      id: "gardening",
      name: "Gardening",
      icon: "leaf",
      providers: [
        { id: "g1", name: "Green Thumb Gardens" },
        { id: "g2", name: "Lawn Pros" },
      ],
      specifications: ["Lawn Mowing", "Plant Care", "Landscaping","General Work"],
    },
    {
      id: "repairs",
      name: "Repairs",
      icon: "wrench",
      providers: [
        { id: "r1", name: "Fix-It-All Repairs" },
        { id: "r2", name: "Home Solutions" },
      ],
      specifications: ["Furniture Repair", "Window Repair", "Door Fixing"],
    },
    {
      id: "appliances",
      name: "Appliance Repair",
      icon: "cog",
      providers: [
        { id: "a1", name: "Appliance Doctors" },
        { id: "a2", name: "Tech Fixers" },
      ],
      specifications: [
        "Washing Machine Repair",
        "Refrigerator Fixing",
        "Microwave Repair",
        "General Work",
      ],
    },


    {
      id: "car_washer",
      name: "Car Washer",
      icon: "car-crash",
      providers: [
        { id: "cw1", name: "Mobile car wash" },
        { id: "cw2", name: "detailing" },
        { id: "lab1", name: "General Laborer" },
      ],
      specifications: [
        "Bike Puncture Repair",
        "Car Puncture Repair",
        "Towing Service",
        "Jump Start Service",
        "Fuel Delivery",
        "Car/Bike Locksmith",
      ],
    },

    {
      id: "roadside_assistance",
      name: "Roadside Assistance",
      icon: "car-crash",
      providers: [
        { id: "rs1", name: "Quick Roadside Help" },
        { id: "rs2", name: "Fast Fix Auto Assist" },
        { id: "lab1", name: "General Laborer" },
      ],
      specifications: [
        "Bike Puncture Repair",
        "Car Puncture Repair",
        "Towing Service",
        "Jump Start Service",
        "Fuel Delivery",
        "Car/Bike Locksmith",
      ],
    },
    
    {
      id: "carpentry",
      name: "Carpentry",
      icon: "wrench",
      providers: [
        { id: "cp1", name: "Master Carpentry" },
        { id: "cp2", name: "Wood Works" },
      ],
      specifications: [
        "Custom Furniture",
        "Cabinet Making",
        "Woodwork Repairs",
        "General Work",
      ],
    },
    {
      id: "moving",
      name: "Moving",
      icon: "truck",
      providers: [
        { id: "m1", name: "Swift Movers" },
        { id: "m2", name: "Move Easy Co." },
      ],
      specifications: [
        "Local Moving",
        "Long Distance Moving",
        "Packing Services",
        "General Work",
      ],
    },

    {
        id: "pest_control",
        name: "Pest Control",
        icon: "bug",
        providers: [
          { id: "pc1", name: "Bug Busters" },
          { id: "pc2", name: "SafeHome Pest Control" },
        ],
        specifications: [
          "Cockroach Removal",
          "Rodent Control",
          "Termite Treatment",
          "General Work",
        ],
      },
      {
        id: "ac_service",
        name: "AC Service",
        icon: "snowflake",
        providers: [
          { id: "ac1", name: "CoolAir Experts" },
          { id: "ac2", name: "BreezeFix Technicians" },
        ],
        specifications: ["AC Repair", "Gas Refilling", "Regular Maintenance","General Work"],
      },

      {
        id: "beauty",
        name: "Beauty & Wellness",
        icon: "spa",
        providers: [
          { id: "b1", name: "Glamour Touch" },
          { id: "b2", name: "Beauty Bliss" },
        ],
        specifications: ["Hair Styling", "Makeup Services", "Massage Therapy","General Work"],
      },
      {
        id: "car_repair",
        name: "Car Repair",
        icon: "car",
        providers: [
          { id: "cr1", name: "AutoFix Garage" },
          { id: "cr2", name: "Rapid Repairs" },
        ],
        specifications: ["Engine Checkup", "Brake Repair", "Battery Replacement"],
      },
      {
        id: "laptop_repair",
        name: "Laptop Repair",
        icon: "laptop",
        providers: [
          { id: "l1", name: "TechFix Solutions" },
          { id: "l2", name: "Quick Repair Hub" },
        ],
        specifications: [
          "Screen Replacement",
          "Battery Issues",
          "Software Troubleshooting",
          "General Work",
        ],
      },
      {
        id: "photography",
        name: "Photography",
        icon: "camera",
        providers: [
          { id: "ph1", name: "SnapMaster Studio" },
          { id: "ph2", name: "ProClick Photography" },
        ],
        specifications: ["Wedding Photography", "Portrait Shoots", "Event Coverage"],
      },

      {
        id: "salon_professionals",
        name: "Salon Professionals",
        icon: "scissors",
        providers: [
          { id: "sp1", name: "Glamour Touch" },
          { id: "sp2", name: "Beauty Bliss" },
          { id: "sp3", name: "Hair Haven" },
        ],
        specifications: [
          "Hair Styling",
          "Makeup Services",
          "Nail Technician",
          "Barber Services",
          "Hair Color",
          "Haircut",
          "General Work",
        ],
      },

      {
        id: "motorcycle_mechanics",
        name: "Motorcycle Mechanics",
        icon: "motorcycle",
        providers: [
          { id: "mm1", name: "Bike Masters" },
          { id: "mm2", name: "Cycle Solutions" },
          { id: "mm3", name: "Pedal Pros" },
        ],
        specifications: [
          "Motorcycle Repairs",
          "Maintenance",
          "Detailing",
          "Tire Repair",
          "Brake Repair",
          "Suspension Adjustment",
          "General Work",
        ],
      },
      {
        id: "auto_mechanics",
        name: "Auto Mechanics",
        icon: "car",
        providers: [
          { id: "am1", name: "AutoFix Garage" },
          { id: "am2", name: "Rapid Repairs" },
          { id: "am3", name: "Mobile Mechanics" },
        ],
        specifications: [
          "General Car Repairs",
          "Oil Changes",
          "Diagnostics",
          "Tire Rotation",
          "Brake Repair",
          "Battery Replacement",
          "General Work",
        ],
      },
    
      {
        id: "bike_mechanics",
        name: "Bike Mechanics",
        icon: "bicycle",
        providers: [
          { id: "bm1", name: "Bike Masters" },
          { id: "bm2", name: "Cycle Solutions" },
          { id: "bm3", name: "Pedal Pros" },
        ],
        specifications: [
          "Bicycle Repairs",
          "Tune-ups",
          "Custom Builds",
          "Wheel Repair",
          "Gear Adjustment",
          "Brake Repair",
          "General Work",
        ],
      },
    
      {
        id: "car_mechanics_at_home",
        name: "Car Mechanics at Home",
        icon: "car",
        providers: [
          { id: "cm1", name: "Mobile Mechanics" },
          { id: "cm2", name: "Home Repair Heroes" },
          { id: "cm3", name: "Convenience Car Care" },
        ],
        specifications: [
          "Mobile Car Repairs",
          "Oil Changes",
          "Diagnostics",
          "Tire Rotation",
          "Brake Repair",
          "Battery Replacement",
          "General Work",
        ],
      },
      {
        id: "handymen",
        name: "Handymen",
        icon: "wrench",
        providers: [
          { id: "h1", name: "Fix-It-All Handymen" },
          { id: "h2", name: "Home Repair Heroes" },
          { id: "h3", name: "Task Masters" },
        ],
        specifications: [
          "Door Repair",
          "Furniture Assembly",
          "Wall Patching",
          "Caulking",
          "Painting",
          "Light Fixture Installation",
          "General Repairs",
          "Home Maintenance",
        ],
      },
      {
        id: "movers",
        name: "Movers",
        icon: "truck",
        providers: [
          { id: "m1", name: "Swift Movers" },
          { id: "m2", name: "Move Easy Co." },
          { id: "m3", name: "Reliable Relocations" },
        ],
        specifications: [
          "Local Moving",
          "Long Distance Moving",
          "Packing Services",
          "Loading and Unloading",
          "Furniture Assembly",
          "General Moving Services",
        ],
      },
    
      {
        id: "appliance_repair_technicians",
        name: "Appliance Repair Technicians",
        icon: "cog",
        providers: [
          { id: "art1", name: "Appliance Doctors" },
          { id: "art2", name: "Tech Fixers" },
          { id: "art3", name: "Home Appliance Repair" },
        ],
        specifications: [
          "Washing Machine Repair",
          "Refrigerator Fixing",
          "Microwave Repair",
          "Dishwasher Repair",
          "Oven Repair",
          "General Appliance Repair",
        ],
      },
    
      {
        id: "junk_removal_workers",
        name: "Junk Removal Workers",
        icon: "trash",
        providers: [
          { id: "jr1", name: "Junk Be Gone" },
          { id: "jr2", name: "Trash Removal Pros" },
          { id: "jr3", name: "Debris Disposal Services" },
        ],
        specifications: [
          "Residential Junk Removal",
          "Commercial Junk Removal",
          "Construction Debris Removal",
          "Furniture Removal",
          "Appliance Removal",
          "General Junk Removal",
        ],
      },
    
      {
        id: "tile_installers",
        name: "Tile Installers",
        icon: "hammer",
        providers: [
          { id: "ti1", name: "Tile Masters" },
          { id: "ti2", name: "Flooring Experts" },
          { id: "ti3", name: "Tile Installation Pros" },
        ],
        specifications: [
          "Ceramic Tile Installation",
          "Porcelain Tile Installation",
          "Natural Stone Tile Installation",
          "Glass Tile Installation",
          "Mosaic Tile Installation",
          "General Tile Installation",
        ],
      },

      {
        id: "salon_workers",
        name: "Salon Workers",
        icon: "scissors",
        providers: [
          { id: "sw1", name: "Glamour Touch" },
          { id: "sw2", name: "Beauty Bliss" },
          { id: "sw3", name: "Hair Haven" },
        ],
        specifications: [
          "Mobile Haircuts",
          "Makeup for Events",
          "Nail Services",
          "Hair Styling",
          "Barber Services",
          "Waxing and Threading",
          "General Beauty Services",
        ],
      },
      {
        id: "general_workers",
        name: "General Workers",
        icon: "wrench",
        providers: [
          { id: "gw1", name: "Task Masters" },
          { id: "gw2", name: "Home Repair Heroes" },
          { id: "gw3", name: "Fix-It-All Handymen" },
        ],
        specifications: [
          "General Labor",
          "Household Chores",
          "Yard Work",
          "Errand Running",
          "Light Handyman Work",
          "General Assistance",
        ],
      },
      {
        id: "car_mechanics_at_home",
        name: "Car Mechanics at Home",
        icon: "car",
        providers: [
          { id: "cm1", name: "Mobile Mechanics" },
          { id: "cm2", name: "Home Repair Heroes" },
          { id: "cm3", name: "Convenience Car Care" },
        ],
        specifications: [
          "Mobile Car Repairs",
          "Oil Changes",
          "Diagnostics",
          "Tire Rotation",
          "Brake Repair",
          "Battery Replacement",
          "General Work",
        ],
      },
      {
        id: "motorcycle_mechanics",
        name: "Motorcycle Mechanics",
        icon: "motorcycle",
        providers: [
          { id: "mm1", name: "Bike Masters" },
          { id: "mm2", name: "Cycle Solutions" },
          { id: "mm3", name: "Pedal Pros" },
        ],
        specifications: [
          "Motorcycle Repairs",
          "Maintenance",
          "Detailing",
          "Tire Repair",
          "Brake Repair",
          "Suspension Adjustment",
          "General Work",
        ],
      },
      {
        id: "cctv_installers",
        name: "CCTV Installers",
        icon: "camera",
        providers: [
          { id: "ci1", name: "Secure Vision" },
          { id: "ci2", name: "CCTV Solutions" },
          { id: "ci3", name: "Surveillance Experts" },
        ],
        specifications: [
          "CCTV Camera Installation",
          "Security System Installation",
          "Monitoring Services",
          "Maintenance and Repair",
          "General CCTV Services",
        ],
      },
      {
        id: "appliance_repair_technicians",
        name: "Appliance Repair Technicians",
        icon: "cog",
        providers: [
          { id: "art1", name: "Appliance Doctors" },
          { id: "art2", name: "Tech Fixers" },
          { id: "art3", name: "Home Appliance Repair" },
        ],
        specifications: [
          "Washing Machine Repair",
          "Refrigerator Fixing",
          "Microwave Repair",
          "Dishwasher Repair",
          "Oven Repair",
          "General Appliance Repair",
        ],
      },
      {
        id: "appliance_repair_technicians",
        name: "Appliance Repair Technicians",
        icon: "cog",
        providers: [
          { id: "art1", name: "Appliance Doctors" },
          { id: "art2", name: "Tech Fixers" },
          { id: "art3", name: "Home Appliance Repair" },
        ],
        specifications: [
          "Washing Machine Repair",
          "Refrigerator Fixing",
          "Microwave Repair",
          "Dishwasher Repair",
          "Oven Repair",
          "General Appliance Repair",
        ],
      },
      
      {
        id: "ac_service",
        name: "AC Service",
        icon: "snowflake",
        providers: [
          { id: "ac1", name: "CoolAir Experts" },
          { id: "ac2", name: "BreezeFix Technicians" },
        ],
        specifications: [
          "AC Repair",
          "Gas Refilling",
          "Regular Maintenance",
          "General Work",
        ],
      },
      {
        id: "cleaning",
        name: "Cleaner",
        icon: "trash",
        providers: [
          { id: "c1", name: "Sparkling Home Cleaners" },
          { id: "c2", name: "Clean Sweep Co." },
          { id: "c3", name: "Washroom cleaner." },
        ],
        specifications: [
          "Home Cleaning",
          "Kitchen Cleaning",
          "Office Cleaning",
          "Deep Cleaning",
          "General Work",
        ],
      },
      {
        id: "water_tank_cleaners",
        name: "Water Tank Cleaners",
        icon: "water",
        providers: [
          { id: "wtc1", name: "Clean Water Services" },
          { id: "wtc2", name: "Tank Cleaning Experts" },
        ],
        specifications: [
          "Water Tank Cleaning",
          "Tank Maintenance",
          "Water Purification",
          "General Water Tank Services",
        ],
      },
      {
        id: "handymen",
        name: "Handymen",
        icon: "wrench",
        providers: [
          { id: "h1", name: "Fix-It-All Handymen" },
          { id: "h2", name: "Home Repair Heroes" },
          { id: "h3", name: "Task Masters" },
        ],
        specifications: [
          "Door Repair",
          "Furniture Assembly",
          "Wall Patching",
          "Caulking",
          "Painting",
          "Light Fixture Installation",
          "General Repairs",
          "Home Maintenance",
        ],
      },
      {
        id: "handymen",
        name: "Handymen",
        icon: "wrench",
        providers: [
          { id: "h1", name: "Fix-It-All Handymen" },
          { id: "h2", name: "Home Repair Heroes" },
          { id: "h3", name: "Task Masters" },
        ],
        specifications: [
          "Door Lock Installation",
          "Curtain Rod Installation",
          "Shelf Installation",
          "Door Repair",
          "Furniture Assembly",
          "Wall Patching",
          "Caulking",
          "Painting",
          "Light Fixture Installation",
          "General Repairs",
          "Home Maintenance",
        ],
      },
      {
        id: "general_physicians",
        name: "General Physicians",
        icon: "stethoscope",
        providers: [
          { id: "gp1", name: "Primary Care Physicians" },
          { id: "gp2", name: "Family Medicine Specialists" },
        ],
        specifications: [
          "Routine Checkups",
          "Common Illnesses",
          "Preventive Care",
          "General Health Advice",
        ],
      }
      ,
      {
        id: "pediatricians",
        name: "Pediatricians",
        icon: "baby",
        providers: [
          { id: "p1", name: "Children's Health Specialists" },
          { id: "p2", name: "Pediatric Care Providers" },
        ],
        specifications: [
          "Child Healthcare",
          "Vaccinations",
          "Well-Child Visits",
          "Sick Visits",
        ],
      }
      ,
      {
        id: "geriatric_doctors",
        name: "Geriatric Doctors",
        icon: "walker",
        providers: [
          { id: "gd1", name: "Elderly Care Specialists" },
          { id: "gd2", name: "Geriatric Care Providers" },
        ],
        specifications: [
          "Elderly Care",
          "Chronic Disease Management",
          "Geriatric Health Advice",
          "Caregiver Support",
        ],
      },
      
      {
        id: "psychiatrists",
        name: "Psychiatrists",
        icon: "brain",
        providers: [
          { id: "ps1", name: "Mental Health Specialists" },
          { id: "ps2", name: "Psychiatric Care Providers" },
        ],
        specifications: [
          "Mental Health Support",
          "Therapy",
          "Medication Management",
          "Crisis Intervention",
        ],
      },
      
      {
        id: "dermatologists",
        name: "Dermatologists",
        icon: "skin",
        providers: [
          { id: "d1", name: "Skin Care Specialists" },
          { id: "d2", name: "Dermatology Care Providers" },
        ],
        specifications: [
          "Skin Issues",
          "Hair Issues",
          "Nail Issues",
          "Skin Cancer Screening",
        ],
      },
      {
        id: "home_nurses",
        name: "Home Nurses",
        icon: "nurse",
        providers: [
          { id: "hn1", name: "Home Care Nursing Services" },
          { id: "hn2", name: "Nursing Care Providers" },
        ],
        specifications: [
          "Post-Surgery Care",
          "Injections",
          "IV Therapy",
          "Wound Care",
          "Medication Management",
        ],
      }
      ,
      {
        id: "geriatric_caregivers",
        name: "Geriatric Caregivers",
        icon: "walker",
        providers: [
          { id: "gc1", name: "Elderly Care Services" },
          { id: "gc2", name: "Geriatric Care Providers" },
        ],
        specifications: [
          "Elderly Assistance",
          "Daily Living Support",
          "Personal Care",
          "Household Chores",
          "Companionship",
        ],
      },
      
      {
        id: "palliative_care_specialists",
        name: "Palliative Care Specialists",
        icon: "heart",
        providers: [
          { id: "pcs1", name: "Palliative Care Services" },
          { id: "pcs2", name: "End-of-Life Care Providers" },
        ],
        specifications: [
          "End-of-Life Care",
          "Comfort Measures",
          "Pain Management",
          "Symptom Control",
          "Emotional Support",
        ],
      },
      {
        id: "physiotherapists",
        name: "Physiotherapists",
        icon: "physical-therapy",
        providers: [
          { id: "pt1", name: "Rehabilitation Services" },
          { id: "pt2", name: "Physical Therapy Providers" },
        ],
        specifications: [
          "Injury Recovery",
          "Pain Relief Therapy",
          "Muscle Strengthening",
          "Mobility Improvement",
          "Post-Surgery Rehabilitation",
        ],
      },
      {
        id: "roofers",
        name: "Roofers",
        icon: "roof",
        providers: [
          { id: "r1", name: "Roofing Solutions" },
          { id: "r2", name: "Roof Repair Services" },
        ],
        specifications: [
          "Roof Installation",
          "Roof Repair",
          "Roof Maintenance",
          "Gutter Installation",
          "Gutter Cleaning",
        ],
      }



  ];

// export const Worker={
    
// }