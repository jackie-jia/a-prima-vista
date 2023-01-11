import json

"""
Aggregate all data into one json file
"""
def aggregate_data():
    offset = 0
    limit = 1000
    result = {}

    while offset <= 215000:
        filename = "data/data_" + str(offset) + ".json"

        with open(filename, "r") as infile:
            result.update(json.load(infile))

        offset += limit

    with open("data/aggregated.json", "w") as outfile:
        json.dump(result, outfile)

aggregate_data()