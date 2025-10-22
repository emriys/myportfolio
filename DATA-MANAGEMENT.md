# Portfolio Data Management Guide

## Overview

Your portfolio website now uses a **centralized data file** (`portfolio-data.json`) to manage all your personal information, publications, talks, projects, and other content. This makes updating your website much easier - you only need to edit one file!

## How It Works

1. **`portfolio-data.json`** - Contains all your portfolio data in a structured JSON format
2. **`data-loader.js`** - JavaScript that automatically loads data from the JSON file and populates all HTML pages
3. **HTML files** - Now dynamically populated with data when the page loads

## Updating Your Portfolio

### To Update Your Information

Simply edit the `portfolio-data.json` file. All changes will automatically appear on your website when you reload the pages.

### Data Structure

The JSON file is organized into these main sections:

#### 1. Personal Information
```json
"personal": {
  "name": "Your Full Name",
  "firstName": "First Name",
  "title": "Your Title",
  "currentPosition": "Your Position",
  "company": "Company Name",
  "email": "your.email@example.com",
  "phone": "+1 234 567 890",
  "profileImage": "images/profile.png",
  "cvFile": "files/CV.pdf"
}
```

#### 2. Bio & About
```json
"bio": {
  "hero": "Your main description",
  "researchInterests": "Your research interests",
  "tagline": "Your tagline"
}
```

#### 3. Education
Array of education entries:
```json
"education": [
  {
    "degree": "PhD in Computer Science",
    "year": "2020",
    "institution": "University Name"
  }
]
```

#### 4. Experience
Array of work experience:
```json
"experience": [
  {
    "period": "2021 - Present",
    "title": "Position Title",
    "institution": "Company/Institution",
    "institutionUrl": "https://example.com",
    "description": "What you do"
  }
]
```

#### 5. Projects
Array of research/work projects:
```json
"projects": [
  {
    "title": "Project Name",
    "url": "https://project-url.com",
    "image": "images/project1.jpg",
    "description": "Project description",
    "tags": ["AI", "Robotics"]
  }
]
```

#### 6. Publications
Organized by year and includes recent publications:
```json
"publications": {
  "recent": [...],  // Shows on homepage
  "byYear": {
    "2024": [...],
    "2023": [...]
  },
  "preprints": [...],
  "stats": {
    "total": 25,
    "citations": 450,
    "hIndex": 12,
    "journalPapers": 8
  }
}
```

Each publication has:
- `authors`: Array of author objects with name and URL
- `title`: Publication title
- `url`: Link to the publication
- `venue`: Where it was published
- `abstract`: (Optional) Publication abstract
- `links`: Array of links (PDF, DOI, Code, etc.)

#### 7. Talks
Similar structure to publications:
```json
"talks": {
  "recent": [...],  // Shows on homepage
  "upcoming": [...],
  "byYear": {
    "2024": [...],
    "2023": [...]
  },
  "stats": {...},
  "topics": ["Topic 1", "Topic 2"]
}
```

#### 8. Contact & Social
```json
"contact": {
  "email": "your.email@example.com",
  "phone": "+1 234 567 890",
  "address": {
    "institution": "Your Institution",
    "department": "Department Name",
    "location": "City, Country"
  }
},
"social": {
  "linkedin": "https://linkedin.com/in/yourprofile",
  "twitter": "https://twitter.com/yourhandle",
  "github": "https://github.com/yourusername",
  "orcid": "https://orcid.org/your-id",
  "googleScholar": "https://scholar.google.com/citations?user=your-id"
}
```

## Common Tasks

### Adding a New Publication

1. Open `portfolio-data.json`
2. Find the `publications.byYear` section
3. Add your publication to the appropriate year:

```json
"2024": [
  {
    "authors": [
      {"name": "Your Name", "url": "#"},
      {"name": "Co-Author", "url": "#"}
    ],
    "title": "Your New Publication Title",
    "url": "https://doi.org/...",
    "venue": "Conference Name 2024",
    "abstract": "Publication abstract...",
    "links": [
      {"type": "PDF", "url": "https://...", "icon": "fas fa-file-pdf"},
      {"type": "DOI", "url": "https://doi.org/...", "icon": "fas fa-external-link-alt"}
    ]
  }
]
```

4. Update the statistics in `publications.stats` if needed
5. Save the file and reload your website

### Adding a New Talk

Similar to publications, add to `talks.byYear`:

```json
"2024": [
  {
    "title": "Talk Title",
    "url": "#",
    "venue": "Conference Name",
    "date": "October 2024",
    "location": "City, Country",
    "type": "Keynote",
    "abstract": "Talk description...",
    "links": [
      {"type": "Slides", "url": "#", "icon": "fas fa-file-pdf"}
    ]
  }
]
```

### Adding a New Project

Add to the `projects` array:

```json
{
  "title": "New Project",
  "url": "https://project-url.com",
  "image": "images/new-project.jpg",
  "description": "Project description",
  "tags": ["Tag1", "Tag2"]
}
```

### Updating Contact Information

Simply edit the `contact` and `social` sections with your new information.

## Benefits of This Approach

✅ **Single Source of Truth** - All your data in one place  
✅ **Easy Updates** - Edit JSON instead of multiple HTML files  
✅ **Consistency** - Same data appears correctly across all pages  
✅ **Maintainability** - Much easier to manage as your portfolio grows  
✅ **Scalability** - Easy to add new publications, talks, or projects  

## Testing Your Changes

1. Edit `portfolio-data.json`
2. Save the file
3. Open/reload your website in a browser
4. Check that your changes appear correctly

## Troubleshooting

**Changes not appearing?**
- Hard refresh your browser (Ctrl+F5 or Cmd+Shift+R)
- Check browser console for errors (F12)
- Validate your JSON syntax at [jsonlint.com](https://jsonlint.com)

**JSON syntax errors?**
- Make sure all strings are in double quotes
- Check for missing commas between items
- Ensure all brackets and braces are properly closed
- Use a JSON validator to find syntax errors

## File Structure

```
portfolio/
├── index.html              # Homepage (uses data-loader.js)
├── publications.html       # Publications page (uses data-loader.js)
├── talks.html             # Talks page (uses data-loader.js)
├── portfolio-data.json    # ← YOUR DATA FILE (edit this!)
├── data-loader.js         # Loads and populates data
├── script.js              # Other interactive features
├── styles.css             # Styling
└── images/                # Your images
```

## Next Steps

1. **Update `portfolio-data.json`** with your actual information
2. **Test the website** to ensure everything displays correctly
3. **Keep your data organized** by regularly updating the JSON file
4. **Backup your data** - the JSON file is now your most important asset!

---

**Note**: The HTML files still contain placeholder content, but it will be replaced by the data from `portfolio-data.json` when the pages load. You can leave the HTML as-is or clean it up later.
