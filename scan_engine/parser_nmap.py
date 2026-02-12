from lxml import etree

def parse_nmap_xml(xml_path):
    tree = etree.parse(xml_path)
    root = tree.getroot()

    results = []

    for host in root.findall("host"):
        for port in host.findall(".//port"):
            port_id = port.get("portid")
            state = port.find("state").get("state")
            service = port.find("service")

            service_name = service.get("name") if service is not None else "unknown"

            results.append({
                "port": port_id,
                "state": state,
                "service": service_name
            })

    return results
