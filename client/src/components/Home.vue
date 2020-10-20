<template>
    <v-container>
        <h1>Hello World!</h1>
    </v-container>
</template>

<script>
    import axios from "axios";

    export default {
        name: "Home",

        data() {
            return {
                editingBookId: "",
                bookTitle: "",
                bookAuthor: "",
                pages: "",
                genre: "",
                item_count: 0,
                popup: false,
                books: [],
            }

        },
        methods: {
            setID: function (book) {
                this.editingBookId = book.id;
                alert("Setting Book Id");
            },

            addBook: function () {
                let newBook = {
                    'title' : this.bookTitle,
                    'author' : this.bookAuthor,
                    'pages' : this.pages,
                    'genre' : this.genre,
                    'item_count' : this.item_count
                }

                axios.post(
                    "https://omdwbfqiu8.execute-api.ap-southeast-1.amazonaws.com/dev/api/books/", newBook
                ).then((response) => alert(response));

                setTimeout(function() {
                    location.reload();
                }, 1000);
            },

            deleteBook: function (book) {
                if(confirm("Please confirm if you want to delete this books.")) {
                    axios.delete(
                        "https://omdwbfqiu8.execute-api.ap-southeast-1.amazonaws.com/dev/api/books/", book.id
                    ).then((response) => alert(response));
                }
            },

            editBook: function() {
                this.setID();
                let newBook = {
                    'title' : this.bookTitle,
                    'author' : this.bookAuthor,
                    'pages' : this.pages,
                    'genre' : this.genre,
                    'item_count' : this.item_count
                }
                axios.put(
                    "https://omdwbfqiu8.execute-api.ap-southeast-1.amazonaws.com/dev/api/books/" + this.editingBookId, newBook
                ).then((response) => alert(response));

                this.popup = true;

                setTimeout(function() {
                    location.reload();
                }, 1000);
            },

            getBooks: function() {
                axios.get(
                    "https://omdwbfqiu8.execute-api.ap-southeast-1.amazonaws.com/dev/api/books"
                ).then((res) => {
                    this.books = res.data.data;
                    alert(JSON.stringify(this.books))
                }).catch((err) => alert(err));
            }
        },
        mounted() {
            this.getBooks();
        },
    }
</script>

<style scoped>

</style>