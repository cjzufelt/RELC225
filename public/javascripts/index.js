var app = new Vue({
    el: '#app',
    data: {
        loading: true,
        numSections: 138,
        sectionNum: 1,
        verses: "",
        dcjson: Object(),
        addedName: '',
        addedInsight: '',
        insights: {}
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

        addInsight() {
            if (!this.validSectionNum()) {
                return false;
            }
            
            var currentDate = new Date();
            if (!((this.sectionNum - 1) in this.insights))
                Vue.set(app.insights, (this.sectionNum - 1), new Array);
            this.insights[(this.sectionNum - 1)].push({
                author: this.addedName,
                text: this.addedInsight,
                date: new Date().toLocaleString()
            });
            this.addedName = '';
            this.addedInsight = '';
        }
    }
})
