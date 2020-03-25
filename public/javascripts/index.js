var app = new Vue({
    el: '#app',
    data: {
        numSections: 138,
        sectionNum: 1,
        verses: "",
        dcjson: Object()
    },

    created() {
        this.init();
    },

    methods: {
        async init() {
            try {
                let response = await axios.get("/api/dcjson");
                this.dcjson = response.data;
                this.getSectionVerses(this.sectionNum - 1);
                return true;
            }
            catch (error) {
                console.log(error);
            }
        },

        getSectionVerses(section) {
            this.verses = "";
            var verse;
            for (verse of this.dcjson.sections[section].verses) {
                this.verses += verse.verse + " " + verse.text + "\n";
            }
        },

        nextChapter() {
            if (this.sectionNum >= this.numSections) {
                this.sectionNum = 1;
            }
            else {
                ++this.sectionNum;
            }

            this.getSectionVerses(this.sectionNum - 1);
        },

        prevChapter() {
            if (this.sectionNum <= 1) {
                this.sectionNum = this.numSections;
            }
            else {
                --this.sectionNum;
            }

            this.getSectionVerses(this.sectionNum - 1);
        }
    }
})
