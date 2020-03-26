var app = new Vue({
    el: '#app',
    data: {
        loading: true,
        numSections: 138,
        sectionNum: 1,
        verses: "",
        dcjson: Object(),
        author: '',
        insight: '',
        insights: {},
        addSuccessful: null,
    },

    created() {
        this.init();
    },

    methods: {
        async init() {
            try {
                let response = await axios.get("/api/dcjson");
                this.dcjson = response.data;
                this.updatePage();
                this.loading = false;
                return true;
            }
            catch (error) {
                console.log(error);
            }
        },

        validSectionNum() {
            if (isNaN(this.sectionNum)) {
                return false;
            }
            else if (this.sectionNum - 1 < 0 || this.sectionNum - 1 >= this.numSections) {
                this.verses = "";
                return false;
            }
            return true;
        },

        updatePage() {
            if (!this.validSectionNum()) {
                this.verses = "";
                return false;
            }

            window.scrollTo(0, 0);
            this.verses = "";
            var verse;
            for (verse of this.dcjson.sections[this.sectionNum - 1].verses) {
                this.verses += verse.verse + ": " + verse.text + "\n\n";
            }
            
            this.getInsights();
        },

        nextChapter() {
            if (this.sectionNum >= this.numSections) {
                this.sectionNum = 1;
            }
            else {
                ++this.sectionNum;
            }

            this.updatePage();
        },

        prevChapter() {
            if (this.sectionNum <= 1) {
                this.sectionNum = this.numSections;
            }
            else {
                --this.sectionNum;
            }

            this.updatePage();
        },

        async putInsights() {
            try {
                let r1 = await axios.post('/api/insights/', {
                    sectionNum: this.sectionNum,
                    author: this.author,
                    insight: this.insight,
                    date: new Date().toLocaleString(),
                });
                this.addSuccessful = r1.data;
            }
            catch (error) {
                console.log(error);
            }
            
            this.author = "";
            this.insight = "";
            this.getInsights();
        },

        async getInsights() {
            try {
                let response = await axios.get("/api/insights/" + this.sectionNum);
                this.insights = response.data;
                //console.log(this.insights);
                return true;
            }
            catch (error) {
                console.log(error);
            }
        },
    }
})
