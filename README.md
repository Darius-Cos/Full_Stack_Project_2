# 🌿 NutriVita - Nutrition Supplements Portal

## 📌 Project Overview

A comprehensive educational platform about nutritional supplements featuring:
- Interactive forms with validation
- Dynamic content loading via AJAX
- SVG-animated supplement visualizations
- Custom Python web server implementation
- Responsive design for all devices

## 🛠️ Technical Stack

| Component       | Technology Used           | Key Features                          |
|-----------------|---------------------------|---------------------------------------|
| Frontend        | HTML5, CSS3, JavaScript   | Responsive design, SVG animations     |
| Backend         | Python (Custom Server)    | Handles HTTP requests, serves files   |
| Dynamic Content | XMLHttpRequest            | Seamless page transitions             |
| Visualization   | SVG, Canvas API           | Interactive supplement displays       |

## 🚀 Key Features

### Dynamic Content System
```javascript
function schimbaContinut(resursa, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", resursa + ".html", true);
    // AJAX implementation for smooth navigation
}
```

### Interactive Tools
- **Canvas Drawing**: Create custom shapes with color controls
- **Dynamic Tables**: Add/remove rows and columns in real-time
- **System Info Display**: Shows browser/environment data

### Custom Web Server
```python
def get_mime_type(filename):
    # Smart content-type detection
    return {
        'html': 'text/html',
        'css': 'text/css',
        'js': 'text/javascript'
    }.get(ext, 'text/plain')
```

## 📂 Project Structure

```
nutrition-website/
├── css/
│   └── stil.css            # Responsive styles
├── js/
│   └── script.js           # Dynamic content logic
├── images/                 # Supplement visuals
├── server_web.py           # Custom Python server
└── html_pages/             # All page templates
    ├── acasa.html
    ├── despre.html
    ├── inregistreaza.html
    └── ...
```

## 🚀 Getting Started

### Run the server:
```bash
python server_web.py
```

### Access in browser:
```
http://localhost:5678
```

### Explore sections:
- **Home**: General supplement info
- **About**: Detailed supplement database
- **Register**: Interactive signup form
- **Gallery**: Animated supplement visuals

## 🤝 Partners

- **Weider**: Premium supplement provider
