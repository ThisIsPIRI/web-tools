#!/usr/bin/env python3
with open("manuri.malmoia") as rf:
	lines = rf.readlines()
with open("manuri.malmoi", 'w') as wf:
	count = 0
	for l in lines:
		if not(l[0] == '#' or l[0] == '*' or l[0] == '\n'):
			wf.write(str(count) + ' ' + l)
			count += 1
		else:
			wf.write(l)
