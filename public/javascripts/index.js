var app = new Vue({
    el: '#app',
    data: {
        numSections: 138,
        sectionNum: 1,
        verses: [],
        dcjson: Object()
    },

    created() {
        this.getJSON();
        this.getSectionVerses(1);
    },

    methods: {
        async getJSON() {
            try {
                let response = await axios.get("/api/dcjson");
                this.dcjson = response.data;
                // console.log(JSON.stringify(this.dcjson));
                // console.log(JSON.stringify(this.dcjson.sections[0].verses));
                var verse;
                for (verse of this.dcjson.sections[0].verses) {
                    this.verses.push(verse.verse + " " + verse.text);
                }
                return true;
            }
            catch (error) {
                console.log(error);
            }
        },

        getSectionVerses(section) {
            // console.log(JSON.stringify(this.dcjson.sections[0].verses[0].text));
            this.verses = [];
            var verse;
            for (verse of this.dcjson.sections[0].verses) {
                this.verses.push(verse.verse + " " + verse.text);
            }
            // console.log(this.verses);
        },

        nextChapter() {
            if (this.sectionNum >= this.numSections) {
                this.sectionNum = 1;
            }
            else {
                ++this.sectionNum;
            }

            this.getSectionVerses(this.sectionNum);
        },

        prevChapter() {
            if (this.sectionNum <= 1) {
                this.sectionNum = this.numSections;
            }
            else {
                --this.sectionNum;
            }

            this.getSectionVerses(this.sectionNum);
        }
    }
})
