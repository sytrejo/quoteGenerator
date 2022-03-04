const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')

let apiQuotes = [];

// Show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}


// Show New Quote
function newQuote(){
    loading();
    // pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // console.log(quote);

    // Check if author field is blank and replace with unknown.
    if(!quote.author){
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }

    // Check quote length to determine styling
    if (quote.text.length > 150){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');  
    }
    // Set Quote, hide Loader
    quoteText.textContent = quote.text;
    complete();
}



// Get Quotes from API
async function getQuotes() {
    loading();
    const apiURL= 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        // console.log(apiQuotes);
        newQuote();
    } catch(err){
        // Catch Error Here
        console.log('Bad request')
    }
}

// tweet quote

function tweetQuote(){

    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click', tweetQuote);



// get quotes from api when the page is loaded
getQuotes();



// to use a local quote array
// use a separate js file to list the quotes in JSON object format
// function newQuote(){
//     const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
//     console.log(quote);
// }
