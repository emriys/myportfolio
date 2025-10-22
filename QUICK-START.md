# Quick Start Guide - Data-Driven Portfolio

## 🎉 Your Portfolio is Now Data-Driven!

All your website content now loads from a single JSON file, making updates incredibly easy.

## 📝 How to Update Your Portfolio

### Step 1: Edit Your Data
Open `portfolio-data.json` and update your information:
- Personal details (name, email, position)
- Education and experience
- Projects
- Publications
- Talks and presentations
- Contact information
- Social media links

### Step 2: Test Your Changes
Run the local server:
```bash
python serve.py
```

Then open http://localhost:8000 in your browser.

### Step 3: That's It!
Your changes will automatically appear on all pages. No need to edit multiple HTML files!

## 📂 Key Files

- **`portfolio-data.json`** ← Edit this file to update your portfolio
- **`data-loader.js`** - Automatically loads your data (don't edit unless customizing)
- **`index.html`** - Homepage
- **`publications.html`** - Full publications list
- **`talks.html`** - Full talks list

## 🔧 Common Updates

### Add a Publication
```json
// In portfolio-data.json, find "publications.byYear"
"2024": [
  {
    "authors": [
      {"name": "Your Name", "url": "#"},
      {"name": "Co-Author", "url": "#"}
    ],
    "title": "Your Publication Title",
    "url": "https://doi.org/...",
    "venue": "Conference 2024",
    "abstract": "Your abstract...",
    "links": [
      {"type": "PDF", "url": "#", "icon": "fas fa-file-pdf"}
    ]
  }
]
```

### Add a Talk
```json
// In portfolio-data.json, find "talks.byYear"
"2024": [
  {
    "title": "Talk Title",
    "venue": "Conference Name",
    "date": "October 2024",
    "location": "City, Country",
    "type": "Keynote",
    "abstract": "Talk description..."
  }
]
```

### Update Contact Info
```json
// In portfolio-data.json, find "contact"
"contact": {
  "email": "your.new.email@example.com",
  "phone": "+1 234 567 890"
}
```

## 🚀 Deployment

When deploying to production:
1. Make sure `portfolio-data.json` is uploaded
2. Ensure `data-loader.js` is uploaded
3. All HTML files should include the data-loader script

## 📖 Full Documentation

See `DATA-MANAGEMENT.md` for complete documentation on:
- Detailed data structure
- All available fields
- Advanced customization
- Troubleshooting

## ✅ Benefits

- ✨ **Single source of truth** - All data in one file
- 🎯 **Easy updates** - Edit JSON, not HTML
- 🔄 **Automatic consistency** - Same data across all pages
- 📈 **Scalable** - Easy to add content as you grow
- 🛠️ **Maintainable** - Much easier to manage

## 🆘 Need Help?

1. **JSON syntax errors?** Use [jsonlint.com](https://jsonlint.com) to validate
2. **Changes not showing?** Hard refresh (Ctrl+F5)
3. **Browser errors?** Check console (F12)

---

**Ready to customize?** Open `portfolio-data.json` and start editing! 🚀
