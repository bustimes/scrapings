import requests
from pathlib import Path
from xml.etree.ElementTree import iterparse, tostring
import json
from io import BytesIO


def get_naptan_ranges() -> dict:
    """
    Downloads NaPTAN XML and finds byte ranges for StopPoint and StopArea elements.
    Returns a dictionary mapping element IDs to their byte ranges in the file.
    """
    # Download NaPTAN XML
    url = "https://naptan.api.dft.gov.uk/v1/access-nodes?dataFormat=xml"

    response = requests.get(url, stream=True)
    print(response.headers)

    # Store the raw bytes
    xml_bytes = response.content
    xml_file = BytesIO(xml_bytes)

    with Path("naptan.xml").open('wb') as f:
        f.write(xml_bytes)

    ranges = {}

    # parser = XMLParser()

    start_pos = end_pos = 0

    # Iterate through XML events
    for _, elem in iterparse(xml_file):
        tag = elem.tag.removeprefix("{http://www.naptan.org.uk/}")

        if tag == "StopPoint":
            current_id = elem.find("{http://www.naptan.org.uk/}AtcoCode").text

            region = current_id[:3]
            if region not in ranges:
                ranges[region] = {}

            pos = xml_file.tell()
            if pos > end_pos:
                start_pos = end_pos
                end_pos = pos

            ranges[region][current_id[4:]] = (start_pos, end_pos)

            # Clear element to save memory
            elem.clear()

    return ranges


def save_ranges_to_json(ranges):
    """
    Saves the byte ranges to a JSON file
    """
    path = Path("ranges")
    path.mkdir(exist_ok=True)
    for region, ids in ranges.items():
        with (path / f"{region}.json").open('w') as f:
            json.dump(ranges[region], f, separators=(',', ':'))


if __name__ == '__main__':
    ranges = get_naptan_ranges()
    print(ranges.keys())
    save_ranges_to_json(ranges)

    # Print some statistics
    # print(f"Found {len(ranges)} StopPoints")