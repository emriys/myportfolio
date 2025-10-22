#!/usr/bin/env python3
"""
Flask server to serve the portfolio website locally.
Run this script and open http://localhost:500 in your browser.
"""

from flask import Flask, send_from_directory, send_file
import webbrowser
import os
import sys
from threading import Timer

PORT = 500

# Create Flask app
app = Flask(__name__)

# Configure Flask to serve static files with no-cache headers
@app.after_request
def after_request(response):
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'
    return response

@app.route('/')
def index():
    """Serve the main index.html file"""
    return send_file('index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    """Serve static files"""
    try:
        return send_from_directory('.', filename)
    except FileNotFoundError:
        # If file not found, return 404
        return "File not found", 404

def open_browser():
    """Open browser after a short delay"""
    webbrowser.open(f'http://localhost:{PORT}')

def main():
    # Change to the directory containing this script
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    # print(f"Portfolio website is running at http://localhost:{PORT}")
    # print("Press Ctrl+C to stop the server")
    
    # Open browser after 1 second delay
    # Timer(1, open_browser).start()
    
    try:
        app.run(host='0.0.0.0', port=PORT, debug=True, use_reloader=False)
    except KeyboardInterrupt:
        print("\nServer stopped.")

if __name__ == "__main__":
    main()
