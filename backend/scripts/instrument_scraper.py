from bs4 import BeautifulSoup
import requests
import json
import inflect

"""
scraping musical instruments
https://www.allthemusicalinstrumentsoftheworld.com/
"""
engine = inflect.engine()
url = 'https://www.allthemusicalinstrumentsoftheworld.com/'
soup = BeautifulSoup(requests.get(url).content, 'html.parser')
div = soup.find('div', 'col1div')
tables = div.find_all('table')
inst = {"instruments": []}
# print(tables)
for t in tables:
    instruments = t.find_all("div", attrs={'style':"float:left;text-align:center;height:210px;width:180px;"})
    for i in instruments:
        inst["instruments"].append(i.text.lower())
        inst["instruments"].append(engine.plural(i.text.lower()))
with open('instruments.json', 'w') as file:
    file.write(json.dumps(inst))

