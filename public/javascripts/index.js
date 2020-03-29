var app = new Vue({
    el: '#app',
    data: {
        loading: true,
        numSections: 138,
        sectionNum: 1,
        verses: "",
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
                this.updatePage();
                this.loading = false;
                return true;
            }
            catch (error) {
                console.log(error);
            }
        },

        updatePage() {
            window.scrollTo(0, 0);
            this.getVerses();
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

        async getVerses() {
            if (this.sectionNum != "") {
                try {
                    let response = await axios.get("/api/dc/" + this.sectionNum);
                    this.verses = response.data;
                    return true;
                }
                catch (error) {
                    console.log(error);
                }
            }
            else {
                this.verses = "";
            }
        },

        async putInsights() {
            try {
                let r1 = await axios.post("/api/insights/", {
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
            if (this.sectionNum != "") {
                try {
                    let response = await axios.get("/api/insights/" + this.sectionNum);
                    this.insights = response.data;
                    return true;
                }
                catch (error) {
                    console.log(error);
                }
            }
            else {
                this.insights = [];
            }
        },
    }
})
