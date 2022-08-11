import fasttext-js from 'fasttext-js';

var fastText = new FastText({
    serializeTo: './model',
    trainFile: './tweets.train'
});
fastText.train()
.then(done=> {
    console.log("train done.");
})
.catch(error => {
    console.error(error);
})
