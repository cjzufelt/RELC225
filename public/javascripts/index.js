var app = new Vue({
    el: '#app',

    data: {
        gallery: [],
        dateMin: null,
        dateMax: null,
        startYear: null,
        numEras: null,
        eraDuration: null,
        yearUnit: null,
        minYearUnit: null,
        zoomTimeout: false,
        coverImg: true,
        theaterMode: "img",
        theaterOn: false,
        subsOn: true,
        theaterData: {},
        recordsHTML: null,
        MONTH: ["No Month", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Novemeber", "December"],
        isMobile: false,
        dividerHeight: 0,
        addingNew: false,
        newPieceDefault: {
            "name": "New Artwork",
            "artist": null,
            "day": null,
            "month": null,
            "year": null,
            "displayYear": false,
            "pos": 50,
            "img": null,
            "period": null,
            "id": 2,
            isNewPlaceholder: true,
        },
        editingPiece: false,
        editPieceIdx: null,
        editOriginal: {},
    },
    
     methods: {
        async upload() {
            try {
                const formData = new FormData();
                formData.append('photo', this.file, this.file.name)
                let r1 = await axios.post('/api/photos', formData);
                let r2 = await axios.post('/api/items', {
                    name: this.name,
                    artist: this.artist,
                    day: this.day,
                    month: this.month,
                    year: this.year,
                    pos: this.pos,
                    img: r1.data.path,
                    period: this.period,
                    note: this.note,
                });
                this.addItem = r2.data;
            }
            catch (error) {
                console.log(error);
            }
        },

        async getPieces() {
            try {
                let response = await axios.get("/api/items");
                this.gallery = response.data;
                return true;
            }
            catch (error) {
                console.log(error);
            }
        },

        // async deleteItem() {
        //     if (confirm(`Are you sure you want to delete '${this.editPiece.name}?'`))
        //     {
        //         try {
        //             // console.log("Made it into deleteItem");
        //             let response = axios.delete("/api/items/" + this.editPiece._id);
        //             this.findItem = null;
        //             this.getPieces();
        //             this.closeEditForm();
        //             return true;
        //         }
        //         catch (error) {
        //             console.log(error);
        //         }
        //     }
        // },
     }