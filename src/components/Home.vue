<template>
    <v-container>
        <v-card width="90%" class="mx-auto mt-5 elevation-0">
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                    <tr>
                        <th class="text-left">Title</th>
                        <th class="text-left">Author</th>
                        <th class="text-left">Pages</th>
                        <th class="text-left">Genre</th>
                        <th class="text-left">Stock</th>
                        <th class="text-left">Edit</th>
                        <th class="text-left">Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="book in books" :key="book.id">
                        <td>{{book.title}}</td>
                        <td>{{book.author}}</td>
                        <td>{{book.pages}}</td>
                        <td>{{book.genre}}</td>
                        <td>{{book.item_count}}</td>
                        <td>
                            <v-dialog v-model="popup" presistent max-width="1000px">
                                <template v-slot:activator="{on, attrs}">
                                    <v-btn @click="setID(book)" color="primary" dark v-bind="attrs" v-on="on">
                                        <v-icon dark>mdi-pencil</v-icon>
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <span class="headline">Book Details</span>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12" sm="6" md="3">
                                                    <v-text-field
                                                            v-model="newTitle"
                                                            label="Title"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="3">
                                                    <v-text-field
                                                            v-model="newAuthor"
                                                            label="Author"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="3">
                                                    <v-text-field
                                                            v-model="newPages"
                                                            label="Pages"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="3">
                                                    <v-text-field
                                                            v-model="newGenre"
                                                            label="Genre"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="3">
                                                    <v-text-field
                                                            v-model="new_Item_Count"
                                                            label="Stock"
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>
                                    <v-card-actions class="justify-center">
                                        <div>
                                            <v-btn
                                                    class="mr-4"
                                                    color="black"
                                                    elevation="2"
                                                    @click="popup = false"
                                            >
                                                <span class="white--text">Cancel</span>
                                            </v-btn>
                                            <v-btn
                                                    class="ml-4"
                                                    color="black"
                                                    elevation="2"
                                                    @click="editBook()"
                                            >
                                                <span class="white--text">Save</span>
                                            </v-btn>
                                        </div>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </td>
                        <td>
                            <v-btn
                                    class="mx-2"
                                    fab
                                    dark
                                    small
                                    color="red"
                                    @click="deleteBook(book)"
                            >
                                <v-icon dark>mdi-delete</v-icon>
                            </v-btn>
                        </td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-card>
        <v-dialog
                v-model="dialog"
                persistent
                max-width="90%"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                        class="btn-center"
                        color="black"
                        dark
                        v-bind="attrs"
                        v-on="on"
                >
                    ADD NEW BOOK
                </v-btn>
            </template>
            <v-card>
                <v-card-title class="text-center justify-center">
                    <span class="headline">New Book Details</span>
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field v-model="title" label="Title" required></v-text-field>
                        <v-text-field v-model="author" label="Author" required></v-text-field>
                        <v-text-field v-model="pages" label="Pages" required></v-text-field>
                        <v-text-field v-model="genre" label="Genre" required></v-text-field>
                        <v-text-field v-model="item_count" label="Stock" required></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions class="justify-center">
                    <div>
                        <v-btn
                                class="mr-4"
                                color="black"
                                elevation="2"
                                @click="dialog = false"
                        >
                            <span class="white--text">Cancel</span>
                        </v-btn>
                        <v-btn
                                class="ml-4"
                                color="black"
                                elevation="2"
                                @click="addBook()"
                        >
                            <span class="white--text">Create</span>
                        </v-btn>
                    </div>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    import axios from "axios";

    export default {
        name: "Home",

        data() {
            return {
                editingBookId: "",
                newTitle: "",
                newAuthor: "",
                newPages: "",
                newGenre: "",
                new_Item_Count: "",
                title: "",
                author: "",
                pages: 0,
                genre: '',
                item_count: 0,
                popup: false,
                form_popup: false,
                books: [],
                dialog: false
            }

        },
        methods: {
            setID: function (book) {
                this.editingBookId = book._id;
                this.newTitle = book.title;
                this.newAuthor = book.author;
                this.newPages = book.pages;
                this.newGenre = book.genre;
                this.new_Item_Count = book.item_count;
            },


            addBook: function () {
                let newBook = {
                    title: this.title,
                    author: this.author,
                    pages: this.pages,
                    genre: this.genre,
                    item_count: this.item_count
                }

                axios.post(
                    "https://omdwbfqiu8.execute-api.ap-southeast-1.amazonaws.com/dev/api/books/", newBook
                ).then((response) => alert(JSON.stringify(response))).catch((err) => {
                    alert(JSON.stringify(err))
                });

                setTimeout(function () {
                    location.reload();
                }, 1000);
            },

            deleteBook: function (book) {
                if (confirm("Please confirm if you want to delete this books.")) {
                    axios.delete(
                        "https://omdwbfqiu8.execute-api.ap-southeast-1.amazonaws.com/dev/api/books/" + book._id
                    ).then((response) => alert(JSON.stringify(response)))

                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                }
            },

            editBook: function () {
                let newBook = {
                    'title': this.newTitle,
                    'author': this.newAuthor,
                    'pages': this.newPages,
                    'genre': this.newGenre,
                    'item_count': this.new_Item_Count,
                }
                axios.put(
                    "https://omdwbfqiu8.execute-api.ap-southeast-1.amazonaws.com/dev/api/books/" + this.editingBookId, newBook
                ).then((response) => alert(JSON.stringify(response))).catch((err) => alert(err));

                this.popup = false;
                //
                setTimeout(function () {
                    location.reload();
                }, 1000);
            },

            getBooks: function () {
                axios.get(
                    "https://omdwbfqiu8.execute-api.ap-southeast-1.amazonaws.com/dev/api/books/"
                ).then((res) => {
                    this.books = res.data.books;
                }).catch((err) => alert(err));
            }
        },
        mounted() {
            this.getBooks();
        },
    }
</script>

<style scoped>

    .border {
        border: solid red;
    }

    .btn-center {
        margin-top: 5%;
        margin-left: 45%;
    }
</style>