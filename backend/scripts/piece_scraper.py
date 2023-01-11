import requests
from bs4 import BeautifulSoup
import json

"""
Scrape and load one batch of 1000 pieces into file
"""
def process_batch_data(base_url, offset):
    url = base_url + str(offset)
    request = requests.get(url).json()
    temp = {}

    for r in request:
        if r != "metadata":
            entry = request[r]
            temp[entry["id"]] = {"title": entry["intvals"]["worktitle"],
                        "composer": entry["intvals"]["composer"],
                        "imslp_link": entry["permlink"]}
        
        # scrape the piece-specific link for more information
        imslp_soup = BeautifulSoup(requests.get(entry["permlink"]).content, 'html.parser')
        scrape_piece_info(imslp_soup, temp, entry["id"])
    
    filename = "data_" + str(offset) + ".json"
    json_data = json.dumps(temp)
    with open(filename, "w") as outfile:
        outfile.write(json_data)

    return request

"""
Scrape style and instrumentation data points from IMSLP page
"""
def scrape_piece_info(soup, data, id):
    # scrape instrumentation and style
    table = soup.find("div", "wi_body")
    if table:
        rows = table.find_all("tr")
        for row in rows:
            heading = row.find("th")
            if heading:
                heading = heading.text.strip()
                if heading == "Piece Style":
                    t_data = row.find("td").text.strip()
                    data[id]["style"] = t_data
                if heading == "Instrumentation":
                    t_data = row.find("td").text.strip()
                    data[id]["instrumentation"] = t_data

data = {}
offset = 194000
limit = 1000
base_url = "https://imslp.org/imslpscripts/API.ISCR.php?account=worklist/disclaimer=accepted/sort=id/type=2/start="

while True:
    print("offset", offset)
    request = process_batch_data(base_url, offset)
    if not request["metadata"]["moreresultsavailable"]:
        break
    offset += limit