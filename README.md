# 📊 Flowchart Editor with PDF Export

A modern, browser-based flowchart editor built with Mermaid.js. Create professional flowcharts and export them to PDF with perfect print formatting.

## ✨ Features

### Core Functionality
- **Live Preview** - See changes instantly as you type
- **Mermaid Syntax** - Industry-standard flowchart syntax
- **Multiple Templates** - Get started quickly with pre-built examples
- **Code Editing** - Full control over flowchart structure

### Export & Print
- **PDF Export** - One-click export with optimized formatting
- **SVG Export** - Vector graphics for editing in other tools
- **JSON Export** - Save flowchart definition for version control
- **Print Friendly** - Optimized print styles, works in B&W
- **Responsive** - Scales to any printer size

### User Experience
- **Zero Setup** - Open `index.html` and start immediately
- **No Server Required** - Works completely offline
- **Responsive Design** - Works on desktop, tablet, mobile
- **Dark-Aware** - Adaptive colors for any theme
- **Error Handling** - Clear feedback on syntax errors

## 🚀 Quick Start

### Option 1: Instant (Recommended)
```bash
# Just open index.html in your browser
open index.html
```

### Option 2: Development Server
```bash
npm install
npm run dev
```

## 📋 Usage Guide

### Creating a Flowchart

1. **Start with a Template** - Click any template button
2. **Edit the Code** - Modify the Mermaid code in the left panel
3. **See Preview** - Your flowchart updates in real-time on the right
4. **Export or Print** - Use the buttons at the bottom

### Common Shapes

| Shape | Syntax | Example |
|-------|--------|----------|
| Rectangle | `[" Text "]` | `A["Process"]` |
| Diamond | `{" Text "}` | `B{"Decision?"}` |
| Rounded | `(" Text ")` | `C("Start")` |
| Circle | `((" Text "))` | `D(("Center"))` |

### Example: Simple Process Flow

```
flowchart TD
    A["Start"] --> B["Validate Input"]
    B --> C{"Valid?"}
    C -->|Yes| D["Process"]
    C -->|No| E["Show Error"]
    D --> F["End"]
    E --> F
    
    style A fill:#90EE90
    style F fill:#FFB6C6
    style C fill:#FFE4B5
```

## 📤 Export Options

### PDF Export
- **Best for**: Printing, sharing, archiving
- **Features**: Print-friendly formatting, B&W support
- **Click**: "📑 Export to PDF"

### SVG Export
- **Best for**: Editing in design tools (Figma, Illustrator)
- **Features**: Vector format, scalable, editable
- **Click**: "📥 SVG Export"

### JSON Export
- **Best for**: Version control, backup
- **Contains**: Full flowchart definition
- **Click**: "📄 JSON Export"

### Print
- **Best for**: Physical copies
- **Optimized for**: All printer types
- **Click**: "🖨️ Print" or Ctrl+P

## 🎨 Templates Included

### 1. Simple Flow
Basic linear process with start, steps, and end.

### 2. Decision Tree
Process with yes/no decision branches.

### 3. Process Flow
Left-to-right flow with validation and error handling.

### 4. Swimlane
Multi-department/team process flow.

## 💾 File Structure

```
flowchart-editor/
├── index.html          # Complete application (all-in-one)
├── package.json        # Dependencies
├── vite.config.js      # Dev server config
├── README.md           # This file
└── .gitignore          # Git ignore rules
```

## 🛠️ Technologies Used

- **Mermaid.js** - Flowchart rendering
- **html2pdf.js** - PDF export
- **Vite** - Dev server (optional)
- **Vanilla JavaScript** - Core logic
- **CSS3** - Styling and layout

## 📱 Responsive Features

- **Desktop**: Full side-by-side editor/preview
- **Tablet**: Stacked layout with full functionality
- **Mobile**: Touch-friendly buttons, full editing capability

## 🖨️ Print Optimization

### Print-Friendly Design
- Hides all UI elements during print
- Optimizes margins and spacing
- Maintains color or converts to grayscale
- Scales diagrams to page width

### Best Practices
1. Test with "Print Preview" first
2. Use narrow diagrams (fit on one page)
3. Limit text in nodes
4. Use colors for clarity (auto-converts to B&W)

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Preview not updating | Check Mermaid syntax. Invalid syntax hides preview. |
| PDF export fails | Ensure diagram is valid and visible in preview |
| Text looks wrong in print | Reduce text length or use shorter node names |
| Colors disappear in print | Normal. Use "Print backgrounds" option in print dialog |

## 📚 Mermaid Syntax Reference

### Basic Connectors
```
A --> B      # Arrow
A --- B      # Line
A -.-> B     # Dotted
A ==> B      # Thick
```

### Labeled Connectors
```
A -->|Label| B
A -- Label --> B
```

### Subgraphs (Swimlanes)
```
subgraph GroupName["Display Name"]
    A --> B
end
```

For complete Mermaid documentation: https://mermaid.js.org

## 🎓 Examples

### Example 1: User Registration Flow
```
flowchart TD
    A["User Visits Site"] --> B["Click Register"]
    B --> C["Fill Form"]
    C --> D{"Email Valid?"}
    D -->|No| E["Show Error"]
    E --> C
    D -->|Yes| F["Send Confirmation"]
    F --> G["Account Created"]
    
    style A fill:#ADD8E6
    style G fill:#90EE90
```

### Example 2: Bug Triage Process
```
flowchart LR
    A["New Bug Report"] --> B{"Priority?"}
    B -->|High| C["Assign to Senior Dev"]
    B -->|Medium| D["Add to Backlog"]
    B -->|Low| E["Community Discussion"]
    C --> F["Fix & Test"]
    D --> F
    E --> F
    F --> G["Release"]
    
    style F fill:#FFE4B5
    style G fill:#90EE90
```

## 🤝 Contributing

Found a bug? Want to improve? Feel free to:
1. Open an issue
2. Submit a pull request
3. Suggest features

## 📄 License

MIT License - Use freely in personal and commercial projects.

## 🔗 Resources

- [Mermaid Documentation](https://mermaid.js.org)
- [Flowchart Best Practices](https://www.lucidchart.com/pages/flowchart-symbols-meaning-explained)
- [PDF Export Library](https://github.com/parallax/html2pdf.js)

## 📞 Support

Need help?
1. Check the examples above
2. Visit [Mermaid Docs](https://mermaid.js.org)
3. Open an issue on GitHub

---

**Made with ❤️ for better flowcharts**

v1.0.0 | MIT License
