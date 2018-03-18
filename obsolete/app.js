const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT  = 3000;

const data = require('./songs.js');
let songList = data.songsList;

app.use(bodyParser.json());
app.use('',express.static('public'));


/*get all songs list request*/
app.get('/getMusic', function(req, res) {
    res.send(JSON.stringify(songList));
});

/* update votes request */
app.post('/getVotes',function(req,res) {
    console.log(req.body);
    let id = req.body.id;
    let isLiked = req.body.isliked;
    if (id === 'error') {
        res.status(500).end();
    } else {
        updateVotes(id,isLiked);
    }
});

/*edit request*/
app.post('/getSaveData',function (req,res) {
    console.log(req.body);
    const data = {
       id : req.body.id,
       title : req.body.title,
       artist : req.body.artist,
       album : req.body.album,
       genre : req.body.genre
    };

    if (data.id === 'error') {
        res.status(500).end();
    } else {
        updateSong(data);
    }
});


/*delete request*/
app.post('/getDeleteData',function (req,res){
   console.log(req.body);
   const id = req.body.id;
    if (id === 'error') {
        res.status(500).end();
    } else {
        deleteSong(id);
    }
});

/*logic of update the data on the server memory*/
function updateVotes(songId,isLiked) {
    if (isLiked){
        songList[songId].upvotes += 1;
    }else{
        songList[songId].upvotes -= 1;
    }
    //console.log(`songId is ${songList[songId].id} and votes now is ${songList[songId].upvotes}`);
}

function updateSong(song) {
    
    songList[song.id].title = song.title;
    songList[song.id].artist = song.artist;
    songList[song.id].album = song.album;
    songList[song.id].genre = song.genre;
    //console.log(songList);
      
}
    

function deleteSong(songId) {
    delete songList[songId];
    //console.log(songList);
}

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});