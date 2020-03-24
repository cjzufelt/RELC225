var app = new Vue({
    el: '#app',
    data: {
        numChapters: 138,
        chapterNum: 1,
        verses: "",
        dcjson: ""
    },

    async created() {
        this.getJson();
    },

    methods: {
        async getJson() {
            try {
                let response = await axios.get("/api/dcjson");
                this.dcjson = response.data;
                console.log(this.dcjson);
                return true;
            }
            catch (error) {
                console.log(error);
            }
        },
        
        nextChapter() {
            if (this.chapterNum >= this.numChapters) {
                this.chapterNum = 1;
            }
            else {
                ++this.chapterNum;
            }

            this.verses = this.dcjson.JSON.parse('{"section":"1"}');
        },

        prevChapter() {
            if (this.chapterNum <= 1) {
                this.chapterNum = this.numChapters;
            }
            else {
                --this.chapterNum;
            }
        }
    }
})
