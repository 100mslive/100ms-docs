# This is a python script to scrap docs website 
# and compile all the docs to a single pdf file

# Prerequisites for running the script

# 1. Install Python 3:
# Official Python website: https://www.python.org/downloads/
# Make sure to check the option "Add Python to PATH" during installation.

# 2. Install necessary libraries:
# You might need to install libraries using pip. Open a terminal and run:
# pip install <library_name>
# Example: pip install selenium

# 3. Install Chromedriver:
# Official Chromedriver website: https://sites.google.com/chromium.org/driver/
# Download the version compatible with your Chrome browser.
# Ensure that the Chromedriver version matches your Chrome browser version.

import concurrent.futures
import json
import os
import base64
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from urllib.parse import urlparse, unquote
from PyPDF2 import PdfMerger

DIRECTORY = 'docsPDF'

merger = PdfMerger()
# Initialize a set to store the anchor tags
anchor_tags_set = set()
orderOfFiles = []
# Create ChromeOptions object
chrome_options = Options()

# Add the --headless option to run the browser in the background
chrome_options.add_argument('--headless')

# ANSI color codes
class Colors:
    RED = '\033[91m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    MAGENTA = '\033[95m'
    CYAN = '\033[96m'
    RESET = '\033[0m'

# URL of the website you want to open
websiteUrls = ['https://www.100ms.live/docs/get-started/v2/get-started/overview',
               'https://www.100ms.live/docs/javascript/v2/quickstart/mental-model',
               'https://www.100ms.live/docs/android/v2/quickstart/quickstart',
               'https://www.100ms.live/docs/ios/v2/quickstart/quickstart',
               'https://www.100ms.live/docs/flutter/v2/quickstart/prebuilt',
               'https://www.100ms.live/docs/react-native/v2/quickstart/prebuilt',
               'https://www.100ms.live/docs/server-side/v2/how-to-guides/make-api-calls'
            ]
def delete_directory(directory_path):
    try:
        # List all files and subdirectories in the directory
        for file_or_dir in os.listdir(directory_path):
            file_or_dir_path = os.path.join(directory_path, file_or_dir)

            # If it's a file, remove it
            if os.path.isfile(file_or_dir_path):
                os.remove(file_or_dir_path)
            # If it's a directory, recursively delete it
            elif os.path.isdir(file_or_dir_path):
                delete_directory(file_or_dir_path)

        # Remove the empty directory
        os.rmdir(directory_path)
        print(f"Directory '{directory_path}' and its contents have been successfully deleted.")
    except FileNotFoundError:
        print(f"Directory '{directory_path}' not found.")
    except Exception as e:
        print(f"An error occurred: {e}")

def send_cmd(driver, cmd, params={}):
    response = driver.command_executor._request(
        'POST',
        f"{driver.command_executor._url}/session/{driver.session_id}/chromium/send_command_and_get_result",
        json.dumps({'cmd': cmd, 'params': params})
    )
    if response.get('status'):
        raise Exception(response.get('value'))
    return response.get('value')

def url_to_filename(url):
    # Parse the URL
    parsed_url = urlparse(url)

    # Extract the path and remove the portion till "docs"
    path_without_prefix = parsed_url.path.removeprefix('/docs/')

    # Decode and remove special characters
    decoded_path = unquote(path_without_prefix)

    # Replace slashes with underscores to create a valid file name
    filename = decoded_path.replace('/', '_')
    filename += '.pdf'

    return filename

def get_anchor_tags_in_accordion(url):
    # Create a new instance of the Chrome driver
    driver = webdriver.Chrome(options=chrome_options)

    # Open the website
    driver.get(url)
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, 'accordion-content'))
    )

    # Find all anchor tags within elements with the class 'accordion-content'
    accordion_elements = driver.find_elements(By.CLASS_NAME, 'accordion-content')
    

    for accordion_element in accordion_elements:
        # Find anchor tags within each accordion element
        anchor_tags = accordion_element.find_elements(By.TAG_NAME, 'a')

        # Add anchor tags to the set
        for anchor_tag in anchor_tags:
            anchor_tags_set.add(anchor_tag.get_attribute('href'))
            out_path_full = os.path.join(DIRECTORY, url_to_filename(anchor_tag.get_attribute('href')))
            orderOfFiles.append(out_path_full)

    # Close the browser window
    driver.quit()


def append_page_as_pdf(page_url):

    # Create a Chrome WebDriver instance with specified options
    driver = webdriver.Chrome(options=chrome_options)

    try:
        # Open the page URL
        driver.get(page_url)
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, 'article'))
        )

        # Execute the Page.printToPDF command with the specific element
        result = send_cmd(driver, "Page.printToPDF", params={
            'format': 'A0',
            'displayHeaderFooter': False,
            'transferMode': 'ReturnAsBase64',
            'paperWidth':20
        })

        output_path = url_to_filename(page_url)
        # Create the output directory if it doesn't exist
        os.makedirs(DIRECTORY, exist_ok=True)

        # Save the PDF content to the specified output path inside the directory
        out_path_full = os.path.join(DIRECTORY, output_path)
        with open(out_path_full, 'wb') as file:
            file.write(base64.b64decode(result['data']))
        print(Colors.GREEN + f"Succesfull: {page_url}"+ Colors.RESET)
    except:
        print(Colors.RED + f"Failed: {page_url}"+ Colors.RESET)

    finally:
        # Close the WebDriver instance
        driver.quit()

def process_page(page_url):
    try:
        print(f"Processing: {page_url}")
        append_page_as_pdf(page_url)
    except Exception as e:
        print(Colors.RED + f"Failed processing {page_url} with exception: {e}" + Colors.RESET)

def merge_pdfs(input_pdfs):
    for input_pdf in input_pdfs:
        print(input_pdf)
        merger.append(input_pdf)
    with open('mergedDocs.pdf', 'wb') as merged_file:
        merger.write(merged_file)      
        merger.close()
        delete_directory(DIRECTORY)

# Find all the pages link
for url in websiteUrls:
    get_anchor_tags_in_accordion(url)

# Set the maximum number of threads (adjust as needed)
max_threads = 20

with concurrent.futures.ThreadPoolExecutor(max_threads) as executor:
    executor.map(process_page, anchor_tags_set)


merge_pdfs(orderOfFiles)
