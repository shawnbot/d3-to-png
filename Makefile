%.svg: %.js
	node index.js $< > $@

%.png: %.svg
	convert -background none $< $@

.PRECIOUS: %.svg

clean:
	rm -f *.svg *.png
