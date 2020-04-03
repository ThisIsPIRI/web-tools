#!/usr/bin/env python3

#argv[1]의 낱말이 있는 모든 줄 앞에 몇째를 붙이고 argv[2]에 씀

from sys import argv

with open(argv[1]) as rf:
	lines = rf.readlines()
with open(argv[2], 'w') as wf:
	count = 0
	for l in lines:
		if not(l[0] == '#' or l[0] == '*' or l[0] == '\n'):
			wf.write(str(count) + ' ' + l)
			count += 1
		else:
			wf.write(l)
