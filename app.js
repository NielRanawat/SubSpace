const _ = require("lodash");
const express = require("express");
const app = express();
const fetch = require('node-fetch-commonjs');
const url = 'https://intent-kit-16.hasura.app/api/rest/blogs';
const headers = {'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6',};



app.get("/api/blog-stats", (req, res) => {
    fetch(url, {
        method: 'GET',
        headers: headers,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Finding number of blogs
        const numberOfBlogs = _.size(data.blogs);
        
        // Finding the longest title
        let longestTitle = "";
        let longestTitleLength = 0;
        data.blogs.forEach(element => {
            if(_.size(element.title) > longestTitleLength){
                longestTitle = element.title;
                longestTitleLength = _.size(element.title);
            }
        });

        // Finding privacy in titles
        let titleContainingPrivacy = 0;
        data.blogs.forEach(element => {
            if (_.includes(_.lowerCase(element.title), "privacy")) {
                titleContainingPrivacy++;
            }
        })

        // Array of unique blog titles
        let uniqueTitle = [];
        data.blogs.forEach(element => {
            if(!_.includes(uniqueTitle , element.title)){
                uniqueTitle.push(element.title);   
            }
        })
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
});


app.get("/api/blog-search?" , (req , res) => {
    foundBlogs = [];
    
});



app.listen(3000 , () => {
    console.log("SERVER STARTED");
});