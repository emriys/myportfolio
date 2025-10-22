# Personal Portfolio Website

A clean, professional academic portfolio website inspired by modern design principles. Perfect for researchers, academics, and professionals who want to showcase their work.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, academic design with smooth animations
- **Single Page Navigation**: Smooth scrolling between sections
- **Professional Sections**: About, Experience, Projects, Publications, Talks, Contact
- **Interactive Elements**: Mobile navigation, scroll effects, and hover animations
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Fast Loading**: Optimized CSS and JavaScript for performance

## Sections Included

1. **Hero/Home**: Introduction with profile image and call-to-action buttons
2. **About**: Detailed information about your background, education, and interests
3. **Experience**: Timeline of your academic and professional experience
4. **Projects**: Showcase of your research projects with images and descriptions
5. **Publications**: List of your academic publications with links
6. **Talks**: Recent and upcoming presentations
7. **Contact**: Contact information and social media links

## Setup Instructions

### 1. Customize Your Information

Replace the placeholder content in `index.html` with your actual information:

- **Personal Information**: Name, title, institution, bio
- **Profile Image**: Add your photo to `images/profile.jpg`
- **Education**: Update degrees, institutions, and years
- **Experience**: Add your work history and positions
- **Research Interests**: List your areas of expertise
- **Contact Information**: Email, address, phone, social media links

### 2. Add Your Content

#### Images
- Place your profile photo in `images/profile.jpg`
- Add project images as `images/project1.jpg`, `images/project2.jpg`, etc.
- Recommended image sizes:
  - Profile photo: 300x300px (square, will be cropped to circle)
  - Project images: 400x250px (16:10 aspect ratio)

#### Documents
- Add your CV as `files/CV.pdf`
- Add any publication PDFs to the `files/` directory

#### Projects
Update the projects section with your actual research projects:
- Project titles and descriptions
- Links to project pages or repositories
- Relevant tags/keywords

#### Publications
Add your publications in the publications section:
- Author names (link to their profiles if available)
- Publication titles with links to papers
- Venue/journal names and years
- PDF and DOI links

#### Talks
List your recent and upcoming talks:
- Talk titles and descriptions
- Conference/event names
- Dates and locations

### 3. Customize Colors and Styling

The website uses a professional blue color scheme. To customize:

1. Open `styles.css`
2. Look for color variables at the top (you can add CSS custom properties)
3. Main colors used:
   - Primary blue: `#2563eb`
   - Dark text: `#1f2937`
   - Light text: `#6b7280`
   - Background: `#f9fafb`

### 4. Deploy to GitHub Pages

1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to repository Settings > Pages
4. Select "Deploy from a branch" and choose "main"
5. Your site will be available at `https://yourusername.github.io/repository-name`

## File Structure

```
portfolio-website/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
├── README.md           # This file
├── images/             # Image assets
│   ├── profile.jpg     # Your profile photo
│   ├── project1.jpg    # Project images
│   └── ...
└── files/              # Documents
    ├── CV.pdf          # Your CV/Resume
    └── ...
```

## Customization Tips

### Adding New Sections
1. Add the section HTML in `index.html`
2. Add corresponding styles in `styles.css`
3. Update navigation links

### Changing Fonts
The website uses Inter font from Google Fonts. To change:
1. Update the Google Fonts link in `index.html`
2. Update the font-family in `styles.css`

### Adding Dark Mode
The JavaScript includes a theme toggle function. To implement:
1. Add a theme toggle button to the navigation
2. Add dark mode styles to `styles.css`
3. Uncomment the theme toggle functionality

### Adding a Blog
To add a blog section:
1. Create a `blog/` directory
2. Add blog post HTML files
3. Create a blog index page
4. Update navigation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance

The website is optimized for performance:
- Minimal external dependencies
- Optimized images (use WebP format for better compression)
- Lazy loading for images
- Debounced scroll events
- CSS and JavaScript minification recommended for production

## Accessibility

The website follows accessibility best practices:
- Semantic HTML structure
- Proper heading hierarchy
- Alt text for images
- Keyboard navigation support
- High contrast colors
- Screen reader friendly

## License

This template is free to use for personal and commercial projects. Attribution is appreciated but not required.

## Support

If you encounter any issues or need help customizing the website, feel free to:
1. Check the browser console for JavaScript errors
2. Validate your HTML and CSS
3. Test on different devices and browsers

## Credits

- Design inspired by modern academic websites
- Icons from Font Awesome
- Fonts from Google Fonts
- Built with vanilla HTML, CSS, and JavaScript
