# Example: Updating Your Portfolio Data

## Real Example Based on Your Current Info

Here's how to update `portfolio-data.json` with your actual information from the website:

### 1. Personal Information (Already Partially Done!)

```json
"personal": {
  "name": "Bode-Okunade Abdulsalam B.",
  "firstName": "Abdulsalam",
  "title": "Robotics Engineer",
  "currentPosition": "Lead Embedded Systems Engineer",
  "company": "Proforce Galaxies",
  "companyDescription": "a space and satellite technologies company",
  "email": "abdulsalam@example.com",  // ← Update with your real email
  "phone": "+234 XXX XXX XXXX",       // ← Update with your real phone
  "profileImage": "images/profile.png",
  "cvFile": "files/CV.pdf"
}
```

### 2. Bio Section (Already Done!)

```json
"bio": {
  "hero": "I am the Lead Embedded Systems Engineer at Proforce Galaxies, a space and satellite technologies company.",
  "researchInterests": "My main research interests include autonomous systems, collaborative robots, humanoid and animaloid robots, optimal control systems for robots, embedded systems and IoT, computer vision and artificial intelligence.",
  "tagline": "Here you can find information about my work, research projects, publications, and contact information."
}
```

### 3. Research Interests

Update this with your specific areas:

```json
"researchInterests": [
  "Autonomous Systems",
  "Collaborative Robots",
  "Humanoid and Animaloid Robots",
  "Optimal Control Systems for Robots",
  "Embedded Systems and IoT",
  "Computer Vision",
  "Artificial Intelligence"
]
```

### 4. Example: Adding Your First Real Publication

Let's say you published a paper on autonomous robots:

```json
"publications": {
  "byYear": {
    "2024": [
      {
        "authors": [
          {"name": "Bode-Okunade A.B.", "url": "#"},
          {"name": "John Smith", "url": "https://scholar.google.com/..."},
          {"name": "Jane Doe", "url": "https://scholar.google.com/..."}
        ],
        "title": "Advanced Control Systems for Autonomous Mobile Robots in Space Applications",
        "url": "https://doi.org/10.1234/example",
        "venue": "International Conference on Robotics and Automation (ICRA) 2024",
        "abstract": "This paper presents a novel approach to autonomous navigation for mobile robots in space environments, addressing challenges such as limited communication and extreme conditions.",
        "links": [
          {"type": "PDF", "url": "files/papers/icra2024.pdf", "icon": "fas fa-file-pdf"},
          {"type": "DOI", "url": "https://doi.org/10.1234/example", "icon": "fas fa-external-link-alt"},
          {"type": "Code", "url": "https://github.com/yourusername/project", "icon": "fab fa-github"}
        ]
      }
    ],
    "2023": [
      // Add your 2023 publications here
    ]
  }
}
```

### 5. Example: Adding a Real Project

```json
"projects": [
  {
    "title": "Satellite Communication System",
    "url": "https://proforce-galaxies.com/projects/satcom",
    "image": "images/satcom-project.jpg",
    "description": "Developed embedded systems for satellite communication, including real-time data processing and autonomous decision-making capabilities for space missions.",
    "tags": ["Embedded Systems", "Satellite Tech", "IoT"]
  },
  {
    "title": "Humanoid Robot Control System",
    "url": "#",
    "image": "images/humanoid-robot.jpg",
    "description": "Designed and implemented optimal control algorithms for humanoid robot locomotion and manipulation tasks.",
    "tags": ["Robotics", "Control Systems", "AI"]
  }
]
```

### 6. Example: Adding Your Education

```json
"education": [
  {
    "degree": "Master's in Robotics Engineering",
    "year": "2020",
    "institution": "University of Lagos"
  },
  {
    "degree": "Bachelor's in Electrical Engineering",
    "year": "2018",
    "institution": "Federal University of Technology"
  }
]
```

### 7. Example: Adding Your Work Experience

```json
"experience": [
  {
    "period": "2022 - Present",
    "title": "Lead Embedded Systems Engineer",
    "institution": "Proforce Galaxies",
    "institutionUrl": "https://proforce-galaxies.com",
    "description": "Leading the development of embedded systems for satellite technologies, managing a team of engineers, and overseeing critical space mission projects."
  },
  {
    "period": "2020 - 2022",
    "title": "Robotics Engineer",
    "institution": "Tech Innovation Labs",
    "institutionUrl": "#",
    "description": "Developed autonomous navigation systems for mobile robots and implemented computer vision algorithms for object detection and tracking."
  }
]
```

### 8. Example: Adding a Conference Talk

```json
"talks": {
  "byYear": {
    "2024": [
      {
        "title": "Embedded Systems for Space Applications",
        "url": "#",
        "venue": "African Robotics Conference",
        "date": "September 2024",
        "location": "Lagos, Nigeria",
        "type": "Invited Talk",
        "abstract": "Presented recent advances in embedded systems design for satellite technologies, focusing on challenges unique to space environments.",
        "links": [
          {"type": "Slides", "url": "files/talks/arc2024-slides.pdf", "icon": "fas fa-file-pdf"}
        ]
      }
    ]
  }
}
```

### 9. Social Media Links

```json
"social": {
  "linkedin": "https://linkedin.com/in/abdulsalam-bode-okunade",
  "twitter": "https://twitter.com/yourhandle",
  "github": "https://github.com/yourusername",
  "orcid": "https://orcid.org/0000-0000-0000-0000",
  "googleScholar": "https://scholar.google.com/citations?user=YOUR_ID"
}
```

## Step-by-Step Update Process

1. **Open** `portfolio-data.json` in your text editor
2. **Find** the section you want to update (e.g., "publications")
3. **Copy** one of the example entries above
4. **Modify** it with your actual information
5. **Save** the file
6. **Test** by running `python serve.py` and viewing in browser
7. **Verify** your changes appear correctly

## Tips for Success

✅ **Use double quotes** for all strings in JSON  
✅ **Add commas** between array items (but not after the last one)  
✅ **Validate JSON** at jsonlint.com before saving  
✅ **Keep backups** of your data file  
✅ **Update incrementally** - add one item at a time and test  

## Common Mistakes to Avoid

❌ Using single quotes: `'text'` → Use `"text"`  
❌ Trailing commas: `[item1, item2,]` → Remove last comma  
❌ Missing commas: `{a: 1} {b: 2}` → Add comma between objects  
❌ Unescaped quotes in text: Use `\"` for quotes inside strings  

## Next Steps

1. Start with **personal information** - update your email, phone, etc.
2. Add your **real education** and **experience**
3. Add **one project** to test the system
4. Add **one publication** if you have any
5. Update **social media links**
6. Test everything works
7. Continue adding more content over time!

---

**Remember**: The JSON file is now your single source of truth. Keep it updated and your entire website stays current! 🚀
