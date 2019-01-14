#!/bin/bash
gammu-detect | head -5 | grep device | awk '{print $3}'
sed -i.bak /etc/gammurc -re "s:^(device = )(.+):\1`gammu-detect | head -5 | grep device | awk '{print $3}'`:"
sed -i.bak /etc/gammu-smsdrc -re "s:^(port = )(.+):\1`gammu-detect | head -5 | grep device | awk '{print $3}'`:"
cat /etc/gammurc | grep device
cat /etc/gammu-smsdrc | grep port
gammu identify
