import os
import time
from datetime import datetime

from jinja2 import Template

PUBLIC_DIR = os.path.join(os.path.dirname(__file__), "public")
os.makedirs(PUBLIC_DIR, exist_ok=True)

template = Template(
    """
<html>
<head>
<title>{{ title }}</title>
<meta name="description" content="{{ desc }}">
</head>
<body>
<h1>{{ title }}</h1>
<p>{{ desc }}</p>
<p><strong>AutoTrend Vault</strong> scrapes Google Trends and GPT-4o to generate 10 fresh how-to guides every morning. $5/month. Free sample at <a href="{{ url }}">{{ url }}</a></p>
<p>Generated at {{ timestamp }} UTC</p>
</body>
</html>
"""
)

messages = [
    ("AutoTrend Vault: Daily AI How-Tos", "10 new trending how-to guides every day."),
    ("Discover the Next Big Thing First", "AutoTrend Vault turns trends into action."),
    ("Stop Searching, Start Acting", "Daily actionable guides for $5/month."),
]

while True:
    title, desc = messages[int(time.time()) % len(messages)]
    html = template.render(
        title=title,
        desc=desc,
        url="http://your-server-ip:5000",
        timestamp=datetime.utcnow(),
    )
    filename = os.path.join(PUBLIC_DIR, f"autotrend_{int(time.time())}.html")
    with open(filename, "w") as f:
        f.write(html)
    print("Exported", filename)
    time.sleep(3600)
