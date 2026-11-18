#!/bin/sh
# Fetches nocrecords.xml from a home connection (e.g. a Raspberry Pi), because
# Traveline's Cloudflare challenges requests from GitHub Actions runners.
#
# Setup:
#   sudo apt install git curl libxml2-utils
#   clone the repo over SSH with a write-access deploy key
#   crontab -e:  15 */6 * * * /path/to/scrapings/pi/fetch-noc.sh >> ~/fetch-noc.log 2>&1

# Wrapped in a function so the whole script is parsed before `git pull`
# can change this file underneath the running shell.
main() {
	set -eu
	cd "$(dirname "$0")/.."

	git pull -q --rebase

	tmp=$(mktemp)
	trap 'rm -f "$tmp"' EXIT

	curl -sf -A "bustimes.org (https://github.com/bustimes/scrapings)" \
		"https://www.travelinedata.org.uk/noc/api/1.0/nocrecords.xml" \
		| iconv -f utf-8 -t utf-8 -c | xmllint --format --nocdata --encode UTF-8 - > "$tmp"
	mv "$tmp" nocrecords.xml

	# a one-line change is just the generation timestamp, so ignore it
	if [ "$(git diff --shortstat nocrecords.xml)" != " 1 file changed, 1 insertion(+), 1 deletion(-)" ]; then
		git add nocrecords.xml
		if git commit -qm "update nocrecords.xml (NOC)"; then
			git push -q
		fi
	fi
	git checkout -q nocrecords.xml
}

main "$@"
