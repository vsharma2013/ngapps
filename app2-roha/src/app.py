from bs4 import BeautifulSoup
import urllib2

url = "http://www.python.org"
html_doc = urllib2.urlopen(url)

soup = BeautifulSoup(html_doc, 'html.parser')

print(soup.get_text())